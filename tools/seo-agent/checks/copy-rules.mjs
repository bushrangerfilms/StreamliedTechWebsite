#!/usr/bin/env node
// Copy rules check: Pete's voice and claims rules applied to what searchers
// and visitors actually read. Scans (1) the LIVE prerendered head of each
// route (title, description, og:title) and (2) the page source files, with
// JSX stripped, for body copy. Reports only; fixes are scoped elsewhere.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const config = JSON.parse(readFileSync(new URL('../config/checks.json', import.meta.url), 'utf8'));
const S = config.site;
const R = config.copy_rules;
const ROUTES = S.marketing_routes;

const patterns = R.banned_patterns.map(p => ({ ...p, re: new RegExp(p.regex, p.flags.includes('g') ? p.flags : p.flags + 'g') }));
const EM = R.banned_characters.em_dash;
const EN = R.banned_characters.en_dash;

function excerpt(text, idx, span = 60) {
  const a = Math.max(0, idx - span), b = Math.min(text.length, idx + span);
  return (a > 0 ? '…' : '') + text.slice(a, b).replace(/\s+/g, ' ') + (b < text.length ? '…' : '');
}

function scanText(text, where, route, findings, { isHead = false } = {}) {
  for (const [ch, kind] of [[EM, 'em_dash'], [EN, 'en_dash']]) {
    let idx = text.indexOf(ch);
    while (idx !== -1) {
      findings.push({ severity: 'warning', kind, route, where, detail: `${kind.replace('_', ' ')} found`, excerpt: excerpt(text, idx), auto_fix: isHead ? 'replace_dash_in_seo_routes' : undefined });
      idx = text.indexOf(ch, idx + 1);
    }
  }
  for (const p of patterns) {
    p.re.lastIndex = 0;
    let m;
    while ((m = p.re.exec(text)) !== null) {
      findings.push({ severity: p.severity, kind: p.name, route, where, detail: p.why, excerpt: excerpt(text, m.index) });
      if (m.index === p.re.lastIndex) p.re.lastIndex++;
    }
  }
  const claim = R.founder_claim;
  if (claim && text.includes(claim.trigger)) {
    const allowed = [claim.required_prefix, claim.exceptions?.[route]].filter(Boolean);
    let idx = text.indexOf(claim.trigger);
    while (idx !== -1) {
      const window = text.slice(idx, idx + 80);
      if (!allowed.some(a => window.startsWith(a))) findings.push({ severity: 'warning', kind: 'founder_claim_wording', route, where, detail: `"${claim.trigger}" claim does not use the canonical wording (${allowed.join(' | ')})`, excerpt: excerpt(text, idx) });
      idx = text.indexOf(claim.trigger, idx + 1);
    }
  }
}

function stripJsx(src) {
  return src
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')      // JSX comments
    .replace(/\/\*[\s\S]*?\*\//g, ' ')          // block comments
    .replace(/^\s*\/\/.*$/gm, ' ')              // line comments
    .replace(/^import .*$/gm, ' ')
    .replace(/className="[^"]*"/g, ' ')
    .replace(/<[^>]+>/g, ' ')                   // tags
    .replace(/\{["'`]\s*["'`]\}/g, ' ')         // {" "}
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
}

const results = [];
for (const route of ROUTES) {
  const entry = { route, findings: [] };
  const url = `${S.origin}${route}`;
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15_000) });
    const html = await res.text();
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? '';
    const description = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1]?.trim() ?? '';
    const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i)?.[1]?.trim() ?? '';
    entry.live = { title, description, og_title: ogTitle };
    scanText(title, 'title', route, entry.findings, { isHead: true });
    scanText(description, 'description', route, entry.findings, { isHead: true });
    if (ogTitle !== title) scanText(ogTitle, 'og:title', route, entry.findings, { isHead: true });
    if (R.title_must_contain && title && !title.includes(R.title_must_contain)) entry.findings.push({ severity: 'info', kind: 'title_missing_brand', route, where: 'title', detail: `title does not contain "${R.title_must_contain}"` });
    const colons = (description.match(/:/g) || []).length;
    if (colons >= (R.description_colon_info_threshold ?? 2)) entry.findings.push({ severity: 'info', kind: 'description_colon_density', route, where: 'description', detail: `${colons} colons in the description; check none is standing in for a dash` });
  } catch (e) {
    entry.live_error = e.message;
  }
  const srcRel = S.page_sources?.[route];
  if (srcRel) {
    const p = path.join(REPO_ROOT, srcRel);
    if (existsSync(p)) {
      const text = stripJsx(readFileSync(p, 'utf8'));
      entry.source_file = srcRel;
      scanText(text, `source:${srcRel}`, route, entry.findings);
    } else {
      entry.source_missing = srcRel;
    }
  }
  results.push(entry);
}

const all = results.flatMap(r => r.findings);
console.log(JSON.stringify({
  routes_checked: ROUTES.length,
  totals: { warning: all.filter(f => f.severity === 'warning').length, info: all.filter(f => f.severity === 'info').length },
  results,
}, null, 2));
