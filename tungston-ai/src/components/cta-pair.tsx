import { ButtonLink } from "@/components/ui/button";
import { currentDemoMode } from "@/lib/demo-assets";
import { siteConfig } from "@/site.config";

/**
 * The two buttons every page ends on (COPY.md §1). The secondary one calls the demo
 * front desk when a demo number is set, and otherwise explains how it works.
 *
 * Clicks are counted by the `data-event` attributes (see components/event-tracker.tsx).
 */
export function CtaPair({ note = true, className }: { note?: boolean; className?: string }) {
  const demo = currentDemoMode();
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={siteConfig.contact.bookingUrl} size="lg" data-event="cta_book_call">
          Book a free 20-min call
        </ButtonLink>
        {demo.kind === "call" ? (
          <a
            href={demo.tel}
            data-event="demo_call_click"
            className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 px-7 font-medium text-bone transition-colors hover:border-white/40 hover:bg-white/[0.04] sm:h-16 sm:px-8 sm:text-[1.0625rem]"
          >
            Call our demo front desk
          </a>
        ) : (
          <ButtonLink href="/how-it-works" variant="ghost" size="lg">
            See how it works
          </ButtonLink>
        )}
      </div>
      {note && (
        <p className="mt-4 text-sm text-smoke">
          Free, 20 minutes, no slides. We reply {siteConfig.contact.responseTimeShort}.
        </p>
      )}
    </div>
  );
}
