import { Check, Clock, X, Zap } from "lucide-react";
import { InView } from "./in-view";
import { at } from "./stagger";

type BeforeAfterProps = {
  /** How the work goes today, one problem per line. */
  before: string[];
  /** The same work once the system runs it. */
  after: string[];
};

/** Today's way of working next to the automated one, ticking over item by item. */
export function BeforeAfter({ before, after }: BeforeAfterProps) {
  return (
    <InView className="grid gap-4 md:grid-cols-2">
      <div className="rounded-panel border border-white/[0.07] bg-white/[0.02] p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold tracking-widest text-smoke uppercase">Today</p>
          <Clock aria-hidden="true" className="il-spin size-5 text-smoke" />
        </div>
        <ul className="mt-5 space-y-3">
          {before.map((line, i) => (
            <li key={line} style={at(i)} className="il-in flex items-start gap-3 text-ash">
              <X aria-hidden="true" className="mt-1 size-4 shrink-0 text-signal" />
              {line}
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="il-bar-x h-full w-1/3 rounded-full bg-filament-deep" />
        </div>
      </div>
      <div className="relative overflow-hidden rounded-panel border border-filament/30 bg-[radial-gradient(120%_80%_at_100%_0%,rgb(232_16_26/0.16),transparent_60%)] p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold tracking-widest text-signal uppercase">With Protomation</p>
          <Zap aria-hidden="true" className="size-5 text-volt" />
        </div>
        <ul className="mt-5 space-y-3">
          {after.map((line, i) => (
            <li key={line} style={at(i + 1)} className="il-in flex items-start gap-3 text-bone">
              <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-volt" />
              {line}
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div style={at(2)} className="il-bar-x h-full rounded-full bg-[linear-gradient(90deg,var(--color-filament),var(--color-volt))]" />
        </div>
      </div>
    </InView>
  );
}
