export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  service: string;
  task: string;
};

/**
 * Supabase project holding the protomation_enquiries table. It also hosts the
 * LifeShield app, so the table is prefixed and carries its own access rules.
 * Override either value with SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY.
 */
const SUPABASE_URL = process.env.SUPABASE_URL || "https://zohdgwzqtfcuyqoxwgbi.supabase.co";

/**
 * Supabase's publishable key, which is meant to be public — it is what browser apps
 * ship. The table's only policy lets this key INSERT, so it cannot read enquiries
 * back, change them or delete them; reading needs the service role, i.e. the Supabase
 * dashboard. Verified: select returns no rows and delete removes none.
 */
const SUPABASE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_nvjKNdnRpQlaodxgcJkOew_g2x75VRE";

/**
 * Records one enquiry. Throws when Supabase rejects it, so the caller can log that
 * the record was lost even if the email went out. Optional answers are stored as
 * NULL rather than the placeholder the n8n workflow needs.
 */
export async function saveEnquiry(values: Enquiry) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/protomation_enquiries`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      // Don't ask for the row back: the insert-only policy would refuse to return it
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      phone: values.phone || null,
      business_name: values.businessName || null,
      service: values.service,
      task: values.task || null,
      source: "website",
      form_type: "consultation_enquiry",
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Supabase responded ${res.status}: ${body.slice(0, 300)}`);
  }
}
