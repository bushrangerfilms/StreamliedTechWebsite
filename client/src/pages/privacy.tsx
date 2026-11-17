import { Baby, Building2, Cookie, Database, Globe, Handshake, ListChecks, Lock, Mail, MessageSquareWarning, MonitorSmartphone, Phone, PhoneIncoming, RefreshCw, Scale, Share2, Timer } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LegalContents } from "@/components/legal-contents";

// The wording is the 17 Nov 2026 draft from streamlined-bot-files
// atlas-website/drafts/privacy-policy.md. It is a DRAFT: the red box and
// every highlighted [PETE TO CONFIRM] marker must be dealt with, and Pete
// must approve the exact wording, before this page goes live. A production
// build refuses to run while a marker is still here (vite-plugin-prerender-meta.ts).
// Section 6 was changed from the draft to describe only what the Atlas demo
// notice does (it notes that a demo was opened) and to quote that notice.

// The section list feeds the "On this page" icon links under the draft box.
// The titles must match the <h2> headings below word for word.
const SECTIONS = [
  { n: 1, title: "Who we are and how to contact us", icon: Building2 },
  { n: 2, title: "A quick summary", icon: ListChecks },
  { n: 3, title: "When you ask for a call on our website", icon: PhoneIncoming },
  { n: 4, title: "Phone calls with us", icon: Phone },
  { n: 5, title: "Emails we send to businesses", icon: Mail },
  { n: 6, title: "Demos we send you", icon: MonitorSmartphone },
  { n: 7, title: "When you become a customer", icon: Handshake },
  { n: 8, title: "Customers' app data", icon: Database },
  { n: 9, title: "Our website: no cookies and no tracking pixels", icon: Cookie },
  { n: 10, title: "Who we share your data with", icon: Share2 },
  { n: 11, title: "Transfers outside the EEA", icon: Globe },
  { n: 12, title: "How long we keep your data", icon: Timer },
  { n: 13, title: "How we keep your data safe", icon: Lock },
  { n: 14, title: "Your rights", icon: Scale },
  { n: 15, title: "Complaints", icon: MessageSquareWarning },
  { n: 16, title: "Children", icon: Baby },
  { n: 17, title: "Changes to this policy", icon: RefreshCw },
];

