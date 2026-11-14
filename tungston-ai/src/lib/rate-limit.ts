/**
 * A small sliding-window limiter kept in memory. It only sees one server instance, so
 * it slows a single bot down rather than guaranteeing a hard limit across the fleet;
 * the honeypot and minimum fill time do the rest. If spam ever gets through, add a
 * Vercel Firewall rate-limit rule on the contact page.
 */
const hits = new Map<string, number[]>();

/** Records an attempt for `key`. Returns true when this attempt is over the limit (block it). */
export function rateLimit(key: string, { max, windowMs }: { max: number; windowMs: number }, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  const blocked = recent.length >= max;
  if (!blocked) recent.push(now);
  hits.set(key, recent);
  // Keep the map from growing without bound on a long-lived instance
  if (hits.size > 5_000) {
    for (const [k, times] of hits) if (!times.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return blocked;
}

/** The caller's IP as Vercel reports it, for use as a rate-limit key. Never stored. */
export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}
