import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "wouter";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader, BOOKING_URL } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function GuideSetUpAi() {
  usePageTracking();

  useSeo(ROUTE_SEO.guideSetUpAi);

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
              How to set up AI for your business
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
              A plain-English guide for Irish businesses that want to set up AI. What it actually means, what it costs, who runs it, and where to start.
              <br /><br />
              There is no jargon in it, and no chatbot waiting at the end.
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

      {/* What it means */}
      <section className="py-20" data-testid="section-what-it-means">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              What set up AI actually means for a small business
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              It does not mean hiring a data scientist, and for most businesses it does not mean a chatbot on the website. For an Irish SMB it means two things, and they work best together.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              The first is software. The repetitive admin that eats the week, the chasing, the reminders, the rekeying, the reporting, gets handed to a small custom app built around how you already work. It runs those jobs in the background so nobody has to remember them.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              The second is your people. Your staff learn to use AI in their own day to day work, so the gains do not stop at the app. A team that knows what AI is good at keeps finding new places to use it.
            </p>
            <p className="text-xl text-foreground font-display font-semibold">
              That is the whole offer. We set up businesses with AI.
            </p>
          </div>
        </div>
      </section>

      {/* Without hiring */}
      <section className="py-20 bg-slate-50" data-testid="section-no-hiring">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              How do I add AI to my business without hiring anyone?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              This is the question most owners are really asking, because the last thing a busy business needs is new software that needs a new person to run it.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              The answer is to start with one job, not a transformation. Pick a single repetitive task, hand it to a small app, and change nothing else. Nobody's role changes on day one, and there is nothing new to staff. The point is the opposite of hiring. The same team gets through more work, so growth stops depending on finding the next person.
            </p>
            <p className="text-lg text-muted-foreground">
              You can get some of the way with off-the-shelf tools, and for a simple job that can be enough. Where a custom app earns its keep is when your own way of doing things needs to be baked in, or when the job has to keep running without anyone in the office minding it.
            </p>
          </div>
        </div>
      </section>

      {/* Cost */}
      <section className="py-20" data-testid="section-cost">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              How much does AI cost for a small business in Ireland?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              The teaching side can cost very little. Most of the AI tools your staff would use day to day are cheap or free, and the skill is in knowing what to hand them, which is something we build into the work rather than sell as a separate course.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              The software side has a public price list. A first custom build is a fixed price from €3,900, agreed in writing before anything starts, and it is usually working end to end inside two weeks. A bigger piece across a few connected jobs runs €6,500 to €9,500. A full review of the whole operation is priced after the review.
            </p>
            <p className="text-lg text-muted-foreground">
              The longer answer on pricing and timelines, including how the fixed price works, is on{" "}
              <Link href="/how-it-works" className="text-primary underline hover:no-underline" data-testid="link-how-it-works">
                the cost and timeline page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Who runs it */}
      <section className="py-20 bg-slate-50" data-testid="section-who-runs-it">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Do you need someone to run it?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              No. That is the test of whether it was set up properly. The reminders send themselves and the reports write themselves. Your team just works from the screens, and if a system needs minding, it has only moved the admin around rather than removed it.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              We maintain and extend the app as your operation changes, so the technical side stays off your desk. And because we encourage your staff to pick up AI themselves along the way, you are not left dependent on us for every small thing either.
            </p>
            <p className="text-lg text-muted-foreground">
              One honest caution, though. AI does not run your business. It runs the repetitive parts, and it does that very well. The decisions stay with you.
            </p>
          </div>
        </div>
      </section>

      {/* First job */}
      <section className="py-20" data-testid="section-first-job">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
              Picking the first job to hand to AI
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
              Look at where the hours actually go in a normal week. A good first job is one that happens every week and follows the same steps every time. The usual candidates in an Irish SMB:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Chasing quotes and invoices",
                  body: "Quotes followed up after you send them. Invoices chased politely until they are paid.",
                },
                {
                  title: "Bookings and reminders",
                  body: "Jobs and appointments that write straight into the diary, with reminders that reduce no-shows.",
                },
                {
                  title: "Renewals and expiry dates",
                  body: "Insurance, certs, NCT, CVRT, service-due dates. Reminders go out on time, every time.",
                },
                {
                  title: "Rekeying orders and details",
                  body: "Orders and new client details captured once and landing in a list your team works from.",
                },
                {
                  title: "Follow-ups that get forgotten",
                  body: "The enquiry from last Tuesday, the customer to call back. Followed up without anyone chasing.",
                },
                {
                  title: "The week's numbers",
                  body: "One screen with the numbers that matter, updated automatically. No Sunday night spreadsheet.",
                },
              ].map((card) => (
                <div key={card.title} className="bg-white p-6 rounded-lg border border-border">
                  <h3 className="font-display font-semibold text-lg mb-3">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.body}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-lg text-muted-foreground mt-10 max-w-2xl mx-auto">
              If one of those made you wince, that is probably your first job. Fix it and judge the result. Only then decide whether to hand over the next one.
            </p>
          </div>
        </div>
      </section>

      {/* Instead of a chatbot */}
      <section className="py-20 bg-slate-50" data-testid="section-not-a-chatbot">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              What Streamlined Tech builds instead of a chatbot
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              A chatbot is the demo everyone leads with, and there is a place for one. But an assistant is only as good as the information behind it, so it works best on top of systems that already hold good data. For most businesses the bigger win comes first, and it is the boring, repetitive admin handled by a custom internal app.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              That is what we specialise in. A small app, built around how your business already works, that takes a real job off a real person's plate. It can start as one screen for one job and grow from there. Your internal app can become the central hub of all operations.
            </p>
            <p className="text-lg text-muted-foreground">
              I'm Pete Harris, the founder and the builder, based in Galway. What we build and what it costs is all on{" "}
              <Link href="/business" className="text-primary underline hover:no-underline" data-testid="link-business">
                the services page
              </Link>
              .
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

      {/* Final CTA */}
      <section className="py-20 bg-slate-900" data-testid="section-final-cta">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
              Not sure where AI fits in your business?
            </h2>
            <p className="text-lg text-slate-200 mb-8">
              Tell me how a normal week runs and I will tell you where I would start. Fifteen minutes on the phone, and if AI is not worth your money yet, I will say so.
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
