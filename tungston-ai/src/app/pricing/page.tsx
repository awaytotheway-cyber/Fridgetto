import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/components/ui/faq-list";
import { pricingFaqs, PRICES } from "@/content/pricing";
import { seo } from "@/content/seo";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/sections/page-hero";
import { PriceCards } from "@/sections/pricing-page/price-cards";
import { Ownership } from "@/sections/pricing-page/ownership";
import { PricingFaq } from "@/sections/pricing-page/pricing-faq";
import { FinalCta } from "@/sections/final-cta";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata(seo.pricing);

const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Clinic automation pricing",
  itemListElement: [
    { "@type": "Offer", name: "Clinic Automation Audit", price: PRICES.audit, priceCurrency: "INR" },
    {
      "@type": "Offer",
      name: "Single automation",
      priceSpecification: { "@type": "PriceSpecification", minPrice: PRICES.singleFrom, priceCurrency: "INR" },
    },
    {
      "@type": "Offer",
      name: "Full clinic system",
      priceSpecification: { "@type": "PriceSpecification", minPrice: PRICES.systemFrom, priceCurrency: "INR" },
    },
    {
      "@type": "Offer",
      name: "Managed Plan",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        minPrice: PRICES.managedFrom,
        priceCurrency: "INR",
        unitText: "MONTH",
      },
    },
  ],
  provider: { "@id": `${siteConfig.url}/#organization` },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Pricing", seo.pricing.path)} />
      <JsonLd data={faqJsonLd(pricingFaqs)} />
      <JsonLd data={offersJsonLd} />
      <PageHero eyebrow="Pricing" title="Clear prices. A fixed quote before you commit." />
      <PriceCards />
      <Ownership />
      <PricingFaq />
      <FinalCta />
    </>
  );
}
