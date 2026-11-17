import { ArrowRight, Check, Quote, X } from "lucide-react";
import { ScreenShot } from "@/components/screen-shot";

// "What's changed with AI": the point Pete makes on nearly every sales call.
// The quote is his own wording from the Sales Consultant Training doc
// (streamlined-local/sales-consultant/sales-consultant-training.html, "What's
// changed with AI"), shown one or two sentences to a line. One sentence of his
// is left off: "You can automate far more of the work too, often for less than
// EUR 10,000", because the site publishes only its two "from" prices. The
// last line is the approved line from the same docs. Mirrored in
// client/src/lib/seo-static-html.ts ("/").

const BEFORE = ["It had to cater for thousands of businesses", "Menus within menus", "Staff just avoid using it"];
const NOW = ["Your own software", "Does exactly what you need", "Easier than what your staff are doing now"];

export function AiChange() {
  return (
    <section className="st-section st-section--tint" data-testid="section-ai">
      <div className="st-wrap st-ai">
        <div>
          <h2>What's changed with AI</h2>
          <figure className="st-quote st-ai__quote">
            <Quote className="st-quote__mark" strokeWidth={1.5} aria-hidden="true" />
            <blockquote>
              <p>“What's changed now with AI is this.</p>
              <p>You used to need a quarter of a million to make software, so it had to cater for thousands of businesses.</p>
              <p>That's why you end up with menus within menus, and it gets so complicated that staff just avoid using it.</p>
              <p>Now you can have your own software that does exactly what you need, and it's so simple to use that it's easier than what your staff are doing now.”</p>
            </blockquote>
            <figcaption>
              <span>Pete Harris, Founder, Streamlined Tech</span>
            </figcaption>
          </figure>
          <div className="st-thennow" aria-hidden="true">
            <div>
              <p className="st-kicker">Off-the-shelf software</p>
              <ul>
                {BEFORE.map((item) => (
                  <li key={item}>
                    <X strokeWidth={1.75} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <ArrowRight className="st-thennow__arrow" strokeWidth={1.5} />
            <div className="st-thennow__now">
              <p className="st-kicker">Now</p>
              <ul>
                {NOW.map((item) => (
                  <li key={item}>
                    <Check strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="st-ai__line">
            AI means we can build it far quicker and cheaper than it used to be, so having your own app now makes sense for a business your size.
          </p>
        </div>
        <ScreenShot screen="today" />
      </div>
    </section>
  );
}
