import { marqueeItems } from "@/lib/content";

function Run({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {marqueeItems.map((item, i) => (
        <li key={item} className="flex items-center">
          <span
            className={`px-6 font-display text-[clamp(2.25rem,1.6rem+3vw,4.75rem)] leading-none font-semibold tracking-[-0.015em] whitespace-nowrap uppercase sm:px-10 ${
              i % 2 ? "text-void [paint-order:stroke_fill] [-webkit-text-stroke:2.5px_rgb(243_241_238/0.55)]" : "text-bone"
            }`}
          >
            {item}
          </span>
          <span
            aria-hidden="true"
            className="size-3 shrink-0 rounded-full bg-filament shadow-[0_0_18px_3px_rgb(232_16_26/0.55)] sm:size-4"
          />
        </li>
      ))}
    </ul>
  );
}

/** The service list as one endless strip. Pauses on hover; static under reduced motion. */
export function Marquee() {
  return (
    <section aria-label="What we build" className="relative border-y border-white/[0.07] bg-void py-7 sm:py-9">
      <div className="group/marquee flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none">
          <Run />
          <Run hidden />
        </div>
      </div>
    </section>
  );
}
