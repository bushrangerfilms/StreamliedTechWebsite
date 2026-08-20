// Post-capture enrichment: the thanks page asks what the business does and
// stores it on the lead row, then nudges Pete so his rundown prep has the
// context. Shared by the Vercel function and the Express dev route.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function processDetailsContext(
  body: unknown
): Promise<{ status: number; body: Record<string, unknown> }> {
  const data = (body || {}) as Record<string, unknown>;
  const leadId = String(data.leadId || "");
  const about = String(data.about || "").trim().slice(0, 2000);
  if (!UUID_RE.test(leadId) || about.length < 3) {
    return { status: 400, body: { error: "Invalid submission" } };
  }

  const supabaseUrl = process.env.AUTOREPLY_SUPABASE_URL;
  const serviceKey = process.env.AUTOREPLY_SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API;
  if (!supabaseUrl || !serviceKey) {
    return { status: 500, body: { error: "Not configured" } };
  }

  const patchRes = await fetch(`${supabaseUrl}/rest/v1/website_leads?id=eq.${leadId}`, {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({ business_about: about }),
  });
  if (!patchRes.ok) {
    console.error("details-context: patch failed", patchRes.status, await patchRes.text());
    return { status: 500, body: { error: "Could not save" } };
  }
  const [lead] = (await patchRes.json()) as Array<{ name?: string; email?: string }>;
  if (!lead) {
    return { status: 404, body: { error: "Lead not found" } };
  }

  if (resendKey) {
    try {
      const esc = (v: string | null | undefined) =>
        String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Streamlined Tech site <pete@updates.streamlinedai.tech>",
          reply_to: lead.email,
          to: ["streamlinedtechai@gmail.com"],
          subject: `Lead context: ${lead.name || "lead"} told you about their business`,
          html: `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #1a1a1a;">
<p><strong>${esc(lead.name)}</strong> (${esc(lead.email)}) added context on the thanks page:</p>
<blockquote style="margin: 0; padding: 8px 12px; border-left: 3px solid #ccc;">${esc(about)}</blockquote>
<p>Reply to this email to reply to them directly.</p>
</div>`,
          text: `${lead.name} (${lead.email}) added context:\n\n${about}`,
        }),
      });
    } catch (notifyError) {
      console.error("details-context: notify error", notifyError);
    }
  }

  return { status: 200, body: { success: true } };
}
