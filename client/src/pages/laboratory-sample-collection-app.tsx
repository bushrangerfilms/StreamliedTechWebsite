import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";
import { ScreenShot } from "@/components/screen-shot";
import { TradeChange, TradeCost, TradeFaq } from "@/components/trade-sections";

// A trade page (PM brief seo-trade-pages-1118, 18 Nov 2026). Copy on this page
// is mirrored word for word in client/src/lib/seo-static-html.ts. Change both
// together: the build fails if they drift.
//
// Rules: every feature sentence comes from the allowed facts for this trade in
// the brief (section 3.4) or from a sample screen caption. No figure, client,
// result or claim is added. Prices come only from client/src/lib/pricing.ts.
// The sample screens are the existing made-up ones; never a client app screen.
// One call button only: the ClosingCall at the end.
// No client is named on this page and it carries no testimonial. Say
// "customers" and "drivers" only. The app is in field testing: say "we have
// built", never "in use at", and make no result, date or compliance claim.
// The sample screens are not from a laboratory and are not captioned as such.

export default function LaboratorySampleCollectionApp() {
  useSeo(ROUTE_SEO.laboratory);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">Sample collection app for laboratories</h1>
            <p className="st-lede">
              If your lab collects samples from customers by van, someone has to work out who has samples ready and in what order to collect them.
            </p>
            <p>
              We have built an app where the customer marks their samples as ready, the driver sees the pickups on a map in driving order, and the office sees the whole round.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-board">
          <div className="st-wrap">
            <h2>What goes on your board</h2>
            <p className="st-narrow">
              We have built a sample collection app for a laboratory. Three kinds of people use it: the customer, the driver and the office.
            </p>
            <div className="st-beside">
              <div>
                <h3>For your customers</h3>
                <p>
                  The customer marks their samples as ready. They sign in with a code sent to their email, so there are no passwords to lose.
                </p>
                <h3>For the driver</h3>
                <p>
                  The driver sees the day's pickups on a map, in driving order. A new customer can be signed up by the driver or by the office.
                </p>
              </div>
              <ScreenShot screen="phone" phone />
            </div>
            <div className="st-beside">
              <div>
                <h3>For the office</h3>
                <p>
                  The office sees the next run, adds pickups and keeps the customer list. The office can also look at what the driver sees and what a customer sees.
                </p>
                <p>
                  The sample screens on this page come from apps for other kinds of business that send vans out. They show the sort of screen we mean. Yours is built around your own round and your own customers.
                </p>
                <p>It can start as one screen for one job and grow from there.</p>
              </div>
              <ScreenShot screen="diary" />
            </div>
          </div>
        </section>

        <TradeChange />
        <TradeCost />
        <TradeFaq trade="laboratory" />

        <section className="st-section st-section--tint" data-testid="section-more">
          <div className="st-wrap st-narrow">
            <p>
              We have also built <Link href="/window-and-door-software">software for window and door companies</Link>. See all the <Link href="/industries">industries we build custom apps for</Link>.
            </p>
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
