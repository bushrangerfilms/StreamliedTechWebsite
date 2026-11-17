import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";
import { PricingBlock } from "@/components/pricing-block";
import { CLIENTS, ClientLogo, Testimonial } from "@/components/testimonial";

// Copy on this page is mirrored word for word in
// client/src/lib/seo-static-html.ts ("/"). Change both together: the build
// fails if they drift.

const PROBLEMS = [
  "Jobs tracked in a diary, a spreadsheet and a few apps that don't talk to each other.",
  "Services, certs and renewals that come due without anyone noticing.",
  "Job sheets and photos that never make it back to the office.",
  "Quotes and invoices waiting on someone to chase them.",
];

const ON_THE_BOARD = [
  "Every job from enquiry to invoice",
  "Who is going where tomorrow",
  "Job sheets and photos on the phone",
  "What is due and when: services, certs and renewals",
  "Customers reminded before a visit",
  "The week at a glance",
];

const STEPS = [
  {
    title: "A phone call.",
    body: "10 to 15 minutes about how a job goes from enquiry to invoice.",
  },
  {
    title: "A free demo, if it looks like a fit.",
    body: "Usually within a few days, built from the call, with made-up sample data so you can click anything.",
  },
  {
    title: "A price in writing.",
    body: "A build fee plus a monthly fee. A 50% deposit starts the build.",
  },
  {
    title: "The build.",
    body: "Done within 2 weeks of your go-ahead.",
  },
  {
    title: "Two weeks of field testing.",
    body: "You use it on your own jobs while we refine it. You pay the second half once it is working on your own jobs.",
  },
  {
    title: "Looked after from then on.",
    body: "The monthly fee covers hosting, support from real people and ongoing refinements to what we built.",
  },
];

export default function Home() {
  useSeo(ROUTE_SEO.home);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">Custom apps for Irish trade and service businesses.</h1>
            <p className="st-lede">
              Your own app, built around how you already work, with everything in one place. Not another subscription that can't talk to the rest.
            </p>
            <p>
              Tell us how your business runs on a 10 to 15 minute phone call. If it looks like a fit, we'll build you a free demo of your own app, usually within a few days.
            </p>
            <p className="st-aside-line">We're all about efficiency. That's why people come to us.</p>
          </div>
        </section>

        <section className="st-section" data-testid="section-who">
          <div className="st-wrap">
            <h2>Who it's for</h2>
            <div className="st-cols">
              <div>
                <p>Trade and service businesses where the work has outgrown the paperwork:</p>
                <ul className="st-list">
                  {PROBLEMS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p>
                  We work with vehicle and machinery workshops, home service firms with repeat visits, windows and doors firms, and other trades and service businesses.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="st-section st-section--tint" data-testid="section-board">
          <div className="st-wrap">
            <h2>What goes on your board</h2>
            <ul className="st-list st-cols">
              {ON_THE_BOARD.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="st-example">
              Four weeks before a service is due, the app sends your customer a WhatsApp: reply yes if you want us to come.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-steps">
          <div className="st-wrap st-narrow">
            <h2>How it works</h2>
            <ol className="st-steps">
              {STEPS.map((step) => (
                <li key={step.title} className="st-step">
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p style={{ marginTop: "1.5rem" }}>
              <Link href="/how-it-works" data-testid="link-how-it-works">
                How it works, step by step
              </Link>
            </p>
          </div>
        </section>

        <section className="st-section st-section--tint" data-testid="section-our-work">
          <div className="st-wrap">
            <h2>Our work</h2>
            <div className="st-clients">
              <div className="st-client" data-testid="card-client-ipm">
                <ClientLogo client="ipm" />
                <h3>{CLIENTS.ipm.name}</h3>
                <p>{CLIENTS.ipm.line}</p>
                <Testimonial quote="ipmMain" />
              </div>
              <div className="st-client" data-testid="card-client-komplete">
                <ClientLogo client="komplete" />
                <h3>{CLIENTS.komplete.name}</h3>
                <p>{CLIENTS.komplete.line}</p>
                <Testimonial quote="kompleteMain" />
              </div>
            </div>
          </div>
        </section>

        <section className="st-section" data-testid="section-pricing">
          <div className="st-wrap">
            <h2>What it costs</h2>
            <PricingBlock />
          </div>
        </section>

        <section className="st-section" data-testid="section-who-you-deal-with">
          <div className="st-wrap">
            <div className="st-person">
              <img src="/images/pete-harris.jpg" alt="Pete Harris" width="640" height="640" loading="lazy" decoding="async" />
              <div className="st-narrow">
                <h2>Who you'll deal with</h2>
                <p>
                  I'm Pete Harris. I build the apps. I spent over 20 years in heavy industry and construction before this, so I know what a job sheet in a van looks like.
                </p>
                <p>
                  Until you go ahead, one of our team follows up for me by phone. Once you go ahead I build it and see it through. After that you have support from real people, and every app has a Feedback button: tell us what is not right and we change it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
