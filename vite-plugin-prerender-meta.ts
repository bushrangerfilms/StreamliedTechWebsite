import type { Plugin } from "vite";
import fs from "fs";
import path from "path";
import { PRERENDER_ROUTES, SITE_ORIGIN, type RouteSeo } from "./client/src/lib/seo-routes";

/**
 * Writes one static HTML file per route with that route's meta baked in.
 *
 * The app is a client-rendered SPA, so `useSeo` sets titles, descriptions and
 * OG tags only after JavaScript runs. Google renders JS and sees them, but the
 * Facebook and LinkedIn scrapers do not, so every shared link was pulling the
 * homepage's card no matter which page was shared.
 *
 * These files carry identical body content to the SPA shell and differ only in
 * the head, so this is not cloaking: every visitor and crawler gets the same
 * page, and the client hydrates over it as normal.
 */
export function prerenderMetaPlugin(): Plugin {
  let outDir = "";

  return {
    name: "vite-plugin-prerender-meta",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const shellPath = path.join(outDir, "index.html");
      if (!fs.existsSync(shellPath)) {
        console.warn("[prerender-meta] no index.html in outDir, skipping");
        return;
      }

      const shell = fs.readFileSync(shellPath, "utf-8");

      for (const route of PRERENDER_ROUTES) {
        const html = applyMeta(shell, route);
        // "/" is the shell itself; everything else becomes <path>.html, which
        // the host rewrites to explicitly.
        const target =
          route.path === "/"
            ? shellPath
            : path.join(outDir, `${route.path.replace(/^\//, "")}.html`);

        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, html, "utf-8");
        console.log(`[prerender-meta] wrote ${path.relative(outDir, target)}`);
      }
    },
  };
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

  // The shell carries the home route's LCP image preloads. Strip them and
  // inject this route's own, so a gradient-hero page preloads nothing and
  // /australia preloads its mining pair without every other route paying
  // for it.
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
