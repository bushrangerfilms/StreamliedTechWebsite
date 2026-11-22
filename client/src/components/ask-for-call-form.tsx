import { useEffect, useRef, useState } from "react";
import { registerAskForCallTool, validateCall, type CallErrors, type CallValues, type ToolResult } from "@/lib/webmcp";

type Errors = CallErrors;

/**
 * The "Ask for a call" form. It posts to /api/details-lead with variant
 * "call": the details are saved and Pete is emailed (see
 * server/details-lead-core.ts). No cookie is set and nothing is sent to any
 * other service. The line under the button says what happens; keep it true
 * to that server code.
 *
 * Agents: where the browser offers WebMCP (document.modelContext), the form
 * also registers one tool, ask_for_call (client/src/lib/webmcp.ts). The tool
 * fills this same form and sends through the same checks and the same
 * request below, honeypot included; it is not a second way in. A browser
 * without WebMCP sees no difference.
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

  const post = async (values: CallValues, signal?: AbortSignal) => {
    setState("sending");
    try {
      const res = await fetch("/api/details-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal,
        body: JSON.stringify({
          variant: "call",
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          company: values.company.trim() || null,
          about: values.about.trim() || null,
          source: "website",
          website,
        }),
      });
      const data = await res.json().catch(() => null);
      const ok = Boolean(res.ok && data?.success);
      setState(ok ? "sent" : "failed");
      return ok;
    } catch {
      setState("failed");
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    const values = { name, phone, email, company, about };
    const next = validateCall(values);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    await post(values);
  };

  // The agent's way in (WebMCP). It puts the details in this form so they
  // show on screen, and sends only when the agent asks it to (submit: true),
  // through the same checks and the same request as the button.
  const agent = useRef<(values: CallValues, submit: boolean, signal: AbortSignal) => Promise<ToolResult>>(null);
  agent.current = async (values, submit, signal) => {
    setName(values.name);
    setPhone(values.phone);
    setEmail(values.email);
    setCompany(values.company);
    setAbout(values.about);
    const next = validateCall(values);
    setErrors(next);
    if (Object.keys(next).length > 0) return { ok: false, message: "The form was not filled in correctly.", errors: next };
    if (!submit) return { ok: true, message: "The form is filled in and has not been sent. Send it again with submit set to true, or press Ask for a call." };
    if (state === "sending") return { ok: false, message: "The form is already being sent." };
    const sent = await post(values, signal);
    return sent
      ? { ok: true, message: "Sent. One of our team will call, normally within 24 hours." }
      : { ok: false, message: "That didn't send. Please try again, or use the email address on the page." };
  };

  useEffect(() => {
    const controller = new AbortController();
    registerAskForCallTool((values, submit, signal) => agent.current!(values, submit, signal), controller.signal);
    return () => controller.abort();
  }, []);

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
