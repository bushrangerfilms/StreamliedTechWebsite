import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";

// Distinct route (not an inline state) so form completions show up in
// page tracking without any extra analytics wiring.
export default function DetailsThanks() {
  usePageTracking();

  useSeo({
    title: "On its way | Streamlined Tech",
    description: "Thanks for getting in touch with Streamlined Tech.",
    canonical: "/details/thanks",
    noindex: true,
  });

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
              On its way.
            </h1>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-4">
              The rundown's headed to your inbox now, it should land in the next couple of minutes. Can't find it? Check spam once, then drag it into your main inbox so the next one doesn't get lost.
            </p>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed">
              When it lands, replies come straight to me, so if you've got a question just hit reply.
            </p>
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
