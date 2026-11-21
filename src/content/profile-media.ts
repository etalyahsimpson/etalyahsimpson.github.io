/**
 * Owner-approved portrait asset registry.
 *
 * These two photographs are the entire authorized personal-photo inventory.
 * Exactly one hero portrait and one About portrait exist. No other photos of
 * people may be added anywhere on the site.
 *
 * Source photographs (owner-supplied, authorized for public use):
 *   Portfolio-official(img).jpeg  972x1323  -> public/images/etalyah-hero.webp
 *   Portfolio-Smiley(img).jpeg    573x756   -> public/images/etalyah-about.webp
 * Both were cropped non-destructively (background distractions removed at the
 * left/right edges), resized, and re-encoded as WebP with all metadata stripped.
 */

export interface PortraitAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
  role: "hero" | "about";
  priority: boolean;
}

export const heroPortrait: PortraitAsset = {
  src: "/images/etalyah-hero.webp",
  width: 826,
  height: 1323,
  alt: "Etalyah Simpson in a black blazer and white shirt",
  role: "hero",
  priority: true,
};

export const aboutPortrait: PortraitAsset = {
  src: "/images/etalyah-about.webp",
  width: 573,
  height: 756,
  alt: "Etalyah Simpson smiling in a black blazer and white shirt",
  role: "about",
  priority: false,
};

export const portraitInventory = {
  hero: heroPortrait,
  about: aboutPortrait,
} as const;
