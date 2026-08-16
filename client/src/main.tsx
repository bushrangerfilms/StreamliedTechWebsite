import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import App from "./App";
import "./index.css";

// Vercel Web Analytics (cookieless, first-party). The config string carries
// this project's unique script and beacon paths; see vite.config.ts.
inject(
  { mode: import.meta.env.PROD ? "production" : "development" },
  import.meta.env.VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG || undefined,
);

createRoot(document.getElementById("root")!).render(<App />);
