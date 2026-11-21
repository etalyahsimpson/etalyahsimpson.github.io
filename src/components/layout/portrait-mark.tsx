import Image from "next/image";
import { avatarPortrait } from "@/content/profile-media";
import { cn } from "@/lib/utils";

/**
 * Square face-cropped avatar derived from the owner-approved official
 * portrait (see src/content/profile-media.ts). It is the small identity mark
 * beside the site name in the header and footer, replacing the former "ES"
 * typographic tile. The browser favicon set (src/app/icon.png 32x32 and
 * src/app/apple-icon.png 180x180) is generated from the same crop, so the
 * tab icon, home-screen icon, and header mark all show the same face.
 *
 * Styling follows the site's portrait treatment at small scale: a subtle
 * purple keyline, generous corner radius, and object-fit: cover. It is a
 * static placement with no animation; keyboard focus is handled by the
 * global :focus-visible ring on the surrounding link.
 */
export function PortraitMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-block h-9 w-9 shrink-0 overflow-hidden rounded-[26%] border border-primary/45 bg-primary-soft",
        className,
      )}
    >
      <Image
        src={avatarPortrait.src}
        alt={avatarPortrait.alt}
        width={avatarPortrait.width}
        height={avatarPortrait.height}
        loading="eager"
        className="h-full w-full object-cover"
      />
    </span>
  );
}
