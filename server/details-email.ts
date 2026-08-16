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
    "Handy's a bit of fun, but the idea underneath it is real. We do build assistants like that: trained on your gear, your procedures and your maintenance history, so your people can ask a question on site and get a straight answer instead of digging through manuals or waiting on a call. They work best sitting on top of systems that already hold good data, and that is where most of the value actually is.",
    "Here's what we build for mining and construction operations:",
    "<strong>Progress tracking that matches the real job.</strong> What is done, what is open and what is waiting on someone else, in one place.",
    "<strong>Defects, NCRs and close-out.</strong> Raised on a phone in the field, moved through the trades automatically, closed out with the evidence attached.",
    "<strong>Follow-ups that happen without chasing.</strong> The system contacts the next person when it is their turn, so your supervisors are not ringing around.",
    "<strong>Reporting that writes itself.</strong> Daily and weekly reporting built from what was already captured.",
    "<strong>Safety and compliance workflows.</strong> Incident capture, corrective actions, audit trails, approval routing.",
    "<strong>Workforce coordination.</strong> Competency and training checks, onboarding, reminders.",
    "Everything is custom built around how your site already runs, then developed further as the work changes. Pilot first on one site and one problem, widen it once it is earning its keep.",
    "I've spent 20+ years in heavy industries and construction, from on the tools to training package production and now building the software. This isn't guesswork about how a site runs.",
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
