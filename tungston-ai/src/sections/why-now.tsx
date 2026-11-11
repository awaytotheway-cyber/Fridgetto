import { ButtonLink } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/section-intro";
import { whyNow } from "@/lib/content";
import { siteConfig } from "@/site.config";

/**
 * Makes the case for acting now by putting two versions of the same moment side by
 * side. The left column is the visitor's current week; the right is the same week
 * with one system in place.
 */
export function WhyNow() {
  return (
    // overflow-hidden clips the ambient glow below: it is wider than a phone, and
    // without clipping it lets the whole page scroll sideways.
    <section aria-labelledby="why-now-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="ambient -z-10 -left-40 top-20 h-[32rem] w-[44rem] opacity-50" />
      <div className="shell">
        <p className="font-mono text-xs tracking-[0.2em] text-smoke uppercase">{whyNow.eyebrow}</p>
        <SectionIntro id="why-now-title" title={whyNow.title} className="mt-5">
          {whyNow.lead}
        </SectionIntro>

        <ul className="mt-14 border-t border-white/[0.08] sm:mt-20">
          {whyNow.moments.map((moment) => (
            <li
              key={moment.when}
              className="grid gap-4 border-b border-white/[0.08] py-7 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <p className="font-display font-semibold text-bone md:col-span-4">{moment.when}</p>

              <p className="flex gap-3 text-ash md:col-span-4">
                <span aria-hidden="true" className="mt-[0.45em] h-px w-4 shrink-0 bg-smoke/60" />
                <span>
                  <span className="sr-only">Without a system: </span>
                  {moment.without}
                </span>
              </p>

              <p className="flex gap-3 text-bone/90 md:col-span-4">
                <span
                  aria-hidden="true"
                  className="mt-[0.45em] h-px w-4 shrink-0 bg-filament shadow-[0_0_12px_2px_rgb(232_16_26/0.45)]"
                />
                <span>
                  <span className="sr-only">With one in place: </span>
                  {moment.with}
                </span>
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-center">
          <p className="max-w-2xl text-lede text-bone/85 lg:col-span-8">{whyNow.close}</p>
          <div className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink href={siteConfig.contact.bookingUrl} size="lg">
              Find my first system
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
