import { Link } from "wouter";

/**
 * The one call block at the end of a page. Pete, 17 Nov 2026: fewer call
 * buttons. One in the header, one here, one on /contact, and none repeated
 * after each section. Do not add this anywhere but the end of a page.
 */
export function ClosingCall() {
  return (
    <section className="st-closing" data-testid="section-closing-call">
      <div className="st-wrap">
        <h2>Tell us how you run things.</h2>
        <p>
          Ask for a call and we'll ring you for 10 to 15 minutes. If an app wouldn't help your business, we'll tell you.
        </p>
        <div className="st-closing__row">
          <Link href="/contact" className="st-btn" data-testid="button-call-closing">
            Ask for a call
          </Link>
          <span className="st-small">
            Or email <a href="mailto:peter@streamlinedai.tech">peter@streamlinedai.tech</a>
          </span>
        </div>
      </div>
    </section>
  );
}
