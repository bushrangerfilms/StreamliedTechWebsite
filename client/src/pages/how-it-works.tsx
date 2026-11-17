import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarClock,
  CalendarDays,
  Check,
  ClipboardCheck,
  Clock,
  Euro,
  FileText,
  Hammer,
  KanbanSquare,
  LifeBuoy,
  Link2,
  MessageSquare,
  MonitorSmartphone,
  MousePointerClick,
  Package,
  Phone,
  PlusCircle,
  Receipt,
  Server,
  Smartphone,
  Unplug,
  UserCog,
  Zap,
} from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";
import { PricingBlock } from "@/components/pricing-block";
import { Testimonial } from "@/components/testimonial";
import { IconTile } from "@/components/icon-tile";
import { ScreenShot } from "@/components/screen-shot";

// Copy on this page is mirrored word for word in
// client/src/lib/seo-static-html.ts ("/how-it-works"). Change both together:
// the build fails if they drift.
//
// Pete, 17 Nov 2026: "Break up the longer text with images, icons etc. Never
// have just long slabs of text." Longer paragraphs are split at sentence ends
// and every section carries icons, a diagram or a client logo. The words are
// unchanged.

const STEP_STRIP = [
  { icon: Phone, label: "A phone call", href: "#step-1" },
  { icon: MonitorSmartphone, label: "A free demo", href: "#step-2" },
  { icon: FileText, label: "A price in writing", href: "#step-3" },
  { icon: Hammer, label: "The build", href: "#step-4" },
  { icon: ClipboardCheck, label: "Two weeks of field testing", href: "#step-5" },
  { icon: LifeBuoy, label: "Looked after", href: "#step-6" },
];

const ON_THE_BOARD = [
  {
    icon: KanbanSquare,
    title: "Jobs and who is going where",
    body: "Jobs, crews and bookings on one board.",
  },
  {
    icon: Smartphone,
    title: "Job sheets and photos",
    body: "Filled in from the phone and filed where the office can see them, not living on paper in the van.",
  },
  {
    icon: CalendarClock,
    title: "Services due",
    body: "Service dates, certs and renewals, with the reminder sent before they fall due.",
  },
  {
    icon: CalendarDays,
    title: "Fitting and visit days",
    body: "Planned ahead, with the customer reminded before you arrive.",
  },
  {
    icon: Receipt,
    title: "Quotes and invoices",
    body: "Quotes followed up after you send them, and a clear view of which invoices are due.",
  },
  {
    icon: BarChart3,
    title: "The week at a glance",
    body: "The week's numbers on one screen. No Sunday night spreadsheet.",
  },
];

