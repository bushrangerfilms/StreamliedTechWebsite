import { z } from "zod";
import { buildDetailsEmail } from "./details-email.js";

// Shared by the Express dev server (server/routes.ts) and the Vercel
// serverless function (api/details-lead.ts). Production runs only the
// latter, since this site deploys as a static build plus api/ functions.
//
// This is the site's one lead capture. The "Ask for a call" form on /contact
// posts here with variant "call": the row is saved to website_leads and Pete
// is emailed. Nothing is sent to any advertising platform and no cookie is
// set. The older "rundown" variant (the retired /details form) is kept so the
// endpoint behaves as before for anything still posting to it; remove it once
// the Atlas form endpoint replaces this file.

export const detailsLeadSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(200).nullish(),
  source: z.string().trim().max(60).nullish(),
  about: z.string().trim().max(2000).nullish(),
  phone: z.string().trim().max(40).nullish(),
  // "call" is the Ask for a call form: no automatic email goes to the person,
  // one of the team rings them. "rundown" is the retired /details form.
  variant: z.enum(["rundown", "call"]).nullish(),
  // Honeypot field: real visitors submit it empty.
  website: z.string().max(200).optional().default(""),
});

export async function processDetailsLead(
  body: unknown,
  userAgent: string | null,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const parsed = detailsLeadSchema.safeParse(body);
  if (!parsed.success) {
    return { status: 400, body: { error: "Invalid submission" } };
  }
  const { name, email, company, source, about, website, phone } = parsed.data;
  const isCall = parsed.data.variant === "call";

  // A call cannot be made without a number.
  if (isCall && !(phone && phone.replace(/\D/g, "").length >= 7)) {
    return { status: 400, body: { error: "Invalid submission" } };
  }

  // Honeypot filled means a bot: pretend success, store nothing.
  if (website) {
    return { status: 200, body: { success: true } };
  }

  const supabaseUrl = process.env.AUTOREPLY_SUPABASE_URL;
  const serviceKey = process.env.AUTOREPLY_SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API;
  if (!supabaseUrl || !serviceKey) {
    console.error("details-lead: missing Supabase env");
    return { status: 500, body: { error: "Not configured" } };
  }

  const insertRes = await fetch(`${supabaseUrl}/rest/v1/website_leads`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      form: isCall ? "ask-for-a-call" : "details",
      name,
      email,
      company: company || null,
      phone: phone || null,
      source: source || null,
      business_about: about || null,
      user_agent: userAgent,
    }),
  });
  if (!insertRes.ok) {
    console.error("details-lead: insert failed", insertRes.status, await insertRes.text());
    return { status: 500, body: { error: "Could not save" } };
  }
  const [lead] = (await insertRes.json()) as Array<{ id: string }>;

  // Email failure never fails the request: the lead is captured either way,
  // and email_sent=false marks rows needing a manual send. A call request
  // gets no automatic email: the reply is a phone call.
  let emailSent = false;
  if (resendKey && !isCall) {
    try {
      const { subject, html, text } = buildDetailsEmail(name);
      const sendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Pete Harris <pete@updates.streamlinedai.tech>",
          reply_to: "peter@streamlinedai.tech",
          to: [email],
          subject,
          html,
          text,
        }),
      });
      if (sendRes.ok) {
        emailSent = true;
      }
      if (sendRes.ok && lead?.id) {
        await fetch(`${supabaseUrl}/rest/v1/website_leads?id=eq.${lead.id}`, {
          method: "PATCH",
          headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email_sent: true, email_sent_at: new Date().toISOString() }),
        });
      } else if (!sendRes.ok) {
        console.error("details-lead: email send failed", sendRes.status, await sendRes.text());
      }
    } catch (emailError) {
      console.error("details-lead: email error", emailError);
    }
  } else if (!resendKey) {
    console.error("details-lead: RESEND_API not set, lead saved without email");
  }

  // Alert Pete on every real submission. Independent of the lead's email so
  // neither send can block the other; failure is logged, never fatal.
  let notified = false;
  if (resendKey) {
    try {
      const esc = (v: string | null | undefined) =>
        String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const heading = isCall ? "Ask for a call" : "New rundown request";
      const confirmation = isCall
        ? "none (they asked for a phone call)"
        : emailSent
          ? "sent"
          : "NOT sent, send manually";
      const notifyRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Streamlined Tech site <pete@updates.streamlinedai.tech>",
          reply_to: email,
          to: ["streamlinedtechai@gmail.com"],
          subject: `${heading}: ${name}${company ? ` (${company})` : ""}`,
          html: `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #1a1a1a;">
<p>${isCall ? "Someone asked for a call on streamlinedai.tech/contact." : "New rundown request from streamlinedai.tech/details."}</p>
<table cellpadding="4" style="border-collapse: collapse;">
<tr><td style="color:#666;">Name</td><td><strong>${esc(name)}</strong></td></tr>
<tr><td style="color:#666;">Phone</td><td>${esc(phone) || "not given"}</td></tr>
<tr><td style="color:#666;">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
<tr><td style="color:#666;">Business</td><td>${esc(company) || "not given"}</td></tr>
<tr><td style="color:#666;">What it does</td><td>${esc(about) || "not given"}</td></tr>
<tr><td style="color:#666;">Source</td><td>${esc(source) || "direct"}</td></tr>
<tr><td style="color:#666;">Confirmation email</td><td>${confirmation}</td></tr>
</table>
<p>Reply to this email to reply to them directly.</p>
</div>`,
          text: `${heading}.\nName: ${name}\nPhone: ${phone || "not given"}\nEmail: ${email}\nBusiness: ${company || "not given"}\nWhat it does: ${about || "not given"}\nSource: ${source || "direct"}\nConfirmation email: ${confirmation}`,
        }),
      });
      if (notifyRes.ok) {
        notified = true;
      } else {
        console.error("details-lead: notify send failed", notifyRes.status, await notifyRes.text());
      }
    } catch (notifyError) {
      console.error("details-lead: notify error", notifyError);
    }
  }
  if (isCall && !notified) {
    // The row is saved, but nobody has been told. Say so loudly in the logs.
    console.error("details-lead: call request saved but Pete was NOT notified", { leadId: lead?.id });
  }

  return { status: 200, body: { success: true, emailSent, leadId: lead?.id || null } };
}
