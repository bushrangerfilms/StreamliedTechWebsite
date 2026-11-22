import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";
import { CLIENTS, ClientLogo, Testimonial } from "@/components/testimonial";

// Copy on this page is mirrored word for word in
// client/src/lib/seo-static-html.ts ("/reviews"). Change both together.
//
// Rules (Pete, 17 Nov 2026, and the brief website-ai-ready-1122): only the
// two approved testimonials, word for word from client/src/components/
// testimonial.tsx. Only IPM Enviro and Komplete Engineers are named. Logos,
// never links to a client's website. No star ratings, no Review or
// AggregateRating schema, no summary of what "customers say". The empty slots
// stay empty, with no names or stars, until Pete supplies a real quote and
// permission.

const EMPTY_SLOTS = ["empty-1", "empty-2"];

export default function Reviews() {
  useSeo(ROUTE_SEO.reviews);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">What our customers say</h1>
            <p className="st-lede">
              A few words from businesses we have built for. We only name the ones who have said we can.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-reviews">
          <div className="st-wrap">
            <div className="st-clients st-clients--rows">
              <div className="st-client" data-testid="card-client-ipm">
                <div>
                  <ClientLogo client="ipm" />
                  <h2>{CLIENTS.ipm.name}</h2>
                </div>
                <Testimonial quote="ipmMain" />
              </div>
              <div className="st-client" data-testid="card-client-komplete">
                <div>
                  <ClientLogo client="komplete" />
                  <h2>{CLIENTS.komplete.name}</h2>
                </div>
                <Testimonial quote="kompleteMain" />
              </div>
              {EMPTY_SLOTS.map((slot) => (
                <div key={slot} className="st-client st-client--empty" data-testid={`slot-review-${slot}`}>
                  <p>A future customer's words will go here.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
