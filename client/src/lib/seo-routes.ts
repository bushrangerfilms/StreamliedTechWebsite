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
   * shell's image preloads and injects these instead, so a page with a
   * gradient hero preloads nothing and /australia preloads its mining pair
   * without every other route paying for it.
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
   * Static body content baked inside <div id="root"> in the prerendered
   * file. OpenAI's crawlers (OAI-AdsBot included) read raw HTML and never
   * run JavaScript, so an SPA page is an empty body to them; this gives a
   * route real crawlable content. Keep it a faithful mirror of the page's
   * rendered copy, never different text. main.tsx uses createRoot, which
   * replaces this content when React mounts.
   */
  staticHtml?: string;
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
/**
 * The AI Employees campaign landers share one template with per-region
 * currency and wording. One URL per region (/ai-employees/<region>);
 * /ai-employees redirects to the Irish default. All noindex: they exist to
 * match each ad's message, not to rank, and the trend term stays
 * quarantined on them. The client-side twin of this config is REGIONS in
 * client/src/pages/ai-employees.tsx; keep the copy identical there.
 */
function aiEmployeesRoute(r: {
  regionPath: string;
  title: string;
  description: string;
  image: string;
  eyebrow: string;
  headline: string;
  priceHeading: string;
  priceBody: string;
  country: string;
  offerAudience: string;
  fortnightlyLine: string;
  exposureLine: string;
  lowPrice: string;
  priceCurrency: string;
  offerPriceText: string;
}): RouteSeo {
  const path = `/ai-employees/${r.regionPath}`;
  return {
    path,
    title: r.title,
    description: r.description,
    canonical: path,
    noindex: true,
    image: r.image,
    // Machine-readable offer, so ad platforms and AI crawlers pointed at
    // this landing page pick up the actual offer rather than guessing from
    // the site at large.
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI Employees",
      serviceType: "AI employee set-up and support",
      url: `https://streamlinedai.tech${path}`,
      description: `An AI employee is a system Streamlined Tech builds that does one named job in a business and keeps doing it. Full custom set-up for the business, human support, and the system runs around the clock. ${r.offerAudience}`,
      provider: {
        "@type": "ProfessionalService",
        name: "Streamlined Tech",
        url: "https://streamlinedai.tech/",
      },
      areaServed: { "@type": "Country", name: r.country },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: r.lowPrice,
        priceCurrency: r.priceCurrency,
        description: `${r.offerPriceText} a year for one AI employee doing one defined job, including full custom set-up and support. The exact figure is agreed in writing before work starts. Minimum one month, paid fortnightly, no lock-in contract; after the first month it can be stopped with two weeks' notice.`,
      },
    },
    // Mirror of the rendered page copy for crawlers that do not run JS.
    staticHtml: `
      <main class="container mx-auto px-6 py-16" style="max-width:48rem">
        <p class="text-sm font-semibold mb-2">${r.eyebrow}</p>
        <h1 class="text-4xl font-display font-bold mb-6">${r.headline}</h1>
        <p class="mb-6">An AI employee here is a system we build that does one named job in your business and keeps doing it. Answering enquiries and writing bookings into the diary. Chasing quotes and invoices. Tracking jobs and writing up the reports. Full custom set-up for your business, by us, not from a template.</p>
        <h2 class="text-xl font-display font-bold mb-2">Works 24/7</h2>
        <p class="mb-6">The system does not clock off. An enquiry that arrives at ten on a Sunday night is answered at ten on a Sunday night, and it is logged where you'll see it Monday morning.</p>
        <h2 class="text-xl font-display font-bold mb-2">Full human support</h2>
        <p class="mb-6">Real people built it and real people look after it. When something needs changing, you tell us and it gets changed. Support hours and response times are agreed in writing as part of the set-up.</p>
        <h2 class="text-xl font-display font-bold mb-2">${r.priceHeading}</h2>
        <p class="mb-6">${r.priceBody} ${r.fortnightlyLine}</p>
        <p class="mb-2"><strong>Minimum one month.</strong> Long enough to prove it, short enough to be a fair test.</p>
        <p class="mb-2"><strong>Paid fortnightly.</strong> Like the rest of the payroll. No big figure up front.</p>
        <p class="mb-6"><strong>No lock-in contract.</strong> After the first month you can stop with two weeks' notice, and the AI employee stops with it. ${r.exposureLine}</p>
        <p class="mb-6">There is also a smaller one-off build, from €3,900, where you get a tool and your team runs it. An AI employee is the other way round: the system does the job itself, and we look after it for the year.</p>
        <p class="mb-6">Your data stays yours: encrypted storage, strict access controls, isolated environments, your IP remains yours, and AI components do not train on or share your data.</p>
        <p class="mb-6">Get a quote on this page, book a call, or email peter@streamlinedai.tech. Streamlined Tech was founded by Pete Harris in Galway, Ireland, and builds and runs AutoListing.io and Rangplan.ie.</p>
      </main>`,
  };
}

