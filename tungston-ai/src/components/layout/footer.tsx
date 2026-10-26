import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { DotGrid } from "@/components/fx/dot-grid";
import { services } from "@/lib/content";
import { siteConfig } from "@/site.config";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-void pt-20 sm:pt-28">
      <div className="ambient -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 opacity-60" />
      <div className="shell relative grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm text-ash">
            AI agents, voice agents, chatbots, automations and content systems, built for your business and shipped in
            weeks.
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="mt-8 inline-block font-display text-2xl font-medium tracking-[-0.005em] text-bone underline decoration-filament/50 decoration-2 underline-offset-8 transition-colors hover:decoration-volt sm:text-3xl"
          >
            {siteConfig.contact.email}
          </a>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
          <div>
            <p className="text-sm font-medium text-smoke">Studio</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/" className="text-ash transition-colors hover:text-bone">
                  Home
                </Link>
              </li>
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ash transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-smoke">Services</p>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="text-ash transition-colors hover:text-bone">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-smoke">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="text-ash transition-colors hover:text-bone">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-smoke">
              {siteConfig.contact.location}
              {siteConfig.contact.phone && (
                <>
                  <br />
                  <a href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-bone">
                    {siteConfig.contact.phone}
                  </a>
                </>
              )}
            </p>
          </div>
        </nav>
      </div>

      <div className="relative mt-16 h-[24vw] max-h-80 min-h-28 w-full sm:mt-24">
        <DotGrid
          className="absolute inset-0 h-full w-full"
          spacing={9}
          dotRadius={1.6}
          maskText={siteConfig.shortName.toUpperCase()}
          drips="never"
          idleDripAfter={0}
        />
      </div>

      <div className="shell relative flex flex-col gap-3 border-t border-white/[0.07] py-6 text-sm text-smoke sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {siteConfig.legalName}. All rights reserved.
        </p>
        <p>Built by {siteConfig.name}, with the same tools we use for clients.</p>
      </div>
    </footer>
  );
}
