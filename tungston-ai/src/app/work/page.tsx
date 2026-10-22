import type { Metadata } from "next";
import { PageHero } from "@/sections/page-hero";
import { Results } from "@/sections/results";
import { LiveDemo } from "@/sections/live-demo";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies: voice agents, chatbots and AI agents that moved bookings, support load and hours saved.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero title="Systems that paid for themselves.">
        Three recent builds, the problem each one solved and the number it moved.
      </PageHero>
      <Results withIntro={false} />
      <LiveDemo />
      <FinalCta />
    </>
  );
}
