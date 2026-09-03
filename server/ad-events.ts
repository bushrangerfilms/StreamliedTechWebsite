import { createHash } from "node:crypto";

// Server-side twins of the browser Lead / SubmitForm events: Meta
// Conversions API and TikTok Events API. Called from details-lead-core.ts
// for consented quote leads only.
//
// Contract for the caller:
//   - Nothing here throws. Every function returns a status string; a
//     tracking failure can never fail the lead.
//   - Each platform is a no-op ("skipped:...") when its env vars are absent,
//     when the visitor's user agent is missing (Meta requires it), or when no
//     identifier for that platform accompanied the consent (nothing to match,
//     and a scripted POST with a stranger's email then reaches no platform).
//   - Personal data is hashed here (SHA-256 of the normalised value). Raw
//     email or name never leaves this file for either platform. The visitor's
//     IP and user agent are sent as is, which both platforms require.
//   - Each send is capped at AD_SEND_TIMEOUT_MS and the two run in parallel.
//   - Success is judged on the response body, not the HTTP status: Meta must
//     report events_received, TikTok must report code 0 (it returns HTTP 200
//     for rejections).

export interface AdLeadInput {
  /** website_leads row id; the event_id on both halves. */
  leadId: string;
  name: string;
  email: string;
  /** "ie" | "au" | "uk" | "us" from the lander, or null. */
  region: string | null;
  /** Own-origin-checked landing URL. */
  sourceUrl: string;
  referrer: string | null;
  clientIp: string | null;
  userAgent: string | null;
  fbp: string | null;
  fbc: string | null;
  fbclid: string | null;
  ttp: string | null;
  ttclid: string | null;
}

export type AdSendStatus = "sent" | `skipped:${string}` | `failed:${string}`;
export interface AdSendOutcome {
  meta: AdSendStatus;
  tiktok: AdSendStatus;
}

// Same names as client/src/lib/ad-consent.ts; keep the two files identical.
export const META_LEAD_EVENT = "Lead";
export const TIKTOK_LEAD_EVENT = "SubmitForm";
export const AD_CONTENT_NAME = "ai-employees-quote";

// Graph API version. Meta keeps each version usable for at least two years
// after the next one ships; v26.0 shipped 29 Jul 2026, so v25.0 is safe
// until at least 29 Jul 2028. Override with META_GRAPH_API_VERSION when it
// is time to move; a retired version returns an error that is logged below
// and never fails the lead. Check developers.facebook.com/docs/graph-api/changelog.
export const META_GRAPH_API_VERSION = (process.env.META_GRAPH_API_VERSION || "v25.0").trim();

const AD_SEND_TIMEOUT_MS = 2500;

// Built at runtime rather than written as a /u literal: tsconfig.json sets no
// target, so a Unicode-flag literal fails `npx tsc` (TS1501) and the SEO
// agent's pre-PR `npm run check`.
const NON_LETTER = new RegExp("[^\\p{L}]", "gu");

const FBP_RE = /^fb\.\d\.\d+\.\d+$/;
const FBC_RE = /^fb\.\d\.\d+\.[A-Za-z0-9_-]+$/;
const FBCLID_RE = /^[A-Za-z0-9_-]+$/;
const TT_ID_RE = /^[A-Za-z0-9_.-]+$/;
const IPV4_RE = /^\d{1,3}(\.\d{1,3}){3}$/;
const IPV6_RE = /^[0-9A-Fa-f:.]+$/;

