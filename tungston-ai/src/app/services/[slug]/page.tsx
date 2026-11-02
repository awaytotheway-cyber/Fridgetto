import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { allServices, getService } from "@/lib/services";
import { faqJsonLd, serviceJsonLd } from "@/lib/services/jsonld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { FinalCta } from "@/sections/final-cta";
import { Benefits } from "@/sections/service-page/benefits";
import { Faq } from "@/sections/service-page/faq";
import { ServiceHero } from "@/sections/service-page/hero";
import { HowItWorks } from "@/sections/service-page/how-it-works";
import { Parts } from "@/sections/service-page/parts";
import { Related } from "@/sections/service-page/related";
import { SavingsCalculator } from "@/sections/service-page/savings-calculator";
import { ServiceStats } from "@/sections/service-page/stats";
import { Tools } from "@/sections/service-page/tools";
import { UseCases } from "@/sections/service-page/use-cases";
import { WhatIs } from "@/sections/service-page/what-is";

// Cache Components rules out dynamicParams = false: unknown slugs reach the page and get notFound()
export function generateStaticParams() {
  return allServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    ...pageMetadata({ title: s.seo.title, description: s.seo.description, path: `/services/${s.slug}` }),
    keywords: s.seo.keywords,
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(s.title, path, { name: "Services", path: "/services" })} />
      <JsonLd data={serviceJsonLd(s)} />
      <JsonLd data={faqJsonLd(s)} />
      <ServiceHero s={s} />
      <ServiceStats s={s} />
      <WhatIs s={s} />
      <Benefits s={s} />
      <HowItWorks s={s} />
      <Parts s={s} />
      <SavingsCalculator model={s.savings} title={s.title} />
      <UseCases s={s} />
      <Tools s={s} />
      <Faq s={s} />
      <Related s={s} />
      <FinalCta service={s.formValue} />
    </>
  );
}
