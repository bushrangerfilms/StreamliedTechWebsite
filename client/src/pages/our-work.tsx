import { Link } from "wouter";
import { FileCheck, FolderPlus, LayoutDashboard, PencilLine, ScanLine, Send, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";
import { ClientLogo } from "@/components/testimonial";
import { IconTile } from "@/components/icon-tile";

// Copy on this page is mirrored word for word in
// client/src/lib/seo-static-html.ts ("/our-work"). Change both together.
//
// Rules for this page (Pete, 17 Nov 2026): only IPM Enviro and Komplete
// Engineers are named. Logos, never links to a client's website. No
// screenshots of client apps and no demo or "try one" links. The testimonial
// slot under each card stays empty, and renders nothing, until Pete says a
// quote may be reused here.
//
// Each card's approved line is followed by the same three things as an icon
// panel: three tiles joined by a line. The panel's short labels are cut from
// the line, nothing added. Pete, 17 Nov 2026: no client photos will be
// supplied, so the panel is the card's picture. Never put a photo of a
// client's people or premises here that the client did not give us, and never
// a demo screen (it would read as the client's own app).

const IPM_FLOW: { icon: LucideIcon; label: string }[] = [
  { icon: ScanLine, label: "Scans each numbered unit" },
  { icon: PencilLine, label: "Logs what they found" },
  { icon: FileCheck, label: "The visit report writes itself" },
];

const KOMPLETE_FLOW: { icon: LucideIcon; label: string }[] = [
  { icon: Send, label: "Quotes that chase themselves" },
  { icon: FolderPlus, label: "A new project set up in one tap" },
  { icon: LayoutDashboard, label: "Every live project at a glance" },
];

function Flow({ items }: { items: { icon: LucideIcon; label: string }[] }) {
  return (
    <ul className="st-flow">
      {items.map((item) => (
        <li key={item.label}>
          <IconTile icon={item.icon} />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default function OurWork() {
  useSeo(ROUTE_SEO.ourWork);

  return (
    <div className="st-page">
      <SiteHeader />
      <main>
        <section className="st-hero st-hero--page" data-testid="section-hero">
          <div className="st-wrap">
            <h1 data-testid="text-hero-headline">Our work</h1>
            <p className="st-lede">Two of the apps we have built, and what each one does.</p>
          </div>
        </section>

        <section className="st-section" data-testid="section-clients">
          <div className="st-wrap">
            <div className="st-clients">
              <div className="st-client" data-testid="card-client-ipm">
                <ClientLogo client="ipm" />
                <h2>IPM Enviro</h2>
                <p>
                  The technician scans each numbered unit on an iPad and logs what they found, and the visit report writes itself.
                </p>
                <Flow items={IPM_FLOW} />
              </div>
              <div className="st-client" data-testid="card-client-komplete">
                <ClientLogo client="komplete" />
                <h2>Komplete Engineers</h2>
                <p>
                  Quotes that chase themselves, a new project set up in one tap, and every live project at a glance.
                </p>
                <Flow items={KOMPLETE_FLOW} />
              </div>
            </div>
            <p style={{ marginTop: "1.75rem" }}>
              Read more about our <Link href="/pest-control-app">job management app for pest control companies</Link> and our <Link href="/engineering-firm-software">project software for engineering firms</Link>.
            </p>
            <p>
              <Link href="/reviews" data-testid="link-reviews">Read what our customers say.</Link>
            </p>
            <p className="st-note">
              <ShieldCheck strokeWidth={1.5} aria-hidden="true" />
              <span>We only name clients who have said we can. Their apps are their own, so we don't show screenshots of them here.</span>
            </p>
          </div>
        </section>

        <ClosingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
