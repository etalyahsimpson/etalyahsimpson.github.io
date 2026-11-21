import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small pill tag for technologies and metadata. */
export function Chip({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "purple" | "success" | "muted";
  className?: string;
}) {
  const tones = {
    default: "bg-surface border-line text-ink-muted",
    purple: "bg-primary-soft border-primary/20 text-primary-strong",
    success: "bg-success/8 border-success/25 text-success",
    muted: "bg-surface-muted border-transparent text-ink-muted",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium tracking-[0.01em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Truthful project lifecycle status with a colored dot. */
export function StatusPill({
  label,
  tone,
}: {
  label: string;
  tone: "published" | "planned" | "progress";
}) {
  const tones = {
    published: { dot: "bg-success", ring: "border-success/30 bg-success/8 text-success" },
    planned: { dot: "bg-primary/70", ring: "border-primary/25 bg-primary-soft text-primary-strong" },
    progress: { dot: "bg-primary", ring: "border-primary/25 bg-primary-soft text-primary-strong" },
  } as const;
  const t = tones[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em]",
        t.ring,
      )}
    >
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", t.dot)} />
      {label}
    </span>
  );
}
