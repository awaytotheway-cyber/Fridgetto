import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { priceCards, pricingNotes } from "@/content/pricing";

/** The three things you can buy (COPY.md §7), and the notes on usage, USD and GST. */
export function PriceCards() {
  return (
    <section aria-label="Prices" className="pb-16 sm:pb-24">
      <div className="shell">
        <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
          {priceCards.map((card) => {
            const featured = Boolean(card.badge);
            return (
              <article
                key={card.id}
                className={`relative flex flex-col rounded-card p-7 sm:p-9 ${
                  featured ? "border border-filament/70 bg-filament/[0.05]" : "border border-white/[0.08] bg-white/[0.02]"
                }`}
              >
                {card.badge && (
                  <span className="absolute -top-3 left-7 rounded-full bg-filament px-3 py-1 text-xs font-semibold tracking-wide whitespace-nowrap text-white uppercase sm:left-9">
                    {card.badge}
                  </span>
                )}
                <h2 className="font-display text-title font-semibold text-bone">{card.name}</h2>
                <p className="mt-6 font-display text-[clamp(2rem,1.6rem+1.2vw,2.6rem)] leading-tight font-semibold text-bone">
                  {card.price}
                </p>
                <p className="mt-1 text-sm text-smoke">{card.cadence}</p>
                <ul className="mt-6 space-y-3 border-t border-white/[0.08] pt-6 text-[0.9375rem]">
                  {card.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-bone/90">
                      <Check aria-hidden="true" className="mt-0.5 size-4.5 shrink-0 text-filament" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
                {card.note && <p className="mt-6 text-sm text-ash">{card.note}</p>}
                <div className="mt-auto pt-10">
                  <ButtonLink
                    href={card.cta.href}
                    variant={featured ? "primary" : "ghost"}
                    magnetic={false}
                    className="w-full"
                    data-event="cta_book_call"
                  >
                    {card.cta.label}
                  </ButtonLink>
                </div>
              </article>
            );
          })}
        </div>
        <ul className="mt-10 max-w-3xl space-y-2 text-sm text-ash">
          {pricingNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
