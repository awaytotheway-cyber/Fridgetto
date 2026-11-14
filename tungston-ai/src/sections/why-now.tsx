import { SectionIntro } from "@/components/ui/section-intro";
import { leaks } from "@/content/home";

/** Where patients slip away: three moments, each shown today and with the front desk. */
export function WhyNow() {
  return (
    // overflow-hidden clips the ambient glow below: it is wider than a phone, and
    // without clipping it lets the whole page scroll sideways.
    <section aria-labelledby="leaks-title" className="relative overflow-hidden py-24 sm:py-36">
      <div aria-hidden="true" className="ambient -z-10 -left-40 top-20 h-[32rem] w-[44rem] opacity-50" />
      <div className="shell">
        <p className="font-mono text-xs tracking-[0.2em] text-smoke uppercase">{leaks.eyebrow}</p>
        <SectionIntro id="leaks-title" title={leaks.title} className="mt-5">
          {leaks.lead}
        </SectionIntro>

        <ul className="mt-16 grid gap-5 sm:mt-24 md:grid-cols-3">
          {leaks.moments.map((moment) => (
            <li key={moment.when} className="flex flex-col rounded-card border border-white/[0.08] bg-white/[0.02] p-8 sm:p-9">
              <p className="font-display text-title font-semibold text-bone">{moment.when}</p>
              <dl className="mt-auto space-y-5 pt-10">
                <div>
                  <dt className="font-mono text-[0.6875rem] tracking-[0.2em] text-smoke uppercase">Today</dt>
                  <dd className="mt-1.5 text-ash">{moment.without}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6875rem] tracking-[0.2em] text-signal uppercase">With Protomation</dt>
                  <dd className="mt-1.5 text-bone">{moment.with}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
