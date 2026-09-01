import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Youtube, MapPin } from "lucide-react";
import { Link } from "wouter";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";

export default function Contractors() {
  usePageTracking();
  const bookingUrl = "https://calendly.com/streamlinedaitech/discover-how-we-can-automate-simplify-your-workflows";

  useSeo(ROUTE_SEO.contractors);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/images/logo.webp"
              alt="Streamlined Tech - Intelligent AI Automations"
              className="h-[72px] w-auto"
            />
          </div>
          <Button asChild size="lg" data-testid="button-cta-header">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Book A Free Call
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-slate-200 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Galway based. On sites across Ireland.
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight" data-testid="text-hero-headline">
              Custom internal apps for construction and heavy industry.
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground font-display font-semibold text-slate-100 mb-6">
              Grow the fleet without growing the office.
            </p>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
              I'm Pete Harris, founder of Streamlined Tech. 20+ years in heavy industries and construction, from on the tools to training package production and now building the software. You deal with me directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-hero">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book A Free Call
                </a>
              </Button>
              <div className="text-sm text-slate-300">
                15 minute chat. No hard sell.
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-6">
              And if you're nearby, I'm happy to call in instead.
            </p>
          </div>
        </div>
      </section>

      {/* Where to start */}
      <section className="py-16 bg-slate-50" data-testid="section-hook">
        <div className="container mx-auto px-6">
          <p className="text-xl md:text-2xl font-display font-medium text-center max-w-3xl mx-auto leading-relaxed">
            You already know AI could be taking work off your plate. The hard part is knowing where to start.{" "}
            <span className="text-primary font-semibold">That's what we do.</span>
          </p>
        </div>
      </section>

      {/* Example builds */}
      <section className="py-20" data-testid="section-examples">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
              Designed around your specific needs
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
              No two operations run the same way, so every build is custom. For example, your app could:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Every job on one screen</h3>
                <p className="text-sm text-muted-foreground">
                  From booked to done, visibly moving or visibly stuck, across every crew.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">The full job pack in the crew's hand</h3>
                <p className="text-sm text-muted-foreground">
                  JHA, SOP, job description, contacts, job history and the pre-start checklist, all on the phone before they leave the yard.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Follow-ups that send themselves</h3>
                <p className="text-sm text-muted-foreground">
                  Quotes chased, invoices chased, reminders out on time, so nobody is ringing around.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Dockets, timesheets and sign-offs</h3>
                <p className="text-sm text-muted-foreground">
                  Filled in from the phone and filed where the office can see them, off paper for good.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Pre-starts and safety checks</h3>
                <p className="text-sm text-muted-foreground">
                  Answered from the cab and stored where the auditor can find them.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Service and cert dates</h3>
                <p className="text-sm text-muted-foreground">
                  CVRT, insurance, calibrations and service-due dates that flag themselves before they bite.
                </p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mt-12 text-center max-w-3xl mx-auto">
              We work with you to identify the best tasks to start automating with your app for the biggest return. We specialise in making complex systems simple and as automated as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Ownership band */}
      <section className="py-16 bg-slate-900" data-testid="section-ownership">
        <div className="container mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            It's your app. Built around how you already run jobs. You stay in control.
          </p>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Your internal app can become the central hub of all operations.
          </p>
        </div>
      </section>

      {/* App Screenshots Showcase */}
      <section className="py-20 bg-slate-50" data-testid="section-apps">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
              Real systems, already built
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <img
                  src="/images/app-scheduling.webp"
                  alt="Job and crew scheduling"
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-sm text-muted-foreground p-4">
                  Crews and jobs that write themselves into the schedule.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <img
                  src="/images/app-training-dashboard.webp"
                  alt="Crew training and certification tracking dashboard"
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-sm text-muted-foreground p-4">
                  Crew tickets and training tracked before the audit asks.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <img
                  src="/images/app-analytics.webp"
                  alt="Analytics and reporting dashboard"
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-sm text-muted-foreground p-4">
                  The week's numbers on one screen, updated automatically.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <img
                  src="/images/app-intake.webp"
                  alt="Order and job request intake without rekeying"
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-sm text-muted-foreground p-4">
                  Orders and job requests captured once, typed never.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <div className="flex items-center justify-center p-4 gap-4">
                  <img
                    src="/images/app-renewals-mobile.webp"
                    alt="Mobile renewals and expiry tracking"
                    className="h-64 w-auto rounded-lg shadow-sm"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src="/images/app-video-mobile.webp"
                    alt="Mobile app views"
                    className="h-64 w-auto rounded-lg shadow-sm"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="text-sm text-muted-foreground px-4 pb-4">
                  CVRT, insurance and service dates tracked from the phone.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <div className="flex items-center justify-center p-4 gap-4">
                  <img
                    src="/images/app-settings-mobile.webp"
                    alt="Mobile settings"
                    className="h-64 w-auto rounded-lg shadow-sm"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src="/images/app-scanning-mobile.webp"
                    alt="Mobile docket scanning"
                    className="h-64 w-auto rounded-lg shadow-sm"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="text-sm text-muted-foreground px-4 pb-4">
                  Dockets photographed, filed, and followed up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Ways To Work */}
      <section className="py-20" data-testid="section-engagement">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
              Two ways to work with me
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
              Same builder either way. The difference is how much of the operation you want to put under the microscope on day one.
            </p>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-border p-8 flex flex-col">
                <div className="inline-flex self-start items-center px-3 py-1 bg-slate-100 text-foreground rounded-full text-xs font-semibold uppercase tracking-wide mb-5">
                  Low risk start
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">Start with one job</h3>
                <p className="text-muted-foreground mb-4">
                  Pick the single job that eats the most time. I build that one thing for a price agreed before we start, and it is usually working end to end inside a week or two.
                </p>
                <p className="text-muted-foreground mb-6">
                  This is what I suggest to most new clients, and it is a suggestion rather than a limit. It gets automation into the business without disrupting how your crews work, and it lets you judge me on something real before you commit to anything larger.
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    "One workflow, one fixed price",
                    "Working inside a week or two",
                    "No disruption to the crews",
                    "You expand only if it earns it",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-foreground font-medium">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl border-2 border-primary p-8 flex flex-col">
                <div className="inline-flex self-start items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wide mb-5">
                  Full engagement
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">Or take the whole operation apart</h3>
                <p className="text-muted-foreground mb-4">
                  A full audit of how work actually moves through your operation, yard to site to office: where the hours go, what gets rekeyed, what gets missed, what a system should own instead of a person.
                </p>
                <p className="text-muted-foreground mb-6">
                  You get a prioritised plan of what to automate and in what order, then I build it. Custom software designed around how you already work, not an off-the-shelf tool you have to bend your process around. And along the way I teach your staff to use AI themselves, so the gains keep compounding after I'm gone. This is a programme of work measured in months, not a one week fix.
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    "Full operational audit, site to office",
                    "Prioritised plan, costed before anything is built",
                    "Custom systems across the business, not templates",
                    "Your staff taught to use AI, not left dependent on me",
                    "Built and maintained by the person who audited you",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-foreground font-medium">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-10 max-w-2xl mx-auto">
              Most clients start on the left and move to the right once the first build has paid for itself. You are welcome to start on either.
            </p>
            <div className="max-w-3xl mx-auto mt-14 bg-white rounded-xl border border-border p-8">
              <h3 className="text-2xl font-display font-bold mb-3 text-center">What it costs</h3>
              <p className="text-muted-foreground mb-6 text-center">
                The price is agreed before anything starts. To give you an idea:
              </p>
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
                    scope: "A full review of how work moves through the operation, with the systems built around it",
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
          </div>
        </div>
      </section>

      {/* Who You're Dealing With */}
      <section className="py-20 bg-primary text-primary-foreground" data-testid="section-founder">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src="/images/pete-harris.jpg"
              alt="Pete Harris, founder of Streamlined Tech"
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover ring-4 ring-white/30 shadow-lg mx-auto mb-8"
              loading="lazy"
              decoding="async"
            />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              You deal with me, not an agency
            </h2>
            <div className="space-y-4 text-lg">
              <p>
                I'm the founder and the builder. No account managers, no offshore team, no layers.
              </p>
              <p>
                I've spent 20+ years in heavy industries and construction, from on the tools to training package production and now building the software, on sites where the paperwork was the bottleneck. That is why the audit work is worth having: I can read an operation, not just write code for one.
              </p>
              <p>
                I also build and run my own software company,{" "}
                <a
                  href="https://autolisting.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline font-semibold"
                  data-testid="link-autolisting-main"
                >
                  AutoListing.io
                </a>
                , a full production platform that automates property marketing for real estate agents every day. It is not a demo. It has customers, billing, and uptime to keep.
              </p>
              <p>
                So the systems I'd build for you are the same kind I build and run for myself.
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

      {/* Where I Work */}
      <section className="py-20" data-testid="section-areas">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Where I work
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              I'm based in Galway and work across the west, the Mid-West and the midlands, on site:
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Galway city", "Oranmore", "Athenry", "Tuam", "Loughrea", "Ballinasloe", "Ennis", "Shannon", "Limerick", "Athlone", "Roscommon", "Castlebar"].map((town) => (
                <span key={town} className="px-4 py-1.5 bg-slate-100 text-foreground rounded-full text-sm font-medium">
                  {town}
                </span>
              ))}
            </div>
            <p className="text-base text-muted-foreground">
              Anywhere else in Ireland works too, remotely or by travelling to you for the parts that need me in the room. Being on site matters most during an audit, when I need to stand where the work actually happens and watch it.
            </p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 relative overflow-hidden" data-testid="section-security">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/security-bg.jpg"
            alt="Security infrastructure"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
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

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden" data-testid="section-final-cta">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/professional-work.jpg"
            alt="Professional working"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
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
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                Book A Free Call
              </a>
            </Button>
            <p className="text-sm text-slate-300 mt-6">
              Or call 085 190 5252, or email{" "}
              <a href="mailto:peter@streamlinedai.tech" className="underline hover:no-underline" data-testid="link-email">
                peter@streamlinedai.tech
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center">
              <img
                src="/images/logo.webp"
                alt="Streamlined Tech - Intelligent AI Automations"
                className="h-14 w-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              <div className="flex gap-6 text-sm">
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
                <Link href="/business" className="text-muted-foreground hover:text-foreground transition-colors">For all businesses</Link>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms and Conditions</Link>
              </div>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/streamlinedtechai/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/streamlinedtechai/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@StreamlinedTechAI" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-youtube">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@streamlinedtech" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-tiktok">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/peter-harris-62b05a57/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-linkedin">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
