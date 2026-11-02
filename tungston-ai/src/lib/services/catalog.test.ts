import { describe, expect, it } from "vitest";
import { catalog, catalogEntry, contactOptions, resolveServiceParam, serviceLabel } from "./catalog";

const SLUGS = [
  "ai-agent-development",
  "ai-voice-agents",
  "ai-website-chatbots",
  "whatsapp-automation",
  "crm-lead-automation",
  "data-reporting-automation",
  "ai-process-automation",
  "finance-reconciliation-automation",
  "speed-to-lead-agent",
  "custom-automations",
  "content-automation",
  "website-development",
];

/** The values the contact form has always sent; the email template and the n8n webhook read them. */
const FORM_VALUES = [
  "ai-agent-development",
  "ai-voice-agents",
  "ai-website-chatbots",
  "whatsapp-automation",
  "crm-lead-automation",
  "data-reporting-automation",
  "ai-process-automation",
  "finance-reconciliation",
  "lead-to-speed-agent",
  "custom-automations",
  "content-automation",
  "websites-landing-pages",
  "not-sure",
];

describe("catalog", () => {
  it("lists the twelve services in order", () => {
    expect(catalog.map((s) => s.slug)).toEqual(SLUGS);
  });

  it("keeps the contact form's values unchanged", () => {
    expect(contactOptions.map((o) => o.value)).toEqual(FORM_VALUES);
  });

  it("calls the lead agent Speed-to-Lead", () => {
    expect(serviceLabel("lead-to-speed-agent")).toBe("Speed-to-Lead Agent");
    expect(catalogEntry("speed-to-lead-agent").title).toBe("Speed-to-Lead Agent");
  });

  it("keeps dropdown blurbs short", () => {
    for (const s of catalog) expect(s.menuBlurb.length, s.slug).toBeLessThanOrEqual(60);
  });

  it("throws on an unknown slug", () => {
    expect(() => catalogEntry("nope")).toThrow();
  });
});

describe("resolveServiceParam", () => {
  it("accepts a known form value", () => {
    expect(resolveServiceParam("whatsapp-automation")).toBe("whatsapp-automation");
  });

  it("ignores anything else", () => {
    expect(resolveServiceParam("nope")).toBe("");
    expect(resolveServiceParam(null)).toBe("");
  });
});
