import type { LucideIcon } from "lucide-react";

/**
 * A line icon in a small square tile. One look for every icon on the site:
 * thin navy stroke on white, hairline border, no fill and no gradient. The
 * icon is decoration beside its text, so it is hidden from screen readers.
 */
export function IconTile({ icon: Icon, small = false }: { icon: LucideIcon; small?: boolean }) {
  return (
    <span className={small ? "st-icon st-icon--small" : "st-icon"} aria-hidden="true">
      <Icon strokeWidth={1.5} />
    </span>
  );
}
