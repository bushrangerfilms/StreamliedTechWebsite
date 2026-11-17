/**
 * Static crawlable body mirrors, baked inside <div id="root"> by the
 * prerender plugin (vite-plugin-prerender-meta.ts), keyed by route path.
 *
 * Many crawlers and AI answer engines read raw HTML and never run
 * JavaScript, so an SPA page is an empty body to them; these mirrors give
 * each route real crawlable content. main.tsx uses createRoot, which
 * replaces this content the moment React mounts, so real visitors see the
 * React page.
 *
 * THE ONE RULE: each mirror is a faithful copy of its page's rendered copy.
 * Same headings, same paragraphs, same list items, word for word. No forms,
 * no buttons, no images, no diagrams, and never text that the rendered page does not
 * carry - different text for crawlers is cloaking. The build enforces this:
 * script/check-prerender-mirrors.ts fails the build if a mirror's text is
 * not found in the page component or the shared components it renders, so
 * when page copy changes, change the mirror in the same commit.
 *
 * This lives in its own module, NOT in seo-routes.ts, on purpose:
 * seo-routes.ts is bundled into the client (every page imports ROUTE_SEO),
 * and these mirrors are build-time-only bytes that would otherwise ship in
 * the client bundle on every visit. Only the prerender plugin and the
 * mirror check import this file.
 *
 * /privacy and /terms have no mirror (head-only prerender).
 */

const NAV = `
<nav>
<a href="/how-it-works">How it works</a>
<a href="/our-work">Our work</a>
<a href="/about">About</a>
<a href="/contact">Contact</a>
</nav>`;

const PRICING = `
<h3>A custom app for your business</h3>
<p>From €4,900 + VAT</p>
<p>then a monthly fee for hosting</p>
<p>Your own app, built around how you already work.</p>
<ul>
<li>Free demo first if it looks like a fit.</li>
<li>A build fee, then a monthly fee that covers hosting, support from real people and ongoing refinements.</li>
<li>No charge per user.</li>
</ul>
<p>Done within 2 weeks of your go-ahead. Two weeks of testing on your own jobs.</p>
<h3>The Whole Business Build</h3>
<p>From €120,000 + VAT</p>
<p>your whole business, built with you over a year</p>
<p>Some businesses need more than one app.</p>
<ul>
<li>For twelve months I work alongside you and your team, on site and off.</li>
<li>We go through how the work really moves, from the first call to the final invoice, and I build the systems to run it as one connected set.</li>
<li>Each one is tested on your own jobs before we move to the next.</li>
<li>You deal with me directly throughout.</li>
</ul>
<p>It takes a lot of my time, which is why it costs what it does.</p>
<p>I take on no more than 2 of these a year, because I do the work myself.</p>`;

const PERSON = `
<h2>Who you'll deal with</h2>
<p>I'm Pete Harris. I build the apps.</p>
<p>I spent over 20 years in heavy industry and construction before this, so I know what a job sheet in a van looks like.</p>
<ol>
<li>Until you go ahead, one of our team follows up for me by phone.</li>
<li>Once you go ahead I build it and see it through.</li>
<li>After that you have support from real people, and every app has a Feedback button: tell us what is not right and we change it.</li>
</ol>`;

const CLOSING = `
<h2>Tell us how you run things.</h2>
<p>Ask for a call and we'll ring you for 10 to 15 minutes. If an app wouldn't help your business, we'll tell you.</p>
<p><a href="/contact">Ask for a call</a></p>`;

