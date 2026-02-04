import { useEffect } from "react";

export function usePageTracking() {
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent !== "accepted") return;

    const trackPage = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: window.location.pathname,
            referrer: document.referrer || null,
          }),
        });
      } catch (err) {
        // Silent fail for tracking
      }
    };

    trackPage();
  }, []);
}
