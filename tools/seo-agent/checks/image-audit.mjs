#!/usr/bin/env node
import { readFileSync, statSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const config = JSON.parse(readFileSync(new URL('../config/checks.json', import.meta.url), 'utf8'));
const PUBLIC_DIR = path.join(REPO_ROOT, config.site.public_dir || 'public');
const DOMAIN = config.site.domain;
const ROUTES = config.site.marketing_routes;
const T = config.thresholds;
const SIZE_WARN_KB = T.image_size_warning_kb ?? 100;
const SIZE_CRITICAL_KB = T.image_size_critical_kb ?? 500;

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif']);

async function walk(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else if (IMAGE_EXTS.has(path.extname(e.name).toLowerCase())) acc.push(p);
  }
  return acc;
}

const images = await walk(PUBLIC_DIR).catch(() => []);

// Which files under public/images does the source actually reference? The
// live HTML cannot tell us (SPA), so scan client/src and index.html.
async function walkSource(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walkSource(p, acc);
    else if (/\.(tsx?|jsx?|html|css)$/.test(e.name)) acc.push(p);
  }
  return acc;
}
const sourceFiles = [
  ...(await walkSource(path.join(REPO_ROOT, 'client', 'src'))),
  path.join(REPO_ROOT, 'client', 'index.html'),
  ...(await walkSource(path.join(REPO_ROOT, 'server'))),
].filter(p => { try { statSync(p); return true; } catch { return false; } });
const sourceText = sourceFiles.map(p => ({ p: path.relative(REPO_ROOT, p), t: readFileSync(p, 'utf8') }));
function referencedBy(relImagePath) {
  const webPath = '/' + path.relative(PUBLIC_DIR, path.join(REPO_ROOT, relImagePath)).split(path.sep).join('/');
  const base = path.basename(webPath);
  return sourceText.filter(s => s.t.includes(webPath) || s.t.includes(base)).map(s => s.p);
}

const inventory = images.map(p => {
  const size = statSync(p).size;
  const rel = path.relative(REPO_ROOT, p);
  const ext = path.extname(p).toLowerCase();
  const isModernFormat = ext === '.webp' || ext === '.avif';
  const sizeKb = Math.round(size / 1024);
  let severity = 'info';
  if (sizeKb >= SIZE_CRITICAL_KB) severity = 'critical';
  else if (sizeKb >= SIZE_WARN_KB) severity = 'warning';
  const refs = referencedBy(rel);
  return { path: rel, size_bytes: size, size_kb: sizeKb, ext, modern_format: isModernFormat, severity, referenced_by: refs, unreferenced: refs.length === 0 };
}).sort((a, b) => b.size_bytes - a.size_bytes);

const oversized = inventory.filter(i => i.severity !== 'info');

const liveImageRefs = new Map();
for (const route of ROUTES) {
  try {
    const res = await fetch(`https://${DOMAIN}${route}`, { redirect: 'follow' });
    const html = await res.text();
    const re = /<img[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
    let m;
    while ((m = re.exec(html)) !== null) {
      const tag = m[0];
      const src = m[1];
      const hasLazy = /loading=["']lazy["']/i.test(tag);
      const hasFetchPriority = /fetchpriority=["']high["']/i.test(tag);
      const hasWidth = /\bwidth=/i.test(tag);
      const hasHeight = /\bheight=/i.test(tag);
      const hasAlt = /\balt=/i.test(tag);
      const altMatch = tag.match(/\balt=["']([^"']*)["']/i);
      const alt = altMatch ? altMatch[1] : null;
      let key = src;
      if (!liveImageRefs.has(key)) liveImageRefs.set(key, { src, refs: [] });
      liveImageRefs.get(key).refs.push({
        route,
        has_lazy: hasLazy,
        has_fetchpriority_high: hasFetchPriority,
        has_dimensions: hasWidth && hasHeight,
        has_alt: hasAlt,
        alt,
        tag_excerpt: tag.length > 200 ? tag.slice(0, 200) + '…' : tag,
      });
    }
  } catch (e) {
    /* skip route on fetch error */
  }
}

const findings = [];

for (const img of oversized) {
  const sibling = inventory.find(i => i !== img && i.modern_format && path.parse(i.path).name === path.parse(img.path).name);
  findings.push({
    severity: img.unreferenced ? 'info' : img.severity,
    kind: img.unreferenced ? 'oversized_unreferenced_image' : 'oversized_image',
    detail: img.unreferenced
      ? `${img.path} is ${img.size_kb} KB and nothing in client/src, index.html or server references it${sibling ? ` (a ${sibling.ext.slice(1)} sibling exists)` : ''}; a leftover, safe to delete in a follow-up.`
      : `${img.path} is ${img.size_kb} KB (${img.ext.toUpperCase().slice(1)}), referenced by ${img.referenced_by.join(', ')}${sibling ? `; a ${sibling.ext.slice(1)} sibling already exists` : '. Recommend converting to WebP/AVIF'}.`,
    file: img.path,
    size_kb: img.size_kb,
    referenced_by: img.referenced_by,
  });
}

for (const [key, entry] of liveImageRefs) {
  const refs = entry.refs;
  const allMissingAlt = refs.every(r => !r.has_alt);
  if (allMissingAlt) {
    findings.push({
      severity: 'warning',
      kind: 'missing_alt',
      detail: `<img src="${entry.src}"> has no alt attribute (found on ${refs.length} route(s): ${refs.map(r => r.route).join(', ')}). Add a meaningful alt text or empty alt="" if decorative.`,
      src: entry.src,
    });
  }
  const allMissingDims = refs.every(r => !r.has_dimensions);
  if (allMissingDims) {
    findings.push({
      severity: 'info',
      kind: 'missing_dimensions',
      detail: `<img src="${entry.src}"> is missing width/height attributes (found on ${refs.length} route(s)). Setting these prevents CLS during image load.`,
      src: entry.src,
    });
  }
}

console.log(JSON.stringify({
  public_dir: path.relative(REPO_ROOT, PUBLIC_DIR),
  total_images: inventory.length,
  total_size_kb: inventory.reduce((s, i) => s + i.size_kb, 0),
  oversized_count: oversized.length,
  modern_format_count: inventory.filter(i => i.modern_format).length,
  inventory: inventory.slice(0, 30),
  live_image_refs: Array.from(liveImageRefs.values()).slice(0, 50),
  findings,
}, null, 2));
