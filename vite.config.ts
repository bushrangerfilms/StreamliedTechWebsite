import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { metaImagesPlugin } from "./vite-plugin-meta-images";
import { prerenderMetaPlugin } from "./vite-plugin-prerender-meta";

// Vercel Web Analytics v2 serves its script and beacon from a per-project
// unique path, handed to the build as VERCEL_OBSERVABILITY_CLIENT_CONFIG (or
// the VITE_-prefixed copy when system env exposure is on). Baked in here so
// client/src/main.tsx can pass it to inject(); without it the package falls
// back to /_vercel/insights/*, which this project does not serve.
const observabilityClientConfig =
  process.env.VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG ??
  process.env.VERCEL_OBSERVABILITY_CLIENT_CONFIG ??
  "";
if (process.env.VERCEL && !observabilityClientConfig) {
  console.warn("[analytics] VERCEL_OBSERVABILITY_CLIENT_CONFIG missing at build; Web Analytics will not record.");
} else if (observabilityClientConfig) {
  console.log("[analytics] observability client config found at build");
}

export default defineConfig({
  define: {
    "import.meta.env.VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG": JSON.stringify(observabilityClientConfig),
  },
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
    prerenderMetaPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