const QUESTIONS = [
  {
    icon: Clock,
    q: "How long will it take?",
    a: "The demo usually takes a few days. The build is done within 2 weeks of your go-ahead, and then there are two weeks of field testing on your own jobs.",
  },
  {
    icon: Euro,
    q: "What does it cost?",
    a: "From €4,900 + VAT for the build, then a monthly fee. You get the price in writing before anything is built.",
  },
  {
    icon: Link2,
    q: "Will it work with my accounts package?",
    a: "Usually. We'd keep your accounts software, because it keeps up with tax law for you, and link your app to it. Xero links best, then QuickBooks. Ask us about others.",
  },
  {
    icon: MousePointerClick,
    q: "I'm not technical. Will I break it?",
    a: "You can't break it. Few clicks, and nobody has needed training so far.",
  },
  {
    icon: MessageSquare,
    q: "What if something's wrong after it's built?",
    a: "Every app has a Feedback button. Tell us what isn't right and we change it and let you know. It is included in the monthly fee.",
  },
  {
    icon: Package,
    q: "Why not an off-the-shelf app?",
    a: "Off-the-shelf software works if someone sits at a desk feeding it. Ours does the chasing without them.",
  },
  {
    icon: Bot,
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
            <ol className="st-strip" data-testid="diagram-six-steps">
              {STEP_STRIP.map((step, i) => (
                <li key={step.href}>
                  <a href={step.href}>
                    <IconTile icon={step.icon} />
                    <span className="st-strip__n">{i + 1}</span>
                    <span>{step.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="st-section" data-testid="section-steps">
          <div className="st-wrap">
            <h2>The six steps</h2>
            <ol className="st-steps st-steps--wide">
              <li className="st-step" id="step-1">
                <div>
                  <IconTile icon={Phone} small />
                  <h3>A phone call</h3>
                  <p>About 10 to 15 minutes. You tell us how a job goes from the first enquiry to the invoice, and where it hurts.</p>
                  <p>With your OK we record the call so Pete can build your demo from what you told us.</p>
                </div>
              </li>
              <li className="st-step" id="step-2">
                <div>
                  <IconTile icon={MonitorSmartphone} small />
                  <h3>A free demo</h3>
                  <p>If it looks like a fit, we build a demo of your own app, usually within a few days. It uses made-up sample data, so click anything.</p>
                  <p>It won't be perfect and it isn't meant to be: it gives you something to react to. Editing is easier than creating.</p>
                </div>
                <Testimonial quote="ipmDemo" short />
              </li>
              <li className="st-step" id="step-3">
                <div>
                  <IconTile icon={FileText} small />
                  <h3>A price in writing</h3>
                  <p>A build fee and a monthly fee, in writing, before anything is built. A 50% deposit starts the build.</p>
                </div>
              </li>
              <li className="st-step" id="step-4">
                <div>
                  <IconTile icon={Hammer} small />
                  <h3>The build</h3>
                  <p>Done within 2 weeks of your go-ahead. We don't give a finish date. We give the timeline.</p>
                </div>
                <Testimonial quote="ipmSpeed" short />
              </li>
              <li className="st-step" id="step-5">
                <div>
                  <IconTile icon={ClipboardCheck} small />
                  <h3>Two weeks of field testing</h3>
                  <p>You use it on your own jobs while we refine it. You pay the second half once it is working for you.</p>
                </div>
                <Testimonial quote="kompleteShort" short />
              </li>
              <li className="st-step" id="step-6">
                <div>
                  <IconTile icon={LifeBuoy} small />
                  <h3>Looked after</h3>
                  <p>The monthly fee starts after field testing. It covers hosting, storage, support from real people and ongoing refinements to what we built.</p>
                  <p>There is no charge per user.</p>
                  <p>Every app has a Feedback button: tell us what isn't right and we change it and let you know.</p>
                </div>
                <Testimonial quote="ipmSupport" short />
              </li>
            </ol>
          </div>
        </section>

        <section className="st-section st-section--tint" data-testid="section-pricing">
          <div className="st-wrap">
            <h2>What it costs</h2>
            <PricingBlock />
            <p className="st-example">
              <Zap strokeWidth={1.5} aria-hidden="true" />
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
            <div className="st-cards st-cards--3" style={{ marginTop: "1.5rem" }}>
              {ON_THE_BOARD.map((item) => (
                <div key={item.title} className="st-card">
                  <IconTile icon={item.icon} />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
            <div className="st-shots">
              <ScreenShot screen="diary" />
              <ScreenShot screen="services" />
              <ScreenShot screen="tablet" />
              <ScreenShot screen="jobCard" />
            </div>
            <p className="st-grow">
              <span className="st-grow__one" aria-hidden="true" />
              <ArrowRight strokeWidth={1.5} aria-hidden="true" />
              <span className="st-grow__many" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              It can start as one screen for one job and grow from there.
            </p>
          </div>
        </section>

        <section className="st-section st-section--tint" data-testid="section-after">
          <div className="st-wrap">
            <h2>What happens after the first build?</h2>
            <div className="st-cards st-cards--2">
              <div className="st-card st-card--row">
                <IconTile icon={Server} />
                <p>
                  The monthly fee covers hosting, storage, support from real people and ongoing refinements to the features in your build.
                </p>
              </div>
              <div className="st-card st-card--row">
                <IconTile icon={PlusCircle} />
                <p>
                  A genuinely new feature is priced separately, at a fraction of the first build, and the monthly fee goes up a little with it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="st-section" data-testid="section-diy">
          <div className="st-wrap">
            <h2>Should you build it yourself or get it built for you?</h2>
            <div className="st-compare">
              <div className="st-compare__side">
                <p className="st-compare__lead">Honest answer, sometimes you should build it yourself.</p>
                <p>
                  If someone in the office has the time and the interest, a no-code tool can carry a simple job, a form that feeds a spreadsheet, a basic booking sheet.
                </p>
                <p className="st-compare__lead">Where it usually falls down is afterwards.</p>
                <ul className="st-ticks st-ticks--icons">
                  <li>
                    <UserCog strokeWidth={1.5} aria-hidden="true" />
                    <span>The person who built it becomes the person who maintains it, on top of the job they were already doing.</span>
                  </li>
                  <li>
                    <Unplug strokeWidth={1.5} aria-hidden="true" />
                    <span>And the data ends up scattered across subscriptions that do not talk to each other.</span>
                  </li>
                </ul>
              </div>
              <div className="st-compare__side st-compare__side--ours">
                <p className="st-compare__lead">What we offer is the custom route without those jobs landing back on you.</p>
                <ul className="st-ticks">
                  <li>
                    <Check strokeWidth={2} aria-hidden="true" />
                    <span>The app is built around how you already work, we look after it, and your team just uses it.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="st-section" data-testid="section-questions">
          <div className="st-wrap">
            <h2>Questions people ask</h2>
            <dl className="st-faq">
              {QUESTIONS.map((item) => (
                <div key={item.q}>
                  <IconTile icon={item.icon} small />
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
