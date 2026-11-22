import type { Plugin } from "vite";
import fs from "fs";
import path from "path";
import { PRERENDER_ROUTES, SITE_ORIGIN, type RouteSeo } from "./client/src/lib/seo-routes";
import { STATIC_HTML } from "./client/src/lib/seo-static-html";
import { DEFAULT_MARKET, MARKETS, inline, type Market } from "./client/src/lib/pricing";

/**
 * Writes one static HTML file per route with that route's meta baked in.
 *
 * The app is a client-rendered SPA, so `useSeo` sets titles, descriptions and
 * OG tags only after JavaScript runs. Google renders JS and sees them, but the
 * Facebook and LinkedIn scrapers do not, so every shared link was pulling the
 * homepage's card no matter which page was shared.
 *
 * Marketing routes also get a static text mirror of the page's rendered copy
 * baked inside <div id="root"> (from seo-static-html.ts), because many
 * crawlers and most AI answer engines read raw HTML without executing
 * JavaScript. The mirror is the same copy every visitor sees once React
 * mounts, never different text, so this is not cloaking: crawlers get the
 * words, visitors get the same words rendered by the client.
 */
export function prerenderMetaPlugin(): Plugin {
  let outDir = "";
  let refused = false;

  return {
    name: "vite-plugin-prerender-meta",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    buildStart() {
      try {
        refuseDraftLegalPagesInProduction();
      } catch (err) {
        refused = true;
        throw err;
      }
    },
    closeBundle() {
      // closeBundle still runs after a failed build. Say nothing more, so
      // the refusal above is the error the build log shows.
      if (refused) return;
      const shellPath = path.join(outDir, "index.html");
      if (!fs.existsSync(shellPath)) {
        console.warn("[prerender-meta] no index.html in outDir, skipping");
        return;
      }

      const shell = fs.readFileSync(shellPath, "utf-8");

      // Every page is written once per market, into _m/<market>/, with that
      // market's prices already in the HTML (client/src/lib/pricing.ts).
      // vercel.json sends each visitor to their market's folder by country.
      for (const market of Object.keys(MARKETS) as Market[]) {
        for (const route of PRERENDER_ROUTES) {
          const html = forMarket(applyMeta(shell, route), market, route.path);
          const file = route.path === "/" ? "index.html" : `${route.path.replace(/^\//, "")}.html`;
          const target = path.join(outDir, "_m", market, file);
          fs.mkdirSync(path.dirname(target), { recursive: true });
          fs.writeFileSync(target, html, "utf-8");
        }
        console.log(`[prerender-meta] wrote _m/${market}/ (${PRERENDER_ROUTES.length} pages)`);
      }
      // No index.html may be left at the root: Vercel serves a file before it
      // looks at any rewrite, so a root index.html would give every country
      // the same home page.
      fs.rmSync(shellPath);
    },
  };
}

/**
 * The privacy and terms pages ship as drafts with [PETE TO CONFIRM] markers
 * so Pete can read them on a preview. They must never reach the live site in
 * that state, so a Vercel production build stops here while a marker or the
 * draft box remains. It lives in this plugin because Vercel builds the site
 * with `vite build`, not `npm run build`. Previews and local builds pass.
 */
function refuseDraftLegalPagesInProduction(): void {
  if (process.env.VERCEL_ENV !== "production") return;
  const pagesDir = path.join(import.meta.dirname, "client", "src", "pages");
  const open: string[] = [];
  for (const page of ["privacy.tsx", "terms.tsx"]) {
    const text = fs.readFileSync(path.join(pagesDir, page), "utf-8");
    const markers = text.split("PETE TO CONFIRM").length - 1;
    const draftBox = text.includes("st-draft");
    if (markers > 0 || draftBox) {
      open.push(`${page}: ${markers} [PETE TO CONFIRM] marker(s)${draftBox ? ", draft box still present" : ""}`);
    }
  }
  if (open.length) {
    throw new Error(
      `[prerender-meta] Production build refused: the legal pages are still drafts.\n  - ${open.join("\n  - ")}\n` +
        "Pete fills each [PETE TO CONFIRM] fact and approves the wording, and the draft box is removed, before go-live.",
    );
  }
}

