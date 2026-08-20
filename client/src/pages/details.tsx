import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";

// Single-purpose capture page reached from "Comment AI" replies on the
// Mining Boom video. No site nav, no footer links, no competing CTAs:
// the form is the page's one job.
export default function Details() {
  usePageTracking();
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  // Honeypot: real visitors never see or fill this field.
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});

  // Campaign-only landing page: reachable from the comment link, kept out of
  // search results so it never competes with the homepage.
  useSeo(ROUTE_SEO.details);

  useEffect(() => {
    // Persist the ?src= platform tag before anything else can navigate.
    const src = new URLSearchParams(window.location.search).get("src");
    if (src) {
      sessionStorage.setItem("details-src", src.slice(0, 60));
    }
  }, []);

  const validate = () => {
    const errors: { name?: string; email?: string } = {};
    if (name.trim().length < 2) {
      errors.name = "Your name helps me address you properly.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "That email doesn't look right.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/details-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || null,
          source: sessionStorage.getItem("details-src") || null,
          website,
        }),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      // The API captures the lead even if the email send fails; the thanks
      // page adjusts its promise so nobody is told a mail is coming when it
      // is not.
      const data = (await res.json().catch(() => ({}))) as { emailSent?: boolean; leadId?: string | null };
      if (data.leadId) sessionStorage.setItem("details-lead-id", data.leadId);
      navigate(data.emailSent === false ? "/details/thanks?email=pending" : "/details/thanks");
    } catch {
      setError("Something went wrong sending that. Give it another try, or email me directly at");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero band */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-6 pt-6 pb-8 md:pt-8 md:pb-16">
          <div className="inline-block bg-white rounded-lg px-3 py-2 mb-6 md:mb-10">
            <img
              src="/images/logo.webp"
              alt="Streamlined Tech"
              className="h-10 w-auto"
              width="133"
              height="40"
            />
          </div>
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-4 py-1.5 bg-white/10 text-slate-200 rounded-full text-sm font-medium mb-5" data-testid="badge-context">
              From the Handy video
            </div>
            <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-4 leading-tight" data-testid="text-details-headline">
              Here's what we actually build for mining and construction crews.
            </h1>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed">
              Internal apps, automated workflows and AI where it earns its place. Leave your name and email and we'll put together a rundown of what that could look like for an operation like yours.
            </p>
          </div>
        </div>
      </section>

      {/* Form card */}
      <section className="container mx-auto px-6 -mt-0 py-10">
        <div className="max-w-2xl mx-auto bg-white rounded-xl border border-border shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit} noValidate data-testid="form-details">
            <div className="space-y-5">
              <div>
                <Label htmlFor="details-name" className="mb-2 block">Your name</Label>
                <Input
                  id="details-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="text-base h-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="input-name"
                />
                {fieldErrors.name && <p className="text-sm text-destructive mt-1">{fieldErrors.name}</p>}
              </div>
              <div>
                <Label htmlFor="details-email" className="mb-2 block">Email</Label>
                <Input
                  id="details-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className="text-base h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-email"
                />
                {fieldErrors.email && <p className="text-sm text-destructive mt-1">{fieldErrors.email}</p>}
              </div>
              <div>
                <Label htmlFor="details-company" className="mb-2 block">Company name (optional)</Label>
                <Input
                  id="details-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className="text-base h-12"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  data-testid="input-company"
                />
              </div>
              {/* Honeypot, hidden from real visitors */}
              <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                <label htmlFor="details-website">Website</label>
                <input
                  id="details-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-sm text-destructive" data-testid="text-submit-error">
                  {error}{" "}
                  <a href="mailto:peter@streamlinedai.tech" className="underline hover:no-underline">peter@streamlinedai.tech</a>
                </p>
              )}
              <Button
                type="submit"
                size="lg"
                className="w-full text-base py-6"
                disabled={submitting}
                data-testid="button-send-rundown"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2"><Spinner className="size-4" /> Sending...</span>
                ) : (
                  "Send me the rundown"
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                One email, no spam.{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Founder trust block */}
      <section className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto flex items-start gap-5">
          <img
            src="/images/pete-harris.jpg"
            alt="Pete Harris, founder of Streamlined Tech"
            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
            width="80"
            height="80"
            loading="lazy"
          />
          <p className="text-muted-foreground leading-relaxed">
            I'm Pete Harris. 20+ years in heavy industries and construction, from on the tools to training package production and now building the software. Streamlined Tech is me, not an agency, so you'd be dealing with the person who actually builds it.
          </p>
        </div>
      </section>

      {/* Handy reframe */}
      <section className="container mx-auto px-6 pb-12">
        <div className="max-w-2xl mx-auto bg-slate-50 rounded-xl p-6">
          <p className="text-muted-foreground leading-relaxed">
            Handy's a bit of fun, and an assistant like that is one thing we can build. It's a small part of the picture though. Most of the value is in the systems underneath: internal apps built around how your site actually runs, workflows that move themselves along without someone chasing, and AI put to work wherever it genuinely helps. Every part of an operation has admin that can be streamlined, big outfit or small.
          </p>
        </div>
      </section>

      {/* Minimal footer, no exits beyond privacy */}
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
