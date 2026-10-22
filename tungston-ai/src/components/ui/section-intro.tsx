import type { ReactNode } from "react";
import { RevealText } from "@/components/fx/reveal-text";

type SectionIntroProps = {
  id: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** Section opener: a large headline on the left, a short paragraph that sits on its baseline at right. */
export function SectionIntro({ id, title, children, className }: SectionIntroProps) {
  return (
    <div className={`grid items-end gap-6 lg:grid-cols-12 lg:gap-10 ${className ?? ""}`}>
      <RevealText id={id} className="font-display text-display font-semibold text-bone lg:col-span-8">
        {title}
      </RevealText>
      {children && <div className="max-w-md text-lede text-ash lg:col-span-4 lg:justify-self-end">{children}</div>}
    </div>
  );
}
