"use client";
import { useState } from "react";
import Image from "next/image";

const TESTIMONIALS = [
  { image: "/images/products/esencia-enterizo-largo-h.jpg", text: "El ajuste es perfecto. Se siente como segunda piel.", author: "Laura M." },
  { image: "/images/products/esencia-2.jpg", text: "Calidad real. Nada transparente, no se baja al entrenar.", author: "Catalina R." },
  { image: "/images/products/esencia-3.jpg", text: "Lo uso para entrenar y para salir. Es mi nuevo básico.", author: "Daniela P." },
  { image: "/images/products/esencia-4.jpg", text: "Tela suave, costuras planas, sin marcas. Repito sin dudar.", author: "Sara V." },
  { image: "/images/products/esencia-5.jpg", text: "Me favorece muchísimo la silueta. Súper recomendado.", author: "Manuela G." },
  { image: "/images/products/esencia-6.jpg", text: "La horma es lo mejor. Nunca había tenido un legging así.", author: "Valentina O." },
];

export default function TestimonialsSection() {
  const [offset, setOffset] = useState(0);
  const visibleCount = 4;
  const maxOffset = Math.max(0, TESTIMONIALS.length - visibleCount);

  return (
    <section
      style={{
        padding: "clamp(56px, 8vw, 96px) 0",
        backgroundColor: "var(--color-surface)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px) 32px" }}>
        <p className="eyebrow">Comunidad RPO</p>
        <h2 className="section-title">Lo que dicen las mujeres que ya nos usan.</h2>
        <p className="section-lede" style={{ marginTop: 12 }}>
          Más de 5.000 clientas en Colombia confían en RPO para entrenar, descansar y verse bien.
        </p>
      </div>

      <div style={{ position: "relative", padding: "0 16px" }}>
        <button
          type="button"
          onClick={() => setOffset(Math.max(0, offset - 1))}
          disabled={offset === 0}
          aria-label="Anterior"
          style={{
            position: "absolute",
            left: "16px",
            top: "calc(50% - 24px)",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "#fff",
            border: "1px solid var(--color-fg)",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: offset === 0 ? "not-allowed" : "pointer",
            opacity: offset === 0 ? 0.3 : 1,
            transition: "opacity 200ms",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div
          style={{
            display: "flex",
            gap: "16px",
            transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
            transform: `translateX(calc(-${offset * (100 / visibleCount)}% - ${offset * 16}px))`,
            padding: "0 60px",
            maxWidth: "1500px",
            margin: "0 auto",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <article
              key={i}
              className="lift"
              style={{
                minWidth: `calc(${100 / visibleCount}% - ${(16 * (visibleCount - 1)) / visibleCount}px)`,
                flexShrink: 0,
                backgroundColor: "#fff",
                borderRadius: "6px",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div style={{ aspectRatio: "1", overflow: "hidden", position: "relative" }}>
                <Image
                  src={t.image}
                  alt={`Reseña de ${t.author}`}
                  width={320}
                  height={320}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <svg key={idx} width="12" height="12" viewBox="0 0 24 24" fill="#000">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                    </svg>
                  ))}
                </div>
                <p style={{ fontSize: "13.5px", color: "var(--color-fg)", margin: "0 0 12px", lineHeight: 1.55, fontWeight: 500 }}>
                  “{t.text}”
                </p>
                <p style={{ fontSize: "11.5px", color: "var(--color-ink-60)", margin: 0, letterSpacing: "0.04em", fontWeight: 600 }}>
                  — {t.author}, Cliente RPO
                </p>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOffset(Math.min(maxOffset, offset + 1))}
          disabled={offset === maxOffset}
          aria-label="Siguiente"
          style={{
            position: "absolute",
            right: "16px",
            top: "calc(50% - 24px)",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "#fff",
            border: "1px solid var(--color-fg)",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: offset === maxOffset ? "not-allowed" : "pointer",
            opacity: offset === maxOffset ? 0.3 : 1,
            transition: "opacity 200ms",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
