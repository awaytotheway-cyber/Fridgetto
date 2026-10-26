import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/sections/page-hero";
import { Results } from "@/sections/results";
import { LiveDemo } from "@/sections/live-demo";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies: AI Systems That Paid Off",
  description:
    "Case studies: voice agents, chatbots and AI agents that moved bookings, support load and hours saved for real businesses.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Work", "/work")} />
      <PageHero title="Systems that paid for themselves.">
        Three recent builds, the problem each one solved and the number it moved.
      </PageHero>
      <Results withIntro={false} />
      <LiveDemo />
      <FinalCta />
    </>
  );
}
