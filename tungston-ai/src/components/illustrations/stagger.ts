import type { CSSProperties } from "react";

/** Stagger index for an animated child (read by illustrations.css as --i). */
export const at = (i: number, extra?: CSSProperties) => ({ "--i": i, ...extra }) as CSSProperties;
