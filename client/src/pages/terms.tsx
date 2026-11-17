import { Link } from "wouter";
import { Activity, Building2, Copyright, ExternalLink, FileText, Gavel, Info, ListChecks, Mail, MonitorSmartphone, MousePointerClick, PhoneIncoming, RefreshCw, Scale } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LegalContents } from "@/components/legal-contents";

// The wording is the 17 Nov 2026 draft from streamlined-bot-files
// atlas-website/drafts/terms.md. It is a DRAFT: the red box and every
// highlighted [PETE TO CONFIRM] marker must be dealt with, and Pete must
// approve the exact wording, before this page goes live. A production build
// refuses to run while a marker is still here (vite-plugin-prerender-meta.ts).

// The section list feeds the "On this page" icon links under the draft box.
// The titles must match the <h2> headings below word for word.
const SECTIONS = [
  { n: 1, title: "Who we are", icon: Building2 },
  { n: 2, title: "These are website terms, not your customer contract", icon: FileText },
  { n: 3, title: "Using the site", icon: MousePointerClick },
  { n: 4, title: "The Ask for a call form", icon: PhoneIncoming },
  { n: 5, title: "No professional advice and no guarantees from site content", icon: Info },
  { n: 6, title: "Intellectual property", icon: Copyright },
  { n: 7, title: "Demos", icon: MonitorSmartphone },
  { n: 8, title: "Links to other sites", icon: ExternalLink },
  { n: 9, title: "Availability", icon: Activity },
  { n: 10, title: "Our liability to you", icon: Scale },
  { n: 11, title: "Changes to these terms", icon: RefreshCw },
  { n: 12, title: "Governing law and courts", icon: Gavel },
  { n: 13, title: "General", icon: ListChecks },
  { n: 14, title: "Contact", icon: Mail },
];

