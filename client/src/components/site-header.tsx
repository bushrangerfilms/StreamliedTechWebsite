import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export const BOOKING_URL =
  "https://calendly.com/streamlinedaitech/discover-how-we-can-automate-simplify-your-workflows";

const NAV_LINKS = [
  { href: "/business", label: "What we build" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/products", label: "Products" },
  { href: "/australia", label: "Australia" },
];

/**
 * Shared header for every marketing page. Before this existed each page
 * carried its own inline header with a divergent link set; the campaign
 * pages (/details, /ai-employees form section) are the only deliberate
 * exceptions to using it.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-border bg-white sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center shrink-0" data-testid="link-header-home">
          <img
            src="/images/logo.webp"
            alt="Streamlined Tech - Intelligent AI Automations"
            className="h-14 md:h-[72px] w-auto"
            width="389"
            height="144"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`link-nav-${link.href.replace(/\//g, "")}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="lg" className="min-h-11" data-testid="button-cta-header">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a free call
          </a>
        </Button>
      </div>
    </header>
  );
}
