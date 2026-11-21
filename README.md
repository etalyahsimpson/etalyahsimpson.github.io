# Etalyah Simpson · Engineering Portfolio

The public portfolio website of **Etalyah Simpson**, a full-stack and AI engineer in
Philadelphia, PA working across agentic coding, software engineering, and AI evaluation.

- **Production site:** <https://etalyahsimpson.github.io/>
- **GitHub profile:** <https://github.com/etalyahsimpson>
- **Contact:** `etalyahsimpson.tech@gmail.com` (email is the only direct contact channel on this site)

## What this repository contains

A static Next.js (App Router) portfolio with real deep-linkable routes for three featured
engineering projects, each linking to its public repository:

| Route | Content |
| --- | --- |
| `/` | Hero with the owner's approved portrait, About, expertise, projects, experience, roadmap, education, contact |
| `/about/` | Positioning and quick facts |
| `/skills/` | Skills grouped by engineering purpose |
| `/experience/` | Work experience with expandable role details |
| `/projects/` | Project overview and repository discovery |
| `/projects/policyguard-ai/` | PolicyGuard AI case study (AI response evaluation workbench) |
| `/projects/vendorlens-ai/` | VendorLens AI case study (supplier entity resolution) |
| `/projects/becbarrier/` | BECBarrier case study (BEC investigation and payment-change safeguarding) |
| `/roadmap/` | Planned long-form initiatives |
| `/education/` | Degrees and ongoing PhD status |
| `/certifications/` | Certifications with years |
| `/contact/` | Email-only contact |

The complete route map with verification steps lives in [`docs/ROUTE_MAP.md`](docs/ROUTE_MAP.md).

## Stack

- **Next.js 16 (App Router) with static export** served by GitHub Pages from the user-site root
- **React 19**, **TypeScript 5 (strict)**, **Tailwind CSS 4**
- **Manrope** variable font bundled locally (no runtime font requests)
- **Playwright** end-to-end tests against the exported static output
- **Node.js 22 LTS** with a committed `package-lock.json`

## Build and test

```bash
npm ci                 # install exactly from the lockfile
npm run lint           # ESLint (next/core-web-vitals + typescript)
npm run typecheck      # tsc --noEmit
npm run test           # content + privacy + punctuation verification of the source
npm run build:static   # resolve deployment target, next build (output: export), .nojekyll
npm run verify:export  # verify assets, links, metadata, privacy in out/
npm run test:e2e:static  # Playwright suite against out/ on a plain static server
npm run serve:static   # serve out/ at http://127.0.0.1:4173 for manual inspection
```

The static export is root-hosted: for this user-site repository, `NEXT_PUBLIC_BASE_PATH`
always resolves to the empty string (see `scripts/build-static.sh`).

## Deployment

A single GitHub Actions workflow, [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml),
builds, verifies, and deploys `out/` to GitHub Pages on every push to `main`. All quality
gates (lint, typecheck, content/privacy checks, export verification, Playwright E2E) must
pass before the artifact is published.

## Design system

Dark-first: every first visit renders a deep charcoal-plum palette (`#17131F`
canvas, layered dark surfaces, refined lavender-purple accents). A visible,
keyboard-accessible toggle switches to a deliberate intermediate-gray light mode
(`#C8C5D0` canvas, `#DAD7E1` cards; never white-dominant); the choice persists
across routes and reloads through a pre-paint bootstrap that prevents theme
flashes. Tokens, typography, and component behavior are documented in
[`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md).

## Content provenance and privacy

- Professional facts are authored from the owner's private CV; the CV itself is never
  published, committed, or offered to visitors in any form.
- Email is the only direct-contact method on the site. No phone numbers, messaging
  widgets, or contact forms exist anywhere in this repository.
- Exactly two owner-approved photographs are used (homepage hero and About); no other
  photos of people exist on the site.
- Project technology badges and metrics are verified against the linked public
  repositories before publishing. See [`docs/CONTENT_PROVENANCE.md`](docs/CONTENT_PROVENANCE.md).

## Repository layout

```text
src/app/            App Router pages (one folder per route), sitemap, robots, icons
src/components/     Header/footer, homepage sections, project cards, UI primitives
src/content/        Typed content registry (single source of truth for all pages)
src/lib/            URL helpers and metadata factory
src/fonts/          Bundled Manrope variable font (woff2)
public/             Portraits (approved), project screenshots, brand art, previews
scripts/            build-static.sh, serve-static.mjs, verify-content.mjs, verify-export.mjs
tests/              Playwright suites (routes, privacy, copy links, responsive, metadata)
docs/               Architecture, design system, provenance, route map, QA docs
```

© Etalyah Simpson. Portfolio site content is authored work; project facts cite their
public repositories.
