import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader, BOOKING_URL } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Evidence page, not a sales page for either product. Its job is to prove
// the company builds, sells and keeps software running, which is the
// strongest answer to "can these people actually deliver".
export default function Products() {
  usePageTracking();
  useSeo(ROUTE_SEO.products);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="relative z-10 container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight" data-testid="text-hero-headline">
              Software we build and run
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              Custom apps for clients are one half of the work. The other half is our own products, live and paid for, with customers, billing and uptime to keep. They are the proof behind the client work.
            </p>
          </div>
        </div>
      </section>

      {/* AutoListing */}
      <section className="py-20" data-testid="section-autolisting">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">AutoListing.io</h2>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                AutoListing takes a property listing and turns it into ready-to-post social content for the agent, scheduled out on autopilot. An agent adds the listing once and the posts, images and videos for it are generated and lined up without anyone sitting down to make them.
              </p>
              <p>
                It is a paid subscription product for estate and letting agents, priced at €115 a month in Ireland, £100 in the UK and $130 a month in the US. Real customers, real billing, real uptime to keep.
              </p>
              <p>
                <a
                  href="https://autolisting.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:no-underline font-semibold"
                  data-testid="link-autolisting"
                >
                  autolisting.io
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rangplan */}
      <section className="py-20 bg-slate-50" data-testid="section-rangplan">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Rangplan.ie</h2>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                Rang is a planning app for Irish primary school teachers. Fortnightly plans, long term plans and the monthly report, structured the way Irish schools actually plan, so the paperwork side of teaching takes less of the evening.
              </p>
              <p>
                Built alongside practising teachers and live at{" "}
                <a
                  href="https://rangplan.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:no-underline font-semibold"
                  data-testid="link-rangplan"
                >
                  rangplan.ie
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters to a client */}
      <section className="py-20" data-testid="section-why">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Why this matters if you're hiring us
            </h2>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                Anyone can show a demo. A product with paying customers is different: it has to work every day, handle its own billing, and keep improving or people leave. That discipline is what carries over into the systems we build for clients.
              </p>
              <p>
                The same person who builds and runs these builds yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900" data-testid="section-final-cta">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
              Want something like this inside your business?
            </h2>
            <p className="text-lg text-slate-200 mb-8">
              The custom builds start from one workflow. Cost and timeline are on{" "}
              <Link href="/how-it-works" className="underline hover:no-underline text-white" data-testid="link-how-it-works">
                the how it works page
              </Link>
              .
            </p>
            <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-final">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a free call
              </a>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
