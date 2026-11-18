import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { currentPrices } from "@/lib/pricing";
import { FAQ_AFTER, FAQ_CHANGE, FAQ_COST, FAQ_TRADE, type TradeKey } from "@/lib/trade-faq";

// The parts every trade page shares. The wording is the live site's own
// (how-it-works and the home page); no number, date or claim is added here.
// Mirrored in client/src/lib/seo-static-html.ts (TRADE_CHANGE, TRADE_COST,
// tradeFaq). Change both together: the build fails if they drift.
// These pages carry one call button only: the ClosingCall at the page end.

export function TradeChange() {
  return (
    <section className="st-section st-section--tint" data-testid="section-change">
      <div className="st-wrap st-narrow">
        <h2>Do we have to change how we work?</h2>
        <p>
          No. Your app is built around how you already work, with everything in one place. Off-the-shelf software has to cater for thousands of businesses, which is why you end up bending to it.
        </p>
        <p>
          You see it before you pay for anything. If it looks like a fit after a 10 to 15 minute phone call, we build a free demo of your own app. It uses made-up sample data, so click anything.
        </p>
        <p>It won't be perfect and it isn't meant to be: it gives you something to react to.</p>
      </div>
    </section>
  );
}

export function TradeCost() {
  const prices = currentPrices();
  return (
    <section className="st-section" data-testid="section-cost">
      <div className="st-wrap st-narrow">
        <h2>What does it cost and how does it start?</h2>
        <p>
          <span>{prices.build}</span> for the build, then a monthly fee. You get the price in writing before anything is built, and a 50% deposit starts the build.
        </p>
        <p>
          It starts with a phone call of about 10 to 15 minutes. If it looks like a fit, we build a free demo. Then comes the price in writing, the build, and two weeks of field testing on your own jobs. You pay the second half once it is working for you.
        </p>
        <p>
          After that the monthly fee covers hosting, storage, support from real people and ongoing refinements to what we built. There is no charge per user.
        </p>
        <p>
          <Link href="/how-it-works" className="st-more" data-testid="link-how-it-works">
            How it works, step by step
            <ArrowRight strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}

export function TradeFaq({ trade }: { trade: TradeKey }) {
  const prices = currentPrices();
  const tradeQuestion = FAQ_TRADE[trade];
  return (
    <section className="st-section" data-testid="section-questions">
      <div className="st-wrap st-narrow">
        <h2>Questions owners ask</h2>
        <dl className="st-faq st-faq--plain">
          <div>
            <dt>{FAQ_COST.q}</dt>
            <dd>
              <span>{prices.build}</span> {FAQ_COST.a} <Link href={FAQ_COST.moreHref}>{FAQ_COST.more}</Link>.
            </dd>
          </div>
          <div>
            <dt>{FAQ_CHANGE.q}</dt>
            <dd>{FAQ_CHANGE.a}</dd>
          </div>
          <div>
            <dt>{FAQ_AFTER.q}</dt>
            <dd>{FAQ_AFTER.a}</dd>
          </div>
          <div>
            <dt>{tradeQuestion.q}</dt>
            <dd>{tradeQuestion.a}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
