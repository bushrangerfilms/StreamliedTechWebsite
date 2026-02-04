import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Home() {
  const bookingUrl = "https://calendly.com/streamlinedaitech/discover-how-we-can-automate-simplify-your-workflows";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <div className="font-display font-bold text-lg leading-tight">Streamlined Tech</div>
              <div className="text-xs text-muted-foreground">Intelligent AI Automations</div>
            </div>
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
              Operational automation for high‑pressure environments.
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
              You don't need more admin. You need visibility, clean handovers, and workflows that stand up under compliance pressure. We design automation systems that <strong>significantly speed up your workflows</strong>, reduce risk, and keep your operations moving — proven in construction and mining environments, practical enough to work anywhere.
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

      {/* Proof Anchor */}
      <section className="py-20 bg-slate-50" data-testid="section-proof">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              Where this work is battle-tested
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
              When you're operating under tight timelines, high compliance, and constant change, manual work doesn't just waste time — it creates gaps. We build for that reality.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-2">Construction & infrastructure</h3>
                <p className="text-muted-foreground">workflows</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-2">Mining & industrial operations</h3>
                <p className="text-muted-foreground">workflows</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-2">Product proof</h3>
                <p className="text-muted-foreground">
                  We're the team behind{" "}
                  <a 
                    href="https://autolisting.io" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline font-medium"
                    data-testid="link-autolisting-proof"
                  >
                    AutoListing.io
                  </a>
                  {" "}— a working automation platform
                </p>
              </div>
            </div>
            <p className="text-center text-lg font-medium text-foreground mb-4">
              If it holds up there, it holds up anywhere.
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Led by 20+ years across mining and construction roles, from on the tools to training package production.
            </p>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-20" data-testid="section-before-after">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="inline-block px-4 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-medium mb-4">
                  Before
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Paper, spreadsheets, email chains, and photos scattered across devices</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Reporting that's manual, late, and inconsistent</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Close-out that drifts because ownership isn't clear</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Compliance evidence built in a scramble instead of captured as you go</p>
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
                    <p className="text-foreground font-medium">Live visibility without chasing people</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <p className="text-foreground font-medium">Reporting generated from the work being done</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <p className="text-foreground font-medium">Issues captured, assigned, verified, and closed properly</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <p className="text-foreground font-medium">Records that are audit-ready by default</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where Automation Delivers ROI */}
      <section className="py-20 bg-slate-50" data-testid="section-roi">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
              Where automation delivers real ROI
            </h2>
            <p className="text-lg text-muted-foreground mb-3 text-center">
              You'll see ROI fastest where admin, risk, and rework stack up.
            </p>
            <p className="text-base text-foreground font-medium mb-12 text-center">
              You get custom apps built around your specific process — not generic templates.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Safety & compliance workflows</h3>
                <p className="text-sm text-muted-foreground">
                  Incident capture, corrective actions, audit trails, approval routing
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Defects, NCRs & close‑out</h3>
                <p className="text-sm text-muted-foreground">
                  Photo capture, assign + verify, close-out tracking, trend visibility
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Project reporting & admin</h3>
                <p className="text-sm text-muted-foreground">
                  Weekly reporting packs, progress summaries, photo logging, follow-ups
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Workforce coordination</h3>
                <p className="text-sm text-muted-foreground">
                  Competency/training checks, onboarding steps, approvals, reminders
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Internal and customer communications</h3>
                <p className="text-sm text-muted-foreground">
                  Routing, follow-ups, escalation logic, consistent updates
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Quoting, tenders & approvals</h3>
                <p className="text-sm text-muted-foreground">
                  Document collection, review steps, approval flows
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How You Start */}
      <section className="py-20" data-testid="section-engagement">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
              How you start (low risk)
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-display font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Ops review</h3>
                <p className="text-sm text-muted-foreground">
                  You show us the bottlenecks; we map the workflow and the ROI
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-display font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Pilot (2–4 weeks)</h3>
                <p className="text-sm text-muted-foreground">
                  One workflow end-to-end, running in the real world
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-display font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Rollout</h3>
                <p className="text-sm text-muted-foreground">
                  You expand only when value is proven
                </p>
              </div>
            </div>
            <p className="text-center text-muted-foreground mb-4">
              This isn't a multi-month IT project, and you don't commit to a big rollout upfront.
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Your pilot can be a <strong>custom app</strong> or an end-to-end workflow automation — whichever removes the bottleneck fastest.
            </p>
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
                Streamlined Tech built{" "}
                <a 
                  href="https://autolisting.io" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline hover:no-underline font-semibold"
                  data-testid="link-autolisting-main"
                >
                  AutoListing.io
                </a>
                {" "}— a working automation platform.
              </p>
              <p>That's your proof we can build reliable, scalable automation, not just prototypes.</p>
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

      {/* Tech Stack */}
      <section className="py-20 bg-slate-50" data-testid="section-tech">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-bold mb-3 text-center">
              Some tech we use
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              We choose tools based on reliability, scalability, and auditability — not trends.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-60">
              <div className="text-center text-sm font-medium">Perplexity</div>
              <div className="text-center text-sm font-medium">11ElevenLabs</div>
              <div className="text-center text-sm font-medium">HighLevel</div>
              <div className="text-center text-sm font-medium">n8n</div>
              <div className="text-center text-sm font-medium">Calendly</div>
              <div className="text-center text-sm font-medium">Claude</div>
              <div className="text-center text-sm font-medium">Google VEO 3</div>
              <div className="text-center text-sm font-medium">Make</div>
              <div className="text-center text-sm font-medium">OpenAI</div>
              <div className="text-center text-sm font-medium">Kling AI</div>
              <div className="text-center text-sm font-medium">APIFY</div>
              <div className="text-center text-sm font-medium">Runway</div>
              <div className="text-center text-sm font-medium">Pinecone</div>
              <div className="text-center text-sm font-medium">Zapier</div>
              <div className="text-center text-sm font-medium opacity-50">& many more...</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20" data-testid="section-final-cta">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Book a free call
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
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
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <div className="w-7 h-7 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <div className="font-display font-bold text-lg leading-tight">Streamlined Tech</div>
                <div className="text-sm text-muted-foreground">Intelligent AI Automations</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</a>
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
