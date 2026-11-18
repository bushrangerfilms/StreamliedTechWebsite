import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";

// The hub for the trade pages (PM brief seo-trade-pages-1118, 18 Nov 2026).
// Copy is mirrored word for word in client/src/lib/seo-static-html.ts.
// Only trades we have really built for are listed, and only Pete adds one
// (tools/seo-agent/config/trades-built.json). No client is named here.

const TRADES = [
  {
    href: "/window-and-door-software",
    title: "Software for window and door companies",
    line: "Every job from the first call to the final invoice, with measuring, fitting and what the van loads.",
  },
  {
    href: "/pest-control-app",
    title: "Job management app for pest control companies",
    line: "The technician scans each numbered unit, logs what they found, and the visit report writes itself.",
  },
  {
    href: "/engineering-firm-software",
    title: "Project software for engineering firms",
    line: "Quotes that chase themselves, a new project set up in one tap, and every live project at a glance.",
  },
  {
    href: "/laboratory-sample-collection-app",
    title: "Sample collection app for laboratories",
    line: "Customers mark samples ready and the driver sees the pickups on a map in driving order.",
  },
];

export default function Industries() {
  useSeo(ROUTE_SEO.industries);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">Industries we build custom apps for</h1>
            <p className="st-lede">
              We build custom apps for trade and service businesses. These are the kinds of business we have built for so far.
            </p>
            <p>If yours isn't here, ask for a call and tell us how a job runs.</p>
          </div>
        </section>

        <section className="st-section" data-testid="section-trades">
          <div className="st-wrap">
            <div className="st-cards st-cards--2">
              {TRADES.map((trade) => (
                <div key={trade.href} className="st-card">
                  <h2>
                    <Link href={trade.href}>{trade.title}</Link>
                  </h2>
                  <p>{trade.line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
