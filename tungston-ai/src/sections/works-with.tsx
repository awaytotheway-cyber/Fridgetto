import type { CSSProperties } from "react";
import { ToolLogo } from "@/components/ui/tool-logo";
import { worksWith } from "@/lib/content";
import { getTool } from "@/lib/tools";

/**
 * A quiet strip of the tools we connect to. Static markup: logos sit muted and take the
 * brand's own colour on hover (the same treatment as the service pages).
 */
export function WorksWith() {
  return (
    <section aria-labelledby="works-with-title" className="py-16 sm:py-20">
      <div className="shell grid gap-8 border-y border-white/[0.08] py-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <p className="font-mono text-xs tracking-[0.2em] text-smoke uppercase">Works with</p>
          <h2 id="works-with-title" className="mt-4 font-display text-title font-semibold text-bone">
            The tools you already use
          </h2>
        </div>

        <div className="lg:col-span-9">
          <ul className="flex flex-wrap gap-x-8 gap-y-5">
            {worksWith.map((id) => {
              const tool = getTool(id);
              return (
                <li
                  key={id}
                  style={tool.icon ? ({ "--brand": tool.icon.hover } as CSSProperties) : undefined}
                  className="group/tool text-[0.9375rem] text-ash transition-colors duration-300 hover:text-bone"
                >
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
                    {tool.icon && (
                      <ToolLogo
                        path={tool.icon.path}
                        className="size-6 shrink-0 transition-colors duration-300 group-hover/tool:text-[color:var(--brand)]"
                      />
                    )}
                    {tool.name}
                    <span className="sr-only"> (opens the official site in a new tab)</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 max-w-xl text-xs leading-relaxed text-smoke">
            Logos are trademarks of their owners and are shown only to indicate which tools we integrate with. Protomation
            is not affiliated with, or endorsed by, any of them.
          </p>
        </div>
      </div>
    </section>
  );
}
