import Link from "next/link";
import { SectionIntro } from "@/components/ui/section-intro";
import { whoItsFor } from "@/content/home";

/** The four clinic types, each linking to its section on /clinics. */
export function WhoItsFor() {
  return (
    <section aria-labelledby="who-title" className="relative py-24 sm:py-36">
      <div className="shell">
        <SectionIntro id="who-title" title={whoItsFor.title} />
        <ul className="mt-16 grid gap-5 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4">
          {whoItsFor.cards.map((card) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className="group/who flex h-full flex-col rounded-card border border-white/[0.08] bg-white/[0.02] p-8 transition-[border-color,background-color] duration-300 hover:border-filament/60 hover:bg-filament/[0.04]"
              >
                <h3 className="font-display text-title font-semibold text-bone transition-colors group-hover/who:text-signal">
                  {card.title}
                </h3>
                <p className="mt-3 text-ash">{card.body}</p>
                <span aria-hidden="true" className="mt-auto pt-10 text-lg text-bone">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-ash">
          {whoItsFor.education.text}{" "}
          <Link
            href={whoItsFor.education.href}
            className="text-bone underline decoration-filament/60 underline-offset-4 transition-colors hover:decoration-volt"
          >
            {whoItsFor.education.link} <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