export default function Terms() {
  useSeo(ROUTE_SEO.terms);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <article className="st-legal" data-testid="article-legal">
          <div className="st-wrap st-narrow">
          <h1 data-testid="text-hero-headline">Website Terms of Use</h1>
          <div className="st-draft" data-testid="box-draft">
            <p><strong>DRAFT. NOT FOR PUBLICATION. This draft needs a check by an Irish solicitor before it goes live.</strong></p>
            <p>The parts that matter most:</p>
            <ol>
              <li><strong>Liability (section 10).</strong> Check the exclusions and the cap are enforceable under Irish law, including the consumer rules if a consumer ever uses the site.</li>
              <li><strong>Demos (section 7).</strong> Check the restrictions on copying, recording, sharing, scraping and reverse engineering can be enforced, and whether a demo link needs its own short notice or click-to-accept step to bind the recipient.</li>
              <li><strong>Governing law and courts (section 12).</strong> Check the Irish law and Irish courts clause, including the carve-out for consumers.</li>
            </ol>
            <p>Every item marked <mark className="st-confirm">[PETE TO CONFIRM]</mark> must be filled in or removed before publication. Remove this box once the check is done.</p>
          </div>
          <LegalContents sections={SECTIONS} />
          <p>
            <strong>Last updated:</strong> <mark className="st-confirm">[PETE TO CONFIRM date of publication]</mark>
          </p>
          <p>
            These terms cover your use of the Streamlined Tech website at streamlinedai.tech (the "site"), and any demo we send you. Please read them. By using the site or opening a demo, you agree to them.
          </p>
          <p>
            If you do not agree, please do not use the site or the demo.
          </p>
          <h2 id="section-1">1. Who we are</h2>
          <p>
            The site is run by Streamlined Digital Tech Limited, trading as Streamlined Tech ("we", "us", "our").
          </p>
          <ul>
            <li>Registered in Ireland, company number 805162</li>
            <li>Address: Castleblakeney, Ballinasloe, Co. Galway, H53 YA97 <mark className="st-confirm">[PETE TO CONFIRM this is the registered office]</mark></li>
            <li>VAT number: <mark className="st-confirm">[PETE TO CONFIRM]</mark></li>
            <li>Email: peter@streamlinedai.tech</li>
          </ul>
          <p>
            We build custom apps for Irish trade and service businesses.
          </p>
          <h2 id="section-2">2. These are website terms, not your customer contract</h2>
          <p>
            These terms cover the site and demos only. They are not an agreement to build anything for you.
          </p>
          <p>
            Each build is agreed in a written quote and a written agreement between you and us. That quote and agreement set out the price, the work, the timings, who owns what and how your data is handled.
          </p>
          <p>
            If anything in these terms differs from your written quote and agreement, the quote and agreement prevail.
          </p>
          <p>
            Prices and timings shown on the site are a guide. They are not an offer that you can accept by using the site. The price for your build is the one in your written quote.
          </p>
          <h2 id="section-3">3. Using the site</h2>
          <p>
            You may use the site to read about what we do and to ask us for a call. The site is meant for businesses and the people who run or work in them.
          </p>
          <p>
            You must not:
          </p>
          <ul>
            <li>use the site in any way that breaks the law</li>
            <li>try to get into any part of the site, our systems or our customers' apps that you have not been given access to</li>
            <li>introduce viruses or other harmful code, or attack the site in any way</li>
            <li>use automated tools to scrape or copy the site in bulk, other than ordinary search engine indexing</li>
            <li>send us information that is false, or that belongs to someone else without their permission</li>
            <li>use the form to send advertising or spam</li>
          </ul>
          <p>
            We may block access for anyone who breaks these rules.
          </p>
          <h2 id="section-4">4. The Ask for a call form</h2>
          <p>
            When you fill in the Ask for a call form, you give us your name, phone number, email address, business name and what your business does. We use these details to contact you about your enquiry, by phone or by email.
          </p>
          <p>
            We aim to ring you within 24 hours <mark className="st-confirm">[PETE TO CONFIRM this is to be stated here, and whether it means working days]</mark>.
          </p>
          <p>
            Asking for a call does not commit you or us to anything.
          </p>
          <p>
            Please give us accurate details, and only your own details or details you have permission to give.
          </p>
          <p>
            Our <Link href="/privacy">Privacy Policy</Link> explains how we use and keep your personal data, and your rights.
          </p>
          <h2 id="section-5">5. No professional advice and no guarantees from site content</h2>
          <p>
            The content on the site is general information about our services. It is not legal, financial, tax, regulatory or other professional advice, and you should not rely on it as such.
          </p>
          <p>
            We take care to keep the site accurate and up to date, but we do not promise that everything on it is complete, current or free from mistakes. Examples and descriptions of what an app can do are illustrations.
          </p>
          <p>
            They are not a promise of any result for your business. What we commit to deliver for you is set out in your written quote and agreement, and nowhere else.
          </p>
          <h2 id="section-6">6. Intellectual property</h2>
          <p>
            The text, design, layout, graphics, logos and software on the site belong to Streamlined Digital Tech Limited or to those who license them to us. All rights are reserved.
          </p>
          <p>
            You may view the site and print or save pages for your own business reference. You may not copy, republish, sell or reuse site content for any other purpose without our written permission.
          </p>
          <p>
            "Streamlined Tech" and our logo may not be used without our written permission. <mark className="st-confirm">[PETE TO CONFIRM whether any trade mark is registered or applied for]</mark>
          </p>
          <p>
            If you are a customer, what you own in your app and your data is what your written agreement says. Nothing in these website terms takes away from that, and nothing in them gives you more.
          </p>
          <h2 id="section-7">7. Demos</h2>
          <p>
            After a call, we may send you a link to a demo built around what you told us. These rules apply to every demo.
          </p>
          <ul>
            <li><strong>Private.</strong> A demo is not public. It is sent to the person we name as the recipient, for that person's business only.</li>
            <li><strong>For evaluation only.</strong> You may use the demo only to decide whether you want us to build an app for you. You may show it to colleagues inside your own business who are part of that decision. <mark className="st-confirm">[PETE TO CONFIRM that showing colleagues is allowed]</mark></li>
            <li><strong>Made-up data.</strong> A demo contains sample data that we made up. Names, figures and records in it are not real. Please do not enter real personal data or confidential information into a demo.</li>
            <li><strong>No copying or sharing.</strong> You may not copy, record, screenshot for sharing, publish, forward or share a demo or its link with anyone outside your business. You may not scrape it, reverse engineer it, decompile it, or try to get at its code or design. You may not use it, or let anyone else use it, to build or brief a competing or similar product.</li>
            <li><strong>Ours.</strong> The demo, its design, its screens and its software belong to us. Sending you a demo gives you no ownership and no licence beyond the evaluation described here.</li>
            <li><strong>May be switched off.</strong> Demos expire. We may change, limit or switch off any demo at any time, without notice.</li>
            <li><strong>As it is.</strong> A demo is an unfinished starting point, provided free of charge and as it is. It is not a working system and must not be used to run your business.</li>
            <li><strong>No promise of a build.</strong> A demo is not an offer. We do not promise that any demo will become a build, or that a finished app will match the demo. What we build for you, if anything, is set out in your written quote and agreement.</li>
            <li><strong>How a demo is used.</strong> <mark className="st-confirm">[PETE TO CONFIRM when live]</mark> We note when a demo is opened. A short notice on the demo says so, and our <Link href="/privacy">Privacy Policy</Link> gives the detail.</li>
          </ul>
          <p>
            If you break these demo rules, we may switch the demo off straight away and may take any steps the law allows to protect our work.
          </p>
          <h2 id="section-8">8. Links to other sites</h2>
          <p>
            The site may link to websites run by other people. We provide those links for convenience only.
          </p>
          <p>
            We do not control those websites and are not responsible for their content, their availability or how they handle your data. Read their own terms and privacy notices.
          </p>
          <p>
            You may link to our home page, as long as you do so fairly and do not suggest we endorse you where we do not. <mark className="st-confirm">[PETE TO CONFIRM whether to keep this]</mark>
          </p>
          <h2 id="section-9">9. Availability</h2>
          <p>
            We try to keep the site running, but we do not promise it will always be available, uninterrupted or free from errors.
          </p>
          <p>
            We may suspend, withdraw or change all or part of the site at any time without notice, for example for maintenance or updates.
          </p>
          <p>
            We take reasonable steps to keep the site secure, but we cannot promise it will be free from viruses or other harmful code. You are responsible for protecting your own devices.
          </p>
          <h2 id="section-10">10. Our liability to you</h2>
          <p>
            <strong className="st-lead">What we do not exclude.</strong> Nothing in these terms excludes or limits our liability for:
          </p>
          <ul>
            <li>death or personal injury caused by our negligence</li>
            <li>fraud or fraudulent misrepresentation</li>
            <li>anything else that Irish law does not allow us to exclude or limit</li>
          </ul>
          <p>
            <strong className="st-lead">If you are a consumer.</strong> The site is aimed at businesses. If you use it as a consumer, you have rights under Irish consumer law that cannot be taken away by these terms, and nothing here affects them.
          </p>
          <p>
            <strong>Otherwise, as far as Irish law allows:</strong>
          </p>
          <ul>
            <li>The site and any demo are provided free of charge and as they are. We exclude all conditions, warranties and representations about the site and demos that are not written in these terms.</li>
            <li>We are not liable for loss of profit, loss of business, loss of revenue, loss of contracts, loss of goodwill, business interruption, loss of or damage to data, or any indirect or consequential loss, arising from your use of the site or a demo, or from not being able to use them.</li>
            <li>We are not liable for loss caused by relying on site content, by a website we link to, or by events outside our reasonable control.</li>
            <li>Our total liability to you arising from the site and demos, whether in contract, tort (including negligence) or otherwise, is limited to EUR <mark className="st-confirm">[PETE TO CONFIRM amount, with solicitor]</mark>.</li>
          </ul>
          <p>
            This section is about the site and demos only. Our liability to a customer for a build, hosting or support is set out in that customer's written agreement.
          </p>
          <h2 id="section-11">11. Changes to these terms</h2>
          <p>
            We may update these terms from time to time, for example when the site or the law changes. The current version is always on this page, with the date it was last updated at the top.
          </p>
          <p>
            The version in force when you use the site or open a demo is the one that applies to that use.
          </p>
          <h2 id="section-12">12. Governing law and courts</h2>
          <p>
            These terms, and any dispute or claim arising from them, from the site or from a demo, are governed by the laws of Ireland.
          </p>
          <p>
            The courts of Ireland have exclusive jurisdiction over any such dispute or claim.
          </p>
          <p>
            If you are a consumer living in another country of the European Union, you keep the protection of the mandatory laws of that country and may be entitled to bring a claim in its courts.
          </p>
          <h2 id="section-13">13. General</h2>
          <p>
            If a court finds that any part of these terms cannot be enforced, the rest still applies.
          </p>
          <p>
            If we do not act on a breach of these terms straight away, we have not given up the right to act on it later.
          </p>
          <p>
            These terms are between you and us. Nobody else has rights under them.
          </p>
          <h2 id="section-14">14. Contact</h2>
          <p>
            If you have a question about these terms, email peter@streamlinedai.tech or write to:
          </p>
          <p>
            Streamlined Digital Tech Limited Castleblakeney, Ballinasloe, Co. Galway, H53 YA97
          </p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
