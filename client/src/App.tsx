import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import HowItWorks from "@/pages/how-it-works";
import OurWork from "@/pages/our-work";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Industries from "@/pages/industries";
import Pricing from "@/pages/pricing";
import Faq from "@/pages/faq";
import Reviews from "@/pages/reviews";
import WindowAndDoorSoftware from "@/pages/window-and-door-software";
import PestControlApp from "@/pages/pest-control-app";
import EngineeringFirmSoftware from "@/pages/engineering-firm-software";
import LaboratorySampleCollectionApp from "@/pages/laboratory-sample-collection-app";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

// The retired addresses (/business, /galway, /contractors, /installers,
// /australia, /mining, /au, /ai-training, the set-up-AI guide, /ai-employees
// and its regions, /details, /products) are permanent redirects in
// vercel.json, so they never reach this router in production.
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/our-work" component={OurWork} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/industries" component={Industries} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/faq" component={Faq} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/window-and-door-software" component={WindowAndDoorSoftware} />
      <Route path="/pest-control-app" component={PestControlApp} />
      <Route path="/engineering-firm-software" component={EngineeringFirmSoftware} />
      <Route path="/laboratory-sample-collection-app" component={LaboratorySampleCollectionApp} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/dev" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
