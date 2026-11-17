import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";

// Copy on this page is mirrored word for word in
// client/src/lib/seo-static-html.ts ("/about"). Change both together.
// No consultant is named here and no Product Manager is mentioned (Pete,
// 17 Nov 2026). The testimonial slot on this page stays empty until Pete
// supplies one.

export default function About() {
  useSeo(ROUTE_SEO.about);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">About Streamlined Tech</h1>
            <p className="st-lede">
              We build custom apps for Irish trade and service businesses. Your own app, built around how you already work, with everything in one place.
            </p>
          </div>
        </section>

        <section className="st-section" data-testid="section-pete">
          <div className="st-wrap">
            <div className="st-person">
              <img src="/images/pete-harris.jpg" alt="Pete Harris" width="640" height="640" />
              <div className="st-narrow">
                <h2>Who you'll deal with</h2>
                <p>
                  I'm Pete Harris. I build the apps. I spent over 20 years in heavy industry and construction before this, so I know what a job sheet in a van looks like.
                </p>
                <p>
                  Until you go ahead, one of our team follows up for me by phone. Once you go ahead I build it and see it through. After that you have support from real people, and every app has a Feedback button: tell us what is not right and we change it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="st-section" data-testid="section-where">
          <div className="st-wrap st-narrow">
            <h2>Where we are</h2>
            <p>Based in Galway. Working with businesses across Ireland. Site visits by arrangement.</p>
          </div>
        </section>

        <section className="st-section" data-testid="section-company">
          <div className="st-wrap st-narrow">
            <h2>The company</h2>
            <p>
              Streamlined Tech is a trading name of Streamlined Digital Tech Limited, registered in Ireland, company number 805162. Registered office: Castleblakeney, Ballinasloe, Co. Galway, H53 YA97.
            </p>
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
