#!/usr/bin/env node
// Sitemap and robots sanity for streamlinedai.tech.
// Compares the LIVE sitemap with the routes this config says are indexable,
// checks robots.txt points at it and blocks nothing it should not, and flags
// drift between the committed sitemap and the live one (a deploy that did not
// happen, or a local edit that never shipped).
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const config = JSON.parse(readFileSync(new URL('../config/checks.json', import.meta.url), 'utf8'));
const ORIGIN = config.site.origin;
const SITEMAP_URL = `${ORIGIN}/sitemap.xml`;
const EXPECTED = config.site.marketing_routes;            // indexable routes
const NOINDEX = config.site.noindex_routes || [];
const ALIASES = Object.keys(config.site.aliases || {});

const findings = [];
const locs = (xml) => (xml.match(/<loc>([^<]+)<\/loc>/g) || []).map(m => m.replace(/<\/?loc>/g, '').trim());
const toPath = (u) => { try { return new URL(u).pathname.replace(/\/$/, '') || '/'; } catch { return u; } };

let liveXml = null;
try {
  const res = await fetch(SITEMAP_URL, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) findings.push({ severity: 'error', kind: 'sitemap_unreachable', detail: `${SITEMAP_URL} returned ${res.status}` });
  else liveXml = await res.text();
} catch (e) {
  findings.push({ severity: 'error', kind: 'sitemap_unreachable', detail: `${SITEMAP_URL}: ${e.message}` });
}

const liveUrls = liveXml ? locs(liveXml) : [];
const livePaths = new Set(liveUrls.map(toPath));

if (liveXml) {
  if (!liveXml.includes('<urlset')) findings.push({ severity: 'error', kind: 'sitemap_not_xml', detail: 'Live sitemap.xml is not a <urlset> document (the SPA shell is probably being served for it)' });

  const missing = EXPECTED.filter(r => !livePaths.has(r));
  const extra = [...livePaths].filter(p => !EXPECTED.includes(p));
  const noindexListed = [...livePaths].filter(p => NOINDEX.includes(p));
  const aliasListed = [...livePaths].filter(p => ALIASES.includes(p));
  if (missing.length) findings.push({ severity: 'warning', kind: 'sitemap_missing_routes', detail: `Indexable routes not in sitemap: ${missing.join(', ')}`, auto_fix: 'add_to_sitemap', routes: missing });
  if (extra.length) findings.push({ severity: 'info', kind: 'sitemap_extra_routes', detail: `In sitemap but not in config marketing_routes (may be intentional): ${extra.join(', ')}`, routes: extra });
  if (noindexListed.length) findings.push({ severity: 'error', kind: 'sitemap_lists_noindex_route', detail: `noindex routes must not be in the sitemap: ${noindexListed.join(', ')}`, auto_fix: 'remove_from_sitemap', routes: noindexListed });
  if (aliasListed.length) findings.push({ severity: 'warning', kind: 'sitemap_lists_alias', detail: `Alias routes canonicalise elsewhere and should not be listed: ${aliasListed.join(', ')}`, auto_fix: 'remove_from_sitemap', routes: aliasListed });

  for (const u of liveUrls) if (!u.startsWith(ORIGIN)) findings.push({ severity: 'warning', kind: 'sitemap_foreign_origin', detail: `${u} is not on ${ORIGIN}` });

  const today = new Date().toISOString().slice(0, 10);
  for (const m of liveXml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
    const d = m[1].trim();
    if (!/^\d{4}-\d{2}-\d{2}/.test(d)) findings.push({ severity: 'warning', kind: 'sitemap_bad_lastmod', detail: `lastmod "${d}" is not ISO YYYY-MM-DD` });
    else if (d.slice(0, 10) > today) findings.push({ severity: 'warning', kind: 'sitemap_future_lastmod', detail: `lastmod ${d} is in the future` });
  }
}

// Committed sitemap vs live: drift means a deploy is missing or a change never shipped.
const committedPath = path.join(REPO_ROOT, config.site.sitemap_file);
let committedPaths = null;
if (existsSync(committedPath)) {
  committedPaths = new Set(locs(readFileSync(committedPath, 'utf8')).map(toPath));
  if (liveXml) {
    const onlyCommitted = [...committedPaths].filter(p => !livePaths.has(p));
    const onlyLive = [...livePaths].filter(p => !committedPaths.has(p));
    if (onlyCommitted.length || onlyLive.length) findings.push({ severity: 'warning', kind: 'sitemap_repo_live_drift', detail: `Committed sitemap and live sitemap differ. Only in repo: [${onlyCommitted.join(', ')}]. Only live: [${onlyLive.join(', ')}]. Check the latest Vercel deploy.` });
  }
} else {
  findings.push({ severity: 'info', kind: 'sitemap_file_not_found', detail: `${config.site.sitemap_file} not found at repo root ${REPO_ROOT} (running outside the repo?)` });
}

// robots.txt
let robotsText = '';
try {
  const r = await fetch(`${ORIGIN}/robots.txt`, { signal: AbortSignal.timeout(15_000) });
  robotsText = r.ok ? await r.text() : '';
  if (!r.ok) findings.push({ severity: 'error', kind: 'robots_unreachable', detail: `robots.txt returned ${r.status}` });
} catch (e) {
  findings.push({ severity: 'error', kind: 'robots_unreachable', detail: e.message });
}
if (robotsText) {
  if (robotsText.includes('<!DOCTYPE') || robotsText.includes('<html')) findings.push({ severity: 'error', kind: 'robots_is_html', detail: 'robots.txt is serving the SPA shell' });
  if (!/^Sitemap:\s*https?:\/\//im.test(robotsText)) findings.push({ severity: 'warning', kind: 'robots_missing_sitemap_line', detail: 'robots.txt does not reference sitemap.xml', auto_fix: 'add_robots_sitemap_line' });
  const disallows = [...robotsText.matchAll(/^Disallow:\s*(\S+)/gim)].map(m => m[1]);
  for (const d of disallows) {
    if (d === '/') findings.push({ severity: 'error', kind: 'robots_disallows_everything', detail: 'Disallow: / blocks the whole site' });
    for (const r of EXPECTED) if (r !== '/' && (r === d || r.startsWith(d.replace(/\*$/, '')))) findings.push({ severity: 'error', kind: 'robots_blocks_indexable_route', detail: `Disallow: ${d} blocks indexable route ${r}` });
    for (const n of NOINDEX) if (n === d || n.startsWith(d.replace(/\*$/, ''))) findings.push({ severity: 'warning', kind: 'robots_blocks_noindex_route', detail: `Disallow: ${d} stops Google reading the noindex tag on ${n}; the house rule is noindex, not Disallow` });
  }
}

console.log(JSON.stringify({
  sitemap_url: SITEMAP_URL,
  live_urls_in_sitemap: liveUrls,
  committed_paths: committedPaths ? [...committedPaths] : null,
  expected_routes: EXPECTED,
  noindex_routes: NOINDEX,
  robots_has_sitemap_line: /^Sitemap:\s*https?:\/\//im.test(robotsText),
  findings,
}, null, 2));
