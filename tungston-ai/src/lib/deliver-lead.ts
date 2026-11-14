import type { Lead } from "@/lib/lead-schema";

type Deps = {
  /** Records the lead in Supabase. Throws on failure. */
  save: (lead: Lead) => Promise<void>;
  /** Tells the founder through n8n. "skipped" when no webhook is configured; throws on failure. */
  notify: (lead: Lead) => Promise<"sent" | "skipped">;
};

/**
 * Sends a lead to both places at once. The visitor is told it worked if it was stored
 * OR the founder was notified, and told it failed only when neither happened, so a
 * success message always means somebody will see the enquiry.
 */
export async function deliverLead(lead: Lead, { save, notify }: Deps): Promise<"ok" | "failed"> {
  const [stored, notified] = await Promise.allSettled([save(lead), notify(lead)]);
  if (stored.status === "rejected") console.error("[lead] Supabase save failed", stored.reason);
  if (notified.status === "rejected") console.error("[lead] n8n notification failed", notified.reason);
  const wasNotified = notified.status === "fulfilled" && notified.value === "sent";
  return stored.status === "fulfilled" || wasNotified ? "ok" : "failed";
}
