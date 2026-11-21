import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  align?: "left" | "center";
  className?: string;
  titleAs?: "h2" | "h1";
  children?: ReactNode;
}

/** Consistent editorial section header with eyebrow, title, and lede. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  className,
  titleAs: Title = "h2",
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <Title
        id={id}
        className="mt-2.5 text-balance text-[clamp(1.65rem,3.4vw,2.6rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink"
      >
        {title}
      </Title>
      {description ? (
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted">{description}</p>
      ) : null}
      {children}
    </div>
  );
}
