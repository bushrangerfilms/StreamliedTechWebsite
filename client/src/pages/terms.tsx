import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { usePageTracking } from "@/hooks/use-page-tracking";

export default function Terms() {
  usePageTracking();
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
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8" data-testid="text-terms-title">
          Terms & Conditions
        </h1>

        <div className="prose prose-slate max-w-none space-y-6">
          <h2 className="text-xl font-display font-semibold mt-8 mb-4">General</h2>
          <p>
            This website (the "Site") is owned and operated by Streamlined Tech, a registered business name of Streamlined Digital Tech LTD. By using the Site, you agree to be bound by these Terms of Service, our Privacy Policy, and any additional terms and conditions that may apply to specific sections of the Site or to products and services available through it. Accessing or using the Site in any way - automated or otherwise - constitutes your agreement to be bound by these terms.
          </p>
          <p>
            We reserve the right to update these Terms of Service at any time. If we do, we'll post the new version here. Your continued use of the Site after such changes indicates your acceptance of the updated Terms.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Intellectual Property Rights</h2>
          
          <h3 className="text-lg font-display font-medium mt-6 mb-3">Limited License to You</h3>
          <p>
            All materials on this Site, including content, branding, and design, are the property of Streamlined Tech and/or our licensors, and are protected under copyright and other laws. You may use this Site for personal, non-commercial purposes only. You may not copy, modify, reproduce, republish, distribute, or exploit any part of the Site or its materials without express written permission.
          </p>
          <p>
            You may download or print a single copy of content for personal use only, provided all copyright notices remain intact.
          </p>

          <h3 className="text-lg font-display font-medium mt-6 mb-3">Your License to Us</h3>
          <p>
            By submitting content (e.g. comments, photos, videos) through the Site or to our team - whether by email, social media, or other means - you affirm you own the rights to that content or have permission to share it. You also grant Streamlined Tech a royalty-free, perpetual, worldwide license to use, modify, display, and distribute your content in any medium, with the right to attribute your name, email, or username if appropriate.
          </p>
          <p>
            We reserve the right (but not the obligation) to use or remove user-contributed content at our discretion.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Linking & Framing</h2>
          <p>
            You may link to our Site as long as it does not imply any sponsorship or endorsement by Streamlined Tech. However, you may not frame or embed our Site within another site without prior written permission.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Disclaimers</h2>
          <p>
            We may include links to third-party websites for your convenience. These links do not constitute an endorsement. We do not control or guarantee the quality or accuracy of third-party content, products, or services.
          </p>
          <p>
            Any opinions or advice shared by contributors or third parties on the Site do not necessarily reflect the views of Streamlined Tech.
          </p>
          <p>
            The Site and all content are provided "as is," with no warranties of any kind. We disclaim all warranties, express or implied, including fitness for a particular purpose. We do not guarantee uninterrupted access or error-free operation.
          </p>
          <p>
            You agree to hold harmless Streamlined Tech, its affiliates, officers, agents, and employees from any claims arising out of your use of the Site or breach of these Terms.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Online Commerce</h2>
          <p>
            Certain sections of the Site may allow purchases from third-party vendors. We are not responsible for the quality, accuracy, or delivery of any third-party goods or services. Any information you provide during a transaction may be shared with both the merchant and Streamlined Tech.
          </p>
          <p>
            Please review each vendor's terms and privacy policy before purchasing. Any disputes or issues with a purchase are between you and the vendor.
          </p>
          <p>
            You agree to use this Site for legitimate, lawful purchases only and to be financially responsible for all transactions made on your behalf. Sharing or redistributing any paid content is strictly prohibited and may result in account suspension or legal action.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Interactive Features</h2>
          <p>
            This Site may offer features like comments, forums, or chat. You are solely responsible for the content you post. You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Impersonate others</li>
            <li>Violate any laws or third-party rights</li>
            <li>Upload harmful, defamatory, or obscene content</li>
            <li>Post viruses or malicious code</li>
            <li>Collect personal information without consent</li>
            <li>Promote your own products/services without permission</li>
          </ul>
          <p>
            We reserve the right to monitor, edit, or remove content at our discretion. While we aim to maintain a respectful, informative space, we are not liable for content posted by users.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Community Guidelines</h2>
          <p>
            Where applicable, community access is part of our services. To protect the integrity of these spaces, we reserve the right to remove any member who disrupts or detracts from the value of the group.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Registration</h2>
          <p>
            To use certain features, you may be required to register and provide accurate, up-to-date information. Failure to do so may result in termination of your access. All information you provide is governed by our Privacy Policy.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Passwords</h2>
          <p>
            If you create an account, you are responsible for maintaining its confidentiality. Any activity under your login is your responsibility. Please notify us immediately if you suspect unauthorized access.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Streamlined Tech and its affiliates shall not be liable for any damages (direct, indirect, incidental, consequential) resulting from your use of or inability to use the Site, including any third-party links, content, or services.
          </p>
          <p>
            You understand and agree that any content or advice on this Site is for educational purposes only and should not be considered financial, legal, or investment advice. You should consult a qualified professional before making any decisions based on this information.
          </p>
          <p>
            We make no guarantees regarding business results or outcomes from using our services or programs.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Termination</h2>
          <p>
            We reserve the right to terminate your access to the Site or its services at any time without notice. All provisions relating to intellectual property, disclaimers, limitations of liability, and indemnification will survive such termination.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Refund Policy</h2>
          <p>
            Refund terms vary by product, service, or event. Refer to the specific product or event page for refund eligibility and policy.
          </p>

          <h2 className="text-xl font-display font-semibold mt-8 mb-4">Disclaimer of Changes</h2>
          <p>
            We may update these Terms at any time without notice. All updates will be posted to this page.
          </p>

          <p className="mt-8">
            If you have questions or concerns regarding these terms, please contact:<br />
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
