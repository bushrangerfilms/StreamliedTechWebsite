import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "wouter";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO, type RouteSeo } from "@/lib/seo-routes";
import { SiteHeader, BOOKING_URL } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import NotFound from "@/pages/not-found";
import AdConsentBanner from "@/components/ad-consent-banner";
import {
  countEvent,
  getAdConsent,
  getAdConsentRecord,
  readAdAttribution,
  trackAdContact,
  trackAdLead,
} from "@/lib/ad-consent";

// Campaign landing pages for the "AI Employees" ads, one URL per region so
// each ad geo gets its own currency and wording (/ai-employees/ie today,
// /ai-employees/au etc. when those campaigns exist). Noindex on purpose:
// they exist to match the ad's message, not to rank, and the trend term
// stays quarantined here. Adding a region: add a REGIONS entry, a ROUTE_SEO
// entry, a vercel.json rewrite, a checks.json noindex/page_sources entry,
// and a region og-card image.
//
// Voice rule (Pete, 1 Sep): never present Streamlined Tech as one person.
// Company copy says "we"; the founder appears as the founder.
interface RegionConfig {
  seo: RouteSeo;
  eyebrow: string;
  heroHeadline: string;
  priceHeading: string;
  priceBody: string;
  /** Arithmetic on the published price, e.g. "That is about €580 a fortnight." */
  fortnightlyLine: string;
  /** The worst-case exit cost, derived from the published price. */
  exposureLine: string;
  /** Optional extra line under the hero CTAs (e.g. call-hours note). */
  heroNote?: string;
  /** Default lead source tag when no ?src= arrives with the click. */
  source: string;
}

const REGIONS: Record<string, RegionConfig> = {
  ie: {
    seo: ROUTE_SEO.aiEmployeesIe,
    eyebrow: "For businesses in Ireland",
    heroHeadline: "AI Employees from €15K a year",
    priceHeading: "From €15K a year",
    priceBody:
      "That covers the full custom set-up of one AI employee doing one defined job, and the support to keep it running for the year, paid fortnightly. Priced for businesses in Ireland, and the exact figure is agreed in writing before anything starts.",
    fortnightlyLine: "That is about €580 a fortnight.",
    exposureLine: "At €15K a year, a fair one-month test costs under €1,900.",
    source: "ai-employees-ie",
  },
  // AU, UK and US anchors are €15K converted at rounded market rates. A
  // price change here must also change the matching ROUTE_SEO entry in
  // seo-routes.ts, the fortnightly and exposure arithmetic, and that
  // region's og card and square ad image.
  au: {
    seo: ROUTE_SEO.aiEmployeesAu,
    eyebrow: "For businesses in Australia",
    heroHeadline: "AI Employees from AU$25K a year",
    priceHeading: "From AU$25K a year",
    priceBody:
      "That covers the full custom set-up of one AI employee doing one defined job, and the support to keep it running for the year, paid fortnightly. Priced for businesses in Australia, and the exact figure is agreed in writing before anything starts.",
    fortnightlyLine: "That is about AU$960 a fortnight.",
    exposureLine: "At AU$25K a year, a fair one-month test costs under AU$3,100.",
    heroNote: "Calls booked to suit Australian hours.",
    source: "ai-employees-au",
  },
  uk: {
    seo: ROUTE_SEO.aiEmployeesUk,
    eyebrow: "For businesses in the UK",
    heroHeadline: "AI Employees from £13K a year",
    priceHeading: "From £13K a year",
    priceBody:
      "That covers the full custom set-up of one AI employee doing one defined job, and the support to keep it running for the year, paid fortnightly. Priced for businesses in the UK, and the exact figure is agreed in writing before anything starts.",
    fortnightlyLine: "That is £500 a fortnight.",
    exposureLine: "At £13K a year, a fair one-month test costs under £1,600.",
    source: "ai-employees-uk",
  },
  us: {
    seo: ROUTE_SEO.aiEmployeesUs,
    eyebrow: "For businesses in the United States",
    heroHeadline: "AI Employees from $17K a year",
    priceHeading: "From $17K a year",
    priceBody:
      "That covers the full custom set-up of one AI employee doing one defined job, and the support to keep it running for the year, paid fortnightly. Priced for businesses in the United States, and the exact figure is agreed in writing before anything starts.",
    fortnightlyLine: "That is about $650 a fortnight.",
    exposureLine: "At $17K a year, a fair one-month test costs under $2,150.",
    source: "ai-employees-us",
  },
};

