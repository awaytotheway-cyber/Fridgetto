import { SectionIntro } from "@/components/ui/section-intro";
import { ownershipPoints } from "@/content/pricing";

export function Ownership() {
  return (
    <section aria-labelledby="ownership-title" className="py-16 sm:py-24">
      <div className="shell">
        <SectionIntro id="ownership-title" title="Your accounts. Your data. No lock-in.">
          We build it in your name wherever we can, so you keep everything whether or not we keep running it.
        </SectionIntro>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.08] sm:mt-16 md:grid-cols-2">
          {ownershipPoints.map((point, i) => (
            <li key={point.title} className="bg-void p-7 sm:p-9">
              <span className="font-mono text-xs tracking-[0.2em] text-smoke">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-title font-semibold text-bone">{point.title}</h3>
              <p className="mt-3 text-ash">{point.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
