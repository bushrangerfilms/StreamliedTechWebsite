// Checks that a WebMCP agent can use the "Ask for a call" form on /contact,
// and that it stops before sending unless it is told to send.
//
//   npm run build
//   PLAYWRIGHT_DIR=<a folder that has playwright-core in its node_modules> npx tsx script/test-webmcp.ts
//
// No real enquiry can come out of this test. The page is served from
// dist/public on localhost, and every request to /api/ is caught by the
// browser before it leaves this computer: the "fill only" and "bad input"
// runs must make none, and the one "send" run is answered by a stand-in that
// only records what the page would have posted. The test fails if any
// request reaches the network, or if the form was sent when it should not
// have been.
//
// The browser's own WebMCP is not assumed: a small stand-in for
// document.modelContext (registerTool, getTools, executeTool, as in the
// draft at https://webmachinelearning.github.io/webmcp/) is installed before
// the page loads, and plays the agent. playwright-core is not a dependency
// of the site; point PLAYWRIGHT_DIR at any checkout that has it.
import http from "node:http";
import { createRequire } from "node:module";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist/public");
const MARKET = "eur-vat";

const require = createRequire(import.meta.url);
function loadPlaywright(): typeof import("playwright-core") {
  const from = process.env.PLAYWRIGHT_DIR ?? ROOT;
  try {
    return require(require.resolve("playwright-core", { paths: [from] }));
  } catch {
    throw new Error("playwright-core not found. Set PLAYWRIGHT_DIR to a folder whose node_modules has it.");
  }
}

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".png": "image/png",
  ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8", ".xml": "application/xml", ".json": "application/json",
};

/** dist/public as the live site serves it: real files first, then the market's copy of the page. */
function serve(): Promise<{ url: string; close: () => void }> {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent((req.url ?? "/").split("?")[0]);
    // Vercel's own scripts (speed insights) do not exist off Vercel.
    if (pathname.startsWith("/_vercel/")) {
      res.writeHead(404);
      return res.end();
    }
    const file = path.join(DIST, pathname);
    if (file.startsWith(DIST) && existsSync(file) && statSync(file).isFile()) {
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream" });
      return res.end(readFileSync(file));
    }
    const page = pathname === "/" ? "index.html" : `${pathname.replace(/^\//, "")}.html`;
    const target = path.join(DIST, "_m", MARKET, page);
    const send = existsSync(target) ? target : path.join(DIST, "_m", MARKET, "index.html");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(readFileSync(send));
  });
  return new Promise((resolve) =>
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as { port: number };
      resolve({ url: `http://127.0.0.1:${port}`, close: () => server.close() });
    }),
  );
}

// The stand-in browser agent API, per the draft: document.modelContext with
// registerTool(tool, { signal }), getTools() and executeTool(tool, input).
const MODEL_CONTEXT_STAND_IN = `
  (() => {
    const tools = new Map();
    document.modelContext = {
      registerTool(tool, options = {}) {
        if (tools.has(tool.name)) return Promise.reject(new DOMException("duplicate", "InvalidStateError"));
        tools.set(tool.name, tool);
        options.signal?.addEventListener("abort", () => tools.delete(tool.name));
        return Promise.resolve();
      },
      getTools() {
        return Promise.resolve([...tools.values()].map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema, annotations: t.annotations })));
      },
      async executeTool(tool, input = {}) {
        const real = tools.get(tool.name);
        if (!real) throw new Error("tool not found");
        const result = await real.execute(input, { signal: new AbortController().signal });
        return JSON.stringify(result);
      },
    };
  })();
`;

let failures = 0;
function check(condition: boolean, message: string) {
  if (condition) console.log(`  ok   ${message}`);
  else {
    failures++;
    console.log(`  FAIL ${message}`);
  }
}

