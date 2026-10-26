import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/sections/page-hero";
import { Services } from "@/sections/services";
import { SavingsEstimator } from "@/sections/savings-estimator";
import { Process } from "@/sections/process";
import { Pricing } from "@/sections/pricing";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "AI Agent, Chatbot & Automation Services",
  description:
    "AI agents, voice agents, website chatbots, automations, RAG agents, content systems, websites and apps. Scoped, built and shipped in weeks.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Services", "/services")} />
      <PageHero title="Seven systems that work while you don't.">
        Pick the one that saves the most hours first. We&apos;ll scope it, build it and hand it over running.
      </PageHero>
      <Services withIntro={false} />
      <SavingsEstimator />
      <Process />
      <Pricing />
      <FinalCta />
    </>
  );
}
