import { Link, useLocation } from "wouter";

const NAV_LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/our-work", label: "Our work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Shared header for every page. It scrolls away with the page on purpose:
 * no sticky bar. It carries one of the site's three call buttons (the
 * others are the block at the end of a page and the form on /contact).
 */
export function SiteHeader() {
  const [location] = useLocation();
  return (
    <header className="st-header">
      <div className="st-wrap st-header__row">
        <Link href="/" className="st-brand" data-testid="link-header-home">
          <img src="/images/logo-mark.png" alt="" width="40" height="40" />
          <span>Streamlined Tech</span>
        </Link>
        <nav className="st-nav" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={location === link.href ? "page" : undefined}
              data-testid={`link-nav-${link.href.replace(/\//g, "")}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="st-btn st-btn--quiet" data-testid="button-call-header">
          Ask for a call
        </Link>
      </div>
    </header>
  );
}
