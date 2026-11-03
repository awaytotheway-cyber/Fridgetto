import type { CSSProperties } from "react";
import { ToolLogo } from "@/components/ui/tool-logo";
import { getTool, type ToolGroup, type ToolId } from "@/lib/tools";

/**
 * One tool: its logo where a licensed one exists, then its name. A tool with no logo is
 * shown by name alone, in the same chip, so the grid reads as one set.
 */
function ToolChip({ id }: { id: ToolId }) {
  const tool = getTool(id);
  return (
    <li
      // The logo is quiet until hovered, then takes the brand's own colour
      style={tool.icon ? ({ "--brand": tool.icon.hover } as CSSProperties) : undefined}
      className={`group/tool flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.02] py-2 pr-4 text-[0.9375rem] text-bone/90 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.04] ${
        tool.icon ? "pl-3.5" : "pl-4"
      }`}
    >
      {tool.icon && (
        <ToolLogo
          path={tool.icon.path}
          className="size-5 shrink-0 text-ash transition-colors duration-300 group-hover/tool:text-[color:var(--brand)]"
        />
      )}
      {tool.name}
    </li>
  );
}

/**
 * The tools a service is built with, grouped, beside what the customer needs to have in
 * place. Both come from service-details.ts; the tools themselves from tools.json.
 */
export function ServiceTools({ groups, needs }: { groups: ToolGroup[]; needs: string[] }) {
  return (
    <section aria-labelledby="tools-title" className="py-16 sm:py-24">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <h2 id="tools-title" className="font-display text-display font-semibold text-bone">
            Tools we build with
          </h2>
          <p className="mt-5 max-w-xl text-lede text-ash">
            Your team already runs on tools like these. We build on top of them, so nobody has to change how they work.
          </p>

          <div className="mt-10 space-y-8">
            {groups.map((group) => (
              <div key={group.label}>
                <h3 className="font-mono text-xs tracking-[0.2em] text-smoke uppercase">{group.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {group.tools.map((id) => (
                    <ToolChip key={id} id={id} />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-xl text-xs leading-relaxed text-smoke">
            Logos are trademarks of their owners and are shown only to indicate which tools we integrate with. Protomation
            is not affiliated with, or endorsed by, any of them.
          </p>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-card border border-white/[0.07] bg-[linear-gradient(180deg,rgb(255_255_255/0.035),rgb(255_255_255/0.01))] p-6 sm:p-8">
            <h2 className="font-display text-title font-semibold text-bone">What we need from you</h2>
            <p className="mt-3 text-sm text-ash">So the build starts without waiting on access.</p>
            <ul className="mt-6 space-y-4 text-[0.9375rem] text-ash">
              {needs.map((need) => (
                <li key={need} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-filament" />
                  {need}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