export const STATIC_HTML: Record<string, string> = {
  "/": `
<main>
<h1>Custom apps for Irish trade and service businesses.</h1>
<p>Your own app, built around how you already work, with everything in one place. Not another subscription that can't talk to the rest.</p>
<p>Tell us how your business runs on a 10 to 15 minute phone call. If it looks like a fit, we'll build you a free demo of your own app, usually within a few days.</p>
<p>We're all about efficiency. That's why people come to us.</p>
${NAV}
<h2>Who it's for</h2>
<p>Trade and service businesses where the work has outgrown the paperwork:</p>
<ul>
<li>Jobs tracked in a diary, a spreadsheet and a few apps that don't talk to each other.</li>
<li>Services, certs and renewals that come due without anyone noticing.</li>
<li>Job sheets and photos that never make it back to the office.</li>
<li>Quotes and invoices waiting on someone to chase them.</li>
</ul>
<p>We work with</p>
<ul>
<li>Vehicle and machinery workshops</li>
<li>Home service firms with repeat visits</li>
<li>Windows and doors firms</li>
<li>Other trades and service businesses</li>
</ul>
<h2>What goes on your board</h2>
<ul>
<li>Every job from enquiry to invoice</li>
<li>Who is going where tomorrow</li>
<li>Job sheets and photos on the phone</li>
<li>What is due and when: services, certs and renewals</li>
<li>Customers reminded before a visit</li>
<li>The week at a glance</li>
</ul>
<p>Four weeks before a service is due, the app sends your customer a WhatsApp: reply yes if you want us to come.</p>
<h2>How it works</h2>
<ol>
<li><h3>A phone call.</h3><p>10 to 15 minutes about how a job goes from enquiry to invoice.</p></li>
<li><h3>A free demo, if it looks like a fit.</h3><p>Usually within a few days, built from the call, with made-up sample data so you can click anything.</p></li>
<li><h3>A price in writing.</h3><p>A build fee plus a monthly fee. A 50% deposit starts the build.</p></li>
<li><h3>The build.</h3><p>Done within 2 weeks of your go-ahead.</p></li>
<li><h3>Two weeks of field testing.</h3><p>You use it on your own jobs while we refine it. You pay the second half once it is working on your own jobs.</p></li>
<li><h3>Looked after from then on.</h3><p>The monthly fee covers hosting, support from real people and ongoing refinements to what we built.</p></li>
</ol>
<p><a href="/how-it-works">How it works, step by step</a></p>
<h2>Our work</h2>
<h3>IPM Enviro</h3>
<p>The technician scans each numbered unit on an iPad and logs what they found, and the visit report writes itself.</p>
<blockquote>
<p>We were working with another company for 12 months and weren't even close to launch.</p>
<p>Pete contacted us by email, we had a chat, and almost overnight we had a product sample to look at.</p>
<p>Our client is a multinational pharmaceutical plant and they're very pleased with how professional it looks, but the most important thing is how user friendly it is.</p>
<p>There's literally no training required for our techs or their people.</p>
</blockquote>
<p>Eamonn Kennedy, Director, IPM Enviro</p>
<h3>Komplete Engineers</h3>
<p>Quotes that chase themselves, a new project set up in one tap, and every live project at a glance.</p>
<blockquote>
<p>It's made our process much more efficient, in speed and in knowing when invoices are due.</p>
<p>Overall it's greatly benefited the efficiency of the business.</p>
<p>We're definitely managing the work better and getting things done quicker.</p>
</blockquote>
<p>Ian O'Mahony, Komplete Engineers</p>
<h2>What it costs</h2>
${PRICING}
${PERSON}
${CLOSING}
</main>`,

  "/how-it-works": `
<main>
<h1>How it works</h1>
<p>A phone call, a free demo if it fits, a price in writing, the build, two weeks of testing on your own jobs, then we look after it.</p>
${NAV}
<h2>The six steps</h2>
<ol>
<li><h3>A phone call</h3><p>About 10 to 15 minutes. You tell us how a job goes from the first enquiry to the invoice, and where it hurts.</p><p>With your OK we record the call so Pete can build your demo from what you told us.</p></li>
<li><h3>A free demo</h3><p>If it looks like a fit, we build a demo of your own app, usually within a few days. It uses made-up sample data, so click anything.</p><p>It won't be perfect and it isn't meant to be: it gives you something to react to. Editing is easier than creating.</p>
<blockquote>Almost overnight, you brought it around to where it needed to be.</blockquote><p>Eamonn Kennedy, Director, IPM Enviro</p></li>
<li><h3>A price in writing</h3><p>A build fee and a monthly fee, in writing, before anything is built. A 50% deposit starts the build.</p></li>
<li><h3>The build</h3><p>Done within 2 weeks of your go-ahead. We don't give a finish date. We give the timeline.</p>
<blockquote>The speed at which we could turn things around, I can't underestimate the value of that.</blockquote><p>Eamonn Kennedy, Director, IPM Enviro</p></li>
<li><h3>Two weeks of field testing</h3><p>You use it on your own jobs while we refine it. You pay the second half once it is working for you.</p>
<blockquote>We're definitely managing it better, probably getting things done quicker.</blockquote><p>Ian O'Mahony, Komplete Engineers</p></li>
<li><h3>Looked after</h3><p>The monthly fee starts after field testing. It covers hosting, storage, support from real people and ongoing refinements to what we built.</p><p>There is no charge per user.</p><p>Every app has a Feedback button: tell us what isn't right and we change it and let you know.</p>
<blockquote>Always accessible and very quick to come back to us, whether it's a sample or fixing the system. It literally happens almost instantly.</blockquote><p>Eamonn Kennedy, Director, IPM Enviro</p></li>
</ol>
<h2>What it costs</h2>
${PRICING}
<p>AI means we can build it far quicker and cheaper than it used to be, so having your own app now makes sense for a business your size.</p>
<h2>What can go on the board</h2>
<p>Any screen your office or crew works from that used to be paper, a spreadsheet or someone's memory. The usual candidates:</p>
<h3>Jobs and who is going where</h3>
<p>Jobs, crews and bookings on one board.</p>
<h3>Job sheets and photos</h3>
<p>Filled in from the phone and filed where the office can see them, not living on paper in the van.</p>
<h3>Services due</h3>
<p>Service dates, certs and renewals, with the reminder sent before they fall due.</p>
<h3>Fitting and visit days</h3>
<p>Planned ahead, with the customer reminded before you arrive.</p>
<h3>Quotes and invoices</h3>
<p>Quotes followed up after you send them, and a clear view of which invoices are due.</p>
<h3>The week at a glance</h3>
<p>The week's numbers on one screen. No Sunday night spreadsheet.</p>
<p>It can start as one screen for one job and grow from there.</p>
<h2>What happens after the first build?</h2>
<p>The monthly fee covers hosting, storage, support from real people and ongoing refinements to the features in your build.</p>
<p>A genuinely new feature is priced separately, at a fraction of the first build, and the monthly fee goes up a little with it.</p>
<h2>Should you build it yourself or get it built for you?</h2>
<p>Honest answer, sometimes you should build it yourself.</p>
<p>If someone in the office has the time and the interest, a no-code tool can carry a simple job, a form that feeds a spreadsheet, a basic booking sheet.</p>
<p>Where it usually falls down is afterwards.</p>
<ul>
<li>The person who built it becomes the person who maintains it, on top of the job they were already doing.</li>
<li>And the data ends up scattered across subscriptions that do not talk to each other.</li>
</ul>
<p>What we offer is the custom route without those jobs landing back on you.</p>
<p>The app is built around how you already work, we look after it, and your team just uses it.</p>
<h2>Questions people ask</h2>
<h3>How long will it take?</h3>
<p>The demo usually takes a few days. The build is done within 2 weeks of your go-ahead, and then there are two weeks of field testing on your own jobs.</p>
<h3>What does it cost?</h3>
<p>From €4,900 + VAT for the build, then a monthly fee. You get the price in writing before anything is built.</p>
<h3>Will it work with my accounts package?</h3>
<p>Usually. We'd keep your accounts software, because it keeps up with tax law for you, and link your app to it. Xero links best, then QuickBooks. Ask us about others.</p>
<h3>I'm not technical. Will I break it?</h3>
<p>You can't break it. Few clicks, and nobody has needed training so far.</p>
<h3>What if something's wrong after it's built?</h3>
<p>Every app has a Feedback button. Tell us what isn't right and we change it and let you know. It is included in the monthly fee.</p>
<h3>Why not an off-the-shelf app?</h3>
<p>Off-the-shelf software works if someone sits at a desk feeding it. Ours does the chasing without them.</p>
<h3>Can't I just use ChatGPT?</h3>
<p>For one-off jobs, yes. But you have to do it every time, and it forgets your rules.</p>
${CLOSING}
</main>`,

  "/our-work": `
<main>
<h1>Our work</h1>
<p>Two of the apps we have built, and what each one does.</p>
${NAV}
<h2>IPM Enviro</h2>
<p>The technician scans each numbered unit on an iPad and logs what they found, and the visit report writes itself.</p>
<ul>
<li>Scans each numbered unit</li>
<li>Logs what they found</li>
<li>The visit report writes itself</li>
</ul>
<h2>Komplete Engineers</h2>
<p>Quotes that chase themselves, a new project set up in one tap, and every live project at a glance.</p>
<ul>
<li>Quotes that chase themselves</li>
<li>A new project set up in one tap</li>
<li>Every live project at a glance</li>
</ul>
<p>We only name clients who have said we can. Their apps are their own, so we don't show screenshots of them here.</p>
${CLOSING}
</main>`,

  "/about": `
<main>
<h1>About Streamlined Tech</h1>
<p>We build custom apps for Irish trade and service businesses. Your own app, built around how you already work, with everything in one place.</p>
${NAV}
${PERSON}
<h2>Where we are</h2>
<ul>
<li>Based in Galway.</li>
<li>Working with businesses across Ireland.</li>
<li>Site visits by arrangement.</li>
</ul>
<h2>The company</h2>
<p>Streamlined Tech is a trading name of Streamlined Digital Tech Limited, registered in Ireland, company number 805162.</p>
<p>Registered office: Castleblakeney, Ballinasloe, Co. Galway, H53 YA97.</p>
${CLOSING}
</main>`,

  "/contact": `
<main>
<h1>Ask for a call</h1>
<p>Tell us how you run things. We'll ring you for 10 to 15 minutes. If an app wouldn't help your business, we'll tell you.</p>
${NAV}
<p>Your details go to Streamlined Tech. One of our team rings you, normally within 24 hours. To have them deleted, email peter@streamlinedai.tech.</p>
<h2>Or email us</h2>
<p>peter@streamlinedai.tech</p>
<ul>
<li>Based in Galway.</li>
<li>Working with businesses across Ireland.</li>
<li>Site visits by arrangement.</li>
</ul>
</main>`,
};
