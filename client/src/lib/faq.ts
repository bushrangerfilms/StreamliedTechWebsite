/**
 * The site-wide FAQ (/faq), in one place, because the same words are used
 * three times: on the page (client/src/pages/faq.tsx), in the FAQPage
 * structured data (client/src/lib/seo-routes.ts) and in the crawl copy
 * (client/src/lib/seo-static-html.ts). Marked-up answers must be the visible
 * answers, word for word.
 *
 * Answers are Pete's approved wording (streamlined-bot-files
 * atlas-website/briefs/website-ai-ready-1122.md, section 3.1, with his
 * ownership lines of 22 Nov 2026). Add nothing without a source: no change
 * log, no "your data stays yours", no "AI does not train on your data", no
 * nightly copy, no hand-off pack.
 *
 * No price is written here. {build} and {monthly} are put in from
 * client/src/lib/pricing.ts, by the visitor's market. {link} is the link to
 * /pricing.
 */

export type FaqTokens = { build: string; monthly: string; link: string };

export const FAQ_PRICING_LINK = { text: "Pricing", href: "/pricing" };

export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "How much does it cost?",
    a: "{build} for the build, then {monthly}. You get the price in writing before anything is built. A 50% deposit starts the build, and you pay the second half once it is working on your own jobs. The monthly fee includes hosting, human support and ongoing app refinements. There is no charge per user. Some businesses need more than one app: that is a separate offer, the Whole Business Build. See {link}.",
  },
  {
    q: "How long will it take?",
    a: "The demo usually takes a few days. The build is done within 2 weeks of your go-ahead, and then there are two weeks of field testing on your own jobs. We don't give a finish date. We give the timeline.",
  },
  {
    q: "How does the free demo work?",
    a: "Tell us how your business runs on a 10 to 15 minute phone call. If it looks like a fit, we build a demo of your own app, usually within a few days, from what you told us. It uses made-up sample data, so you can click anything. It won't be perfect and it isn't meant to be: it gives you something to react to. Editing is easier than creating. There is no charge for the demo. We don't promise a demo to everyone, only when it looks like a fit.",
  },
  {
    q: "What is the two-week field test?",
    a: "After the build, you use the app on your own jobs for two weeks while we refine it. You pay the second half once it is working for you. The monthly fee starts after field testing.",
  },
  {
    q: "Who looks after it afterwards?",
    a: "We do. The monthly fee covers hosting, storage, support from real people and ongoing refinements to what we built. Every app has a Feedback button: tell us what isn't right and we change it and let you know. A dedicated product manager looks after your app.",
  },
  {
    q: "What happens after the first build?",
    a: "The monthly fee includes hosting, human support and ongoing refinements to the features in your build. A genuinely new feature is priced separately, at a fraction of the first build, and the monthly fee goes up a little with it.",
  },
  {
    q: "Who owns the app and the data?",
    a: "Every member of your staff gets their own login, with access levels. There are no lock-in contracts. You have your own independent backups, which you can take to another developer for hosting.",
  },
  {
    q: "Who is it for?",
    a: "Trade and service businesses where the work has outgrown the paperwork: jobs tracked in a diary, a spreadsheet and a few apps that don't talk to each other; services, certs and renewals that come due without anyone noticing; job sheets and photos that never make it back to the office; quotes and invoices waiting on someone to chase them. We have built for window and door companies, pest control, engineering firms and laboratories. If yours isn't in that list, ask for a call and tell us how a job runs.",
  },
  {
    q: "Do we have to change how we work?",
    a: "No. We build it around how you already work. If it looks like a fit, you get a free demo first, so you can see it before you decide.",
  },
  {
    q: "Will it work with my accounting software?",
    a: "Usually. We'd keep your accounting software, because it keeps up with tax law for you, and link your app to it. Xero links best, then QuickBooks. Ask us about others.",
  },
  {
    q: "I'm not technical. Will I break it?",
    a: "You can't break it. Few clicks, and nobody has needed training so far.",
  },
  {
    q: "What if something's wrong after it's built?",
    a: "Every app has a Feedback button. Tell us what isn't right and we change it and let you know. It is included in the monthly fee.",
  },
  {
    q: "Why not an off-the-shelf app?",
    a: "Off-the-shelf software works if someone sits at a desk feeding it. Ours does the chasing without them.",
  },
  {
    q: "Can't I just use ChatGPT?",
    a: "For one-off jobs, yes. But you have to do it every time, and it forgets your rules.",
  },
];

const TOKEN = /(\{build\}|\{monthly\}|\{link\})/;

/** An answer cut into plain text and the three places a price or link goes. */
export function faqParts(answer: string): { text: string; token?: "build" | "monthly" | "link" }[] {
  return answer
    .split(TOKEN)
    .filter((part) => part !== "")
    .map((part) => {
      const m = part.match(/^\{(build|monthly|link)\}$/);
      return m ? { text: part, token: m[1] as "build" | "monthly" | "link" } : { text: part };
    });
}

/** The answers as plain text, which is what the FAQPage structured data carries. */
export function faqPlainText(tokens: Omit<FaqTokens, "link">): { q: string; a: string }[] {
  return FAQ_ITEMS.map((item) => ({
    q: item.q,
    a: item.a
      .replace("{build}", tokens.build)
      .replace("{monthly}", tokens.monthly)
      .replace("{link}", FAQ_PRICING_LINK.text),
  }));
}
