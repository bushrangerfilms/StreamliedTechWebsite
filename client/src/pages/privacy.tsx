import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { clearAdConsent } from "@/lib/ad-consent";

// Set this to the date of the production deploy that carries the version
// of the policy below (plain words, e.g. "10 September 2026").
const LAST_UPDATED = "3 September 2026";

export default function Privacy() {
  usePageTracking();
  useSeo(ROUTE_SEO.privacy);
  const [withdrawn, setWithdrawn] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2" data-testid="text-privacy-title">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-8" data-testid="text-privacy-updated">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-slate max-w-none space-y-6">
          <p>
            This website is operated by Streamlined Tech, a registered business name of Streamlined Digital Tech LTD ("we", "us", or "our"). We are committed to protecting the privacy of visitors and users of our website and to complying with applicable data protection laws. This Privacy Policy outlines how we collect, use, and safeguard any personal data you provide through this site or by communicating with us electronically.
          </p>

          <p>
            This policy explains what we collect, why we collect it, and the choices you have. Where the law says we need your permission first, we ask for it on the page itself, and you can change your answer at any time. Simply using the site does not count as permission.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">What Information We Collect</h2>
          <p>We may collect and process the following types of personal data:</p>

          <h3 className="text-lg font-display font-medium mt-6 mb-3">1. Information you provide to us:</h3>
          <p>
            You may give us information about yourself by filling out forms on our website - such as contact forms, enquiry forms, or service request forms. This information can include your name, email address, and phone number.
          </p>

          <h3 className="text-lg font-display font-medium mt-6 mb-3">2. Information we collect automatically:</h3>
          <p>Each time you visit our site, we may automatically collect technical and usage information, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your IP address, truncated and anonymised for site measurement. If you accept advertising cookies on our AI Employees pages, your full IP address also goes to Meta and TikTok, as described under Cookies.</li>
            <li>Browser type and version</li>
            <li>Operating system and platform</li>
            <li>The pages you visit and actions you take (e.g., clicks, downloads)</li>
            <li>Page load speeds, visit duration, and errors encountered</li>
            <li>Date, time, and source of your visit</li>
          </ul>
          <p>
            Apart from the advertising measurement described under Cookies, which runs only on our AI Employees pages and only if you accept it there, this data is collected without cookies and is not linked to you as an individual.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Cookies</h2>
          <p>
            Most of this website sets no tracking or advertising cookies. Visit counts and page performance are measured with Vercel Web Analytics and Vercel Speed Insights, which are cookieless and do not identify you as an individual. Our hosting provider may set strictly necessary cookies required to serve the site securely.
          </p>
          <p>
            For the length of your visit, our AI Employees pages also keep the campaign tag from the link you arrived on, and the click identifier if you arrived from an ad shown in ChatGPT, in your browser's session storage. That is how the quote form tells us which page or ad brought you here. It sets no cookie, it is not shared with anyone unless you send the quote form, and it is cleared when you close the tab.
          </p>

          <h3 className="text-lg font-display font-medium mt-6 mb-3">Advertising cookies on our AI Employees pages</h3>
          <p>
            We run paid ads on Facebook, Instagram and TikTok that send people to our AI Employees pages, which are the pages under streamlinedai.tech/ai-employees. On those pages only, and only if you choose Accept in the cookie notice, we load the Meta Pixel from Meta Platforms Ireland Limited and the TikTok Pixel from TikTok Technology Limited. They tell us which ads led to a visit, to someone starting the quote form or opening a booking link, and to a quote request, so we know what our advertising is doing. Meta and TikTok also use those events to decide who sees our ads. Nothing loads until you choose. If you choose Reject, or make no choice, nothing loads and the page works exactly the same.
          </p>
          <p>
            If you accept, the Meta Pixel sets the _fbp cookie, and the _fbc cookie when you arrived from a Meta ad. The TikTok Pixel sets the _ttp cookie, the ttclid cookie when you arrived from a TikTok ad, and cookies whose names begin with _tt_enable_cookie or ttcsid. Meta's cookies last for up to 90 days from when they were set. TikTok's cookies last for up to 13 months from the last time they were used. Both companies may also set cookies on their own domains when the pixel loads, which this site cannot delete. Your choice is kept in your browser's local storage under the name st-ad-consent, with the date you made it, for up to six months, after which we ask again. That record stays in your browser, is not shared with anyone and is not itself a tracking cookie.
          </p>
          <p>
            If you accept and then send us a quote request from one of those pages, we also send one copy of that event to Meta and one to TikTok from our own server, so each platform can match the request to the ad that led to it. That copy carries your email address and name in hashed form, which is a one-way scrambled version that the platform can match against its own records but cannot read back, along with the page address, the address of the page you came from if your browser passes it on, your IP address, your browser type, and the cookie and click identifiers described above. It does not carry your company name, the job you described, or anything else you wrote. If you reject, none of that is sent.
          </p>
          <p>
            Our legal basis for all of this is your consent, under Regulation 5 of the ePrivacy Regulations 2011 and Article 6(1)(a) of the General Data Protection Regulation.
          </p>
          <p>
            You can change or withdraw your choice at any time. Use the Cookie settings link at the bottom of any AI Employees page, or press the button below. Withdrawing removes the Meta and TikTok cookies set on this site from your browser and stops any further data going to those platforms from this site. It does not recall data already sent; for that, each company's own privacy controls apply, and you can also email peter@streamlinedai.tech and we will pass the request on.
          </p>
          <div>
            <Button
              type="button"
              variant="outline"
              className="min-h-11"
              onClick={() => {
                clearAdConsent();
                setWithdrawn(true);
              }}
              data-testid="button-withdraw-cookies"
            >
              Withdraw cookie consent
            </Button>
            {withdrawn && (
              <p role="status" className="text-sm text-muted-foreground mt-2" data-testid="text-withdraw-done">
                Done. Your choice has been cleared and the advertising cookies set on this site have been removed from this browser.
              </p>
            )}
          </div>
          <p>
            Meta and TikTok describe their own use of this data in their privacy policies:{" "}
            <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Meta's privacy policy</a>
            {" "}and{" "}
            <a href="https://www.tiktok.com/legal/page/eea/privacy-policy/en" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TikTok's privacy policy for the European Economic Area</a>.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">How We Use Your Data</h2>
          <p>We use the information we collect to:</p>

          <h3 className="text-lg font-display font-medium mt-6 mb-3">Information you provide:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respond to your enquiries or service requests</li>
            <li>Provide you with relevant information or marketing communications (only if requested by you)</li>
          </ul>

          <h3 className="text-lg font-display font-medium mt-6 mb-3">Information we collect automatically:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Improve and optimise website performance and content delivery</li>
            <li>Ensure the website remains secure and functions correctly</li>
            <li>
              Analyse visit counts and page performance using Vercel Web Analytics and Speed Insights
              (<a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">how Vercel handles this data</a>)
            </li>
            <li>Measure which of our Facebook, Instagram and TikTok ads lead to visits, quote form activity and quote requests on our AI Employees pages, only with your consent</li>
          </ul>
          <p>
            Our legal basis for handling an enquiry is that you asked us to respond to it, which counts as steps taken at your request before any contract. For the advertising measurement described under Cookies, our legal basis is your consent.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">How Your Information Is Stored and Shared</h2>
          <p>Your personal information may be:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sent to us directly via email</li>
            <li>Hosted and served by Vercel, Inc., our website hosting provider, which processes standard server logs to deliver and secure the site.</li>
            <li>Stored securely with Supabase (database hosting) and processed by Resend (email delivery) when you submit a form on our website requesting information from us.</li>
            <li>Processed by Calendly if you choose to book a call through the booking links on this site. Calendly's own privacy policy also applies to that booking.</li>
            <li>Loaded with fonts from Google Fonts, which means Google LLC receives your IP address and browser details when a page loads. Google Fonts sets no cookies, and Google's privacy policy applies to that request.</li>
            <li>Shared with OpenAI when you send a quote request after arriving from an ad shown in ChatGPT: a reference number for your enquiry, the click identifier from the ad, and the page you were on, so OpenAI can count the quote against the ad. No name, email address, cookies or IP address are sent. We rely on our legitimate interest in knowing whether our advertising works for this.</li>
            <li>
              Shared with Meta Platforms Ireland Limited (Facebook and Instagram advertising) only if you accepted advertising cookies on our AI Employees pages, in the hashed and limited form described under Cookies. See{" "}
              <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Meta's privacy policy</a>.
            </li>
            <li>
              Shared with TikTok Technology Limited (TikTok advertising) on the same terms. See{" "}
              <a href="https://www.tiktok.com/legal/page/eea/privacy-policy/en" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TikTok's privacy policy for the European Economic Area</a>.
            </li>
          </ul>
          <p>
            Vercel, Supabase, Resend and Calendly act on our instructions and do not use your data for their own purposes. Meta and TikTok are different. For collecting the advertising data on our pages and sending it to them, we and Meta act as joint controllers under Meta's business tools terms, and we and TikTok under TikTok's business tools terms. Each platform is then solely responsible for what it does with the data afterwards, including how long it keeps it, under its own privacy policy. Meta may transfer this data to the United States, relying on the EU-US Data Privacy Framework. TikTok may make it available to TikTok group companies outside the European Economic Area, including in China, under the safeguards described in its privacy policy. We never sell or rent your data, and we do not share it with anyone not named on this page.
          </p>
          <p>
            When you send the quote form on an AI Employees page we also record, against your enquiry, whether advertising consent was in place at that moment, when you gave it, and whether the events were sent, so we can show what was and was not shared if you ask.
          </p>
          <p>
            Details you send us through a form or by email are kept for as long as we are in contact with you about your enquiry, and deleted when you ask us to.
          </p>
          <p>
            We take every reasonable step to protect your data, but transmission over the internet can never be completely secure. Any information you send is at your own risk. Once received, we apply strict controls to prevent unauthorised access.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Third-Party Links</h2>
          <p>
            Our website may contain links to other websites. If you click through to a third-party site, please be aware that they have their own privacy policies, and we are not responsible for their practices or content.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Your Rights - Access and Control</h2>
          <p>
            You have the right to request access to the personal data we hold about you (a "Subject Access Request"). If you would like to make such a request, please contact us in writing at{" "}
            <a href="mailto:peter@streamlinedai.tech" className="text-primary hover:underline">peter@streamlinedai.tech</a>. We may request additional details to verify your identity or locate relevant data.
          </p>
          <p>
            Where we rely on your consent, you have the right to withdraw it at any time, and withdrawing it is as easy as giving it: use the Cookie settings link on any AI Employees page or the button in the Cookies section above. Withdrawal does not affect anything done lawfully before it. You also have the right to ask us to correct or delete your personal data, to object to or restrict how we use it, and, where we hold data because you gave it to us or consented, to receive a copy of it in a machine readable format. Write to peter@streamlinedai.tech.
          </p>
          <p>
            If you believe your data has been misused or mishandled, you also have the right to lodge a complaint with the Data Protection Commission (DPC) in Ireland, at{" "}
            <a href="https://www.dataprotection.ie" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.dataprotection.ie</a>, or with your local supervisory authority.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Policy Updates</h2>
          <p>
            We may update this Privacy Policy from time to time. All changes will be posted on this page with the date at the top. Please check back periodically to stay informed.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have questions, comments, or concerns about this Privacy Policy or how we handle your personal information, please contact:
          </p>
          <p className="mt-4">
            <strong>Peter Harris</strong><br />
            <a href="mailto:peter@streamlinedai.tech" className="text-primary hover:underline">peter@streamlinedai.tech</a>
          </p>
        </div>
      </main>

      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Streamlined Digital Tech LTD. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