/** One page's HTML for one market: its prices swapped in and its market marked. */
function forMarket(html: string, market: Market, routePath: string): string {
  const from = MARKETS[DEFAULT_MARKET];
  const to = MARKETS[market];
  // Each figure appears in its capitalised form ("From €4,900") and in its
  // sentence-middle form ("from €4,900"); both are counted and both swapped.
  const count = (text: string) => html.split(text).length - 1 + (html.split(inline(text)).length - 1);
  const builds = count(from.build);
  const wholes = count(from.whole);
  const monthlies = count(from.monthly);
  // A trade page carries the build price and the monthly wording three times
  // each: the cost section, the visible FAQ answer and the same answer in the
  // FAQPage structured data. /pricing carries them in the page and in the
  // description, og:description and twitter:description. /faq carries them in
  // the cost answer and in its structured data.
  const expected: Record<string, [number, number, number]> = {
    "/": [1, 1, 1],
    "/how-it-works": [2, 1, 2],
    "/pricing": [4, 1, 5],
    "/faq": [2, 0, 2],
    "/window-and-door-software": [3, 0, 3],
    "/pest-control-app": [3, 0, 3],
    "/engineering-firm-software": [3, 0, 3],
    "/laboratory-sample-collection-app": [3, 0, 3],
  };
  const want = expected[routePath] ?? [0, 0, 0];
  if (builds !== want[0] || wholes !== want[1] || monthlies !== want[2]) {
    throw new Error(
      `[prerender-meta] ${routePath}: expected ${want[0]} build price(s), ${want[1]} whole-business price(s) and ${want[2]} monthly price(s) in the page, found ${builds}, ${wholes} and ${monthlies}. A price must come from client/src/lib/pricing.ts and nowhere else.`,
    );
  }
  const swap = (text: string, one: string, two: string) =>
    text.split(one).join(two).split(inline(one)).join(inline(two));
  const priced = swap(swap(swap(html, from.whole, to.whole), from.build, to.build), from.monthly, to.monthly);
  const marked = priced.replace(/<\/head>/i, `  <meta name="st-market" content="${market}" />\n  </head>`);
  if (marked === priced) throw new Error(`[prerender-meta] ${routePath}: no </head> to mark the market in`);
  return marked;
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function replaceMetaContent(html: string, attr: string, name: string, content: string): string {
  const pattern = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`, "i");
  if (pattern.test(html)) {
    return html.replace(pattern, `$1${escapeAttr(content)}$2`);
  }
  // Tag absent from the shell, so add it rather than silently dropping it.
  return html.replace(
    /<\/head>/i,
    `  <meta ${attr}="${name}" content="${escapeAttr(content)}" />\n  </head>`,
  );
}

function applyMeta(shell: string, route: RouteSeo): string {
  const canonicalUrl = `${SITE_ORIGIN}${route.canonical}`;
  let html = shell;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeAttr(route.title)}</title>`,
  );

  html = replaceMetaContent(html, "name", "description", route.description);
  html = replaceMetaContent(html, "property", "og:title", route.title);
  html = replaceMetaContent(html, "property", "og:description", route.description);
  html = replaceMetaContent(html, "property", "og:url", canonicalUrl);
  html = replaceMetaContent(html, "name", "twitter:title", route.title);
  html = replaceMetaContent(html, "name", "twitter:description", route.description);
  if (route.image) {
    const imageUrl = `${SITE_ORIGIN}${route.image}`;
    html = replaceMetaContent(html, "property", "og:image", imageUrl);
    html = replaceMetaContent(html, "name", "twitter:image", imageUrl);
  }

  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i,
    `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`,
  );

  if (route.noindex) {
    html = html.replace(
      /<\/head>/i,
      `  <meta name="robots" content="noindex, follow" />\n  </head>`,
    );
  }

  // Static crawlable body for crawlers that do not run JavaScript.
  // createRoot replaces it the moment React mounts. A mirror that cannot be
  // injected is a route that silently ships an empty body to AI crawlers,
  // so fail the build rather than warn.
  const staticHtml = STATIC_HTML[route.path];
  if (staticHtml) {
    const withBody = html.replace(
      /<div id="root"><\/div>/i,
      `<div id="root">${staticHtml}</div>`,
    );
    if (withBody === html) {
      throw new Error(
        `[prerender-meta] ${route.path}: shell has no empty <div id="root"></div> to inject the static body mirror into`,
      );
    }
    html = withBody;
  }

  // Route-specific JSON-LD, alongside the shell's organisation node. The
  // < escape keeps any '<' in values from terminating the script tag.
  if (route.jsonLd) {
    const json = JSON.stringify(route.jsonLd).replace(/</g, "\\u003c");
    html = html.replace(
      /<\/head>/i,
      `  <script type="application/ld+json">${json}</script>\n  </head>`,
    );
  }

  // Strip any image preloads the shell carries and inject this route's
  // own, so a route preloads only what it needs.
  html = html.replace(/[ \t]*<link\s+rel="preload"\s+as="image"[^>]*\/>\r?\n?/gi, "");
  if (route.preloads?.length) {
    const tags = route.preloads
      .map((p) => {
        const media = p.media ? ` media="${escapeAttr(p.media)}"` : "";
        return `    <link rel="preload" as="image" href="${escapeAttr(p.href)}"${media} fetchpriority="high" />\n`;
      })
      .join("");
    html = html.replace(/<link rel="preconnect"/i, `${tags}    <link rel="preconnect"`);
  }

  return html;
}
