import { ToolChip } from "@/components/tool-logo";
import { ToolConnect } from "@/components/illustrations/tool-connect";
import type { ServiceDetail } from "@/lib/services/types";
import { SectionHeading } from "./section-heading";

export function Tools({ s }: { s: ServiceDetail }) {
  return (
    <section aria-labelledby="tools-title" className="py-20 sm:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading id="tools-title" index="07" eyebrow="Integrations" title="Works with the tools you already use" />
          <p className="mt-6 max-w-lg text-lede text-ash">
            No new software for your team to learn. We connect {s.title} to the apps you run on today, and to others
            on request.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {s.tools.map((t) => (
              <li key={t}>
                <ToolChip id={t} />
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <ToolConnect tools={s.tools} center={s.title} />
        </div>
      </div>
    </section>
  );
}