export default function Privacy() {
  useSeo(ROUTE_SEO.privacy);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <article className="st-legal" data-testid="article-legal">
          <div className="st-wrap st-narrow">
          <h1 data-testid="text-hero-headline">Privacy Policy</h1>
          <div className="st-draft" data-testid="box-draft">
            <p><strong>DRAFT. NOT FOR PUBLICATION. This needs a solicitor check before it goes live.</strong></p>
            <p>Pete, this draft is written from the facts in the context file. Everything marked <mark className="st-confirm">[PETE TO CONFIRM]</mark> is a fact I did not have and did not guess. Ask the solicitor to check these parts first:</p>
            <ol>
              <li><strong>Cold email (section 5).</strong> Whether our B2B emails meet Regulation 13 of S.I. 336 of 2011, and whether legitimate interests holds up. This matters most for sole traders and for people who use a personal address (such as a Gmail) for work, who may be treated as individuals needing prior consent. A written legitimate interests assessment should be on file.</li>
              <li><strong>Where cold email contact details come from (section 5).</strong> GDPR Article 14 says we must tell people the source of their details. The source is not in the context.</li>
              <li><strong>Call recording and transcription (section 4).</strong> How the OK is asked for and recorded, who the transcription provider is, and whether any other tool (including any AI tool) handles the recording or transcript. Any such tool must be added to the list in section 10.</li>
              <li><strong>Demo-open notes (section 6).</strong> Whether noting when a demo is opened, with no cookies or browser storage, falls outside Regulation 5 of S.I. 336 of 2011 as planned, and whether legitimate interests is the right basis. This is not live yet.</li>
              <li><strong>"No cookies and no tracking pixels" (section 9).</strong> This must be true of the website, the demos and the emails before it is published. Check the analytics tool on the site and whether PlusVibe open or click tracking is switched on, since open tracking normally uses a pixel.</li>
              <li><strong>Transfers outside the EEA (section 11).</strong> Which providers store data where, and which safeguard applies to each (adequacy decision, EU-US Data Privacy Framework, or Standard Contractual Clauses).</li>
              <li><strong>Customers' app data (section 8).</strong> That the data processing agreement exists, meets GDPR Article 28, and matches what this policy says.</li>
              <li><strong>Retention periods (section 12).</strong> Every period is a proposed default, not a decided one.</li>
              <li><strong>Whether a Data Protection Officer is needed (section 1).</strong></li>
            </ol>
          </div>
          <LegalContents sections={SECTIONS} />
          <p>
            <strong>Last updated:</strong> <mark className="st-confirm">[PETE TO CONFIRM]</mark>
          </p>
          <p>
            This policy explains what personal data we hold about you, why we hold it, who we share it with, how long we keep it and what your rights are. We have tried to write it in plain words. If anything is unclear, email us and we will explain.
          </p>
          <h2 id="section-1">1. Who we are and how to contact us</h2>
          <p>
            We are Streamlined Digital Tech Limited, trading as Streamlined Tech. We are a company registered in Ireland, company number 805162. Our registered address is Castleblakeney, Ballinasloe, Co. Galway, H53 YA97.
          </p>
          <p>
            VAT number: <mark className="st-confirm">[PETE TO CONFIRM]</mark>
          </p>
          <p>
            We build custom apps for Irish trade and service businesses.
          </p>
          <p>
            For the personal data described in sections 3 to 7 of this policy, we are the "controller".
          </p>
          <p>
            That means we decide how and why it is used, and we are responsible for it under the General Data Protection Regulation (GDPR) and the Irish Data Protection Act 2018.
          </p>
          <p>
            For any question about your data, or to use any of your rights, email <strong>peter@streamlinedai.tech</strong> or write to us at the address above.
          </p>
          <p>
            Data Protection Officer: <mark className="st-confirm">[PETE TO CONFIRM whether one is needed. If not, this line can say: "We are not required to appoint a Data Protection Officer. Pete Harris, our director, deals with all data protection questions."]</mark>
          </p>
          <h2 id="section-2">2. A quick summary</h2>
          <ul>
            <li>We only collect what we need to talk to you, show you a demo, and build and run your app.</li>
            <li>We do not sell personal data to anyone.</li>
            <li>Our website and demos set no cookies and use no tracking pixels <mark className="st-confirm">[PETE TO CONFIRM, see section 9]</mark>.</li>
            <li>You can ask us to stop emailing you at any time, and we will.</li>
            <li>You can ask to see, correct or delete your data by emailing peter@streamlinedai.tech.</li>
          </ul>
          <h2 id="section-3">3. When you ask for a call on our website</h2>
          <p>
            <strong className="st-lead">What we collect.</strong> When you fill in the "Ask for a call" form, we collect your name, phone number, email address, business name and what your business does.
          </p>
          <p>
            <strong className="st-lead">Why.</strong> So that one of our consultants can ring you, normally within 24 hours, to talk about what you need and see if we are a fit.
          </p>
          <p>
            <strong className="st-lead">Where it goes.</strong> Your details are saved in Atlas, our own customer records system, which we built ourselves. It runs on Vercel and stores its data with Supabase (see section 10).
          </p>
          <p>
            <strong className="st-lead">Lawful basis.</strong> You asked us to contact you, so we use your details to take steps at your request before entering into a contract (GDPR Article 6(1)(b)).
          </p>
          <p>
            Where you are asking on behalf of a company, we rely on our legitimate interest in answering an enquiry made to us (Article 6(1)(f)).
          </p>
          <p>
            <strong className="st-lead">Do you have to give us this?</strong> No. But without a phone number and a name we cannot ring you.
          </p>
          <h2 id="section-4">4. Phone calls with us</h2>
          <p>
            <strong className="st-lead">What we collect.</strong> Notes of what we talked about, such as how your business works and what you want an app to do. We keep these in Atlas.
          </p>
          <p>
            <strong className="st-lead">Recording.</strong> With your OK, we may record a call and have it turned into a written transcript. We do this so that Pete can build your demo from what you actually said, instead of from memory.
          </p>
          <p>
            We ask before recording starts. If you say no, we do not record, and the call goes ahead as normal.
          </p>
          <p>
            <strong className="st-lead">Lawful basis for recording and transcribing.</strong> Your consent (Article 6(1)(a)). You can withdraw it at any time by telling us on the call or by emailing peter@streamlinedai.tech.
          </p>
          <p>
            If you withdraw it, we will delete the recording and the transcript. Withdrawing does not affect anything done before you withdrew.
          </p>
          <p>
            <strong className="st-lead">Lawful basis for call notes.</strong> Steps taken at your request before a contract, or our legitimate interest in following up an enquiry or conversation (Article 6(1)(b) or 6(1)(f)).
          </p>
          <p>
            <strong className="st-lead">Who handles the recording.</strong> Calls and texts may be carried by Twilio <mark className="st-confirm">[PETE TO CONFIRM]</mark>.
          </p>
          <p>
            The transcript is produced by a transcription provider: <mark className="st-confirm">[PETE TO CONFIRM provider name, where it stores data, and whether any other tool handles the recording or transcript]</mark>.
          </p>
          <p>
            <strong className="st-lead">Who makes the calls.</strong> Calls may be made by Pete or by our Sales Consultant, who follows up enquiries by phone on our behalf <mark className="st-confirm">[PETE TO CONFIRM whether the Sales Consultant is an employee or a contractor, and that a confidentiality agreement is in place]</mark>.
          </p>
          <h2 id="section-5">5. Emails we send to businesses</h2>
          <p>
            <strong className="st-lead">What we do.</strong> We email people at Irish businesses, at their work contact details, to tell them about our apps. This is sometimes called cold email. We only write to businesses we think our work is relevant to.
          </p>
          <p>
            <strong className="st-lead">What we hold.</strong> Your name (if we have it), work email address, business name, the type of business, and a record of what we sent you and whether you replied <mark className="st-confirm">[PETE TO CONFIRM exact fields]</mark>.
          </p>
          <p>
            <strong className="st-lead">Where we got your details.</strong> <mark className="st-confirm">[PETE TO CONFIRM the source or sources, for example the business's own website or a public business directory. The law requires us to say this.]</mark>
          </p>
          <p>
            <strong className="st-lead">Lawful basis.</strong> Our legitimate interest in telling relevant businesses about our services (Article 6(1)(f)).
          </p>
          <p>
            We have weighed this against your interests: we write only to business contact details, about something relevant to that business, and every email gives you an easy way to opt out <mark className="st-confirm">[PETE TO CONFIRM a written legitimate interests assessment is on file]</mark>.
          </p>
          <p>
            We also follow the rules on marketing email in S.I. 336 of 2011.
          </p>
          <p>
            <strong className="st-lead">The tool we use.</strong> We send these emails with a sending tool called PlusVibe <mark className="st-confirm">[PETE TO CONFIRM details, including where PlusVibe stores data and whether open or click tracking is switched off]</mark>.
          </p>
          <p>
            <strong className="st-lead">Your right to say stop.</strong> You can object to marketing emails at any time, for any reason, at no cost.
          </p>
          <p>
            Reply to any email and tell us to stop, or email peter@streamlinedai.tech <mark className="st-confirm">[PETE TO CONFIRM whether emails also carry an unsubscribe link]</mark>.
          </p>
          <p>
            We will stop, and we will keep only your email address on a "do not contact" list so that we do not write to you again by mistake. A polite "no thanks" is treated as an opt-out too.
          </p>
          <h2 id="section-6">6. Demos we send you</h2>
          <p>
            If a call suggests we might be a fit, we may send you a private link to a demo of an app built around your business. Demos use made-up sample data. They are sent only to you and they expire.
          </p>
          <p>
            <strong>What we note <mark className="st-confirm">[PETE TO CONFIRM when live]</mark>.</strong> When a demo is opened, and how many times. This is tied only to an internal reference for your enquiry.
          </p>
          <p>
            <strong className="st-lead">What we do not do.</strong> The demo sets no cookies and stores nothing on your device. We do not read or keep your IP address. We do not record your screen.
          </p>
          <p>
            <strong className="st-lead">Why.</strong> So that we know the demo reached you, and can follow up sensibly.
          </p>
          <p>
            <strong className="st-lead">Lawful basis.</strong> Our legitimate interest in understanding whether a demo we built for you was useful (Article 6(1)(f)). You can object at any time by emailing peter@streamlinedai.tech and we will stop and delete the notes.
          </p>
          <p>
            <strong className="st-lead">Notice.</strong> Every demo carries this notice: "Streamlined Tech notes when this demo is opened, so we know it reached you. No cookies, nothing stored on your device."
          </p>
          <h2 id="section-7">7. When you become a customer</h2>
          <p>
            <strong className="st-lead">What we collect.</strong> The names and work contact details of the people we deal with at your business, the customer agreement, invoices, payment records, and our emails and support messages with you <mark className="st-confirm">[PETE TO CONFIRM how payments are taken and whether any payment provider is involved]</mark>.
          </p>
          <p>
            <strong className="st-lead">Why and on what basis.</strong>
          </p>
          <ul>
            <li>To build, host and support your app, and to bill you. Lawful basis: performance of our contract with you (Article 6(1)(b)), or our legitimate interest in running the contract where the contract is with your company and you are its contact person (Article 6(1)(f)).</li>
            <li>To keep accounting and tax records. Lawful basis: legal obligation (Article 6(1)(c)), under Irish tax and company law.</li>
          </ul>
          <h2 id="section-8">8. Customers' app data</h2>
          <p>
            This section is about the data that our customers put into their own apps. That might include details of their own customers, staff and jobs.
          </p>
          <p>
            For that data, our customer is the controller and we are their "processor". In plain terms: it is their data, they decide what goes in and what it is used for, and we only host it and handle it on their instructions.
          </p>
          <p>
            It is hosted for them on Supabase and Vercel. Customers have their own logins and backups.
          </p>
          <p>
            The rules we follow for that data are set out in a data processing agreement, which is part of our customer agreement <mark className="st-confirm">[PETE TO CONFIRM]</mark>.
          </p>
          <p>
            If you are a customer, employee or contact of one of our customers and you have a question about your data in their app, please contact that business first. If you contact us, we will pass your request to them and help them deal with it.
          </p>
          <h2 id="section-9">9. Our website: no cookies and no tracking pixels</h2>
          <p>
            Our website is hosted on Vercel.
          </p>
          <ul>
            <li>It sets no cookies, including no advertising cookies <mark className="st-confirm">[PETE TO CONFIRM exactly what is on the site]</mark>.</li>
            <li>It uses privacy-friendly analytics only, to count visits and see which pages are read. This does not use cookies and does not identify you <mark className="st-confirm">[PETE TO CONFIRM the analytics tool and what it collects]</mark>.</li>
            <li>We do not use tracking pixels on the website, in demos or in our emails <mark className="st-confirm">[PETE TO CONFIRM, including PlusVibe settings]</mark>.</li>
            <li>Like any website host, Vercel may briefly process technical details such as your IP address in order to deliver the pages to you and keep the site secure <mark className="st-confirm">[PETE TO CONFIRM what Vercel logs and for how long]</mark>.</li>
          </ul>
          <p>
            Because we set no cookies, there is no cookie banner. If this ever changes, we will update this policy and ask for your consent first where S.I. 336 of 2011 requires it.
          </p>
          <h2 id="section-10">10. Who we share your data with</h2>
          <p>
            We do not sell your data. We do not share it with anyone for their own marketing.
          </p>
          <p>
            We use a small number of service providers to run the business. Each one handles data only on our instructions, under a written agreement <mark className="st-confirm">[PETE TO CONFIRM agreements are in place with each]</mark>.
          </p>
          <div className="st-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>What it does for us</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vercel</td>
                  <td>Hosts our website, our customer records system (Atlas), the demos and customers' apps</td>
                  <td>Confirmed in use</td>
                </tr>
                <tr>
                  <td>Supabase</td>
                  <td>Stores the databases behind Atlas and customers' apps</td>
                  <td>Confirmed in use</td>
                </tr>
                <tr>
                  <td>PlusVibe</td>
                  <td>Sends our business emails and holds the contact list for them</td>
                  <td><mark className="st-confirm">[PETE TO CONFIRM details]</mark></td>
                </tr>
                <tr>
                  <td>Google Workspace</td>
                  <td>Our email and calendar</td>
                  <td><mark className="st-confirm">[PETE TO CONFIRM]</mark></td>
                </tr>
                <tr>
                  <td>Twilio</td>
                  <td>Carries phone calls and text messages</td>
                  <td><mark className="st-confirm">[PETE TO CONFIRM]</mark></td>
                </tr>
                <tr>
                  <td>Call transcription service</td>
                  <td>Turns recorded calls into written transcripts</td>
                  <td><mark className="st-confirm">[PETE TO CONFIRM provider]</mark></td>
                </tr>
                <tr>
                  <td>Calendly</td>
                  <td>Booking calls. Being removed</td>
                  <td><mark className="st-confirm">[PETE TO CONFIRM whether still in use at publication. Delete this row if not]</mark></td>
                </tr>
                <tr>
                  <td>Backup storage provider</td>
                  <td>Holds backup copies</td>
                  <td><mark className="st-confirm">[PETE TO CONFIRM provider and whether it holds any personal data covered by this policy]</mark></td>
                </tr>
                <tr>
                  <td>Accountant and professional advisers</td>
                  <td>See our financial records and, where needed, give legal advice</td>
                  <td><mark className="st-confirm">[PETE TO CONFIRM]</mark></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            We may also share data where the law requires it, for example with the Revenue Commissioners, a court or An Garda Síochána. If the business were ever sold or merged, records would pass to the new owner, who would have to keep to this policy.
          </p>
          <h2 id="section-11">11. Transfers outside the EEA</h2>
          <p>
            Some of the providers above are based in the United States or have parent companies there. That means your data may be stored in, or accessed from, a country outside the European Economic Area (EEA).
          </p>
          <p>
            Where that happens, we rely on one of the safeguards allowed by GDPR:
          </p>
          <ul>
            <li>a European Commission adequacy decision, including the EU-US Data Privacy Framework where the provider is certified under it, or</li>
            <li>the European Commission's Standard Contractual Clauses, which are contract terms that require the provider to protect your data to the EU standard.</li>
          </ul>
          <p>
            <mark className="st-confirm">[PETE TO CONFIRM for each provider: where the data is stored (for example, which region the Supabase and Vercel projects are in) and which safeguard applies.]</mark>
          </p>
          <p>
            You can ask us for more detail, or for a copy of the relevant safeguard, by emailing peter@streamlinedai.tech.
          </p>
          <h2 id="section-12">12. How long we keep your data</h2>
          <p>
            We keep data only for as long as we need it for the purpose we collected it for. All the periods below are proposed defaults. <mark className="st-confirm">[PETE TO CONFIRM each one.]</mark>
          </p>
          <div className="st-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>How long we keep it</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>"Ask for a call" form details and call notes, where you do not become a customer</td>
                  <td>12 months after our last contact with you <mark className="st-confirm">[PETE TO CONFIRM]</mark></td>
                </tr>
                <tr>
                  <td>Call recordings</td>
                  <td>Deleted within 90 days of the call, or sooner if you withdraw your consent <mark className="st-confirm">[PETE TO CONFIRM]</mark></td>
                </tr>
                <tr>
                  <td>Call transcripts</td>
                  <td>12 months after the call if you do not become a customer. For the life of the customer agreement if you do. Deleted sooner if you withdraw your consent <mark className="st-confirm">[PETE TO CONFIRM]</mark></td>
                </tr>
                <tr>
                  <td>Business email contact details, where you have not replied</td>
                  <td>12 months after the last email we sent you <mark className="st-confirm">[PETE TO CONFIRM]</mark></td>
                </tr>
                <tr>
                  <td>"Do not contact" list (email address only)</td>
                  <td>Kept for as long as we send marketing emails, so that we can honour your opt-out <mark className="st-confirm">[PETE TO CONFIRM]</mark></td>
                </tr>
                <tr>
                  <td>Demo-open notes</td>
                  <td>12 months after the demo expires <mark className="st-confirm">[PETE TO CONFIRM when live]</mark></td>
                </tr>
                <tr>
                  <td>Customer contact details, agreement and support messages</td>
                  <td>For the life of the customer agreement and 6 years after it ends <mark className="st-confirm">[PETE TO CONFIRM]</mark></td>
                </tr>
                <tr>
                  <td>Invoices and accounting records</td>
                  <td>6 years, as required by Irish tax and company law <mark className="st-confirm">[PETE TO CONFIRM with accountant]</mark></td>
                </tr>
                <tr>
                  <td>Customers' app data (section 8)</td>
                  <td>For as long as the customer agreement runs, then returned or deleted as the agreement says <mark className="st-confirm">[PETE TO CONFIRM]</mark></td>
                </tr>
                <tr>
                  <td>Website analytics</td>
                  <td><mark className="st-confirm">[PETE TO CONFIRM, depends on the tool]</mark></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            When a period ends, we delete the data or make it anonymous. Copies in backups are removed as the backups age out <mark className="st-confirm">[PETE TO CONFIRM backup retention period]</mark>.
          </p>
          <h2 id="section-13">13. How we keep your data safe</h2>
          <p>
            We are a small business and we keep this simple.
          </p>
          <ul>
            <li>Your data is kept in systems run by established hosting providers (Vercel and Supabase), not on paper and not passed around by hand.</li>
            <li>Only the people who need your data to do their job can see it. For enquiries, that is Pete and our Sales Consultant <mark className="st-confirm">[PETE TO CONFIRM]</mark>.</li>
            <li>Access to our systems is by individual login <mark className="st-confirm">[PETE TO CONFIRM for Atlas]</mark>.</li>
            <li>We keep backups so that data can be restored if something goes wrong <mark className="st-confirm">[PETE TO CONFIRM for Atlas]</mark>.</li>
            <li>Customers get their own logins and their own backups for their apps.</li>
          </ul>
          <p>
            No system is perfectly secure. If there is a data breach that is likely to put you at risk, we will tell you and the Data Protection Commission, as the law requires.
          </p>
          <h2 id="section-14">14. Your rights</h2>
          <p>
            Under GDPR you have the right to:
          </p>
          <ul>
            <li><strong>See your data.</strong> Ask for a copy of what we hold about you.</li>
            <li><strong>Correct it.</strong> Ask us to fix anything that is wrong or out of date.</li>
            <li><strong>Delete it.</strong> Ask us to erase your data. We will, unless the law requires us to keep it (for example, invoices).</li>
            <li><strong>Restrict it.</strong> Ask us to hold your data but not use it, for example while a correction is being checked.</li>
            <li><strong>Object.</strong> Object to anything we do on the basis of legitimate interests, including the demo-open notes. We will stop unless we have a compelling reason to continue.</li>
            <li><strong>Object to marketing.</strong> This one is absolute. If you tell us to stop sending marketing emails, we stop. See section 5.</li>
            <li><strong>Withdraw consent.</strong> Where we rely on your consent, such as call recording, you can take it back at any time.</li>
            <li><strong>Move it.</strong> Ask for the data you gave us in a common electronic format, where we hold it by consent or contract.</li>
          </ul>
          <p>
            We do not make decisions about you by automated means alone <mark className="st-confirm">[PETE TO CONFIRM]</mark>.
          </p>
          <p>
            <strong className="st-lead">How to use your rights.</strong> Email peter@streamlinedai.tech or write to us at the address in section 1. Tell us what you want and we will do it. It is free. We will answer within one month.
          </p>
          <p>
            If a request is complicated, the law allows us up to two more months, and we will tell you if we need that. We may ask for something to confirm who you are before we send data out, so that it does not go to the wrong person.
          </p>
          <h2 id="section-15">15. Complaints</h2>
          <p>
            If you are unhappy with how we have handled your data, please tell us first at peter@streamlinedai.tech and we will try to put it right.
          </p>
          <p>
            You also have the right to complain to the Data Protection Commission, the Irish regulator, at any time. You can find how to do that at <strong>dataprotection.ie</strong>.
          </p>
          <p>
            If you live or work in another EU country, you can complain to the regulator there instead.
          </p>
          <h2 id="section-16">16. Children</h2>
          <p>
            Our website and services are for businesses. We do not knowingly collect data from anyone under 18.
          </p>
          <h2 id="section-17">17. Changes to this policy</h2>
          <p>
            We may update this policy when what we do changes, for example if we start using a new provider or when the demo-open notes go live.
          </p>
          <p>
            The current version will always be on this page with the date it was last updated at the top. If a change makes a real difference to how we use your data, we will tell you directly where we have your contact details.
          </p>
          <p>
            <strong>Last updated:</strong> <mark className="st-confirm">[PETE TO CONFIRM]</mark>
          </p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