export function sha256Hex(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

/** Meta and TikTok: trim, lowercase, then hash. No dot or plus stripping. */
export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Meta: "lowercase only with no punctuation". O'Brien becomes obrien, Seán stays seán. */
export function normaliseName(part: string): string {
  return part.normalize("NFKC").toLowerCase().replace(NON_LETTER, "");
}

/** First token is fn; last token is ln when there are two or more tokens. */
export function splitName(name: string): { first: string; last: string | null } {
  const tokens = name.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return { first: "", last: null };
  return { first: tokens[0], last: tokens.length > 1 ? tokens[tokens.length - 1] : null };
}

function cleanFbp(fbp: string | null): string | null {
  return fbp && FBP_RE.test(fbp) ? fbp : null;
}

/** _fbc cookie when the pixel set one; otherwise Meta's documented fb.1.<ms>.<fbclid> built from the click id. */
export function buildFbc(fbc: string | null, fbclid: string | null): string | null {
  if (fbc && FBC_RE.test(fbc)) return fbc;
  if (fbclid && FBCLID_RE.test(fbclid) && fbclid.length <= 500) return `fb.1.${Date.now()}.${fbclid}`;
  return null;
}

function cleanTiktokId(value: string | null, max: number): string | null {
  return value && value.length <= max && TT_ID_RE.test(value) ? value : null;
}

function cleanIp(ip: string | null): string | null {
  if (!ip) return null;
  const v = ip.trim();
  return IPV4_RE.test(v) || (v.includes(":") && IPV6_RE.test(v)) ? v : null;
}

function cleanReferrer(referrer: string | null): string | null {
  if (!referrer) return null;
  const v = referrer.trim().slice(0, 500);
  return v.startsWith("http://") || v.startsWith("https://") ? v : null;
}

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

function tiktokProperties(region: string | null): Record<string, unknown> {
  return {
    content_type: "product",
    contents: [{ content_id: region ? `ai-employees-${region}` : "ai-employees", content_name: AD_CONTENT_NAME }],
  };
}

function failureStatus(err: unknown): AdSendStatus {
  const name = err instanceof Error ? err.name : "";
  return name === "TimeoutError" || name === "AbortError" ? "failed:timeout" : "failed:error";
}

export async function sendMetaLead(input: AdLeadInput): Promise<AdSendStatus> {
  const pixelId = (process.env.VITE_META_PIXEL_ID || "").trim();
  const token = (process.env.META_CAPI_ACCESS_TOKEN || "").trim();
  const testCode = (process.env.META_CAPI_TEST_EVENT_CODE || "").trim();
  if (!pixelId) return "skipped:no-id";
  if (!token) return "skipped:no-token";
  if (!input.userAgent) return "skipped:no-user-agent";
  const fbp = cleanFbp(input.fbp);
  const fbc = buildFbc(input.fbc, input.fbclid);
  if (!fbp && !fbc) return "skipped:no-ids";
  try {
    const { first, last } = splitName(input.name);
    const userData: Record<string, unknown> = {
      em: [sha256Hex(normaliseEmail(input.email))],
      client_user_agent: input.userAgent.slice(0, 1000),
    };
    const fn = normaliseName(first);
    if (fn) userData.fn = [sha256Hex(fn)];
    if (last) {
      const ln = normaliseName(last);
      if (ln) userData.ln = [sha256Hex(ln)];
    }
    const ip = cleanIp(input.clientIp);
    if (ip) userData.client_ip_address = ip;
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    const payload: Record<string, unknown> = {
      data: [
        {
          event_name: META_LEAD_EVENT,
          event_time: nowSeconds(),
          event_id: input.leadId,
          event_source_url: input.sourceUrl,
          action_source: "website",
          user_data: userData,
          custom_data: {
            content_name: AD_CONTENT_NAME,
            ...(input.region ? { content_category: input.region } : {}),
          },
        },
      ],
      access_token: token,
    };
    if (testCode) payload.test_event_code = testCode;

    const res = await fetch(
      `https://graph.facebook.com/${META_GRAPH_API_VERSION}/${encodeURIComponent(pixelId)}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(AD_SEND_TIMEOUT_MS),
      },
    );
    const text = await res.text();
    let json: any = null;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }
    if (res.ok && json && typeof json.events_received === "number" && json.events_received >= 1) {
      return "sent";
    }
    console.error("details-lead: meta event not accepted", {
      status: res.status,
      fbtrace_id: json?.error?.fbtrace_id ?? json?.fbtrace_id ?? null,
      message: json?.error?.message ?? text.slice(0, 300),
    });
    return res.ok ? "failed:not-accepted" : `failed:${res.status}`;
  } catch (err) {
    console.error("details-lead: meta event error", err instanceof Error ? err.message : err);
    return failureStatus(err);
  }
}

export async function sendTiktokLead(input: AdLeadInput): Promise<AdSendStatus> {
  const pixelId = (process.env.VITE_TIKTOK_PIXEL_ID || "").trim();
  const token = (process.env.TIKTOK_EVENTS_ACCESS_TOKEN || "").trim();
  const testCode = (process.env.TIKTOK_TEST_EVENT_CODE || "").trim();
  if (!pixelId) return "skipped:no-id";
  if (!token) return "skipped:no-token";
  const ttclid = cleanTiktokId(input.ttclid, 500);
  const ttp = cleanTiktokId(input.ttp, 200);
  if (!ttclid && !ttp) return "skipped:no-ids";
  try {
    const user: Record<string, unknown> = { email: sha256Hex(normaliseEmail(input.email)) };
    if (ttclid) user.ttclid = ttclid;
    if (ttp) user.ttp = ttp;
    const ip = cleanIp(input.clientIp);
    if (ip) user.ip = ip;
    if (input.userAgent) user.user_agent = input.userAgent.slice(0, 1000);
    const referrer = cleanReferrer(input.referrer);

    const payload: Record<string, unknown> = {
      event_source: "web",
      event_source_id: pixelId,
      data: [
        {
          event: TIKTOK_LEAD_EVENT,
          event_time: nowSeconds(),
          event_id: input.leadId,
          user,
          page: { url: input.sourceUrl, ...(referrer ? { referrer } : {}) },
          properties: tiktokProperties(input.region),
        },
      ],
    };
    if (testCode) payload.test_event_code = testCode;

    const res = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Access-Token": token },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(AD_SEND_TIMEOUT_MS),
    });
    const text = await res.text();
    let json: any = null;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }
    if (res.ok && json && json.code === 0) {
      return "sent";
    }
    console.error("details-lead: tiktok event not accepted", {
      status: res.status,
      code: json?.code ?? null,
      request_id: json?.request_id ?? null,
      message: json?.message ?? text.slice(0, 300),
    });
    return `failed:${json?.code ?? res.status}`;
  } catch (err) {
    console.error("details-lead: tiktok event error", err instanceof Error ? err.message : err);
    return failureStatus(err);
  }
}

/** Both platforms in parallel. Never rejects. */
export async function sendAdLeadEvents(input: AdLeadInput): Promise<AdSendOutcome> {
  const [meta, tiktok] = await Promise.allSettled([sendMetaLead(input), sendTiktokLead(input)]);
  return {
    meta: meta.status === "fulfilled" ? meta.value : "failed:error",
    tiktok: tiktok.status === "fulfilled" ? tiktok.value : "failed:error",
  };
}
