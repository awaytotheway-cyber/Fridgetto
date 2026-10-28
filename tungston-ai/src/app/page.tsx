import type { Metadata } from "next";
import { Hero } from "@/sections/hero";
import { Marquee } from "@/sections/marquee";
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
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
