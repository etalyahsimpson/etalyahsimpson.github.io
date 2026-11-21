import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";

/** Breadcrumb trail for inner pages. */
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] font-semibold text-ink-muted">
        <li>
          <Link href="/" className="transition-colors hover:text-primary-strong">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="text-line">
              /
            </span>
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-primary-strong">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-primary-strong">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}

/** Inner-page header band: breadcrumb, eyebrow, title, lede. */
export function PageHero({ eyebrow, title, description, breadcrumbs, children }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-section">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-soft [mask-image:radial-gradient(closest-side,black,transparent)]"
      />
      <Container className="relative py-10 sm:py-14">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <p className="eyebrow mt-4">{eyebrow}</p>
        <h1 className="mt-2.5 max-w-3xl text-balance text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.75] text-ink-muted">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </div>
  );
}
