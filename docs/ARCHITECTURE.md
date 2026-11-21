# Architecture

## Static-export Next.js application

The site is a single Next.js 16 App Router application compiled to a fully static
bundle (`output: 'export'`, `trailingSlash: true`, `images.unoptimized`). There is no
server runtime: no API routes, no middleware, no dynamic rendering. Every route in
`docs/ROUTE_MAP.md` is generated at build time as `out/<route>/index.html`, which is
what GitHub Pages serves.

## Content-driven architecture

All page content flows from one typed content registry under `src/content/`:

| Module | Purpose |
| --- | --- |
| `site.ts` | Canonical origin, navigation, route list, approved contact links (Gmail compose, current LinkedIn) and the LinkedIn transition notice |
| `profile.ts` | Identity, hero copy, About narrative (Gmail compose is the direct contact; current LinkedIn profile is the approved professional link) |
| `profile-media.ts` | The two approved portrait assets and their roles |
| `experience.ts` | Roles with exact titles, dates, arrangements, scope |
| `skills.ts` | Skill groups by engineering purpose |
| `projects.ts` | The single canonical project registry (cards, routes, metadata, evidence) |
| `roadmap.ts` | Planned long-form initiatives |
| `education.ts`, `certifications.ts` | Credentials |

`src/app/projects/[slug]/page.tsx` uses `generateStaticParams()` from `projects.ts`
and `generateMetadata()` from the same record, with `dynamicParams = false`, so
project pages, canonical URLs, Open Graph images, Copy Project Link targets, and the
release URL audit can never drift apart.

## Rendering

- Server components everywhere except the mobile navigation toggle and the Copy
  Project Link control, both of which are small client components.
- `next/font/local` bundles the Manrope variable font; no third-party font requests.
- Images use `next/image` with `unoptimized` (GitHub Pages cannot run the image
  optimizer). Portraits ship as WebP with explicit dimensions, aspect ratios, and
  `object-position` values documented in the design system.

## Deployment pipeline

`scripts/build-static.sh` resolves the repository owner and name from
`REPO_OWNER`/`REPO_NAME` (falling back to `GITHUB_REPOSITORY`), classifies the
repository as a user site (`<owner>.github.io`), enforces the empty base path for
user sites, runs `next build`, and guarantees `out/.nojekyll`. The GitHub Actions
workflow (`.github/workflows/deploy-pages.yml`) runs lint, typecheck, content and
privacy verification, secret scan, the static build, export verification, and the
Playwright suite before uploading `out/` as the Pages artifact.
