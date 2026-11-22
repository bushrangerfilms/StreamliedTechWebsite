import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { currentPrices } from "@/lib/pricing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";
import { PricingBlock } from "@/components/pricing-block";

// Copy on this page is mirrored word for word in
// client/src/lib/seo-static-html.ts ("/pricing"). Change both together.
// Every figure comes from client/src/lib/pricing.ts by the visitor's market;
// never write a price here. The cards carry no button: the page's one call
// block follows at the end (Pete, 17 Nov 2026: fewer call buttons). No
// per-user price, no finish date, no invented package names.

export default function Pricing() {
  useSeo(ROUTE_SEO.pricing);
  const prices = currentPrices();

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">Pricing</h1>
            <p className="st-lede">
              A build fee, then a monthly fee. You get the price in writing before anything is built.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-pricing">
          <div className="st-wrap">
            <h2>What it costs</h2>
            <PricingBlock />
          </div>
        </section>

        <section className="st-section st-section--tint" data-testid="section-monthly">
          <div className="st-wrap st-narrow">
            <h2>The monthly fee</h2>
            <p>
              <span>{prices.monthly}</span>, which includes hosting, human support and ongoing app refinements.
            </p>
            <p>It starts after field testing. There is no charge per user.</p>
            <p>
              A genuinely new feature is priced separately, at a fraction of the first build, and the monthly fee goes up a little with it.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-payment">
          <div className="st-wrap st-narrow">
            <h2>How payment works</h2>
            <p>You get the price in writing before anything is built.</p>
            <p>A 50% deposit starts the build. You pay the second half once it is working on your own jobs.</p>
            <p>
              <Link href="/how-it-works" data-testid="link-how-it-works">How it works, step by step</Link>
            </p>
            <p>
              <Link href="/faq" data-testid="link-faq">Questions people ask</Link>
            </p>
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
