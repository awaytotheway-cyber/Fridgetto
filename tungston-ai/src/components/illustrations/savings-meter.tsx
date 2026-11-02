import type { CSSProperties } from "react";

type SavingsMeterProps = {
  /** How full the arc is, 0–1. Values outside are clamped. */
  fraction: number;
  label: string;
};

/** A gauge that sweeps to the result whenever the calculator changes it. */
export function SavingsMeter({ fraction, label }: SavingsMeterProps) {
  const fill = Math.min(1, Math.max(0, fraction));
  const arc = "M12 100 A88 88 0 0 1 188 100";
  return (
    <div className="relative" style={{ "--fill": fill } as CSSProperties}>
      <svg aria-hidden="true" viewBox="0 0 200 108" className="w-full">
        <defs>
          <linearGradient id="il-meter-gradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--color-filament-deep)" />
            <stop offset="0.7" stopColor="var(--color-filament)" />
            <stop offset="1" stopColor="var(--color-volt)" />
          </linearGradient>
        </defs>
        <path d={arc} pathLength={100} fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth="12" strokeLinecap="round" />
        <path className="il-meter-arc" d={arc} pathLength={100} fill="none" stroke="url(#il-meter-gradient)" strokeWidth="12" strokeLinecap="round" />
      </svg>
      <p className="-mt-4 text-center text-sm text-ash">{label}</p>
    </div>
  );
}
