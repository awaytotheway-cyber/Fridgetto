/**
 * A client case study. Deliberately rendered nowhere yet: there is no client data we
 * can publish. When there is, with the client's written permission, add it to /work.
 * Never fill this with invented numbers.
 */
export type CaseStudyData = {
  /** "A fertility centre in Pune" is fine; a name needs permission. */
  clientType: string;
  problem: string;
  baseline: string;
  setup: string;
  results: { at: "30 days" | "60 days" | "90 days"; text: string }[];
  quote?: { text: string; by: string };
};

export function CaseStudy({ study }: { study: CaseStudyData }) {
  return (
    <article className="rounded-card border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9">
      <h3 className="font-display text-title font-semibold text-bone">{study.clientType}</h3>
      <dl className="mt-6 grid gap-6 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-smoke">The problem</dt>
          <dd className="mt-1 text-ash">{study.problem}</dd>
        </div>
        <div>
          <dt className="text-sm text-smoke">Before</dt>
          <dd className="mt-1 text-ash">{study.baseline}</dd>
        </div>
        <div>
          <dt className="text-sm text-smoke">What we set up</dt>
          <dd className="mt-1 text-ash">{study.setup}</dd>
        </div>
      </dl>
      <ul className="mt-8 grid gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
        {study.results.map((r) => (
          <li key={r.at}>
            <p className="font-mono text-xs tracking-[0.2em] text-smoke uppercase">{r.at}</p>
            <p className="mt-2 text-bone">{r.text}</p>
          </li>
        ))}
      </ul>
      {study.quote && (
        <blockquote className="mt-8 border-l-2 border-filament pl-5 text-bone/90">
          <p>&ldquo;{study.quote.text}&rdquo;</p>
          <footer className="mt-2 text-sm text-smoke">{study.quote.by}</footer>
        </blockquote>
      )}
    </article>
  );
}
