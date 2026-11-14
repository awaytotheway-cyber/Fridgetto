import { siteConfig } from "@/site.config";

/** The booking calendar, shown only once NEXT_PUBLIC_CALENDAR_URL is set (Cal.com or Calendly). */
export function CalendarEmbed() {
  const url = siteConfig.contact.calendarUrl;
  if (!url) return null;
  return (
    <section aria-labelledby="calendar-title" className="mt-14">
      <h2 id="calendar-title" className="font-display text-title font-semibold text-bone">
        Or pick a time now
      </h2>
      <iframe
        src={url}
        title="Pick a time for your free call"
        loading="lazy"
        className="mt-6 h-[42rem] w-full rounded-panel border border-white/[0.09] bg-carbon"
      />
    </section>
  );
}
