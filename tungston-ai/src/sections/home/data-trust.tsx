import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { dataTrust } from "@/content/home";

/** Four short trust points and a link to /security (COPY.md §2.9). */
export function DataTrust() {
  return (
    <section aria-labelledby="trust-title" className="relative py-24 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <h2 id="trust-title" className="font-display text-display font-semibold text-bone lg:col-span-5">
          {dataTrust.title}
        </h2>
        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="space-y-6">
            {dataTrust.points.map((point) => (
              <li key={point} className="flex gap-4 text-bone/90">
                <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-volt" strokeWidth={1.75} />
                {point}
              </li>
            ))}
          </ul>
          <Link
            href={dataTrust.link.href}
            className="mt-10 inline-flex items-center gap-2 font-medium text-bone underline decoration-filament/60 underline-offset-4 transition-colors hover:decoration-volt"
          >
            {dataTrust.link.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
