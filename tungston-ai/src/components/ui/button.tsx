import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "@/components/fx/magnetic";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,box-shadow,border-color] duration-500 ease-out-expo";

const variants: Record<Variant, string> = {
  primary:
    "bg-filament text-white shadow-[0_0_0_1px_rgb(232_16_26/0.6),0_10px_40px_-10px_rgb(232_16_26/0.8)] hover:shadow-[0_0_0_1px_rgb(255_212_0/0.9),0_14px_60px_-8px_rgb(232_16_26/0.95),0_0_32px_-4px_rgb(255_212_0/0.45)]",
  ghost:
    "border border-white/15 text-bone hover:border-white/40 hover:bg-white/[0.04]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base sm:h-16 sm:px-8 sm:text-[1.0625rem]",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className" | "children"> & {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

function Inner({ children, icon, variant }: { children: ReactNode; icon?: ReactNode; variant: Variant }) {
  return (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent_20%,rgb(255_212_0/0.35)_50%,transparent_80%)] transition-transform duration-700 ease-out-expo group-hover/btn:translate-x-full"
        />
      )}
      <span data-magnetic-inner className="relative inline-flex items-center gap-2.5">
        {children}
        {icon}
      </span>
    </>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  magnetic = true,
  icon,
  children,
  className,
  ...props
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className ?? ""}`;
  const inner = (
    <Inner icon={icon} variant={variant}>
      {children}
    </Inner>
  );
  // In-page anchors stay plain links so the smooth scroller handles them.
  const link =
    typeof props.href === "string" && props.href.startsWith("#") ? (
      <a href={props.href} data-cursor={variant === "primary" ? "hot" : undefined} className={classes}>
        {inner}
      </a>
    ) : (
      <Link {...props} data-cursor={variant === "primary" ? "hot" : undefined} className={classes}>
        {inner}
      </Link>
    );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

type ButtonProps = Omit<ComponentProps<"button">, "className" | "children"> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Button({ variant = "primary", size = "md", icon, children, className, ...props }: ButtonProps) {
  return (
    <Magnetic>
      <button
        {...props}
        data-cursor={variant === "primary" ? "hot" : undefined}
        className={`${base} ${variants[variant]} ${sizes[size]} disabled:pointer-events-none disabled:opacity-60 ${className ?? ""}`}
      >
        <Inner icon={icon} variant={variant}>
          {children}
        </Inner>
      </button>
    </Magnetic>
  );
}
