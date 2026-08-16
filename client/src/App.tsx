import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Business from "@/pages/business";
import Contractors from "@/pages/contractors";
import Installers from "@/pages/installers";
import Australia from "@/pages/australia";
import Details from "@/pages/details";
import DetailsThanks from "@/pages/details-thanks";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/business" component={Business} />
      {/* Legacy alias: /galway is in the signature of outreach emails already sent, keep it working. */}
      <Route path="/galway" component={Business} />
      <Route path="/contractors" component={Contractors} />
      <Route path="/installers" component={Installers} />
      <Route path="/australia" component={Australia} />
      <Route path="/details" component={Details} />
      <Route path="/details/thanks" component={DetailsThanks} />
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
