import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/sections/page-hero";
import { LegalDocument } from "@/sections/legal-document";
import { privacyPolicy } from "@/lib/legal";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "What Protomation.ai collects, why, who else handles it and what you can ask us to delete. No analytics, no tracking, no selling your data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Privacy Policy", "/privacy")} />
      <PageHero title="Privacy Policy">{privacyPolicy.summary}</PageHero>
      <LegalDocument doc={privacyPolicy} />
    </>
  );
}
