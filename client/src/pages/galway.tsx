import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Youtube, MapPin } from "lucide-react";
import { Link } from "wouter";
import { usePageTracking } from "@/hooks/use-page-tracking";

export default function Galway() {
  usePageTracking();
  const bookingUrl = "https://calendly.com/streamlinedaitech/discover-how-we-can-automate-simplify-your-workflows";

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Streamlined Tech Galway | Simple apps and automation for local businesses";
    return () => {
      document.title = previousTitle;
    };
  }, []);

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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-slate-200 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Galway, Ireland
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight" data-testid="text-hero-headline">
              Less paperwork for Galway businesses.
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
              I'm Pete Harris, founder of Streamlined Tech, based here in Galway.
              <br /><br />
              I build simple apps and automations that take the admin out of running a local business: chasing quotes and invoices, juggling bookings, collecting documents, rekeying orders.
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

      {/* What I Fix */}
      <section className="py-20" data-testid="section-fixes">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
              The jobs I take off your plate
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
              Most businesses lose hours every week to the same handful of admin jobs. Each one below is fixable with a small system, not a big IT project.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Chasing quotes and invoices</h3>
                <p className="text-sm text-muted-foreground">
                  Quotes followed up after you send them. Invoices chased politely until they're paid.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Bookings and reminders</h3>
                <p className="text-sm text-muted-foreground">
                  Online booking that writes straight into your diary, with reminders that reduce no-shows.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Renewals and expiry dates</h3>
                <p className="text-sm text-muted-foreground">
                  NCT, CVRT, insurance, certs, service-due dates. Reminders go out on time, every time.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Orders without rekeying</h3>
                <p className="text-sm text-muted-foreground">
                  Orders land in a list your team works from, not on the answering machine or a PDF form.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Documents before deadlines</h3>
                <p className="text-sm text-muted-foreground">
                  Client paperwork collected and chased ahead of the deadline, not the night before.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Your week's numbers</h3>
                <p className="text-sm text-muted-foreground">
                  One screen with the numbers that matter. No spreadsheet wrangling on a Sunday night.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshots Showcase */}
      <section className="py-20 bg-slate-50" data-testid="section-apps">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
              Real systems, already built
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
              These are working systems I've built, not mock-ups. On a call I can show you the one closest to your problem, running live.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <img
                  src="/images/app-training-dashboard.png"
                  alt="Staff training and certification tracking dashboard"
                  className="w-full h-auto"
                />
                <p className="text-sm text-muted-foreground p-4">
                  Staff certs and training tracked before the audit asks.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <img
                  src="/images/app-scheduling.png"
                  alt="Scheduling and calendar management"
                  className="w-full h-auto"
                />
                <p className="text-sm text-muted-foreground p-4">
                  Bookings and jobs that write themselves into the diary.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <img
                  src="/images/app-analytics.png"
                  alt="Analytics and reporting dashboard"
                  className="w-full h-auto"
                />
                <p className="text-sm text-muted-foreground p-4">
                  The week's numbers on one screen, updated automatically.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <img
                  src="/images/app-intake.png"
                  alt="Order and client intake without rekeying"
                  className="w-full h-auto"
                />
                <p className="text-sm text-muted-foreground p-4">
                  Orders and new client details captured once, typed never.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <div className="flex items-center justify-center p-4 gap-4">
                  <img
                    src="/images/app-renewals-mobile.png"
                    alt="Mobile renewals and expiry tracking"
                    className="h-64 w-auto rounded-lg shadow-sm"
                  />
                  <img
                    src="/images/app-video-mobile.png"
                    alt="Mobile content creation"
                    className="h-64 w-auto rounded-lg shadow-sm"
                  />
                </div>
                <p className="text-sm text-muted-foreground px-4 pb-4">
                  Renewals and expiry dates tracked from the phone.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                <div className="flex items-center justify-center p-4 gap-4">
                  <img
                    src="/images/app-settings-mobile.png"
                    alt="Mobile settings and branding"
                    className="h-64 w-auto rounded-lg shadow-sm"
                  />
                  <img
                    src="/images/app-scanning-mobile.png"
                    alt="Mobile document scanning"
                    className="h-64 w-auto rounded-lg shadow-sm"
                  />
                </div>
                <p className="text-sm text-muted-foreground px-4 pb-4">
                  Dockets and paperwork photographed, filed, and followed up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-20" data-testid="section-before-after">
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
                      <p className="text-muted-foreground text-sm">Evenings lost to invoicing and paperwork</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground text-sm">Quotes sent out and never followed up</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground text-sm">The diary lives in someone's head</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground text-sm">Deadline scrambles for documents and certs</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground text-sm">Everything on the phone, nothing written down</p>
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
                      <p className="text-foreground font-medium text-sm">Admin runs itself in the background</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-foreground font-medium text-sm">Every quote followed up, every time</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-foreground font-medium text-sm">Bookings and reminders happen automatically</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-foreground font-medium text-sm">Documents collected ahead of the deadline</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-foreground font-medium text-sm">You see the whole week on one screen</p>
                    </li>
                  </ul>
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
                  Start small. Prove it works.
                </h2>
                <div className="space-y-6 mb-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-1">A quick call</h3>
                      <p className="text-sm text-muted-foreground">
                        You tell me the job that eats your time. I'll show you a working system close to your problem, live on the call.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-1">A fixed price</h3>
                      <p className="text-sm text-muted-foreground">
                        One workflow, one agreed price before we start. Small build, small money, no surprises.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-1">About a week</h3>
                      <p className="text-sm text-muted-foreground">
                        Most first builds are working end-to-end inside a week or two. You expand only if it earns it.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">
                  This is not a multi-month IT project, and you don't commit to anything big upfront.
                </p>
                <p className="text-sm text-muted-foreground">
                  The first build is deliberately small. It exists to prove, in your business, that this pays for itself.
                </p>
              </div>
              <div>
                <img
                  src="/images/team-collaboration.jpg"
                  alt="Working through a workflow together"
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who You're Dealing With */}
      <section className="py-20 bg-primary text-primary-foreground" data-testid="section-founder">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              You deal with me, not an agency
            </h2>
            <div className="space-y-4 text-lg">
              <p>
                I'm the founder and the builder. No account managers, no offshore team, no layers.
              </p>
              <p>
                Before software I spent 20+ years in mining and construction operations, so I know what admin pressure looks like from the inside. Now I build and run my own software company,{" "}
                <a
                  href="https://autolisting.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline font-semibold"
                  data-testid="link-autolisting-main"
                >
                  AutoListing.io
                </a>
                , which automates property marketing for real estate agents every day.
              </p>
              <p>
                The systems I'd build for you are the same kind I run myself.
              </p>
            </div>
          </div>
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
              Galway city and county, and anywhere within an hour or so of it:
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Galway city", "Oranmore", "Athenry", "Tuam", "Loughrea", "Gort", "Ballinasloe", "Ennis", "Athlone", "Limerick"].map((town) => (
                <span key={town} className="px-4 py-1.5 bg-slate-100 text-foreground rounded-full text-sm font-medium">
                  {town}
                </span>
              ))}
            </div>
            <p className="text-base text-muted-foreground">
              Remote works fine too. But being local means I can sit at your counter, see the actual workflow, and call back in when something needs tweaking.
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
          />
          <div className="absolute inset-0 bg-slate-900/85"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
              Tell me the job that eats your evenings
            </h2>
            <p className="text-lg text-slate-200 mb-8">
              Fifteen minutes on the phone will tell us both whether it's fixable. If it's not, I'll say so.
            </p>
            <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-final">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
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
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
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
