import { FileCheck, FolderPlus, LayoutDashboard, PencilLine, ScanLine, Send, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { ROUTE_SEO } from "@/lib/seo-routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosingCall } from "@/components/closing-call";
import { ClientLogo } from "@/components/testimonial";
import { IconTile } from "@/components/icon-tile";
import { ImageSlot } from "@/components/image-slot";

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
// strip. The strip's short labels are cut from the line, nothing added.

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
                <ImageSlot id="our-work-ipm" wanted="A real photo from IPM Enviro, with their OK: a technician on a visit with the iPad. Not a screenshot of the app." />
              </div>
              <div className="st-client" data-testid="card-client-komplete">
                <ClientLogo client="komplete" />
                <h2>Komplete Engineers</h2>
                <p>
                  Quotes that chase themselves, a new project set up in one tap, and every live project at a glance.
                </p>
                <Flow items={KOMPLETE_FLOW} />
                <ImageSlot id="our-work-komplete" wanted="A real photo from Komplete Engineers, with their OK: the team or a job on site. Not a screenshot of the app." />
              </div>
            </div>
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
