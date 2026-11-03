import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { breadcrumbTrailJsonLd, pageMetadata } from "@/lib/seo";
import { services } from "@/lib/content";
import { serviceDetails } from "@/lib/service-details";
import { ServiceArt } from "@/sections/service-art";
import { Process } from "@/sections/process";
import { FinalCta } from "@/sections/final-cta";
import { siteConfig } from "@/site.config";

/** Every service needs its longer copy, or the page would render as a shell. */
const missing = services.filter((s) => !serviceDetails[s.slug]).map((s) => s.slug);
if (missing.length) {
  throw new Error(`serviceDetails is missing an entry for: ${missing.join(", ")}`);
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const detail = serviceDetails[slug];
  // An unknown slug renders the not-found page, but Cache Components has already
  // committed the shell's 200 by then, so the status cannot be corrected here
  // (dynamicParams, which would reject the path, is rejected by cacheComponents).
  // noindex keeps a made-up URL out of search results, which is the harm that matters.
  // Matches app/not-found.tsx, whose own metadata this page's generateMetadata replaces
  if (!detail) return { title: "Page not found", robots: { index: false, follow: false } };
  return pageMetadata({
    title: detail.metaTitle,
    description: detail.metaDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) notFound();

  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <JsonLd
        data={breadcrumbTrailJsonLd([
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: detail.metaDescription,
          serviceType: service.title,
          url: `${siteConfig.url}/services/${slug}`,
          provider: { "@id": `${siteConfig.url}/#organization` },
          areaServed: "Worldwide",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: detail.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />

      {/* Opening band: its own layout rather than PageHero, so the illustration sits beside the headline */}
      <section aria-labelledby="page-title" className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-48 sm:pb-20">
        <div aria-hidden="true" className="ambient -z-10 -right-32 top-10 h-[34rem] w-[48rem] opacity-60" />
        <div className="shell">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-smoke">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-bone">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="transition-colors hover:text-bone">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ash">{service.title}</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs tracking-[0.2em] text-signal uppercase">{service.title}</p>
              <h1
                id="page-title"
                className="page-intro mt-4 font-display text-[clamp(2.5rem,1.5rem+4vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.02em] text-bone"
              >
                {detail.headline}
              </h1>
              <p className="mt-6 max-w-xl text-lede text-ash">{service.hook}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={siteConfig.contact.bookingUrl} size="lg">
                  Book a Free AI Audit
                </ButtonLink>
                <ButtonLink href="#what-you-get" variant="ghost" size="lg">
                  What you get <span aria-hidden="true">↓</span>
                </ButtonLink>
              </div>
            </div>

            <div className="relative h-56 sm:h-72 lg:col-span-5 lg:h-80">
              {service.image ? (
                <Image
                  src={service.image}
                  alt={service.imageAlt ?? ""}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority
                  className="object-contain [mask-image:radial-gradient(closest-side,#000_68%,transparent)]"
                />
              ) : (
                <ServiceArt kind={service.art} live={service.art === "voice"} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* The problem, in the visitor's own terms */}
      <section aria-labelledby="problem-title" className="py-16 sm:py-24">
        <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h2 id="problem-title" className="font-display text-title font-semibold text-bone lg:col-span-4">
            Why this exists
          </h2>
          <div className="space-y-6 lg:col-span-8">
            {detail.problem.map((paragraph) => (
              <p key={paragraph} className="text-lede text-bone/85">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section aria-labelledby="what-you-get" className="scroll-mt-24 py-16 sm:py-24">
        <div className="shell">
          <h2 id="what-you-get" className="font-display text-display font-semibold text-bone">
            What you get
          </h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {detail.included.map((item, i) => (
              <li
                key={item.title}
                className="relative overflow-hidden rounded-card border border-white/[0.07] bg-[linear-gradient(180deg,rgb(255_255_255/0.035),rgb(255_255_255/0.01))] p-6 sm:p-8"
              >
                <span className="font-mono text-xs text-smoke tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-title font-semibold text-bone">{item.title}</h3>
                <p className="mt-3 text-ash">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fit, stack and timeline */}
      <section aria-labelledby="fit-title" className="py-16 sm:py-24">
        <div className="shell">
          <h2 id="fit-title" className="sr-only">
            Is this right for you?
          </h2>
          <div className="grid gap-10 border-t border-white/[0.08] pt-10 md:grid-cols-3 md:gap-8">
            <div>
              <h3 className="font-display text-title font-semibold text-bone">Best for</h3>
              <ul className="mt-5 space-y-3 text-ash">
                {detail.bestFor.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-filament"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-title font-semibold text-bone">Usually built on</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {detail.stack.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-white/[0.09] px-3 py-1.5 text-sm text-ash"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-title font-semibold text-bone">Typical timeline</h3>
              <p className="mt-5 text-ash">{detail.timeline}</p>
            </div>
          </div>
        </div>
      </section>

      <Process />

      {/* FAQs: <details> so they work with JavaScript switched off */}
      <section aria-labelledby="faq-title" className="py-16 sm:py-24">
        <div className="shell">
          <h2 id="faq-title" className="font-display text-display font-semibold text-bone">
            Questions people ask
          </h2>
          <div className="mt-12 border-t border-white/[0.08]">
            {detail.faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-white/[0.08] py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-title font-semibold text-bone transition-colors hover:text-signal [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-signal transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-ash">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* The other services */}
      <section aria-labelledby="others-title" className="py-16 sm:py-24">
        <div className="shell">
          <h2 id="others-title" className="font-display text-title font-semibold text-bone">
            Other things we build
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex h-full flex-col rounded-panel border border-white/[0.07] p-5 transition-colors hover:border-white/20"
                >
                  <span className="font-display font-semibold text-bone group-hover:text-signal">
                    {other.title}
                  </span>
                  <span className="mt-2 text-sm text-smoke">{other.hook}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
