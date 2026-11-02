/**
 * Every service page's content, in catalog order. Add a service by writing its file in
 * ./details and listing it here; the page, sitemap and tests pick it up.
 */
import { catalog } from "./catalog";
import { whatsappAutomation } from "./details/whatsapp-automation";
import type { ServiceDetail } from "./types";

const details: ServiceDetail[] = [whatsappAutomation];

const bySlug = new Map(details.map((d) => [d.slug, d]));

export function getService(slug: string): ServiceDetail | undefined {
  return bySlug.get(slug);
}

export function allServices(): ServiceDetail[] {
  return catalog.flatMap((c) => bySlug.get(c.slug) ?? []);
}
