"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<"name" | "email" | "task", string>>;
  values?: { name: string; email: string; task: string };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Handles the "Book a free AI audit" form. Set CONTACT_WEBHOOK_URL (Slack, Zapier,
 * n8n, Make, your CRM…) to receive submissions as JSON; without it they are logged.
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
  try {
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "website", receivedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      console.info("[contact] New audit request (set CONTACT_WEBHOOK_URL to forward these):", values);
    }
  } catch (error) {
    console.error("[contact] Could not forward request", error);
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
