import type { ReactNode } from "react";
import { DotGrid } from "@/components/fx/dot-grid";

type PageHeroProps = {
  title: ReactNode;
  /** Small monospace label above the headline. */
  eyebrow?: string;
  children?: ReactNode;
};

/** Opening band for inner pages: the same water grid as the home hero, at a shorter height. */
export function PageHero({ title, eyebrow, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden pt-40 pb-16 sm:pt-52 sm:pb-24">
      <DotGrid
        className="absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(120%_90%_at_70%_30%,#000_35%,transparent_95%)]"
        spacing={24}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-void" />
      <div className="shell grid items-end gap-8 lg:grid-cols-12">
        {/* Not a RevealText: this headline is the page's largest paint, so it shows from the first frame */}
        <div className="lg:col-span-8">
        {eyebrow && (
          <p className="page-intro mb-5 font-mono text-xs tracking-[0.2em] text-smoke uppercase">{eyebrow}</p>
        )}
        <h1
          id="page-title"
          className="page-intro font-display text-[clamp(2.6rem,1.4rem+4.6vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.02em] text-bone"
        >
          {title}
        </h1>
        </div>
        {children && <div className="max-w-md text-lede text-ash lg:col-span-4 lg:justify-self-end">{children}</div>}
      </div>
    </section>
  );
}
