import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/sections/page-hero";
import { Team } from "@/sections/team";
import { FinalCta } from "@/sections/final-cta";
import { team } from "@/lib/content";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Team",
  description:
    "Meet the people behind Protomation.ai: the orchestrator who plans and runs every build, and the designer who shapes how it looks and feels.",
  path: "/team",
});

const peopleJsonLd = {
  "@context": "https://schema.org",
  "@graph": team.map((member) => ({
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: `${siteConfig.url}${member.image}`,
    knowsAbout: member.focus,
    worksFor: { "@id": `${siteConfig.url}/#organization` },
  })),
};

export default function TeamPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Team", "/team")} />
      <JsonLd data={peopleJsonLd} />
      <PageHero title="The people behind the machines.">
        A small team that does the work itself. You talk to the people who plan, design and build your systems.
      </PageHero>
      <Team />
      <FinalCta />
    </>
  );
}
