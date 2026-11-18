/**
 * Prices by market: the ONE place a price or its tax wording is written.
 *
 * Pete, 18 Nov 2026: show prices in the visitor's local currency, picked from
 * Vercel's country header (x-vercel-ip-country). There is no live exchange
 * rate: each market has fixed, rounded price points, set here by hand.
 *
 * Which market a visitor gets:
 *   - "eur-vat": Ireland and the rest of the EU. Euro, "+ VAT".
 *   - "gbp":     the UK. Pounds, "+ VAT".
 *   - "usd":     the US. Dollars, no tax wording.
 *   - "aud":     Australia. Australian dollars, "excl. GST".
 *   - "eur":     everywhere else, and when the country is not known. Euro, no
 *                tax wording. This is the default.
 *
 * How it reaches the page: the build writes every page once per market into
 * dist/public/_m/<market>/ with that market's prices already in the HTML (so
 * a price shows with no JavaScript), and vercel.json rewrites each request to
 * the right folder by country. They are plain static files: nothing is worked
 * out per request, and nothing here needs a setting in Vercel. Each file
 * carries <meta name="st-market">, which is how the app knows its market once
 * JavaScript runs. The build fails if vercel.json and MARKET_COUNTRIES drift
 * (script/check-prerender-mirrors.ts).
 *
 * THE GBP, USD AND AUD FIGURES ARE PROPOSALS (Claude, 18 Nov 2026), not yet
 * approved by Pete. The euro figures are his (17 Nov 2026) and must not change.
 */

export type Market = "eur" | "eur-vat" | "gbp" | "usd" | "aud";

export const DEFAULT_MARKET: Market = "eur";

export const MARKETS: Record<Market, { currency: string; build: string; whole: string }> = {
  eur: { currency: "EUR", build: "From €4,900", whole: "From €120,000" },
  "eur-vat": { currency: "EUR", build: "From €4,900 + VAT", whole: "From €120,000 + VAT" },
  gbp: { currency: "GBP", build: "From £4,200 + VAT", whole: "From £100,000 + VAT" },
  usd: { currency: "USD", build: "From $5,500", whole: "From $130,000" },
  aud: { currency: "AUD", build: "From A$8,500 excl. GST", whole: "From A$200,000 excl. GST" },
};

/** The 27 EU member states, as two-letter country codes. */
export const EU_COUNTRIES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
];

/**
 * Country to market, in the order vercel.json must test them. A market with
 * `countries: null` takes every country not matched above it. A request with
 * no country at all gets DEFAULT_MARKET.
 */
export const MARKET_COUNTRIES: { market: Market; countries: string[] | null }[] = [
  { market: "gbp", countries: ["GB"] },
  { market: "usd", countries: ["US"] },
  { market: "aud", countries: ["AU"] },
  { market: "eur-vat", countries: EU_COUNTRIES },
  { market: "eur", countries: null },
];

/** The market the page was built for (see the header comment). */
export function currentMarket(): Market {
  if (typeof document === "undefined") return DEFAULT_MARKET;
  const value = document.querySelector('meta[name="st-market"]')?.getAttribute("content");
  return value && value in MARKETS ? (value as Market) : DEFAULT_MARKET;
}

export function currentPrices() {
  return MARKETS[currentMarket()];
}
