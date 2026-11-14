import { ButtonLink } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/section-intro";
import { leaks } from "@/content/home";
import { siteConfig } from "@/site.config";

/**
 * "Where enquiries leak" (COPY.md §2.2): the same moment twice, side by side. The left
 * column is the clinic's week now; the right is the same week with the front desk.
 */
export function WhyNow() {
  return (
    // overflow-hidden clips the ambient glow below: it is wider than a phone, and
    // without clipping it lets the whole page scroll sideways.
    <section aria-labelledby="leaks-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="ambient -z-10 -left-40 top-20 h-[32rem] w-[44rem] opacity-50" />
      <div className="shell">
        <p className="font-mono text-xs tracking-[0.2em] text-smoke uppercase">{leaks.eyebrow}</p>
        <SectionIntro id="leaks-title" title={leaks.title} className="mt-5">
          {leaks.lead}
        </SectionIntro>

        <div className="mt-14 hidden border-b border-white/[0.08] pb-3 font-mono text-xs tracking-[0.2em] text-smoke uppercase sm:mt-20 md:grid md:grid-cols-12 md:gap-8">
          <span className="md:col-span-4">The moment</span>
          <span className="md:col-span-4">Without a front desk</span>
          <span className="md:col-span-4">With Protomation</span>
        </div>
        <ul className="mt-14 border-t border-white/[0.08] md:mt-0 md:border-t-0">
          {leaks.moments.map((moment) => (
            <li
              key={moment.when}
              className="grid gap-4 border-b border-white/[0.08] py-7 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <p className="font-display font-semibold text-bone md:col-span-4">{moment.when}</p>

              <p className="flex gap-3 text-ash md:col-span-4">
                <span aria-hidden="true" className="mt-[0.45em] h-px w-4 shrink-0 bg-smoke/60" />
                <span>
                  <span className="sr-only">Without a front desk: </span>
                  {moment.without}
                </span>
              </p>

              <p className="flex gap-3 text-bone/90 md:col-span-4">
                <span
                  aria-hidden="true"
                  className="mt-[0.45em] h-px w-4 shrink-0 bg-filament shadow-[0_0_12px_2px_rgb(232_16_26/0.45)]"
                />
                <span>
                  <span className="sr-only">With Protomation: </span>
                  {moment.with}
                </span>
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-center">
          <p className="max-w-2xl text-lede text-bone/85 lg:col-span-8">{leaks.close}</p>
          <div className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink href={siteConfig.contact.bookingUrl} size="lg" data-event="cta_book_call">
              Book a free 20-min call
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
