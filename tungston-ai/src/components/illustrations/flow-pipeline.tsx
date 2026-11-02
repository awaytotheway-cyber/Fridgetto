import { ToolLogo } from "@/components/tool-logo";
import type { ToolId } from "@/lib/tools";
import { InView } from "./in-view";
import { at } from "./stagger";

type FlowPipelineProps = { nodes: { label: string; tool?: ToolId }[] };

/**
 * The service's real flow as connected steps, lighting up in order with a pulse travelling
 * between them. Horizontal from tablet width up, vertical on phones.
 */
export function FlowPipeline({ nodes }: FlowPipelineProps) {
  return (
    <InView>
      <ol className="flex flex-col gap-6 md:flex-row md:gap-3">
        {nodes.map((node, i) => {
          const last = i === nodes.length - 1;
          return (
            <li key={node.label} className="relative flex items-center gap-4 md:flex-1 md:flex-col md:text-center">
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute top-14 bottom-[-1.5rem] left-7 w-px bg-white/10 md:top-7 md:right-[calc(-50%+2.25rem)] md:bottom-auto md:left-[calc(50%+2.25rem)] md:h-px md:w-auto"
                >
                  <span style={at(i)} className="il-pulse-y absolute left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt shadow-[0_0_12px_rgb(255_212_0/0.8)] md:hidden" />
                  <span style={at(i)} className="il-pulse-x absolute top-1/2 hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt shadow-[0_0_12px_rgb(255_212_0/0.8)] md:block" />
                </span>
              )}
              <span
                style={at(i)}
                className="il-node relative grid size-14 shrink-0 place-items-center rounded-full border border-white/15 bg-carbon font-display text-lg font-semibold text-bone"
              >
                {node.tool ? <ToolLogo id={node.tool} size={24} /> : String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.9375rem] leading-snug text-bone/90 md:max-w-40">{node.label}</span>
            </li>
          );
        })}
      </ol>
    </InView>
  );
}
