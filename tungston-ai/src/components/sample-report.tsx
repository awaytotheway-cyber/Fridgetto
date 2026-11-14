import { sampleReport } from "@/content/work";

/** The monthly report, filled with dummy data and watermarked so nobody mistakes it for a result. */
export function SampleReport() {
  return (
    <figure className="relative overflow-hidden rounded-card border border-white/[0.09] bg-carbon">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid place-items-center font-display text-[clamp(4rem,3rem+6vw,9rem)] font-semibold tracking-[0.2em] text-white/[0.045] [transform:rotate(-18deg)] select-none"
      >
        SAMPLE
      </div>
      <div className="relative p-7 sm:p-9">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-white/[0.08] pb-5">
          <p className="font-display text-title font-semibold text-bone">{sampleReport.clinic}</p>
          <p className="font-mono text-xs tracking-[0.2em] text-smoke uppercase">{sampleReport.month}</p>
        </div>
        <dl className="mt-2 divide-y divide-white/[0.06]">
          {sampleReport.rows.map((row) => (
            <div key={row.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
              <dt className="text-ash">
                {row.label}
                {row.detail && <span className="block text-sm text-smoke">{row.detail}</span>}
              </dt>
              <dd className="font-display text-2xl font-semibold text-bone tabular-nums">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 rounded-panel bg-white/[0.03] p-4 text-sm text-bone/90">
          <span className="font-medium text-volt">Note from us: </span>
          {sampleReport.note}
        </p>
      </div>
      <figcaption className="relative border-t border-white/[0.08] px-7 py-4 text-sm text-smoke sm:px-9">
        <span className="sr-only">Sample report, dummy data. </span>
        {sampleReport.caption}
      </figcaption>
    </figure>
  );
}
