import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  adConsentBannerEnabled,
  countEvent,
  getAdConsent,
  loadAdPixels,
  pauseAdPixels,
  setAdConsent,
  type AdConsentState,
} from "@/lib/ad-consent";

// Cookie notice for the AI Employees landers. Rendered by the lander (not by
// App.tsx) so the rest of the site stays cookieless and banner-free.
//
// DPC rules built in: nothing loads before a choice; Reject and Accept are
// the same size, the same variant and side by side, Reject first; nothing is
// pre-ticked; the bar is not modal, traps no focus and steals no focus on
// load; the page and the quote form work behind it; the choice can be
// changed at any time from the Cookie settings line this component always
// renders above the footer.
//
// Lifecycle: on mount it loads the pixels for a returning visitor whose
// consent is granted, and on unmount (any in-app navigation away from the
// lander) it pauses them, so the resident scripts fire nothing elsewhere.

interface AdConsentBannerProps {
  /** Called after Accept, so the lander can fire a Lead for a quote sent before the choice. */
  onGranted?: () => void;
}

export default function AdConsentBanner({ onGranted }: AdConsentBannerProps) {
  const enabled = adConsentBannerEnabled();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<AdConsentState>("undecided");
  const [reopened, setReopened] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const state = getAdConsent();
    setCurrent(state);
    if (state === "granted") loadAdPixels();
    if (state === "undecided") {
      setOpen(true);
      countEvent("consent_shown");
    }
    return () => {
      pauseAdPixels();
    };
  }, [enabled]);

  // Reserve space under the fixed bar so the Cookie settings line and the
  // registered-office footer stay readable before a choice is made, and set
  // scroll padding so the lander's focus and scrollIntoView calls land the
  // quote form above the bar rather than underneath it.
  useEffect(() => {
    if (!open) return;
    const el = sectionRef.current;
    if (!el) return;
    const apply = () => {
      const h = `${el.offsetHeight}px`;
      document.body.style.paddingBottom = h;
      document.documentElement.style.scrollPaddingBottom = h;
    };
    apply();
    // Older browsers without ResizeObserver keep the first measurement; the
    // notice must never take the lander down with it.
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(apply) : null;
    observer?.observe(el);
    return () => {
      observer?.disconnect();
      document.body.style.paddingBottom = "";
      document.documentElement.style.scrollPaddingBottom = "";
    };
  }, [open]);

  // Move focus to the notice only when the visitor asked for it.
  useEffect(() => {
    if (open && reopened) titleRef.current?.focus();
  }, [open, reopened]);

  const decide = (choice: "granted" | "denied") => {
    const fromReopen = reopened;
    setAdConsent(choice);
    setCurrent(choice);
    setOpen(false);
    setReopened(false);
    countEvent(choice === "granted" ? "consent_accept" : "consent_reject");
    if (choice === "granted") onGranted?.();
    // A keyboard or screen reader user who reopened the notice should land
    // back on the control they came from, not on the document body.
    if (fromReopen) settingsRef.current?.focus();
  };

  const reopen = () => {
    setCurrent(getAdConsent());
    setReopened(true);
    setOpen(true);
  };

  if (!enabled) return null;

  return (
    <>
      {open && (
        <section
          ref={sectionRef}
          role="region"
          aria-labelledby="ad-consent-title"
          className="fixed inset-x-0 bottom-0 z-40 max-h-[45vh] overflow-y-auto border-t border-border bg-white shadow-lg"
          data-testid="banner-ad-consent"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 space-y-1">
              <p id="ad-consent-title" ref={titleRef} tabIndex={-1} className="font-semibold text-sm outline-none">
                Cookies on this page
              </p>
              <p className="text-sm text-muted-foreground">
                We would like to set Meta and TikTok cookies on this page to see which of our ads lead to a visit or a quote request, and to help those platforms decide who sees our ads. If you accept and then send us a quote request, we also send Meta and TikTok a scrambled copy of your email address and name, plus your IP address, so they can match the request to the ad. Reject and the page works exactly the same. You can change this at any time under Cookie settings at the bottom of the page. Details are in our{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                  Privacy Policy
                </a>
                .
              </p>
              {reopened && current !== "undecided" && (
                <p className="text-sm" data-testid="text-cookie-current-choice">
                  {current === "granted" ? "You currently accept these cookies." : "You currently reject these cookies."}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:shrink-0">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="min-h-11 w-full sm:w-auto"
                onClick={() => decide("denied")}
                data-testid="button-cookies-reject"
              >
                Reject
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="min-h-11 w-full sm:w-auto"
                onClick={() => decide("granted")}
                data-testid="button-cookies-accept"
              >
                Accept
              </Button>
            </div>
          </div>
        </section>
      )}
      <p className="text-center text-xs text-muted-foreground py-2">
        <button
          type="button"
          ref={settingsRef}
          className="inline-flex items-center min-h-11 px-3 underline hover:no-underline"
          onClick={reopen}
          data-testid="button-cookie-settings"
        >
          Cookie settings
        </button>
      </p>
    </>
  );
}
