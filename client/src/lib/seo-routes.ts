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
    title: "Custom Apps for Mining and Construction | Streamlined Tech",
    description:
      "Custom internal apps for mining and construction crews. Jobs, dockets, timesheets and reporting off paper, set up around how your site already runs.",
    canonical: "/",
    image: "/images/og-card-mining.png",
  },
  business: {
    path: "/business",
    title: "Custom AI Apps for Irish Businesses, Galway | Streamlined Tech",
    description:
      "Custom internal apps for owner-run Irish businesses. Built in Galway, working across Ireland. From EUR3,900, first build working inside two weeks.",
    canonical: "/business",
  },
  contractors: {
    path: "/contractors",
    title: "Custom Apps for Irish Contractors | Streamlined Tech",
    description:
      "Custom apps for construction and heavy industry contractors in Ireland. Jobs, dockets, timesheets and walkaround checks off paper. Built in Galway.",
    canonical: "/contractors",
  },
  installers: {
    path: "/installers",
    title: "Solar and Heat Pump Installer Apps, Ireland | Streamlined Tech",
    description:
      "Custom apps for Irish solar, heat pump and retrofit installers. Grant packs, NC6 and NC7 forms and job packs off paper. Built in Galway.",
    canonical: "/installers",
  },
  australia: {
    path: "/australia",
    title: "Mining and Construction Apps, Australia | Streamlined Tech",
    description:
      "We build apps that get prestarts, dockets and job packs off paper for mining and construction contractor crews in Australia.",
    canonical: "/australia",
    image: "/images/og-card-mining.png",
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
    image: "/images/og-card-mining.png",
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
  ROUTE_SEO.installers,
  ROUTE_SEO.australia,
  ROUTE_SEO.privacy,
  ROUTE_SEO.terms,
  ROUTE_SEO.details,
  ROUTE_SEO.detailsThanks,
];
