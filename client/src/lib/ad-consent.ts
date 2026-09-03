import { track } from "@vercel/analytics";

// Advertising consent and the Meta / TikTok pixels for the AI Employees
// landers (client/src/pages/ai-employees.tsx). Plain TypeScript, no React,
// so client/src/pages/privacy.tsx can import clearAdConsent without pulling
// in a component.
//
// Guarantees this module enforces:
//   - Nothing from Meta or TikTok is requested, and none of their cookies is
//     set, until getAdConsent() === "granted" (the visitor pressed Accept).
//   - Every track call re-checks consent at call time. A withdrawal in the
//     same page session stops events at once; no cached flag is trusted.
//   - Reject, withdrawal and expiry all revoke the pixels' consent, expire
//     the cookies they set on this site and remove the record.
//   - Pixel ids come only from VITE_META_PIXEL_ID and VITE_TIKTOK_PIXEL_ID.
//     There are no fallback ids. A missing id leaves that pixel inert and
//     prints one console warning on Accept, in every environment, so a dead
//     pixel is visible before any ad money is spent.
//   - Once injected, a pixel script stays resident for the SPA session, so
//     the lander pauses it on unmount (pauseAdPixels) and resumes it on
//     mount (loadAdPixels). The rest of the site never fires an event.

export type AdConsentChoice = "granted" | "denied";
export type AdConsentState = AdConsentChoice | "undecided";

export interface AdConsentRecord {
  /** AD_CONSENT_VERSION at the time of the choice. */
  v: number;
  choice: AdConsentChoice;
  /** ISO timestamp of the choice. Sent with a quote so the lead row records it. */
  at: string;
}

export interface AdAttribution {
  fbp: string | null;
  fbc: string | null;
  fbclid: string | null;
  ttp: string | null;
  ttclid: string | null;
}

/** localStorage key for the visitor's choice. Strictly necessary storage: it only remembers the answer. */
export const AD_CONSENT_KEY = "st-ad-consent";
/** Bump when the purposes, the vendors or the banner wording change; everyone is asked again. */
export const AD_CONSENT_VERSION = 1;
/** DPC guidance: ask again no later than six months after the choice. Same for Accept and Reject. */
export const AD_CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000;

/** Event names. server/ad-events.ts carries the same two Lead constants; keep them identical. */
export const META_LEAD_EVENT = "Lead";
export const TIKTOK_LEAD_EVENT = "SubmitForm";
export const META_CONTACT_EVENT = "Contact";
export const TIKTOK_CONTACT_EVENT = "Contact";
export const AD_CONTENT_NAME = "ai-employees-quote";

// Inlined by Vite at build time. Empty string means "not configured".
const META_PIXEL_ID: string = String(import.meta.env.VITE_META_PIXEL_ID ?? "").trim();
const TIKTOK_PIXEL_ID: string = String(import.meta.env.VITE_TIKTOK_PIXEL_ID ?? "").trim();

interface TiktokPixel {
  load: (id: string) => void;
  page: () => void;
  track: (name: string, props?: Record<string, unknown>, opts?: { event_id?: string }) => void;
  enableCookie?: () => void;
  disableCookie?: () => void;
  grantConsent?: () => void;
  revokeConsent?: () => void;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    ttq?: TiktokPixel;
    TiktokAnalyticsObject?: string;
  }
}

function debug(...args: unknown[]): void {
  if (import.meta.env.DEV) console.debug("[ad-consent]", ...args);
}

// ---------------------------------------------------------------------------
// Consent record
// ---------------------------------------------------------------------------

/** Fallback when localStorage throws (private mode, blocked storage): the choice lasts for this page only. */
let memoryRecord: AdConsentRecord | null = null;

function isValidRecord(rec: unknown): rec is AdConsentRecord {
  if (!rec || typeof rec !== "object") return false;
  const r = rec as Partial<AdConsentRecord>;
  if (r.v !== AD_CONSENT_VERSION) return false;
  if (r.choice !== "granted" && r.choice !== "denied") return false;
  if (typeof r.at !== "string") return false;
  const at = Date.parse(r.at);
  if (!Number.isFinite(at)) return false;
  const age = Date.now() - at;
  return age <= AD_CONSENT_TTL_MS && age >= -AD_CONSENT_TTL_MS;
}

