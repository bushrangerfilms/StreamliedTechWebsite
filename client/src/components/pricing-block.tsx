/**
 * The pricing block (home and /how-it-works only). Two plain cards, same
 * size, the cheaper one first. Figures decided by Pete on 17 Nov 2026:
 * "from €4,900 + VAT" and "from €120,000 + VAT", no more than 2 of the
 * second a year. No other figure is published and no monthly figure. The
 * cards carry no button: the page's one call block follows at the end.
 */
export function PricingBlock() {
  return (
    <div className="st-prices" data-testid="block-pricing">
      <div className="st-price" data-testid="card-price-one-app">
        <p className="st-price__label">One app</p>
        <h3>A custom app for your business</h3>
        <p className="st-price__figure">
          From €4,900 + VAT
          <small>then a monthly fee for hosting</small>
        </p>
        <p>
          Your own app, built around how you already work. Free demo first if it looks like a fit. A build fee, then a monthly fee that covers hosting, support from real people and ongoing refinements. No charge per user.
        </p>
        <p className="st-price__note">
          Done within 2 weeks of your go-ahead. Two weeks of testing on your own jobs.
        </p>
      </div>
      <div className="st-price" data-testid="card-price-whole-business">
        <p className="st-price__label">The whole business</p>
        <h3>The Whole Business Build</h3>
        <p className="st-price__figure">
          From €120,000 + VAT
          <small>your whole business, built with you over a year</small>
        </p>
        <p>
          Some businesses need more than one app. For twelve months I work alongside you and your team, on site and off. We go through how the work really moves, from the first call to the final invoice, and I build the systems to run it as one connected set. Each one is tested on your own jobs before we move to the next. You deal with me directly throughout. It takes a lot of my time, which is why it costs what it does.
        </p>
        <p className="st-price__note">
          I take on no more than 2 of these a year, because I do the work myself.
        </p>
      </div>
    </div>
  );
}
