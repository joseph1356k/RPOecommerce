"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const VIDEOS = [
  {
    poster: "/images/products/esencia-enterizo-largo-h.jpg",
    title: "Enterizo Corto Calma Pausa",
    price: "159.000 COP",
    productHref: "/products/enterizo-corto-calma-pausa",
  },
  {
    poster: "/images/products/esencia-2.jpg",
    title: "Enterizo Largo Aura",
    price: "189.900 COP",
    productHref: "/products/enterizo-largo-aura",
  },
  {
    poster: "/images/products/esencia-3.jpg",
    title: "Set Rossy Esencia",
    price: "239.800 COP",
    productHref: "/products/set-rossy-esencia",
  },
  {
    poster: "/images/products/esencia-4.jpg",
    title: "Enterizo Movee",
    price: "169.900 COP",
    productHref: "/products/enterizo-movee",
  },
];

export default function VideoGallery() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(56px, 8vw, 96px) clamp(16px, 4vw, 32px)",
        maxWidth: "1500px",
        margin: "0 auto",
      }}
    >
      <header className="reveal" style={{ marginBottom: "clamp(28px, 4vw, 40px)", maxWidth: "780px" }}>
        <p className="eyebrow">Inspírate</p>
        <h2 className="section-title">Mira cómo se mueven nuestras prendas.</h2>
        <p className="section-lede">Estilos reales en cuerpos reales — para que veas el ajuste antes de elegir.</p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "clamp(12px, 1.5vw, 20px)",
        }}
      >
        {VIDEOS.map((video, i) => (
          <a
            key={i}
            href={video.productHref}
            className="reveal lift"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              borderRadius: "6px",
              overflow: "hidden",
              transitionDelay: `${i * 70}ms`,
            }}
          >
            <div style={{ position: "relative", aspectRatio: "9/16", backgroundColor: "#111", overflow: "hidden" }}>
              <Image
                src={video.poster}
                alt={video.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              <div
                aria-label="Play"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.92)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                }}
              >
                <svg width="18" height="20" viewBox="0 0 16 18" fill="#000">
                  <path d="M1 1l14 8L1 17V1z" />
                </svg>
              </div>
              <div style={{ position: "absolute", left: "16px", right: "16px", bottom: "16px", color: "#fff" }}>
                <p style={{ margin: 0, fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.02em" }}>{video.title}</p>
                <p style={{ margin: "2px 0 0", fontSize: "12px", opacity: 0.85, fontWeight: 600 }}>{video.price}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
