#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const config = JSON.parse(readFileSync(new URL('../config/checks.json', import.meta.url), 'utf8'));
const DOMAIN = config.site.domain;
const ROUTES = config.site.marketing_routes;
const PAGE_SOURCES = config.site.page_sources || {};
const CONCURRENCY = 8;

// SPA: the static HTML has no anchors, so harvest hrefs and literal URLs
// from the page source instead. Template-built URLs cannot be resolved
// statically and are listed under skipped_dynamic.
function linksFromSource(route, baseUrl) {
  const rel = PAGE_SOURCES[route];
  if (!rel) return { links: [], file: null, dynamic: [] };
  const p = path.join(REPO_ROOT, rel);
  if (!existsSync(p)) return { links: [], file: rel, dynamic: [] };
  const src = readFileSync(p, 'utf8');
  const links = new Set();
  const dynamic = new Set();
  for (const m of src.matchAll(/href=\{?["'`]([^"'`]+)["'`]\}?/g)) {
    const href = m[1].trim();
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (href.includes('${')) { dynamic.add(href); continue; }
    try { links.add(new URL(href, baseUrl).toString()); } catch { /* skip */ }
  }
  for (const m of src.matchAll(/href=\{([A-Za-z_][\w.]*)\}/g)) dynamic.add(m[1]);
  for (const m of src.matchAll(/["'`](https?:\/\/[^"'`\s<>)]+)["'`]/g)) {
    const u = m[1];
    if (/\.(png|jpg|jpeg|webp|svg|css|js|woff2?)(\?|$)/i.test(u)) continue;
    links.add(u);
  }
  return { links: [...links], file: rel, dynamic: [...dynamic] };
}

function extractLinks(html, baseUrl) {
  const links = new Set();
  const re = /<a[^>]*href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1].trim();
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
    try { links.add(new URL(href, baseUrl).toString()); }
    catch { /* skip malformed */ }
  }
  return [...links];
}

// A plain Node fetch with no User-Agent gets refused by a lot of hosts, so
// send a browser UA. 403, 429 and LinkedIn's 999 are bot blocks far more often
// than dead pages; they are reported as likely_bot_block, not broken.
const HEADERS = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36 StreamlinedSEOAgent/1.0', Accept: 'text/html,*/*;q=0.8' };
const BOT_BLOCK_STATUSES = new Set([403, 429, 999]);
const BOT_BLOCK_HOSTS = new Set(config.link_check?.bot_block_hosts || []);
const isBotBlockHost = (url) => { try { return BOT_BLOCK_HOSTS.has(new URL(url).hostname); } catch { return false; } };
async function head(url) {
  const attempt = async (method) => fetch(url, { method, redirect: 'follow', headers: HEADERS, signal: AbortSignal.timeout(15_000) });
  try {
    let res = await attempt('HEAD');
    if (res.status === 405 || res.status === 403 || res.status === 999) res = await attempt('GET');
    return { url, status: res.status, ok: res.ok, likely_bot_block: !res.ok && (BOT_BLOCK_STATUSES.has(res.status) || isBotBlockHost(url)) };
  } catch (e) {
    try {
      const r2 = await attempt('GET');
      return { url, status: r2.status, ok: r2.ok, likely_bot_block: !r2.ok && (BOT_BLOCK_STATUSES.has(r2.status) || isBotBlockHost(url)), note: 'HEAD failed, GET succeeded' };
    } catch (e2) {
      return { url, error: e2.name === 'TimeoutError' ? 'timeout' : (e2.cause?.code || e2.message) };
    }
  }
}

async function pool(items, fn, concurrency) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

const allLinks = new Set();
const linkSources = new Map();
const perRoute = [];

for (const route of ROUTES) {
  const url = `https://${DOMAIN}${route}`;
  let links = [];
  let origin = 'live_html';
  let dynamic = [];
  try {
    const res = await fetch(url);
    const html = await res.text();
    links = extractLinks(html, url);
  } catch (e) {
    /* fall through to source */
  }
  if (links.length === 0) {
    const fromSrc = linksFromSource(route, url);
    links = fromSrc.links;
    dynamic = fromSrc.dynamic;
    origin = fromSrc.file ? `source:${fromSrc.file}` : 'none';
  }
  perRoute.push({ route, links_found: links.length, origin, skipped_dynamic: dynamic });
  for (const l of links) {
    allLinks.add(l);
    if (!linkSources.has(l)) linkSources.set(l, []);
    linkSources.get(l).push(route);
  }
}

const linkArray = [...allLinks];
const checked = await pool(linkArray, head, CONCURRENCY);

const broken = checked.filter(r => r.error || (r.status && r.status >= 400 && !r.likely_bot_block)).map(r => ({
  ...r,
  found_on: linkSources.get(r.url) || [],
}));

console.log(JSON.stringify({
  total_links_checked: linkArray.length,
  per_route: perRoute,
  broken_count: broken.length,
  broken,
  likely_bot_blocked: checked.filter(r => r.likely_bot_block).map(r => ({ ...r, found_on: linkSources.get(r.url) || [] })),
  all_checked: checked,
}, null, 2));
