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
    title: "Streamlined Tech – Custom internal apps for mining and construction",
    description:
      "Custom internal apps and workflow automation for mining and construction. Track progress, close out defects and automate the follow-ups, so work stops stalling between steps.",
    canonical: "/",
  },
  business: {
    path: "/business",
    title: "Streamlined Tech | AI adoption for Irish businesses",
    description:
      "Practical AI adoption for Irish businesses. An audit of where your time actually goes, then automation built around how you already work.",
    canonical: "/business",
  },
  contractors: {
    path: "/contractors",
    title: "Internal apps for construction and heavy industry | Streamlined Tech",
    description:
      "Custom AI-powered internal apps for construction and heavy industry contractors in Ireland. Every job on one screen, crews and machines scheduled, dockets and timesheets off paper. Built in Galway.",
    canonical: "/contractors",
  },
  australia: {
    path: "/australia",
    title: "Internal apps for Australian mining and construction | Streamlined Tech",
    description:
      "Custom internal apps and workflow automation for Australian mining and construction operations. Progress tracking, defects and close-out, follow-ups that happen without chasing.",
    canonical: "/australia",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy | Streamlined Tech",
    description: "How Streamlined Tech collects, uses and stores your data.",
    canonical: "/privacy",
  },
  terms: {
    path: "/terms",
    title: "Terms and Conditions | Streamlined Tech",
    description: "The terms that apply to Streamlined Tech's services and website.",
    canonical: "/terms",
  },
  details: {
    path: "/details",
    title: "The full rundown | Streamlined Tech",
    description: "What Streamlined Tech builds for mining and construction crews.",
    canonical: "/details",
    noindex: true,
  },
  detailsThanks: {
    path: "/details/thanks",
    title: "On its way | Streamlined Tech",
    description: "Thanks for getting in touch with Streamlined Tech.",
    canonical: "/details/thanks",
    noindex: true,
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
  ROUTE_SEO.business,
  ROUTE_SEO.contractors,
  ROUTE_SEO.australia,
  ROUTE_SEO.privacy,
  ROUTE_SEO.terms,
  ROUTE_SEO.details,
  ROUTE_SEO.detailsThanks,
];
