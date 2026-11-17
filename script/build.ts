import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";
import { checkPrerenderMirrors } from "./check-prerender-mirrors";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

// The privacy and terms pages ship as drafts with [PETE TO CONFIRM] markers
// so Pete can read them on a preview. They must never reach the live site in
// that state, so a production build stops here while a marker remains.
async function refuseUnconfirmedLegalPagesInProduction() {
  if (process.env.VERCEL_ENV !== "production") return;
  const pages = ["client/src/pages/privacy.tsx", "client/src/pages/terms.tsx"];
  const open: string[] = [];
  for (const page of pages) {
    const text = await readFile(page, "utf-8");
    const count = text.split("PETE TO CONFIRM").length - 1 + (text.includes("st-draft") ? 1 : 0);
    if (count > 0) open.push(`${page}: ${count} draft marker(s)`);
  }
  if (open.length) {
    throw new Error(
      `Production build refused: the legal pages are still drafts.\n  - ${open.join("\n  - ")}\n` +
        "Pete fills each [PETE TO CONFIRM] fact, approves the wording and the draft box is removed before go-live.",
    );
  }
}

async function buildAll() {
  await refuseUnconfirmedLegalPagesInProduction();

  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  // The prerendered files carry static body mirrors for no-JS crawlers.
  // Fail the build if a mirror has drifted from its page component's copy.
  checkPrerenderMirrors();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
