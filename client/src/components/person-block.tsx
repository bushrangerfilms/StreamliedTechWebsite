import { ClipboardCheck, LifeBuoy, PhoneCall } from "lucide-react";
import { IconTile } from "@/components/icon-tile";

// "Who you'll deal with", shown on the home page and on /about. The words are
// mirrored in client/src/lib/seo-static-html.ts for both routes. Change both
// together: the build fails if they drift.
//
// Pete, 17 Nov 2026, 20:02: "This section about me is weird. It should say
// something like Founder and not be specific about mining and construction.
// I have experience in way more industries ... The workflow isn't about me -
// it's about Streamlined Tech looking after you ongoing."
//
// The industries in the line below are only the ones his own CVs show (the
// 2023 CV, the 2026 CV, and the CV sent with the insurance proposal): video
// production, workplace safety and training, property, farming, and the two
// named clients' trades. Never add an industry without a source like that.
// The three steps are about Streamlined Tech ("we"), never about Pete.

const STAGES = [
  {
    icon: PhoneCall,
    title: "A discovery call and a free demo",
    text: "We call you for 10 to 15 minutes. If it looks like a fit, we build a free demo of your own app.",
  },
  {
    icon: ClipboardCheck,
    title: "The build and a two-week field test",
    text: "We build it, then you use it on your own jobs for two weeks while we refine it.",
  },
  {
    icon: LifeBuoy,
    title: "Looked after from then on",
    text: "A dedicated product manager, support from real people, a Feedback button in every app and ongoing refinements.",
  },
];

export function PersonBlock({ lazy = false }: { lazy?: boolean }) {
  return (
    <div className="st-person">
      <figure className="st-person__photo">
        <img
          src="/images/pete-harris.jpg"
          alt="Pete Harris"
          width="640"
          height="640"
          loading={lazy ? "lazy" : undefined}
          decoding="async"
        />
        <figcaption>
          <strong>Pete Harris</strong>
          <span>Founder, Streamlined Tech</span>
        </figcaption>
      </figure>
      <div>
        <h2>Who you'll deal with</h2>
        <p className="st-narrow">
          Pete Harris founded Streamlined Tech and builds the apps. He has run his own companies since 2007.
        </p>
        <p className="st-narrow">
          His work has covered video production, workplace safety and training, property, farming, pest control and engineering.
        </p>
        <h3 className="st-person__sub">How Streamlined Tech looks after you</h3>
        <ol className="st-stages">
          {STAGES.map((stage) => (
            <li key={stage.title}>
              <IconTile icon={stage.icon} small />
              <h4>{stage.title}</h4>
              <p>{stage.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
