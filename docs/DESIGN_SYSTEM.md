# Design System

## Signature

Dark-first and mature: a deep charcoal-plum canvas with layered dark panels and
refined lavender-purple accents is the default for every first visit. A visible,
keyboard-accessible toggle switches to a deliberate intermediate-gray light mode
that is never white-dominant. Depth comes from fine borders, soft purple-tinted
shadows, and restrained illumination: never pure black, neon, glassmorphism, or
low-contrast text.

## Theme behavior

- The server-rendered default is `<html data-theme="dark">` on every route,
  regardless of OS color preference.
- A tiny inline pre-paint bootstrap in `src/app/layout.tsx` restores a stored
  visitor choice from `localStorage` (`etalyah-theme`) before first paint, so
  there is no flash of the wrong theme.
- The header toggle updates `data-theme` and persists the choice across routes
  and reloads; `suppressHydrationWarning` on `<html>` keeps hydration safe.
- All colors below are CSS custom properties; Tailwind CSS 4 consumes them
  through `@theme inline`, so every component follows the active theme
  automatically.

## Color tokens (CSS custom properties, `src/app/globals.css`)

### Dark theme (default): `:root, [data-theme="dark"]`

| Token | Value | Use |
| --- | --- | --- |
| `--page` | `#17131F` | Deep plum-slate canvas |
| `--section` | `#1E1928` | Alternating section background |
| `--surface` | `#262033` | Card body |
| `--surface-raised` | `#30283E` | Elevated, interactable layer |
| `--surface-soft` | `#211B2C` | Quiet panel and skill group |
| `--primary` | `#B48BE8` | Purple buttons, links, selected indicators |
| `--primary-strong` | `#CBACF7` | Hover and emphasis on dark surfaces |
| `--primary-soft` | `#3D2A54` | Deep lavender highlight backgrounds |
| `--text` | `#F3EFF9` | Primary text |
| `--text-muted` | `#C8BFD4` | Secondary text |
| `--border` | `#50425F` | Separators and card borders |
| `--on-primary` | `#241833` | Ink on the light lavender primary fills |
| `--focus` | `#E4C6FF` | Visible keyboard focus state |
| `--success` | `#74D3AF` | Muted success and technical indicator |

### Light theme (visitor-selected): `[data-theme="light"]`

| Token | Value | Use |
| --- | --- | --- |
| `--page` | `#C8C5D0` | Intermediate cool-gray canvas (deliberately not white) |
| `--section` | `#D0CDD7` | Alternating section background |
| `--surface` | `#DAD7E1` | Card body |
| `--surface-raised` | `#E4E1E9` | Elevated, interactable layer |
| `--surface-soft` | `#D3CDDE` | Quiet panel and skill group |
| `--primary` | `#693A96` | Purple buttons, links, selected indicators |
| `--primary-strong` | `#502775` | Hover and contrast-safe emphasis |
| `--primary-soft` | `#C7B8D9` | Lavender highlight backgrounds |
| `--text` | `#292332` | Deep-plum body and title text |
| `--text-muted` | `#51485F` | Legible secondary text |
| `--border` | `#AAA2B8` | Separators and card borders |
| `--on-primary` | `#FFFFFF` | Text on solid purple fills |
| `--focus` | `#542589` | Visible keyboard focus state |
| `--success` | `#236B4E` | Muted success and technical indicator |

Tokens are exposed to Tailwind CSS 4 through `@theme inline` (for example
`bg-page`, `text-ink`, `border-line`, `bg-primary`).

Contrast notes: in dark mode `--text` on `--page` exceeds 13:1 and `--text-muted`
on `--surface` exceeds 8:1; in light mode `--text` on `--page` approaches 9:1 and
`--primary` on `--page` exceeds 4.5:1 (solid `--primary` fills therefore carry
white `--on-primary` text). All combinations satisfy WCAG AA for their
use (4.5:1 for body text, 3:1 for large text and controls).

## Typography

- **Family:** Manrope variable (200-800), bundled locally as woff2 via
  `next/font/local`. System sans fallbacks, mono system stack for code.
- **Hero heading:** `clamp(2.8rem, 5.5vw, 5.4rem)`, weight 800, tracking `-0.03em`.
- **Section headings:** `clamp(1.65rem, 3.4vw, 2.6rem)`, weight 800.
- **Body:** 16-19px, 1.7-1.8 line height, `--ink-muted` for secondary text.
- **Eyebrows:** 11px, 700, uppercase, `0.16em` letter spacing, `--primary-strong`.

## Layout

- Max content width 1180px; 16px mobile gutters, 24-32px desktop gutters.
- 8px spacing rhythm; section padding `py-16` (mobile) to `py-24` (desktop).
- Cards: 1.125-2rem radius, 1px `--line` border, layered soft shadows, 200ms
  hover lift (`translateY(-3px)` plus deeper shadow).

## Portraits

Two owner-approved photographs, used exactly once each at full size, plus one
square avatar derived from the official portrait (crop and resize only, no
retouching) that serves as the small identity mark:

| Asset | Source | Placement | Treatment |
| --- | --- | --- | --- |
| `/images/etalyah-hero.webp` | `Portfolio-official(img).jpeg` (972x1323), left edge cropped to remove background distractions | Homepage hero, right column | Lavender frame, purple keyline, `aspect-[4/5]`, `object-cover`, `object-position: center 30%`, priority load |
| `/images/etalyah-about.webp` | `Portfolio-Smiley(img).jpeg` (573x756), uncropped | Homepage About (left column) and `/about/` | White card frame, `aspect-[3/4]`, `object-position: center 28%`, lazy load |
| `/images/etalyah-avatar.webp` | Face-centered square crop of `Portfolio-official(img).jpeg` (full width, eyes near mid-frame, headroom above the hair), 320x320 | Header and footer identity mark beside the site name (32-36px) | Purple keyline, `rounded-[26%]`, `object-cover`, no animation |

All files are re-encoded with EXIF/device metadata stripped. The browser
favicon set (`src/app/icon.png` 32x32 and `src/app/apple-icon.png` 180x180) is
generated from the same avatar crop, so the tab icon, home-screen icon, and
header mark show the same face. There is no carousel, slideshow, lightbox, or
additional photograph anywhere on the site.

## Motion

150-250ms easing for hover and disclosure transitions. Native `<details>` for
expandable experience roles. Card hover lifts 2px with a deeper purple-tinted
shadow. Technology badges play a single 260ms nudge on fine-pointer hover only,
with a soft purple halo; the animation never loops and is disabled entirely under
`prefers-reduced-motion: reduce` while hover and focus styling remain. The same
media query collapses all transitions and disables smooth scrolling.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip link, one `h1` per page.
- All interactive elements have visible `:focus-visible` rings (`--focus`).
- Mobile menu: `aria-expanded` toggle, Escape to close, focus returned to the toggle,
  non-modal (never traps keyboard users), closes on navigation and outside click.
- External links carry `target="_blank" rel="noopener noreferrer"` and screen-reader
  suffixes on icon-only controls.
- Icons are inline SVG with `aria-hidden` or descriptive `aria-label`.
