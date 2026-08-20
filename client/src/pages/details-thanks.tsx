import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

  const bookingUrl = "https://calendly.com/streamlinedaitech/discover-how-we-can-automate-simplify-your-workflows";
  const leadId = typeof window !== "undefined" ? sessionStorage.getItem("details-lead-id") : null;
  const aboutAlreadyGiven =
    typeof window !== "undefined" && sessionStorage.getItem("details-about-done") === "1";
  const [about, setAbout] = useState("");
  const [aboutState, setAboutState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const sendAbout = async () => {
    if (!leadId || about.trim().length < 3 || aboutState === "sending") return;
    setAboutState("sending");
    try {
      const res = await fetch("/api/details-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, about: about.trim() }),
      });
      if (!res.ok) throw new Error("failed");
      setAboutState("sent");
    } catch {
      setAboutState("error");
    }
  };

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
              Got your details.
            </h1>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-4">
              {emailPending
                ? "Thanks. We'll be in touch soon with a rundown put together for your operation."
                : "A quick confirmation is on its way to your inbox, and we'll be in touch soon with a rundown put together for your operation."}
            </p>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed">
              There's more on the site if you want a look in the meantime:{" "}
              <a href="https://streamlinedai.tech?src=details-thanks" className="underline hover:no-underline">streamlinedai.tech</a>. Questions? Email{" "}
              <a href="mailto:peter@streamlinedai.tech" className="underline hover:no-underline">peter@streamlinedai.tech</a>.
            </p>
          </div>

          {leadId && !aboutAlreadyGiven && (
            <div className="max-w-2xl mt-10 bg-white/10 rounded-xl p-5" data-testid="card-business-about">
              <h2 className="text-lg font-display font-semibold text-white mb-2">
                Make the rundown sharper
              </h2>
              {aboutState === "sent" ? (
                <p className="text-slate-200">
                  Got it, thanks. That goes straight to Pete.
                </p>
              ) : (
                <>
                  <p className="text-sm text-slate-300 mb-3">
                    A line or two on what your business does and what's eating the most time. The more specific, the more useful the rundown.
                  </p>
                  <Textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows={3}
                    className="bg-white text-foreground mb-3"
                    placeholder="e.g. Civil contractor, 25 crew. Timesheets and plant prestarts are all on paper."
                  />
                  <Button onClick={sendAbout} disabled={aboutState === "sending" || about.trim().length < 3}>
                    {aboutState === "sending" ? "Sending..." : "Send to Pete"}
                  </Button>
                  {aboutState === "error" && (
                    <p className="text-sm text-red-300 mt-2">That didn't send. Try again, or just reply to the confirmation email.</p>
                  )}
                </>
              )}
            </div>
          )}

          <div className="max-w-2xl mt-8">
            <p className="text-base text-slate-200 mb-3">
              Rather talk it through? Book a discovery call and we'll look at your operation together.
            </p>
            <Button asChild variant="secondary">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                Book a discovery call
              </a>
            </Button>
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