export const ROUTE_SEO = {
  home: {
    path: "/",
    title: "Set Your Business Up with AI | Streamlined Tech",
    description:
      "We set businesses up with AI. Custom internal apps and automation around how you already run, from Galway for Irish businesses and Australian operations.",
    canonical: "/",
    image: "/images/og-card-home.png",
    preloads: [{ href: "/images/hero-operations.webp" }],
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
  guideSetUpAi: {
    path: "/guide/set-up-ai-for-business-ireland",
    title: "Set Up AI for Your Business in Ireland | Streamlined Tech",
    description:
      "Plain-English steps to set up AI for an Irish SMB. Pick one job, build one app, working inside two weeks.",
    canonical: "/guide/set-up-ai-for-business-ireland",
  },
  howItWorks: {
    path: "/how-it-works",
    title: "Custom Internal App Cost and Timeline | Streamlined Tech",
    description:
      "What a custom internal app costs in Ireland and how long the first build takes. From EUR3,900, working inside two weeks.",
    canonical: "/how-it-works",
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
    preloads: [
      { href: "/images/hero-mining-portrait.webp", media: "(max-width: 767px)" },
      { href: "/images/hero-mining.webp", media: "(min-width: 768px)" },
    ],
  },
  products: {
    path: "/products",
    title: "Software Products We Build and Run | Streamlined Tech",
    description:
      "AutoListing.io and Rangplan.ie, the software products Streamlined Tech builds and runs, and the proof behind the client work.",
    canonical: "/products",
  },
  aiEmployeesIe: aiEmployeesRoute({
    regionPath: "ie",
    fortnightlyLine: "That is about €580 a fortnight.",
    exposureLine: "At €15K a year, the most you can be out is under €1,900, not €15,000.",
    title: "AI Employees from €15K/year, Ireland | Streamlined Tech",
    description:
      "AI employees for Irish businesses, from €15K a year with human support. Full custom set-up around how you already run. No lock-in. Works 24/7.",
    image: "/images/og-card-ai-employees-ie.png",
    eyebrow: "For businesses in Ireland",
    headline: "AI Employees from €15K a year",
    priceHeading: "From €15K a year",
    priceBody:
      "That covers the full custom set-up of one AI employee doing one defined job, and the support to keep it running for the year, paid fortnightly. Priced for businesses in Ireland, and the exact figure is agreed in writing before anything starts.",
    country: "Ireland",
    offerAudience: "Offered to businesses in Ireland.",
    lowPrice: "15000",
    priceCurrency: "EUR",
    offerPriceText: "From EUR 15,000",
  }),
  // AU, UK and US anchors are €15K converted at rounded market rates and
  // rounded to clean figures. Changing a region's price means editing it
  // here, in REGIONS in ai-employees.tsx, and regenerating that region's
  // og card and square ad image.
  aiEmployeesAu: aiEmployeesRoute({
    regionPath: "au",
    fortnightlyLine: "That is about AU$960 a fortnight.",
    exposureLine: "At AU$25K a year, the most you can be out is under AU$3,100, not AU$25,000.",
    title: "AI Employees from AU$25K/year, Australia | Streamlined Tech",
    description:
      "AI employees for Australian businesses, from AU$25K a year with human support. Full custom set-up around how you already run. No lock-in. Works 24/7.",
    image: "/images/og-card-ai-employees-au.png",
    eyebrow: "For businesses in Australia",
    headline: "AI Employees from AU$25K a year",
    priceHeading: "From AU$25K a year",
    priceBody:
      "That covers the full custom set-up of one AI employee doing one defined job, and the support to keep it running for the year, paid fortnightly. Priced for businesses in Australia, and the exact figure is agreed in writing before anything starts.",
    country: "Australia",
    offerAudience: "Offered to businesses in Australia.",
    lowPrice: "25000",
    priceCurrency: "AUD",
    offerPriceText: "From AUD 25,000",
  }),
  aiEmployeesUk: aiEmployeesRoute({
    regionPath: "uk",
    fortnightlyLine: "That is £500 a fortnight.",
    exposureLine: "At £13K a year, the most you can be out is under £1,600, not £13,000.",
    title: "AI Employees from £13K/year, UK | Streamlined Tech",
    description:
      "AI employees for UK businesses, from £13K a year with human support. Full custom set-up around how you already run. No lock-in. Works 24/7.",
    image: "/images/og-card-ai-employees-uk.png",
    eyebrow: "For businesses in the UK",
    headline: "AI Employees from £13K a year",
    priceHeading: "From £13K a year",
    priceBody:
      "That covers the full custom set-up of one AI employee doing one defined job, and the support to keep it running for the year, paid fortnightly. Priced for businesses in the UK, and the exact figure is agreed in writing before anything starts.",
    country: "United Kingdom",
    offerAudience: "Offered to businesses in the UK.",
    lowPrice: "13000",
    priceCurrency: "GBP",
    offerPriceText: "From GBP 13,000",
  }),
  aiEmployeesUs: aiEmployeesRoute({
    regionPath: "us",
    fortnightlyLine: "That is about $650 a fortnight.",
    exposureLine: "At $17K a year, the most you can be out is under $2,150, not $17,000.",
    title: "AI Employees from $17K/year, United States | Streamlined Tech",
    description:
      "AI employees for US businesses, from $17K a year with human support. Full custom set-up around how you already run. No lock-in. Works 24/7.",
    image: "/images/og-card-ai-employees-us.png",
    eyebrow: "For businesses in the United States",
    headline: "AI Employees from $17K a year",
    priceHeading: "From $17K a year",
    priceBody:
      "That covers the full custom set-up of one AI employee doing one defined job, and the support to keep it running for the year, paid fortnightly. Priced for businesses in the United States, and the exact figure is agreed in writing before anything starts.",
    country: "United States",
    offerAudience: "Offered to businesses in the United States.",
    lowPrice: "17000",
    priceCurrency: "USD",
    offerPriceText: "From USD 17,000",
  }),
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
  ROUTE_SEO.guideSetUpAi,
  ROUTE_SEO.howItWorks,
  ROUTE_SEO.installers,
  ROUTE_SEO.australia,
  ROUTE_SEO.products,
  ROUTE_SEO.aiEmployeesIe,
  ROUTE_SEO.aiEmployeesAu,
  ROUTE_SEO.aiEmployeesUk,
  ROUTE_SEO.aiEmployeesUs,
  ROUTE_SEO.privacy,
  ROUTE_SEO.terms,
  ROUTE_SEO.details,
  ROUTE_SEO.detailsThanks,
];
