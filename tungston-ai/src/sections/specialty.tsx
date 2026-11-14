import Link from "next/link";
import type { Specialty } from "@/content/clinics";

const Column = ({ title, items, hot }: { title: string; items: string[]; hot?: boolean }) => (
  <div>
    <h3 className="font-mono text-xs tracking-[0.2em] text-smoke uppercase">{title}</h3>
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.9375rem] text-bone/90">
          <span
            aria-hidden="true"
            className={`mt-[0.6em] h-px w-3 shrink-0 ${hot ? "bg-filament shadow-[0_0_10px_1px_rgb(232_16_26/0.45)]" : "bg-smoke/60"}`}
          />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

/** One specialty on /clinics: how enquiries arrive, where they leak, what the front desk does, what you see. */
export function SpecialtySection({ specialty, calculatorHref }: { specialty: Specialty; calculatorHref?: string }) {
  return (
    <section id={specialty.id} aria-labelledby={`${specialty.id}-title`} className="scroll-mt-24 border-t border-white/[0.08] py-16 sm:py-24">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 id={`${specialty.id}-title`} className="font-display text-[clamp(1.9rem,1.4rem+1.8vw,3rem)] leading-[1.02] font-semibold text-bone">
            {specialty.title}
          </h2>
          <p className="mt-5 text-ash">{specialty.intro}</p>
          <p className="mt-5 text-sm text-smoke">
            <span className="text-ash">How enquiries arrive: </span>
            {specialty.arrive}
          </p>
          {specialty.cta && calculatorHref && (
            <Link
              href={calculatorHref}
              className="mt-6 inline-flex items-center gap-2 font-medium text-bone underline decoration-filament/60 underline-offset-4 transition-colors hover:decoration-volt"
            >
              {specialty.cta} <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          <Column title="Where they leak" items={specialty.leaks} />
          <Column title="What the front desk does" items={specialty.does} hot />
          <Column title="What you see in the report" items={specialty.report} />
        </div>
      </div>
    </section>
  );
}
