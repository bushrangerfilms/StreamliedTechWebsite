#!/usr/bin/env node
// Trade page rules (added 18 Nov 2026, PM brief seo-trade-pages-1118).
//
// Reads the repo, and dist/public when a build exists (run `npx vite build`
// from the repo root first; without a build the built-file checks are listed
// under could_not_check, never passed silently). Needs no secrets and no network.
//
//  1. Each trade page and the hub is in the sitemap and has one <h1> equal to
//     its title minus the brand.
//  2. The two approved testimonials are on their two pages, word for word,
//     with the exact attribution, and on no other new page.
//  3. No external link in a trade page's or the hub's main content, and no
//     client website host anywhere in the built pages.
//  4. No price is typed in a page, component or the route table: prices live
//     only in client/src/lib/pricing.ts.
//  5. Every FAQ answer marked up as FAQPage is in the page's visible copy.
//  6. Every market folder has every trade page with that market's own price.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const config = JSON.parse(readFileSync(new URL('../config/checks.json', import.meta.url), 'utf8'));
const S = config.site;
const T = config.trade_page_rules;
const findings = [];
const couldNotCheck = [];
const read = (rel) => { const p = path.join(REPO_ROOT, rel); return existsSync(p) ? readFileSync(p, 'utf8') : null; };
// Whitespace collapsed, and no space left before punctuation where a tag ended.
const collapse = (s) => s.replace(/\s+/g, ' ').replace(/ ([.,;:!?])/g, '$1').trim();
const textOf = (html) => collapse(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&'));
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'");

const routes = [S.hub_route, ...S.trade_pages];
const seoSrc = read(S.seo_routes_file) || '';
const sitemap = read(S.sitemap_file) || '';

// ---- 1. sitemap, title and H1 (from source) ----
for (const route of routes) {
  if (!sitemap.includes(`<loc>${S.origin}${route}</loc>`)) findings.push({ severity: 'error', kind: 'trade_page_not_in_sitemap', route });
  const src = read(S.page_sources[route]);
  if (!src) { findings.push({ severity: 'error', kind: 'trade_page_source_missing', route, detail: S.page_sources[route] }); continue; }
  const h1s = [...src.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(m => collapse(m[1].replace(/<[^>]+>/g, ' ')));
  if (h1s.length !== 1) findings.push({ severity: 'error', kind: 'trade_page_h1_count', route, detail: `${h1s.length} <h1> elements in ${S.page_sources[route]}` });
  const title = seoSrc.match(new RegExp(`path: "${route}",\\s*title: "([^"]+)"`))?.[1];
  if (!title) { findings.push({ severity: 'error', kind: 'trade_page_title_missing', route }); continue; }
  if (!title.endsWith(T.brand_suffix)) findings.push({ severity: 'error', kind: 'trade_page_title_brand', route, detail: title });
  const bare = title.slice(0, -T.brand_suffix.length);
  if (h1s[0] && bare.toLowerCase() !== h1s[0].toLowerCase()) findings.push({ severity: 'error', kind: 'trade_page_h1_not_title', route, detail: `H1 "${h1s[0]}" is not the title minus the brand ("${bare}")` });
  if (title.length > config.thresholds.title_max_chars) findings.push({ severity: 'warning', kind: 'title_too_long', route, detail: `${title.length} chars` });
}

// ---- 4. no typed price outside pricing.ts ----
const priceRe = new RegExp(T.price_pattern, 'g');
const scan = (dir) => readdirSync(path.join(REPO_ROOT, dir), { withFileTypes: true }).flatMap(e => e.isDirectory() ? (e.name === 'ui' ? [] : scan(path.join(dir, e.name))) : /\.(tsx?|html)$/.test(e.name) ? [path.join(dir, e.name)] : []);
const stripComments = (src) => src.replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ').replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ');
for (const file of [...scan('client/src/pages'), ...scan('client/src/components'), ...scan('client/src/lib'), 'client/index.html']) {
  if (T.price_allowed_files.includes(file)) continue;
  // /terms carries a liability cap written as "EUR 100": legal wording, no symbol, so it does not match.
  const hits = (stripComments(read(file) || '').replace(/\$\{[^}]*\}/g, ' ').match(priceRe) || []);
  if (hits.length) findings.push({ severity: 'error', kind: 'price_typed_outside_pricing_file', where: file, detail: `${hits.slice(0, 3).join(', ')}: prices live only in ${T.price_allowed_files.join(', ')}` });
}

