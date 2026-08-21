#!/usr/bin/env node
// Route wiring audit, specific to how this site serves SEO metadata.
//
// client/src/lib/seo-routes.ts is the single source of truth. The prerender
// plugin writes <path>.html for every PRERENDER_ROUTES entry, vercel.json must
// rewrite /path to /path.html (the catch-all would otherwise serve the shell's
// head), the sitemap must list exactly the indexable routes, and App.tsx must
// have a matching <Route>. A route missing from any one of those is a page
// that silently ships the homepage's title, or is never crawled at all.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const config = JSON.parse(readFileSync(new URL('../config/checks.json', import.meta.url), 'utf8'));
const S = config.site;
const T = config.thresholds;

const read = (rel) => {
  const p = path.join(REPO_ROOT, rel);
  return existsSync(p) ? readFileSync(p, 'utf8') : null;
};

const findings = [];
const seoSrc = read(S.seo_routes_file);
if (!seoSrc) {
  console.log(JSON.stringify({ error: `${S.seo_routes_file} not found under ${REPO_ROOT}; run from inside the repo`, findings: [{ severity: 'error', kind: 'seo_routes_missing', detail: S.seo_routes_file }] }, null, 2));
  process.exit(0);
}

// ---- parse ROUTE_SEO (a plain object literal of string/boolean fields) ----
const objMatch = seoSrc.match(/export const ROUTE_SEO\s*=\s*\{([\s\S]*?)\n\}\s*satisfies/);
const routes = {};
if (!objMatch) {
  findings.push({ severity: 'error', kind: 'seo_routes_unparsed', detail: 'Could not locate `export const ROUTE_SEO = { ... } satisfies` in seo-routes.ts; the file shape changed and this check needs updating' });
} else {
  for (const m of objMatch[1].matchAll(/\n  (\w+):\s*\{([\s\S]*?)\n  \},?/g)) {
    const [, key, body] = m;
    const entry = { key };
    for (const f of body.matchAll(/(\w+):\s*("(?:[^"\\]|\\.)*"|true|false)/g)) {
      const [, name, raw] = f;
      entry[name] = raw === 'true' ? true : raw === 'false' ? false : JSON.parse(raw);
    }
    routes[key] = entry;
  }
}
const prerenderKeys = [...(seoSrc.match(/export const PRERENDER_ROUTES[^=]*=\s*\[([\s\S]*?)\];/)?.[1] || '').matchAll(/ROUTE_SEO\.(\w+)/g)].map(m => m[1]);
const prerendered = prerenderKeys.map(k => routes[k]).filter(Boolean);

// ---- other sources of truth ----
let rewrites = [];
try { rewrites = JSON.parse(read(S.vercel_json) || '{}').rewrites || []; }
catch (e) { findings.push({ severity: 'error', kind: 'vercel_json_unparsed', detail: e.message }); }
const rewriteMap = new Map(rewrites.map(r => [r.source, r.destination]));

const sitemapXml = read(S.sitemap_file) || '';
const sitemapPaths = new Set((sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || []).map(l => { try { return new URL(l.replace(/<\/?loc>/g, '')).pathname.replace(/\/$/, '') || '/'; } catch { return l; } }));

const appSrc = read(S.app_router_file) || '';
const appPaths = [...appSrc.matchAll(/<Route\s+path="([^"]+)"/g)].map(m => m[1]);

const aliases = S.aliases || {};
const allPaths = Object.values(routes).map(r => r.path);

