import type { Metadata } from "next";
import { PageHero } from "@/sections/page-hero";
import { Services } from "@/sections/services";
import { Process } from "@/sections/process";
import { Pricing } from "@/sections/pricing";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI agents, voice agents, website chatbots, custom automations, RAG agents, content automation and web and app development, built and shipped in weeks.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Seven systems that work while you don't.">
        Pick the one that saves the most hours first. We&apos;ll scope it, build it and hand it over running.
      </PageHero>
      <Services withIntro={false} />
      <Process />
      <Pricing />
      <FinalCta />
    </>
  );
}
