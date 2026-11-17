import { Link } from "wouter";
import {
  ArrowRight,
  BarChart3,
  BellOff,
  BellRing,
  CalendarClock,
  Camera,
  ClipboardCheck,
  DoorOpen,
  FileText,
  Hammer,
  HardHat,
  House,
  KanbanSquare,
  LifeBuoy,
  MessageCircle,
  MonitorSmartphone,
  NotebookPen,
  Phone,
  Receipt,
  Route,
  Smartphone,
  Wrench,
} from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";
import { PricingBlock } from "@/components/pricing-block";
import { CLIENTS, ClientLogo, Testimonial } from "@/components/testimonial";
import { IconTile } from "@/components/icon-tile";
import { AppsDiagram } from "@/components/apps-diagram";
import { PersonBlock } from "@/components/person-block";
import { ScreenShot } from "@/components/screen-shot";

// Copy on this page is mirrored word for word in
// client/src/lib/seo-static-html.ts ("/"). Change both together: the build
// fails if they drift.
//
// Pete, 17 Nov 2026: "Break up the longer text with images, icons etc. Never
// have just long slabs of text." Every section here carries icons, a diagram,
// a logo or a photo, and no paragraph runs past about three lines.

const PROBLEMS = [
  { icon: NotebookPen, text: "Jobs tracked in a diary, a spreadsheet and a few apps that don't talk to each other." },
  { icon: BellOff, text: "Services, certs and renewals that come due without anyone noticing." },
  { icon: Camera, text: "Job sheets and photos that never make it back to the office." },
  { icon: Receipt, text: "Quotes and invoices waiting on someone to chase them." },
];

const WHO = [
  { icon: Wrench, text: "Vehicle and machinery workshops" },
  { icon: House, text: "Home service firms with repeat visits" },
  { icon: DoorOpen, text: "Windows and doors firms" },
  { icon: HardHat, text: "Other trades and service businesses" },
];

const ON_THE_BOARD = [
  { icon: KanbanSquare, text: "Every job from enquiry to invoice" },
  { icon: Route, text: "Who is going where tomorrow" },
  { icon: Smartphone, text: "Job sheets and photos on the phone" },
  { icon: CalendarClock, text: "What is due and when: services, certs and renewals" },
  { icon: BellRing, text: "Customers reminded before a visit" },
  { icon: BarChart3, text: "The week at a glance" },
];

const STEPS = [
  {
    icon: Phone,
    title: "A phone call.",
    body: "10 to 15 minutes about how a job goes from enquiry to invoice.",
  },
  {
    icon: MonitorSmartphone,
    title: "A free demo, if it looks like a fit.",
    body: "Usually within a few days, built from the call, with made-up sample data so you can click anything.",
  },
  {
    icon: FileText,
    title: "A price in writing.",
    body: "A build fee plus a monthly fee. A 50% deposit starts the build.",
  },
  {
    icon: Hammer,
    title: "The build.",
    body: "Done within 2 weeks of your go-ahead.",
  },
  {
    icon: ClipboardCheck,
    title: "Two weeks of field testing.",
    body: "You use it on your own jobs while we refine it. You pay the second half once it is working on your own jobs.",
  },
  {
    icon: LifeBuoy,
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
          <div className="st-wrap st-hero__grid">
            <div>
              <h1 data-testid="text-hero-headline">Custom apps for Irish trade and service businesses.</h1>
              <p className="st-lede">
                Your own app, built around how you already work, with everything in one place. Not another subscription that can't talk to the rest.
              </p>
              <p>
                Tell us how your business runs on a 10 to 15 minute phone call. If it looks like a fit, we'll build you a free demo of your own app, usually within a few days.
              </p>
              <p className="st-aside-line">We're all about efficiency. That's why people come to us.</p>
            </div>
            <AppsDiagram />
          </div>
        </section>

        <section className="st-section" data-testid="section-who">
          <div className="st-wrap">
            <h2>Who it's for</h2>
            <div className="st-with-phone">
            <div>
            <p>Trade and service businesses where the work has outgrown the paperwork:</p>
            <ul className="st-cards st-cards--2">
              {PROBLEMS.map((item) => (
                <li key={item.text} className="st-card">
                  <IconTile icon={item.icon} />
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
            <p className="st-kicker">We work with</p>
            <ul className="st-chips">
              {WHO.map((item) => (
                <li key={item.text}>
                  <item.icon strokeWidth={1.5} aria-hidden="true" />
                  {item.text}
                </li>
              ))}
            </ul>
            </div>
            <ScreenShot screen="phone" phone />
            </div>
          </div>
        </section>

        <section className="st-section st-section--tint" data-testid="section-board">
          <div className="st-wrap">
            <h2>What goes on your board</h2>
            <ul className="st-cards st-cards--3">
              {ON_THE_BOARD.map((item) => (
                <li key={item.text} className="st-card st-card--row">
                  <IconTile icon={item.icon} />
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
            <ScreenShot screen="jobBoard" />
            <div className="st-reminder">
              <p className="st-example">
                <MessageCircle strokeWidth={1.5} aria-hidden="true" />
                Four weeks before a service is due, the app sends your customer a WhatsApp: reply yes if you want us to come.
              </p>
              <div className="st-chat" aria-hidden="true">
                <span className="st-chat__when">4 weeks before the service</span>
                <span className="st-chat__out">Reply yes if you want us to come.</span>
                <span className="st-chat__in">Yes</span>
              </div>
            </div>
          </div>
        </section>

        <section className="st-section" data-testid="section-steps">
          <div className="st-wrap">
            <h2>How it works</h2>
            <ol className="st-steps st-steps--grid">
              {STEPS.map((step) => (
                <li key={step.title} className="st-step">
                  <div>
                    <IconTile icon={step.icon} small />
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p style={{ marginTop: "1.5rem" }}>
              <Link href="/how-it-works" className="st-more" data-testid="link-how-it-works">
                How it works, step by step
                <ArrowRight strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </p>
          </div>
        </section>

        <section className="st-section st-section--tint" data-testid="section-our-work">
          <div className="st-wrap">
            <h2>Our work</h2>
            <div className="st-clients st-clients--rows">
              <div className="st-client" data-testid="card-client-ipm">
                <div>
                  <ClientLogo client="ipm" />
                  <h3>{CLIENTS.ipm.name}</h3>
                  <p>{CLIENTS.ipm.line}</p>
                </div>
                <Testimonial quote="ipmMain" />
              </div>
              <div className="st-client" data-testid="card-client-komplete">
                <div>
                  <ClientLogo client="komplete" />
                  <h3>{CLIENTS.komplete.name}</h3>
                  <p>{CLIENTS.komplete.line}</p>
                </div>
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
            <PersonBlock lazy />
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
