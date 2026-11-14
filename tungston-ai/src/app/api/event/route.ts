import { isAnalyticsEvent } from "@/lib/analytics";
import { insertRow } from "@/lib/enquiry-store";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Receives one first-party event from trackEvent() and stores it in protomation_site_events.
 * Stores the event name, a short label and the page path, and nothing that identifies
 * the visitor. Always answers 204, so a counting problem never surfaces in the page.
 */
export async function POST(req: Request) {
  const done = new Response(null, { status: 204 });
  if (rateLimit(`event:${clientIp(req.headers)}`, { max: 60, windowMs: 60_000 })) return done;

  let body: unknown;
  try {
    body = JSON.parse((await req.text()).slice(0, 2_000));
  } catch {
    return done;
  }
  const { name, label, path } = (body ?? {}) as Record<string, unknown>;
  if (!isAnalyticsEvent(name)) return done;

  try {
    await insertRow("protomation_site_events", {
      name,
      label: typeof label === "string" ? label.slice(0, 60) : null,
      path: typeof path === "string" && path.startsWith("/") ? path.slice(0, 200) : null,
    });
  } catch (error) {
    // Usually: the protomation_site_events table hasn't been created yet (supabase/2026-11-protomation-site-events.sql)
    console.error("[event] not stored", error instanceof Error ? error.message : error);
  }
  return done;
}
