import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CurrencySwitch } from "@/components/currency/currency-switch";
import { LivePanel } from "@/components/illustrations/live-panel";
import { ButtonLink } from "@/components/ui/button";
import type { ServiceDetail } from "@/lib/services/types";

export function ServiceHero({ s }: { s: ServiceDetail }) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div aria-hidden="true" className="ambient -top-40 right-[-10%] -z-10 h-[38rem] w-[52rem] opacity-80" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(rgb(232_16_26/0.3)_1px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(70%_60%_at_75%_25%,#000,transparent)]"
      />
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-smoke">
              <li>
                <Link href="/" className="transition-colors hover:text-bone">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="transition-colors hover:text-bone">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ash">
                {s.title}
              </li>
            </ol>
          </nav>
          <p className="mt-8 font-mono text-xs tracking-[0.2em] text-signal uppercase">{`// ${s.hero.eyebrow}`}</p>
          <h1
            id="page-title"
            className="page-intro mt-4 font-display text-[clamp(2.5rem,1.4rem+4.2vw,5rem)] leading-[0.95] font-semibold tracking-[-0.02em] text-bone"
          >
            {s.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lede text-ash">{s.hero.lede}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink
              href={`/contact?service=${s.formValue}`}
              size="lg"
              icon={<ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={2.25} />}
            >
              Book a free AI audit
            </ButtonLink>
            <ButtonLink href="#savings" variant="ghost" size="lg">
              See what you&apos;d save
            </ButtonLink>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-smoke">
            <span>Show savings in</span>
            <CurrencySwitch />
          </div>
        </div>
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={s.card.image}
              alt={s.card.imageAlt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover [mask-image:radial-gradient(closest-side,#000_68%,transparent)]"
            />
          </div>
          <LivePanel
            variant={s.hero.live.variant}
            title={s.hero.live.title}
            tool={s.hero.live.tool}
            items={s.hero.live.items}
            className="relative -mt-24 ml-auto w-[94%] sm:-mt-32 sm:w-[78%]"
          />
        </div>
      </div>
    </section>
  );
}
