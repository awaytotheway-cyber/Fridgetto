import { ToolLogo } from "@/components/tool-logo";
import { tools, type ToolId } from "@/lib/tools";
import { InView } from "./in-view";

type ToolConnectProps = { tools: ToolId[]; center: string };

/** The tools a system plugs into, on a ring around it, with data flowing along the links. */
export function ToolConnect({ tools: ids, center }: ToolConnectProps) {
  const points = ids.map((id, i) => {
    const angle = (i / ids.length) * Math.PI * 2 - Math.PI / 2;
    return { id, x: 50 + Math.cos(angle) * 38, y: 50 + Math.sin(angle) * 38 };
  });
  return (
    <InView className="relative mx-auto aspect-square w-full max-w-md">
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 size-full">
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="0.3" />
        {points.map((p) => (
          <line
            key={p.id}
            className="il-dash"
            x1="50"
            y1="50"
            x2={p.x}
            y2={p.y}
            stroke="rgb(232 16 26 / 0.55)"
            strokeWidth="0.35"
            strokeDasharray="1.5 2.5"
          />
        ))}
      </svg>
      <div className="absolute top-1/2 left-1/2 grid size-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-filament/50 bg-[radial-gradient(circle,rgb(232_16_26/0.3),rgb(12_12_13)_70%)] p-3 text-center shadow-[0_0_60px_-10px_rgb(232_16_26/0.7)]">
        <span className="font-display text-sm leading-tight font-semibold text-bone sm:text-base">{center}</span>
      </div>
      <ul>
        {points.map((p) => (
          <li
            key={p.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <span className="grid size-11 place-items-center rounded-full border border-white/10 bg-carbon shadow-[0_8px_30px_-10px_rgb(0_0_0/0.9)] sm:size-12">
              <ToolLogo id={p.id} size={20} decorative />
            </span>
            <span className="text-[0.6875rem] whitespace-nowrap text-ash">{tools[p.id].name}</span>
          </li>
        ))}
      </ul>
    </InView>
  );
}
