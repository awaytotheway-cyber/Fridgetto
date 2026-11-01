import { siteConfig } from "@/site.config";

export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  service: string;
  task: string;
};

/** Inbox that receives audit requests. */
const TO = process.env.CONTACT_TO_EMAIL || "protomation.services@gmail.com";

/**
 * Sender. Resend only accepts a domain you have verified with it; until you verify one,
 * onboarding@resend.dev works but delivers only to the address that owns the Resend account.
 */
const FROM = process.env.CONTACT_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`;

/** The task text is written by a stranger, so it is escaped before it reaches the HTML body. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Human-readable label for the service slug */
const SERVICE_LABELS: Record<string, string> = {
  "ai-agent-development": "AI Agent Development",
  "ai-voice-agents": "AI Voice Agents",
  "ai-website-chatbots": "AI Website Chatbots",
  "whatsapp-automation": "WhatsApp Automation",
  "crm-lead-automation": "CRM & Lead Automation",
  "data-reporting-automation": "Data & Reporting Automation",
  "ai-process-automation": "AI Process Automation",
  "finance-reconciliation": "Finance & Reconciliation",
  "lead-to-speed-agent": "Lead to Speed Agent",
  "custom-automations": "Custom Automations",
  "content-automation": "Content Automation",
  "web-development": "Web Development",
  "not-sure": "Not sure what I need yet",
};

function serviceName(slug: string) {
  return SERVICE_LABELS[slug] ?? slug;
}

function body({ name, email, phone, businessName, service, task }: ContactSubmission, receivedAt: string) {
  const serviceLabel = serviceName(service);

  const lines = [
    "New consultation request",
    "",
    `Name:     ${name}`,
    `Email:    ${email}`,
    ...(phone ? [`Phone:    ${phone}`] : []),
    ...(businessName ? [`Company:  ${businessName}`] : []),
    `Service:  ${serviceLabel}`,
  ];
  if (task) {
    lines.push("", "What they're trying to scale:", task);
  }
  lines.push("", `Received ${receivedAt} from the ${siteConfig.name} website.`);
  lines.push(`Reply to this email to answer ${name} directly.`);
  const text = lines.join("\n");

  const phoneHtml = phone
    ? `<p style="margin:0 0 16px"><strong>Phone</strong><br><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>`
    : "";
  const businessHtml = businessName
    ? `<p style="margin:0 0 16px"><strong>Company</strong><br>${escapeHtml(businessName)}</p>`
    : "";
  const taskHtml = task
    ? `<p style="margin:0 0 16px"><strong>What they're trying to scale</strong><br>${escapeHtml(task).replace(/\n/g, "<br>")}</p>`
    : "";

  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#111;max-width:560px">
  <h2 style="margin:0;font-size:18px">New consultation request</h2>
  <p style="margin:2px 0 24px;color:#666;font-size:13px">From the ${escapeHtml(siteConfig.name)} website</p>
  <p style="margin:0 0 16px"><strong>Name</strong><br>${escapeHtml(name)}</p>
  <p style="margin:0 0 16px"><strong>Email</strong><br><a href="mailto:${encodeURI(email)}">${escapeHtml(email)}</a></p>
  ${phoneHtml}
  ${businessHtml}
  <p style="margin:0 0 16px"><strong>Service interested in</strong><br>${escapeHtml(serviceLabel)}</p>
  ${taskHtml}
  <hr style="border:0;border-top:1px solid #e5e5e5;margin:24px 0">
  <p style="margin:0;color:#666;font-size:12px">Received ${escapeHtml(receivedAt)}. Reply to this email to answer ${escapeHtml(name)} directly.</p>
</div>`;

  return { text, html };
}

/**
 * Emails one consultation request through Resend. Throws when Resend rejects it, so the
 * caller can tell the visitor their message did not get through.
 */
export async function sendContactEmail(values: ContactSubmission) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");

  const receivedAt = new Date().toUTCString();
  const label = serviceName(values.service);
  const subject = values.businessName
    ? `Consultation: ${values.name} (${values.businessName}) — ${label}`
    : `Consultation: ${values.name} — ${label}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: values.email,
      subject,
      ...body(values, receivedAt),
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}
