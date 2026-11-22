// The vercel.json rewrites that send each visitor to their market's copy of
// the site (dist/public/_m/<market>/), worked out from the one pricing config
// in client/src/lib/pricing.ts.
//
//   npx tsx script/market-rewrites.ts --write   rewrites the "rewrites" list in vercel.json
//
// script/check-prerender-mirrors.ts fails the build if vercel.json and this
// list differ, so the two cannot drift. Vercel reads the visitor's country
// from its own x-vercel-ip-country header; a visitor cannot set it.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DEFAULT_MARKET, MARKET_COUNTRIES, type Market } from "../client/src/lib/pricing";
import { PRERENDER_ROUTES } from "../client/src/lib/seo-routes";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const COUNTRY_HEADER = "x-vercel-ip-country";

type Has = { type: "header"; key: string; value?: string };
export type Rewrite = { source: string; has?: Has[]; destination: string };

function rulesFor(market: Market, has?: Has[]): Rewrite[] {
  const pages = PRERENDER_ROUTES.map((r) => r.path.replace(/^\//, "")).filter(Boolean).join("|");
  const withHas = (r: Rewrite): Rewrite => (has ? { source: r.source, has, destination: r.destination } : r);
  return [
    withHas({ source: "/", destination: `/_m/${market}/index.html` }),
    withHas({ source: `/:page(${pages})`, destination: `/_m/${market}/:page.html` }),
    // Everything else that is not a file, an API route or Vercel's own path: the app shell.
    // /llms.txt and /agents.md are real files for agents (client/public); they
    // are left out so a missing one can never fall through to the home page.
    withHas({ source: "/((?!api/|_vercel/|llms\\.txt$|agents\\.md$).*)", destination: `/_m/${market}/index.html` }),
  ];
}

export function expectedRewrites(): Rewrite[] {
  const out: Rewrite[] = [];
  for (const { market, countries } of MARKET_COUNTRIES) {
    const has: Has = countries
      ? { type: "header", key: COUNTRY_HEADER, value: countries.length === 1 ? countries[0] : `(${countries.join("|")})` }
      : // Any other country. A value is given on purpose: with none, Vercel's own
        // rule compiler adds the header to the destination as a query string.
        { type: "header", key: COUNTRY_HEADER, value: ".+" };
    out.push(...rulesFor(market, [has]));
  }
  // No country header at all (never the case on Vercel; true of any other host).
  out.push(...rulesFor(DEFAULT_MARKET));
  return out;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const file = path.join(REPO_ROOT, "vercel.json");
  const config = JSON.parse(readFileSync(file, "utf-8"));
  if (process.argv.includes("--write")) {
    config.rewrites = expectedRewrites();
    writeFileSync(file, JSON.stringify(config, null, 2) + "\n", "utf-8");
    console.log(`[market-rewrites] wrote ${config.rewrites.length} rewrites to vercel.json`);
  } else {
    console.log(JSON.stringify(expectedRewrites(), null, 2));
  }
}
