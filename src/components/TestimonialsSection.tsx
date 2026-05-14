"use client";
import { useState } from "react";
import Image from "next/image";

const TESTIMONIALS = [
  { image: "/images/products/esencia-enterizo-largo-h.jpg", text: "conjunto super recomendado 💯", author: "Cliente RPO" },
  { image: "/images/products/esencia-2.jpg", text: "divino, no transparente y es buena calidad", author: "Cliente RPO" },
  { image: "/images/products/esencia-3.jpg", text: "buena calidad", author: "Cliente RPO" },
  { image: "/images/products/esencia-4.jpg", text: "de esta misma marca. Y siempre 💯", author: "Cliente RPO" },
  { image: "/images/products/esencia-5.jpg", text: "la foto y la calidad 💯", author: "Cliente RPO" },
  { image: "/images/products/esencia-6.jpg", text: "norma es espectacular", author: "Cliente RPO" },
];

export default function TestimonialsSection() {
  const [offset, setOffset] = useState(0);
  const visibleCount = 5;
  const maxOffset = Math.max(0, TESTIMONIALS.length - visibleCount);

  return (
    <section style={{ padding: "48px 0", backgroundColor: "#fff", overflow: "hidden" }}>
      <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "0 24px" }}>
        <h2 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 800, margin: "0 0 32px", textAlign: "center" }}>
          Lo que dicen nuestras clientes ...
        </h2>
      </div>

      <div style={{ position: "relative" }}>
        {/* Prev */}
        <button
          onClick={() => setOffset(Math.max(0, offset - 1))}
          disabled={offset === 0}
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "#fff",
            border: "1px solid #000",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            opacity: offset === 0 ? 0.3 : 1,
          }}
        >
          ‹
        </button>

        <div
          style={{
            display: "flex",
            gap: "16px",
            transition: "transform 0.4s ease",
            transform: `translateX(calc(-${offset * (100 / visibleCount)}% - ${offset * 16}px))`,
            padding: "0 60px",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                minWidth: `calc(${100 / visibleCount}% - ${16 * (visibleCount - 1) / visibleCount}px)`,
                flexShrink: 0,
              }}
            >
              <div style={{ aspectRatio: "1", overflow: "hidden", borderRadius: "4px", marginBottom: "12px" }}>
                <Image
                  src={t.image}
                  alt={t.text}
                  width={240}
                  height={240}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <p style={{ fontSize: "13px", color: "#333", margin: "0 0 4px", lineHeight: 1.4 }}>{t.text}</p>
            </div>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => setOffset(Math.min(maxOffset, offset + 1))}
          disabled={offset === maxOffset}
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "#fff",
            border: "1px solid #000",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            opacity: offset === maxOffset ? 0.3 : 1,
          }}
        >
          ›
        </button>
      </div>
    </section>
  );
}