// ---- built files: 2, 3, 5, 6 ----
const marketsSrc = read(S.markets_file) || '';
const marketBlock = marketsSrc.match(/export const MARKETS[^=]*=\s*\{([\s\S]*?)\n\};/)?.[1] || '';
const markets = Object.fromEntries([...marketBlock.matchAll(/^\s*"?([a-z-]+)"?:\s*\{[^}]*build:\s*"([^"]+)"/gm)].map(m => [m[1], m[2]]));
const builtRoot = path.join(REPO_ROOT, S.built_dir, '_m');
if (!existsSync(builtRoot)) {
  couldNotCheck.push('No build found at dist/public/_m: testimonials, links, FAQ markup and per-market prices in the built pages were NOT checked. Run `npx vite build` from the repo root, then run this again.');
} else if (!Object.keys(markets).length) {
  couldNotCheck.push('Could not read the market list from client/src/lib/pricing.ts.');
} else {
  for (const [market, buildPrice] of Object.entries(markets)) for (const route of routes) {
    const file = path.join(builtRoot, market, `${route.slice(1)}.html`);
    const where = `_m/${market}/${route.slice(1)}.html`;
    if (!existsSync(file)) { findings.push({ severity: 'error', kind: 'built_page_missing', route, where }); continue; }
    const html = readFileSync(file, 'utf8');
    const main = html.match(/<main>([\s\S]*?)<\/main>/)?.[1] || '';
    const visible = textOf(main);
    if ((main.match(/<h1[ >]/g) || []).length !== 1) findings.push({ severity: 'error', kind: 'built_h1_count', route, where });
    // 6. this market's price, and nobody else's
    if (S.trade_pages.includes(route)) {
      if (!visible.includes(buildPrice)) findings.push({ severity: 'error', kind: 'market_price_missing', route, where, detail: `"${buildPrice}" is not in the page's HTML` });
      for (const [other, otherPrice] of Object.entries(markets)) {
        if (other !== market && !buildPrice.startsWith(otherPrice) && !otherPrice.startsWith(buildPrice) && visible.includes(otherPrice)) findings.push({ severity: 'error', kind: 'other_market_price', route, where, detail: `shows ${other}'s "${otherPrice}"` });
      }
    }
    // 3. links
    for (const m of main.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
      if (/^https?:/i.test(m[1])) findings.push({ severity: 'error', kind: 'external_link_on_trade_page', route, where, detail: m[1] });
    }
    for (const host of T.client_website_hosts) if (html.includes(host)) findings.push({ severity: 'error', kind: 'client_website_in_page', route, where, detail: host });
    // 2. testimonials
    const expected = T.testimonials[route];
    if (expected) {
      if (!visible.includes(expected.text)) findings.push({ severity: 'error', kind: 'testimonial_text_changed', route, where, detail: 'The approved quote is not on the page word for word' });
      if (!visible.includes(expected.attribution)) findings.push({ severity: 'error', kind: 'testimonial_attribution_changed', route, where, detail: expected.attribution });
    }
    if (T.no_testimonial_routes.includes(route)) {
      if (/<blockquote/.test(main)) findings.push({ severity: 'error', kind: 'testimonial_on_wrong_page', route, where });
      for (const name of T.allowed_client_names) if (visible.includes(name)) findings.push({ severity: 'error', kind: 'client_named_on_wrong_page', route, where, detail: name });
    }
    // 5. FAQ markup equals the visible copy; no Offer, rating or review markup
    for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      let data; try { data = JSON.parse(block[1]); } catch { findings.push({ severity: 'error', kind: 'json_ld_unparsed', route, where }); continue; }
      const raw = JSON.stringify(data);
      if (/"@type":"(Offer|AggregateRating|Review|Rating)"|"(price|priceCurrency|award)":/.test(raw)) findings.push({ severity: 'error', kind: 'banned_structured_data', route, where, detail: 'Offer, price, rating, review or award markup' });
      for (const node of [].concat(data)) {
        if (node['@type'] !== 'FAQPage') continue;
        for (const q of node.mainEntity || []) {
          if (!visible.includes(collapse(q.name))) findings.push({ severity: 'error', kind: 'faq_question_not_visible', route, where, detail: q.name });
          const answer = collapse(decode(q.acceptedAnswer?.text || ''));
          if (!visible.includes(answer)) findings.push({ severity: 'error', kind: 'faq_answer_not_visible', route, where, detail: answer.slice(0, 90) });
        }
      }
    }
  }
}

console.log(JSON.stringify({ routes_checked: routes, markets: Object.keys(markets), built: existsSync(builtRoot), could_not_check: couldNotCheck, findings }, null, 2));
