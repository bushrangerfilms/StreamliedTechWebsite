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
 * The trade pages and /industries (18 Nov 2026) have mirrors at the end.
 */

import { DEFAULT_MARKET, MARKETS, inline } from "./pricing";
import { FAQ_ITEMS, FAQ_PRICING_LINK, faqParts } from "./faq";
import { FAQ_AFTER, FAQ_CHANGE, FAQ_COST, FAQ_TRADE, type TradeKey } from "./trade-faq";

// Prices in the mirrors are the default market's, taken from lib/pricing.ts.
// The build then writes each page once per market, swapping in that market's
// prices (vite-plugin-prerender-meta.ts), so no-JavaScript readers in each
// country see their own.

const NAV = `
<nav>
<a href="/how-it-works">How it works</a>
<a href="/our-work">Our work</a>
<a href="/about">About</a>
<a href="/contact">Contact</a>
</nav>`;

const PRICING = `
<h3>A custom app for your business</h3>
<p>${MARKETS[DEFAULT_MARKET].build}</p>
<p>${MARKETS[DEFAULT_MARKET].monthly}</p>
<p>Your own app, built around how you already work.</p>
<ul>
<li>Free demo first if it looks like a fit.</li>
<li>A build fee, then a monthly fee that covers hosting, support from real people and ongoing refinements.</li>
<li>No charge per user.</li>
</ul>
<p>Done within 2 weeks of your go-ahead. Two weeks of testing on your own jobs.</p>
<h3>The Whole Business Build</h3>
<p>${MARKETS[DEFAULT_MARKET].whole}</p>
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
<p>Pete Harris</p>
<p>Founder, Streamlined Tech</p>
<p>Pete Harris founded Streamlined Tech and builds the apps. He has run his own companies since 2007.</p>
<p>His work has covered video production, workplace safety and training, property, farming, pest control and engineering.</p>
<h3>How Streamlined Tech looks after you</h3>
<ol>
<li><h4>A discovery call and a free demo</h4><p>We call you for 10 to 15 minutes. If it looks like a fit, we build a free demo of your own app.</p></li>
<li><h4>The build and a two-week field test</h4><p>We build it, then you use it on your own jobs for two weeks while we refine it.</p></li>
<li><h4>Looked after from then on</h4><p>A dedicated product manager, support from real people, a Feedback button in every app and ongoing refinements.</p></li>
</ol>`;

const AI_CHANGE = `
<h2>What's changed with AI</h2>
<blockquote>
<p>What's changed now with AI is this.</p>
<p>You used to need a quarter of a million to make software, so it had to cater for thousands of businesses.</p>
<p>That's why you end up with menus within menus, and it gets so complicated that staff just avoid using it.</p>
<p>Now you can have your own software that does exactly what you need, and it's so simple to use that it's easier than what your staff are doing now.</p>
</blockquote>
<p>Pete Harris, Founder, Streamlined Tech</p>
<p>AI means we can build it far quicker and cheaper than it used to be, so having your own app now makes sense for a business your size.</p>`;

const CLOSING = `
<h2>Tell us how you run things.</h2>
<p>Ask for a call and we'll call you for 10 to 15 minutes. If an app wouldn't help your business, we'll tell you.</p>
<p><a href="/contact">Ask for a call</a></p>`;

// Shared by the trade pages (client/src/components/trade-sections.tsx and
// client/src/lib/trade-faq.ts). The two quotes are the approved main quotes,
// word for word, as on the home page.
const IPM_QUOTE = `
<blockquote>
<p>We were working with another company for 12 months and weren't even close to launch.</p>
<p>Pete contacted us by email, we had a chat, and almost overnight we had a product sample to look at.</p>
<p>Our client is a multinational pharmaceutical plant and they're very pleased with how professional it looks, but the most important thing is how user friendly it is.</p>
<p>There's literally no training required for our techs or their people.</p>
</blockquote>
<p>Eamonn Kennedy, Director, IPM Enviro</p>`;

