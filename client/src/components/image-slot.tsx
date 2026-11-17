import { ImagePlus } from "lucide-react";

/**
 * A clearly marked empty place for a real photo that Pete has not supplied
 * yet. It is never filled with stock art or a made-up picture (Pete, 17 Nov
 * 2026). A production build refuses to run while one of these is still on a
 * page (vite-plugin-prerender-meta.ts), so a placeholder cannot go live.
 * To fill one: put the photo in client/public/images and replace the
 * <ImageSlot /> with an <img>.
 */
export function ImageSlot({ id, wanted, shape = "wide" }: { id: string; wanted: string; shape?: "wide" | "square" }) {
  return (
    <div className={`st-slot st-slot--${shape}`} data-testid={`image-slot-${id}`} role="note">
      <ImagePlus strokeWidth={1.5} aria-hidden="true" />
      <p>
        <strong>Image slot.</strong> {wanted}
      </p>
    </div>
  );
}
