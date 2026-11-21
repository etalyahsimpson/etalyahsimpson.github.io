"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Copies the canonical HTTPS URL of the current project route to the
 * clipboard, with a polite live-region confirmation and a graceful manual
 * fallback when the Clipboard API is unavailable or denied.
 */
export function CopyLinkButton({ url, label }: { url: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        setState("copied");
        timerRef.current = setTimeout(() => setState("idle"), 2400);
        return;
      }
      throw new Error("clipboard unavailable");
    } catch {
      setState("manual");
      timerRef.current = setTimeout(() => setState("idle"), 6000);
    }
  };

  return (
    <span className="inline-flex flex-wrap items-center gap-2.5">
      <button
        type="button"
        onClick={onCopy}
        aria-label={label}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors",
          state === "copied"
            ? "border-success/40 bg-success/8 text-success"
            : "border-line bg-surface text-ink-muted hover:border-primary/40 hover:text-primary-strong",
        )}
      >
        {state === "copied" ? (
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8.5l3.5 3.5L13 5" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5.5" y="5.5" width="8" height="8" rx="2" />
            <path d="M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1" />
          </svg>
        )}
        {state === "copied" ? "Link copied" : "Copy project link"}
      </button>
      <span aria-live="polite" className="text-sm">
        {state === "copied" ? (
          <span className="font-semibold text-success">
            Case-study URL copied to your clipboard.
          </span>
        ) : null}
        {state === "manual" ? (
          <span className="text-ink-muted">
            Automatic copy is unavailable in this browser. Copy it manually:{" "}
            <code className="rounded-md bg-surface-muted px-2 py-0.5 font-mono text-[0.8125rem] text-primary-strong">
              {url}
            </code>
          </span>
        ) : null}
      </span>
    </span>
  );
}
