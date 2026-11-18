import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/our-work", label: "Our work" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

/** Shared footer: the site map, the five social accounts and the company line. */
export function SiteFooter() {
  return (
    <footer className="st-footer">
      <div className="st-wrap">
        <div className="st-footer__row">
          <div>
            <Link href="/" className="st-brand">
              <img src="/images/logo-mark.png" alt="" width="40" height="40" loading="lazy" />
              <span>Streamlined Tech</span>
            </Link>
            <div className="st-social">
              <a href="https://www.facebook.com/streamlinedtechai/" target="_blank" rel="noopener noreferrer" aria-label="Streamlined Tech on Facebook" data-testid="link-facebook">
                <Facebook />
              </a>
              <a href="https://www.instagram.com/streamlinedtechai/" target="_blank" rel="noopener noreferrer" aria-label="Streamlined Tech on Instagram" data-testid="link-instagram">
                <Instagram />
              </a>
              <a href="https://www.youtube.com/@StreamlinedTechAI" target="_blank" rel="noopener noreferrer" aria-label="Streamlined Tech on YouTube" data-testid="link-youtube">
                <Youtube />
              </a>
              <a href="https://www.tiktok.com/@streamlinedtech" target="_blank" rel="noopener noreferrer" aria-label="Streamlined Tech on TikTok" data-testid="link-tiktok">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/peter-harris-62b05a57/" target="_blank" rel="noopener noreferrer" aria-label="Pete Harris on LinkedIn" data-testid="link-linkedin">
                <Linkedin />
              </a>
            </div>
          </div>
          <ul className="st-footer__links">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="st-footer__legal">
          Streamlined Tech is a trading name of Streamlined Digital Tech Ltd. Streamlined Digital Tech Limited, registered in Ireland, company number 805162. Registered office: Castleblakeney, Ballinasloe, Co. Galway, H53 YA97.
        </p>
      </div>
    </footer>
  );
}
