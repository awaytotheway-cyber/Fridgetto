"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

/** How close (px from the pill's edge) the cursor has to come before the slime reaches for it. */
const GRAB = 36;
/** How far it has to pull away before the slime lets go. */
const RELEASE = 120;
/** Radius of the blob that wraps around the cursor. */
const BLOB = 30;
/** Circles in the strand between the pill and the blob. */
const LINKS = 12;
/** Room the slime can stretch into around the button, so the SVG never clips it. */
const MARGIN = RELEASE + BLOB + 30;
/** Other controls: the slime never claims a cursor that is over one of these. */
const INTERACTIVE = "a, button, input, textarea, select, label, summary, [role='button'], [contenteditable='true']";

type LiquidButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/**
 * A pill button made of slime. When the cursor comes near, a blob stretches out,
 * wraps around it and follows it until the cursor pulls far enough away, then
 * snaps back with a wobble. Drawn with an SVG goo filter (blur, alpha threshold,
 * specular gloss) over a plain link, so the link stays the real control.
 *
 * Keep the field's padding clear of other controls; it is the zone the slime grabs in.
 * Touch devices and reduced motion get the plain pill.
 */
export function LiquidButton({ href, children, className }: LiquidButtonProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const filterId = `goo-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    const field = fieldRef.current;
    const svg = svgRef.current;
    const link = linkRef.current;
    const label = labelRef.current;
    if (!field || !svg || !link || !label) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const pillEl = svg.querySelector<SVGRectElement>("[data-pill]")!;
    const bulgeEl = svg.querySelector<SVGCircleElement>("[data-bulge]")!;
    const blobEl = svg.querySelector<SVGCircleElement>("[data-blob]")!;
    const linkEls = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-link]"));
    const html = document.documentElement;

    // Pill geometry in SVG coordinates
    const pill = { x: 0, y: 0, w: 0, h: 0, r: 0, cx: 0, cy: 0 };
    const measure = () => {
      const s = svg.getBoundingClientRect();
      const l = link.getBoundingClientRect();
      pill.x = l.left - s.left;
      pill.y = l.top - s.top;
      pill.w = l.width;
      pill.h = l.height;
      pill.r = l.height / 2;
      pill.cx = pill.x + pill.w / 2;
      pill.cy = pill.y + pill.h / 2;
      pillEl.setAttribute("x", String(pill.x));
      pillEl.setAttribute("y", String(pill.y));
      pillEl.setAttribute("width", String(pill.w));
      pillEl.setAttribute("height", String(pill.h));
      pillEl.setAttribute("rx", String(pill.r));
    };
    measure();
    field.dataset.liquid = "on";

    /** Signed distance from a point to the pill's outline (negative inside). */
    const distance = (x: number, y: number) => {
      const dx = Math.max(Math.abs(x - pill.cx) - (pill.w / 2 - pill.r), 0);
      const dy = Math.abs(y - pill.cy);
      return Math.hypot(dx, dy) - pill.r;
    };
    /** Where the strand roots: the point on the pill's spine nearest to (x, y). */
    const root = (x: number) => Math.min(Math.max(x, pill.x + pill.r), pill.x + pill.w - pill.r);

    let clientX = -1e4;
    let clientY = -1e4;
    let overOther = false;
    let visible = false;
    let engaged = false;
    // Blob position, velocity and radius (with its own velocity, for the jiggle)
    let fx = pill.cx;
    let fy = pill.cy;
    let vx = 0;
    let vy = 0;
    let rb = 0;
    let rv = 0;
    // Jelly wobble of the pill itself
    let w = 0;
    let wv = 0;
    let raf = 0;
    let last = 0;

    const engage = () => {
      engaged = true;
      html.dataset.goo = "";
      wv += 0.05;
    };
    const release = () => {
      engaged = false;
      delete html.dataset.goo;
      wv -= 0.07;
    };

    const draw = () => {
      const ax = root(fx);
      const ay = pill.cy;
      const dx = fx - ax;
      const dy = fy - ay;
      const stretch = Math.hypot(dx, dy);
      const reach = rb / BLOB;
      // Perpendicular to the strand, for a sag that trails behind fast moves
      const px = stretch ? -dy / stretch : 0;
      const py = stretch ? dx / stretch : 0;
      const sag = Math.max(-22, Math.min(22, -(vx * px + vy * py) * 2.2));
      const neckMin = Math.max(0.2, Math.min(1, 1 - stretch / (RELEASE + pill.r)));

      linkEls.forEach((el, i) => {
        const t = (i + 1) / (LINKS + 1);
        const bow = Math.sin(Math.PI * t);
        const r = (pill.r * 0.82 * (1 - t) + rb * t) * (1 - (1 - neckMin) * bow) * Math.min(1, reach * 1.6);
        el.setAttribute("cx", (ax + dx * t + px * bow * sag).toFixed(2));
        el.setAttribute("cy", (ay + dy * t + py * bow * sag).toFixed(2));
        el.setAttribute("r", Math.max(0, r).toFixed(2));
      });

      // The pill swells toward wherever the strand leaves it
      const lean = Math.min(stretch, pill.r * 0.45) / (stretch || 1);
      bulgeEl.setAttribute("cx", (ax + dx * lean).toFixed(2));
      bulgeEl.setAttribute("cy", (ay + dy * lean).toFixed(2));
      bulgeEl.setAttribute("r", (pill.r * (0.9 + 0.18 * reach)).toFixed(2));

      blobEl.setAttribute("cx", fx.toFixed(2));
      blobEl.setAttribute("cy", fy.toFixed(2));
      blobEl.setAttribute("r", Math.max(0, rb).toFixed(2));

      const sx = 1 + w;
      const sy = 1 - w * 0.9;
      pillEl.setAttribute(
        "transform",
        `translate(${pill.cx} ${pill.cy}) scale(${sx.toFixed(4)} ${sy.toFixed(4)}) translate(${-pill.cx} ${-pill.cy})`,
      );

      // The label leans a little toward the cursor, like it's being tugged
      const lx = Math.max(-10, Math.min(10, (fx - pill.cx) * 0.06 * reach));
      const ly = Math.max(-6, Math.min(6, (fy - pill.cy) * 0.08 * reach));
      label.style.transform = `translate3d(${lx.toFixed(2)}px, ${ly.toFixed(2)}px, 0)`;
    };

    const tick = (now: number) => {
      raf = 0;
      const steps = Math.min(4, Math.max(1, Math.round((now - (last || now - 16.7)) / 16.7)));
      last = now;

      const s = svg.getBoundingClientRect();
      const x = clientX - s.left;
      const y = clientY - s.top;
      const d = distance(x, y);
      if (!engaged && visible && !overOther && d < GRAB) engage();
      else if (engaged && (d > RELEASE || overOther || !visible)) release();

      for (let i = 0; i < steps; i++) {
        // Engaged, the blob chases the cursor on a soft spring; released, it slumps back into the pill
        const tx = engaged ? x : root(fx);
        const ty = engaged ? y : pill.cy;
        vx = vx * 0.74 + (tx - fx) * 0.16;
        vy = vy * 0.74 + (ty - fy) * 0.16;
        fx += vx;
        fy += vy;
        rv = rv * 0.68 + ((engaged ? BLOB : 0) - rb) * 0.2;
        rb = Math.max(0, rb + rv);
        wv = wv * 0.86 - w * 0.22;
        w += wv;
      }
      draw();

      const settled = !engaged && rb < 0.2 && Math.abs(vx) + Math.abs(vy) < 0.05 && Math.abs(w) + Math.abs(wv) < 0.0005;
      if (settled) {
        rb = 0;
        w = 0;
        draw();
        last = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      clientX = e.clientX;
      clientY = e.clientY;
      const target = e.target as Element | null;
      const control = target?.closest?.(INTERACTIVE);
      overOther = !!control && control !== link;
      if (visible) wake();
    };
    const onLeave = () => {
      clientX = clientY = -1e4;
      wake();
    };
    // The page can scroll the button under a resting cursor
    const onScroll = () => {
      if (visible) wake();
    };
    // While the slime holds the cursor, a click anywhere in it presses the button
    const onClick = (e: MouseEvent) => {
      if (!engaged || e.button !== 0 || e.defaultPrevented) return;
      const target = e.target as Element | null;
      if (!target || link.contains(target) || target.closest(INTERACTIVE)) return;
      if (window.getSelection()?.toString()) return;
      e.preventDefault();
      link.click();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        wake();
      },
      { rootMargin: "100px" },
    );
    io.observe(field);
    const ro = new ResizeObserver(() => {
      measure();
      wake();
    });
    ro.observe(field);
    ro.observe(link);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("click", onClick, true);
    html.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("click", onClick, true);
      html.removeEventListener("pointerleave", onLeave);
      delete html.dataset.goo;
      delete field.dataset.liquid;
      label.style.transform = "";
    };
  }, []);

  return (
    <div ref={fieldRef} className={`group/liquid relative inline-block p-12 ${className ?? ""}`}>
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="pointer-events-none absolute hidden overflow-visible group-data-[liquid=on]/liquid:block"
        style={{ left: -MARGIN, top: -MARGIN, width: `calc(100% + ${MARGIN * 2}px)`, height: `calc(100% + ${MARGIN * 2}px)` }}
      >
        <defs>
          <filter id={filterId} x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10" result="goo" />
            <feGaussianBlur in="goo" stdDeviation="3.5" result="soft" />
            <feSpecularLighting in="soft" surfaceScale="5" specularConstant="0.95" specularExponent="26" lightingColor="#fff3d1" result="spec">
              <feDistantLight azimuth="235" elevation="50" />
            </feSpecularLighting>
            <feComposite in="spec" in2="goo" operator="in" result="gloss" />
            <feComposite in="gloss" in2="goo" operator="arithmetic" k1="0" k2="0.6" k3="1" k4="0" result="slime" />
            <feGaussianBlur in="goo" stdDeviation="16" result="halo" />
            <feColorMatrix in="halo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="slime" />
            </feMerge>
          </filter>
        </defs>
        <g filter={`url(#${filterId})`} fill="var(--color-filament)">
          <rect data-pill />
          <circle data-bulge r="0" />
          {Array.from({ length: LINKS }, (_, i) => (
            <circle key={i} data-link r="0" />
          ))}
          <circle data-blob r="0" />
        </g>
      </svg>
      <a
        ref={linkRef}
        href={href}
        data-cursor="hot"
        className="relative inline-flex h-16 items-center justify-center rounded-full bg-filament px-9 text-[1.0625rem] font-medium tracking-[-0.01em] text-white shadow-[0_0_0_1px_rgb(232_16_26/0.6),0_10px_40px_-10px_rgb(232_16_26/0.8)] transition-[transform,background-color,box-shadow] duration-300 ease-out-expo active:scale-95 group-data-[liquid=on]/liquid:bg-transparent group-data-[liquid=on]/liquid:shadow-none group-data-[liquid=on]/liquid:active:scale-100"
      >
        <span ref={labelRef} className="inline-flex items-center gap-2.5 will-change-transform">
          {children}
        </span>
      </a>
    </div>
  );
}
