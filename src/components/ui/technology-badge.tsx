import type { ReactNode } from "react";
import { TECH_ICONS, TECH_ICON_FALLBACK } from "@/components/ui/tech-icon-data";
import { cn } from "@/lib/utils";

/**
 * Technology glyph: a local inline SVG from the icon registry. Falls back to
 * a neutral code-bracket glyph for technologies without a registered mark.
 * Never loads remote assets.
 */
export function TechIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const spec = TECH_ICONS[name] ?? TECH_ICON_FALLBACK;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("h-[0.95em] w-[0.95em] shrink-0", className)}
      fill="currentColor"
      style={spec.color ? { color: spec.color } : undefined}
    >
      <path d={spec.d} />
    </svg>
  );
}

/**
 * Coherent technology badge used across skills views, featured project
 * cards, and project tech stacks. Decorative by default: a span, not a
 * false button. Pass `href` only for genuine link targets.
 *
 * Hover behavior (fine pointers, motion allowed): a restrained purple halo
 * brightens behind the pill, the border lifts, and the badge plays a single
 * 260ms nudge animation once. Keyboard focus gets the glow and focus ring
 * without the shake. Reduced-motion users get static color cues only.
 */
export function TechnologyBadge({
  name,
  href,
  className,
  children,
}: {
  name: string;
  href?: string;
  className?: string;
  children?: ReactNode;
}) {
  const content = (
    <>
      <TechIcon name={name} />
      <span>{children ?? name}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("technology-badge", className)}
      >
        {content}
      </a>
    );
  }

  return <span className={cn("technology-badge", className)}>{content}</span>;
}
