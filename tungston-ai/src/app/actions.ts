"use server";

import { sendContactEmail, type ContactSubmission } from "@/lib/contact-email";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "service" | "task", string>>;
  values?: {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    service: string;
    task: string;
  };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** n8n production webhook (GET) for consultation / enquiry notifications */
const N8N_WEBHOOK_URL = "https://protomationai.app.n8n.cloud/webhook/55d18bae-7122-40db-a11d-bc3465538340";

/**
 * Sends form data to the n8n webhook as a GET request with query parameters.
 * n8n webhook node is configured for HTTP Method: GET.
 */
async function sendToN8n(values: ContactSubmission) {
  const params = new URLSearchParams({
    name: values.name,
    email: values.email,
    phone: values.phone,
    businessName: values.businessName,
    service: values.service,
    task: values.task,
    source: "website",
    formType: "consultation_enquiry",
    receivedAt: new Date().toISOString(),
  });

  const res = await fetch(`${N8N_WEBHOOK_URL}?${params.toString()}`, {
    method: "GET",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`n8n webhook responded ${res.status}: ${body.slice(0, 300)}`);
  }
}

/**
 * Handles the "Start a Project" contact form. Submissions are sent to the n8n webhook
 * (which handles emailing) and optionally through Resend (RESEND_API_KEY).
 * The visitor only sees an error if every configured route failed.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim().slice(0, 120),
    email: String(formData.get("email") ?? "").trim().slice(0, 200),
    phone: String(formData.get("phone") ?? "").trim().slice(0, 30),
    businessName: String(formData.get("businessName") ?? "").trim().slice(0, 200),
    service: String(formData.get("service") ?? "").trim().slice(0, 100),
    task: String(formData.get("task") ?? "").trim().slice(0, 4000),
  };

  // Bots fill the hidden field; people never see it. Pretend it worked.
  if (String(formData.get("website") ?? "")) {
    return { status: "success", message: "Request received." };
  }

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!EMAIL.test(values.email)) errors.email = "Enter an email address like you@company.com.";
  if (!values.service) errors.service = "Pick the service you're interested in.";
  if (Object.keys(errors).length) {
    return { status: "error", message: "Check the highlighted fields and send again.", errors, values };
  }

  const routes: Promise<unknown>[] = [];

  // Always send to n8n webhook (GET request with query params)
  routes.push(sendToN8n(values));

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
