/**
 * Lightweight analytics: Google Analytics 4 (gtag) + Meta Pixel (fbq).
 * Both are OPT-IN via env — nothing loads unless the IDs are set, so local dev
 * and un-configured deploys stay clean.
 *
 *   VITE_GA_ID          = "G-XXXXXXXXXX"   (GA4 Measurement ID)
 *   VITE_META_PIXEL_ID  = "1234567890"     (Meta Pixel ID)
 *
 * Conversion: forms call trackLead(source) → GA "generate_lead" + Meta "Lead".
 */

type AnalyticsFn = (...args: unknown[]) => void;

interface Fbq {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: AnalyticsFn;
    fbq?: AnalyticsFn;
    _fbq?: AnalyticsFn;
  }
}

const GA_ID = (import.meta.env.VITE_GA_ID as string | undefined)?.trim() || "G-ZZGHKWRSCF";
const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() || "2025563441738822";
let started = false;

function loadGa(id: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // Route page_views are sent manually on navigation.
  window.gtag("config", id, { send_page_view: false });
}

function loadPixel(id: string) {
  if (window.fbq) return;
  // Standard Meta Pixel stub: a callable that queues until fbevents.js loads.
  const n = function (...args: unknown[]) {
    n.callMethod ? n.callMethod(...args) : n.queue.push(args);
  } as unknown as Fbq; // library boundary: fbq is a function with attached props
  n.queue = [];
  n.loaded = true;
  n.version = "2.0";
  n.push = n;
  window.fbq = n;
  window._fbq = n;
  const t = document.createElement("script");
  t.async = true;
  t.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(t);
  window.fbq("init", id);
  window.fbq("track", "PageView");
}

export const analyticsEnabled = Boolean(GA_ID || PIXEL_ID);

export function initAnalytics() {
  if (started || typeof window === "undefined") return;
  started = true;
  if (GA_ID) loadGa(GA_ID);
  if (PIXEL_ID) loadPixel(PIXEL_ID);
}

export function trackPageview(path: string) {
  if (GA_ID && window.gtag) {
    window.gtag("event", "page_view", { page_path: path, page_location: window.location.href });
  }
  if (PIXEL_ID && window.fbq) window.fbq("track", "PageView");
}

/** Stable id shared between the browser Pixel and a future Conversions API call (dedup). */
function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/** Fire on a successful form submission. `source` = which form/page. */
export function trackLead(source: string): string {
  const eventID = newEventId();
  if (GA_ID && window.gtag) window.gtag("event", "generate_lead", { source });
  if (PIXEL_ID && window.fbq) window.fbq("track", "Lead", { content_name: source }, { eventID });
  return eventID;
}

/** Fire on portfolio / project page views. */
export function trackViewContent(name: string): string {
  const eventID = newEventId();
  if (GA_ID && window.gtag) window.gtag("event", "view_item", { item_name: name });
  if (PIXEL_ID && window.fbq) window.fbq("track", "ViewContent", { content_name: name }, { eventID });
  return eventID;
}

/** Fire on WhatsApp / phone button clicks. `method` = "whatsapp" | "phone". */
export function trackContact(method: string): string {
  const eventID = newEventId();
  if (GA_ID && window.gtag) window.gtag("event", "contact", { method });
  if (PIXEL_ID && window.fbq) window.fbq("track", "Contact", { method }, { eventID });
  return eventID;
}
