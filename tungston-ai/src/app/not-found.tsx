import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-end pt-40 pb-24">
      <p className="font-display text-[clamp(6rem,4rem+10vw,14rem)] leading-none font-semibold tracking-[-0.06em] text-filament">
        404
      </p>
      <h1 className="mt-6 font-display text-title font-semibold text-bone">This page isn&apos;t here.</h1>
      <p className="mt-3 max-w-md text-ash">The link may be old or mistyped. The home page has everything we build.</p>
      <div className="mt-10">
        <ButtonLink href="/">Go to the home page</ButtonLink>
      </div>
    </section>
  );
}
