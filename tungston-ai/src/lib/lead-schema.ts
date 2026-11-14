/**
 * The "Book a free call" form: what a valid lead is, checked on the server.
 * Wording of every message is from COPY.md §11.
 */
import { z } from "zod";

export const businessTypes = [
  { value: "ivf", label: "IVF & fertility" },
  { value: "derm-hair", label: "Dermatology & hair" },
  { value: "dental", label: "Dental" },
  { value: "diagnostics", label: "Diagnostic lab" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
] as const;

export const enquiryRanges = [
  { value: "under-100", label: "Under 100" },
  { value: "100-300", label: "100–300" },
  { value: "300-1000", label: "300–1,000" },
  { value: "over-1000", label: "Over 1,000" },
  { value: "not-sure", label: "Not sure" },
] as const;

/** Shown beside the checkbox, and stored with every lead so we know exactly what was agreed to. */
export const CONSENT_TEXT = "I agree to be contacted by Protomation by phone, WhatsApp or email about my enquiry.";

/**
 * Any phone number we can call or WhatsApp, as E.164 (+919876543210), or null.
 * Numbers without a + are taken as Indian: 98765 43210, 098765 43210, 91 98765 43210,
 * or a landline with its 0 (022 4000 0000). Anything else needs its country code.
 */
export function normalisePhone(input: string): string | null {
  const raw = input.trim();
  const digits = raw.replace(/\D/g, "");
  if (/[a-z]/i.test(raw)) return null;
  if (raw.startsWith("+")) {
    if (digits.startsWith("91")) return /^91[1-9]\d{9}$/.test(digits) ? `+${digits}` : null;
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
  }
  if (/^[6-9]\d{9}$/.test(digits)) return `+91${digits}`;
  if (/^0[1-9]\d{9}$/.test(digits)) return `+91${digits.slice(1)}`;
  if (/^91[6-9]\d{9}$/.test(digits)) return `+${digits}`;
  return null;
}

const text = (max: number) =>
  z
    .string()
    .trim()
    .transform((s) => s.slice(0, max));
const required = (max: number, message: string) => text(max).pipe(z.string().min(1, message));
const optional = (max: number) => text(max).transform((s) => s || null);

const schema = z.object({
  name: required(120, "Enter your name."),
  businessName: required(200, "Enter your clinic or business name."),
  businessType: z.enum(businessTypes.map((b) => b.value) as [string, ...string[]], {
    errorMap: () => ({ message: "Pick the type of business." }),
  }),
  city: required(100, "Enter your city."),
  monthlyEnquiries: z
    .union([z.literal(""), z.enum(enquiryRanges.map((r) => r.value) as [string, ...string[]])], {
      errorMap: () => ({ message: "Pick one of the ranges, or leave it blank." }),
    })
    .transform((s) => s || null),
  phone: z
    .string()
    .transform((s, ctx) => {
      const phone = normalisePhone(s);
      if (!phone) {
        ctx.addIssue({ code: "custom", message: "Enter a phone number we can call or WhatsApp, like +91 98765 43210." });
        return z.NEVER;
      }
      return phone;
    }),
  email: z
    .string()
    .trim()
    .max(200)
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter an email address like you@clinic.com."),
  message: optional(2000),
  consent: z.literal("on", { errorMap: () => ({ message: "Tick the box so we can contact you about your enquiry." }) }),
  sourcePath: text(200).transform((s) => (s.startsWith("/") && !s.startsWith("//") ? s : null)),
  utm_source: optional(100),
  utm_medium: optional(100),
  utm_campaign: optional(100),
});

export type LeadField = keyof z.input<typeof schema>;

export type Lead = {
  name: string;
  businessName: string;
  businessType: string;
  city: string;
  monthlyEnquiries: string | null;
  /** E.164 */
  phone: string;
  email: string;
  message: string | null;
  consent: true;
  consentAt: string;
  consentText: string;
  sourcePath: string | null;
  utm: { source: string | null; medium: string | null; campaign: string | null };
};

export type ParseResult =
  | { ok: true; lead: Lead }
  | { ok: false; errors: Partial<Record<LeadField, string>>; values: Record<string, string> };

const FIELDS = Object.keys(schema.shape) as LeadField[];

export function parseLead(form: FormData, now: Date = new Date()): ParseResult {
  const values: Record<string, string> = {};
  for (const key of FIELDS) {
    const v = form.get(key);
    values[key] = typeof v === "string" ? v : "";
  }

  const result = schema.safeParse(values);
  if (!result.success) {
    const errors: Partial<Record<LeadField, string>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as LeadField;
      errors[key] ??= issue.message;
    }
    return { ok: false, errors, values };
  }

  const d = result.data;
  return {
    ok: true,
    lead: {
      name: d.name,
      businessName: d.businessName,
      businessType: d.businessType,
      city: d.city,
      monthlyEnquiries: d.monthlyEnquiries,
      phone: d.phone,
      email: d.email,
      message: d.message,
      consent: true,
      consentAt: now.toISOString(),
      consentText: CONSENT_TEXT,
      sourcePath: d.sourcePath,
      utm: { source: d.utm_source, medium: d.utm_medium, campaign: d.utm_campaign },
    },
  };
}