async function main() {
  if (!existsSync(path.join(DIST, "_m", MARKET, "contact.html"))) throw new Error("Run npm run build first.");
  const { chromium } = loadPlaywright();
  const site = await serve();
  const browser = await chromium.launch(
    process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : undefined,
  );

  try {
    // 1. A browser with no WebMCP: the page works exactly as before.
    {
      console.log("Without WebMCP");
      const context = await browser.newContext();
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(`${site.url}/contact`);
      await page.getByTestId("form-ask-for-call").waitFor();
      check(await page.evaluate(() => !("modelContext" in document)), "the browser has no document.modelContext");
      check(await page.getByTestId("button-call-send").isVisible(), "the form and its button show as usual");
      check(errors.length === 0, `no page errors (${errors.join("; ") || "none"})`);
      await context.close();
    }

    // 2. A browser with WebMCP and an agent.
    console.log("With WebMCP");
    const context = await browser.newContext();
    await context.addInitScript(MODEL_CONTEXT_STAND_IN);
    const requests: { url: string; body: string | null }[] = [];
    let answerSend = false;
    await context.route("**/*", async (route) => {
      const url = route.request().url();
      if (url.startsWith(site.url) && !url.includes("/api/")) return route.continue();
      if (url.includes("/api/")) {
        requests.push({ url, body: route.request().postData() });
        // Only the "send" run is answered, by a stand-in. Nothing here reaches a server.
        if (answerSend) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
      }
      return route.abort();
    });
    const page = await context.newPage();
    await page.goto(`${site.url}/contact`);
    await page.getByTestId("form-ask-for-call").waitFor();

    const run = (input: Record<string, unknown>) =>
      page.evaluate(async (args) => {
        const tools = await (document as any).modelContext.getTools();
        const tool = tools.find((t: any) => t.name === "ask_for_call");
        if (!tool) return null;
        return JSON.parse(await (document as any).modelContext.executeTool(tool, args));
      }, input);

    const tools = await page.evaluate(async () => (document as any).modelContext.getTools());
    const tool = tools.find((t: { name: string }) => t.name === "ask_for_call");
    check(Boolean(tool), "the page registers one tool, ask_for_call");
    check(tools.length === 1, "and no other tool");
    check(tool?.annotations?.consequentialHint === true, "the tool is marked as consequential");
    check(!tool?.inputSchema?.properties?.website, "the tool has no honeypot input");

    const details = { name: "Test Agent", phone: "087 123 4567", email: "agent@example.com", company: "Sample Co", about: "Sample text." };

    console.log("Agent fills the form and stops (no submit)");
    const filled = await run(details);
    check(filled?.ok === true && /not been sent/.test(filled.message), `the tool says it filled the form and did not send ("${filled?.message}")`);
    check((await page.getByTestId("input-call-name").inputValue()) === details.name, "the name is in the form on screen");
    check((await page.getByTestId("input-call-phone").inputValue()) === details.phone, "the phone is in the form on screen");
    check((await page.getByTestId("input-call-email").inputValue()) === details.email, "the email is in the form on screen");
    check((await page.getByTestId("input-call-company").inputValue()) === details.company, "the business name is in the form on screen");
    check((await page.getByTestId("input-call-about").inputValue()) === details.about, "what the business does is in the form on screen");
    check(await page.getByTestId("button-call-send").isVisible(), "the Ask for a call button is still there to press");
    check((await page.getByTestId("notice-call-sent").count()) === 0, "the form shows no 'sent' notice");
    check(requests.length === 0, `no request was made (${requests.length})`);

    console.log("Agent gives bad details (the form's own checks)");
    const bad = await run({ ...details, email: "not-an-email", submit: true });
    check(bad?.ok === false && Boolean(bad.errors?.email), "a bad email is refused with the form's message even when submit is true");
    check((await page.getByText("That email doesn't look right.").count()) === 1, "the form shows the same error a person would see");
    check(requests.length === 0, `still no request (${requests.length})`);

    console.log("Agent asks to send (answered by a stand-in, nothing leaves this computer)");
    answerSend = true;
    const sent = await run({ ...details, email: details.email, submit: true });
    check(sent?.ok === true && /^Sent\./.test(sent.message), `the tool reports it sent ("${sent?.message}")`);
    check(requests.length === 1 && requests[0].url.endsWith("/api/details-lead"), "exactly one request, to /api/details-lead");
    const body = JSON.parse(requests[0]?.body ?? "{}");
    check(body.variant === "call" && body.source === "website", "same body as the button: variant call, source website");
    check(body.website === "", "the honeypot field is sent empty");
    check(body.name === details.name && body.phone === details.phone && body.email === details.email, "with the details the agent gave");
    await context.close();
  } finally {
    await browser.close();
    site.close();
  }

  if (failures) {
    console.log(`\n${failures} check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll WebMCP checks passed. No enquiry was sent.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
