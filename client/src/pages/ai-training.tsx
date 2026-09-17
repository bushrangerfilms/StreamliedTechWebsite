import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "wouter";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader, BOOKING_URL } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/**
 * AI training for business teams (added 17 Sep 2026).
 *
 * Words only on purpose: format, length, group size and price were not yet
 * decided when this page shipped, so nothing here commits to them. The
 * ongoing angle comes from Pete's own 8 Sep 2026 reply to a prospect who had
 * "already done AI training": a training day dates fast, so the offer is
 * training on the team's own work, kept current. Any copy change here must
 * update the "/ai-training" mirror in seo-static-html.ts in the same commit.
 */
export default function AiTraining() {
  usePageTracking();

  useSeo(ROUTE_SEO.aiTraining);

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
              Get more done with the team you already have
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
              Hands-on AI training for you and your team, built around the work they already do. Practical sessions on your own quotes, emails, reports and paperwork, not a slideshow, and kept current as the tools change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-hero">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book A Free Call
                </a>
              </Button>
              <div className="text-sm text-slate-300">
                <p>A short call first. No hard sell.</p>
                <p>And if you're nearby, we're happy to call in instead.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why one training day is not enough */}
      <section className="py-20" data-testid="section-why">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Why one training day is rarely enough
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Plenty of businesses have already sent someone on an AI course or bought a subscription. That is a good first step, and more than most have done.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              The trouble is how fast this space moves. What a team picks up on a training day tends to date quickly, because the tools keep changing under you. And the know-how often ends up sitting with one person instead of the whole office.
            </p>
            <p className="text-lg text-foreground">
              That is why we are not a one-off training shop. We train your team on their own work, then keep it current, so what you have invested in gets used across the business.
            </p>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-20 bg-slate-50" data-testid="section-examples">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
              What your team could hand to AI
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
              Every business is different, so treat these as examples rather than a menu. The sessions are built around the jobs that eat the most time in yours.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Quotes and tenders",
                  body: "First drafts of quotes, tender answers and method statements from your own notes, ready for a person to check before they go out.",
                },
                {
                  title: "Emails and replies",
                  body: "Replies to customers and suppliers drafted in your own tone, so the inbox is less of an evening job.",
                },
                {
                  title: "Reports and write-ups",
                  body: "Rough notes from a site visit or a meeting turned into a report you would be happy to send.",
                },
                {
                  title: "Procedures and forms",
                  body: "Checklists, procedures and standard letters drafted and kept up to date, with a person signing them off.",
                },
                {
                  title: "Numbers and spreadsheets",
                  body: "Plain answers out of the spreadsheets you already keep, without anyone needing to learn formulas.",
                },
                {
                  title: "Rules and research",
                  body: "Grant conditions, regulations and supplier terms summarised in plain English before you read the detail.",
                },
              ].map((card) => (
                <div key={card.title} className="bg-white p-6 rounded-lg border border-border">
                  <h3 className="font-display font-semibold text-lg mb-3">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20" data-testid="section-process">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">
              How it works
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "A call",
                  body: "You tell us who does what in the office and where the hours go. If training will not pay for itself, we will say so on the call.",
                },
                {
                  step: "2",
                  title: "A plan and a price in writing",
                  body: "What the sessions will cover, who will be in them and what it costs, agreed before anything starts.",
                },
                {
                  step: "3",
                  title: "Hands-on sessions on real work",
                  body: "Your team uses the tools on their own jobs, in your office, rather than on practice examples.",
                },
                {
                  step: "4",
                  title: "Kept current",
                  body: "The tools change every few months, so we keep your setup current and point out where a newer tool would take more work off the team. The aim is AI used across the whole office, not sitting with one person.",
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
          </div>
        </div>
      </section>

      {/* Tools and the honest caution */}
      <section className="py-20 bg-slate-50" data-testid="section-tools">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Which AI tools?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Whichever ones suit the work. For most offices that means assistants like Microsoft Copilot, ChatGPT, Google Gemini or Claude, and sometimes one you already have. We are not tied to any of them, and we will tell you when a free version is enough.
            </p>
            <p className="text-lg text-muted-foreground">
              One honest caution. AI gets things wrong, and it does it confidently. So part of every session is knowing what to check before anything goes out with your name on it, and what should never be pasted into an AI tool in the first place.
            </p>
          </div>
        </div>
      </section>

      {/* When a job needs an app */}
      <section className="py-20" data-testid="section-apps">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              When a job needs more than a chat tool
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Some work comes round every week in exactly the same shape, and typing it into a chat tool each time is still work. If we spot a job like that in the sessions, we will tell you, because a small custom app can take it off the team's plate.
            </p>
            <p className="text-lg text-muted-foreground">
              What a build costs and how long it takes is on{" "}
              <Link href="/how-it-works" className="text-primary underline hover:no-underline" data-testid="link-how-it-works">
                the cost and timeline page
              </Link>
              . New to AI altogether? Start with{" "}
              <Link href="/guide/set-up-ai-for-business-ireland" className="text-primary underline hover:no-underline" data-testid="link-guide">
                the plain-English guide to setting up AI
              </Link>
              .
            </p>
          </div>
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
            />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Built on daily use, not a slide deck
            </h2>
            <div className="space-y-4 text-lg">
              <p>
                I'm Pete Harris, the founder of Streamlined Tech. 20+ years in heavy industries and construction, from on the tools to training package production and now building the software.
              </p>
              <p>
                We build with AI every day and run our own software products, AutoListing.io and Rangplan.ie. What we teach is what we use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-900" data-testid="section-final-cta">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
              Find out what your team could hand to AI
            </h2>
            <p className="text-lg text-slate-200 mb-8">
              A short call will tell us both whether training is worth it for your business. If it is not, we will say so.
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
