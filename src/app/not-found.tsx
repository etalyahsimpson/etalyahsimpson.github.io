import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center sm:py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold tracking-[-0.025em] text-ink">
        This page does not exist
      </h1>
      <p className="mt-4 max-w-md text-[1.0325rem] leading-relaxed text-ink-muted">
        The address you followed is not part of this portfolio. Everything published here is one
        click away from the homepage or the projects overview.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-on-primary transition-colors hover:bg-primary-strong"
        >
          Back to homepage
        </Link>
        <Link
          href="/projects/"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-primary/40 hover:text-primary-strong"
        >
          Browse projects
        </Link>
      </div>
    </Container>
  );
}
