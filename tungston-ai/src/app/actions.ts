"use server";

import { saveEnquiry, type Enquiry } from "@/lib/enquiry-store";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "service" | "task", string>>;
  values?: Enquiry;
};

type Submission = Enquiry;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * n8n production webhook; the workflow behind it emails the enquiry on. Its webhook
 * node is set to GET, so the fields travel as query parameters. Set CONTACT_WEBHOOK_URL
 * to point at a different workflow without touching the code.
 */
const WEBHOOK_URL =
  process.env.CONTACT_WEBHOOK_URL ||
  "https://protomationai.app.n8n.cloud/webhook/55d18bae-7122-40db-a11d-bc3465538340";

/**
 * The workflow answers "Error in workflow" when a field arrives empty, which would lose
 * the enquiry of anyone who skipped an optional question. Sending a placeholder instead
 * keeps those submissions working whatever the workflow does with blanks.
 */
const NOT_GIVEN = "Not provided";

async function sendToN8n(values: Submission) {
  const params = new URLSearchParams({
    name: values.name,
    email: values.email,
    phone: values.phone || NOT_GIVEN,
    businessName: values.businessName || NOT_GIVEN,
    service: values.service,
    task: values.task || NOT_GIVEN,
    source: "website",
    formType: "consultation_enquiry",
    receivedAt: new Date().toISOString(),
  });

  const res = await fetch(`${WEBHOOK_URL}?${params.toString()}`, {
    method: "GET",
    // Don't leave the visitor watching a spinner if the workflow stalls
    signal: AbortSignal.timeout(20_000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`n8n webhook responded ${res.status}: ${body.slice(0, 300)}`);
  }
}

/**
 * Handles the "Start a Project" contact form. A valid submission is sent to the n8n
 * workflow, which emails it on, and recorded in Supabase. Both run together: the
 * database is the safety net for a submission the email never delivered, so the
 * visitor is only told it failed when neither worked.
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

  return deliver(values);
}

/**
 * Sends one enquiry to both destinations and says what happened. A failure is named in
 * the log: an enquiry that was stored but never emailed is still waiting in Supabase,
 * and one that was emailed but not stored is only in the inbox. The visitor is told it
 * failed only when neither worked.
 */
async function deliver(values: Submission): Promise<ContactState> {
  const [emailed, stored] = await Promise.allSettled([sendToN8n(values), saveEnquiry(values)]);

  if (emailed.status === "rejected") console.error("[contact] n8n email failed", emailed.reason);
  if (stored.status === "rejected") console.error("[contact] Supabase save failed", stored.reason);

  if (emailed.status === "rejected" && stored.status === "rejected") {
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

export type QuoteState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "service" | "requirements", string>>;
  values?: Record<string, string>;
};

/**
 * Handles a quote request from the pricing page. It travels the same way as the contact
 * form: n8n emails it, Supabase records it. Neither has a field for a budget, so the
 * budget, the estimate and the requirements are written into the enquiry's message,
 * under a heading that says where it came from.
 */
export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const get = (key: string, max: number) => String(formData.get(key) ?? "").trim().slice(0, max);
  const values = {
    name: get("name", 120),
    businessName: get("businessName", 200),
    email: get("email", 200),
    phone: get("phone", 30),
    service: get("service", 100),
    budget: get("budget", 300),
    requirements: get("requirements", 4000),
    estimate: get("estimate", 2000),
  };

  if (get("website", 100)) return { status: "success", message: "Request received." };

  const errors: QuoteState["errors"] = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!EMAIL.test(values.email)) errors.email = "Enter an email address like you@company.com.";
  if (values.phone && values.phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a phone number with at least 7 digits.";
  if (!values.service) errors.service = "Pick what you want us to build.";
  if (Object.keys(errors).length) {
    return { status: "error", message: "Check the highlighted fields and send again.", errors, values };
  }

  const task = [
    "[Pricing page: custom quote request]",
    `Estimated budget: ${values.budget || "Not estimated"}`,
    values.estimate && `Estimate details:\n${values.estimate}`,
    `Requirements: ${values.requirements || "Not provided"}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const result = await deliver({
    name: values.name,
    email: values.email,
    phone: values.phone,
    businessName: values.businessName,
    service: values.service,
    task,
  });

  return result.status === "success"
    ? { status: "success", message: result.message }
    : { status: "error", message: result.message, values };
}
