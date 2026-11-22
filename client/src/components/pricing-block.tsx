import { Check } from "lucide-react";
import { currentPrices } from "@/lib/pricing";

/**
 * The pricing block (home, /how-it-works and /pricing). Two plain cards, same
 * size, the cheaper one first. The figures (build, monthly and Whole Business)
 * and their tax wording come from client/src/lib/pricing.ts, by the visitor's
 * market; never write a price in this file. No more than 2 of the second a
 * year. The cards carry no button: the page's one call block follows at the
 * end.
 *
 * The approved paragraphs are shown one sentence to a line with a tick, so
 * neither card is a slab of text. The words are unchanged.
 */

const ONE_APP = [
  "Free demo first if it looks like a fit.",
  "A build fee, then a monthly fee that covers hosting, support from real people and ongoing refinements.",
  "No charge per user.",
];

const WHOLE_BUSINESS = [
  "For twelve months I work alongside you and your team, on site and off.",
  "We go through how the work really moves, from the first call to the final invoice, and I build the systems to run it as one connected set.",
  "Each one is tested on your own jobs before we move to the next.",
  "You deal with me directly throughout.",
];

function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="st-ticks">
      {items.map((item) => (
        <li key={item}>
          <Check strokeWidth={2} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PricingBlock() {
  const prices = currentPrices();
  return (
    <div className="st-prices" data-testid="block-pricing">
      <div className="st-price" data-testid="card-price-one-app">
        <p className="st-price__label">One app</p>
        <h3>A custom app for your business</h3>
        <p className="st-price__figure">
          {prices.build}
          <small>{prices.monthly}</small>
        </p>
        <p>Your own app, built around how you already work.</p>
        <Ticks items={ONE_APP} />
        <p className="st-price__note">
          Done within 2 weeks of your go-ahead. Two weeks of testing on your own jobs.
        </p>
      </div>
      <div className="st-price" data-testid="card-price-whole-business">
        <p className="st-price__label">The whole business</p>
        <h3>The Whole Business Build</h3>
        <p className="st-price__figure">
          {prices.whole}
          <small>your whole business, built with you over a year</small>
        </p>
        <p>Some businesses need more than one app.</p>
        <Ticks items={WHOLE_BUSINESS} />
        <p>It takes a lot of my time, which is why it costs what it does.</p>
        <p className="st-price__note">
          I take on no more than 2 of these a year, because I do the work myself.
        </p>
      </div>
    </div>
  );
}
