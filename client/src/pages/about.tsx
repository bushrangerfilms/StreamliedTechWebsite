import { Building2, Car, Map, MapPin } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";
import { IconTile } from "@/components/icon-tile";
import { PersonBlock } from "@/components/person-block";
import { ScreenShot } from "@/components/screen-shot";

// Copy on this page is mirrored word for word in
// client/src/lib/seo-static-html.ts ("/about"). Change both together.
// No consultant is named here. A "dedicated product manager" is mentioned,
// unnamed, in the looked-after step (Pete's round 2 brief, 17 Nov 2026, which
// replaces the earlier "no Product Manager" rule). The testimonial slot on
// this page stays empty until Pete supplies one.

const WHERE = [
  { icon: MapPin, text: "Based in Galway, Ireland." },
  { icon: Map, text: "Working with businesses in Ireland and overseas." },
  { icon: Car, text: "Site visits by arrangement." },
];

export default function About() {
  useSeo(ROUTE_SEO.about);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap st-hero__grid st-hero__grid--shot">
            <div>
              <h1 data-testid="text-hero-headline">About Streamlined Tech</h1>
              <p className="st-lede">
                We build custom apps for trade and service businesses. Your own app, built around how you already work, with everything in one place.
              </p>
            </div>
            <ScreenShot screen="today" eager />
          </div>
        </section>

        <section className="st-section" data-testid="section-pete">
          <div className="st-wrap">
            <PersonBlock />
          </div>
        </section>

        <section className="st-section st-section--tint" data-testid="section-where">
          <div className="st-wrap">
            <h2>Where we are</h2>
            <ul className="st-cards st-cards--3">
              {WHERE.map((item) => (
                <li key={item.text} className="st-card st-card--row">
                  <IconTile icon={item.icon} />
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="st-section" data-testid="section-company">
          <div className="st-wrap">
            <h2>The company</h2>
            <div className="st-cards st-cards--2">
              <div className="st-card st-card--row">
                <IconTile icon={Building2} />
                <p>
                  Streamlined Tech is a trading name of Streamlined Digital Tech Limited, registered in Ireland, company number 805162.
                </p>
              </div>
              <div className="st-card st-card--row">
                <IconTile icon={MapPin} />
                <p>Registered office: Castleblakeney, Ballinasloe, Co. Galway, H53 YA97.</p>
              </div>
            </div>
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
