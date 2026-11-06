import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { QuoteModal } from "@/components/pricing/quote-modal";
import { pricingFaqs } from "@/lib/pricing";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { CarePlan } from "@/sections/pricing-page/care-plan";
import { BuildPackages } from "@/sections/pricing-page/build-packages";
import { EstimatorSection } from "@/sections/pricing-page/estimator-section";
import { Ownership } from "@/sections/pricing-page/ownership";
import { PricingCta } from "@/sections/pricing-page/pricing-cta";
import { PricingFaq } from "@/sections/pricing-page/pricing-faq";
import { PricingHero } from "@/sections/pricing-page/pricing-hero";
import { ServicePricing } from "@/sections/pricing-page/service-pricing";

export const metadata: Metadata = pageMetadata({
  title: "AI Agent & Automation Pricing",
  description:
    "Clear starting prices for AI agents, voice agents, chatbots, workflow automation and websites. One-time implementation, optional maintenance, and you own the system.",
  path: "/pricing",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Pricing", "/pricing")} />
      <JsonLd data={faqJsonLd} />
      <PricingHero />
      <ServicePricing />
      <EstimatorSection />
      <BuildPackages />
      <CarePlan />
      <Ownership />
      <PricingFaq />
      <PricingCta />
      {/* One quote form for the whole page, opened by any "quote" button */}
      <QuoteModal />
    </>
  );
}
