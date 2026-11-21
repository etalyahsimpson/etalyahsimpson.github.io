import { cn } from "@/lib/utils";

/**
 * Original "ES" typographic mark with a discreet circuit-connection motif:
 * a rounded purple tile, the owner's initials, and two circuit nodes that
 * suggest evaluation checkpoints. Used in the header, footer, and print
 * surfaces. The favicon variant lives in src/app/icon.svg.
 */
export function EsMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      role="img"
      aria-label="Etalyah Simpson monogram"
      className={cn("h-9 w-9", className)}
    >
      <rect x="1" y="1" width="42" height="42" rx="11" fill="var(--primary)" />
      <rect
        x="1"
        y="1"
        width="42"
        height="42"
        rx="11"
        fill="none"
        stroke="var(--on-primary)"
        strokeOpacity="0.16"
        strokeWidth="1.5"
      />
      <text
        x="21.4"
        y="22.4"
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--on-primary)"
        fontSize="15.5"
        fontWeight="800"
        letterSpacing="0.5"
        style={{ fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif" }}
      >
        ES
      </text>
      {/* circuit motif: a linked checkpoint, fully inside the tile */}
      <path
        d="M14 33.5h5a3 3 0 0 1 3 3"
        fill="none"
        stroke="var(--on-primary)"
        strokeOpacity="0.55"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="14" cy="33.5" r="1.5" fill="var(--on-primary)" fillOpacity="0.9" />
      <circle cx="22" cy="37.6" r="1.4" fill="none" stroke="var(--on-primary)" strokeOpacity="0.55" strokeWidth="1.2" />
    </svg>
  );
}

/** GitHub mark (standard octocat silhouette path). */
export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" className={cn("h-[1.05em] w-[1.05em]", className)}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