function readRecord(): AdConsentRecord | null {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(AD_CONSENT_KEY);
  } catch {
    return memoryRecord && isValidRecord(memoryRecord) ? memoryRecord : null;
  }
  // No stored record: fall back to the page-session copy, which covers a
  // browser where getItem works but setItem threw (quota, restricted mode).
  if (!raw) return memoryRecord && isValidRecord(memoryRecord) ? memoryRecord : null;
  let parsed: unknown = null;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = null;
  }
  if (isValidRecord(parsed)) return parsed;
  // Expired, wrong version or malformed: treat as never asked, and remove
  // what an earlier grant set so a 13-month TikTok cookie cannot outlive
  // the consent that set it.
  clearAdConsent();
  return null;
}

export function getAdConsent(): AdConsentState {
  return readRecord()?.choice ?? "undecided";
}

export function getAdConsentRecord(): AdConsentRecord | null {
  return readRecord();
}

export function setAdConsent(choice: AdConsentChoice): void {
  const record: AdConsentRecord = { v: AD_CONSENT_VERSION, choice, at: new Date().toISOString() };
  memoryRecord = record;
  try {
    localStorage.setItem(AD_CONSENT_KEY, JSON.stringify(record));
  } catch {
    debug("storage unavailable, choice kept in memory for this page only");
  }
  if (choice === "granted") {
    loadAdPixels();
  } else {
    pauseAdPixels();
    clearAdCookies();
  }
}

/** Withdrawal: used by the privacy page and by expiry. Removes the record, pauses the pixels, expires their cookies. */
export function clearAdConsent(): void {
  memoryRecord = null;
  try {
    localStorage.removeItem(AD_CONSENT_KEY);
  } catch {
    /* nothing to remove */
  }
  pauseAdPixels();
  clearAdCookies();
}

// ---------------------------------------------------------------------------
// Cookies
// ---------------------------------------------------------------------------

const AD_COOKIE_NAMES = ["_fbp", "_fbc", "_ttp", "_tt_enable_cookie", "ttclid"];
const AD_COOKIE_PREFIXES = ["ttcsid"];

function parseCookies(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    for (const part of document.cookie.split(";")) {
      const i = part.indexOf("=");
      if (i < 0) continue;
      const name = part.slice(0, i).trim();
      if (!name) continue;
      const value = part.slice(i + 1).trim();
      try {
        out[name] = decodeURIComponent(value);
      } catch {
        out[name] = value;
      }
    }
  } catch {
    /* no document.cookie */
  }
  return out;
}

/**
 * Expire every Meta and TikTok cookie on this site: the fixed names plus any
 * cookie starting with ttcsid, on the host, the bare host domain and the
 * apex domain (the pixels set theirs on the apex). Cookies the platforms set
 * on their own domains are out of reach and the privacy policy says so.
 */
export function clearAdCookies(): void {
  try {
    const names = new Set(AD_COOKIE_NAMES);
    for (const name of Object.keys(parseCookies())) {
      if (AD_COOKIE_PREFIXES.some((p) => name.startsWith(p))) names.add(name);
    }
    const host = window.location.hostname;
    const labels = host.split(".");
    const apex = labels.length >= 2 ? labels.slice(-2).join(".") : null;
    const domains: Array<string | null> = [null, host];
    if (apex && apex !== host) domains.push(`.${apex}`);
    for (const name of Array.from(names)) {
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
      }
    }
  } catch {
    /* no document.cookie */
  }
}

// ---------------------------------------------------------------------------
// Pixel loading
// ---------------------------------------------------------------------------

let injected = false;
/** True while consent is granted on a live pixel; false after pause (unmount, reject, withdrawal). */
let active = false;
const warned: Record<string, boolean> = {};

function warnMissing(platform: "meta" | "tiktok"): void {
  if (warned[platform]) return;
  warned[platform] = true;
  const name = platform === "meta" ? "VITE_META_PIXEL_ID" : "VITE_TIKTOK_PIXEL_ID";
  const label = platform === "meta" ? "Meta" : "TikTok";
  console.warn(`[ad-consent] ${name} not set at build; ${label} pixel inactive`);
}

