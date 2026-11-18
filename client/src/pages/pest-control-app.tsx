import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";
import { ScreenShot } from "@/components/screen-shot";
import { TradeChange, TradeCost, TradeFaq } from "@/components/trade-sections";
import { ClientLogo, Testimonial } from "@/components/testimonial";

// A trade page (PM brief seo-trade-pages-1118, 18 Nov 2026). Copy on this page
// is mirrored word for word in client/src/lib/seo-static-html.ts. Change both
// together: the build fails if they drift.
//
// Rules: every feature sentence comes from the allowed facts for this trade in
// the brief (section 3.4) or from a sample screen caption. No figure, client,
// result or claim is added. Prices come only from client/src/lib/pricing.ts.
// The sample screens are the existing made-up ones; never a client app screen.
// One call button only: the ClosingCall at the end.
// Only IPM Enviro is named here, with Eamonn Kennedy's approved main quote,
// word for word, logo beside it and no link. Never name or hint at IPM's own
// customer beyond Eamonn's words, and never make a compliance claim.
// The sample screens are not pest control screens and are not captioned as such.

export default function PestControlApp() {
  useSeo(ROUTE_SEO.pestControl);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">Job management app for pest control companies</h1>
            <p className="st-lede">
              If your technicians write up each visit by hand and someone in the office types it into a report, an app can do that for you.
            </p>
            <p>
              We build apps for pest control companies where the technician scans each numbered unit on a tablet, logs what they found, and the visit report writes itself.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-board">
          <div className="st-wrap">
            <h2>What goes on your board</h2>
            <div className="st-beside">
              <div>
                <h3>On the visit</h3>
                <p>
                  The technician scans each numbered unit on a tablet and logs what they found at it. What was used on the visit is recorded on the report too.
                </p>
                <p>When the visit is done, the report has already written itself. Nobody types it up afterwards.</p>
                <h3>Reports your customer can read</h3>
                <p>
                  A weekly service report comes out of the same visits. Fly killer and insect counts are tracked, and the higher counts are shaded so they stand out.
                </p>
                <p>Your customer can have their own login to see their own reports.</p>
              </div>
              <ScreenShot screen="phone" phone />
            </div>
            <div className="st-beside">
              <div>
                <h3>In the office</h3>
                <p>
                  The office can work from one screen that shows what needs attention and who is out where. Visits that are due sit on a list, and each technician sees their own day on the phone.
                </p>
                <p>
                  The sample screens on this page come from apps for other kinds of service business. They show the sort of screen we mean. Yours is built around your own visits and reports.
                </p>
              </div>
              <ScreenShot screen="today" />
            </div>
            <div className="st-beside">
              <div>
                <h3>Visits that come round again</h3>
                <p>
                  Regular visits do not depend on anyone's memory. The list shows what is due and who has said yes.
                </p>
              </div>
              <ScreenShot screen="services" />
            </div>
          </div>
        </section>

        <section className="st-section st-section--tint" data-testid="section-client">
          <div className="st-wrap">
            <h2>What our client says</h2>
            <div className="st-clients st-clients--rows">
              <div className="st-client" data-testid="card-client-ipm">
                <div>
                  <ClientLogo client="ipm" />
                  <h3>IPM Enviro</h3>
                  <p>We built the inspection app IPM Enviro's technicians use on their visits.</p>
                  <p>
                    <Link href="/our-work">See the two apps we can name</Link>.
                  </p>
                </div>
                <Testimonial quote="ipmMain" />
              </div>
            </div>
          </div>
        </section>

        <TradeCost />
        <TradeChange />
        <TradeFaq trade="pestControl" />

        <section className="st-section st-section--tint" data-testid="section-more">
          <div className="st-wrap st-narrow">
            <p>
              We have also built <Link href="/engineering-firm-software">project software for engineering firms</Link>. See all the <Link href="/industries">industries we build custom apps for</Link>.
            </p>
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
