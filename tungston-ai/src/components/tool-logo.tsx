import { Puzzle } from "lucide-react";
import { logoColor, tools, type ToolId } from "@/lib/tools";

type ToolLogoProps = {
  id: ToolId;
  /** Pixel size of the square logo. */
  size?: number;
  className?: string;
  /** Hide from assistive tech when a visible name sits next to it. */
  decorative?: boolean;
};

/** A tool's logo in its brand colour (or bone, when that colour would vanish on black). */
export function ToolLogo({ id, size = 20, className, decorative = false }: ToolLogoProps) {
  const tool = tools[id];
  const a11y = decorative ? { "aria-hidden": true as const } : { role: "img", "aria-label": tool.name };
  if (!tool.path) {
    return <Puzzle {...a11y} width={size} height={size} strokeWidth={1.75} className={`text-ash ${className ?? ""}`} />;
  }
  return (
    <svg {...a11y} viewBox="0 0 24 24" width={size} height={size} className={className} fill={logoColor(tool.hex)}>
      <path d={tool.path} />
    </svg>
  );
}

/** Logo and name in a pill, for "works with" lists. */
export function ToolChip({ id, className }: { id: ToolId; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] py-2 pr-4 pl-3 text-[0.9375rem] text-bone ${className ?? ""}`}
    >
      <ToolLogo id={id} size={18} decorative />
      {tools[id].name}
    </span>
  );
}
