import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { seo } from "@/content/seo";
import { contactHero, onTheCall } from "@/content/contact";
import { PageHero } from "@/sections/page-hero";
import { LeadForm } from "@/components/lead-form";
import { CalendarEmbed } from "@/components/calendar-embed";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata(seo.contact);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Contact", seo.contact.path)} />
      <PageHero eyebrow="Contact" title={contactHero.title}>
        {contactHero.lead}
      </PageHero>
      <section aria-label="Book a free call" className="pb-24 sm:pb-32">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <LeadForm />
            <CalendarEmbed />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <h2 className="font-display text-title font-semibold text-bone">{onTheCall.title}</h2>
            <p className="mt-3 text-ash">{onTheCall.body}</p>
            <dl className="mt-10 space-y-6 border-t border-white/[0.08] pt-8">
              {siteConfig.contact.whatsapp && (
                <div>
                  <dt className="text-sm text-smoke">WhatsApp</dt>
                  <dd className="mt-1">
                    <a
                      href={siteConfig.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-event="whatsapp_click"
                      className="inline-flex items-center gap-2.5 text-bone hover:text-volt"
                    >
                      <WhatsAppIcon className="size-5 shrink-0 text-[#25D366]" />
                      {siteConfig.contact.whatsapp}
                      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-smoke">Email</dt>
                <dd className="mt-1 [overflow-wrap:anywhere]">
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-bone hover:text-volt">
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-smoke">Where</dt>
                <dd className="mt-1 text-bone">{siteConfig.contact.location}</dd>
              </div>
              <div>
                <dt className="text-sm text-smoke">Reply time</dt>
                <dd className="mt-1 text-bone">Within 6 working hours (Mon–Sat, 10am–7pm IST)</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
