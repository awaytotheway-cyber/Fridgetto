"use server";

import { sendContactEmail, type ContactSubmission } from "@/lib/contact-email";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<"name" | "email" | "task", string>>;
  values?: { name: string; email: string; task: string };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function postWebhook(url: string, values: ContactSubmission) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values, source: "website", receivedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

/**
 * Handles the "Book a free AI audit" form. Submissions are emailed through Resend
 * (RESEND_API_KEY) and posted to CONTACT_WEBHOOK_URL, whichever of the two is configured;
 * with neither they are logged. The visitor only sees an error if every configured route failed.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim().slice(0, 120),
    email: String(formData.get("email") ?? "").trim().slice(0, 200),
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

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const routes: Promise<unknown>[] = [];
  if (process.env.RESEND_API_KEY) routes.push(sendContactEmail(values));
  if (webhook) routes.push(postWebhook(webhook, values));

  if (routes.length === 0) {
    console.info("[contact] New audit request (set RESEND_API_KEY to email these):", values);
  } else {
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
  }

  return {
    status: "success",
    message: `Request received. We'll reply to ${values.email} within one business day.`,
  };
}
