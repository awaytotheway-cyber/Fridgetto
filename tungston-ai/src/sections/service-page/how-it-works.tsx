import { FlowPipeline } from "@/components/illustrations/flow-pipeline";
import type { ServiceDetail } from "@/lib/services/types";
import { SectionHeading } from "./section-heading";

export function HowItWorks({ s }: { s: ServiceDetail }) {
  return (
    <section aria-labelledby="how-title" className="py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="how-title" index="03" eyebrow="How it works" title={`How ${s.title} works`}>
          {s.timeline}, from the first call. Here is what happens at each step.
        </SectionHeading>
        <div className="mt-12 rounded-card border border-white/[0.07] bg-[radial-gradient(80%_120%_at_50%_0%,rgb(232_16_26/0.08),transparent_70%)] p-6 sm:p-10">
          <p className="mb-8 text-sm font-semibold tracking-widest text-smoke uppercase">Once it&apos;s running</p>
          <FlowPipeline nodes={s.flow} />
        </div>
        <ol className="mt-12 divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {s.steps.map((step, i) => (
            <li key={step.title} className="grid gap-3 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6">
              <span className="font-display text-[clamp(2rem,1.6rem+1.4vw,3rem)] leading-none font-semibold text-filament tabular-nums sm:col-span-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-title font-semibold text-bone sm:col-span-4">{step.title}</h3>
              <p className="text-ash sm:col-span-4">{step.body}</p>
              <p className="text-sm font-medium text-volt sm:col-span-2 sm:text-right">{step.when}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
