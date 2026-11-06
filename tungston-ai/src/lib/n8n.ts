/**
 * n8n production webhook; the workflow behind it emails the enquiry on. Its webhook
 * node is set to GET, so the fields travel as query parameters. Set CONTACT_WEBHOOK_URL
 * to point at a different workflow without touching the code.
 */
export const WEBHOOK_URL =
  process.env.CONTACT_WEBHOOK_URL ||
  "https://protomationai.app.n8n.cloud/webhook/55d18bae-7122-40db-a11d-bc3465538340";
