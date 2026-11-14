import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { seo } from "@/content/seo";
import { aboutHero, founderBio, principles, team, where } from "@/content/about";
import { PageHero } from "@/sections/page-hero";
import { Team } from "@/sections/team";
import { FinalCta } from "@/sections/final-cta";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata(seo.about);

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

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("About", seo.about.path)} />
      <JsonLd data={peopleJsonLd} />
      <PageHero eyebrow="About" title={aboutHero.title}>
        {aboutHero.lead}
      </PageHero>

      <section aria-labelledby="founder-title" className="pb-16 sm:pb-24">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <h2 id="founder-title" className="font-display text-title font-semibold text-bone lg:col-span-4">
            The founder
          </h2>
          <p className="max-w-2xl text-lede text-bone/90 lg:col-span-7 lg:col-start-6">{founderBio}</p>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="py-16 sm:py-24">
        <div className="shell">
          <h2 id="principles-title" className="font-display text-display font-semibold text-bone">
            How we work
          </h2>
          <ul className="mt-12 grid gap-10 border-t border-white/[0.08] pt-10 md:grid-cols-3 md:gap-8">
            {principles.map((p) => (
              <li key={p.title}>
                <h3 className="font-display text-title font-semibold text-bone">{p.title}</h3>
                <p className="mt-3 max-w-sm text-ash">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="team-title" className="pt-16 sm:pt-24">
        <div className="shell mb-12">
          <h2 id="team-title" className="font-display text-display font-semibold text-bone">
            The team
          </h2>
          <p className="mt-4 text-ash">{where}</p>
        </div>
      </section>
      <Team />
      <FinalCta />
    </>
  );
}
