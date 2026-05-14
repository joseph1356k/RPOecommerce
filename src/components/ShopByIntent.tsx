"use client";
import { useEffect, useRef } from "react";
import { PRODUCT_INTENTS } from "@/data/products";
import { track } from "@/lib/tracking";

export default function ShopByIntent() {
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
        padding: "clamp(32px, 4vw, 56px) clamp(16px, 4vw, 32px)",
        maxWidth: "1500px",
        margin: "0 auto",
      }}
    >
      <header className="reveal" style={{ marginBottom: "clamp(20px, 2.5vw, 32px)", maxWidth: "640px" }}>
        <p className="eyebrow">Compra por momento</p>
        <h2 className="section-title">¿Qué necesitas hoy?</h2>
        <p className="section-lede" style={{ marginTop: 12 }}>
          Encuentra prendas por intención. Tu día, tu rutina, tu estilo — sin perderte en el catálogo.
        </p>
      </header>

      <div
        className="reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        {PRODUCT_INTENTS.map((intent) => (
          <a
            key={intent.value}
            href={`/catalogo?intent=${intent.value}`}
            onClick={() => track("select_item", { intent: intent.value, source: "shop_by_intent" })}
            className="lift"
            style={{
              padding: "20px",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-ink-20)",
              borderRadius: "6px",
              textDecoration: "none",
              color: "var(--color-fg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
              transition: "background 200ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-surface-2)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-surface)")}
          >
            <span style={{ fontSize: "22px" }} aria-hidden>
              {intent.icon}
            </span>
            <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.01em" }}>
              {intent.label}
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--color-ink-60)", fontWeight: 600 }}>
              Ver looks →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