/** Port of Meta's base snippet. Calls queue until fbevents.js arrives. */
function injectMeta(id: string): void {
  const w = window as Window & { fbq?: any; _fbq?: any };
  if (!w.fbq) {
    const n: any = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    w.fbq = n;
    if (!w._fbq) w._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
  }
  // Declared events only: no automatic button-click or page-metadata
  // collection, so the resident pixel does nothing on other routes and the
  // privacy policy stays true.
  w.fbq("set", "autoConfig", false, id);
  w.fbq("init", id);
  w.fbq("track", "PageView");
}

/** Port of TikTok's base snippet. Calls queue until events.js arrives. */
function injectTiktok(id: string): void {
  const w = window as any;
  const t = "ttq";
  w.TiktokAnalyticsObject = t;
  const ttq: any = (w[t] = w[t] || []);
  ttq.methods = [
    "page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group",
    "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent",
  ];
  ttq.setAndDefer = function (target: any, method: string) {
    target[method] = function () {
      target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
    };
  };
  for (const method of ttq.methods) ttq.setAndDefer(ttq, method);
  ttq.instance = function (name: string) {
    const inst = ttq._i[name] || [];
    for (const method of ttq.methods) ttq.setAndDefer(inst, method);
    return inst;
  };
  ttq.load = function (code: string, options?: Record<string, unknown>) {
    const src = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = ttq._i || {};
    ttq._i[code] = [];
    ttq._i[code]._u = src;
    ttq._t = ttq._t || {};
    ttq._t[code] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[code] = options || {};
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = `${src}?sdkid=${encodeURIComponent(code)}&lib=${t}`;
    document.head.appendChild(s);
  };
  ttq.load(id);
  ttq.page();
}

/** True when at least one pixel id was present at build. */
export function adPixelsConfigured(): boolean {
  return META_PIXEL_ID !== "" || TIKTOK_PIXEL_ID !== "";
}

/** The banner renders where a pixel can load, and in dev so the flow can be tested without ids. */
export function adConsentBannerEnabled(): boolean {
  return adPixelsConfigured() || Boolean(import.meta.env.DEV);
}

function trackPageView(): void {
  try {
    window.fbq?.("track", "PageView");
  } catch {
    /* pixel error, never the page's problem */
  }
  try {
    window.ttq?.page();
  } catch {
    /* as above */
  }
}

/**
 * Load the pixels, or resume them after a pause. Idempotent. No-op unless
 * consent is granted right now. First call injects both scripts and fires
 * PageView from the base snippets; a later call (lander remount, re-accept)
 * grants consent again and fires one PageView.
 */
export function loadAdPixels(): void {
  if (typeof window === "undefined") return;
  if (getAdConsent() !== "granted") return;
  if (!injected) {
    injected = true;
    active = true;
    if (META_PIXEL_ID) {
      try {
        injectMeta(META_PIXEL_ID);
      } catch (err) {
        console.error("[ad-consent] Meta pixel failed to load", err);
      }
    } else {
      warnMissing("meta");
    }
    if (TIKTOK_PIXEL_ID) {
      try {
        injectTiktok(TIKTOK_PIXEL_ID);
      } catch (err) {
        console.error("[ad-consent] TikTok pixel failed to load", err);
      }
    } else {
      warnMissing("tiktok");
    }
    debug("pixels loaded", { meta: Boolean(META_PIXEL_ID), tiktok: Boolean(TIKTOK_PIXEL_ID) });
    return;
  }
  if (active) return;
  active = true;
  try {
    window.fbq?.("consent", "grant");
  } catch {
    /* ignore */
  }
  try {
    window.ttq?.enableCookie?.();
    window.ttq?.grantConsent?.();
  } catch {
    /* ignore */
  }
  trackPageView();
  debug("pixels resumed");
}

