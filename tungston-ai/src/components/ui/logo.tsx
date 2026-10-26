import { siteConfig } from "@/site.config";

const GRID = [0, 1, 2, 3, 4];
const isP = (row: number, col: number) => col === 0 || ((row === 0 || row === 2) && col <= 3) || (row === 1 && col === 4);

/** The mark: a 5×5 dot matrix with a P burned into it. The corner where bowl meets stem runs hottest. */
export function LogoMark({ className, dim = true }: { className?: string; dim?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {GRID.map((row) =>
        GRID.map((col) => {
          const lit = isP(row, col);
          if (!lit && !dim) return null;
          const junction = row === 0 && col === 0;
          return (
            <circle
              key={`${row}-${col}`}
              cx={4 + col * 8}
              cy={4 + row * 8}
              r={lit ? 3 : 1.5}
              fill={junction ? "var(--color-volt)" : lit ? "var(--color-filament)" : "var(--color-ember)"}
            />
          );
        }),
      )}
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="size-7" />
      <span className="font-display text-[1.3rem] leading-none font-semibold tracking-[-0.01em] text-bone">
        {siteConfig.shortName}
        <span className="text-filament">{siteConfig.nameSuffix}</span>
      </span>
    </span>
  );
}