export default function AiEmployees({ params }: { params: { region: string } }) {
  const region = REGIONS[params.region];

  usePageTracking();
  useSeo(region ? region.seo : ROUTE_SEO.notFound);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [details, setDetails] = useState("");
  // Honeypot: real visitors never see or fill this field.
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);
  // Advertising measurement (consent-gated in @/lib/ad-consent). The lead id
  // is kept so a visitor who submits first and presses Accept afterwards
  // still produces the browser Lead event, once.
  const leadIdRef = useRef<string | null>(null);
  const leadFiredRef = useRef(false);
  const contactFiredRef = useRef(false);
  // A form focus or booking click before the cookie choice cannot fire; it is
  // remembered here and sent once if the visitor then presses Accept.
  const contactPendingRef = useRef(false);

  useEffect(() => {
    // Persist the ?src= campaign tag before anything else can navigate.
    const params = new URLSearchParams(window.location.search);
    const src = params.get("src");
    if (src) {
      sessionStorage.setItem("ai-employees-src", src.slice(0, 60));
    }
    // Click-attribution identifier appended to the landing URL by the
    // ChatGPT ad ({oppref} template value). Sent server-side with the quote
    // conversion event; no cookies involved.
    const oppref = params.get("oppref");
    if (oppref) {
      sessionStorage.setItem("ai-employees-oppref", oppref.slice(0, 300));
    }
  }, []);

  // A submitted form swaps for a much shorter thanks block, so without this
  // the viewport can end up past the confirmation entirely.
  useEffect(() => {
    if (submitted && thanksRef.current) {
      thanksRef.current.scrollIntoView({ block: "center" });
      thanksRef.current.focus();
    }
  }, [submitted]);

  if (!region) {
    return <NotFound />;
  }

  const validate = () => {
    const errors: { name?: string; email?: string } = {};
    if (name.trim().length < 2) {
      errors.name = "Your name helps us address you properly.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "That email doesn't look right.";
    }
    setFieldErrors(errors);
    // Surface the failure: without this, errors can render far above the
    // viewport and the button appears to do nothing.
    if (errors.name && nameRef.current) {
      nameRef.current.focus();
      nameRef.current.scrollIntoView({ block: "center" });
    } else if (errors.email && emailRef.current) {
      emailRef.current.focus();
      emailRef.current.scrollIntoView({ block: "center" });
    }
    return Object.keys(errors).length === 0;
  };

  // Mid-funnel signal for the ad platforms: the first time the quote form
  // gets focus, or a booking link is clicked, once per page. Browser only,
  // no personal data, no-op without consent.
  const noteContact = () => {
    if (contactFiredRef.current) return;
    if (trackAdContact(params.region)) {
      contactFiredRef.current = true;
      contactPendingRef.current = false;
    } else {
      contactPendingRef.current = true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);
    setError(null);
    try {
      // Attribution ids are only read (and only sent) when advertising
      // consent is granted; readAdAttribution() returns null otherwise.
      const consentGranted = getAdConsent() === "granted";
      const attribution = readAdAttribution();
      const res = await fetch("/api/details-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          company: company.trim() || null,
          role: role.trim() || null,
          about: details.trim() || null,
          source: sessionStorage.getItem("ai-employees-src") || region.source,
          oppref: sessionStorage.getItem("ai-employees-oppref") || null,
          page_url: window.location.origin + window.location.pathname,
          variant: "quote",
          website,
          region: params.region,
          ad_consent: consentGranted,
          ad_consent_at: consentGranted ? (getAdConsentRecord()?.at ?? null) : null,
          fbp: attribution?.fbp ?? null,
          fbc: attribution?.fbc ?? null,
          fbclid: attribution?.fbclid ?? null,
          ttp: attribution?.ttp ?? null,
          ttclid: attribution?.ttclid ?? null,
          referrer: document.referrer.slice(0, 500) || null,
        }),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      const data = (await res.json().catch(() => ({}))) as { leadId?: string | null };
      if (data.leadId) {
        leadIdRef.current = data.leadId;
        // Browser half of the Lead event, same event_id as the server half.
        // No-op unless consent is granted and a pixel is loaded.
        if (trackAdLead(data.leadId, params.region)) leadFiredRef.current = true;
      }
      countEvent("quote_submitted", { ad_consent: getAdConsent() });
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending that. Give it another try, or email us directly at");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader minimal />

      {/* Hero, message-matched to the ad */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-amber-400 mb-4 uppercase">
              {region.eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight" data-testid="text-hero-headline">
              {region.heroHeadline}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
              An AI employee here is a system we build that does one named job in your business and keeps doing it. Answering enquiries and writing bookings into the diary. Chasing quotes and invoices. Tracking jobs and writing up the reports. Full custom set-up for your business, by us, not from a template.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button asChild size="lg" className="w-full sm:w-auto text-base px-8 py-6" data-testid="button-cta-hero">
                <a href="#quote">Get a quote</a>
              </Button>
              <div className="text-sm text-slate-300 sm:self-center">
                Prefer to talk?{" "}
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline text-slate-200" onClick={noteContact}>
                  Book a free call.
                </a>{" "}
                Fifteen minutes, no hard sell.
              </div>
            </div>
            {region.heroNote && (
              <p className="text-sm text-slate-400 mt-5">{region.heroNote}</p>
            )}
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
                Real people built it and real people look after it. When something needs changing, you tell us and it gets changed. Support hours and response times are agreed in writing as part of the set-up.
              </p>
            </div>
            <div className="bg-white p-7 rounded-lg border border-border">
              <h2 className="text-xl font-display font-bold mb-3">{region.priceHeading}</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                {region.priceBody}
              </p>
              <p className="text-foreground font-medium">
                {region.fortnightlyLine}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial terms. Pete's call 1 Sep: one month minimum, two weeks'
          notice. Exposure line is arithmetic on the published price per
          region. Mirrored in seo-routes staticHtml and the offer JSON-LD;
          keep the three in sync. */}
      <section className="pb-16" data-testid="section-terms">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 border border-border rounded-lg bg-white p-7">
            <div>
              <h3 className="font-display font-bold mb-1">Minimum one month.</h3>
              <p className="text-sm text-muted-foreground">Long enough to prove it, short enough to be a fair test.</p>
            </div>
            <div>
              <h3 className="font-display font-bold mb-1">Paid fortnightly.</h3>
              <p className="text-sm text-muted-foreground">Like the rest of the payroll. No big figure up front.</p>
            </div>
            <div>
              <h3 className="font-display font-bold mb-1">No lock-in contract.</h3>
              <p className="text-sm text-muted-foreground">After the first month you can stop with two weeks' notice. {region.exposureLine}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="py-16 bg-slate-50 scroll-mt-28" data-testid="section-quote">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">Get a quote</h2>
            <p className="text-muted-foreground text-center mb-6">
              Tell us the job you'd hand over first, and the quote comes back with a figure and how it would work in your business.
            </p>
            <div className="max-w-xl mx-auto flex items-center gap-4 mb-6" data-testid="block-form-trust">
              <img
                src="/images/pete-harris.jpg"
                alt="Pete Harris, founder of Streamlined Tech"
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                width="48"
                height="48"
                loading="lazy"
              />
              <p className="text-sm text-muted-foreground">
                Based in Galway, Ireland. Every quote request from this page is read by the founder. Or email{" "}
                <a href="mailto:peter@streamlinedai.tech" className="underline hover:no-underline">peter@streamlinedai.tech</a>.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-border shadow-md p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-8" data-testid="text-quote-thanks">
                  <h3 ref={thanksRef} tabIndex={-1} className="text-2xl font-display font-bold mb-3 outline-none">Got it.</h3>
                  <p className="text-muted-foreground">
                    Your details are in and your quote comes back by email. If you'd rather not wait,{" "}
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline" onClick={noteContact}>
                      book a call
                    </a>{" "}
                    and we'll talk it through.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} onFocus={noteContact} noValidate data-testid="form-quote">
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
                        aria-invalid={!!fieldErrors.name}
                        ref={nameRef}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        data-testid="input-name"
                      />
                      {fieldErrors.name && <p role="alert" className="text-sm text-destructive mt-1">{fieldErrors.name}</p>}
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
                        aria-invalid={!!fieldErrors.email}
                        ref={emailRef}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        data-testid="input-email"
                      />
                      {fieldErrors.email && <p role="alert" className="text-sm text-destructive mt-1">{fieldErrors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="quote-phone" className="mb-2 block">
                        Phone number <span className="text-muted-foreground font-normal">(optional)</span>
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Add one if you'd rather we called than emailed.
                      </p>
                      <Input
                        id="quote-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className="text-base h-12"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        data-testid="input-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quote-company" className="mb-2 block">
                        Company name <span className="text-muted-foreground font-normal">(optional)</span>
                      </Label>
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
                      <Label htmlFor="quote-role" className="mb-2 block">
                        What job would you hand over first? <span className="text-muted-foreground font-normal">(optional)</span>
                      </Label>
                      <Input
                        id="quote-role"
                        name="role"
                        type="text"
                        className="text-base h-12"
                        placeholder="Answering enquiries, booking jobs..."
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        data-testid="input-role"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quote-details" className="mb-2 block">
                        Role details <span className="text-muted-foreground font-normal">(optional)</span>
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        What it would handle day to day, and a line about how you work now. It makes the quote a lot more useful.
                      </p>
                      <textarea
                        id="quote-details"
                        name="details"
                        rows={3}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        data-testid="input-details"
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
                    {(fieldErrors.name || fieldErrors.email) && (
                      <p role="alert" className="text-sm text-destructive" data-testid="text-validation-summary">
                        Check the fields above and try again.
                      </p>
                    )}
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
                        "Get my quote"
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      One reply, from the founder. No spam.{" "}
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
              We build for a living
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  src: "/images/app-training-dashboard.webp",
                  alt: "Staff training and certification tracking dashboard",
                  caption: "Staff certs and training tracked before the audit asks.",
                  width: 1200,
                  height: 742,
                },
                {
                  src: "/images/app-scheduling.webp",
                  alt: "Scheduling screen from AutoListing, our own product",
                  caption: "Our own product, scheduling and publishing its own posts, unattended.",
                  width: 1200,
                  height: 779,
                },
                {
                  src: "/images/app-intake.webp",
                  alt: "Intake screen from a livestock mart system",
                  caption: "An intake screen from a system built for an Irish livestock mart.",
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
                I'm Pete Harris, the founder. 20+ years in heavy industries and construction, from on the tools to training package production and now building the software. We build and run our own products, AutoListing.io and Rangplan.ie, with customers, billing and uptime to keep. And every quote request from this page is read by me.
              </p>
            </div>
            <p className="text-center text-muted-foreground mt-10">
              There is also a smaller one-off build, from €3,900, where you get a tool and your team runs it. An AI employee is the other way round: the system does the job itself, and we look after it for the year. The full cost and timeline picture is on{" "}
              <Link href="/how-it-works" className="text-primary underline hover:no-underline" data-testid="link-how-it-works">
                the how it works page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Security, same copy as the rest of the site */}
      <section className="py-16 bg-slate-50" data-testid="section-security">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
              Your data stays yours
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Modern, enterprise-grade security practices: secure authentication, encrypted data storage, and strict access controls.
              </p>
              <p>
                Your systems run in isolated environments, your IP remains yours, and AI components do not train on or share your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16" data-testid="section-final-cta">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Ready for a figure?
            </h2>
            <p className="text-muted-foreground mb-6">
              Tell us the job and the quote comes back by email.
            </p>
            <Button asChild size="lg" className="text-base px-8 py-6" data-testid="button-cta-closing">
              <a href="#quote">Get my quote</a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Prefer to talk?{" "}
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" onClick={noteContact}>
                Book a free call.
              </a>{" "}
              Fifteen minutes, no hard sell.
            </p>
          </div>
        </div>
      </section>

      <AdConsentBanner
        onGranted={() => {
          // Accept after a submit on this page: fire the browser Lead the
          // submit could not, once.
          if (leadIdRef.current && !leadFiredRef.current && trackAdLead(leadIdRef.current, params.region)) {
            leadFiredRef.current = true;
          }
          // Accept after touching the form or a booking link: fire the
          // Contact the earlier attempt could not, once.
          if (contactPendingRef.current && !contactFiredRef.current && trackAdContact(params.region)) {
            contactFiredRef.current = true;
            contactPendingRef.current = false;
          }
        }}
      />
      <SiteFooter />
    </div>
  );
}
