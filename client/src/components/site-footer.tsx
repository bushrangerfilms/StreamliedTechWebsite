import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const LANE_LINKS = [
  { href: "/business", label: "Irish businesses" },
  { href: "/contractors", label: "Contractors" },
  { href: "/installers", label: "Installers" },
  { href: "/australia", label: "Australia" },
];

const COMPANY_LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/products", label: "Products" },
  { href: "/guide/set-up-ai-for-business-ireland", label: "Set up AI guide" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms and Conditions" },
];

/** Shared footer with the full site map. Same deal as SiteHeader. */
export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo.webp"
                alt="Streamlined Tech - Intelligent AI Automations"
                className="h-14 w-auto"
                width="389"
                height="144"
                loading="lazy"
              />
            </Link>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/streamlinedtechai/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/streamlinedtechai/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@StreamlinedTechAI" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-youtube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@streamlinedtech" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-tiktok">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/peter-harris-62b05a57/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-foreground mb-1">Who we work with</p>
              {LANE_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-foreground mb-1">Company</p>
              {COMPANY_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
