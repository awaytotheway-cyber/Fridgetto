import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/sections/page-hero";
import { Results } from "@/sections/results";
import { LiveDemo } from "@/sections/live-demo";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "What We Build: Voice Agents, Speed to Lead and Research Agents",
  description:
    "The three systems we build most: a voice agent that answers every clinic call, speed-to-lead automation for online stores, and a cited research agent for medical professionals.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Work", "/work")} />
      <PageHero title="Three systems, and who each one is for.">
        What we build most often, the problem each one takes off your desk, and what the system does once it is live.
      </PageHero>
      <Results withIntro={false} />
      <LiveDemo />
      <FinalCta />
    </>
  );
}
