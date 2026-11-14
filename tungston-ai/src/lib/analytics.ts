/**
 * First-party event counting. No cookies, no third-party script, no IP address kept:
 * each event is a name, an optional label and the page, sent to /api/event and
 * stored in the site_events table (supabase/2026-11-site-events.sql).
 *
 * Safe to call anywhere: it does nothing on the server and never throws.
 */
export const analyticsEvents = [
  "cta_book_call",
  "form_submit",
  "demo_call_click",
  "whatsapp_click",
  "calculator_used",
  "diagnostic_view",
] as const;

export type AnalyticsEvent = (typeof analyticsEvents)[number];

export const isAnalyticsEvent = (v: unknown): v is AnalyticsEvent =>
  typeof v === "string" && (analyticsEvents as readonly string[]).includes(v);

export function trackEvent(name: AnalyticsEvent, label?: string) {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({ name, label: label?.slice(0, 60), path: location.pathname });
    const blob = new Blob([body], { type: "application/json" });
    if (!navigator.sendBeacon?.("/api/event", blob)) {
      void fetch("/api/event", { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } });
    }
  } catch {
    // Counting is never worth breaking the page over
  }
}
