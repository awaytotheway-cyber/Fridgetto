import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { DotGrid } from "@/components/fx/dot-grid";
import { MotionToggle } from "@/components/fx/motion-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { siteConfig } from "@/site.config";

const product = [
  { label: "Clinics", href: "/clinics" },
  { label: "Education", href: "/education" },
  { label: "Solutions", href: "/solutions" },
  { label: "Clinic Automation Audit", href: "/audit" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security & data", href: "/security" },
];

const company = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-void pt-20 sm:pt-28">
      <div className="ambient -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 opacity-60" />
      <div className="shell relative grid grid-cols-1 gap-14 md:grid-cols-12">
        <div className="min-w-0 md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm text-ash">
            AI automation for clinics. Bookings, follow-ups and admin, handled.
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="mt-8 inline-block max-w-full font-display text-lg font-medium [overflow-wrap:anywhere] min-[400px]:text-xl tracking-[-0.005em] text-bone underline decoration-filament/50 decoration-2 underline-offset-8 transition-colors hover:decoration-volt sm:text-2xl"
          >
            {siteConfig.contact.email}
          </a>
          <p className="mt-4 text-sm text-smoke">We reply {siteConfig.contact.responseTime}.</p>
        </div>

        <nav aria-label="Footer" className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-10 md:col-span-7">
          <div className="min-w-0 break-words">
            <p className="text-sm font-medium text-smoke">Product</p>
            <ul className="mt-4 space-y-2.5">
              {product.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ash transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 break-words">
            <p className="text-sm font-medium text-smoke">Company</p>
            <ul className="mt-4 space-y-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ash transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
              {siteConfig.contact.whatsapp && (
                <li>
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event="whatsapp_click"
                    className="text-ash transition-colors hover:text-bone"
                  >
                    WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
              <li>
                {/* "Log in" for visitors, the account menu once signed in. Moved here from the header. */}
                <UserMenu variant="footer" />
              </li>
            </ul>
          </div>
          <div className="min-w-0 break-words">
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
            <p className="mt-8 text-sm text-smoke">{siteConfig.contact.location}</p>
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
        <p>© {siteConfig.legalName}. All rights reserved.</p>
        <MotionToggle />
        {/* Legal lives here rather than in the nav: findable, never the headline. */}
        <nav aria-label="Legal" className="flex gap-5">
          <Link href="/privacy" className="transition-colors hover:text-bone">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-bone">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
