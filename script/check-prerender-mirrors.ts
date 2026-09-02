// Post-build gate for the static crawlable body mirrors in
// client/src/lib/seo-static-html.ts.
//
// The mirrors exist so no-JS crawlers (OpenAI's bots among them) see each
// marketing page's real copy, and the one rule is that a mirror carries the
// SAME text as the rendered page - different text for crawlers is cloaking.
// Nothing at runtime compares the two, so this script does, from bytes the
// mirror author did not write:
//
//  1. H1 check: the <h1> text extracted from each page COMPONENT source must
//     appear in that route's built dist/public/*.html file.
//  2. Verbatim check: every text chunk in a mirror (12+ chars) must appear
//     word for word in its page component's source.
//
// Run standalone with `npx tsx script/check-prerender-mirrors.ts` (after a
// build), or let script/build.ts run it as part of `npm run build`.
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { STATIC_HTML } from "../client/src/lib/seo-static-html";
import { PRERENDER_ROUTES } from "../client/src/lib/seo-routes";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Which page component renders each mirrored route. A new mirror without an
// entry here fails the check rather than going unverified.
const PAGE_COMPONENTS: Record<string, string> = {
  "/": "client/src/pages/home.tsx",
  "/business": "client/src/pages/business.tsx",
  "/contractors": "client/src/pages/contractors.tsx",
  "/installers": "client/src/pages/installers.tsx",
  "/australia": "client/src/pages/australia.tsx",
  "/products": "client/src/pages/products.tsx",
  "/how-it-works": "client/src/pages/how-it-works.tsx",
  "/guide/set-up-ai-for-business-ireland": "client/src/pages/guide-set-up-ai.tsx",
  "/ai-employees/ie": "client/src/pages/ai-employees.tsx",
  "/ai-employees/au": "client/src/pages/ai-employees.tsx",
  "/ai-employees/uk": "client/src/pages/ai-employees.tsx",
  "/ai-employees/us": "client/src/pages/ai-employees.tsx",
};

// The AI Employees mirror template predates the verbatim rule: it condenses
// the page around its quote form instead of mirroring paragraph for
// paragraph, and Pete approved that copy. The per-region H1 check still
// applies to every region.
const VERBATIM_EXEMPT = new Set(["/ai-employees/ie", "/ai-employees/au", "/ai-employees/uk", "/ai-employees/us"]);

const collapse = (s: string) => s.replace(/\s+/g, " ").trim();

/** JSX source, normalised so copy reads contiguously: {" "} becomes a space. */
function normalisedComponentSource(rel: string): string {
  return collapse(readFileSync(path.join(REPO_ROOT, rel), "utf-8").replace(/\{"\s*"\}/g, " "));
}

/**
 * Candidate H1 texts from the component's <h1>...</h1>. Usually one literal
 * string. When the H1 is a JSX expression like {region.heroHeadline}, the
 * candidates are the `heroHeadline: "..."` strings in the file, one per
 * region config entry. If a config entry's key matches the route's last
 * path segment (`/ai-employees/au` -> the `au: { ... }` entry), only that
 * region's headline counts, so the au file cannot pass on the ie headline.
 */
function componentH1s(source: string, routePath: string): string[] {
  const m = source.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!m) return [];
  const inner = collapse(m[1].replace(/\{"\s*"\}/g, " "));
  const expr = inner.match(/^\{\s*[\w$]+(?:\.[\w$]+)*\.([\w$]+)\s*\}$/);
  if (expr) {
    const prop = expr[1];
    const literal = `"((?:[^"\\\\]|\\\\.)*)"`;
    const region = routePath.split("/").filter(Boolean).pop() ?? "";
    // `au: { ... heroHeadline: "..." ... }` - region config entries hold no
    // nested braces, so the first `}` closes the entry.
    const scoped = source.match(new RegExp(`\\b${region}:\\s*\\{[^}]*?${prop}:\\s*${literal}`));
    if (scoped) return [collapse(JSON.parse(`"${scoped[1]}"`))];
    return [...source.matchAll(new RegExp(`${prop}:\\s*${literal}`, "g"))].map((v) =>
      collapse(JSON.parse(`"${v[1]}"`)),
    );
  }
  const text = collapse(inner.replace(/<[^>]+>/g, " "));
  return text ? [text] : [];
}

/** Mirror text nodes, trimmed of edge punctuation, short scraps dropped. */
function mirrorChunks(html: string): string[] {
  return html
    .split(/<[^>]+>/)
    .map((t) => collapse(t).replace(/^[^A-Za-z0-9€£$]+|[^A-Za-z0-9€£$]+$/g, ""))
    .filter((t) => t.length >= 12);
}

export function checkPrerenderMirrors(distDir = "dist/public"): void {
  const errors: string[] = [];
  const prerenderPaths = new Set(PRERENDER_ROUTES.map((r) => r.path));

  for (const [routePath, mirror] of Object.entries(STATIC_HTML)) {
    if (!prerenderPaths.has(routePath)) {
      errors.push(`${routePath}: has a mirror but is not in PRERENDER_ROUTES, so it is never written`);
      continue;
    }
    const componentRel = PAGE_COMPONENTS[routePath];
    if (!componentRel) {
      errors.push(`${routePath}: has a mirror but no PAGE_COMPONENTS entry in script/check-prerender-mirrors.ts, so it cannot be verified`);
      continue;
    }

    const source = normalisedComponentSource(componentRel);
    const h1s = componentH1s(source, routePath);
    if (!h1s.length) {
      errors.push(`${routePath}: no <h1> text found in ${componentRel}`);
      continue;
    }

    // 1. The built file must carry the component's H1 text in raw HTML.
    const distFile = path.join(
      REPO_ROOT,
      distDir,
      routePath === "/" ? "index.html" : `${routePath.replace(/^\//, "")}.html`,
    );
    if (!existsSync(distFile)) {
      errors.push(`${routePath}: built file ${path.relative(REPO_ROOT, distFile)} does not exist`);
    } else {
      const built = readFileSync(distFile, "utf-8");
      if (!h1s.some((h1) => built.includes(h1))) {
        errors.push(`${routePath}: built file ${path.relative(REPO_ROOT, distFile)} does not contain the page's H1 text "${h1s.join('" / "')}"`);
      }
    }

    // 2. Every mirror text chunk must exist verbatim in the page component.
    if (!VERBATIM_EXEMPT.has(routePath)) {
      for (const chunk of mirrorChunks(mirror)) {
        if (!source.includes(chunk)) {
          errors.push(`${routePath}: mirror text not found in ${componentRel}: "${chunk}"`);
        }
      }
    }
  }

  const unmirrored = PRERENDER_ROUTES.filter((r) => !STATIC_HTML[r.path]).map((r) => r.path);
  if (unmirrored.length) {
    console.log(`[check-prerender-mirrors] routes without a body mirror (head-only prerender): ${unmirrored.join(", ")}`);
  }

  if (errors.length) {
    throw new Error(
      `[check-prerender-mirrors] ${errors.length} problem(s):\n  - ${errors.join("\n  - ")}\n` +
        `A mirror must carry the same text as its page component. Update client/src/lib/seo-static-html.ts in the same commit as the page copy.`,
    );
  }
  console.log(`[check-prerender-mirrors] OK: ${Object.keys(STATIC_HTML).length} mirrors match their page components and built files`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    checkPrerenderMirrors();
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
