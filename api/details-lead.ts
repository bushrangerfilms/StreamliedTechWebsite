import { processDetailsLead } from "../server/details-lead-core.js";

// Vercel serverless function: the production home of POST /api/details-lead.
// The Express server in server/ only runs in local dev; production is a
// static build plus this function.
export default async function handler(
  req: { method?: string; body?: unknown; headers: Record<string, string | string[] | undefined> },
  res: {
    status: (code: number) => { json: (body: unknown) => void };
    setHeader: (name: string, value: string) => void;
  },
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const userAgentHeader = req.headers["user-agent"];
  const userAgent = Array.isArray(userAgentHeader) ? userAgentHeader[0] : userAgentHeader || null;
  const result = await processDetailsLead(req.body, userAgent);
  res.status(result.status).json(result.body);
}
