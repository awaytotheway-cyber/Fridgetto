"use client";

import { useEffect, useImperativeHandle, useRef, type Ref } from "react";
import { RippleField, type RippleFieldOptions } from "@/lib/ripple-field";

export type DotGridHandle = {
  /** Drop a ripple at a point given in viewport coordinates. */
  rippleAt: (clientX: number, clientY: number, strength?: number) => void;
};

type DotGridProps = RippleFieldOptions & {
  className?: string;
  ref?: Ref<DotGridHandle>;
};

export function DotGrid({ className, ref, ...options }: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<RippleField | null>(null);
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let field: RippleField | null = null;
    // Build the field only when it's about to be seen, so offscreen grids cost nothing at load
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        field = new RippleField(canvas, JSON.parse(optionsKey) as RippleFieldOptions);
        fieldRef.current = field;
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(canvas);
    return () => {
      io.disconnect();
      field?.destroy();
      fieldRef.current = null;
    };
  }, [optionsKey]);

  useImperativeHandle(
    ref,
    () => ({
      rippleAt(clientX, clientY, strength = 18) {
        const canvas = canvasRef.current;
        const field = fieldRef.current;
        if (!canvas || !field) return;
        const rect = canvas.getBoundingClientRect();
        field.impulse(clientX - rect.left, clientY - rect.top, strength, 3);
      },
    }),
    [],
  );

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
