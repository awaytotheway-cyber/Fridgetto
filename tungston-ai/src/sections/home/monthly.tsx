import { SectionIntro } from "@/components/ui/section-intro";
import { monthly } from "@/content/home";
import { pricingTeaser } from "@/content/pricing";

/** What the Managed Front Desk plan includes every month (COPY.md §2.8). */
export function Monthly() {
  const plan = pricingTeaser[2];
  return (
    <section aria-labelledby="monthly-title" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionIntro id="monthly-title" title={monthly.title}>
          {monthly.lead} <span className="text-bone">{plan.price}.</span>
        </SectionIntro>
        <ul className="mt-14 grid gap-x-8 gap-y-10 border-t border-white/[0.08] pt-10 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {monthly.items.map((item) => (
            <li key={item.title}>
              <h3 className="font-display text-xl font-semibold text-bone">{item.title}</h3>
              <p className="mt-2 max-w-sm text-ash">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
