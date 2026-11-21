# QA and Release

## Quality gates (all must pass before deployment)

1. `npm run lint` - ESLint with `next/core-web-vitals` and TypeScript rules.
2. `npm run typecheck` - `tsc --noEmit` with strict settings.
3. `npm run test` (`scripts/verify-content.mjs`) - source-level gates:
   - no em dash (U+2014, `&mdash;`, `&#8212;`, `&#x2014;`) in authored copy;
   - no phone-like strings, `tel:`/`sms:`, WhatsApp/messenger links, and no
     LinkedIn-in links except the owner-approved current profile
     (`linkedin.com/in/etaly-queen/`);
   - no CV/résumé artifacts (docx/pdf/pages) anywhere in the tree;
   - every referenced asset exists in `public/`;
   - every route has a matching `page.tsx`;
   - project slugs unique with brand/preview assets present;
   - only the two approved portraits under `public/images/`.
4. Secret scan in CI - committed files must not contain token patterns.
5. `npm run build:static` - user-site base-path resolution (empty for
   `etalyahsimpson.github.io`), Next.js static export, `.nojekyll`.
6. `npm run verify:export` (`scripts/verify-export.mjs`) - post-build gates:
   - every local URL in every generated HTML file resolves to a real file
     (traversal-protected, query/fragment-stripped, directory-index aware);
   - required routes, `404.html`, `sitemap.xml`, `.nojekyll`, non-empty previews,
     and both portraits exist;
   - no asset URL is prefixed with the repository name;
   - initial-HTML metadata (title, description, canonical, og:*, twitter:*)
     matches the expected per-route values; project routes use project-specific
     images;
   - no em dash, phone-like string, forbidden contact scheme, CV control, or
     carousel marker in any exported document;
   - machine-readable report at `scripts/verify-export-report.json`.
7. `npm run test:e2e:static` - Playwright against `out/` served by
   `scripts/serve-static.mjs` (plain static server, no SPA fallback):
   - every route returns 200 and renders its heading on a fresh context;
   - every image loads; no console errors anywhere;
   - project deep links open directly and survive refresh;
   - homepage navigation updates the address bar; Back/Forward works;
   - `Copy Project Link` copies the canonical HTTPS URL;
   - repository anchors point to the correct repos with safe rel/target;
   - privacy assertions on every route (no phone/tel/WhatsApp/CV, email-only);
   - no horizontal overflow at 320/360/390/768/1024/1280/1440 px;
   - both portraits visible across mobile and desktop widths;
   - mobile menu opens, closes on Escape, restores focus;
   - initial-HTML metadata verified without hydration.

## Release sequence

1. All local gates pass on the intended commit.
2. Push `main` (never force-push).
3. `.github/workflows/deploy-pages.yml` runs the full matrix and deploys `out/`.
4. The workflow run for the final HEAD SHA must conclude `success`.
5. Post-deployment live checks against `https://etalyahsimpson.github.io/`:
   every route fetched unauthenticated (HTTP 200), initial HTML metadata parsed,
   every preview and portrait image fetched with an image content type, external
   repository links reachable, responsive spot checks, privacy re-assertions.

## Manual verification notes

- LinkedIn Post Inspector is an external, login-gated service; when it cannot be
  accessed, live OG metadata is verified by fetching the public HTML and images
  directly, and the LinkedIn check is reported as NOT TESTED rather than assumed.
