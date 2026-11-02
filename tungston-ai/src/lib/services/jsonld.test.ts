import { describe, expect, it } from "vitest";
import { breadcrumbJsonLd } from "@/lib/seo";
import { getService } from "./index";
import { faqJsonLd, serviceJsonLd } from "./jsonld";

const s = getService("whatsapp-automation")!;

describe("serviceJsonLd", () => {
  it("describes the service and links it to the organization", () => {
    const data = serviceJsonLd(s);
    expect(data["@type"]).toBe("Service");
    expect(data.name).toBe("WhatsApp Automation");
    expect(data.provider["@id"]).toMatch(/\/#organization$/);
    expect(data.url).toMatch(/\/services\/whatsapp-automation$/);
  });
});

describe("faqJsonLd", () => {
  it("lists every question with its answer", () => {
    const data = faqJsonLd(s);
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity).toHaveLength(s.faqs.length);
    expect(data.mainEntity[0].acceptedAnswer.text).toBe(s.faqs[0].a);
  });
});

describe("breadcrumbJsonLd", () => {
  it("nests a service page under Services", () => {
    const data = breadcrumbJsonLd("WhatsApp Automation", "/services/whatsapp-automation", { name: "Services", path: "/services" });
    expect(data.itemListElement.map((i: { name: string }) => i.name)).toEqual(["Home", "Services", "WhatsApp Automation"]);
  });

  it("keeps two levels for a top-level page", () => {
    expect(breadcrumbJsonLd("Team", "/team").itemListElement).toHaveLength(2);
  });
});
