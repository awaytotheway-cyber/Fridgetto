import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { seo } from "@/content/seo";
import { PageHero } from "@/sections/page-hero";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata(seo.education);

export default function EducationPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Education", seo.education.path)} />
      <PageHero title="Every lead called within minutes. Every counselling session booked." />
      <FinalCta />
    </>
  );
}
