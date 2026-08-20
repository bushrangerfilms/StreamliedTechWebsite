import { processDetailsContext } from "../server/details-context-core.js";

export default async function handler(
  req: { method?: string; body?: unknown },
  res: { status: (code: number) => { json: (body: unknown) => void } },
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const result = await processDetailsContext(req.body);
  res.status(result.status).json(result.body);
}
