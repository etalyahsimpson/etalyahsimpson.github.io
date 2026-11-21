import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "soft" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-strong shadow-[0_1px_2px_rgba(5,2,10,0.2)] hover:shadow-[0_4px_14px_var(--glow-strong)]",
  outline:
    "border border-line bg-surface text-ink hover:border-primary/45 hover:text-primary-strong hover:shadow-card",
  soft: "bg-primary-soft text-primary-strong hover:bg-primary-soft/70 border border-primary/15",
  ghost: "text-primary-strong hover:bg-primary-soft/60",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-[0.8125rem] px-3.5 py-2 gap-1.5",
  md: "text-sm px-5 py-2.5 gap-2",
  lg: "text-[0.9375rem] px-6 py-3 gap-2",
};

const baseClasses =
  "inline-flex items-center justify-center font-semibold rounded-full transition-[background-color,border-color,box-shadow,color,transform] duration-200 hover:-translate-y-px active:translate-y-0 whitespace-nowrap";

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  external?: boolean;
  ariaLabel?: string;
}

interface ButtonAsButtonProps extends ButtonBaseProps {
  type?: "button" | "submit";
  onClick?: () => void;
  ariaLabel?: string;
  ariaLive?: "polite" | "assertive" | "off";
}

function Inner({ iconLeading, children, iconTrailing }: ButtonBaseProps) {
  return (
    <>
      {iconLeading}
      {children}
      {iconTrailing}
    </>
  );
}

export function Button(props: ButtonAsLinkProps | ButtonAsButtonProps) {
  const { variant = "primary", size = "md", className, ariaLabel } = props;
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if ("href" in props) {
    const { href, external } = props;
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          {...(external || href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <Inner {...props} />
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        <Inner {...props} />
      </Link>
    );
  }

  const { type = "button" } = props as ButtonAsButtonProps;
  return (
    <button
      type={type}
      className={classes}
      aria-label={ariaLabel}
      aria-live={(props as ButtonAsButtonProps).ariaLive}
      onClick={(props as ButtonAsButtonProps).onClick}
    >
      <Inner {...props} />
    </button>
  );
}
