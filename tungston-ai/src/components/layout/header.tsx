"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { getLenis } from "@/components/fx/smooth-scroll";
import { siteConfig } from "@/site.config";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-white/[0.06] bg-void/70 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      />
      <div className="shell relative flex h-18 items-center justify-between gap-6 sm:h-20">
        <Link href="/" aria-label={`${siteConfig.name} home`} className="relative z-10 rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="group/nav relative rounded-full px-4 py-2 text-[0.9375rem] text-ash transition-colors duration-300 hover:text-bone aria-[current=page]:text-bone"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 scale-0 rounded-full bg-filament transition-transform duration-300 group-hover/nav:scale-100 group-aria-[current=page]/nav:scale-100 group-aria-[current=page]/nav:bg-volt"
                />
              </Link>
            );
          })}
        </nav>

        {/* Below ~900px the nav links need the room; the audit is one click away via Contact */}
        <div className="hidden min-[56rem]:block">
          <ButtonLink href={siteConfig.contact.bookingUrl} className="whitespace-nowrap">
            Book a free AI audit
          </ButtonLink>
        </div>

        <button
          type="button"
          className="relative z-10 -mr-2 flex size-11 items-center justify-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 h-0.5 w-6 rounded-full bg-bone transition-transform duration-500 ease-out-expo ${open ? "top-1.25 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-0.5 rounded-full bg-filament transition-all duration-500 ease-out-expo ${open ? "top-1.25 w-6 -rotate-45 bg-bone" : "top-2.5 w-4"}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 top-18 z-0 overflow-y-auto bg-void sm:top-20 md:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col gap-1 pt-8 pb-12">
          {siteConfig.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="flex items-baseline justify-between border-b border-white/[0.07] py-5 font-display text-4xl font-medium tracking-[-0.01em] text-bone aria-[current=page]:text-filament"
              style={{ animation: open ? `menu-in 0.6s ${0.05 * i}s var(--ease-out-expo) both` : undefined }}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-10">
            <ButtonLink href={siteConfig.contact.bookingUrl} size="lg" magnetic={false} className="w-full">
              Book a free AI audit
            </ButtonLink>
          </div>
          <p className="mt-8 text-ash">
            <a href={`mailto:${siteConfig.contact.email}`} className="text-bone underline decoration-filament/60 underline-offset-4">
              {siteConfig.contact.email}
            </a>
          </p>
        </nav>
      </div>
    </header>
  );
}
