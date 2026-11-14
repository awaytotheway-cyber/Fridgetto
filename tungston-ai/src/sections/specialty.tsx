import Link from "next/link";
import { Check } from "lucide-react";
import type { Specialty } from "@/content/clinics";

/** One specialty on /clinics: a sentence on how patients behave, and three things we automate. */
export function SpecialtySection({ specialty, calculatorHref }: { specialty: Specialty; calculatorHref?: string }) {
  return (
    <section id={specialty.id} aria-labelledby={`${specialty.id}-title`} className="scroll-mt-24 border-t border-white/[0.08] py-20 sm:py-28">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h2 id={`${specialty.id}-title`} className="font-display text-[clamp(1.9rem,1.4rem+1.8vw,3rem)] leading-[1.02] font-semibold text-bone">
            {specialty.title}
          </h2>
          <p className="mt-5 max-w-md text-lede text-ash">{specialty.intro}</p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <ul className="space-y-4">
            {specialty.does.map((item) => (
              <li key={item} className="flex gap-3 text-lg text-bone/90">
                <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-filament" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
          {specialty.cta && calculatorHref && (
            <Link
              href={calculatorHref}
              className="mt-8 inline-flex items-center gap-2 font-medium text-bone underline decoration-filament/60 underline-offset-4 transition-colors hover:decoration-volt"
            >
              {specialty.cta} <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
