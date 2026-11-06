import {
  bestEffort, env, hmacHex, json, notifyOwner, safeEqual, unixToIso, upsertSubscriber,
} from "@/lib/care-plan-server";
import { isBilling } from "@/lib/care-plan";

type Entity = {
  id: string;
  status?: string;
  current_end?: number | null;
  notes?: Record<string, string> | unknown[];
};

const STATUS: Record<string, string> = {
  "subscription.activated": "active",
  "subscription.charged": "active",
  "subscription.cancelled": "cancelled",
  "subscription.halted": "past_due",
  "subscription.completed": "ended",
};

/** Razorpay calls this on every subscription change. The signature is checked against the raw body. */
export async function POST(req: Request) {
  const secret = env("RAZORPAY_WEBHOOK_SECRET");
  if (!secret) return json({ error: "Not configured" }, 503);

  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";
  if (!signature || !safeEqual(hmacHex(secret, raw), signature)) return json({ error: "Bad signature" }, 400);

  let event: { event?: string; payload?: { subscription?: { entity?: Entity } } };
  try {
    event = JSON.parse(raw);
  } catch {
    return json({ error: "Bad body" }, 400);
  }

  const status = event.event ? STATUS[event.event] : undefined;
  const sub = event.payload?.subscription?.entity;
  if (!status || !sub?.id) return json({ ok: true, ignored: true });

  const notes = (Array.isArray(sub.notes) ? {} : (sub.notes ?? {})) as Record<string, string>;
  const billing = isBilling(notes.billing) ? notes.billing : undefined;

  try {
    await upsertSubscriber({
      provider: "razorpay",
      provider_ref: sub.id,
      billing,
      name: notes.name || undefined,
      email: notes.email || undefined,
      phone: notes.phone || null,
      business_name: notes.businessName || null,
      status,
      current_period_end: unixToIso(sub.current_end),
    });
  } catch (err) {
    // A 500 makes Razorpay retry, which is what we want when the write failed
    console.error("[razorpay] could not save subscriber", err);
    return json({ error: "Could not save" }, 500);
  }

  if (event.event === "subscription.activated" && notes.email && billing) {
    await bestEffort("owner notification", () =>
      notifyOwner(
        { name: notes.name ?? "", email: notes.email, phone: notes.phone ?? "", businessName: notes.businessName ?? "" },
        "razorpay",
        billing,
      ),
    );
  }
  return json({ ok: true });
}
