import Image from "next/image";
import mark from "@/assets/brand/logo-mark.png";
import { siteConfig } from "@/site.config";

/** The mark: a P that leaves a trail of circuit lines, set in a gear. */
export function LogoMark({ className, height = 36 }: { className?: string; height?: number }) {
  const width = Math.round((mark.width / mark.height) * height);
  return (
    <Image src={mark} alt="" width={width} height={height} loading="eager" className={className} />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-9 w-auto" />
      <span className="font-display text-[1.3rem] leading-none font-semibold tracking-[-0.01em] text-bone">
        {siteConfig.shortName}
        <span className="text-signal">{siteConfig.nameSuffix}</span>
      </span>
    </span>
  );
}
