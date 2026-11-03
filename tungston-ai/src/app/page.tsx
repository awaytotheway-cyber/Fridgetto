import type { Metadata } from "next";
import { Hero } from "@/sections/hero";
import { Marquee } from "@/sections/marquee";
import { WhyNow } from "@/sections/why-now";
import { Services } from "@/sections/services";
import { SavingsEstimator } from "@/sections/savings-estimator";
import { Process } from "@/sections/process";
import { LiveDemo } from "@/sections/live-demo";
import { Results } from "@/sections/results";
import { Pricing } from "@/sections/pricing";
import { About } from "@/sections/about";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * The order is the argument: why this matters now, what we build, what it would save
 * you, how we do it, proof it works, what it costs, who we are, and how to start.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <WhyNow />
      <Services />
      <SavingsEstimator />
      <Process />
      <LiveDemo />
      <Results />
      <Pricing />
      <About />
      <FinalCta />
    </>
  );
}
