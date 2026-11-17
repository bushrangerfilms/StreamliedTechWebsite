import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";
import { PricingBlock } from "@/components/pricing-block";
import { Testimonial } from "@/components/testimonial";

// Copy on this page is mirrored word for word in
// client/src/lib/seo-static-html.ts ("/how-it-works"). Change both together:
// the build fails if they drift.

const ON_THE_BOARD = [
  {
    title: "Jobs and who is going where",
    body: "Jobs, crews and bookings on one board.",
  },
  {
    title: "Job sheets and photos",
    body: "Filled in from the phone and filed where the office can see them, not living on paper in the van.",
  },
  {
    title: "Services due",
    body: "Service dates, certs and renewals, with the reminder sent before they fall due.",
  },
  {
    title: "Fitting and visit days",
    body: "Planned ahead, with the customer reminded before you arrive.",
  },
  {
    title: "Quotes and invoices",
    body: "Quotes followed up after you send them, and a clear view of which invoices are due.",
  },
  {
    title: "The week at a glance",
    body: "The week's numbers on one screen. No Sunday night spreadsheet.",
  },
];

const QUESTIONS = [
  {
    q: "How long will it take?",
    a: "The demo usually takes a few days. The build is done within 2 weeks of your go-ahead, and then there are two weeks of field testing on your own jobs.",
  },
  {
    q: "What does it cost?",
    a: "From €4,900 + VAT for the build, then a monthly fee. You get the price in writing before anything is built.",
  },
  {
    q: "Will it work with my accounts package?",
    a: "Usually. We'd keep your accounts software, because it keeps up with tax law for you, and link your app to it. Xero links best, then QuickBooks. Ask us about others.",
  },
  {
    q: "I'm not technical. Will I break it?",
    a: "You can't break it. Few clicks, and nobody has needed training so far.",
  },
  {
    q: "What if something's wrong after it's built?",
    a: "Every app has a Feedback button. Tell us what isn't right and we change it and let you know. It is included in the monthly fee.",
  },
  {
    q: "Why not an off-the-shelf app?",
    a: "Off-the-shelf software works if someone sits at a desk feeding it. Ours does the chasing without them.",
  },
  {
    q: "Can't I just use ChatGPT?",
    a: "For one-off jobs, yes. But you have to do it every time, and it forgets your rules.",
  },
];

export default function HowItWorks() {
  useSeo(ROUTE_SEO.howItWorks);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">How it works</h1>
            <p className="st-lede">
              A phone call, a free demo if it fits, a price in writing, the build, two weeks of testing on your own jobs, then we look after it.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-steps">
          <div className="st-wrap st-narrow">
            <h2>The six steps</h2>
            <ol className="st-steps">
              <li className="st-step">
                <div>
                  <h3>A phone call</h3>
                  <p>
                    About 10 to 15 minutes. You tell us how a job goes from the first enquiry to the invoice, and where it hurts. With your OK we record the call so Pete can build your demo from what you told us.
                  </p>
                </div>
              </li>
              <li className="st-step">
                <div>
                  <h3>A free demo</h3>
                  <p>
                    If it looks like a fit, we build a demo of your own app, usually within a few days. It uses made-up sample data, so click anything. It won't be perfect and it isn't meant to be: it gives you something to react to. Editing is easier than creating.
                  </p>
                  <Testimonial quote="ipmDemo" short />
                </div>
              </li>
              <li className="st-step">
                <div>
                  <h3>A price in writing</h3>
                  <p>A build fee and a monthly fee, in writing, before anything is built. A 50% deposit starts the build.</p>
                </div>
              </li>
              <li className="st-step">
                <div>
                  <h3>The build</h3>
                  <p>Done within 2 weeks of your go-ahead. We don't give a finish date. We give the timeline.</p>
                  <Testimonial quote="ipmSpeed" short />
                </div>
              </li>
              <li className="st-step">
                <div>
                  <h3>Two weeks of field testing</h3>
                  <p>You use it on your own jobs while we refine it. You pay the second half once it is working for you.</p>
                  <Testimonial quote="kompleteShort" short />
                </div>
              </li>
              <li className="st-step">
                <div>
                  <h3>Looked after</h3>
                  <p>
                    The monthly fee starts after field testing. It covers hosting, storage, support from real people and ongoing refinements to what we built. There is no charge per user. Every app has a Feedback button: tell us what isn't right and we change it and let you know.
                  </p>
                  <Testimonial quote="ipmSupport" short />
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="st-section st-section--tint" data-testid="section-pricing">
          <div className="st-wrap">
            <h2>What it costs</h2>
            <PricingBlock />
            <p className="st-narrow" style={{ marginTop: "1.75rem" }}>
              AI means we can build it far quicker and cheaper than it used to be, so having your own app now makes sense for a business your size.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-board">
          <div className="st-wrap">
            <h2>What can go on the board</h2>
            <p className="st-narrow">
              Any screen your office or crew works from that used to be paper, a spreadsheet or someone's memory. The usual candidates:
            </p>
            <div className="st-items" style={{ marginTop: "1.5rem" }}>
              {ON_THE_BOARD.map((item) => (
                <div key={item.title} className="st-item">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "1.5rem" }}>It can start as one screen for one job and grow from there.</p>
          </div>
        </section>

        <section className="st-section" data-testid="section-after">
          <div className="st-wrap st-narrow">
            <h2>What happens after the first build?</h2>
            <p>
              The monthly fee covers hosting, storage, support from real people and ongoing refinements to the features in your build.
            </p>
            <p>
              A genuinely new feature is priced separately, at a fraction of the first build, and the monthly fee goes up a little with it.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-diy">
          <div className="st-wrap st-narrow">
            <h2>Should you build it yourself or get it built for you?</h2>
            <p>
              Honest answer, sometimes you should build it yourself. If someone in the office has the time and the interest, a no-code tool can carry a simple job, a form that feeds a spreadsheet, a basic booking sheet.
            </p>
            <p>
              Where it usually falls down is afterwards. The person who built it becomes the person who maintains it, on top of the job they were already doing. And the data ends up scattered across subscriptions that do not talk to each other.
            </p>
            <p>
              What we offer is the custom route without those jobs landing back on you. The app is built around how you already work, we look after it, and your team just uses it.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-questions">
          <div className="st-wrap st-narrow">
            <h2>Questions people ask</h2>
            <dl className="st-faq">
              {QUESTIONS.map((item) => (
                <div key={item.q}>
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
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
