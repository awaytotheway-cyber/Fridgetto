import {
  bestEffort, env, hmacHex, json, notifyOwner, safeEqual, unixToIso, upsertSubscriber,
} from "@/lib/care-plan-server";
import { isBilling } from "@/lib/care-plan";

type Meta = Record<string, string>;

/** Checks Stripe's `t=…,v1=…` header: HMAC of "t.body", within five minutes. */
function validSignature(raw: string, header: string, secret: string): boolean {
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
  const t = Number(parts.t);
  if (!parts.v1 || !Number.isFinite(t) || Math.abs(Date.now() / 1000 - t) > 300) return false;
  return safeEqual(hmacHex(secret, `${t}.${raw}`), parts.v1);
}

const SUB_STATUS: Record<string, string> = {
  active: "active",
  trialing: "active",
  past_due: "past_due",
  unpaid: "past_due",
  canceled: "cancelled",
  incomplete_expired: "cancelled",
};

export async function POST(req: Request) {
  const secret = env("STRIPE_WEBHOOK_SECRET");
  if (!secret) return json({ error: "Not configured" }, 503);

  const raw = await req.text();
  if (!validSignature(raw, req.headers.get("stripe-signature") ?? "", secret)) {
    return json({ error: "Bad signature" }, 400);
  }

  let event: { type?: string; data?: { object?: Record<string, unknown> } };
  try {
    event = JSON.parse(raw);
  } catch {
    return json({ error: "Bad body" }, 400);
  }
  const obj = event.data?.object ?? {};

  try {
    if (event.type === "checkout.session.completed" && typeof obj.subscription === "string") {
      const m = (obj.metadata ?? {}) as Meta;
      const billing = isBilling(m.billing) ? m.billing : undefined;
      await upsertSubscriber({
        provider: "stripe",
        provider_ref: obj.subscription,
        billing,
        name: m.name || undefined,
        email: m.email || (obj.customer_email as string | undefined),
        phone: m.phone || null,
        business_name: m.businessName || null,
        user_id: m.user_id || null,
        status: "active",
      });
      if (m.email && billing) {
        await bestEffort("owner notification", () =>
          notifyOwner({ name: m.name ?? "", email: m.email, phone: m.phone ?? "", businessName: m.businessName ?? "" }, "stripe", billing),
        );
      }
    } else if (
      (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") &&
      typeof obj.id === "string"
    ) {
      const status = event.type === "customer.subscription.deleted" ? "cancelled" : SUB_STATUS[String(obj.status)] ?? String(obj.status);
      // Newer API versions moved the period end onto the subscription item
      const item = (obj.items as { data?: { current_period_end?: number }[] } | undefined)?.data?.[0];
      await upsertSubscriber({
        provider: "stripe",
        provider_ref: obj.id,
        status,
        current_period_end: unixToIso(obj.current_period_end ?? item?.current_period_end),
      });
    }
  } catch (err) {
    console.error("[stripe] could not save subscriber", err);
    return json({ error: "Could not save" }, 500);
  }
  return json({ ok: true });
}
