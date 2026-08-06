import { z } from "zod";
import { buildDetailsEmail } from "./details-email";

// Shared by the Express dev server (server/routes.ts) and the Vercel
// serverless function (api/details-lead.ts) — production runs only the
// latter, since this site deploys as a static build plus api/ functions.

export const detailsLeadSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(200).nullish(),
  source: z.string().trim().max(60).nullish(),
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
  const { name, email, company, source, website } = parsed.data;

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
      form: "details",
      name,
      email,
      company: company || null,
      source: source || null,
      user_agent: userAgent,
    }),
  });
  if (!insertRes.ok) {
    console.error("details-lead: insert failed", insertRes.status, await insertRes.text());
    return { status: 500, body: { error: "Could not save" } };
  }
  const [lead] = (await insertRes.json()) as Array<{ id: string }>;

  // Email failure never fails the request: the lead is captured either way,
  // and email_sent=false marks rows needing a manual send.
  if (resendKey) {
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
  } else {
    console.error("details-lead: RESEND_API not set, lead saved without email");
  }

  return { status: 200, body: { success: true } };
}
