import Image from "next/image";
import { TiltCard } from "@/components/fx/tilt-card";
import { SectionIntro } from "@/components/ui/section-intro";
import { services, type Service } from "@/lib/content";
import { ServiceArt } from "./service-art";

const footprint: Record<Service["size"], string> = {
  hero: "md:col-span-2 lg:row-span-2",
  wide: "md:col-span-2",
  single: "",
};

const artHeight: Record<Service["size"], string> = {
  hero: "h-56 sm:h-72 lg:h-auto lg:flex-1 lg:min-h-64",
  wide: "h-36 sm:h-40 lg:h-auto lg:min-h-40 lg:flex-1",
  single: "h-36 sm:h-40",
};

const artSizes: Record<Service["size"], string> = {
  hero: "(min-width: 1024px) 50vw, 100vw",
  wide: "(min-width: 1024px) 50vw, 100vw",
  single: "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw",
};

function ServiceCard({ service }: { service: Service }) {
  const flagship = service.size === "hero";
  return (
    <TiltCard className={footprint[service.size]} max={flagship ? 3 : 5}>
      <article
        id={service.slug}
        tabIndex={-1}
        className="service-card group/card relative flex h-full flex-col overflow-hidden rounded-card border border-white/[0.07] bg-[linear-gradient(180deg,rgb(255_255_255/0.035),rgb(255_255_255/0.01))] p-6 transition-[border-color,box-shadow] duration-500 hover:border-transparent hover:shadow-[var(--shadow-glow-soft)] sm:p-8"
      >
        {/* Heat under the pointer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[var(--heat,0)] transition-opacity duration-500 [background:radial-gradient(28rem_circle_at_var(--mx,50%)_var(--my,50%),rgb(232_16_26/0.14),transparent_60%)]"
        />
        {/* Glowing border that follows the pointer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-card p-px opacity-[var(--heat,0)] transition-opacity duration-500 [background:radial-gradient(22rem_circle_at_var(--mx,50%)_var(--my,50%),rgb(232_16_26/0.95),rgb(232_16_26/0.25)_45%,transparent_70%)] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
        />
        {/* Yellow sweep along the top edge */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px overflow-hidden">
          <div className="h-full w-1/2 -translate-x-full bg-[linear-gradient(90deg,transparent,var(--color-volt),transparent)] transition-transform duration-1000 ease-out-expo group-hover/card:translate-x-[200%]" />
        </div>

        <div className={`relative -mx-2 ${artHeight[service.size]}`}>
          {service.image ? (
            // Renders sit on pure black; the elliptical mask melts their edges into the card
            <Image
              src={service.image}
              alt=""
              fill
              sizes={artSizes[service.size]}
              className="object-cover brightness-90 transition-[scale,filter] duration-700 ease-out-expo [mask-image:radial-gradient(closest-side,#000_62%,transparent)] group-hover/card:scale-[1.04] group-hover/card:brightness-110 motion-reduce:transition-none"
            />
          ) : (
            <ServiceArt kind={service.art} live={service.art === "voice"} />
          )}
        </div>

        <div className={`relative mt-6 ${flagship ? "lg:mt-8" : ""}`}>
          <h3
            className={`font-display font-semibold text-bone ${flagship ? "text-[clamp(2rem,1.4rem+2vw,3.25rem)] leading-[0.95] tracking-[-0.015em]" : "text-title"}`}
          >
            {service.title}
          </h3>
          <p className={`mt-3 text-bone/85 ${flagship ? "max-w-md text-lede" : ""}`}>{service.hook}</p>
          <ul className={`mt-5 space-y-2 text-[0.9375rem] text-ash ${flagship ? "sm:columns-1" : ""}`}>
            {service.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-filament transition-colors duration-300 group-hover/card:bg-volt" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </TiltCard>
  );
}

export function Services({ withIntro = true }: { withIntro?: boolean }) {
  return (
    <section id="services" aria-labelledby="services-title" className="relative -scroll-mt-20 py-24 sm:py-32">
      <div className="shell">
        {withIntro ? (
          <SectionIntro id="services-title" title="Seven systems. One team that ships them all.">
            Start with one or connect them all. Each is built around a number you care about, then tested on your data
            and handed over running.
          </SectionIntro>
        ) : (
          <h2 id="services-title" className="sr-only">
            Services
          </h2>
        )}
        <div className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
