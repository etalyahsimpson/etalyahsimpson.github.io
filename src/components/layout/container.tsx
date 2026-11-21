import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page-width container: 1180px max, responsive gutters. */
export function Container({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "header" | "footer" | "section" | "main" | "nav";
}) {
  return (
    <As className={cn("mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </As>
  );
}
