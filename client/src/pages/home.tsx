import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader, BOOKING_URL } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// The company front door. Sector neutral on purpose: the sharp pitches live
// one click away on /business, /contractors, /installers and /australia, and
// this page's job is to get each visitor to the right one without bouncing
// the rest. The mining positioning that used to live here moved to /australia.
export default function Home() {
  usePageTracking();
  useSeo(ROUTE_SEO.home);

  const audienceDoors = [
    {
      title: "Running a business in Ireland",
      body: "Vehicle testing, alarms and fire, tree care, windows, cleaning, trades and services. The admin jobs that go with them, handled by a system instead of your evenings.",
      href: "/business",
      cta: "See the Irish services page",
      testId: "card-door-business",
    },
    {
      title: "Construction and heavy industry",
      body: "Jobs, dockets, timesheets and walkaround checks off paper, for contractor crews in Ireland.",
      href: "/contractors",
      cta: "See the contractors page",
      testId: "card-door-contractors",
    },
    {
      title: "Solar, heat pump and retrofit installers",
      body: "Grant packs, forms and job packs handled, so the paperwork keeps up with the installs.",
      href: "/installers",
      cta: "See the installers page",
      testId: "card-door-installers",
    },
    {
      title: "Mining and construction in Australia",
      body: "Progress tracking, defects and close-out for site crews. Built by an Australian who has stood on those sites.",
      href: "/australia",
      cta: "See the Australia page",
      testId: "card-door-australia",
    },
  ];

  const jobs = [
    {
      title: "Chasing quotes and invoices",
      body: "Quotes followed up after you send them. Invoices chased politely until they're paid.",
    },
    {
      title: "Scheduling and reminders",
      body: "Jobs, crews and bookings that write straight into the diary, with reminders that reduce no-shows.",
    },
    {
      title: "Renewals and expiry dates",
      body: "Insurance, certs, service-due dates and test dates. Reminders go out on time, every time.",
    },
    {
      title: "Enquiries answered",
      body: "Enquiries answered and logged without anyone sitting on the inbox, whatever hour they arrive.",
    },
    {
      title: "Timesheets, dockets and sign-offs",
      body: "Filled in from the phone and filed where the office can see them, not living on paper in the van.",
    },
    {
      title: "Your week's numbers",
      body: "One screen with the numbers that matter. No spreadsheet wrangling on a Sunday night.",
    },
  ];

  const screenshots = [
    {
      src: "/images/app-training-dashboard.webp",
      alt: "Staff training and certification tracking dashboard",
      caption: "Staff certs and training tracked before the audit asks.",
      width: 1200,
      height: 742,
    },
    {
      src: "/images/app-scheduling.webp",
      alt: "Scheduling and calendar management",
      caption: "Bookings and jobs that write themselves into the diary.",
      width: 1200,
      height: 779,
    },
    {
      src: "/images/app-analytics.webp",
      alt: "Analytics and reporting dashboard",
      caption: "The week's numbers on one screen, updated automatically.",
      width: 1200,
      height: 723,
    },
    {
      src: "/images/app-intake.webp",
      alt: "Order and client intake without rekeying",
      caption: "Orders and new client details captured once, typed never.",
      width: 1200,
      height: 928,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-operations.webp"
            alt="Site team reviewing plans together on a construction site"
            className="w-full h-full object-cover object-center"
            width="1280"
            height="743"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/70"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 py-14 md:py-24">
          <div className="max-w-3xl">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-5 leading-tight"
              data-testid="text-hero-headline"
            >
              We set up custom internal apps around how your business already runs.
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-6 leading-relaxed">
              Enquiries answered, bookings written into the diary, jobs tracked and reports done without anyone chasing. Based in Galway, working with Irish businesses and with Australian operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-hero">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book a free call
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white"
                data-testid="button-cta-costs"
              >
                <Link href="/how-it-works">See what it costs</Link>
              </Button>
            </div>
            <p className="text-sm text-slate-300 mt-5">
              The price is agreed in writing before anything starts.
            </p>
            <p className="text-sm text-slate-400 mt-3" data-testid="text-bridge-australia">
              In Australian mining or construction?{" "}
              <Link href="/australia" className="underline hover:no-underline text-slate-200">
                Your page is here.
              </Link>
            </p>
            {/* Bridge for paid traffic that types the domain instead of
                clicking the ad. Same pattern as the old Handy video line,
                which now lives on /australia. */}
            <p className="text-sm text-slate-400 mt-3" data-testid="text-bridge-ai-employees">
              If you got here from the AI Employees ad: that is our yearly agreement, full custom set-up for your business with human support.{" "}
              <Link href="/ai-employees" className="underline hover:no-underline text-slate-200">
                Here is the full page.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Audience router */}
      <section className="py-14 md:py-16 bg-slate-50 border-b border-border" data-testid="section-router">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
              Find the page for your line of work
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {audienceDoors.map((door) => (
                <Link
                  key={door.href}
                  href={door.href}
                  className="bg-white p-6 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all flex flex-col"
                  data-testid={door.testId}
                >
                  <h3 className="font-display font-semibold text-lg mb-3">{door.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{door.body}</p>
                  <span className="text-sm text-primary font-semibold mt-auto">{door.cta}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The jobs we take off your plate */}
      <section className="py-20" data-testid="section-jobs">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
              The jobs we take off your plate
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
              These are the usual suspects. Every build is designed around your specific operation, so treat them as examples rather than a menu.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div key={job.title} className="bg-white p-6 rounded-lg border border-border">
                  <h3 className="font-display font-semibold text-lg mb-3">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real systems, already built */}
      <section className="py-20 bg-slate-50" data-testid="section-apps">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
              Real systems, already built
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {screenshots.map((shot) => (
                <div key={shot.src} className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="w-full h-auto"
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                  />
                  <p className="text-sm text-muted-foreground p-4">{shot.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products as proof */}
      <section className="py-20 bg-primary text-primary-foreground" data-testid="section-products">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
              Software we build and run ourselves
            </h2>
            <p className="text-lg text-center mb-10 max-w-2xl mx-auto">
              You're not buying a slide deck. These are our own products, live with customers, billing and uptime to keep. The systems we'd build for you are the same kind we run for ourselves.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-xl p-7">
                <h3 className="font-display font-bold text-xl mb-3">AutoListing.io</h3>
                <p className="text-primary-foreground/90 mb-4">
                  Turns a property listing into ready-to-post social content for estate agents, scheduled out on autopilot. A paid subscription product in Ireland, the UK and the US.
                </p>
                <a
                  href="https://autolisting.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline font-semibold"
                  data-testid="link-autolisting"
                >
                  autolisting.io
                </a>
              </div>
              <div className="bg-white/10 rounded-xl p-7">
                <h3 className="font-display font-bold text-xl mb-3">Rangplan.ie</h3>
                <p className="text-primary-foreground/90 mb-4">
                  A planning app for Irish primary school teachers, built around how Irish schools actually plan. Live and in teachers' hands.
                </p>
                <a
                  href="https://rangplan.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline font-semibold"
                  data-testid="link-rangplan"
                >
                  rangplan.ie
                </a>
              </div>
            </div>
            <p className="text-center mt-8">
              <Link href="/products" className="underline hover:no-underline font-semibold" data-testid="link-products-page">
                More on both, on the products page
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* How you start */}
      <section className="py-20" data-testid="section-engagement">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
              How you start
            </h2>
            <div className="space-y-6 mb-8">
              {[
                {
                  step: "1",
                  title: "A fifteen minute call",
                  body: "You tell us where the hours are going. If a build will not pay for itself, you'll hear that on the call.",
                },
                {
                  step: "2",
                  title: "A price in writing",
                  body: "What the system will do and what it costs, agreed before anything is built.",
                },
                {
                  step: "3",
                  title: "One workflow working end to end",
                  body: "Your team runs it on real work, and you expand only when it has earned it.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground">
              The longer answer on cost and timeline is on{" "}
              <Link href="/how-it-works" className="text-primary underline hover:no-underline" data-testid="link-how-it-works">
                the how it works page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 bg-slate-50" data-testid="section-founder">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src="/images/pete-harris.jpg"
              alt="Pete Harris, founder of Streamlined Tech"
              className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
              width="96"
              height="96"
              loading="lazy"
            />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              You deal with me, not an agency
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                I'm Pete Harris, the founder and the builder. No account managers, no offshore team, no layers.
              </p>
              <p>
                I've spent 20+ years in heavy industries and construction, from on the tools to training package production and now building the software. That is why the work holds up: I can read an operation, not just write code for one.
              </p>
              <p className="text-base">
                Australian, now based in Galway.{" "}
                <Link href="/australia" className="underline hover:no-underline text-foreground">
                  How that works for Australian sites
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 relative overflow-hidden" data-testid="section-security">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/security-bg.webp"
            alt="Security infrastructure"
            className="w-full h-full object-cover"
            width="1280"
            height="448"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-slate-900/85" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
              Your data stays yours
            </h2>
            <div className="space-y-6 text-slate-200 text-lg leading-relaxed">
              <p>
                Modern, enterprise-grade security practices: secure authentication, encrypted data storage, and strict access controls.
              </p>
              <p>
                Your systems run in isolated environments, your IP remains yours, and AI components do not train on or share your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline band */}
      <section className="py-16 bg-slate-900" data-testid="section-tagline">
        <div className="container mx-auto px-6 text-center">
          <p className="text-3xl md:text-4xl font-display font-bold text-white mb-5">
            As AI advances, so will you.
          </p>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            The AI underneath these systems gets better every few months. Because I build on it every day, the systems keep improving, and so does what your team can do with them. You are not buying a snapshot, you are buying a direction.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden" data-testid="section-final-cta">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/professional-work.webp"
            alt="Professional working"
            className="w-full h-full object-cover"
            width="1280"
            height="853"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-slate-900/85"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
              Tell me where the hours are going
            </h2>
            <p className="text-lg text-slate-200 mb-8">
              One job or the whole operation, fifteen minutes on the phone will tell us both whether it's worth doing. If it isn't, I'll say so.
            </p>
            <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-final">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a free call
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