// ---- checks ----
for (const r of prerendered) {
  if (r.path === '/') continue;
  const dest = rewriteMap.get(r.path);
  const want = `${r.path}.html`;
  if (dest !== want) findings.push({ severity: 'error', kind: 'missing_vercel_rewrite', route: r.path, detail: `vercel.json has no rewrite ${r.path} -> ${want} (found: ${dest || 'none'}). Crawlers and link scrapers will get the homepage head for this route.` });
}
for (const r of Object.values(routes)) {
  if (r.path === '/404') continue;
  const indexable = !r.noindex && r.canonical === r.path;
  if (indexable && !prerenderKeys.includes(r.key)) findings.push({ severity: 'warning', kind: 'indexable_route_not_prerendered', route: r.path, detail: `${r.key} is indexable but not in PRERENDER_ROUTES` });
  if (indexable && !sitemapPaths.has(r.path)) findings.push({ severity: 'warning', kind: 'indexable_route_not_in_sitemap', route: r.path, detail: `${r.path} is indexable (no noindex, self-canonical) but missing from ${S.sitemap_file}`, auto_fix: 'add_to_sitemap' });
  if (r.noindex && sitemapPaths.has(r.path)) findings.push({ severity: 'error', kind: 'noindex_route_in_sitemap', route: r.path, detail: `${r.path} is noindex but listed in the sitemap`, auto_fix: 'remove_from_sitemap' });
  if (r.canonical && !allPaths.includes(r.canonical)) findings.push({ severity: 'error', kind: 'canonical_target_missing', route: r.path, detail: `canonical ${r.canonical} is not a ROUTE_SEO path` });
  if (r.title && r.title.length > T.title_max_chars) findings.push({ severity: 'warning', kind: 'title_too_long', route: r.path, detail: `title is ${r.title.length} chars (max ${T.title_max_chars}): "${r.title}"` });
  if (r.description && r.description.length > T.meta_description_max_chars) findings.push({ severity: 'warning', kind: 'description_too_long', route: r.path, detail: `description is ${r.description.length} chars (max ${T.meta_description_max_chars})`, auto_fix: 'trim_description' });
  if (r.description && r.description.length < 50) findings.push({ severity: 'info', kind: 'description_too_short', route: r.path, detail: `description is ${r.description.length} chars` });
  if (r.image && !existsSync(path.join(REPO_ROOT, S.public_dir, r.image))) findings.push({ severity: 'error', kind: 'og_image_file_missing', route: r.path, detail: `image ${r.image} not found under ${S.public_dir}` });
  if (r.path !== '/404' && r.path !== '/dev' && !appPaths.includes(r.path)) findings.push({ severity: 'warning', kind: 'route_not_in_app_router', route: r.path, detail: `${r.path} has SEO metadata but no <Route path> in ${S.app_router_file}` });
}
for (const p of appPaths) {
  if (!allPaths.includes(p) && !aliases[p]) findings.push({ severity: 'warning', kind: 'app_route_without_seo', route: p, detail: `<Route path="${p}"> has no ROUTE_SEO entry and is not a configured alias; it will ship the homepage's title and canonical` });
  if (aliases[p]) {
    const dest = rewriteMap.get(p);
    const want = `${aliases[p]}.html`;
    if (dest !== want) findings.push({ severity: 'warning', kind: 'alias_rewrite_mismatch', route: p, detail: `alias ${p} should rewrite to ${want} (found ${dest || 'none'})` });
    if (sitemapPaths.has(p)) findings.push({ severity: 'warning', kind: 'alias_in_sitemap', route: p, detail: `alias ${p} should not be in the sitemap`, auto_fix: 'remove_from_sitemap' });
  }
}
for (const p of sitemapPaths) {
  if (!allPaths.includes(p)) findings.push({ severity: 'warning', kind: 'sitemap_unknown_route', route: p, detail: `${p} is in the sitemap but has no ROUTE_SEO entry` });
}
const catchAll = rewrites.find(r => /\(\?!/.test(r.source));
if (!catchAll) findings.push({ severity: 'info', kind: 'no_catch_all_rewrite', detail: 'No SPA catch-all rewrite found in vercel.json' });
else if (rewrites.indexOf(catchAll) !== rewrites.length - 1) findings.push({ severity: 'error', kind: 'catch_all_not_last', detail: 'The catch-all rewrite is not the last entry; later per-route rewrites will never match' });

console.log(JSON.stringify({
  repo_root: REPO_ROOT,
  routes: Object.values(routes),
  prerender_routes: prerendered.map(r => r.path),
  vercel_rewrites: rewrites,
  sitemap_paths: [...sitemapPaths],
  app_router_paths: appPaths,
  aliases,
  findings,
}, null, 2));
