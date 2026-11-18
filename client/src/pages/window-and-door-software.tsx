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
// No client is named on this page and it carries no testimonial.

export default function WindowAndDoorSoftware() {
  useSeo(ROUTE_SEO.windowDoor);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">Software for window and door companies</h1>
            <p className="st-lede">
              If your window and door business runs on a quoting package, a spreadsheet, a whiteboard and a lot of phone calls, we can build you one app for all of it.
            </p>
            <p>
              Every job from the first call to the final invoice, who is measuring or fitting where tomorrow, and what the van needs to load in the morning.
            </p>
            <p>
              It is built around how your business already works, so you don't have to bend to someone else's software.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-board">
          <div className="st-wrap">
            <h2>What goes on your board</h2>
            <p className="st-narrow">
              We have built apps for window and door companies. This is the kind of thing that goes on the board.
            </p>
            <div className="st-beside">
              <div>
                <h3>Every job in one place</h3>
                <p>
                  Every job sits on one board, from the first request to fitted. You can see what is waiting on a price, what is ordered and what is booked for fitting.
                </p>
                <p>
                  Every call and message lands in one list, and the customer list shows how each customer got in touch.
                </p>
              </div>
              <ScreenShot screen="jobBoard" />
            </div>
            <div className="st-beside">
              <div>
                <h3>Measuring and fitting</h3>
                <p>
                  The measuring list is on the measurer's phone, with a box for sizes and notes, so nothing is copied from a printed sheet.
                </p>
                <p>
                  Fitting sits on a calendar with a column for each van, so you can see who is fitting where tomorrow.
                </p>
              </div>
              <ScreenShot screen="calendar" />
            </div>
            <div className="st-beside st-beside--phones">
              <div>
                <h3>On the phone in the van</h3>
                <p>
                  Each crew sees its own day on the phone. The van's pick list for the morning shows what to load before it leaves.
                </p>
                <h3>After the fitting</h3>
                <p>
                  Yearly services show when they are due, with who has said yes. Invoices are made from the job card, and you can see the profit on each finished job.
                </p>
              </div>
              <div className="st-phones">
                <ScreenShot screen="measuringPhone" phone small />
                <ScreenShot screen="pickListPhone" phone small />
              </div>
            </div>
          </div>
        </section>

        <TradeChange />
        <TradeCost />
        <TradeFaq trade="windowDoor" />

        <section className="st-section st-section--tint" data-testid="section-more">
          <div className="st-wrap st-narrow">
            <p>
              We have also built a <Link href="/pest-control-app">job management app for pest control companies</Link>. See all the <Link href="/industries">industries we build custom apps for</Link>.
            </p>
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
