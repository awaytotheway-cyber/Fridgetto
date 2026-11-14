import type { Lead } from "@/lib/lead-schema";

/**
 * Tells the founder about a new lead through n8n (which emails or WhatsApps it on).
 * Set N8N_LEAD_WEBHOOK_URL in Vercel; until then this is skipped and Supabase alone
 * holds the lead. The URL stays out of the code, because this repository is public.
 *
 * Sends JSON by POST. Set N8N_LEAD_WEBHOOK_SECRET too, and have the workflow's Webhook
 * node check the x-protomation-secret header, so nobody else can post fake leads to it.
 */
export async function notifyLead(lead: Lead): Promise<"sent" | "skipped"> {
  const url = process.env.N8N_LEAD_WEBHOOK_URL?.trim();
  if (!url) return "skipped";
  const secret = process.env.N8N_LEAD_WEBHOOK_SECRET?.trim();

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...(secret ? { "x-protomation-secret": secret } : {}) },
    body: JSON.stringify({ event: "lead.created", receivedAt: new Date().toISOString(), lead }),
    // Don't leave the visitor watching a spinner if the workflow stalls
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`n8n webhook responded ${res.status}: ${body.slice(0, 300)}`);
  }
  return "sent";
}