const KOMPLETE_QUOTE = `
<blockquote>
<p>It's made our process much more efficient, in speed and in knowing when invoices are due.</p>
<p>Overall it's greatly benefited the efficiency of the business.</p>
<p>We're definitely managing the work better and getting things done quicker.</p>
</blockquote>
<p>Ian O'Mahony, Komplete Engineers</p>`;

const TRADE_CHANGE = `
<h2>Do we have to change how we work?</h2>
<p>No. Your app is built around how you already work, with everything in one place. Off-the-shelf software has to cater for thousands of businesses, which is why you end up bending to it.</p>
<p>You see it before you pay for anything. If it looks like a fit after a 10 to 15 minute phone call, we build a free demo of your own app. It uses made-up sample data, so click anything.</p>
<p>It won't be perfect and it isn't meant to be: it gives you something to react to.</p>`;

const TRADE_COST = `
<h2>What does it cost and how does it start?</h2>
<p><span>${MARKETS[DEFAULT_MARKET].build}</span> for the build, then <span>${inline(MARKETS[DEFAULT_MARKET].monthly)}</span>. You get the price in writing before anything is built, and a 50% deposit starts the build.</p>
<p>It starts with a phone call of about 10 to 15 minutes. If it looks like a fit, we build a free demo. Then comes the price in writing, the build, and two weeks of field testing on your own jobs. You pay the second half once it is working for you.</p>
<p>After that the monthly fee covers hosting, storage, support from real people and ongoing refinements to what we built. There is no charge per user.</p>
<p><a href="/how-it-works">How it works, step by step</a></p>`;

function tradeFaq(trade: TradeKey): string {
  const own = FAQ_TRADE[trade];
  return `
<h2>Questions owners ask</h2>
<dl>
<dt>${FAQ_COST.q}</dt>
<dd><span>${MARKETS[DEFAULT_MARKET].build}</span> ${FAQ_COST.a} <span>${inline(MARKETS[DEFAULT_MARKET].monthly)}</span>. ${FAQ_COST.aEnd} <a href="${FAQ_COST.moreHref}">${FAQ_COST.more}</a>.</dd>
<dt>${FAQ_CHANGE.q}</dt>
<dd>${FAQ_CHANGE.a}</dd>
<dt>${FAQ_AFTER.q}</dt>
<dd>${FAQ_AFTER.a}</dd>
<dt>${own.q}</dt>
<dd>${own.a}</dd>
</dl>
<p><a href="/faq">More questions, answered plainly</a>.</p>`;
}

