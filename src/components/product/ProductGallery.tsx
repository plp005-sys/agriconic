import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const safeImages = images.length > 0 ? images : ["/images/categories/agricultural-equipment.jpg"];

  return (
    <div>
      <div
        className="group relative aspect-square w-full overflow-hidden rounded-3xl bg-ink-900/5"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <img
          src={safeImages[active]}
          alt={`${name} — product photo ${active + 1}`}
          className={`h-full w-full object-cover transition-transform duration-500 ease-out ${
            zoomed ? "scale-110" : "scale-100"
          }`}
        />
      </div>
      {safeImages.length > 1 && (
        <div className="mt-4 flex gap-3">
          {safeImages.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={active === i}
              className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl ring-2 transition-colors ${
                active === i ? "ring-moss-600" : "ring-transparent hover:ring-ink-900/20"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
