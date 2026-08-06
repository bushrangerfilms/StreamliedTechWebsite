// The "full rundown" email sent to /details form submitters.
// Copy rules: no em or en dashes anywhere, no invented numbers or outcome
// figures. Plain paragraph styling so it reads as a personal email, not a
// campaign blast.

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildDetailsEmail(name: string): { subject: string; html: string; text: string } {
  const firstName = escapeHtml(name.trim().split(/\s+/)[0] || "there");

  const paragraphs = [
    `Hi ${firstName},`,
    "Thanks for checking out the Handy video and asking for the rundown.",
    "Handy's a bit of fun, but the idea underneath it is real. It's the same kind of thing we build for mining and construction crews: an AI assistant trained on your gear, your procedures and your maintenance history, so your people can ask it a question on site and get a straight answer back instead of digging through manuals or waiting on a call.",
    "Here's what we actually build, beyond that:",
    "<strong>Safety and compliance workflows.</strong> Incident capture, corrective actions, audit trails, approval routing.",
    "<strong>Defects, NCRs and close-out.</strong> Photo capture, assign and verify, trend visibility.",
    "<strong>Project reporting and admin.</strong> Weekly reporting packs, progress summaries, photo logging.",
    "<strong>Workforce coordination.</strong> Competency and training checks, onboarding, reminders.",
    "<strong>Internal and customer communications.</strong> Routing, follow-ups, escalation logic.",
    "Before software, I spent 20+ years hands on in mining and construction operations. This isn't guesswork about how a site runs.",
    "If any of this looks like your operation, just reply to this email and tell me what's causing the friction. Replies come straight to me and I answer everything myself.",
    "Pete",
    "Peter Harris<br>Streamlined Tech<br>peter@streamlinedai.tech",
  ];

  const html = `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #1a1a1a; max-width: 620px;">${paragraphs
    .map((p) => `<p style="margin: 0 0 16px 0;">${p}</p>`)
    .join("")}</div>`;

  const text = paragraphs
    .map((p) => p.replace(/<br>/g, "\n").replace(/<[^>]+>/g, ""))
    .join("\n\n");

  return { subject: "The full rundown", html, text };
}
