import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { CtaPair } from "@/components/cta-pair";
import { faqJsonLd } from "@/components/ui/faq-list";
import { homeFaqs } from "@/content/faqs";
import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/sections/hero";
import { WhyNow } from "@/sections/why-now";
import { FiveJobs } from "@/sections/home/five-jobs";
import { LiveDemo } from "@/sections/live-demo";
import { CalculatorSection } from "@/sections/home/calculator-section";
import { WhoItsFor } from "@/sections/home/who-its-for";
import { Process } from "@/sections/process";
import { Monthly } from "@/sections/home/monthly";
import { DataTrust } from "@/sections/home/data-trust";
import { Pricing } from "@/sections/pricing";
import { About } from "@/sections/about";
import { Faq } from "@/sections/faq";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata(seo.home);

/**
 * Clinics only (COPY.md §2). The order is the argument: what you get, where you lose
 * patients today, what the system does, try it, put a number on it, who it's for, how
 * we work, what continues monthly, data, prices, who we are, objections, and the ask.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <Hero actions={<CtaPair note={false} />} />
      <WhyNow />
      <FiveJobs />
      <LiveDemo />
      <CalculatorSection />
      <WhoItsFor />
      <Process />
      <Monthly />
      <DataTrust />
      <Pricing />
      <About />
      <Faq />
      <FinalCta />
    </>
  );
}
