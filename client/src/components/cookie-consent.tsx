import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential");
    setShowBanner(false);
  };

  // The /details capture funnel sets no marketing cookies (tracking is
  // consent-gated and never granted here), so the banner would only cover
  // the form on mobile.
  if (location.startsWith("/details")) return null;

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg p-4 md:p-6" data-testid="cookie-consent-banner">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <h3 className="font-display font-semibold mb-2">We value your privacy</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience, analyse site traffic, and understand where our visitors come from. By clicking "Accept All", you consent to our use of cookies. You can also choose to accept only essential cookies.{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Read our Privacy Policy
              </Link>
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button 
              variant="outline" 
              onClick={acceptEssential}
              data-testid="button-accept-essential"
            >
              Essential Only
            </Button>
            <Button 
              onClick={acceptAll}
              data-testid="button-accept-all"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
