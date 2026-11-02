import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  /** Two-digit section number shown before the eyebrow. */
  index: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
};

/** Section opener for service pages: numbered eyebrow, headline, and an optional lede at right. */
export function SectionHeading({ id, index, eyebrow, title, children }: SectionHeadingProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
      <div className="lg:col-span-7">
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-signal uppercase">
          <span className="tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-filament/60" />
          {eyebrow}
        </p>
        <h2
          id={id}
          className="mt-4 font-display text-[clamp(2rem,1.3rem+2.6vw,3.75rem)] leading-[1] font-semibold tracking-[-0.015em] text-bone"
        >
          {title}
        </h2>
      </div>
      {children && <div className="max-w-md text-lede text-ash lg:col-span-5 lg:justify-self-end">{children}</div>}
    </div>
  );
}
