import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { seo } from "@/content/seo";
import { PageHero } from "@/sections/page-hero";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata(seo.diagnostic);

export default function DiagnosticPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Front-Desk Diagnostic", seo.diagnostic.path)} />
      <PageHero title="Find out exactly where your enquiries leak." />
      <FinalCta />
    </>
  );
}
