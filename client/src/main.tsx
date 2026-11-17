import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import App from "./App";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-400-italic.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "./index.css";
import "./site.css";

// Vercel Web Analytics (cookieless, first-party). The config string carries
// this project's unique script and beacon paths; see vite.config.ts.
inject(
  { mode: import.meta.env.PROD ? "production" : "development" },
  import.meta.env.VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG || undefined,
);

createRoot(document.getElementById("root")!).render(<App />);
