import { Hammer, MessageSquare, PhoneCall } from "lucide-react";
import { IconTile } from "@/components/icon-tile";

// "Who you'll deal with", shown on the home page and on /about. The words are
// mirrored in client/src/lib/seo-static-html.ts for both routes. Change both
// together: the build fails if they drift.

const STAGES = [
  { icon: PhoneCall, text: "Until you go ahead, one of our team follows up for me by phone." },
  { icon: Hammer, text: "Once you go ahead I build it and see it through." },
  {
    icon: MessageSquare,
    text: "After that you have support from real people, and every app has a Feedback button: tell us what is not right and we change it.",
  },
];

export function PersonBlock({ lazy = false }: { lazy?: boolean }) {
  return (
    <div className="st-person">
      <img
        src="/images/pete-harris.jpg"
        alt="Pete Harris"
        width="640"
        height="640"
        loading={lazy ? "lazy" : undefined}
        decoding="async"
      />
      <div>
        <h2>Who you'll deal with</h2>
        <p className="st-person__intro">I'm Pete Harris. I build the apps.</p>
        <p className="st-narrow">
          I spent over 20 years in heavy industry and construction before this, so I know what a job sheet in a van looks like.
        </p>
        <ol className="st-stages">
          {STAGES.map((stage) => (
            <li key={stage.text}>
              <IconTile icon={stage.icon} small />
              <p>{stage.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
