import type { LucideIcon } from "lucide-react";

/**
 * "On this page" for the two legal pages: every section as a small icon link,
 * so the page opens with a map instead of a wall of text. The titles are the
 * section headings themselves; each link jumps to its heading.
 */
export function LegalContents({ sections }: { sections: { n: number; title: string; icon: LucideIcon }[] }) {
  return (
    <nav className="st-contents" aria-label="On this page" data-testid="nav-legal-contents">
      <p className="st-kicker">On this page</p>
      <ol>
        {sections.map(({ n, title, icon: Icon }) => (
          <li key={n}>
            <a href={`#section-${n}`}>
              <Icon strokeWidth={1.5} aria-hidden="true" />
              <span>
                {n}. {title}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