/**
 * Pause resident pixels: Meta's consent API and TikTok's consent and cookie
 * switches. Called on Reject, on withdrawal, on expiry and when the lander
 * unmounts, so nothing fires on the cookieless pages after in-app
 * navigation. Our own track calls are gated separately (canTrack), so this
 * is belt and braces, not the only guard.
 */
export function pauseAdPixels(): void {
  if (!injected || !active) return;
  active = false;
  try {
    window.fbq?.("consent", "revoke");
  } catch {
    /* ignore */
  }
  try {
    window.ttq?.revokeConsent?.();
    window.ttq?.disableCookie?.();
  } catch {
    /* ignore */
  }
  debug("pixels paused");
}

function canTrack(): boolean {
  return injected && active && getAdConsent() === "granted";
}

/** Random id for browser-only events (no server twin). */
export function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function tiktokProps(region: string): Record<string, unknown> {
  return {
    content_type: "product",
    contents: [{ content_id: `ai-employees-${region}`, content_name: AD_CONTENT_NAME }],
  };
}

/**
 * Browser half of the quote conversion. eventId is the website_leads row id,
 * the same value the server half uses, so each platform dedups the pair.
 * Returns true when at least one pixel fired, so callers never fire twice.
 */
export function trackAdLead(eventId: string, region: string): boolean {
  if (!canTrack()) return false;
  let fired = false;
  try {
    if (window.fbq) {
      window.fbq("track", META_LEAD_EVENT, { content_name: AD_CONTENT_NAME, content_category: region }, { eventID: eventId });
      fired = true;
    }
  } catch {
    /* ignore */
  }
  try {
    if (window.ttq) {
      window.ttq.track(TIKTOK_LEAD_EVENT, tiktokProps(region), { event_id: eventId });
      fired = true;
    }
  } catch {
    /* ignore */
  }
  debug("lead", { eventId, region, fired });
  return fired;
}

/**
 * Mid-funnel event, browser only, no personal data, no server twin. Fired
 * once per page on the first quote-form focus or booking-link click; it
 * gives both platforms an optimisation event that a low-volume lander can
 * actually reach. Returns true when at least one pixel fired, so the caller
 * can keep the once-per-page flag honest and retry after a late Accept.
 */
export function trackAdContact(region: string): boolean {
  if (!canTrack()) return false;
  const eventId = newEventId();
  let fired = false;
  try {
    if (window.fbq) {
      window.fbq("track", META_CONTACT_EVENT, { content_name: AD_CONTENT_NAME, content_category: region }, { eventID: eventId });
      fired = true;
    }
  } catch {
    /* ignore */
  }
  try {
    if (window.ttq) {
      window.ttq.track(TIKTOK_CONTACT_EVENT, tiktokProps(region), { event_id: eventId });
      fired = true;
    }
  } catch {
    /* ignore */
  }
  debug("contact", { eventId, region, fired });
  return fired;
}

/**
 * Cookie and click identifiers for the server half. Null unless consent is
 * granted. Read at call time from document.cookie and the current URL; the
 * lander is one page, so the click ids are still in location.search when
 * the form is submitted. Nothing is written to storage.
 */
export function readAdAttribution(): AdAttribution | null {
  if (getAdConsent() !== "granted") return null;
  const cap = (v: string | null | undefined): string | null => (v ? v.slice(0, 500) : null);
  try {
    const cookies = parseCookies();
    const query = new URLSearchParams(window.location.search);
    return {
      fbp: cap(cookies["_fbp"]),
      fbc: cap(cookies["_fbc"]),
      fbclid: cap(query.get("fbclid")),
      ttp: cap(cookies["_ttp"]),
      ttclid: cap(cookies["ttclid"] ?? query.get("ttclid")),
    };
  } catch {
    return { fbp: null, fbc: null, fbclid: null, ttp: null, ttclid: null };
  }
}

/**
 * Cookieless counter through Vercel Web Analytics (already injected in
 * main.tsx). Sits outside the consent gate on purpose: it is how the consent
 * rate is known, so platform-reported cost per lead can be read as a floor.
 */
export function countEvent(name: string, props?: Record<string, string | number | boolean | null>): void {
  try {
    track(name, props);
  } catch {
    /* analytics blocked, nothing to do */
  }
}
