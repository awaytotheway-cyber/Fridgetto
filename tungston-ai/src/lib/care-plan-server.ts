import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { Billing, Provider } from "@/lib/care-plan";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Customer = { name: string; email: string; phone: string; businessName: string };

export function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

export const json = (body: unknown, status = 200) => Response.json(body, { status });

/** Payments are off until the owner has added the keys; say so instead of crashing. */
export const NOT_READY = () =>
  json({ error: "Online payment isn't switched on yet. Please contact us and we'll set up your Care Plan." }, 503);

/** Reads and validates the checkout form. Returns an error message or the clean values. */
export function parseCheckout(
  body: unknown,
): { error: string } | { honeypot: true } | { billing: Billing; customer: Customer } {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const str = (k: string, max = 200) => (typeof b[k] === "string" ? (b[k] as string).trim().slice(0, max) : "");
  if (str("website")) return { honeypot: true };
  const billing = b.billing;
  if (billing !== "monthly" && billing !== "yearly") return { error: "Choose monthly or yearly billing." };
  const name = str("name");
  const email = str("email");
  if (!name) return { error: "Please enter your name." };
  if (!EMAIL.test(email)) return { error: "Please enter a valid email address." };
  return { billing, customer: { name, email, phone: str("phone", 40), businessName: str("businessName") } };
}

/** A small per-IP limiter. Per server instance only, which is enough to blunt casual abuse. */
const hits = new Map<string, number[]>();
export function rateLimited(req: Request, max = 6, windowMs = 60_000): boolean {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

export function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export const hmacHex = (secret: string, payload: string) =>
  createHmac("sha256", secret).update(payload).digest("hex");

export type SubscriberRow = {
  provider: Provider;
  provider_ref: string;
  billing?: Billing;
  name?: string;
  email?: string;
  phone?: string | null;
  business_name?: string | null;
  user_id?: string | null;
  status: string;
  current_period_end?: string | null;
};

/**
 * Upserts one subscriber by (provider, provider_ref), so a replayed webhook just
 * rewrites the same state. Writes to the Protomation Supabase project — the same one
 * that handles user auth, so user_id can reference auth.users. Needs the service role
 * key: the table's only policy lets a subscriber read their own row.
 * Fields left undefined are not sent, so a status-only event keeps the stored contact.
 */
export async function upsertSubscriber(row: SubscriberRow) {
  const url = env("SUPABASE_URL") || env("NEXT_PUBLIC_SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  const res = await fetch(`${url}/rest/v1/care_subscribers?on_conflict=provider,provider_ref`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({ ...row, updated_at: new Date().toISOString() }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Supabase responded ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
}

/**
 * Tells the owner through the same n8n webhook as new leads (N8N_LEAD_WEBHOOK_URL).
 * Dormant: Care Plan checkout is off the site. Skipped when no webhook is set.
 */
export async function notifyOwner(c: Customer, provider: Provider, billing: Billing) {
  const url = process.env.N8N_LEAD_WEBHOOK_URL?.trim();
  if (!url) return;
  const secret = process.env.N8N_LEAD_WEBHOOK_SECRET?.trim();
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...(secret ? { "x-protomation-secret": secret } : {}) },
    body: JSON.stringify({
      event: "care_plan.subscribed",
      receivedAt: new Date().toISOString(),
      customer: c,
      provider,
      billing,
    }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`n8n webhook responded ${res.status}`);
}

/** Webhook side effects must never turn into a retry storm over a notification failure. */
export async function bestEffort(label: string, fn: () => Promise<void>) {
  try {
    await fn();
  } catch (err) {
    console.error(`[care-plan] ${label} failed`, err);
  }
}

const iso = (unixSeconds: unknown) =>
  typeof unixSeconds === "number" ? new Date(unixSeconds * 1000).toISOString() : null;
export { iso as unixToIso };
