/**
 * Static crawlable body mirrors, baked inside <div id="root"> by the
 * prerender plugin (vite-plugin-prerender-meta.ts), keyed by route path.
 *
 * OpenAI's crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, OAI-AdsBot) and
 * most AI answer engines read raw HTML and never run JavaScript, so an SPA
 * page is an empty body to them; these mirrors give each route real
 * crawlable content. main.tsx uses createRoot, which replaces this content
 * the moment React mounts, so real visitors see the React page.
 *
 * THE ONE RULE: each mirror is a faithful copy of its page component's
 * rendered copy. Same headings, same paragraphs, same list items, word for
 * word. No forms, no buttons, no images, and never text that the rendered
 * page does not carry - different text for crawlers is cloaking. The build
 * enforces this: script/check-prerender-mirrors.ts fails the build if a
 * mirror's text drifts from its page component, so when page copy changes,
 * change the mirror in the same commit.
 *
 * This lives in its own module, NOT in seo-routes.ts, on purpose:
 * seo-routes.ts is bundled into the client (every page imports ROUTE_SEO),
 * and these mirrors are build-time-only bytes that would otherwise ship in
 * the client bundle on every visit. Only the prerender plugin and the
 * mirror check import this file.
 */
/**
 * The AI Employees campaign landers (/ai-employees/<region>) share one
 * template with per-region currency and wording. This is the crawl-mirror
 * twin of REGIONS in client/src/pages/ai-employees.tsx: the head (meta and
 * offer JSON-LD) is generated in seo-routes.ts, the page copy lives in
 * REGIONS, and the mirror copy lives here. Change a region's price or
 * wording in both REGIONS and this table.
 *
 * The template was moved here unchanged from the aiEmployeesRoute factory
 * in seo-routes.ts. It condenses the page around the quote form rather than
 * mirroring paragraph for paragraph, so check-prerender-mirrors.ts exempts
 * these routes from the verbatim-chunk check; the per-region H1 check still
 * applies.
 */
interface AiEmployeesRegionCopy {
  eyebrow: string;
  headline: string;
  priceHeading: string;
  priceBody: string;
  /** Arithmetic on the published price, e.g. "That is about €580 a fortnight." */
  fortnightlyLine: string;
  /** The worst-case exit cost, derived from the published price. */
  exposureLine: string;
}

const AI_EMPLOYEES_MIRRORS: Record<string, AiEmployeesRegionCopy> = {
  ie: {
    eyebrow: "For businesses in Ireland",
    headline: "AI Employees from €15K a year",
    priceHeading: "From €15K a year",
    priceBody:
      "That covers the full custom set-up of one AI employee doing one defined job, and the support to keep it running for the year, paid fortnightly. Priced for businesses in Ireland, and the exact figure is agreed in writing before anything starts.",
    fortnightlyLine: "That is about €580 a fortnight.",
    exposureLine: "At €15K a year, a fair one-month test costs under €1,900.",
  },
  au: {
    eyebrow: "For businesses in Australia",
    headline: "AI Employees from AU$25K a year",
    priceHeading: "From AU$25K a year",
    priceBody:
      "That covers the full custom set-up of one AI employee doing one defined job, and the support to keep it running for the year, paid fortnightly. Priced for businesses in Australia, and the exact figure is agreed in writing before anything starts.",
    fortnightlyLine: "That is about AU$960 a fortnight.",
    exposureLine: "At AU$25K a year, a fair one-month test costs under AU$3,100.",
  },
  uk: {
    eyebrow: "For businesses in the UK",
    headline: "AI Employees from £13K a year",
    priceHeading: "From £13K a year",
    priceBody:
      "That covers the full custom set-up of one AI employee doing one defined job, and the support to keep it running for the year, paid fortnightly. Priced for businesses in the UK, and the exact figure is agreed in writing before anything starts.",
    fortnightlyLine: "That is £500 a fortnight.",
    exposureLine: "At £13K a year, a fair one-month test costs under £1,600.",
  },
  us: {
    eyebrow: "For businesses in the United States",
    headline: "AI Employees from $17K a year",
    priceHeading: "From $17K a year",
    priceBody:
      "That covers the full custom set-up of one AI employee doing one defined job, and the support to keep it running for the year, paid fortnightly. Priced for businesses in the United States, and the exact figure is agreed in writing before anything starts.",
    fortnightlyLine: "That is about $650 a fortnight.",
    exposureLine: "At $17K a year, a fair one-month test costs under $2,150.",
  },
};

function aiEmployeesMirror(r: AiEmployeesRegionCopy): string {
  return `
      <main class="container mx-auto px-6 py-16" style="max-width:48rem">
        <p class="text-sm font-semibold mb-2">${r.eyebrow}</p>
        <h1 class="text-4xl font-display font-bold mb-6">${r.headline}</h1>
        <p class="mb-6">An AI employee here is a system we build that does one named job in your business and keeps doing it. Answering enquiries and writing bookings into the diary. Chasing quotes and invoices. Tracking jobs and writing up the reports. Full custom set-up for your business, by us, not from a template.</p>
        <h2 class="text-xl font-display font-bold mb-2">Works 24/7</h2>
        <p class="mb-6">The system does not clock off. An enquiry that arrives at ten on a Sunday night is answered at ten on a Sunday night, and it is logged where you'll see it Monday morning.</p>
        <h2 class="text-xl font-display font-bold mb-2">Full human support</h2>
        <p class="mb-6">Real people built it and real people look after it. When something needs changing, you tell us and it gets changed. Support hours and response times are agreed in writing as part of the set-up.</p>
        <h2 class="text-xl font-display font-bold mb-2">${r.priceHeading}</h2>
        <p class="mb-6">${r.priceBody} ${r.fortnightlyLine}</p>
        <p class="mb-2"><strong>Minimum one month.</strong> Long enough to prove it, short enough to be a fair test.</p>
        <p class="mb-2"><strong>Paid fortnightly.</strong> Like the rest of the payroll. No big figure up front.</p>
        <p class="mb-6"><strong>No lock-in contract.</strong> After the first month you can stop with two weeks' notice. ${r.exposureLine}</p>
        <p class="mb-6">There is also a smaller one-off build, from €3,900, where you get a tool and your team runs it. An AI employee is the other way round: the system does the job itself, and we look after it for the year.</p>
        <p class="mb-6">Your data stays yours: encrypted storage, strict access controls, isolated environments, your IP remains yours, and AI components do not train on or share your data.</p>
        <p class="mb-6">Get a quote on this page, book a call, or email peter@streamlinedai.tech. Streamlined Tech was founded by Pete Harris in Galway, Ireland, and builds and runs AutoListing.io and Rangplan.ie.</p>
      </main>`;
}

function aiEmployeesMirrors(): Record<string, string> {
  return Object.fromEntries(
    Object.entries(AI_EMPLOYEES_MIRRORS).map(([region, copy]) => [`/ai-employees/${region}`, aiEmployeesMirror(copy)]),
  );
}

