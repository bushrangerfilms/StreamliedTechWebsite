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
    "Thanks for checking out the Handy video and asking for the rundown. Your details landed and we'll be in touch soon with a rundown put together for your operation.",
    "In the meantime, the short version of what we do. Handy is a bit of fun, and an assistant like that is one thing we can build, but it's a small part of the picture. Most of the value is in the systems underneath: internal apps built around how your site actually runs, automated workflows that move themselves along without someone chasing, and AI put to work wherever it genuinely helps. Every part of an operation has admin that can be streamlined, big outfit or small.",
    'There is more on the site if you want a look before then: <a href="https://streamlinedai.tech?src=details-email">streamlinedai.tech</a>',
    "A few examples of the kind of thing we build. They are only examples, the point is that it gets built around what your business actually needs:",
    "<strong>Tracking what matters, in one place.</strong> Jobs, tasks, requests, whatever your work runs on. What is done, what is open and what is waiting on someone else, without hunting through spreadsheets and message threads.",
    "<strong>Follow-ups that happen without chasing.</strong> The system contacts the next person when it is their turn, so your people are not ringing around or rekeying the same thing twice.",
    "<strong>Reporting that writes itself.</strong> Daily, weekly or whenever, built from what was already captured as the work happened.",
    "<strong>Forms and checklists that go somewhere.</strong> Filled in on a phone, routed to the right person, stored with the evidence attached.",
    "<strong>AI put to work where it earns its place.</strong> Answering the questions your team asks all day, drafting the routine replies, pulling the right record when someone needs it.",
    "None of it is off the shelf. It is built around how your business already runs, then developed further as the work changes. Usually the best way in is one workflow that is causing friction, get that running, then widen it once it is earning its keep.",
    "I've spent 20+ years in heavy industries and construction, from on the tools to training package production and now building the software, so I know what it looks like when admin gets in the way of the actual work.",
    "If you want to get ahead of it, hit reply and tell me a bit about your operation and what's causing the friction. It makes the rundown a lot more useful. Replies come straight to me and I answer everything myself.",
    "Pete",
    "Peter Harris<br>Streamlined Tech<br>peter@streamlinedai.tech",
  ];

  const html = `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #1a1a1a; max-width: 620px;">${paragraphs
    .map((p) => `<p style="margin: 0 0 16px 0;">${p}</p>`)
    .join("")}</div>`;

  const text = paragraphs
    .map((p) => p.replace(/<br>/g, "\n").replace(/<[^>]+>/g, ""))
    .join("\n\n");

  return { subject: "Got your details", html, text };
}
