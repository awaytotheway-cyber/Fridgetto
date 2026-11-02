import { Flag } from "lucide-react";
import { InView } from "./in-view";
import { at } from "./stagger";

type HandoffProps = {
  yourItems: string[];
  /** Total time on the client's side, e.g. "About 3 hours in total". */
  yourTotal: string;
  ourItems: string[];
  /** When it goes live, e.g. "Live in 2–3 weeks". */
  timeline: string;
};

/** Two lanes on one timeline: a few short touchpoints for the client, the long build for us. */
export function Handoff({ yourItems, yourTotal, ourItems, timeline }: HandoffProps) {
  const touchpoints = yourItems.map((_, i) => (yourItems.length === 1 ? 4 : 4 + (i * 82) / (yourItems.length - 1)));
  return (
    <InView className="rounded-panel border border-white/[0.07] bg-white/[0.02] p-5 sm:p-7">
      <div className="space-y-7">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-display text-lg font-semibold text-bone">Your side</p>
            <p className="text-sm font-medium text-volt">{yourTotal}</p>
          </div>
          <div aria-hidden="true" className="relative mt-3 h-3 rounded-full bg-white/[0.05]">
            {touchpoints.map((left, i) => (
              <span key={i} style={at(i, { left: `${left}%` })} className="il-pop absolute top-0 h-3 w-[6%] min-w-3 rounded-full bg-volt" />
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap gap-2 text-[0.8125rem] text-ash">
            {yourItems.map((item) => (
              <li key={item} className="rounded-full border border-white/[0.08] px-3 py-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-display text-lg font-semibold text-bone">Our side</p>
            <p className="text-sm font-medium text-signal">Everything else</p>
          </div>
          <div aria-hidden="true" className="relative mt-3 h-3 overflow-hidden rounded-full bg-white/[0.05]">
            <span className="il-bar-x absolute inset-0 rounded-full bg-[linear-gradient(90deg,var(--color-filament-deep),var(--color-filament))]" />
          </div>
          <ul className="mt-3 flex flex-wrap gap-2 text-[0.8125rem] text-ash">
            {ourItems.map((item) => (
              <li key={item} className="rounded-full border border-white/[0.08] px-3 py-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-7 flex items-center gap-2 border-t border-white/[0.07] pt-5 font-medium text-bone">
        <Flag aria-hidden="true" className="size-4 text-volt" />
        {timeline}
      </p>
    </InView>
  );
}
