import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/sections/page-hero";
import { ContactForm } from "@/components/contact-form";
import { processSteps } from "@/lib/content";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Book a free AI audit",
  description:
    "Tell us one task that eats your week. We'll reply within one business day with how we'd automate it, free.",
  path: "/contact",
});

export default function ContactPage() {
  const audit = processSteps[0];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Contact", "/contact")} />
      <PageHero title="Book a free AI audit.">
        Tell us one task that eats your week. We&apos;ll reply within one business day with how we&apos;d automate it.
      </PageHero>
      <section aria-label="Contact form" className="pb-24 sm:pb-32">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <h2 className="font-display text-title font-semibold text-bone">What happens on the call</h2>
            <p className="mt-3 text-ash">{audit.body}</p>
            <p className="mt-3 text-ash">
              You leave with a short written summary, whether or not we work together.
            </p>
            <dl className="mt-10 space-y-6 border-t border-white/[0.08] pt-8">
              <div>
                <dt className="text-sm text-smoke">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-bone hover:text-volt">
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
              {siteConfig.contact.phone && (
                <div>
                  <dt className="text-sm text-smoke">Phone</dt>
                  <dd className="mt-1">
                    <a href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`} className="text-bone hover:text-volt">
                      {siteConfig.contact.phone}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-smoke">Where</dt>
                <dd className="mt-1 text-bone">{siteConfig.contact.location}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
