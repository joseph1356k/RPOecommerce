"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Track active slide as the user swipes natively
  useEffect(() => {
    if (!isMobile || !scrollerRef.current) return;
    const el = scrollerRef.current;
    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!el) return;
        const idx = Math.round(el.scrollLeft / el.clientWidth);
        if (idx !== active && idx >= 0 && idx < images.length) setActive(idx);
      });
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isMobile, images.length, active]);

  // ───── Mobile: native horizontal scroll-snap with dots ─────
  if (isMobile) {
    return (
      <div style={{ position: "relative" }}>
        <div
          ref={scrollerRef}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            borderRadius: "0",
            margin: "0 -16px", // bleed to viewport edges
          }}
        >
          {images.map((src, i) => (
            <div
              key={src + i}
              style={{
                position: "relative",
                flex: "0 0 100%",
                aspectRatio: "3/4",
                scrollSnapAlign: "center",
                backgroundColor: "var(--color-surface-2)",
              }}
            >
              <Image
                src={src}
                alt={`${alt} — vista ${i + 1}`}
                fill
                sizes="100vw"
                priority={i === 0}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        {/* Counter pill */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "12px",
            right: "16px",
            background: "rgba(0,0,0,0.55)",
            color: "#fff",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            padding: "5px 10px",
            borderRadius: "999px",
            backdropFilter: "blur(4px)",
          }}
        >
          {active + 1} / {images.length}
        </div>
        {/* Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginTop: "12px",
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a imagen ${i + 1}`}
              onClick={() => {
                setActive(i);
                scrollerRef.current?.scrollTo({ left: i * scrollerRef.current.clientWidth, behavior: "smooth" });
              }}
              style={{
                width: "32px",
                height: "32px",
                padding: 0,
                background: "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                aria-hidden
                style={{
                  display: "block",
                  width: i === active ? "24px" : "6px",
                  height: "4px",
                  borderRadius: "999px",
                  backgroundColor: i === active ? "var(--color-fg)" : "var(--color-ink-20)",
                  transition: "all 280ms cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ───── Desktop: thumbs + main image with crossfade ─────
  return (
    <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: "12px" }} className="product-gallery">
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
