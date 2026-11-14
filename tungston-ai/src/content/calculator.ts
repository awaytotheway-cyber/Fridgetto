/**
 * Missed-enquiry calculator: presets and wording (COPY.md §2.5 and §4).
 *
 * Every preset is an ILLUSTRATIVE starting point for a visitor to change, not an
 * industry benchmark. The average values come from published price ranges:
 *  - IVF ₹1,60,000: average spend per cycle in an Indian cost study (clinic pages show ₹1–2.5 lakh)
 *  - Dermatology & hair ₹50,000: a blend of hair transplants (₹60,000–1,80,000 in Mumbai) and smaller skin packages
 *  - Dental ₹40,000: a mid-range single implant in Mumbai (₹35,000–45,000)
 *  - Diagnostics ₹2,000: an assumption for a home-collection package
 *  - Education fees: assumptions within published consultancy and course fee ranges
 */
import type { CalculatorInputs } from "@/lib/calculator";

export type Vertical = "clinic" | "education";

export type Preset = { label: string; inputs: CalculatorInputs };

export const clinicPresets = {
  ivf: { label: "IVF & fertility", inputs: { enquiries: 300, missedPct: 30, bookingPct: 25, conversionPct: 20, avgValue: 1_60_000 } },
  "derm-hair": { label: "Dermatology & hair", inputs: { enquiries: 400, missedPct: 35, bookingPct: 30, conversionPct: 25, avgValue: 50_000 } },
  dental: { label: "Dental", inputs: { enquiries: 250, missedPct: 30, bookingPct: 35, conversionPct: 40, avgValue: 40_000 } },
  diagnostics: { label: "Diagnostic labs", inputs: { enquiries: 1_500, missedPct: 20, bookingPct: 60, conversionPct: 90, avgValue: 2_000 } },
  custom: { label: "Custom", inputs: { enquiries: 200, missedPct: 30, bookingPct: 30, conversionPct: 30, avgValue: 50_000 } },
} satisfies Record<string, Preset>;

export const educationPresets = {
  "study-abroad": { label: "Study abroad", inputs: { enquiries: 500, missedPct: 60, bookingPct: 30, conversionPct: 15, avgValue: 75_000 } },
  upskilling: { label: "Upskilling", inputs: { enquiries: 800, missedPct: 50, bookingPct: 25, conversionPct: 10, avgValue: 60_000 } },
  "exam-coaching": { label: "Exam coaching", inputs: { enquiries: 1_000, missedPct: 50, bookingPct: 30, conversionPct: 15, avgValue: 40_000 } },
} satisfies Record<string, Preset>;

export type ClinicPresetId = keyof typeof clinicPresets;
export type EducationPresetId = keyof typeof educationPresets;
export type PresetId = ClinicPresetId | EducationPresetId;

export const isClinicPreset = (v: unknown): v is ClinicPresetId =>
  typeof v === "string" && Object.hasOwn(clinicPresets, v);

type Field = { key: keyof CalculatorInputs; label: string; help?: string; max: number; step: number; unit?: "%" | "₹" };

const shared = {
  disclaimer:
    "Illustrative estimate based on your inputs, not a guarantee or a measured client result.",
  cta: { label: "Get your real numbers with a Clinic Automation Audit", href: "/audit" },
};

export const calculatorCopy: Record<
  Vertical,
  typeof shared & { presetLabel: string; breakEvenLabel: string; fields: Field[]; lostLabel: string; lostUnit: string; riskLabel: string }
> = {
  clinic: {
    ...shared,
    presetLabel: "Specialty",
    lostLabel: "Patients lost each month",
    lostUnit: "patients",
    riskLabel: "Revenue at risk each month",
    breakEvenLabel: "Patients needed each month to cover the Managed plan",
    fields: [
      { key: "enquiries", label: "Enquiries per month", max: 5_000, step: 10 },
      { key: "missedPct", label: "Missed or slow to answer", max: 100, step: 1, unit: "%" },
      { key: "bookingPct", label: "Answered enquiries that book", max: 100, step: 1, unit: "%" },
      { key: "conversionPct", label: "Consults that start treatment", max: 100, step: 1, unit: "%" },
      { key: "avgValue", label: "Average treatment value", max: 5_00_000, step: 1_000, unit: "₹" },
    ],
  },
  education: {
    ...shared,
    presetLabel: "Business type",
    lostLabel: "Enrollments lost each month",
    lostUnit: "enrollments",
    riskLabel: "Fees at risk each month",
    breakEvenLabel: "Enrollments needed each month to cover the Managed plan",
    fields: [
      { key: "enquiries", label: "Leads per month", max: 10_000, step: 10 },
      { key: "missedPct", label: "Not called within 10 minutes", max: 100, step: 1, unit: "%" },
      { key: "bookingPct", label: "Leads that book a session", max: 100, step: 1, unit: "%" },
      { key: "conversionPct", label: "Sessions that enroll", max: 100, step: 1, unit: "%" },
      { key: "avgValue", label: "Average fee", max: 10_00_000, step: 1_000, unit: "₹" },
    ],
  },
};
