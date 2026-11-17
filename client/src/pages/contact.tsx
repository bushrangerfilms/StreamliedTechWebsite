import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AskForCallForm } from "@/components/ask-for-call-form";

// Copy on this page is mirrored word for word in
// client/src/lib/seo-static-html.ts ("/contact"). Change both together.
// The site's contact details are this form and the email address only: no
// phone number and no booking link (Pete, 17 Nov 2026). This page has no
// closing call block because the form is the call button here.

export default function Contact() {
  useSeo(ROUTE_SEO.contact);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">Ask for a call</h1>
            <p className="st-lede">
              Tell us how you run things. We'll ring you for 10 to 15 minutes. If an app wouldn't help your business, we'll tell you.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-form">
          <div className="st-wrap">
            <AskForCallForm />
          </div>
        </section>

        <section className="st-section" data-testid="section-email">
          <div className="st-wrap st-narrow">
            <h2>Or email us</h2>
            <p>
              <a href="mailto:peter@streamlinedai.tech" data-testid="link-email">
                peter@streamlinedai.tech
              </a>
            </p>
            <p>Based in Galway. Working with businesses across Ireland. Site visits by arrangement.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
