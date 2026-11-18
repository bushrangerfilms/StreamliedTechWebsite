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
// Only Komplete Engineers is named here, with Ian O'Mahony's approved main
// quote, word for word, logo beside it and no link. The page says "engineering
// firms" and never which kind of engineering, and never "take on more work".
// The sample screens are not from an engineering firm and are not captioned as such.

export default function EngineeringFirmSoftware() {
  useSeo(ROUTE_SEO.engineering);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">Project software for engineering firms</h1>
            <p className="st-lede">
              Quotes, projects, site visits, certificates and invoices all have to end up on the right job.
            </p>
            <p>
              We build apps for engineering firms that chase your quotes for you, set a new project up in one tap and show every live project at a glance, built around how your firm already works.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-board">
          <div className="st-wrap">
            <h2>What goes on your board</h2>
            <div className="st-beside">
              <div>
                <h3>Quotes and projects</h3>
                <p>
                  Quotes chase themselves, so a quote that has gone quiet is followed up without anyone having to remember it.
                </p>
                <p>
                  A new project is set up in one tap. Every live project is there at a glance, and each one has a map link.
                </p>
                <h3>Site visits and notes</h3>
                <p>
                  A site visit can be booked with up to four people. People can leave notes on a job and tag each other in them.
                </p>
              </div>
              <ScreenShot screen="today" />
            </div>
            <div className="st-beside">
              <div>
                <h3>Certificates, letters and invoices</h3>
                <p>
                  Certificates and letters are made from your own Word templates. Letters are laid out to fit a window envelope.
                </p>
                <p>
                  Each job's documents are filed in that job's own folder in your cloud storage.
                </p>
                <p>
                  Invoices come from the same job. One that has already been sent can be credited and reissued.
                </p>
              </div>
              <ScreenShot screen="invoices" />
            </div>
            <div className="st-beside">
              <div>
                <h3>The numbers on each job</h3>
                <p>
                  The sample screens on this page come from apps for other kinds of business. They show the sort of screen we mean, such as invoices made from the job and the profit on each finished job.
                </p>
                <p>Yours is built around your own projects, documents and wording.</p>
              </div>
              <ScreenShot screen="jobProfit" />
            </div>
          </div>
        </section>

        <section className="st-section st-section--tint" data-testid="section-client">
          <div className="st-wrap">
            <h2>What our client says</h2>
            <div className="st-clients st-clients--rows">
              <div className="st-client" data-testid="card-client-komplete">
                <div>
                  <ClientLogo client="komplete" />
                  <h3>Komplete Engineers</h3>
                  <p>We built the app Komplete Engineers runs its quotes and projects on.</p>
                  <p>
                    <Link href="/our-work">See the two apps we can name</Link>.
                  </p>
                </div>
                <Testimonial quote="kompleteMain" />
              </div>
            </div>
          </div>
        </section>

        <TradeCost />
        <TradeChange />
        <TradeFaq trade="engineering" />

        <section className="st-section st-section--tint" data-testid="section-more">
          <div className="st-wrap st-narrow">
            <p>
              We have also built a <Link href="/laboratory-sample-collection-app">sample collection app for laboratories</Link>. See all the <Link href="/industries">industries we build custom apps for</Link>.
            </p>
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