export const STATIC_HTML: Record<string, string> = {
  "/": `
<main>
<h1>Custom apps for trade and service businesses.</h1>
<p>Your own app, built around how you already work, with everything in one place. Not another subscription that can't talk to the rest.</p>
<p>Tell us how your business runs on a 10 to 15 minute phone call. If it looks like a fit, we'll build you a free demo of your own app, usually within a few days.</p>
<p>We're all about efficiency. That's why people come to us.</p>
${NAV}
${AI_CHANGE}
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
<p>See the <a href="/industries">industries we build custom apps for</a>.</p>
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
<p><a href="/reviews">Read what our customers say.</a></p>
<h2>What it costs</h2>
${PRICING}
<p><a href="/pricing">See what a custom app costs, and what the monthly fee covers.</a></p>
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
<p><span>${MARKETS[DEFAULT_MARKET].build}</span> for the build, then <span>${inline(MARKETS[DEFAULT_MARKET].monthly)}</span>. You get the price in writing before anything is built.</p>
<h3>Will it work with my accounting software?</h3>
<p>Usually. We'd keep your accounting software, because it keeps up with tax law for you, and link your app to it. Xero links best, then QuickBooks. Ask us about others.</p>
<h3>I'm not technical. Will I break it?</h3>
<p>You can't break it. Few clicks, and nobody has needed training so far.</p>
<h3>What if something's wrong after it's built?</h3>
<p>Every app has a Feedback button. Tell us what isn't right and we change it and let you know. It is included in the monthly fee.</p>
<h3>Why not an off-the-shelf app?</h3>
<p>Off-the-shelf software works if someone sits at a desk feeding it. Ours does the chasing without them.</p>
<h3>Can't I just use ChatGPT?</h3>
<p>For one-off jobs, yes. But you have to do it every time, and it forgets your rules.</p>
<p><a href="/faq">More questions, answered plainly.</a></p>
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
<p>Read more about our <a href="/pest-control-app">job management app for pest control companies</a> and our <a href="/engineering-firm-software">project software for engineering firms</a>.</p>
<p><a href="/reviews">Read what our customers say.</a></p>
<p>We only name clients who have said we can. Their apps are their own, so we don't show screenshots of them here.</p>
${CLOSING}
</main>`,

  "/about": `
<main>
<h1>About Streamlined Tech</h1>
<p>We build custom apps for trade and service businesses. Your own app, built around how you already work, with everything in one place.</p>
${NAV}
${PERSON}
<h2>Where we are</h2>
<ul>
<li>Based in Galway, Ireland.</li>
<li>Working with businesses in Ireland and overseas.</li>
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
<p>Tell us how you run things. We'll call you for 10 to 15 minutes. If an app wouldn't help your business, we'll tell you.</p>
${NAV}
<p>Your details go to Streamlined Tech. One of our team calls you, normally within 24 hours. To have them deleted, email peter@streamlinedai.tech.</p>
<h2>Or email us</h2>
<p>peter@streamlinedai.tech</p>
<ul>
<li>Based in Galway, Ireland.</li>
<li>Working with businesses in Ireland and overseas.</li>
<li>Site visits by arrangement.</li>
</ul>
</main>`,

  "/industries": `
<main>
<h1>Industries we build custom apps for</h1>
<p>We build custom apps for trade and service businesses. These are the kinds of business we have built for so far.</p>
<p>If yours isn't here, ask for a call and tell us how a job runs.</p>
${NAV}
<h2><a href="/window-and-door-software">Software for window and door companies</a></h2>
<p>Every job from the first call to the final invoice, with measuring, fitting and what the van loads.</p>
<h2><a href="/pest-control-app">Job management app for pest control companies</a></h2>
<p>The technician scans each numbered unit, logs what they found, and the visit report writes itself.</p>
<h2><a href="/engineering-firm-software">Project software for engineering firms</a></h2>
<p>Quotes that chase themselves, a new project set up in one tap, and every live project at a glance.</p>
<h2><a href="/laboratory-sample-collection-app">Sample collection app for laboratories</a></h2>
<p>Customers mark samples ready and the driver sees the pickups on a map in driving order.</p>
${CLOSING}
</main>`,

  "/pricing": `
<main>
<h1>Pricing</h1>
<p>A build fee, then a monthly fee. You get the price in writing before anything is built.</p>
${NAV}
<h2>What it costs</h2>
${PRICING}
<h2>The monthly fee</h2>
<p><span>${MARKETS[DEFAULT_MARKET].monthly}</span>, which includes hosting, human support and ongoing app refinements.</p>
<p>It starts after field testing. There is no charge per user.</p>
<p>A genuinely new feature is priced separately, at a fraction of the first build, and the monthly fee goes up a little with it.</p>
<h2>How payment works</h2>
<p>You get the price in writing before anything is built.</p>
<p>A 50% deposit starts the build. You pay the second half once it is working on your own jobs.</p>
<p><a href="/how-it-works">How it works, step by step</a></p>
<p><a href="/faq">Questions people ask</a></p>
${CLOSING}
</main>`,

  "/faq": `
<main>
<h1>Questions people ask</h1>
<p>Plain answers about cost, the free demo, how long it takes, and who looks after the app afterwards.</p>
${NAV}
<dl>
${FAQ_ITEMS.map(
  (item) =>
    `<dt>${item.q}</dt>\n<dd>${faqParts(item.a)
      .map((part) =>
        part.token === "build"
          ? `<span>${MARKETS[DEFAULT_MARKET].build}</span>`
          : part.token === "monthly"
            ? `<span>${inline(MARKETS[DEFAULT_MARKET].monthly)}</span>`
            : part.token === "link"
              ? `<a href="${FAQ_PRICING_LINK.href}">${FAQ_PRICING_LINK.text}</a>`
              : part.text,
      )
      .join("")}</dd>`,
).join("\n")}
</dl>
${CLOSING}
</main>`,

  "/reviews": `
<main>
<h1>What our customers say</h1>
<p>A few words from businesses we have built for. We only name the ones who have said we can.</p>
${NAV}
<h2>IPM Enviro</h2>
${IPM_QUOTE}
<h2>Komplete Engineers</h2>
${KOMPLETE_QUOTE}
${CLOSING}
</main>`,

  "/window-and-door-software": `
<main>
<h1>Software for window and door companies</h1>
<p>If your window and door business runs on a quoting package, a spreadsheet, a whiteboard and a lot of phone calls, we can build you one app for all of it.</p>
<p>Every job from the first call to the final invoice, who is measuring or fitting where tomorrow, and what the van needs to load in the morning.</p>
<p>It is built around how your business already works, so you don't have to bend to someone else's software.</p>
${NAV}
<h2>What goes on your board</h2>
<p>We have built apps for window and door companies. This is the kind of thing that goes on the board.</p>
<h3>Every job in one place</h3>
<p>Every job sits on one board, from the first request to fitted. You can see what is waiting on a price, what is ordered and what is booked for fitting.</p>
<p>Every call and message lands in one list, and the customer list shows how each customer got in touch.</p>
<h3>Measuring and fitting</h3>
<p>The measuring list is on the measurer's phone, with a box for sizes and notes, so nothing is copied from a printed sheet.</p>
<p>Fitting sits on a calendar with a column for each van, so you can see who is fitting where tomorrow.</p>
<h3>On the phone in the van</h3>
<p>Each crew sees its own day on the phone. The van's pick list for the morning shows what to load before it leaves.</p>
<h3>After the fitting</h3>
<p>Yearly services show when they are due, with who has said yes. Invoices are made from the job card, and you can see the profit on each finished job.</p>
${TRADE_CHANGE}
${TRADE_COST}
${tradeFaq("windowDoor")}
<p>We have also built a <a href="/pest-control-app">job management app for pest control companies</a>. See all the <a href="/industries">industries we build custom apps for</a>.</p>
${CLOSING}
</main>`,

  "/pest-control-app": `
<main>
<h1>Job management app for pest control companies</h1>
<p>If your technicians write up each visit by hand and someone in the office types it into a report, an app can do that for you.</p>
<p>We build apps for pest control companies where the technician scans each numbered unit on a tablet, logs what they found, and the visit report writes itself.</p>
${NAV}
<h2>What goes on your board</h2>
<h3>On the visit</h3>
<p>The technician scans each numbered unit on a tablet and logs what they found at it. What was used on the visit is recorded on the report too.</p>
<p>When the visit is done, the report has already written itself. Nobody types it up afterwards.</p>
<h3>Reports your customer can read</h3>
<p>A weekly service report comes out of the same visits. Fly killer and insect counts are tracked, and the higher counts are shaded so they stand out.</p>
<p>Your customer can have their own login to see their own reports.</p>
<h3>In the office</h3>
<p>The office can work from one screen that shows what needs attention and who is out where. Visits that are due sit on a list, and each technician sees their own day on the phone.</p>
<p>The sample screens on this page come from apps for other kinds of service business. They show the sort of screen we mean. Yours is built around your own visits and reports.</p>
<h3>Visits that come round again</h3>
<p>Regular visits do not depend on anyone's memory. The list shows what is due and who has said yes.</p>
<h2>What our client says</h2>
<h3>IPM Enviro</h3>
<p>We built the inspection app IPM Enviro's technicians use on their visits.</p>
<p><a href="/our-work">See the two apps we can name</a>.</p>
${IPM_QUOTE}
${TRADE_COST}
${TRADE_CHANGE}
${tradeFaq("pestControl")}
<p>We have also built <a href="/engineering-firm-software">project software for engineering firms</a>. See all the <a href="/industries">industries we build custom apps for</a>.</p>
${CLOSING}
</main>`,

  "/engineering-firm-software": `
<main>
<h1>Project software for engineering firms</h1>
<p>Quotes, projects, site visits, certificates and invoices all have to end up on the right job.</p>
<p>We build apps for engineering firms that chase your quotes for you, set a new project up in one tap and show every live project at a glance, built around how your firm already works.</p>
${NAV}
<h2>What goes on your board</h2>
<h3>Quotes and projects</h3>
<p>Quotes chase themselves, so a quote that has gone quiet is followed up without anyone having to remember it.</p>
<p>A new project is set up in one tap. Every live project is there at a glance, and each one has a map link.</p>
<h3>Site visits and notes</h3>
<p>A site visit can be booked with up to four people. People can leave notes on a job and tag each other in them.</p>
<h3>Certificates, letters and invoices</h3>
<p>Certificates and letters are made from your own Word templates. Letters are laid out to fit a window envelope.</p>
<p>Each job's documents are filed in that job's own folder in your cloud storage.</p>
<p>Invoices come from the same job. One that has already been sent can be credited and reissued.</p>
<h3>The numbers on each job</h3>
<p>The sample screens on this page come from apps for other kinds of business. They show the sort of screen we mean, such as invoices made from the job and the profit on each finished job.</p>
<p>Yours is built around your own projects, documents and wording.</p>
<h2>What our client says</h2>
<h3>Komplete Engineers</h3>
<p>We built the app Komplete Engineers runs its quotes and projects on.</p>
<p><a href="/our-work">See the two apps we can name</a>.</p>
${KOMPLETE_QUOTE}
${TRADE_COST}
${TRADE_CHANGE}
${tradeFaq("engineering")}
<p>We have also built a <a href="/laboratory-sample-collection-app">sample collection app for laboratories</a>. See all the <a href="/industries">industries we build custom apps for</a>.</p>
${CLOSING}
</main>`,

  "/laboratory-sample-collection-app": `
<main>
<h1>Sample collection app for laboratories</h1>
<p>If your lab collects samples from customers by van, someone has to work out who has samples ready and in what order to collect them.</p>
<p>We have built an app where the customer marks their samples as ready, the driver sees the pickups on a map in driving order, and the office sees the whole round.</p>
${NAV}
<h2>What goes on your board</h2>
<p>We have built a sample collection app for a laboratory. Three kinds of people use it: the customer, the driver and the office.</p>
<h3>For your customers</h3>
<p>The customer marks their samples as ready. They sign in with a code sent to their email, so there are no passwords to lose.</p>
<h3>For the driver</h3>
<p>The driver sees the day's pickups on a map, in driving order. A new customer can be signed up by the driver or by the office.</p>
<h3>For the office</h3>
<p>The office sees the next run, adds pickups and keeps the customer list. The office can also look at what the driver sees and what a customer sees.</p>
<p>The sample screens on this page come from apps for other kinds of business that send vans out. They show the sort of screen we mean. Yours is built around your own round and your own customers.</p>
<p>It can start as one screen for one job and grow from there.</p>
${TRADE_CHANGE}
${TRADE_COST}
${tradeFaq("laboratory")}
<p>We have also built <a href="/window-and-door-software">software for window and door companies</a>. See all the <a href="/industries">industries we build custom apps for</a>.</p>
${CLOSING}
</main>`,
};
