export const SITE_ORIGIN = "https://streamlinedai.tech";

export interface RouteSeo {
  /** Path the crawler requests. Also the prerendered file's name. */
  path: string;
  title: string;
  description: string;
  /** Path only. Aliased routes point at the path they should be indexed under. */
  canonical: string;
  /** Keep out of results. Crawling stays allowed so the tag is seen. */
  noindex?: boolean;
  /**
   * Path of a 1200x630 share image, when a route should not use the shell's
   * generic card. Only the prerendered head uses it: link scrapers never run
   * the client, so there is no runtime counterpart.
   */
  image?: string;
  /**
   * LCP image preloads for this route. The prerender plugin strips the
   * shell's image preloads and injects these instead, so a route
   * preloads only what it needs.
   */
  preloads?: { href: string; media?: string }[];
  /**
   * Route-specific JSON-LD, injected into the prerendered head alongside
   * the shell's organisation node. Baked at build time on purpose: AI and
   * search crawlers that read raw HTML without running JavaScript still
   * see it.
   */
  jsonLd?: Record<string, unknown>;
  /**
   * Static crawlable body mirrors used to be a `staticHtml` field here.
   * They now live in seo-static-html.ts, keyed by path, so they stay out
   * of the client bundle (every page imports this file at runtime; the
   * mirrors are build-time-only bytes). The prerender plugin reads them
   * from there. Keep each mirror a faithful copy of its page's rendered
   * text - script/check-prerender-mirrors.ts enforces it at build time.
   */
}

/**
 * One source of truth for per-route metadata.
 *
 * Both consumers read from here on purpose. The runtime `useSeo` hook sets
 * these for real visitors, and the prerender build step bakes the same values
 * into a static file per route for crawlers that do not run JavaScript
 * (Facebook and LinkedIn among them). Keeping one table means the two cannot
 * drift, which is the failure this whole thing exists to prevent.
 */
export const ROUTE_SEO = {
  home: {
    path: "/",
    title: "Custom Apps for Irish Trade Businesses | Streamlined Tech",
    description:
      "One board for your jobs, customers and paperwork, built around how you already work. Tell us how you run things and we'll build you a free demo.",
    canonical: "/",
    image: "/images/og-card-home.png",
  },
  howItWorks: {
    path: "/how-it-works",
    title: "How It Works | Streamlined Tech",
    description:
      "A phone call, a free demo if it fits, a price in writing, the build, two weeks of testing on your own jobs, then we look after it.",
    canonical: "/how-it-works",
  },
  ourWork: {
    path: "/our-work",
    title: "Our Work | Streamlined Tech",
    description:
      "Custom apps Streamlined Tech has built for IPM Enviro and Komplete Engineers, and what each one does.",
    canonical: "/our-work",
  },
  about: {
    path: "/about",
    title: "About | Streamlined Tech",
    description:
      "Streamlined Tech builds custom apps for Irish trade and service businesses. Based in Galway, working with businesses across Ireland.",
    canonical: "/about",
  },
  contact: {
    path: "/contact",
    title: "Ask for a Call | Streamlined Tech",
    description:
      "Ask for a call and we'll ring you for 10 to 15 minutes about how your business runs. If an app wouldn't help, we'll tell you.",
    canonical: "/contact",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy | Streamlined Tech",
    description:
      "What personal data Streamlined Tech holds, why, who it is shared with, how long it is kept and what your rights are.",
    canonical: "/privacy",
  },
  terms: {
    path: "/terms",
    title: "Website Terms of Use | Streamlined Tech",
    description: "The terms that apply to the Streamlined Tech website and to any demo we send you.",
    canonical: "/terms",
  },
  admin: {
    path: "/dev",
    title: "Admin | Streamlined Tech",
    description: "Internal analytics.",
    canonical: "/dev",
    noindex: true,
  },
  notFound: {
    path: "/404",
    title: "Page not found | Streamlined Tech",
    description: "That page does not exist.",
    canonical: "/",
    noindex: true,
  },
} satisfies Record<string, RouteSeo>;

/**
 * Routes that get a prerendered HTML file. The 404 route is excluded: the host
 * rewrite means any unmatched path falls through to the SPA shell, so there is
 * no single path to write it to.
 */
export const PRERENDER_ROUTES: RouteSeo[] = [
  ROUTE_SEO.home,
  ROUTE_SEO.howItWorks,
  ROUTE_SEO.ourWork,
  ROUTE_SEO.about,
  ROUTE_SEO.contact,
  ROUTE_SEO.privacy,
  ROUTE_SEO.terms,
];
