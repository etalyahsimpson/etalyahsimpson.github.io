"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

export const THEME_STORAGE_KEY = "etalyah-theme";

/**
 * Accessible color-theme toggle for the header.
 *
 * The ACTIVE theme lives on <html data-theme="...">, set to "dark" by the
 * server-rendered document and adjusted before first paint by the bootstrap
 * script in layout.tsx when the visitor has a stored preference. This
 * component reads that external state with useSyncExternalStore (no theme
 * state is duplicated inside React, so there is nothing to hydrate wrong)
 * and mutates the attribute plus localStorage on toggle.
 */

const themeListeners = new Set<() => void>();

function subscribeToTheme(callback: () => void) {
  themeListeners.add(callback);
  return () => {
    themeListeners.delete(callback);
  };
}

function getThemeSnapshot(): "dark" | "light" {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): "dark" | "light" {
  return "dark";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  const toggle = () => {
    const next: "dark" | "light" = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode): the choice still applies
         for this visit via the data-theme attribute */
    }
    for (const listener of themeListeners) listener();
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink-muted",
        "transition-[border-color,color,box-shadow] duration-200 hover:border-primary/45 hover:text-primary-strong",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        className,
      )}
    >
      {isDark ? (
        /* sun: the mode you would switch to */
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-[1.15rem] w-[1.15rem]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7" />
        </svg>
      ) : (
        /* moon: the mode you would switch to */
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-[1.15rem] w-[1.15rem]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.6 14.2A8.6 8.6 0 0 1 9.8 3.4a8.6 8.6 0 1 0 10.8 10.8Z" />
        </svg>
      )}
    </button>
  );
}
