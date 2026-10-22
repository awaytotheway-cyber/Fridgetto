"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  max?: number;
};

/**
 * Card that tilts toward the pointer and carries a heat spot under it.
 * Exposes --mx/--my (pointer position, %) and --heat (0–1) to children for glow effects.
 */
export function TiltCard({ children, className, max = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    el.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(2)}deg`);
    el.style.setProperty("--heat", "1");
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--heat", "0");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group/tilt [perspective:1200px] ${className ?? ""}`}
    >
      <div className="relative h-full [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] transition-transform duration-500 ease-out-expo [transform-style:preserve-3d] will-change-transform">
        {children}
      </div>
    </div>
  );
}
