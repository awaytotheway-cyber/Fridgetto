import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { seo } from "@/content/seo";
import { PageHero } from "@/sections/page-hero";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata(seo.clinics);

export default function ClinicsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Clinics", seo.clinics.path)} />
      <PageHero title="An AI front desk for clinics where every patient counts." />
      <FinalCta />
    </>
  );
}
