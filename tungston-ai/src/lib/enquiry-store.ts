import type { Lead } from "@/lib/lead-schema";

/**
 * Leads live in the Protomation Supabase project, in public.protomation_enquiries
 * (supabase/protomation_enquiries.sql, extended by supabase/2026-11-front-desk-leads.sql).
 *
 * The site writes with the publishable/anon key, which is meant to be public. The
 * table's only policy lets it INSERT, so it can't read leads back, change or delete
 * them; reading needs the service role, i.e. the Supabase dashboard.
 *
 * SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY override the auth project's variables when
 * leads should go to a different project.
 */
export function supabaseTarget(): { url: string; key: string } {
  const pick = (...names: string[]) => {
    for (const name of names) {
      const value = process.env[name]?.trim();
      if (value) return value;
    }
    return undefined;
  };
  const url = pick("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL");
  const key = pick("SUPABASE_PUBLISHABLE_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY " +
        "(or SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY to record leads in a different project)",
    );
  }
  return { url, key };
}

/** Inserts one row without asking for it back (the insert-only policy would refuse to return it). */
export async function insertRow(table: string, row: Record<string, unknown>) {
  const { url, key } = supabaseTarget();
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Supabase responded ${res.status}: ${body.slice(0, 300)}`);
  }
}

/** Records one lead from the "Book a free call" form. Throws when Supabase rejects it. */
export async function saveLead(lead: Lead) {
  await insertRow("protomation_enquiries", {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    business_name: lead.businessName,
    business_type: lead.businessType,
    city: lead.city,
    monthly_enquiries: lead.monthlyEnquiries,
    task: lead.message,
    consent: lead.consent,
    consent_at: lead.consentAt,
    consent_text: lead.consentText,
    source_path: lead.sourcePath,
    utm_source: lead.utm.source,
    utm_medium: lead.utm.medium,
    utm_campaign: lead.utm.campaign,
    source: "website",
    form_type: "front_desk_enquiry",
  });
}
