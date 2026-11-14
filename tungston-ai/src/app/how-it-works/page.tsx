import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { seo } from "@/content/seo";
import { PageHero } from "@/sections/page-hero";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata(seo.howItWorks);

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("How it works", seo.howItWorks.path)} />
      <PageHero title="One front desk. Here's how it works." />
      <FinalCta />
    </>
  );
}
