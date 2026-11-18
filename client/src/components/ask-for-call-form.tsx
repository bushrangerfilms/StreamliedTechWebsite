import { useState } from "react";

type Errors = { name?: string; phone?: string; email?: string };

/**
 * The "Ask for a call" form. It posts to /api/details-lead with variant
 * "call": the details are saved and Pete is emailed (see
 * server/details-lead-core.ts). No cookie is set and nothing is sent to any
 * other service. The line under the button says what happens; keep it true
 * to that server code.
 */
export function AskForCallForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [about, setAbout] = useState("");
  // Honeypot: real visitors never see or fill this field.
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const validate = () => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please tell us your name.";
    if (phone.replace(/\D/g, "").length < 7) next.phone = "We need a number to call you on.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "That email doesn't look right.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    if (!validate()) return;
    setState("sending");
    try {
      const res = await fetch("/api/details-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variant: "call",
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          company: company.trim() || null,
          about: about.trim() || null,
          source: "website",
          website,
        }),
      });
      const data = await res.json().catch(() => null);
      setState(res.ok && data?.success ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  };

  if (state === "sent") {
    return (
      <div className="st-notice" role="status" data-testid="notice-call-sent">
        <p>
          <strong>Thanks, we have your details.</strong>
        </p>
        <p>One of our team will call you, normally within 24 hours.</p>
      </div>
    );
  }

  return (
    <form className="st-form" onSubmit={handleSubmit} noValidate data-testid="form-ask-for-call">
      <div className="st-field">
        <label htmlFor="call-name">Your name</label>
        <input id="call-name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={errors.name ? true : undefined} data-testid="input-call-name" />
        {errors.name ? <p className="st-field__error">{errors.name}</p> : null}
      </div>
      <div className="st-field">
        <label htmlFor="call-phone">Phone number</label>
        <input id="call-phone" name="phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={errors.phone ? true : undefined} data-testid="input-call-phone" />
        {errors.phone ? <p className="st-field__error">{errors.phone}</p> : null}
      </div>
      <div className="st-field">
        <label htmlFor="call-email">Email</label>
        <input id="call-email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={errors.email ? true : undefined} data-testid="input-call-email" />
        {errors.email ? <p className="st-field__error">{errors.email}</p> : null}
      </div>
      <div className="st-field">
        <label htmlFor="call-company">Business name</label>
        <input id="call-company" name="company" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} data-testid="input-call-company" />
      </div>
      <div className="st-field">
        <label htmlFor="call-about">What does your business do?</label>
        <textarea id="call-about" name="about" value={about} onChange={(e) => setAbout(e.target.value)} data-testid="input-call-about" />
      </div>
      <div className="st-hp" aria-hidden="true">
        <label htmlFor="call-website">Website</label>
        <input id="call-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {state === "failed" ? (
        <div className="st-notice st-notice--error" role="alert" data-testid="notice-call-failed">
          <p>
            That didn't send. Please try again, or email <a href="mailto:peter@streamlinedai.tech">peter@streamlinedai.tech</a>.
          </p>
        </div>
      ) : null}
      <div>
        <button type="submit" className="st-btn" disabled={state === "sending"} data-testid="button-call-send">
          {state === "sending" ? "Sending" : "Ask for a call"}
        </button>
      </div>
      <p className="st-form__under" data-testid="text-call-under-button">
        Your details go to Streamlined Tech. One of our team calls you, normally within 24 hours. To have them deleted, email peter@streamlinedai.tech.
      </p>
    </form>
  );
}
