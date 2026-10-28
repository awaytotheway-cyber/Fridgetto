import { siteConfig } from "@/site.config";

export type ContactSubmission = {
  name: string;
  email: string;
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

function body({ name, email, task }: ContactSubmission, receivedAt: string) {
  const text = [
    "New AI audit request",
    "",
    `Name:  ${name}`,
    `Email: ${email}`,
    "",
    "What they want automated:",
    task,
    "",
    `Received ${receivedAt} from the ${siteConfig.name} website.`,
    `Reply to this email to answer ${name} directly.`,
  ].join("\n");

  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#111;max-width:560px">
  <h2 style="margin:0;font-size:18px">New AI audit request</h2>
  <p style="margin:2px 0 24px;color:#666;font-size:13px">From the ${escapeHtml(siteConfig.name)} website</p>
  <p style="margin:0 0 16px"><strong>Name</strong><br>${escapeHtml(name)}</p>
  <p style="margin:0 0 16px"><strong>Email</strong><br><a href="mailto:${encodeURI(email)}">${escapeHtml(email)}</a></p>
  <p style="margin:0 0 16px"><strong>What they want automated</strong><br>${escapeHtml(task).replace(/\n/g, "<br>")}</p>
  <hr style="border:0;border-top:1px solid #e5e5e5;margin:24px 0">
  <p style="margin:0;color:#666;font-size:12px">Received ${escapeHtml(receivedAt)}. Reply to this email to answer ${escapeHtml(name)} directly.</p>
</div>`;

  return { text, html };
}

/**
 * Emails one audit request through Resend. Throws when Resend rejects it, so the
 * caller can tell the visitor their message did not get through.
 */
export async function sendContactEmail(values: ContactSubmission) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");

  const receivedAt = new Date().toUTCString();
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      // So hitting Reply in the inbox answers the person who filled the form
      reply_to: values.email,
      subject: `AI audit request: ${values.name}`,
      ...body(values, receivedAt),
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}
