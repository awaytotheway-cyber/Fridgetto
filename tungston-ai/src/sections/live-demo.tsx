import { ChatDemo } from "@/components/chat-demo";
import { DemoCallCard } from "@/components/demo-call-card";
import { RevealText } from "@/components/fx/reveal-text";
import { currentDemoMode } from "@/lib/demo-assets";
import { demo } from "@/content/home";

/** Try the front desk (COPY.md §2.4): the demo call or recording when there is one, and the demo clinic's chat. */
export function LiveDemo({ id = "demo" }: { id?: string }) {
  const mode = currentDemoMode().kind;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="ambient top-1/4 right-[-10%] h-[36rem] w-[44rem] opacity-60" />
      <div className="shell relative grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <RevealText id={`${id}-title`} className="font-display text-display font-semibold text-bone">
            {demo.title}
          </RevealText>
          <p className="mt-6 max-w-md text-lede text-ash">{demo.lead[mode]}</p>
          <div className="mt-8">
            <DemoCallCard />
          </div>
          <ul className="mt-10 space-y-4 border-t border-white/[0.08] pt-8">
            {demo.facts.map((fact) => (
              <li key={fact} className="flex gap-4 text-bone/90">
                <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 rounded-full bg-filament/35" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}
