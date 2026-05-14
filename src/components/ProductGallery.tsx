"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: "12px" }} className="product-gallery">
      {/* Thumbs */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }} className="gallery-thumbs">
        {images.map((src, i) => (
          <button
            type="button"
            key={src + i}
            onClick={() => setActive(i)}
            aria-label={`Imagen ${i + 1}`}
            style={{
              position: "relative",
              width: "72px",
              height: "96px",
              borderRadius: "4px",
              overflow: "hidden",
              border: i === active ? "2px solid var(--color-fg)" : "1px solid var(--color-ink-20)",
              cursor: "pointer",
              padding: 0,
              backgroundColor: "var(--color-surface-2)",
            }}
          >
            <Image src={src} alt="" fill style={{ objectFit: "cover" }} sizes="72px" />
          </button>
        ))}
      </div>

      {/* Main */}
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          borderRadius: "6px",
          overflow: "hidden",
          backgroundColor: "var(--color-surface-2)",
        }}
      >
        {images.map((src, i) => (
          <Image
            key={src + i}
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
            style={{
              objectFit: "cover",
              opacity: i === active ? 1 : 0,
              transition: "opacity 320ms cubic-bezier(0.22,1,0.36,1)",
              position: "absolute",
              inset: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
