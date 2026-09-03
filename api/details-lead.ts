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
  // Visitor IP for the Meta / TikTok server events. Vercel sets both headers
  // itself and overwrites any client-supplied x-forwarded-for, so the first
  // entry is the real client. Never stored; only forwarded with consent.
  const fwdHeader = req.headers["x-forwarded-for"];
  const fwd = Array.isArray(fwdHeader) ? fwdHeader[0] : fwdHeader;
  const realIpHeader = req.headers["x-real-ip"];
  const realIp = Array.isArray(realIpHeader) ? realIpHeader[0] : realIpHeader;
  const clientIp = fwd?.split(",")[0]?.trim() || realIp?.trim() || null;
  const result = await processDetailsLead(req.body, userAgent, clientIp);
  res.status(result.status).json(result.body);
}
