import Link from "next/link";
import { SectionIntro } from "@/components/ui/section-intro";
import { fiveJobs } from "@/content/home";

/** One system, five jobs, one line each. */
export function FiveJobs() {
  return (
    <section aria-labelledby="jobs-title" className="relative py-24 sm:py-36">
      <div className="shell">
        <SectionIntro id="jobs-title" title={fiveJobs.title} />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.08] sm:mt-24 sm:grid-cols-2 lg:grid-cols-5">
          {fiveJobs.jobs.map((job, i) => (
            <li key={job.title} className="bg-void p-8 sm:p-9">
              <p className="font-display text-sm font-medium text-signal tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 font-display text-title font-semibold text-bone">{job.title}</h3>
              <p className="mt-3 text-ash">{job.body}</p>
            </li>
          ))}
        </ol>

        <Link
          href="/how-it-works"
          className="mt-10 inline-flex items-center gap-2 font-medium text-bone underline decoration-filament/60 underline-offset-4 transition-colors hover:decoration-volt"
        >
          See how it works <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
