import { ArrowRight, BellRing, CalendarDays, ClipboardList, Images, LayoutGrid, NotebookPen, Receipt, Table, Users } from "lucide-react";

/**
 * The hero picture: a simple diagram of the offer, drawn from the page's own
 * words ("a diary, a spreadsheet and a few apps that don't talk to each
 * other" becoming "your own app ... with everything in one place"). It is a
 * drawing, not a screenshot: no client app and no demo is shown.
 */

const BEFORE = [
  { icon: NotebookPen, label: "A diary" },
  { icon: Table, label: "A spreadsheet" },
  { icon: LayoutGrid, label: "A few apps" },
  { icon: ClipboardList, label: "Job sheets" },
];

const INSIDE = [CalendarDays, Users, Images, BellRing, Receipt];

export function AppsDiagram() {
  return (
    <div
      className="st-diagram"
      role="img"
      aria-label="A diary, a spreadsheet, a few apps and job sheets become your own app, with everything in one place."
      data-testid="diagram-one-place"
    >
      <ul className="st-diagram__before">
        {BEFORE.map(({ icon: Icon, label }) => (
          <li key={label}>
            <Icon strokeWidth={1.5} />
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <ArrowRight className="st-diagram__arrow" strokeWidth={1.5} />
      <div className="st-diagram__after">
        <img src="/images/logo-mark.png" alt="" width="40" height="40" />
        <strong>Your own app</strong>
        <span>Everything in one place</span>
        <div className="st-diagram__inside">
          {INSIDE.map((Icon, i) => (
            <Icon key={i} strokeWidth={1.5} />
          ))}
        </div>
      </div>
    </div>
  );
}
