import { z } from "zod";
import { buildDetailsEmail } from "./details-email.js";

// Shared by the Express dev server (server/routes.ts) and the Vercel
// serverless function (api/details-lead.ts) — production runs only the
// latter, since this site deploys as a static build plus api/ functions.

export const detailsLeadSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(200).nullish(),
  source: z.string().trim().max(60).nullish(),
  // The AI Employee role asked for on the quote form; details go in about.
  role: z.string().trim().max(200).nullish(),
  about: z.string().trim().max(2000).nullish(),
  // Click-attribution identifier from the ChatGPT ad landing URL (?oppref=),
  // passed through unmodified per OpenAI's Conversions API docs.
  oppref: z.string().trim().max(300).nullish(),
  // The landing page URL, used as the conversion's source_url after an
  // own-origin check.
  page_url: z.string().trim().max(500).nullish(),
  // "quote" (the /ai-employees form) skips the Handy rundown confirmation
  // email, which is written for the mining video audience. The lead is still
  // saved and Pete is still notified; the reply to a quote is personal.
  variant: z.enum(["rundown", "quote"]).nullish(),
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
  const { name, email, company, source, role, about, website, oppref, page_url } = parsed.data;
  const isQuote = parsed.data.variant === "quote";

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
      form: isQuote ? "ai-employees-quote" : "details",
      name,
      email,
      company: company || null,
      source: source || null,
      role: role || null,
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
  // and email_sent=false marks rows needing a manual send. The flag is also
  // returned so the thanks page can stop promising a mail that did not go.
  let emailSent = false;
  if (resendKey && !isQuote) {
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
  if (resendKey) {
    try {
      const esc = (v: string | null | undefined) =>
        String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
          subject: `${isQuote ? "New AI employee quote request" : "New rundown request"}: ${name}${company ? ` (${company})` : ""}`,
          html: `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #1a1a1a;">
<p>${isQuote ? "New quote request from streamlinedai.tech/ai-employees." : "New rundown request from streamlinedai.tech/details."}</p>
<table cellpadding="4" style="border-collapse: collapse;">
<tr><td style="color:#666;">Name</td><td><strong>${esc(name)}</strong></td></tr>
<tr><td style="color:#666;">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
<tr><td style="color:#666;">Company</td><td>${esc(company) || "not given"}</td></tr>
<tr><td style="color:#666;">Source</td><td>${esc(source) || "direct"}</td></tr>
${role ? `<tr><td style="color:#666;">AI Employee role</td><td><strong>${esc(role)}</strong></td></tr>` : ""}
<tr><td style="color:#666;">${isQuote ? "Role details" : "Business"}</td><td>${esc(about) || "not given"}</td></tr>
<tr><td style="color:#666;">Confirmation email</td><td>${isQuote ? "none (quote request, reply personally)" : emailSent ? "sent" : "NOT sent, send manually"}</td></tr>
</table>
<p>Reply to this email to reply to them directly.</p>
</div>`,
          text: `${isQuote ? "New AI employee quote request." : "New rundown request."}\nName: ${name}\nEmail: ${email}\nCompany: ${company || "not given"}\nSource: ${source || "direct"}\n${role ? `AI Employee role: ${role}\n` : ""}${isQuote ? "Role details" : "Business"}: ${about || "not given"}\nConfirmation email: ${isQuote ? "none (quote request, reply personally)" : emailSent ? "sent" : "NOT sent, send manually"}`,
        }),
      });
      if (!notifyRes.ok) {
        console.error("details-lead: notify send failed", notifyRes.status, await notifyRes.text());
      }
    } catch (notifyError) {
      console.error("details-lead: notify error", notifyError);
    }
  }

  // Report quote submissions to the OpenAI Ads Conversions API (server-side,
  // no pixel, no cookies; oppref alone does click matching). Failure is
  // logged and never fails the lead. The lead id doubles as the event id so
  // retries and duplicates collapse server-side at OpenAI.
  const adsPixelId = process.env.OPENAI_ADS_PIXEL_ID;
  const adsKey = process.env.OPENAI_ADS_CONVERSION_KEY;
  if (isQuote && adsPixelId && adsKey && lead?.id) {
    try {
      const sourceUrl =
        page_url && page_url.startsWith("https://streamlinedai.tech")
          ? page_url
          : "https://streamlinedai.tech/ai-employees/ie";
      const convRes = await fetch(
        `https://bzr.openai.com/v1/events?pid=${encodeURIComponent(adsPixelId)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${adsKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            events: [
              {
                id: lead.id,
                type: "lead_created",
                timestamp_ms: Date.now(),
                ...(oppref ? { oppref } : {}),
                source_url: sourceUrl,
                action_source: "web",
                data: { type: "customer_action" },
              },
            ],
          }),
        },
      );
      if (!convRes.ok) {
        console.error("details-lead: conversion event failed", convRes.status, await convRes.text());
      }
    } catch (convError) {
      console.error("details-lead: conversion event error", convError);
    }
  }

  return { status: 200, body: { success: true, emailSent, leadId: lead?.id || null } };
}
