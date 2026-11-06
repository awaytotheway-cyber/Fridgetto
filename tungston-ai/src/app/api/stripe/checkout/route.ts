import { siteConfig } from "@/site.config";
import { NOT_READY, env, json, parseCheckout, rateLimited } from "@/lib/care-plan-server";

/** Creates a Stripe Checkout Session in subscription mode and returns its hosted-page URL. */
export async function POST(req: Request) {
  if (rateLimited(req)) return json({ error: "Too many attempts. Please try again in a minute." }, 429);

  const secret = env("STRIPE_SECRET_KEY");
  if (!secret) return NOT_READY();

  const parsed = parseCheckout(await req.json().catch(() => null));
  if ("error" in parsed) return json({ error: parsed.error }, 400);
  if ("honeypot" in parsed) return json({ ok: true });

  // The price id comes from server config only, never from the browser
  const price = env(parsed.billing === "monthly" ? "STRIPE_PRICE_MONTHLY" : "STRIPE_PRICE_YEARLY");
  if (!price) return NOT_READY();
  const { name, email, phone, businessName } = parsed.customer;

  const body = new URLSearchParams({
    mode: "subscription",
    "line_items[0][price]": price,
    "line_items[0][quantity]": "1",
    customer_email: email,
    success_url: `${siteConfig.url}/pricing?subscribed=1#care-plan`,
    cancel_url: `${siteConfig.url}/pricing#care-plan`,
  });
  // On both the session and the subscription, so later subscription events carry the contact too
  for (const prefix of ["metadata", "subscription_data[metadata]"]) {
    body.set(`${prefix}[name]`, name);
    body.set(`${prefix}[email]`, email);
    body.set(`${prefix}[phone]`, phone);
    body.set(`${prefix}[businessName]`, businessName);
    body.set(`${prefix}[billing]`, parsed.billing);
  }

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    console.error("[stripe] create session failed", res.status, (await res.text()).slice(0, 300));
    return json({ error: "We couldn't start checkout. Please try again or contact us." }, 502);
  }
  const session = (await res.json()) as { url?: string };
  if (!session.url) return json({ error: "We couldn't start checkout." }, 502);
  return json({ url: session.url });
}
