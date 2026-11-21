"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, EXTERNAL_LINKS } from "@/content/site";
import { GitHubIcon, GmailIcon } from "@/components/layout/es-mark";
import { PortraitMark } from "@/components/layout/portrait-mark";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

/**
 * Sticky site header with accessible mobile navigation.
 * The mobile panel is a non-modal disclosure: it closes on Escape, on link
 * navigation, and on outside click, and returns focus to the toggle button.
 * It never traps keyboard users.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-200",
        scrolled || open
          ? "border-b border-line bg-surface/92 shadow-[0_1px_12px_rgba(5,2,10,0.18)] backdrop-blur-md"
          : "border-b border-transparent bg-page/80 backdrop-blur-sm",
      )}
    >
      <Container as="nav" className="flex h-[4.25rem] items-center justify-between gap-4" >
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5 rounded-lg font-extrabold tracking-[-0.01em] text-ink"
          aria-label="Etalyah Simpson, home"
        >
          <PortraitMark />
          <span className="hidden text-[0.9375rem] sm:block">
            Etalyah <span className="text-primary">Simpson</span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-2 text-[0.8375rem] font-semibold text-ink-muted transition-colors duration-150 hover:bg-primary-soft/70 hover:text-primary-strong"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <a
            href={EXTERNAL_LINKS.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore my GitHub profile (opens in new tab)"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-colors duration-150 hover:border-primary/40 hover:text-primary-strong"
          >
            <GitHubIcon className="h-[1.15rem] w-[1.15rem]" />
          </a>

          <a
            href={EXTERNAL_LINKS.gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email me in Gmail (opens in new tab)"
            className="hidden h-11 items-center gap-2 rounded-full bg-primary px-4.5 text-[0.8375rem] font-semibold text-on-primary transition-colors duration-150 hover:bg-primary-strong md:inline-flex"
          >
            <GmailIcon className="h-4 w-4" />
            Email me
          </a>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <>
                  <path d="M3.5 6h13" />
                  <path d="M3.5 10h13" />
                  <path d="M3.5 14h13" />
                </>
              )}
            </svg>
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={cn(
          "overflow-hidden border-line bg-surface transition-[max-height,opacity] duration-200 ease-out lg:hidden",
          open ? "max-h-[26rem] border-t opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="py-3">
          <ul className="grid gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-xl px-3.5 py-2.5 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-primary-soft/70 hover:text-primary-strong"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={EXTERNAL_LINKS.gmailCompose}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email me in Gmail (opens in new tab)"
                className="flex min-h-11 items-center gap-2 rounded-xl px-3.5 py-2.5 text-[0.9375rem] font-semibold text-primary-strong transition-colors hover:bg-primary-soft/70"
              >
                <GmailIcon className="h-4 w-4" />
                Email me
              </a>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
}
