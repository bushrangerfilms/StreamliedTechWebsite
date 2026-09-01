import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "wouter";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader, BOOKING_URL } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function HowItWorks() {
  usePageTracking();

  useSeo(ROUTE_SEO.howItWorks);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-slate-200 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Based in Galway. Working across Ireland.
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight" data-testid="text-hero-headline">
              What a custom internal app costs, and how long it takes
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
              The short answer. A first build is a fixed price, from €3,900, and it is usually working end to end inside two weeks. The price is agreed in writing before anything is built, and there is no bill for time on top.
              <br /><br />
              The rest of this page is the longer answer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-hero">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book A Free Call
                </a>
              </Button>
              <div className="text-sm text-slate-300">
                15 minute chat. No hard sell.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost */}
      <section className="py-20" data-testid="section-cost">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              How much does it cost to get a custom app made in Ireland?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              A lot of custom software is priced by the developer and the month. The meter runs, and the real number only becomes clear near the end. I price the job instead. You tell me what the app has to do, I put a figure on it, and that figure is agreed in writing before anything is built.
            </p>
            {/* Same three tiers as /business, kept word for word so the two pages cannot drift. */}
            <div className="bg-white rounded-xl border border-border p-8 mb-6">
              <ul className="space-y-4">
                {[
                  {
                    scope: "One workflow, built end to end",
                    price: "from €3,900, usually working inside two weeks",
                  },
                  {
                    scope: "A bigger piece across a few connected jobs",
                    price: "€6,500 to €9,500",
                  },
                  {
                    scope: "A full review of how work moves through the business, with the systems built around it",
                    price: "priced after the review",
                  },
                ].map((tier) => (
                  <li key={tier.scope} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <p className="text-foreground">
                      <span className="font-medium">{tier.scope}:</span>{" "}
                      <span className="text-muted-foreground">{tier.price}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-lg text-muted-foreground">
              Why is that less than most custom software quotes? Because I build with AI, every day, and that has changed what one builder can produce. You get software designed around how your business already works, without the overhead that usually comes with the word custom.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline / process */}
      <section className="py-20 bg-slate-50" data-testid="section-process">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              How do I get an app made for my business?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Four steps, and the first one costs you fifteen minutes.
            </p>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "A fifteen minute call",
                  body: "You tell me where the hours are going. If an app will not pay for itself, I will say so on the call and we both save the bother.",
                },
                {
                  step: "2",
                  title: "A price in writing",
                  body: "What the app will do and what it costs, agreed before anything is built. No surprises later.",
                },
                {
                  step: "3",
                  title: "The build",
                  body: "You see working screens while the build is still in progress, not a big reveal at the end. Anything that looks wrong gets fixed while it is cheap to fix.",
                },
                {
                  step: "4",
                  title: "Working end to end, usually inside two weeks",
                  body: "Your team runs it on real work and I shape it around what they find. A bigger build across connected jobs takes longer, and gets its own timeline agreed alongside the price.",
                },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-xl border border-border p-6 flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground mt-8">
              A full review of the whole operation is a different animal, a programme of work measured in months rather than weeks. How that works is on{" "}
              <Link href="/business" className="text-primary underline hover:no-underline" data-testid="link-business-process">
                the services page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* DIY vs built for you */}
      <section className="py-20" data-testid="section-diy">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Should you build it yourself or get it built for you?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Honest answer, sometimes you should build it yourself. If someone in the office has the time and the interest, a no-code tool can carry a simple job, a form that feeds a spreadsheet, a basic booking sheet. Plenty of businesses run that way and it is a fine place to start.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Where it usually falls down is afterwards. The person who built it becomes the person who maintains it, on top of the job they were already doing. Every new thing you want runs into the ceiling of the tool. And the data ends up scattered across subscriptions that do not talk to each other.
            </p>
            <p className="text-lg text-muted-foreground">
              What I offer is the custom route without those jobs landing back on you. The app is built around how you already work, I maintain it and extend it, and your team just uses it.
            </p>
          </div>
        </div>
      </section>

      {/* What counts */}
      <section className="py-20 bg-slate-50" data-testid="section-what-counts">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
              What counts as a custom internal app?
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
              Any screen your office or crew works from that used to be paper, a spreadsheet or someone's memory. The usual candidates:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Jobs and scheduling",
                  body: "Jobs, crews and bookings on one board, with reminders that go out on their own.",
                },
                {
                  title: "Dockets and timesheets",
                  body: "Filled in from the phone and filed where the office can see them, not living on paper in the van.",
                },
                {
                  title: "Pre-starts and checks",
                  body: "Walkaround checks and sign-offs done on site, stored where an audit can find them.",
                },
                {
                  title: "Quotes and invoices",
                  body: "Quotes followed up after you send them. Invoices chased politely until they are paid.",
                },
                {
                  title: "Renewals and expiry dates",
                  body: "NCT, CVRT, insurance, certs, service-due dates. Reminders on time, every time.",
                },
                {
                  title: "Reporting",
                  body: "The week's numbers on one screen, updated automatically. No Sunday night spreadsheet.",
                },
              ].map((card) => (
                <div key={card.title} className="bg-white p-6 rounded-lg border border-border">
                  <h3 className="font-display font-semibold text-lg mb-3">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.body}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-lg text-foreground mt-10 max-w-2xl mx-auto">
              It can start as one screen for one job and grow from there. Your internal app can become the central hub of all operations.
            </p>
          </div>
        </div>
      </section>

      {/* Sector routing */}
      <section className="py-5 bg-primary/5 border-y border-border" data-testid="section-sector-link">
        <div className="container mx-auto px-6 text-center">
          <p className="text-base text-foreground">
            In construction or heavy industry?{" "}
            <Link href="/contractors" className="text-primary font-semibold underline hover:no-underline" data-testid="link-contractors">
              See what an internal app looks like on your jobs
            </Link>
            . Solar, heat pump or retrofit installer?{" "}
            <Link href="/installers" className="text-primary font-semibold underline hover:no-underline" data-testid="link-installers">
              There is a page for you too
            </Link>
            .
          </p>
        </div>
      </section>

      {/* After the first build */}
      <section className="py-20" data-testid="section-after">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              What happens after the first build?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              A custom app is not a handover and goodbye. The first build proves the idea. After that, most clients extend it one job at a time, once the last piece has paid for itself, and I keep building and maintaining it as the operation changes.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              The AI underneath these systems gets better every few months, and because I build on it every day, your app keeps improving too. Along the way your staff learn to use AI themselves, so the gains keep compounding rather than depending on me.
            </p>
            {/* The ongoing tier stays words-only until a client has signed at
                a figure. Pete's call 1 Sep 2026: sell the number on calls,
                print it only once it is real. */}
            <p className="text-lg text-muted-foreground" data-testid="text-yearly-agreement">
              For a business that wants the ongoing side arranged properly, work after the first build can be set up as a yearly agreement. It covers support and changes once the system is running, and the figure is agreed in writing before it starts.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-900" data-testid="section-final-cta">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
              Get a figure on the job that eats the most time
            </h2>
            <p className="text-lg text-slate-200 mb-8">
              Fifteen minutes on the phone will tell us both whether it is worth doing. If it is not, I will say so.
            </p>
            <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-final">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book A Free Call
              </a>
            </Button>
            <p className="text-sm text-slate-300 mt-6">
              Or email{" "}
              <a href="mailto:peter@streamlinedai.tech" className="underline hover:no-underline" data-testid="link-email">
                peter@streamlinedai.tech
              </a>
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
