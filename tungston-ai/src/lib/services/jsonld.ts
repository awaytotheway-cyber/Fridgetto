import { siteConfig } from "@/site.config";
import type { ServiceDetail } from "./types";

/** schema.org Service for a service page, provided by the organization declared in the root layout. */
export function serviceJsonLd(s: ServiceDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.seo.description,
    url: `${siteConfig.url}/services/${s.slug}`,
    image: `${siteConfig.url}${s.card.image}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"],
  };
}

/** schema.org FAQPage built from the page's FAQ section, word for word. */
export function faqJsonLd(s: ServiceDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
