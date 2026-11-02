import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { isToolId } from "@/lib/tools";
import { catalog } from "./catalog";
import { allServices } from "./index";
import { computeSavings, defaultInputs } from "./savings";
import type { ServiceDetail } from "./types";

const PUBLIC = join(__dirname, "../../../public");
const slugs = new Set(catalog.map((s) => s.slug));

/** Every string anywhere in a service's content. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe.each(allServices().map((s) => [s.slug, s] as [string, ServiceDetail]))("%s", (slug, s) => {
  it("has the page's fixed number of sections", () => {
    expect(s.benefits).toHaveLength(4);
    expect(s.steps).toHaveLength(5);
    expect(s.flow.length).toBeGreaterThanOrEqual(4);
    expect(s.flow.length).toBeLessThanOrEqual(6);
    expect(s.useCases).toHaveLength(6);
    expect(s.useCases.filter((u) => u.photo)).toHaveLength(3);
    expect(s.faqs.length).toBeGreaterThanOrEqual(5);
    expect(s.faqs.length).toBeLessThanOrEqual(6);
  });

  it("names only known tools", () => {
    expect(s.tools.length).toBeGreaterThanOrEqual(6);
    expect(s.tools.length).toBeLessThanOrEqual(8);
    for (const t of [...s.tools, ...s.flow.flatMap((f) => (f.tool ? [f.tool] : []))]) expect(isToolId(t), t).toBe(true);
  });

  it("links to three other services", () => {
    expect(s.related).toHaveLength(3);
    for (const r of s.related) {
      expect(slugs.has(r), r).toBe(true);
      expect(r).not.toBe(slug);
    }
  });

  it("fits search results", () => {
    expect(s.seo.title.length).toBeLessThanOrEqual(48);
    expect(s.seo.description.length).toBeGreaterThanOrEqual(120);
    expect(s.seo.description.length).toBeLessThanOrEqual(155);
    expect(s.hero.title.trim()).not.toBe("");
  });

  it("uses images that exist", () => {
    expect(existsSync(join(PUBLIC, s.card.image)), s.card.image).toBe(true);
    for (const u of s.useCases) if (u.photo) expect(existsSync(join(PUBLIC, u.photo.src)), u.photo.src).toBe(true);
  });

  it("saves time in both markets", () => {
    for (const m of ["inr", "usd"] as const) {
      expect(computeSavings(s.savings, defaultInputs(s.savings, m)).hoursPerMonth).toBeGreaterThan(0);
    }
  });

  it("keeps money out of the copy (figures come from the calculator)", () => {
    for (const text of strings(s)) expect(text, text).not.toMatch(/[₹$]\s?\d/);
  });
});
