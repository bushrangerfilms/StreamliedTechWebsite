import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "wouter";
import { usePageTracking } from "@/hooks/use-page-tracking";

export default function Home() {
  usePageTracking();
  const bookingUrl = "https://calendly.com/streamlinedaitech/discover-how-we-can-automate-simplify-your-workflows";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/images/logo.png" 
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-operations.jpg" 
            alt="Operations professional with tablet" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/70"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight" data-testid="text-hero-headline">
              Take the friction out of your day-to-day operations.
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
              Delays, rework, and manual handovers create unnecessary pressure, costs and errors.
              <br /><br />
              We design automation that reduces friction, cuts rework, and keeps your work moving the way it should - with less complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-hero">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book A Free Call
                </a>
              </Button>
              <div className="text-sm text-slate-300">
                15-minute ops review. No hard sell.
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-6">
              Pilot-first. Audit-friendly. Built around how your team actually works.
            </p>
          </div>
        </div>
      </section>

      {/* App Screenshots Showcase */}
      <section className="py-20 bg-slate-50" data-testid="section-apps">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
              Custom apps built for how you work
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
              Real systems we've built - from training management to scheduling, analytics to field operations. Each one designed around the specific process it supports.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <img 
                  src="/images/app-training-dashboard.png" 
                  alt="Training management dashboard" 
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <img 
                  src="/images/app-scheduling.png" 
                  alt="Scheduling and calendar management" 
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <img 
                  src="/images/app-analytics.png" 
                  alt="Analytics and reporting dashboard" 
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <img 
                  src="/images/app-intake.png" 
                  alt="Data intake and processing" 
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border flex items-center justify-center p-4 gap-4">
                <img 
                  src="/images/app-renewals-mobile.png" 
                  alt="Mobile renewals tracking" 
                  className="h-64 w-auto rounded-lg shadow-sm"
                />
                <img 
                  src="/images/app-video-mobile.png" 
                  alt="Mobile video creation" 
                  className="h-64 w-auto rounded-lg shadow-sm"
                />
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border flex items-center justify-center p-4 gap-4">
                <img 
                  src="/images/app-settings-mobile.png" 
                  alt="Mobile settings and branding" 
                  className="h-64 w-auto rounded-lg shadow-sm"
                />
                <img 
                  src="/images/app-scanning-mobile.png" 
                  alt="Mobile scanning interface" 
                  className="h-64 w-auto rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Anchor */}
      <section className="py-20" data-testid="section-experience">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Built by someone who understands operational pressure
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              With 20+ years of hands-on experience across mining and construction - from on the tools to training package production - we understand what it takes to build systems that hold up under real-world conditions.
            </p>
            <p className="text-base text-foreground font-medium">
              If your workflows involve compliance, coordination, and constant change, we've seen it before.
            </p>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-20 bg-slate-50" data-testid="section-before-after">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src="/images/dashboard-analytics.jpg" 
                  alt="Clean dashboard with real-time visibility" 
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
              <div className="order-1 lg:order-2 grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="inline-block px-4 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-medium mb-4">
                    Before
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground text-sm">Paper, spreadsheets, email chains scattered everywhere</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground text-sm">Reporting that's manual, late, and inconsistent</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground text-sm">Close-out drifts, ownership unclear</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground text-sm">Compliance scrambles at audit time</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground text-sm">Long chain of delayed human touch points</p>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    After
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-foreground font-medium text-sm">Live visibility without chasing</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-foreground font-medium text-sm">Reporting generated automatically</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-foreground font-medium text-sm">Issues captured and closed properly</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-foreground font-medium text-sm">Audit-ready by default</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-foreground font-medium text-sm">Progress steps with AI and automated notifications to next human required</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where Automation Delivers ROI */}
      <section className="py-20" data-testid="section-roi">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-2">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Where automation delivers real ROI
                </h2>
                <p className="text-lg text-muted-foreground mb-3">
                  You'll see ROI fastest where admin, risk, and rework stack up.
                </p>
                <p className="text-base text-foreground font-medium mb-6">
                  You get custom apps built around your specific process - not generic templates.
                </p>
                <img 
                  src="/images/construction-app.png" 
                  alt="Construction worker using mobile app" 
                  className="rounded-xl shadow-md w-full hidden lg:block"
                />
              </div>
              <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Safety and compliance workflows</h3>
                <p className="text-sm text-muted-foreground">
                  Incident capture, corrective actions, audit trails, approval routing
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Defects, NCRs and close-out</h3>
                <p className="text-sm text-muted-foreground">
                  Photo capture, assign and verify, close-out tracking, trend visibility
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Project reporting and admin</h3>
                <p className="text-sm text-muted-foreground">
                  Weekly reporting packs, progress summaries, photo logging, follow-ups
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Workforce coordination</h3>
                <p className="text-sm text-muted-foreground">
                  Competency and training checks, onboarding steps, approvals, reminders
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Internal and customer communications</h3>
                <p className="text-sm text-muted-foreground">
                  Routing, follow-ups, escalation logic, consistent updates
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Quoting, tenders and approvals</h3>
                <p className="text-sm text-muted-foreground">
                  Document collection, review steps, approval flows
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How You Start */}
      <section className="py-20 bg-slate-50" data-testid="section-engagement">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
                  How you start (low risk)
                </h2>
                <div className="space-y-6 mb-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-1">Ops review</h3>
                      <p className="text-sm text-muted-foreground">
                        You show us the bottlenecks; we map the workflow and the ROI
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-1">Pilot (2-4 weeks)</h3>
                      <p className="text-sm text-muted-foreground">
                        One workflow end-to-end, running in the real world
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-1">Rollout</h3>
                      <p className="text-sm text-muted-foreground">
                        You expand only when value is proven
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">
                  This isn't a multi-month IT project, and you don't commit to a big rollout upfront.
                </p>
                <p className="text-sm text-muted-foreground">
                  Your pilot can be a <strong>custom app</strong> or an end-to-end workflow automation - whichever removes the bottleneck fastest.
                </p>
              </div>
              <div>
                <img 
                  src="/images/team-collaboration.jpg" 
                  alt="Team collaborating on workflow mapping" 
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AutoListing.io Proof */}
      <section className="py-20 bg-primary text-primary-foreground" data-testid="section-autolisting">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              From custom systems to productised automation
            </h2>
            <div className="space-y-4 text-lg">
              <p>You're not buying a slide deck. You're getting systems that run.</p>
              <p>
                You can watch Streamlined Tech's Real Estate automation platform demo video here:{" "}
                <a 
                  href="https://autolisting.io" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline hover:no-underline font-semibold"
                  data-testid="link-autolisting-main"
                >
                  AutoListing.io
                </a>
              </p>
              <p>Build reliable, scalable automation, not just prototypes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20" data-testid="section-principles">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-primary text-primary-foreground p-8 rounded-lg">
                <h3 className="font-display font-semibold text-xl mb-3">Less admin. More control.</h3>
                <p className="text-primary-foreground/90">
                  Reduce double-handling and keep ownership clear.
                </p>
              </div>
              <div className="bg-primary text-primary-foreground p-8 rounded-lg">
                <h3 className="font-display font-semibold text-xl mb-3">Built for auditability.</h3>
                <p className="text-primary-foreground/90">
                  Evidence is captured as work happens, not after the fact.
                </p>
              </div>
              <div className="bg-primary text-primary-foreground p-8 rounded-lg">
                <h3 className="font-display font-semibold text-xl mb-3">Designed around real workflows.</h3>
                <p className="text-primary-foreground/90">
                  Practical systems your team can use on site and in the office.
                </p>
              </div>
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
          />
          <div className="absolute inset-0 bg-slate-900/85"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
              Book a free call
            </h2>
            <p className="text-lg text-slate-200 mb-8">
              Bring one workflow that's causing friction. You'll leave with a practical next step and a clear view of whether a pilot is worth doing.
            </p>
            <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-final">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                Book A Free Call
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt="Streamlined Tech - Intelligent AI Automations" 
                className="h-14 w-auto"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms and Conditions</Link>
              </div>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-youtube">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-tiktok">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-linkedin">
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
