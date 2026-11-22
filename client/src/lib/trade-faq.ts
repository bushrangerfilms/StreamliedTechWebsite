/**
 * The four questions on each trade page, in one place, because the same words
 * are used three times: on the page (client/src/components/trade-sections.tsx),
 * in the FAQPage structured data (client/src/lib/seo-routes.ts) and in the
 * crawl copy (client/src/lib/seo-static-html.ts). Marked-up answers must be
 * the visible answers, word for word.
 *
 * The price is never written here. The cost answer carries the visitor's
 * market build price and monthly wording from client/src/lib/pricing.ts.
 *
 * Answers come only from the live site and the allowed facts in the PM brief
 * of 18 Nov 2026 (streamlined-bot-files atlas-website/briefs/
 * 2026-11-18-seo-trade-pages.md, section 3.4). Add nothing without a source.
 */

export type TradeKey = "windowDoor" | "pestControl" | "engineering" | "laboratory";

/** The countries in the shared structured data (client/index.html). */
export const AREA_SERVED = ["Ireland", "United Kingdom", "United States", "Australia"];

export const FAQ_COST = {
  q: "How much does it cost?",
  // The build price is put in front of this, and the monthly wording after it
  // (both from client/src/lib/pricing.ts); aEnd follows the monthly wording.
  a: "for the build, then",
  aEnd: "You get the price in writing before anything is built.",
  more: "How it works, step by step",
  moreHref: "/how-it-works",
};

export const FAQ_CHANGE = {
  q: "Do we have to change how we work?",
  a: "No. We build it around how you already work. If it looks like a fit, you get a free demo first, so you can see it before you decide.",
};

export const FAQ_AFTER = {
  q: "Who looks after it afterwards?",
  a: "We do. The monthly fee covers hosting, storage, support from real people and ongoing refinements to what we built. Every app has a Feedback button: tell us what isn't right and we change it and let you know.",
};

export const FAQ_TRADE: Record<TradeKey, { q: string; a: string }> = {
  windowDoor: {
    q: "Can it show where the vans are and what they load?",
    a: "It shows the plan. The calendar has a column for each van, each crew sees its day on the phone, and the pick list shows what the van loads in the morning. It does not track vans live on a map.",
  },
  pestControl: {
    q: "Can customers see their own reports?",
    a: "Yes. A customer can have their own login to see their own reports.",
  },
  engineering: {
    q: "Can it make our certificates and letters?",
    a: "Yes. They are made from your own Word templates, which we set up for you.",
  },
  laboratory: {
    q: "Do customers need a password?",
    a: "No. They sign in with a code sent to their email.",
  },
};

/** The four questions as plain text, with the prices in the cost answer. */
export function faqPlainText(trade: TradeKey, buildPrice: string, monthlyInline: string): { q: string; a: string }[] {
  return [
    { q: FAQ_COST.q, a: `${buildPrice} ${FAQ_COST.a} ${monthlyInline}. ${FAQ_COST.aEnd} ${FAQ_COST.more}.` },
    FAQ_CHANGE,
    FAQ_AFTER,
    FAQ_TRADE[trade],
  ];
}
