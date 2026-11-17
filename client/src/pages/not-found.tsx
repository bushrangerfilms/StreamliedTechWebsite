import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  // The host rewrites every unmatched path to index.html with a 200, so this
  // is the only place a soft 404 can be kept out of the index.
  useSeo(ROUTE_SEO.notFound);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page">
          <div className="st-wrap">
            <h1>Page not found</h1>
            <p className="st-lede">
              That page does not exist, or it has moved. <Link href="/">Head back to the home page.</Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
