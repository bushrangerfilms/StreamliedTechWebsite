import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";

export default function Privacy() {
  usePageTracking();
  useSeo(ROUTE_SEO.privacy);
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
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8" data-testid="text-privacy-title">
          Privacy Policy
        </h1>

        <div className="prose prose-slate max-w-none space-y-6">
          <p>
            This website is operated by Streamlined Tech, a registered business name of Streamlined Digital Tech LTD ("we", "us", or "our"). We are committed to protecting the privacy of visitors and users of our website and to complying with applicable data protection laws. This Privacy Policy outlines how we collect, use, and safeguard any personal data you provide through this site or by communicating with us electronically.
          </p>

          <p>By using our website, you agree to the terms outlined in this policy.</p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">What Information We Collect</h2>
          <p>We may collect and process the following types of personal data:</p>

          <h3 className="text-lg font-display font-medium mt-6 mb-3">1. Information you provide to us:</h3>
          <p>
            You may give us information about yourself by filling out forms on our website - such as contact forms, enquiry forms, or service request forms. This information can include your name, email address, and phone number.
          </p>

          <h3 className="text-lg font-display font-medium mt-6 mb-3">2. Information we collect automatically:</h3>
          <p>Each time you visit our site, we may automatically collect technical and usage information, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A truncated and anonymised version of your IP address</li>
            <li>Browser type and version</li>
            <li>Operating system and platform</li>
            <li>The pages you visit and actions you take (e.g., clicks, downloads)</li>
            <li>Page load speeds, visit duration, and errors encountered</li>
            <li>Date, time, and source of your visit</li>
          </ul>
          <p>This data is collected anonymously and is not linked to you as an individual.</p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Cookies</h2>
          <p>
            We use cookies to enhance your browsing experience, help us understand site usage, and improve performance. Cookies distinguish you from other users, allowing us to tailor the website for better usability and relevance.
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
              Analyse trends and statistics using tools such as Google Analytics
              (<a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Learn how Google uses data</a>)
            </li>
          </ul>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">How Your Information Is Stored and Shared</h2>
          <p>Your personal information may be:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sent to us directly via email</li>
            <li>Stored securely on servers provided by our trusted third-party web host and CRM provider, HighLevel, LLC.</li>
            <li>Stored securely with Supabase (database hosting) and processed by Resend (email delivery) when you submit a form on our website requesting information from us.</li>
          </ul>
          <p>
            HighLevel acts on our instructions and meets high standards for data protection and security. They do not access, modify, or delete any data unless we explicitly authorise it. Your data is never sold, rented, or shared with third parties for commercial purposes.
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
            If you believe your data has been misused or mishandled, you also have the right to lodge a complaint with the Data Protection Commission (DPC) in Ireland or your local supervisory authority.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Policy Updates</h2>
          <p>
            We may update this Privacy Policy from time to time. All changes will be posted on this page. Please check back periodically to stay informed.
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
