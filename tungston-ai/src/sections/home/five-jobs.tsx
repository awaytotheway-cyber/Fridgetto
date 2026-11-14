import Link from "next/link";
import { SectionIntro } from "@/components/ui/section-intro";
import { fiveJobs } from "@/content/home";

/** One system, five jobs (COPY.md §2.3). The old services appear here only as the parts each job is built from. */
export function FiveJobs() {
  return (
    <section aria-labelledby="jobs-title" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionIntro id="jobs-title" title={fiveJobs.title}>
          {fiveJobs.lead}
        </SectionIntro>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.08] sm:mt-20 md:grid-cols-2 lg:grid-cols-5">
          {fiveJobs.jobs.map((job, i) => (
            <li key={job.title} className="flex flex-col bg-void p-7 sm:p-8">
              <p className="font-display text-sm font-medium text-signal tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-display text-title font-semibold text-bone">{job.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-ash">{job.body}</p>
              <p className="mt-auto pt-8 font-mono text-xs tracking-[0.12em] text-smoke uppercase">{job.parts}</p>
            </li>
          ))}
        </ol>

        <Link
          href="/how-it-works"
          className="mt-8 inline-flex items-center gap-2 font-medium text-bone underline decoration-filament/60 underline-offset-4 transition-colors hover:decoration-volt"
        >
          See how each part works <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
