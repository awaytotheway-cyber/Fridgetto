"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { getLenis } from "@/components/fx/smooth-scroll";
import { services } from "@/lib/content";
import { siteConfig } from "@/site.config";
import { UserMenu } from "@/components/auth/user-menu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * The panel sits directly under the header bar, so the pointer crosses no gap on
   * the way down — but it still leaves the trigger for an instant, and a diagonal
   * path to a far corner leaves it for longer. A short delay before closing covers
   * both without the menu feeling sticky.
   */
  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServices = (delay = 180) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), delay);
  };
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

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
    setServicesOpen(false);
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setServicesOpen(false);
    };
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

        <nav
          aria-label="Main"
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => closeServices()}
        >
          {siteConfig.nav.map((item) => {
            // Services opens the panel below on hover; the link itself still works
            const isServices = item.href === "/services";
            const active = isServices ? pathname.startsWith("/services") : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-expanded={isServices ? servicesOpen : undefined}
                aria-haspopup={isServices ? true : undefined}
                aria-controls={isServices ? "services-menu" : undefined}
                onMouseEnter={isServices ? openServices : () => closeServices(0)}
                onFocus={isServices ? openServices : () => closeServices(0)}
                className="group/nav relative rounded-full px-3 py-2 text-[0.9375rem] whitespace-nowrap lg:px-4 text-ash transition-colors duration-300 hover:text-bone aria-[current=page]:text-bone"
              >
                {item.label}
                {isServices && (
                  <span
                    aria-hidden="true"
                    className={`ml-1.5 inline-block text-[0.7em] transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 scale-0 rounded-full bg-filament transition-transform duration-300 group-hover/nav:scale-100 group-aria-[current=page]/nav:scale-100 group-aria-[current=page]/nav:bg-volt"
                />
              </Link>
            );
          })}
        </nav>

        {/* Below ~1024px the six nav links need the room; the audit is one click away via Contact */}
        <div className="hidden items-center gap-4 min-[64rem]:flex">
          <UserMenu />
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

      {/*
        Services mega-menu. It sits flush under the header bar, so the pointer never
        crosses a gap on its way down. `inert` when closed keeps the links out of the
        tab order and the accessibility tree while they are invisible.
      */}
      <div
        id="services-menu"
        inert={!servicesOpen}
        onMouseEnter={openServices}
        onMouseLeave={() => closeServices()}
        className={`absolute inset-x-0 top-full border-b border-white/[0.06] bg-void/95 backdrop-blur-xl transition-[opacity,transform] duration-300 ease-out-expo max-md:hidden ${
          servicesOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="shell grid gap-8 py-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="font-mono text-xs tracking-[0.2em] text-signal uppercase">What we build</p>
            <p className="mt-3 max-w-xs text-sm text-ash">
              Seven systems. Start with whichever one saves you the most hours.
            </p>
            <Link
              href="/services"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-signal"
            >
              View all services <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className="grid gap-1 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group/item block rounded-panel p-3 transition-colors hover:bg-white/[0.04]"
                >
                  <span className="block font-display text-[0.95rem] font-semibold text-bone transition-colors group-hover/item:text-signal">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-smoke">{service.hook}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
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
          {/* There is no hover on touch, so the individual services get their own list */}
          <p className="mt-8 font-mono text-xs tracking-[0.2em] text-signal uppercase">What we build</p>
          <ul className="mt-3 grid gap-px">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  aria-current={pathname === `/services/${service.slug}` ? "page" : undefined}
                  className="block py-2.5 text-ash transition-colors aria-[current=page]:text-filament hover:text-bone"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>

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
