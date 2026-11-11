import { SectionIntro } from "@/components/ui/section-intro";
import { useCases } from "@/lib/content";

export function Results({ withIntro = true }: { withIntro?: boolean }) {
  return (
    <section aria-labelledby="results-title" className="relative py-24 sm:py-32">
      <div className="shell">
        {withIntro ? (
          <SectionIntro id="results-title" title="What these systems do.">
            The three builds we are set up for, and the problem each one takes off your desk. The numbers for your own
            setup come out of the free audit.
          </SectionIntro>
        ) : (
          <h2 id="results-title" className="sr-only">
            What these systems do
          </h2>
        )}

        <div className="mt-14 grid border-t border-white/[0.08] sm:mt-20 lg:grid-cols-3">
          {useCases.map((study, i) => (
            <article
              key={study.audience}
              className={`group/case relative flex flex-col py-10 lg:px-10 lg:py-12 ${i > 0 ? "border-t border-white/[0.08] lg:border-t-0 lg:border-l" : "lg:pl-0"} ${i === useCases.length - 1 ? "lg:pr-0" : ""}`}
            >
              <h3 className="font-display text-xl font-semibold tracking-[-0.005em] text-bone">{study.audience}</h3>
              <p className="mt-1 text-sm text-smoke">{study.context}</p>

              <p className="mt-10 font-display text-[clamp(3.5rem,2.5rem+3.5vw,6rem)] leading-none font-semibold tracking-[-0.025em] text-volt [text-shadow:0_0_40px_rgb(255_212_0/0.25)]">
                {study.headline}
              </p>
              <p className="mt-3 max-w-[22ch] text-lede leading-snug text-bone">{study.headlineLabel}</p>

              <dl className="mt-10 space-y-6 text-[0.9375rem]">
                <div>
                  <dt className="font-medium text-smoke">The problem</dt>
                  <dd className="mt-1.5 text-ash">{study.problem}</dd>
                </div>
                <div>
                  <dt className="font-medium text-smoke">What we build</dt>
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
