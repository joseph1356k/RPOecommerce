"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Category } from "@/types";

const CATEGORIES: (Category & { description: string })[] = [
  {
    name: "Sets",
    image: "/images/categories/sets.png",
    href: "/catalogo?tipo=sets",
    description: "Top + legging coordinados. Lista para entrenar y salir.",
  },
  {
    name: "Enterizos",
    image: "/images/categories/enterizos.png",
    href: "/catalogo?tipo=enterizos",
    description: "Una pieza, todo el look. Tu favorito de uso diario.",
  },
  {
    name: "Leggings",
    image: "/images/categories/leggins.png",
    href: "/catalogo?tipo=leggins",
    description: "Compresión suave, alta cintura, libertad de movimiento.",
  },
  {
    name: "Tops",
    image: "/images/categories/tops.png",
    href: "/catalogo?tipo=tops",
    description: "Sujeción confiable para baja, media o alta intensidad.",
  },
];

export default function CategoryGrid() {
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
      <header className="reveal" style={{ textAlign: "center", marginBottom: "clamp(28px, 4vw, 48px)" }}>
        <p className="eyebrow">Explora por tipo</p>
        <h2 className="section-title">Encuentra tu próxima pieza favorita.</h2>
        <p className="section-lede" style={{ margin: "12px auto 0" }}>
          Categorías pensadas para que encuentres lo que necesitas sin recorrer todo el catálogo.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(12px, 1.5vw, 20px)",
        }}
      >
        {CATEGORIES.map((cat, i) => (
          <a
            key={cat.name}
            href={cat.href}
            className="reveal lift"
            style={{
              display: "block",
              position: "relative",
              aspectRatio: "4/5",
              overflow: "hidden",
              borderRadius: "4px",
              transitionDelay: `${i * 80}ms`,
              backgroundColor: "#f2efea",
            }}
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              style={{ objectFit: "cover", transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)" }}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {/* Subtle gradient */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "20px",
                right: "20px",
                bottom: "20px",
                color: "#fff",
              }}
            >
              <h3
                style={{
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {cat.name}
              </h3>
              <p
                style={{
                  fontSize: "12.5px",
                  margin: "4px 0 12px",
                  opacity: 0.9,
                  lineHeight: 1.4,
                }}
              >
                {cat.description}
              </p>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Comprar
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
