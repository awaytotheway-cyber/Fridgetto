"use server";

import { sendContactEmail, type ContactSubmission } from "@/lib/contact-email";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<"name" | "email" | "task", string>>;
  values?: { name: string; email: string; businessName: string; task: string };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** n8n production webhook for consultation / enquiry notifications */
const N8N_WEBHOOK_URL = "https://protomationai.app.n8n.cloud/webhook/55d18bae-7122-40db-a11d-bc3465538340";

async function postWebhook(url: string, values: ContactSubmission) {
  const payload = {
    name: values.name,
    email: values.email,
    businessName: values.businessName,
    task: values.task,
    source: "website",
    formType: "consultation_enquiry",
    receivedAt: new Date().toISOString(),
  };

  // Try POST first, fall back to GET with query params if POST fails
  let res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // Fallback: send as GET with query parameters
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(payload)) {
      params.set(key, String(value));
    }
    res = await fetch(`${url}?${params.toString()}`, { method: "GET" });
  }

  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

/**
 * Handles the "Book a free AI audit" form. Submissions are emailed through Resend
 * (RESEND_API_KEY) and posted to the n8n webhook (and CONTACT_WEBHOOK_URL if set);
 * with neither they are logged. The visitor only sees an error if every configured route failed.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim().slice(0, 120),
    email: String(formData.get("email") ?? "").trim().slice(0, 200),
    businessName: String(formData.get("businessName") ?? "").trim().slice(0, 200),
    task: String(formData.get("task") ?? "").trim().slice(0, 4000),
  };

  // Bots fill the hidden field; people never see it. Pretend it worked.
  if (String(formData.get("website") ?? "")) {
    return { status: "success", message: "Request received." };
  }

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!EMAIL.test(values.email)) errors.email = "Enter an email address like you@company.com.";
  if (values.task.length < 10) errors.task = "Tell us a little more: one or two sentences is plenty.";
  if (Object.keys(errors).length) {
    return { status: "error", message: "Check the highlighted fields and send again.", errors, values };
  }

  const routes: Promise<unknown>[] = [];

  // Always post to n8n webhook
  routes.push(postWebhook(N8N_WEBHOOK_URL, values));

  // Also post to CONTACT_WEBHOOK_URL if configured (legacy/backup)
  const extraWebhook = process.env.CONTACT_WEBHOOK_URL;
  if (extraWebhook) routes.push(postWebhook(extraWebhook, values));

  // Also send email via Resend if configured
  if (process.env.RESEND_API_KEY) routes.push(sendContactEmail(values));

  const results = await Promise.allSettled(routes);
  for (const result of results) {
    if (result.status === "rejected") console.error("[contact] Could not deliver request", result.reason);
  }
  if (!results.some((result) => result.status === "fulfilled")) {
    return {
      status: "error",
      message: "Your request didn't go through. Try again, or email us directly.",
      values,
    };
  }

  return {
    status: "success",
    message: `Request received. We'll reply to ${values.email} within one business day.`,
  };
}
