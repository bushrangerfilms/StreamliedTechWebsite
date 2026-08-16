import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";

// Distinct route (not an inline state) so form completions show up in
// page tracking without any extra analytics wiring.
export default function DetailsThanks() {
  usePageTracking();

  useSeo(ROUTE_SEO.detailsThanks);

  // Set by the form when the API saved the lead but could not send the email,
  // so the page never promises a mail that is not coming.
  const emailPending =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).get("email") === "pending";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex-1">
        <div className="container mx-auto px-6 pt-8 pb-16">
          <div className="inline-block bg-white rounded-lg px-3 py-2 mb-14">
            <img
              src="/images/logo.webp"
              alt="Streamlined Tech"
              className="h-10 w-auto"
              width="133"
              height="40"
            />
          </div>
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-5" data-testid="text-thanks-headline">
              {emailPending ? "Got your details." : "On its way."}
            </h1>
            {emailPending ? (
              <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-4">
                Thanks. The rundown didn't go out automatically just now, so I'll send it across myself. If nothing lands within the hour, email me at{" "}
                <a href="mailto:peter@streamlinedai.tech" className="underline hover:no-underline">peter@streamlinedai.tech</a>.
              </p>
            ) : (
              <>
                <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-4">
                  The rundown is on its way to your inbox. Can't find it? Check spam once, then drag it into your main inbox so the next one doesn't get lost.
                </p>
                <p className="text-base md:text-lg text-slate-200 leading-relaxed">
                  Replies come straight to me, so if you've got a question just hit reply. If it hasn't turned up at all, email{" "}
                  <a href="mailto:peter@streamlinedai.tech" className="underline hover:no-underline">peter@streamlinedai.tech</a>{" "}
                  and I'll send it across.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
      <footer className="border-t border-border py-6">
        <p className="text-center text-sm text-muted-foreground">
          Streamlined Tech ·{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
            Privacy Policy
          </a>
        </p>
      </footer>
    </div>
  );
}
