import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { seo } from "@/content/seo";
import { PageHero } from "@/sections/page-hero";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata(seo.security);

export default function SecurityPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Security & data", seo.security.path)} />
      <PageHero title="How we handle your patients' data." />
      <FinalCta />
    </>
  );
}
