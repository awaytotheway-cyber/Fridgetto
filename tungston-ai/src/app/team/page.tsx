import type { Metadata } from "next";
import { PageHero } from "@/sections/page-hero";
import { Team } from "@/sections/team";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the people behind Protomation.ai: the orchestrator who plans and runs every build, and the designer who shapes how it looks and feels.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero title="The people behind the machines.">
        A small team that does the work itself. You talk to the people who plan, design and build your systems.
      </PageHero>
      <Team />
      <FinalCta />
    </>
  );
}
