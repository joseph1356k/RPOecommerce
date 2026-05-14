"use client";
import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

interface Props {
  eyebrow?: string;
  title: string;
  lede?: string;
  products: Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
  background?: "white" | "soft";
}

export default function CollectionSection({
  eyebrow,
  title,
  lede,
  products,
  viewAllHref,
  viewAllLabel = "Ver toda la colección",
  background = "white",
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
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
      ref={sectionRef}
      style={{
        padding: "clamp(56px, 8vw, 96px) clamp(16px, 4vw, 32px)",
        maxWidth: "1500px",
        margin: "0 auto",
        width: "100%",
        backgroundColor: background === "soft" ? "var(--color-surface)" : "transparent",
      }}
    >
      <header style={{ marginBottom: "clamp(28px, 4vw, 48px)", maxWidth: "780px" }} className="reveal">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
        {lede && <p className="section-lede">{lede}</p>}
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "clamp(12px, 1.5vw, 24px)",
          rowGap: "clamp(28px, 3vw, 40px)",
        }}
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            className="reveal"
            style={{ transitionDelay: `${Math.min(i, 7) * 60}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {viewAllHref && (
        <div style={{ textAlign: "center", marginTop: "clamp(36px, 5vw, 56px)" }} className="reveal">
          <a href={viewAllHref} className="btn btn--ghost">
            {viewAllLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      )}
    </section>
  );
}
