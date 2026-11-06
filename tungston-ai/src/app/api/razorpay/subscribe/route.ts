import { NOT_READY, env, json, parseCheckout, rateLimited } from "@/lib/care-plan-server";
import { createClient } from "@/lib/supabase/server";

/** Creates a Razorpay Subscription for the chosen billing period; the browser then opens Checkout. */
export async function POST(req: Request) {
  if (rateLimited(req)) return json({ error: "Too many attempts. Please try again in a minute." }, 429);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return json({ error: "Please sign in before subscribing." }, 401);

  const keyId = env("RAZORPAY_KEY_ID");
  const keySecret = env("RAZORPAY_KEY_SECRET");
  if (!keyId || !keySecret) return NOT_READY();

  const parsed = parseCheckout(await req.json().catch(() => null));
  if ("error" in parsed) return json({ error: parsed.error }, 400);
  if ("honeypot" in parsed) return json({ ok: true });

  // The plan id comes from server config only, never from the browser
  const planId = env(parsed.billing === "monthly" ? "RAZORPAY_PLAN_MONTHLY" : "RAZORPAY_PLAN_YEARLY");
  if (!planId) return NOT_READY();
  const { name, email, phone, businessName } = parsed.customer;

  const res = await fetch("https://api.razorpay.com/v1/subscriptions", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan_id: planId,
      // Razorpay needs an end: ten years of months, or ten years of years
      total_count: parsed.billing === "monthly" ? 120 : 10,
      customer_notify: 1,
      notes: { name, email, phone, businessName, billing: parsed.billing, user_id: user.id },
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    console.error("[razorpay] create subscription failed", res.status, (await res.text()).slice(0, 300));
    return json({ error: "We couldn't start checkout. Please try again or contact us." }, 502);
  }
  const sub = (await res.json()) as { id: string };
  return json({ subscriptionId: sub.id, keyId: env("NEXT_PUBLIC_RAZORPAY_KEY_ID") || keyId });
}
