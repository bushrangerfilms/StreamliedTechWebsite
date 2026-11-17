import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";
import { ClientLogo } from "@/components/testimonial";

// Copy on this page is mirrored word for word in
// client/src/lib/seo-static-html.ts ("/our-work"). Change both together.
//
// Rules for this page (Pete, 17 Nov 2026): only IPM Enviro and Komplete
// Engineers are named. Logos, never links to a client's website. No
// screenshots of client apps and no demo or "try one" links. The testimonial
// slot under each card stays empty, and renders nothing, until Pete says a
// quote may be reused here.

export default function OurWork() {
  useSeo(ROUTE_SEO.ourWork);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">Our work</h1>
            <p className="st-lede">Two of the apps we have built, and what each one does.</p>
          </div>
        </section>

        <section className="st-section" data-testid="section-clients">
          <div className="st-wrap">
            <div className="st-clients">
              <div className="st-client" data-testid="card-client-ipm">
                <ClientLogo client="ipm" />
                <h2>IPM Enviro</h2>
                <p>
                  The technician scans each numbered unit on an iPad and logs what they found, and the visit report writes itself.
                </p>
              </div>
              <div className="st-client" data-testid="card-client-komplete">
                <ClientLogo client="komplete" />
                <h2>Komplete Engineers</h2>
                <p>
                  Quotes that chase themselves, a new project set up in one tap, and every live project at a glance.
                </p>
              </div>
            </div>
            <p className="st-small" style={{ marginTop: "2.5rem" }}>
              We only name clients who have said we can. Their apps are their own, so we don't show screenshots of them here.
            </p>
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
