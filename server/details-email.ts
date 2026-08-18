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
    "Thanks for checking out the Handy video and asking for the rundown. This is a quick note to say your details landed. The proper rundown comes from me personally, put together for your operation rather than a generic pack, so give it a day or two. I'm in Ireland, so if you're in Australia I'm most likely asleep while you read this and you'll hear from me in your next working day.",
    "In the meantime, the short version of what we do. Handy is a bit of fun, and an assistant like that is one thing we can build, but it's a small part of the picture. Most of the value is in the systems underneath: internal apps built around how your site actually runs, automated workflows that move themselves along without someone chasing, and AI put to work wherever it genuinely helps. Every part of an operation has admin that can be streamlined, big outfit or small.",
    "Some of what that looks like in mining and construction:",
    "<strong>Progress tracking that matches the real job.</strong> What is done, what is open and what is waiting on someone else, in one place.",
    "<strong>Defects, NCRs and close-out.</strong> Raised on a phone in the field, moved through the trades automatically, closed out with the evidence attached.",
    "<strong>Follow-ups that happen without chasing.</strong> The system contacts the next person when it is their turn, so your supervisors are not ringing around.",
    "<strong>Reporting that writes itself.</strong> Daily and weekly reporting built from what was already captured.",
    "<strong>Safety and compliance workflows.</strong> Incident capture, corrective actions, audit trails, approval routing.",
    "<strong>Workforce coordination.</strong> Competency and training checks, onboarding, reminders.",
    "Everything is custom built around how your site already runs, then developed further as the work changes. Pilot first on one site and one problem, widen it once it is earning its keep.",
    "I've spent 20+ years in heavy industries and construction, from on the tools to training package production and now building the software. This isn't guesswork about how a site runs.",
    "If you want to get ahead of my reply, hit reply now and tell me a bit about your operation and what's causing the friction. It makes the rundown I send you a lot more useful. Replies come straight to me and I answer everything myself.",
    "Pete",
    "Peter Harris<br>Streamlined Tech<br>peter@streamlinedai.tech",
  ];

  const html = `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #1a1a1a; max-width: 620px;">${paragraphs
    .map((p) => `<p style="margin: 0 0 16px 0;">${p}</p>`)
    .join("")}</div>`;

  const text = paragraphs
    .map((p) => p.replace(/<br>/g, "\n").replace(/<[^>]+>/g, ""))
    .join("\n\n");

  return { subject: "Got your details, rundown to follow", html, text };
}