export const STATIC_HTML: Record<string, string> = {
  "/": `
    <main class="container mx-auto px-6 py-16" style="max-width:48rem">
      <h1 class="text-4xl font-display font-bold mb-6">We set your business up with AI.</h1>
      <p class="mb-4">Custom internal apps and automation that answer the enquiries, write bookings into the diary, track the jobs and do the reports without anyone chasing. Based in Galway, working with Irish businesses and with Australian operations.</p>
      <p class="mb-4">The price is agreed in writing before anything starts.</p>
      <p class="mb-4">In Australian mining or construction? <a href="/australia" class="underline">Your page is here.</a></p>
      <p class="mb-4">If you got here from the AI Employees ad: that is our yearly agreement, full custom set-up for your business with human support. <a href="/ai-employees/ie" class="underline">Here is the full page.</a></p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Find the page for your line of work</h2>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Running a business in Ireland</h3>
      <p class="mb-2">Vehicle testing, alarms and fire, tree care, windows, cleaning, trades and services. The admin jobs that go with them, handled by a system instead of your evenings.</p>
      <p class="mb-4"><a href="/business" class="underline">See the Irish services page</a></p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Construction and heavy industry</h3>
      <p class="mb-2">Jobs, dockets, timesheets and walkaround checks off paper, for contractor crews in Ireland.</p>
      <p class="mb-4"><a href="/contractors" class="underline">See the contractors page</a></p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Solar, heat pump and retrofit installers</h3>
      <p class="mb-2">Grant packs, forms and job packs handled, so the paperwork keeps up with the installs.</p>
      <p class="mb-4"><a href="/installers" class="underline">See the installers page</a></p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Mining and construction in Australia</h3>
      <p class="mb-2">Progress tracking, defects and close-out for site crews. Built by an Australian who has stood on those sites.</p>
      <p class="mb-4"><a href="/australia" class="underline">See the Australia page</a></p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">The jobs we take off your plate</h2>
      <p class="mb-4">These are the usual suspects. Every build is designed around your specific operation, so treat them as examples rather than a menu.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Chasing quotes and invoices</h3>
      <p class="mb-4">Quotes followed up after you send them. Invoices chased politely until they're paid.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Scheduling and reminders</h3>
      <p class="mb-4">Jobs, crews and bookings that write straight into the diary, with reminders that reduce no-shows.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Renewals and expiry dates</h3>
      <p class="mb-4">Insurance, certs, service-due dates and test dates. Reminders go out on time, every time.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Enquiries answered</h3>
      <p class="mb-4">Enquiries answered and logged without anyone sitting on the inbox, whatever hour they arrive.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Timesheets, dockets and sign-offs</h3>
      <p class="mb-4">Filled in from the phone and filed where the office can see them, not living on paper in the van.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Your week's numbers</h3>
      <p class="mb-4">One screen with the numbers that matter. No spreadsheet wrangling on a Sunday night.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Real systems, already built</h2>
      <p class="mb-2">Staff certs and training tracked before the audit asks.</p>
      <p class="mb-2">Bookings and jobs that write themselves into the diary.</p>
      <p class="mb-2">The week's numbers on one screen, updated automatically.</p>
      <p class="mb-4">Orders and new client details captured once, typed never.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Software we build and run ourselves</h2>
      <p class="mb-4">You're not buying a slide deck. These are our own products, live with customers, billing and uptime to keep. The systems we'd build for you are the same kind we run for ourselves.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">AutoListing.io</h3>
      <p class="mb-2">Turns a property listing into ready-to-post social content for estate agents, scheduled out on autopilot. A paid subscription product in Ireland, the UK and the US.</p>
      <p class="mb-4"><a href="https://autolisting.io" class="underline">autolisting.io</a></p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Rangplan.ie</h3>
      <p class="mb-2">A planning app for Irish primary school teachers, built around how Irish schools actually plan. Live and in teachers' hands.</p>
      <p class="mb-4"><a href="https://rangplan.ie" class="underline">rangplan.ie</a></p>
      <p class="mb-4"><a href="/products" class="underline">More on both, on the products page</a></p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">How you start</h2>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">A fifteen minute call</h3>
      <p class="mb-4">You tell us where the hours are going. If a build will not pay for itself, you'll hear that on the call.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">A price in writing</h3>
      <p class="mb-4">What the system will do and what it costs, agreed before anything is built.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">One workflow working end to end</h3>
      <p class="mb-4">Your team runs it on real work, and you expand only when it has earned it.</p>
      <p class="mb-4">The longer answer on cost and timeline is on <a href="/how-it-works" class="underline">the how it works page</a>.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">You deal with me, not an agency</h2>
      <p class="mb-4">I'm Pete Harris, the founder and the builder. No account managers, no offshore team, no layers.</p>
      <p class="mb-4">I've spent 20+ years in heavy industries and construction, from on the tools to training package production and now building the software. That is why the work holds up: I can read an operation, not just write code for one.</p>
      <p class="mb-4">Australian, now based in Galway. <a href="/australia" class="underline">How that works for Australian sites</a>.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Your data stays yours</h2>
      <p class="mb-4">Modern, enterprise-grade security practices: secure authentication, encrypted data storage, and strict access controls.</p>
      <p class="mb-4">Your systems run in isolated environments, your IP remains yours, and AI components do not train on or share your data.</p>

      <p class="mb-2"><strong>As AI advances, so will you.</strong></p>
      <p class="mb-4">The AI underneath these systems gets better every few months. Because I build on it every day, the systems keep improving, and so does what your team can do with them. You are not buying a snapshot, you are buying a direction.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Tell me where the hours are going</h2>
      <p class="mb-4">One job or the whole operation, fifteen minutes on the phone will tell us both whether it's worth doing. If it isn't, I'll say so.</p>
      <p class="mb-4">Or email <a href="mailto:peter@streamlinedai.tech" class="underline">peter@streamlinedai.tech</a></p>
    </main>`,

  "/business": `
    <main class="container mx-auto px-6 py-16" style="max-width:48rem">
      <p class="text-sm font-semibold mb-2">Based in Galway. Working across Ireland.</p>
      <h1 class="text-4xl font-display font-bold mb-6">Grow your business without hiring more people.</h1>
      <p class="mb-4">I'm Pete Harris, founder of Streamlined Tech, based here in Galway.</p>
      <p class="mb-4">I help businesses adopt AI. That means custom internal apps that take the admin out of the day, the chasing, the reminders, the rekeying, the reporting, in the office and out in the field, and a team that knows how to use AI to multiply its own output. It can start with one workflow to prove the idea, or a full review of how your operation runs with custom systems built around it.</p>
      <p class="mb-4">15 minute chat. No hard sell.</p>
      <p class="mb-4">And if you're nearby, I'm happy to call in instead.</p>
      <p class="mb-4">In construction or heavy industry? <a href="/contractors" class="underline">See what an internal app looks like on your jobs</a></p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">The jobs I take off your plate</h2>
      <p class="mb-4">Most businesses lose hours every week to the same handful of admin jobs. These are the usual suspects, and in a bigger operation there are normally a dozen more sitting behind them. Every build is designed around your specific operation, so treat these as examples rather than a menu. Taking them off your people does two things: it frees the hours a new hire would have covered, and it frees up your team's headspace for the work that actually needs a person.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Chasing quotes and invoices</h3>
      <p class="mb-4">Quotes followed up after you send them. Invoices chased politely until they're paid.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Scheduling and reminders</h3>
      <p class="mb-4">Jobs, crews and bookings that write straight into the diary, with reminders that reduce no-shows.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Renewals and expiry dates</h3>
      <p class="mb-4">NCT, CVRT, insurance, certs, service-due dates. Reminders go out on time, every time.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Orders without rekeying</h3>
      <p class="mb-4">Orders land in a list your team works from, not on the answering machine or a PDF form.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Timesheets, dockets and sign-offs</h3>
      <p class="mb-4">Filled in from the phone and filed where the office can see them, not living on paper in the van.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Your week's numbers</h3>
      <p class="mb-4">One screen with the numbers that matter. No spreadsheet wrangling on a Sunday night.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Real systems, already built</h2>
      <p class="mb-2">Staff certs and training tracked before the audit asks.</p>
      <p class="mb-2">Bookings and jobs that write themselves into the diary.</p>
      <p class="mb-2">The week's numbers on one screen, updated automatically.</p>
      <p class="mb-2">Orders and new client details captured once, typed never.</p>
      <p class="mb-2">Renewals and expiry dates tracked from the phone.</p>
      <p class="mb-4">Dockets and paperwork photographed, filed, and followed up.</p>

      <p class="mb-2"><strong>Before</strong></p>
      <ul class="list-disc pl-6 mb-4">
        <li>Evenings lost to invoicing and paperwork</li>
        <li>Quotes sent out and never followed up</li>
        <li>The diary lives in someone's head</li>
        <li>Deadline scrambles for documents and certs</li>
        <li>Everything on the phone, nothing written down</li>
      </ul>
      <p class="mb-2"><strong>After</strong></p>
      <ul class="list-disc pl-6 mb-4">
        <li>Admin runs itself in the background</li>
        <li>Every quote followed up, every time</li>
        <li>Bookings and reminders happen automatically</li>
        <li>Documents collected ahead of the deadline</li>
        <li>You see the whole week on one screen</li>
      </ul>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Two ways to work with me</h2>
      <p class="mb-4">Same builder either way. The difference is how much of the business you want to put under the microscope on day one.</p>
      <p class="mb-2">Low risk start</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Fix one job first</h3>
      <p class="mb-4">Pick the single job that eats the most time. I build that one thing for a price agreed before we start, and it is usually working end to end inside a week or two.</p>
      <p class="mb-4">This is what I suggest to most new clients, and it is a suggestion rather than a limit. It gets automation into the business without disrupting how your team works, and it lets you judge me on something real before you commit to anything larger.</p>
      <ul class="list-disc pl-6 mb-4">
        <li>One workflow, one fixed price</li>
        <li>Working inside a week or two</li>
        <li>No disruption to the team</li>
        <li>You expand only if it earns it</li>
      </ul>
      <p class="mb-2">Full engagement</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Or take the whole operation apart</h3>
      <p class="mb-4">A full audit of how work actually moves through your business, department by department: where the hours go, what gets rekeyed, what gets missed, what a system should own instead of a person.</p>
      <p class="mb-4">You get a prioritised plan of what to automate and in what order, then I build it. Custom software designed around how you already work, not an off-the-shelf tool you have to bend your process around. And along the way I teach your staff to use AI themselves, so the gains keep compounding after I'm gone. This is a programme of work measured in months, not a one week fix.</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Full operational audit, floor to office</li>
        <li>Prioritised plan, costed before anything is built</li>
        <li>Custom systems across the business, not templates</li>
        <li>Your staff taught to use AI, not left dependent on me</li>
        <li>Built and maintained by the person who audited you</li>
      </ul>
      <p class="mb-4">Most clients start on the left and move to the right once the first build has paid for itself. You are welcome to start on either.</p>

      <h3 class="text-lg font-display font-semibold mt-6 mb-2">What it costs</h3>
      <p class="mb-4">The price is agreed before anything starts. To give you an idea:</p>
      <ul class="list-disc pl-6 mb-4">
        <li><strong>One workflow, built end to end</strong>: from €3,900, usually working inside two weeks</li>
        <li><strong>A bigger piece across a few connected jobs</strong>: €6,500 to €9,500</li>
        <li><strong>A full review of how work moves through the business, with the systems built around it</strong>: priced after the review</li>
      </ul>
      <p class="mb-4">The longer answer on cost and timeline is on <a href="/how-it-works" class="underline">the how it works page</a>. New to AI altogether? Start with <a href="/guide/set-up-ai-for-business-ireland" class="underline">the plain-English guide to setting up AI</a>.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">You deal with me, not an agency</h2>
      <p class="mb-4">I'm the founder and the builder. No account managers, no offshore team, no layers.</p>
      <p class="mb-4">I've spent 20+ years in heavy industries and construction, from on the tools to training package production and now building the software, on sites where the paperwork was the bottleneck. That is why the audit work is worth having: I can read an operation, not just write code for one.</p>
      <p class="mb-4">I also build and run my own software company, <a href="https://autolisting.io" class="underline">AutoListing.io</a>, a full production platform that automates property marketing for real estate agents every day. It is not a demo. It has customers, billing, and uptime to keep.</p>
      <p class="mb-4">So the systems I'd build for you are the same kind I build and run for myself.</p>

      <p class="mb-2"><strong>As AI advances, so will you.</strong></p>
      <p class="mb-4">The AI underneath these systems gets better every few months. Because I build on it every day, the systems keep improving, and so does what your team can do with them. You are not buying a snapshot, you are buying a direction.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Where I work</h2>
      <p class="mb-4">I'm based in Galway and work across the west, the Mid-West and the midlands, on site:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Galway city</li><li>Oranmore</li><li>Athenry</li><li>Tuam</li><li>Loughrea</li><li>Ballinasloe</li><li>Ennis</li><li>Shannon</li><li>Limerick</li><li>Athlone</li><li>Roscommon</li><li>Castlebar</li>
      </ul>
      <p class="mb-4">Anywhere else in Ireland works too, remotely or by travelling to you for the parts that need me in the room. Being on site matters most during an audit, when I need to stand where the work actually happens and watch it.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Your data stays yours</h2>
      <p class="mb-4">Modern, enterprise-grade security practices: secure authentication, encrypted data storage, and strict access controls.</p>
      <p class="mb-4">Your systems run in isolated environments, your IP remains yours, and AI components do not train on or share your data.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Tell me where the hours are going</h2>
      <p class="mb-4">One job or the whole operation, fifteen minutes on the phone will tell us both whether it's worth doing. If it isn't, I'll say so.</p>
      <p class="mb-4">Or email <a href="mailto:peter@streamlinedai.tech" class="underline">peter@streamlinedai.tech</a></p>
    </main>`,

  "/contractors": `
    <main class="container mx-auto px-6 py-16" style="max-width:48rem">
      <p class="text-sm font-semibold mb-2">Galway based. On sites across Ireland.</p>
      <h1 class="text-4xl font-display font-bold mb-4">Custom internal apps for construction and heavy industry.</h1>
      <p class="mb-4"><strong>Grow the fleet without growing the office.</strong></p>
      <p class="mb-4">I'm Pete Harris, founder of Streamlined Tech. 20+ years in heavy industries and construction, from on the tools to training package production and now building the software. You deal with me directly.</p>
      <p class="mb-4">15 minute chat. No hard sell.</p>
      <p class="mb-4">And if you're nearby, I'm happy to call in instead.</p>
      <p class="mb-4">You already know AI could be taking work off your plate. The hard part is knowing where to start. <strong>That's what we do.</strong></p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Designed around your specific needs</h2>
      <p class="mb-4">No two operations run the same way, so every build is custom. For example, your app could:</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Every job on one screen</h3>
      <p class="mb-4">From booked to done, visibly moving or visibly stuck, across every crew.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">The full job pack in the crew's hand</h3>
      <p class="mb-4">JHA, SOP, job description, contacts, job history and the pre-start checklist, all on the phone before they leave the yard.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Follow-ups that send themselves</h3>
      <p class="mb-4">Quotes chased, invoices chased, reminders out on time, so nobody is ringing around.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Dockets, timesheets and sign-offs</h3>
      <p class="mb-4">Filled in from the phone and filed where the office can see them, off paper for good.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Pre-starts and safety checks</h3>
      <p class="mb-4">Answered from the cab and stored where the auditor can find them.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Service and cert dates</h3>
      <p class="mb-4">CVRT, insurance, calibrations and service-due dates that flag themselves before they bite.</p>
      <p class="mb-4">We work with you to identify the best tasks to start automating with your app for the biggest return. We specialise in making complex systems simple and as automated as possible.</p>

      <p class="mb-2"><strong>It's your app. Built around how you already run jobs. You stay in control.</strong></p>
      <p class="mb-4">Your internal app can become the central hub of all operations.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Real systems, already built</h2>
      <p class="mb-2">Crews and jobs that write themselves into the schedule.</p>
      <p class="mb-2">Crew tickets and training tracked before the audit asks.</p>
      <p class="mb-2">The week's numbers on one screen, updated automatically.</p>
      <p class="mb-2">Orders and job requests captured once, typed never.</p>
      <p class="mb-2">CVRT, insurance and service dates tracked from the phone.</p>
      <p class="mb-4">Dockets photographed, filed, and followed up.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Two ways to work with me</h2>
      <p class="mb-4">Same builder either way. The difference is how much of the operation you want to put under the microscope on day one.</p>
      <p class="mb-2">Low risk start</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Start with one job</h3>
      <p class="mb-4">Pick the single job that eats the most time. I build that one thing for a price agreed before we start, and it is usually working end to end inside a week or two.</p>
      <p class="mb-4">This is what I suggest to most new clients, and it is a suggestion rather than a limit. It gets automation into the business without disrupting how your crews work, and it lets you judge me on something real before you commit to anything larger.</p>
      <ul class="list-disc pl-6 mb-4">
        <li>One workflow, one fixed price</li>
        <li>Working inside a week or two</li>
        <li>No disruption to the crews</li>
        <li>You expand only if it earns it</li>
      </ul>
      <p class="mb-2">Full engagement</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Or take the whole operation apart</h3>
      <p class="mb-4">A full audit of how work actually moves through your operation, yard to site to office: where the hours go, what gets rekeyed, what gets missed, what a system should own instead of a person.</p>
      <p class="mb-4">You get a prioritised plan of what to automate and in what order, then I build it. Custom software designed around how you already work, not an off-the-shelf tool you have to bend your process around. And along the way I teach your staff to use AI themselves, so the gains keep compounding after I'm gone. This is a programme of work measured in months, not a one week fix.</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Full operational audit, site to office</li>
        <li>Prioritised plan, costed before anything is built</li>
        <li>Custom systems across the business, not templates</li>
        <li>Your staff taught to use AI, not left dependent on me</li>
        <li>Built and maintained by the person who audited you</li>
      </ul>
      <p class="mb-4">Most clients start on the left and move to the right once the first build has paid for itself. You are welcome to start on either.</p>

      <h3 class="text-lg font-display font-semibold mt-6 mb-2">What it costs</h3>
      <p class="mb-4">The price is agreed before anything starts. To give you an idea:</p>
      <ul class="list-disc pl-6 mb-4">
        <li><strong>One workflow, built end to end</strong>: from €3,900, usually working inside two weeks</li>
        <li><strong>A bigger piece across a few connected jobs</strong>: €6,500 to €9,500</li>
        <li><strong>A full review of how work moves through the operation, with the systems built around it</strong>: priced after the review</li>
      </ul>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">You deal with me, not an agency</h2>
      <p class="mb-4">I'm the founder and the builder. No account managers, no offshore team, no layers.</p>
      <p class="mb-4">I've spent 20+ years in heavy industries and construction, from on the tools to training package production and now building the software, on sites where the paperwork was the bottleneck. That is why the audit work is worth having: I can read an operation, not just write code for one.</p>
      <p class="mb-4">I also build and run my own software company, <a href="https://autolisting.io" class="underline">AutoListing.io</a>, a full production platform that automates property marketing for real estate agents every day. It is not a demo. It has customers, billing, and uptime to keep.</p>
      <p class="mb-4">So the systems I'd build for you are the same kind I build and run for myself.</p>

      <p class="mb-2"><strong>As AI advances, so will you.</strong></p>
      <p class="mb-4">The AI underneath these systems gets better every few months. Because I build on it every day, the systems keep improving, and so does what your team can do with them. You are not buying a snapshot, you are buying a direction.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Where I work</h2>
      <p class="mb-4">I'm based in Galway and work across the west, the Mid-West and the midlands, on site:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Galway city</li><li>Oranmore</li><li>Athenry</li><li>Tuam</li><li>Loughrea</li><li>Ballinasloe</li><li>Ennis</li><li>Shannon</li><li>Limerick</li><li>Athlone</li><li>Roscommon</li><li>Castlebar</li>
      </ul>
      <p class="mb-4">Anywhere else in Ireland works too, remotely or by travelling to you for the parts that need me in the room. Being on site matters most during an audit, when I need to stand where the work actually happens and watch it.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Your data stays yours</h2>
      <p class="mb-4">Modern, enterprise-grade security practices: secure authentication, encrypted data storage, and strict access controls.</p>
      <p class="mb-4">Your systems run in isolated environments, your IP remains yours, and AI components do not train on or share your data.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Tell me where the hours are going</h2>
      <p class="mb-4">One job or the whole operation, fifteen minutes on the phone will tell us both whether it's worth doing. If it isn't, I'll say so.</p>
      <p class="mb-4">Or call 085 190 5252, or email <a href="mailto:peter@streamlinedai.tech" class="underline">peter@streamlinedai.tech</a></p>
    </main>`,

  "/installers": `
    <main class="container mx-auto px-6 py-16" style="max-width:48rem">
      <p class="text-sm font-semibold mb-2">Galway based. Working with installers across Ireland.</p>
      <h1 class="text-4xl font-display font-bold mb-4">Custom internal apps for solar and home energy upgrade installers.</h1>
      <p class="mb-4"><strong>More jobs on the books without more hours in the office.</strong></p>
      <p class="mb-4">I'm Pete Harris, founder of Streamlined Tech. 20+ years in heavy industries and construction, from on the tools to training package production and now building the software. You deal with me directly.</p>
      <p class="mb-4">15 minute chat. No hard sell.</p>
      <p class="mb-4">And if you're nearby, I'm happy to call in instead.</p>
      <p class="mb-4">You already know AI could be taking work off your plate. The hard part is knowing where to start. <strong>That's what we do.</strong></p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Designed around your specific needs</h2>
      <p class="mb-4">No two operations run the same way, so every build is custom. For example, your app could:</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Every enquiry, quote and job on one screen</h3>
      <p class="mb-4">From first contact to grant paid, visibly moving or visibly stuck, with any quote that has gone quiet flagged before it is lost.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">The grant pack builds itself as the job goes</h3>
      <p class="mb-4">BER, forms, photos and certs collected per job, with the app chasing whoever owes the next piece so the pack goes in complete.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Enquiries that arrive ready to quote</h3>
      <p class="mb-4">Roof photos, MPRN, build year and the measures wanted captured up front, so fewer wasted site visits and less phone tennis.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">NC6 and NC7 filed, every install</h3>
      <p class="mb-4">The ESB Networks notification raised from the job record, so it never gets forgotten between the roof and the office.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">The job pack in the crew's hand</h3>
      <p class="mb-4">Survey, roof plan, MPRN, grant offer, customer contact and the commissioning checklist on the phone before the van leaves the yard, with sign-offs done on site and filed.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">The clocks that bite</h3>
      <p class="mb-4">Grant offer validity, warranty and service visits, and cert renewals that flag themselves before they run out.</p>
      <p class="mb-4">We work with you to identify the best tasks to start automating with your app for the biggest return. We specialise in making complex systems simple and as automated as possible.</p>

      <p class="mb-2"><strong>It's your app. Built around how you already run jobs. You stay in control.</strong></p>
      <p class="mb-4">Your internal app can become the central hub of all operations.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Real systems, already built</h2>
      <p class="mb-2">Surveys and installs that write themselves into the schedule.</p>
      <p class="mb-2">Installer certs and training tracked before the audit asks.</p>
      <p class="mb-2">The week's numbers on one screen, updated automatically.</p>
      <p class="mb-2">Enquiries captured once, quote sent, never retyped.</p>
      <p class="mb-2">Grant offer, warranty and cert dates tracked from the phone.</p>
      <p class="mb-4">Install photos captured, NC6 filed, BER received, pack ready.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Two ways to work with me</h2>
      <p class="mb-4">Same builder either way. The difference is how much of the operation you want to put under the microscope on day one.</p>
      <p class="mb-2">Low risk start</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Start with one job</h3>
      <p class="mb-4">Pick the single job that eats the most time. I build that one thing for a price agreed before we start, and it is usually working end to end inside a week or two.</p>
      <p class="mb-4">This is what I suggest to most new clients, and it is a suggestion rather than a limit. It gets automation into the business without disrupting how your crews work, and it lets you judge me on something real before you commit to anything larger.</p>
      <ul class="list-disc pl-6 mb-4">
        <li>One workflow, one fixed price</li>
        <li>Working inside a week or two</li>
        <li>No disruption to the crews</li>
        <li>You expand only if it earns it</li>
      </ul>
      <p class="mb-2">Full engagement</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Or take the whole operation apart</h3>
      <p class="mb-4">A full audit of how work actually moves through your operation, yard to site to office: where the hours go, what gets rekeyed, what gets missed, what a system should own instead of a person.</p>
      <p class="mb-4">You get a prioritised plan of what to automate and in what order, then I build it. Custom software designed around how you already work, not an off-the-shelf tool you have to bend your process around. And along the way I teach your staff to use AI themselves, so the gains keep compounding after I'm gone. This is a programme of work measured in months, not a one week fix.</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Full operational audit, site to office</li>
        <li>Prioritised plan, costed before anything is built</li>
        <li>Custom systems across the business, not templates</li>
        <li>Your staff taught to use AI, not left dependent on me</li>
        <li>Built and maintained by the person who audited you</li>
      </ul>
      <p class="mb-4">Most clients start on the left and move to the right once the first build has paid for itself. You are welcome to start on either.</p>

      <h3 class="text-lg font-display font-semibold mt-6 mb-2">What it costs</h3>
      <p class="mb-4">The price is agreed before anything starts. To give you an idea:</p>
      <ul class="list-disc pl-6 mb-4">
        <li><strong>One workflow, built end to end</strong>: from €3,900, usually working inside two weeks</li>
        <li><strong>A bigger piece across a few connected jobs</strong>: €6,500 to €9,500</li>
        <li><strong>A full review of how work moves through the operation, with the systems built around it</strong>: priced after the review</li>
      </ul>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">You deal with me, not an agency</h2>
      <p class="mb-4">I'm the founder and the builder. No account managers, no offshore team, no layers.</p>
      <p class="mb-4">I've spent 20+ years in heavy industries and construction, from on the tools to training package production and now building the software, on sites where the paperwork was the bottleneck. That is why the audit work is worth having: I can read an operation, not just write code for one.</p>
      <p class="mb-4">I also build and run my own software company, <a href="https://autolisting.io" class="underline">AutoListing.io</a>, a full production platform that automates property marketing for real estate agents every day. It is not a demo. It has customers, billing, and uptime to keep.</p>
      <p class="mb-4">So the systems I'd build for you are the same kind I build and run for myself.</p>

      <p class="mb-2"><strong>As AI advances, so will you.</strong></p>
      <p class="mb-4">The AI underneath these systems gets better every few months. Because I build on it every day, the systems keep improving, and so does what your team can do with them. You are not buying a snapshot, you are buying a direction.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Where I work</h2>
      <p class="mb-4">I'm based in Galway and work across the west, the Mid-West and the midlands, on site:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Galway city</li><li>Oranmore</li><li>Athenry</li><li>Tuam</li><li>Loughrea</li><li>Ballinasloe</li><li>Ennis</li><li>Shannon</li><li>Limerick</li><li>Athlone</li><li>Roscommon</li><li>Castlebar</li>
      </ul>
      <p class="mb-4">Anywhere else in Ireland works too, remotely or by travelling to you for the parts that need me in the room. Being on site matters most during an audit, when I need to stand where the work actually happens and watch it.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Your data stays yours</h2>
      <p class="mb-4">Modern, enterprise-grade security practices: secure authentication, encrypted data storage, and strict access controls.</p>
      <p class="mb-4">Your systems run in isolated environments, your IP remains yours, and AI components do not train on or share your data.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Tell me where the hours are going</h2>
      <p class="mb-4">One job or the whole operation, fifteen minutes on the phone will tell us both whether it's worth doing. If it isn't, I'll say so.</p>
      <p class="mb-4">Or call 085 190 5252, or email <a href="mailto:peter@streamlinedai.tech" class="underline">peter@streamlinedai.tech</a></p>
    </main>`,

  "/australia": `
    <main class="container mx-auto px-6 py-16" style="max-width:48rem">
      <p class="text-sm font-semibold mb-2">For Australian mining and construction</p>
      <h1 class="text-4xl font-display font-bold mb-5">Internal apps that keep the job moving.</h1>
      <p class="mb-4">Most of the value is not in a chatbot. It is in the ordinary systems that track progress, close out defects and chase the follow-ups, so work stops stalling between steps.</p>
      <p class="mb-4">Custom built for how your site already runs, then developed further as the work changes.</p>
      <p class="mb-4">Calls booked to suit Australian hours.</p>
      <p class="mb-4">If you got here from the Handy video: yes, we build assistants like Handy too, ones that answer off your own run sheets and manuals. They work best on top of the kind of systems below.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Everyone is selling you an assistant</h2>
      <p class="mb-4">It is the easiest thing to demo. You ask it a question, it gives you an answer, and the room nods. We build them too, and a good one is genuinely useful.</p>
      <p class="mb-4">It is rarely the thing that changes your Monday. What changes your Monday is duller: knowing which jobs are stuck, who is holding them and what happens next, without a supervisor spending half a shift ringing around to find out.</p>
      <p class="mb-4">That is the work we specialise in. Internal apps built around one operation, kept running and extended over time.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">The unglamorous list</h2>
      <p class="mb-4">None of this is exciting to look at. It is what takes the admin load off a site.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Progress tracking that matches the real job</h3>
      <p class="mb-4">One place that shows what is done, what is open and what is waiting on someone else. Built around your stages and your language, not a template you have to bend to fit.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Defects, NCRs and close-out</h3>
      <p class="mb-4">Raised on a phone in the field, moved through the trades automatically, closed out with the evidence attached. The audit trail builds itself as the work happens.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Follow-ups that happen without chasing</h3>
      <p class="mb-4">The system contacts the next person when it is their turn. Your supervisors stop spending their afternoon ringing around to find out where something got to.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Reporting that writes itself</h3>
      <p class="mb-4">Daily and weekly reporting generated from what was already captured, so nobody rebuilds it from scratch in a spreadsheet on Sunday night.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Handovers and approvals</h3>
      <p class="mb-4">Packs assembled from the record rather than compiled by hand, and approvals that move without sitting in somebody's inbox.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Assistants, where they earn their place</h3>
      <p class="mb-4">An assistant trained on your gear, procedures and history is genuinely useful for answering questions on site. It works best sitting on top of systems that already hold good data.</p>

      <p class="text-sm font-semibold mt-10 mb-2">A worked example</p>
      <h2 class="text-2xl font-display font-bold mb-3">A defects tracker, built for one operation</h2>
      <p class="mb-4">Defects do not cost money because they are hard to fix. They cost money because they stall between steps. Responsibility goes unclear, a contractor gets called to site before the work is ready for them, an inspection slips, and the status only becomes obvious once the time is already lost.</p>
      <p class="mb-4">So the app does one job. It moves a defect from the moment somebody spots it to final sign off, and it makes stalling impossible to ignore.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Only the essential fields</h3>
      <p class="mb-4">Raised in seconds with a photo, on a phone, with gloves on. Nothing is asked for that somebody else could fill in later.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">It moves itself</h3>
      <p class="mb-4">The system contacts the next person when it is their turn. Your site staff are not the ones doing the chasing.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Nothing hides</h3>
      <p class="mb-4">Every defect is visibly moving or visibly stuck. If one is not moving, it is immediately obvious why.</p>
      <p class="mb-2">What it is, and what it is not</p>
      <p class="mb-2"><strong>What it is</strong></p>
      <ul class="list-disc pl-6 mb-4">
        <li>A custom tool specific to one operation</li>
        <li>A movement and accountability layer</li>
        <li>Something a chaotic site gets calmer with</li>
      </ul>
      <p class="mb-2"><strong>What it is not</strong></p>
      <ul class="list-disc pl-6 mb-4">
        <li>Document control</li>
        <li>Finance or claims</li>
        <li>Another enterprise platform to administer</li>
        <li>A generic one size fits all</li>
      </ul>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Why it gets used</h2>
      <p class="mb-4">Software usually fails on site because it asks for too much. Adoption happens because the thing makes someone's day easier, not because it was mandated in a meeting they were not in.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Fast enough to use standing up</h3>
      <p class="mb-4">Gloves on, one hand, in the weather. If it takes longer than the old way, it will not get used and no policy will fix that.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Photo first</h3>
      <p class="mb-4">Capture the evidence, type as little as possible. A photo says more than a paragraph and takes a fraction of the time.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">No training day required</h3>
      <p class="mb-4">It behaves like the apps people already use on their own phones, so the rollout is not a project in itself.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Plain language</h3>
      <p class="mb-4">Fixes, not tickets or issues. The words on screen should be the words used on site.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">The build is where it starts</h2>
      <p class="mb-4">A one off delivery gets handed over and slowly stops matching the job. These systems are meant to be lived in, so they are built in stages and kept developing after they land.</p>
      <p class="text-sm font-semibold mt-6 mb-1">Pilot</p>
      <h3 class="text-lg font-display font-semibold mb-2">One site, one problem</h3>
      <ul class="list-disc pl-6 mb-4">
        <li>A single site and selected trades</li>
        <li>One workflow, scoped tight</li>
        <li>Rapid iteration while people use it</li>
      </ul>
      <p class="text-sm font-semibold mt-6 mb-1">Review</p>
      <h3 class="text-lg font-display font-semibold mb-2">Adjusted to what actually happened</h3>
      <ul class="list-disc pl-6 mb-4">
        <li>Changed against real field feedback</li>
        <li>Workflows refined, thresholds set</li>
        <li>Widened once it is earning its keep</li>
      </ul>
      <p class="text-sm font-semibold mt-6 mb-1">Ongoing</p>
      <h3 class="text-lg font-display font-semibold mb-2">It keeps developing</h3>
      <ul class="list-disc pl-6 mb-4">
        <li>Rolled out across projects</li>
        <li>Repeat patterns surfaced from the data</li>
        <li>New capability added as the work changes</li>
      </ul>

      <p class="mb-2"><strong>As AI advances, so will you.</strong></p>
      <p class="mb-4">The AI underneath these systems gets better every few months. Because I build on it every day, the systems keep improving, and so does what your team can do with them. You are not buying a snapshot, you are buying a direction.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">You deal with me, not an agency</h2>
      <p class="mb-4">I'm Pete Harris. Australian, now based in Ireland, and I still do most of my work with Australian operations. No account managers, no offshore team, no layers between you and the person building it.</p>
      <p class="mb-4">I've spent 20+ years around mining and construction, from on the tools to training package production and now building the software, on sites where the paperwork was the bottleneck. That is why this work is worth having from me: I can read an operation, not just write code for one.</p>
      <p class="mb-4">I also build and run my own software company, <a href="https://autolisting.io" class="underline">AutoListing.io</a>, a full production platform with customers, billing and uptime to keep. So the systems I'd build for you are the same kind I build and run for myself.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Working with Australian operations</h2>
      <p class="mb-4">The work is done remotely, which is already how most Australian sites run their support functions. Calls get booked to land inside your business hours rather than mine.</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Perth</li><li>Pilbara</li><li>Karratha</li><li>Port Hedland</li><li>Kalgoorlie</li><li>Darwin</li><li>Brisbane</li><li>Mackay</li><li>Bowen Basin</li><li>Gladstone</li><li>Hunter Valley</li><li>Newcastle</li>
      </ul>
      <p class="mb-4">FIFO rosters, multiple sites and head office all pulling on the same information is the normal starting point, not a complication.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Your data stays yours</h2>
      <p class="mb-4">Modern, enterprise-grade security practices: secure authentication, encrypted data storage, and strict access controls.</p>
      <p class="mb-4">Your systems run in isolated environments, your IP remains yours, and AI components do not train on or share your data.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Tell me where the job keeps stalling</h2>
      <p class="mb-4">One workflow or the whole operation, fifteen minutes on the phone will tell us both whether it's worth doing. If it isn't, I'll say so.</p>
      <p class="mb-4">Or email <a href="mailto:peter@streamlinedai.tech" class="underline">peter@streamlinedai.tech</a></p>
    </main>`,

  "/products": `
    <main class="container mx-auto px-6 py-16" style="max-width:48rem">
      <h1 class="text-4xl font-display font-bold mb-6">Software we build and run</h1>
      <p class="mb-4">Custom apps for clients are one half of the work. The other half is our own products, live and paid for, with customers, billing and uptime to keep. They are the proof behind the client work.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">AutoListing.io</h2>
      <p class="mb-4">AutoListing takes a property listing and turns it into ready-to-post social content for the agent, scheduled out on autopilot. An agent adds the listing once and the posts, images and videos for it are generated and lined up without anyone sitting down to make them.</p>
      <p class="mb-4">It is a paid subscription product for estate and letting agents, priced at €115 a month in Ireland, £100 in the UK and $130 a month in the US. Real customers, real billing, real uptime to keep.</p>
      <p class="mb-4"><a href="https://autolisting.io" class="underline">autolisting.io</a></p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Rangplan.ie</h2>
      <p class="mb-4">Rang is a planning app for Irish primary school teachers. Fortnightly plans, long term plans and the monthly report, structured the way Irish schools actually plan, so the paperwork side of teaching takes less of the evening.</p>
      <p class="mb-4">Built alongside practising teachers and live at <a href="https://rangplan.ie" class="underline">rangplan.ie</a>.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Why this matters if you're hiring us</h2>
      <p class="mb-4">Anyone can show a demo. A product with paying customers is different: it has to work every day, handle its own billing, and keep improving or people leave. That discipline is what carries over into the systems we build for clients.</p>
      <p class="mb-4">The same person who builds and runs these builds yours.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Want something like this inside your business?</h2>
      <p class="mb-4">The custom builds start from one workflow. Cost and timeline are on <a href="/how-it-works" class="underline">the how it works page</a>.</p>
    </main>`,

  "/how-it-works": `
    <main class="container mx-auto px-6 py-16" style="max-width:48rem">
      <p class="text-sm font-semibold mb-2">Based in Galway. Working across Ireland.</p>
      <h1 class="text-4xl font-display font-bold mb-6">What a custom internal app costs, and how long it takes</h1>
      <p class="mb-4">The short answer. A first build is a fixed price, from €3,900, and it is usually working end to end inside two weeks. The price is agreed in writing before anything is built, and there is no bill for time on top.</p>
      <p class="mb-4">The rest of this page is the longer answer.</p>
      <p class="mb-4">15 minute chat. No hard sell.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">How much does it cost to get a custom app made in Ireland?</h2>
      <p class="mb-4">A lot of custom software is priced by the developer and the month. The meter runs, and the real number only becomes clear near the end. I price the job instead. You tell me what the app has to do, I put a figure on it, and that figure is agreed in writing before anything is built.</p>
      <ul class="list-disc pl-6 mb-4">
        <li><strong>One workflow, built end to end</strong>: from €3,900, usually working inside two weeks</li>
        <li><strong>A bigger piece across a few connected jobs</strong>: €6,500 to €9,500</li>
        <li><strong>A full review of how work moves through the business, with the systems built around it</strong>: priced after the review</li>
      </ul>
      <p class="mb-4">Why is that less than most custom software quotes? Because I build with AI, every day, and that has changed what one builder can produce. You get software designed around how your business already works, without the overhead that usually comes with the word custom.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">How do I get an app made for my business?</h2>
      <p class="mb-4">Four steps, and the first one costs you fifteen minutes.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">A fifteen minute call</h3>
      <p class="mb-4">You tell me where the hours are going. If an app will not pay for itself, I will say so on the call and we both save the bother.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">A price in writing</h3>
      <p class="mb-4">What the app will do and what it costs, agreed before anything is built. No surprises later.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">The build</h3>
      <p class="mb-4">You see working screens while the build is still in progress, not a big reveal at the end. Anything that looks wrong gets fixed while it is cheap to fix.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Working end to end, usually inside two weeks</h3>
      <p class="mb-4">Your team runs it on real work and I shape it around what they find. A bigger build across connected jobs takes longer, and gets its own timeline agreed alongside the price.</p>
      <p class="mb-4">A full review of the whole operation is a different animal, a programme of work measured in months rather than weeks. How that works is on <a href="/business" class="underline">the services page</a>.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Should you build it yourself or get it built for you?</h2>
      <p class="mb-4">Honest answer, sometimes you should build it yourself. If someone in the office has the time and the interest, a no-code tool can carry a simple job, a form that feeds a spreadsheet, a basic booking sheet. Plenty of businesses run that way and it is a fine place to start.</p>
      <p class="mb-4">Where it usually falls down is afterwards. The person who built it becomes the person who maintains it, on top of the job they were already doing. Every new thing you want runs into the ceiling of the tool. And the data ends up scattered across subscriptions that do not talk to each other.</p>
      <p class="mb-4">What I offer is the custom route without those jobs landing back on you. The app is built around how you already work, I maintain it and extend it, and your team just uses it.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">What counts as a custom internal app?</h2>
      <p class="mb-4">Any screen your office or crew works from that used to be paper, a spreadsheet or someone's memory. The usual candidates:</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Jobs and scheduling</h3>
      <p class="mb-4">Jobs, crews and bookings on one board, with reminders that go out on their own.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Dockets and timesheets</h3>
      <p class="mb-4">Filled in from the phone and filed where the office can see them, not living on paper in the van.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Pre-starts and checks</h3>
      <p class="mb-4">Walkaround checks and sign-offs done on site, stored where an audit can find them.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Quotes and invoices</h3>
      <p class="mb-4">Quotes followed up after you send them. Invoices chased politely until they are paid.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Renewals and expiry dates</h3>
      <p class="mb-4">NCT, CVRT, insurance, certs, service-due dates. Reminders on time, every time.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Reporting</h3>
      <p class="mb-4">The week's numbers on one screen, updated automatically. No Sunday night spreadsheet.</p>
      <p class="mb-4">It can start as one screen for one job and grow from there. Your internal app can become the central hub of all operations.</p>
      <p class="mb-4">In construction or heavy industry? <a href="/contractors" class="underline">See what an internal app looks like on your jobs</a>. Solar, heat pump or retrofit installer? <a href="/installers" class="underline">There is a page for you too</a>.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">What happens after the first build?</h2>
      <p class="mb-4">A custom app is not a handover and goodbye. The first build proves the idea. After that, most clients extend it one job at a time, once the last piece has paid for itself, and I keep building and maintaining it as the operation changes.</p>
      <p class="mb-4">The AI underneath these systems gets better every few months, and because I build on it every day, your app keeps improving too. Along the way your staff learn to use AI themselves, so the gains keep compounding rather than depending on me.</p>
      <p class="mb-4">For a business that wants the ongoing side arranged properly, work after the first build can be set up as a yearly agreement. It covers support and changes once the system is running, and the figure is agreed in writing before it starts.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Get a figure on the job that eats the most time</h2>
      <p class="mb-4">Fifteen minutes on the phone will tell us both whether it is worth doing. If it is not, I will say so.</p>
      <p class="mb-4">Or email <a href="mailto:peter@streamlinedai.tech" class="underline">peter@streamlinedai.tech</a></p>
    </main>`,

  "/guide/set-up-ai-for-business-ireland": `
    <main class="container mx-auto px-6 py-16" style="max-width:48rem">
      <p class="text-sm font-semibold mb-2">Based in Galway. Working across Ireland.</p>
      <h1 class="text-4xl font-display font-bold mb-6">How to set up AI for your business</h1>
      <p class="mb-4">A plain-English guide for Irish businesses that want to set up AI. What it actually means, what it costs, who runs it, and where to start.</p>
      <p class="mb-4">There is no jargon in it, and no chatbot waiting at the end.</p>
      <p class="mb-4">15 minute chat. No hard sell.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">What set up AI actually means for a small business</h2>
      <p class="mb-4">It does not mean hiring a data scientist, and for most businesses it does not mean a chatbot on the website. For an Irish SMB it means two things, and they work best together.</p>
      <p class="mb-4">The first is software. The repetitive admin that eats the week, the chasing, the reminders, the rekeying, the reporting, gets handed to a small custom app built around how you already work. It runs those jobs in the background so nobody has to remember them.</p>
      <p class="mb-4">The second is your people. Your staff learn to use AI in their own day to day work, so the gains do not stop at the app. A team that knows what AI is good at keeps finding new places to use it.</p>
      <p class="mb-4"><strong>That is the whole offer. We set up businesses with AI.</strong></p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">How do I add AI to my business without hiring anyone?</h2>
      <p class="mb-4">This is the question most owners are really asking, because the last thing a busy business needs is new software that needs a new person to run it.</p>
      <p class="mb-4">The answer is to start with one job, not a transformation. Pick a single repetitive task, hand it to a small app, and change nothing else. Nobody's role changes on day one, and there is nothing new to staff. The point is the opposite of hiring. The same team gets through more work, so growth stops depending on finding the next person.</p>
      <p class="mb-4">You can get some of the way with off-the-shelf tools, and for a simple job that can be enough. Where a custom app earns its keep is when your own way of doing things needs to be baked in, or when the job has to keep running without anyone in the office minding it.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">How much does AI cost for a small business in Ireland?</h2>
      <p class="mb-4">The teaching side can cost very little. Most of the AI tools your staff would use day to day are cheap or free, and the skill is in knowing what to hand them, which is something we build into the work rather than sell as a separate course.</p>
      <p class="mb-4">The software side has a public price list. A first custom build is a fixed price from €3,900, agreed in writing before anything starts, and it is usually working end to end inside two weeks. A bigger piece across a few connected jobs runs €6,500 to €9,500. A full review of the whole operation is priced after the review.</p>
      <p class="mb-4">The longer answer on pricing and timelines, including how the fixed price works, is on <a href="/how-it-works" class="underline">the cost and timeline page</a>.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Do you need someone to run it?</h2>
      <p class="mb-4">No. That is the test of whether it was set up properly. The reminders send themselves and the reports write themselves. Your team just works from the screens, and if a system needs minding, it has only moved the admin around rather than removed it.</p>
      <p class="mb-4">We maintain and extend the app as your operation changes, so the technical side stays off your desk. And because we encourage your staff to pick up AI themselves along the way, you are not left dependent on us for every small thing either.</p>
      <p class="mb-4">One honest caution, though. AI does not run your business. It runs the repetitive parts, and it does that very well. The decisions stay with you.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Picking the first job to hand to AI</h2>
      <p class="mb-4">Look at where the hours actually go in a normal week. A good first job is one that happens every week and follows the same steps every time. The usual candidates in an Irish SMB:</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Chasing quotes and invoices</h3>
      <p class="mb-4">Quotes followed up after you send them. Invoices chased politely until they are paid.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Bookings and reminders</h3>
      <p class="mb-4">Jobs and appointments that write straight into the diary, with reminders that reduce no-shows.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Renewals and expiry dates</h3>
      <p class="mb-4">Insurance, certs, NCT, CVRT, service-due dates. Reminders go out on time, every time.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Rekeying orders and details</h3>
      <p class="mb-4">Orders and new client details captured once and landing in a list your team works from.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">Follow-ups that get forgotten</h3>
      <p class="mb-4">The enquiry from last Tuesday, the customer to call back. Followed up without anyone chasing.</p>
      <h3 class="text-lg font-display font-semibold mt-6 mb-2">The week's numbers</h3>
      <p class="mb-4">One screen with the numbers that matter, updated automatically. No Sunday night spreadsheet.</p>
      <p class="mb-4">If one of those made you wince, that is probably your first job. Fix it and judge the result. Only then decide whether to hand over the next one.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">What Streamlined Tech builds instead of a chatbot</h2>
      <p class="mb-4">A chatbot is the demo everyone leads with, and there is a place for one. But an assistant is only as good as the information behind it, so it works best on top of systems that already hold good data. For most businesses the bigger win comes first, and it is the boring, repetitive admin handled by a custom internal app.</p>
      <p class="mb-4">That is what we specialise in. A small app, built around how your business already works, that takes a real job off a real person's plate. It can start as one screen for one job and grow from there. Your internal app can become the central hub of all operations.</p>
      <p class="mb-4">I'm Pete Harris, the founder and the builder, based in Galway. What we build and what it costs is all on <a href="/business" class="underline">the services page</a>.</p>
      <p class="mb-4">In construction or heavy industry? <a href="/contractors" class="underline">See what an internal app looks like on your jobs</a>. Solar, heat pump or retrofit installer? <a href="/installers" class="underline">There is a page for you too</a>.</p>

      <h2 class="text-2xl font-display font-bold mt-10 mb-3">Not sure where AI fits in your business?</h2>
      <p class="mb-4">Tell me how a normal week runs and I will tell you where I would start. Fifteen minutes on the phone, and if AI is not worth your money yet, I will say so.</p>
      <p class="mb-4">Or email <a href="mailto:peter@streamlinedai.tech" class="underline">peter@streamlinedai.tech</a></p>
    </main>`,

  ...aiEmployeesMirrors(),
};
