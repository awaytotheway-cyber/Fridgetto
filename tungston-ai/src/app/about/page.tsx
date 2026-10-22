import type { Metadata } from "next";
import { PageHero } from "@/sections/page-hero";
import { About } from "@/sections/about";
import { Process } from "@/sections/process";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = {
  title: "About",
  description: "Why we build AI agents and automations, and how we work: shipped in weeks, measured in hours and revenue.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="We build the machines, so your people don't have to be one.">
        A small senior team of engineers and designers who ship working AI systems, not slide decks.
      </PageHero>
      <About />
      <Process />
      <FinalCta />
    </>
  );
}
