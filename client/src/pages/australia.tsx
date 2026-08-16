import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "wouter";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";

// Australian market landing page. Deliberately leads on internal apps and
// ongoing workflow systems rather than AI assistants: the assistant is the
// thing every AI agency demos, and it is not what this business specialises in.
export default function Australia() {
  usePageTracking();
  const bookingUrl = "https://calendly.com/streamlinedaitech/discover-how-we-can-automate-simplify-your-workflows";

  useSeo(ROUTE_SEO.australia);

  const theWork = [
    {
      title: "Progress tracking that matches the real job",
      body: "One place that shows what is done, what is open and what is waiting on someone else. Built around your stages and your language, not a template you have to bend to fit.",
    },
    {
      title: "Defects, NCRs and close-out",
      body: "Raised on a phone in the field, moved through the trades automatically, closed out with the evidence attached. The audit trail builds itself as the work happens.",
    },
    {
      title: "Follow-ups that happen without chasing",
      body: "The system contacts the next person when it is their turn. Your supervisors stop spending their afternoon ringing around to find out where something got to.",
    },
    {
      title: "Reporting that writes itself",
      body: "Daily and weekly reporting generated from what was already captured, so nobody rebuilds it from scratch in a spreadsheet on Sunday night.",
    },
    {
      title: "Handovers and approvals",
      body: "Packs assembled from the record rather than compiled by hand, and approvals that move without sitting in somebody's inbox.",
    },
    {
      title: "Assistants, where they earn their place",
      body: "An assistant trained on your gear, procedures and history is genuinely useful for answering questions on site. It works best sitting on top of systems that already hold good data.",
    },
  ];

  const adoption = [
    {
      title: "Fast enough to use standing up",
      body: "Gloves on, one hand, in the weather. If it takes longer than the old way, it will not get used and no policy will fix that.",
    },
    {
      title: "Photo first",
      body: "Capture the evidence, type as little as possible. A photo says more than a paragraph and takes a fraction of the time.",
    },
    {
      title: "No training day required",
      body: "It behaves like the apps people already use on their own phones, so the rollout is not a project in itself.",
    },
    {
      title: "Plain language",
      body: "Fixes, not tickets or issues. The words on screen should be the words used on site.",
    },
  ];

  const phases = [
    {
      label: "Pilot",
      title: "One site, one problem",
      points: ["A single site and selected trades", "One workflow, scoped tight", "Rapid iteration while people use it"],
    },
    {
      label: "Review",
      title: "Adjusted to what actually happened",
      points: ["Changed against real field feedback", "Workflows refined, thresholds set", "Widened once it is earning its keep"],
    },
    {
      label: "Ongoing",
      title: "It keeps developing",
      points: ["Rolled out across projects", "Repeat patterns surfaced from the data", "New capability added as the work changes"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/images/logo.webp"
              alt="Streamlined Tech - Intelligent AI Automations"
              className="h-[72px] w-auto"
              width="389"
              height="144"
            />
          </Link>
          <Button asChild size="lg" data-testid="button-cta-header">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Book a free call
            </a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-mining.webp"
            alt="Site supervisor in hi-vis checking his phone beside a ute on an open-cut mine haul road, haul truck behind"
            className="w-full h-full object-cover object-[68%_center] md:object-center"
            width="1672"
            height="941"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/70"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 py-16 md:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-amber-400 mb-4 uppercase">
              For Australian mining and construction
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-5 leading-tight" data-testid="text-hero-headline">
              Internal apps that keep the job moving.
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-5 leading-relaxed">
              Most of the value is not in a chatbot. It is in the ordinary systems that track progress, close out defects and chase the follow-ups, so work stops stalling between steps.
            </p>
            <p className="text-sm text-slate-300 mb-8">
              Custom built for how your site already runs, then developed further as the work changes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-hero">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book a free call
                </a>
              </Button>
              <div className="text-sm text-slate-300 sm:self-center">
                Calls booked to suit Australian hours.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The anti-positioning */}
      <section className="py-20" data-testid="section-not-assistants">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Everyone is selling you an assistant
            </h2>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                It is the easiest thing to demo. You ask it a question, it gives you an answer, and the room nods. We build them too, and a good one is genuinely useful.
              </p>
              <p>
                It is rarely the thing that changes your Monday. What changes your Monday is duller: knowing which jobs are stuck, who is holding them and what happens next, without a supervisor spending half a shift ringing around to find out.
              </p>
              <p className="text-foreground font-medium">
                That is the work we specialise in. Internal apps built around one operation, kept running and extended over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-20 bg-slate-50" data-testid="section-what-we-build">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
            The unglamorous list
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            None of this is exciting to look at. It is what takes the admin load off a site.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {theWork.map((item) => (
              <div key={item.title} className="bg-white p-7 rounded-lg border border-border">
                <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Worked example: defects tracker */}
      <section className="py-20" data-testid="section-worked-example">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm font-semibold tracking-wide text-primary mb-3 uppercase">
              A worked example
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              A defects tracker, built for one operation
            </h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Defects do not cost money because they are hard to fix. They cost money because they stall between steps. Responsibility goes unclear, a contractor gets called to site before the work is ready for them, an inspection slips, and the status only becomes obvious once the time is already lost.
                </p>
                <p>
                  So the app does one job. It moves a defect from the moment somebody spots it to final sign off, and it makes stalling impossible to ignore.
                </p>
              </div>
              <div>
                <img
                  src="/images/construction-app.webp"
                  alt="Site supervisor using a defects tracking app on a phone"
                  className="rounded-lg shadow-lg w-full"
                  width="1280"
                  height="896"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="border-l-4 border-primary pl-5">
                <h3 className="text-xl font-display font-bold mb-2">Only the essential fields</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Raised in seconds with a photo, on a phone, with gloves on. Nothing is asked for that somebody else could fill in later.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-5">
                <h3 className="text-xl font-display font-bold mb-2">It moves itself</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The system contacts the next person when it is their turn. Your site staff are not the ones doing the chasing.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-5">
                <h3 className="text-xl font-display font-bold mb-2">Nothing hides</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every defect is visibly moving or visibly stuck. If one is not moving, it is immediately obvious why.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-slate-900 rounded-lg p-8 md:p-10">
              <p className="text-slate-300 mb-5 text-sm uppercase tracking-wide font-semibold">
                What it is, and what it is not
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-white font-semibold mb-3">What it is</p>
                  <ul className="space-y-2 text-slate-300">
                    <li>A custom tool specific to one operation</li>
                    <li>A movement and accountability layer</li>
                    <li>Something a chaotic site gets calmer with</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-semibold mb-3">What it is not</p>
                  <ul className="space-y-2 text-slate-400">
                    <li>Document control</li>
                    <li>Finance or claims</li>
                    <li>Another enterprise platform to administer</li>
                    <li>A generic one size fits all</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adoption */}
      <section className="py-20 bg-slate-50" data-testid="section-adoption">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-5">
              Why it gets used
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Software usually fails on site because it asks for too much. Adoption happens because the thing makes someone's day easier, not because it was mandated in a meeting they were not in.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {adoption.map((item) => (
              <div key={item.title} className="bg-white p-7 rounded-lg border border-border">
                <h3 className="text-lg font-display font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing capability */}
      <section className="py-20" data-testid="section-ongoing">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-5">
              The build is where it starts
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A one off delivery gets handed over and slowly stops matching the job. These systems are meant to be lived in, so they are built in stages and kept developing after they land.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {phases.map((phase) => (
              <div key={phase.label} className="bg-white p-7 rounded-lg border border-border">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
                  {phase.label}
                </span>
                <h3 className="text-xl font-display font-bold mb-4">{phase.title}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {phase.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
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

      {/* Founder */}
      <section className="py-20 bg-primary text-primary-foreground" data-testid="section-founder">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src="/images/pete-harris.jpg"
              alt="Pete Harris, founder of Streamlined Tech"
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover ring-4 ring-white/30 shadow-lg mx-auto mb-8"
              loading="lazy"
            />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              You deal with me, not an agency
            </h2>
            <div className="space-y-4 text-lg">
              <p>
                I'm Pete Harris. Australian, now based in Ireland, and I still do most of my work with Australian operations. No account managers, no offshore team, no layers between you and the person building it.
              </p>
              <p>
                I've spent 20+ years around mining and construction, from on the tools to training package production and now building the software, on sites where the paperwork was the bottleneck. That is why this work is worth having from me: I can read an operation, not just write code for one.
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
                , a full production platform with customers, billing and uptime to keep. So the systems I'd build for you are the same kind I build and run for myself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where the work is */}
      <section className="py-20" data-testid="section-areas">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Working with Australian operations
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              The work is done remotely, which is already how most Australian sites run their support functions. Calls get booked to land inside your business hours rather than mine.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Perth", "Pilbara", "Karratha", "Port Hedland", "Kalgoorlie", "Darwin", "Brisbane", "Mackay", "Bowen Basin", "Gladstone", "Hunter Valley", "Newcastle"].map((place) => (
                <span key={place} className="px-4 py-1.5 bg-slate-100 text-foreground rounded-full text-sm font-medium">
                  {place}
                </span>
              ))}
            </div>
            <p className="text-base text-muted-foreground">
              FIFO rosters, multiple sites and head office all pulling on the same information is the normal starting point, not a complication.
            </p>
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

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden" data-testid="section-final-cta">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/professional-work.webp"
            alt="Professional working"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-slate-900/85"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
              Tell me where the job keeps stalling
            </h2>
            <p className="text-lg text-slate-200 mb-8">
              One workflow or the whole operation, fifteen minutes on the phone will tell us both whether it's worth doing. If it isn't, I'll say so.
            </p>
            <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-final">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
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
