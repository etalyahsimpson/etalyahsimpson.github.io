# Content Provenance

## Sources of truth

1. **Professional facts** (roles, titles, dates, education, certifications, skills,
   email, location) are authored from the owner's current private CV. The CV file
   itself is a private input: it is never committed to this repository, published
   to GitHub Pages, embedded, or offered for viewing or download in any format.
2. **Project facts** (problem, solution, architecture, features, metrics,
   technology lists) are taken from each project's committed case study, README,
   and CI evidence in its public repository, all inspected directly before
   publishing:
   - PolicyGuard AI: https://github.com/etalyahsimpson/policyguard-ai
   - VendorLens AI: https://github.com/etalyahsimpson/vendorlens-ai
   - BECBarrier: https://github.com/etalyahsimpson/becbarrier
3. **Photographs** are the two owner-authorized portraits described in
   `docs/DESIGN_SYSTEM.md`, plus one square avatar derived from the approved
   official portrait (crop and resize only, no retouching) that serves as the
   header/footer identity mark and the source of the favicon set. No other
   photos of people exist on the site.

## Verification of project claims

Every technology badge shown on this site was checked against the implementation
(manifests, source modules, CI workflows) in the linked repository. Metrics are
reproduced from each repository's own documented, CI-verified test runs:

- PolicyGuard AI: 163/163 Jest cases, 13/13 Playwright e2e, 51/51 Promptfoo
  assertions over a 32-scenario, 51-response corpus with 11 deterministic checks.
- VendorLens AI: held-out F1 0.964 (vs 0.855 deterministic baseline) on the
  included synthetic benchmark; 82 backend tests; 9 Playwright flows.
- BECBarrier: T01-T18 acceptance matrix across pytest/Jest/Playwright; 26 workflow
  scenarios; 32 email fixtures; 40+ concurrency attempts.

Honesty constraints enforced in copy: all three projects run locally from their
repositories with no public deployment, no commercial users, and no customer data.
VendorLens metrics are explicitly labeled as synthetic-benchmark results. BECBarrier
explicitly does not initiate bank transfers or guarantee fraud prevention.

## Privacy contract

- Gmail (pre-addressed compose view, `https://mail.google.com/mail/?view=cm&fs=1&to=...`)
  is the single direct personal contact channel on the site; a standards-based
  `mailto:` fallback labelled "Email in another app" is kept for users unable to
  use Gmail. The raw address is never rendered as visible text.
- The owner-confirmed CURRENT LinkedIn profile
  (`https://www.linkedin.com/in/etaly-queen/`) is the only LinkedIn destination;
  the previous LinkedIn account is never linked, named, or shown, and an
  owner-approved transition notice appears in the contact areas.
- No telephone number, `tel:`/`sms:` link, WhatsApp integration, chat widget,
  messenger link, contact form, or third-party form exists anywhere in this
  repository. Automated checks (`scripts/verify-content.mjs`,
  `scripts/verify-export.mjs`, `tests/privacy.spec.ts`) enforce this on source,
  export, and rendered pages.
- The PhD is presented as ongoing study, never as a completed degree.
- Role titles match the CV exactly (no seniority inflation).

## Status labels

- The three featured projects are marked **Published**: public repositories with
  complete implementations and CI.
- The three roadmap initiatives are marked **Planned**: concept work with no
  repository links, no fake deadlines, and no shipped claims. The approximately
  18-week planning horizon is labeled as an owner-provided prospective estimate.
