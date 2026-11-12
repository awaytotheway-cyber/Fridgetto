import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/components/ui/faq-list";
import { homeFaqs } from "@/lib/content";
import { Hero } from "@/sections/hero";
import { Marquee } from "@/sections/marquee";
import { WhyNow } from "@/sections/why-now";
import { Services } from "@/sections/services";
import { WorksWith } from "@/sections/works-with";
import { SavingsEstimator } from "@/sections/savings-estimator";
import { Process } from "@/sections/process";
import { LiveDemo } from "@/sections/live-demo";
import { Results } from "@/sections/results";
import { Pricing } from "@/sections/pricing";
import { About } from "@/sections/about";
import { Faq } from "@/sections/faq";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * The order is the argument: why this matters now, what we build, what it would save you,
 * the tools it plugs into, how we do it, proof it works, what it costs, who we are, and
 * how to start.
 *
 * The estimator sits straight after the services rather than below the tool strip: it is
 * the one thing on the page a visitor can actually use, and burying a working calculator
 * five screens down wastes it.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <Hero />
      <Marquee />
      <WhyNow />
      <Services />
      <SavingsEstimator />
      <WorksWith />
      <Process />
      <LiveDemo />
      <Results />
      <Pricing />
      <About />
      <Faq />
      <FinalCta />
    </>
  );
}
