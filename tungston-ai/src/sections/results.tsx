import { SectionIntro } from "@/components/ui/section-intro";
import { caseStudies } from "@/lib/content";

export function Results({ withIntro = true }: { withIntro?: boolean }) {
  return (
    <section aria-labelledby="results-title" className="relative py-24 sm:py-32">
      <div className="shell">
        {withIntro ? (
          <SectionIntro id="results-title" title="Results you can put on a dashboard.">
            Every engagement starts with the number we&apos;re trying to move. Here&apos;s what moved for three recent clients.
          </SectionIntro>
        ) : (
          <h2 id="results-title" className="sr-only">
            Case studies
          </h2>
        )}

        <div className="mt-14 grid border-t border-white/[0.08] sm:mt-20 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <article
              key={study.client}
              className={`group/case relative flex flex-col py-10 lg:px-10 lg:py-12 ${i > 0 ? "border-t border-white/[0.08] lg:border-t-0 lg:border-l" : "lg:pl-0"} ${i === caseStudies.length - 1 ? "lg:pr-0" : ""}`}
            >
              <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-bone">{study.client}</h3>
              <p className="mt-1 text-sm text-smoke">{study.sector}</p>

              <p className="mt-10 font-display text-[clamp(3.5rem,2.5rem+3.5vw,6rem)] leading-none font-semibold tracking-[-0.06em] text-volt [text-shadow:0_0_40px_rgb(255_212_0/0.25)]">
                {study.metric}
              </p>
              <p className="mt-3 max-w-[22ch] text-lede leading-snug text-bone">{study.metricLabel}</p>

              <dl className="mt-10 space-y-6 text-[0.9375rem]">
                <div>
                  <dt className="font-medium text-signal">The problem</dt>
                  <dd className="mt-1.5 text-ash">{study.problem}</dd>
                </div>
                <div>
                  <dt className="font-medium text-signal">What we built</dt>
                  <dd className="mt-1.5 text-ash">{study.solution}</dd>
                </div>
              </dl>

              <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                {study.services.map((s) => (
                  <li key={s} className="rounded-full border border-white/10 px-3 py-1 text-[0.8125rem] text-ash">
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
