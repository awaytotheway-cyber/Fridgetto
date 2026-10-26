import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/sections/page-hero";
import { About } from "@/sections/about";
import { Process } from "@/sections/process";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "About Our AI Automation Studio",
  description:
    "Why we build AI agents and automations, and how we work: shipped in weeks, measured in hours saved and revenue won.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("About", "/about")} />
      <PageHero title="We build the machines, so your people don't have to be one.">
        A small senior team of engineers and designers who ship working AI systems, not slide decks.
      </PageHero>
      <About />
      <Process />
      <FinalCta />
    </>
  );
}
