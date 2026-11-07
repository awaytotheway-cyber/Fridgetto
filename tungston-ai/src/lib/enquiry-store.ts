export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  service: string;
  task: string;
};

/**
 * Enquiries live in the Protomation Supabase project — the same one that handles user
 * auth, so an enquiry sits beside the accounts rather than in a borrowed project. The
 * table is created by supabase/protomation_enquiries.sql.
 *
 * The project is read from the auth env vars, so there is one project to configure and
 * nothing hard-coded here. SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY override them when
 * enquiries should go somewhere else.
 *
 * The key is Supabase's publishable/anon key, which is meant to be public — it is what
 * browser apps ship. The table's only policy lets it INSERT, so it cannot read
 * enquiries back, change them or delete them; reading needs the service role, i.e. the
 * Supabase dashboard.
 */
function target(): { url: string; key: string } {
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
        "(or SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY to record enquiries in a different project)",
    );
  }
  return { url, key };
}

/**
 * Records one enquiry. Throws when Supabase rejects it, so the caller can log that
 * the record was lost even if the email went out. Optional answers are stored as
 * NULL rather than the placeholder the n8n workflow needs.
 */
export async function saveEnquiry(values: Enquiry) {
  const { url, key } = target();
  const res = await fetch(`${url}/rest/v1/protomation_enquiries`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
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
