import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { currentPrices, inline } from "@/lib/pricing";
import { FAQ_ITEMS, FAQ_PRICING_LINK, faqParts } from "@/lib/faq";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";

// The answers are in client/src/lib/faq.ts, shared with the FAQPage
// structured data and the crawl copy so the three cannot drift. The prices in
// the cost answer come from client/src/lib/pricing.ts. No buttons in the
// list: the page's one call block follows at the end.

export default function Faq() {
  useSeo(ROUTE_SEO.faq);
  const prices = currentPrices();

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">Questions people ask</h1>
            <p className="st-lede">
              Plain answers about cost, the free demo, how long it takes, and who looks after the app afterwards.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-questions">
          <div className="st-wrap st-narrow">
            <dl className="st-faq st-faq--plain">
              {FAQ_ITEMS.map((item) => (
                <div key={item.q}>
                  <dt>{item.q}</dt>
                  <dd>
                    {faqParts(item.a).map((part, i) => {
                      if (part.token === "build") return <span key={i}>{prices.build}</span>;
                      if (part.token === "monthly") return <span key={i}>{inline(prices.monthly)}</span>;
                      if (part.token === "link") return <Link key={i} href={FAQ_PRICING_LINK.href}>{FAQ_PRICING_LINK.text}</Link>;
                      return part.text;
                    })}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
