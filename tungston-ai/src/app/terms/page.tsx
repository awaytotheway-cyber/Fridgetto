import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/sections/page-hero";
import { LegalDocument } from "@/sections/legal-document";
import { termsOfService } from "@/lib/legal";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The agreement between you and Protomation.ai: what we build, what it costs, who owns it afterwards, and the limits of what we promise.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Terms of Service", "/terms")} />
      <PageHero title="Terms of Service">{termsOfService.summary}</PageHero>
      <LegalDocument doc={termsOfService} />
    </>
  );
}
