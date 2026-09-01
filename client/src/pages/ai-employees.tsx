import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "wouter";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader, BOOKING_URL } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Campaign landing page for the "AI Employees from €15K/year" ad. Noindex on
// purpose: it exists to match the ad's message, not to rank, and the trend
// term stays quarantined here so it can be retired with one edit. The root
// hero carries a one-line bridge to it for people who type the domain
// instead of clicking the ad.
export default function AiEmployees() {
  usePageTracking();
  useSeo(ROUTE_SEO.aiEmployees);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [about, setAbout] = useState("");
  // Honeypot: real visitors never see or fill this field.
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    // Persist the ?src= campaign tag before anything else can navigate.
    const src = new URLSearchParams(window.location.search).get("src");
    if (src) {
      sessionStorage.setItem("ai-employees-src", src.slice(0, 60));
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
          about: about.trim() || null,
          source: sessionStorage.getItem("ai-employees-src") || "ai-employees",
          variant: "quote",
          website,
        }),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending that. Give it another try, or email me directly at");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero, message-matched to the ad */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-amber-400 mb-4 uppercase">
              For businesses in Ireland
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight" data-testid="text-hero-headline">
              AI Employees from €15K a year
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
              An AI employee here is a system we build that does one named job in your business and keeps doing it. Answering enquiries and writing bookings into the diary. Chasing quotes and invoices. Tracking jobs and writing up the reports. Full custom set-up for your business, by us, not from a template.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-hero">
                <a href="#quote">Get a quote</a>
              </Button>
              <div className="text-sm text-slate-300 sm:self-center">
                Prefer to talk?{" "}
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline text-slate-200">
                  Book a free call.
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The three promises, defined honestly */}
      <section className="py-16" data-testid="section-promises">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-lg border border-border">
              <h2 className="text-xl font-display font-bold mb-3">Works 24/7</h2>
              <p className="text-muted-foreground leading-relaxed">
                The system does not clock off. An enquiry that arrives at ten on a Sunday night is answered at ten on a Sunday night, and it is logged where you'll see it Monday morning.
              </p>
            </div>
            <div className="bg-white p-7 rounded-lg border border-border">
              <h2 className="text-xl font-display font-bold mb-3">Full human support</h2>
              <p className="text-muted-foreground leading-relaxed">
                A real person built it and a real person looks after it. When something needs changing, you contact me and it gets changed. Support hours and response times are agreed in writing as part of the set-up.
              </p>
            </div>
            <div className="bg-white p-7 rounded-lg border border-border">
              <h2 className="text-xl font-display font-bold mb-3">From €15K a year</h2>
              <p className="text-muted-foreground leading-relaxed">
                That covers the full custom set-up of one AI employee doing one defined job, and the support to keep it running for the year. Priced for businesses in Ireland, and the exact figure is agreed in writing before anything starts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="py-16 bg-slate-50" data-testid="section-quote">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">Get a quote</h2>
            <p className="text-muted-foreground text-center mb-8">
              Tell me the job you'd hand over first and I'll come back with a figure and how it would work in your business.
            </p>
            <div className="bg-white rounded-xl border border-border shadow-md p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-8" data-testid="text-quote-thanks">
                  <h3 className="text-2xl font-display font-bold mb-3">Got it.</h3>
                  <p className="text-muted-foreground">
                    Your details are in and I'll come back to you with a quote. If you'd rather not wait,{" "}
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                      book a call
                    </a>{" "}
                    and we'll talk it through.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate data-testid="form-quote">
                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="quote-name" className="mb-2 block">Your name</Label>
                      <Input
                        id="quote-name"
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
                      <Label htmlFor="quote-email" className="mb-2 block">Email</Label>
                      <Input
                        id="quote-email"
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
                      <Label htmlFor="quote-company" className="mb-2 block">Company name (optional)</Label>
                      <Input
                        id="quote-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        className="text-base h-12"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        data-testid="input-company"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quote-about" className="mb-2 block">What job would you hand over first? (optional)</Label>
                      <textarea
                        id="quote-about"
                        name="about"
                        rows={3}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="A line or two about the business and the job that eats the most time. It makes the quote a lot more useful."
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        data-testid="input-about"
                      />
                    </div>
                    {/* Honeypot, hidden from real visitors */}
                    <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                      <label htmlFor="quote-website">Website</label>
                      <input
                        id="quote-website"
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
                      data-testid="button-get-quote"
                    >
                      {submitting ? (
                        <span className="inline-flex items-center gap-2"><Spinner className="size-4" /> Sending...</span>
                      ) : (
                        "Get a quote"
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      One reply, no spam.{" "}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="py-16" data-testid="section-proof">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
              Built by someone who builds for a living
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  src: "/images/app-scheduling.webp",
                  alt: "Scheduling and calendar management",
                  caption: "Bookings and jobs that write themselves into the diary.",
                  width: 1200,
                  height: 779,
                },
                {
                  src: "/images/app-analytics.webp",
                  alt: "Analytics and reporting dashboard",
                  caption: "The week's numbers on one screen, updated automatically.",
                  width: 1200,
                  height: 723,
                },
                {
                  src: "/images/app-intake.webp",
                  alt: "Order and client intake without rekeying",
                  caption: "Orders and new client details captured once, typed never.",
                  width: 1200,
                  height: 928,
                },
              ].map((shot) => (
                <div key={shot.src} className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
                  <img src={shot.src} alt={shot.alt} className="w-full h-auto" width={shot.width} height={shot.height} loading="lazy" />
                  <p className="text-sm text-muted-foreground p-4">{shot.caption}</p>
                </div>
              ))}
            </div>
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
                I'm Pete Harris. 20+ years in heavy industries and construction, from on the tools to training package production and now building the software. We also build and run our own products, AutoListing.io and Rangplan.ie, with customers, billing and uptime to keep. Streamlined Tech is me, not an agency, so you'd be dealing with the person who actually builds it.
              </p>
            </div>
            <p className="text-center text-muted-foreground mt-10">
              The full cost and timeline picture, including the smaller one-off builds, is on{" "}
              <Link href="/how-it-works" className="text-primary underline hover:no-underline" data-testid="link-how-it-works">
                the how it works page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
