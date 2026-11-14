import { describe, expect, it } from "vitest";
import { CONSENT_TEXT, normalisePhone, parseLead } from "./lead-schema";

const now = new Date("2026-11-14T08:00:00Z");

function form(overrides: Record<string, string | null> = {}) {
  const base: Record<string, string> = {
    name: "Asha Kulkarni",
    businessName: "Sunrise Fertility",
    businessType: "ivf",
    city: "Pune",
    monthlyEnquiries: "100-300",
    phone: "98765 43210",
    email: "asha@sunrise.example",
    message: "Most enquiries come from Meta ads.",
    consent: "on",
    sourcePath: "/contact",
  };
  const fd = new FormData();
  for (const [k, v] of Object.entries({ ...base, ...overrides })) if (v !== null) fd.set(k, v);
  return fd;
}

describe("normalisePhone", () => {
  it.each([
    ["+91 98765 43210", "+919876543210"],
    ["098765-43210", "+919876543210"],
    ["9876543210", "+919876543210"],
    ["919876543210", "+919876543210"],
    ["+44 20 7946 0958", "+442079460958"],
  ])("%s → %s", (input, out) => expect(normalisePhone(input)).toBe(out));

  it.each(["abc123", "12345", "+91 98765", ""])("rejects %s", (input) => expect(normalisePhone(input)).toBeNull());
});

describe("parseLead", () => {
  it("accepts a complete lead and stamps consent", () => {
    const r = parseLead(form(), now);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.lead.phone).toBe("+919876543210");
    expect(r.lead.consent).toBe(true);
    expect(r.lead.consentAt).toBe(now.toISOString());
    expect(r.lead.consentText).toBe(CONSENT_TEXT);
    expect(r.lead.businessType).toBe("ivf");
  });

  it("refuses a lead without consent", () => {
    const r = parseLead(form({ consent: null }), now);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.consent).toBeTruthy();
  });

  it("refuses an unknown business type, bad email and bad phone", () => {
    const r = parseLead(form({ businessType: "ecommerce", email: "a@b", phone: "abc123" }), now);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.errors.businessType).toBeTruthy();
    expect(r.errors.email).toBeTruthy();
    expect(r.errors.phone).toBeTruthy();
    expect(r.values.email).toBe("a@b");
  });

  it("requires name, business name and city", () => {
    const r = parseLead(form({ name: " ", businessName: "", city: "" }), now);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(["businessName", "city", "name"]);
  });

  it("makes the enquiry range optional but checks it when given", () => {
    expect(parseLead(form({ monthlyEnquiries: "" }), now).ok).toBe(true);
    expect(parseLead(form({ monthlyEnquiries: "lots" }), now).ok).toBe(false);
  });

  it("truncates a long message to 2,000 characters", () => {
    const r = parseLead(form({ message: "x".repeat(5000) }), now);
    expect(r.ok && r.lead.message?.length).toBe(2000);
  });

  it("keeps only a same-site source path and short UTM tags", () => {
    const r = parseLead(form({ sourcePath: "https://evil.example/x", utm_source: "meta", utm_campaign: "y".repeat(500) }), now);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.lead.sourcePath).toBeNull();
    expect(r.lead.utm.source).toBe("meta");
    expect(r.lead.utm.campaign?.length).toBe(100);
  });
});
