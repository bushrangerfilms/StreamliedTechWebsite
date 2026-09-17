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
 * Words only on purpose: format (in person or remote), length, group size,
 * price and the shape of the ongoing part were not decided when this page
 * shipped, so nothing here commits to them. The ongoing angle comes from
 * Pete's own 8 Sep 2026 reply to a prospect who had already done AI
 * training: a training day dates fast, so the offer is training on the
 * team's own work, kept current. Any copy change here must update the
 * "/ai-training" mirror in seo-static-html.ts in the same commit.
 */

// Tagged so a training booking can be told apart from an app enquiry in
// Calendly (it stores utm_* on the invitee). The header button stays untagged.
const TRAINING_BOOKING_URL = `${BOOKING_URL}?utm_source=streamlinedai.tech&utm_medium=site&utm_campaign=ai-training`;

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
              Hands-on AI training for you and your team, built around your day-to-day work. The sessions use your own quotes, emails, reports and paperwork, and the training keeps up as the tools change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-hero">
                <a href={TRAINING_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book a free call
                </a>
              </Button>
              <div className="text-sm text-slate-300">
                <p>No hard sell.</p>
                <p>And if you're nearby, we're happy to drop into your office instead.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples first: the payoff before the argument */}
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
                  body: "First drafts of quotes and tender answers from your own notes, ready for a person to check before they go out.",
                },
                {
                  title: "Emails and replies",
                  body: "Replies to customers and suppliers drafted in your own tone, so the inbox is less of an evening job.",
                },
                {
                  title: "Reports and write-ups",
                  body: "Rough notes from a site visit or a meeting turned into a first draft of the report, for you to read over before it goes out.",
                },
                {
                  title: "Procedures and letters",
                  body: "Procedures and standard letters drafted or brought up to date, with a person signing them off.",
                },
                {
                  title: "Numbers and spreadsheets",
                  body: "Questions about the spreadsheets you already keep, asked in plain English, with the answer checked before anyone relies on it.",
                },
                {
                  title: "Rules and research",
                  body: "Regulations and grant conditions summarised in plain words before you read the detail.",
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

      {/* Why ongoing */}
      <section className="py-20" data-testid="section-why">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              As AI advances, so will your team
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Plenty of businesses have already sent someone on an AI course or bought a subscription. That's a good first step.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              The trouble is how fast this space moves. What a team picks up on a training day tends to date quickly, because the tools keep changing under you. And the know-how often ends up sitting with one person instead of the whole team.
            </p>
            <p className="text-lg text-foreground">
              That's why we're not a one-off training shop. We train your team on their own work, then keep their setup current, so what you've put into AI gets used across the business.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-slate-50" data-testid="section-process">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">
              How you start
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "A call",
                  body: "You tell us where the hours go and what AI training anyone has done already, so the sessions start from there. If training won't pay for itself, we'll say so on the call.",
                },
                {
                  step: "2",
                  title: "A price in writing",
                  body: "What the sessions will cover and what they cost, agreed before anything starts.",
                },
                {
                  step: "3",
                  title: "Hands-on sessions on real work",
                  body: "Your team practises with the tools on jobs from their own week.",
                },
                {
                  step: "4",
                  title: "Kept current",
                  body: "The tools change every few months. We keep your setup current as they do, and point out where a newer tool would take more work off the team. The aim is AI the whole team keeps using, in the office and out on jobs.",
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
      <section className="py-20" data-testid="section-tools">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Which AI tools?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Whichever ones suit the work. For most offices that means an assistant like ChatGPT or Claude, or the Copilot or Gemini that may already come with your Microsoft 365 or Google Workspace. We'll tell you when a free version is enough.
            </p>
            <p className="text-lg text-muted-foreground">
              One honest caution. AI gets things wrong, and it does it confidently. So the training covers what to check before anything goes out with your name on it, and what should never be pasted into an AI tool in the first place.
            </p>
          </div>
        </div>
      </section>

      {/* When a job needs an app */}
      <section className="py-20 bg-slate-50" data-testid="section-apps">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              When a job needs more than a chat tool
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Some jobs come round every week in exactly the same shape, and typing them into a chat tool each time is still work. If we spot one like that in the sessions, we'll tell you, because that's the kind of job a custom internal app takes off the team's plate. Those apps are the main thing we build.
            </p>
            <p className="text-lg text-muted-foreground">
              What a build costs and how long it takes is on{" "}
              <Link href="/how-it-works" className="text-primary underline hover:no-underline" data-testid="link-how-it-works">
                the cost and timeline page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Founder. Darker than the sitewide bg-primary band on purpose: white
          body text on --primary is 3.6:1, under WCAG AA for text this size. */}
      <section className="py-20 bg-[hsl(217_91%_45%)] text-white" data-testid="section-founder">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src="/images/pete-harris.jpg"
              alt="Pete Harris, founder of Streamlined Tech"
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover ring-4 ring-white/30 shadow-lg mx-auto mb-8"
            />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Built on daily use
            </h2>
            <div className="space-y-4 text-lg">
              <p>
                I'm Pete Harris, the founder of Streamlined Tech. 20+ years in heavy industries and construction, from on the tools to training package production and now building the software.
              </p>
              <p>
                We build with AI every day and run our own software products, AutoListing.io and Rangplan.ie. The training comes out of that daily use.
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
              Tell us where the hours are going
            </h2>
            <p className="text-lg text-slate-200 mb-8">
              A free call lets us both see whether training is worth it for your business. If it isn't, we'll say so.
            </p>
            <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-final">
              <a href={TRAINING_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a free call
              </a>
            </Button>
            <p className="text-sm text-slate-300 mt-6">
              Not ready for a call? Email{" "}
              <a href="mailto:peter@streamlinedai.tech" className="underline hover:no-underline" data-testid="link-email">
                peter@streamlinedai.tech
              </a>
              , or start with{" "}
              <Link href="/guide/set-up-ai-for-business-ireland" className="underline hover:no-underline" data-testid="link-guide">
                the plain-English guide to setting up AI
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
