/**
 * Owner-approved portrait asset registry.
 *
 * These two photographs are the entire authorized personal-photo inventory.
 * Exactly one hero portrait and one About portrait exist, plus ONE square
 * avatar derived from the approved official portrait (crop and resize only,
 * no retouching) for the small header/footer identity mark and the favicon
 * set. No other photos of people may be added anywhere on the site.
 *
 * Source photographs (owner-supplied, authorized for public use):
 *   Portfolio-official(img).jpeg  972x1323  -> public/images/etalyah-hero.webp
 *   Portfolio-Smiley(img).jpeg    573x756   -> public/images/etalyah-about.webp
 * Both were cropped non-destructively (background distractions removed at the
 * left/right edges), resized, and re-encoded as WebP with all metadata stripped.
 *
 * The avatar is a face-centered square crop of Portfolio-official(img).jpeg
 * (full width, vertical window chosen to keep the eyes near mid-frame with
 * headroom above the hair), resized to 320x320 WebP. The favicon set
 * (src/app/icon.png 32x32 and src/app/apple-icon.png 180x180) is derived from
 * the same crop.
 */

export interface PortraitAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
  role: "hero" | "about" | "avatar";
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

/**
 * Square face-cropped avatar derived from the official portrait above.
 * Shown small (32-36px) beside the site name in the header and footer; the
 * browser favicon PNGs are generated from the same crop.
 */
export const avatarPortrait: PortraitAsset = {
  src: "/images/etalyah-avatar.webp",
  width: 320,
  height: 320,
  alt: "Etalyah Simpson",
  role: "avatar",
  priority: true,
};

export const portraitInventory = {
  hero: heroPortrait,
  about: aboutPortrait,
  avatar: avatarPortrait,
} as const;
