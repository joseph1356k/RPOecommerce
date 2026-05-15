"use client";

const PILLARS = [
  {
    icon: "✦",
    title: "Marca",
    detail: "Tono femenino, aspiracional y seguro. Storytelling por colección, no solo por producto.",
  },
  {
    icon: "◐",
    title: "Mobile-first",
    detail: "Búsqueda overlay, bottom sheet, touch 44px+, swipe nativo, safe-area, preload del LCP.",
  },
  {
    icon: "★",
    title: "Producto",
    detail: "Story, 4 features, fabric, fit notes, styled-for, reseñas verificadas, urgency banner.",
  },
  {
    icon: "↻",
    title: "Conversión",
    detail: "Cart drawer + free-shipping bar, quick-add, wishlist, completa-tu-look, sticky CTA.",
  },
  {
    icon: "♥",
    title: "Comunidad",
    detail: "RPO Club con carnet digital, 3 tiers, calculadora de beneficios, exit intent ético.",
  },
  {
    icon: "⊛",
    title: "A-commerce",
    detail: "Schema.org Product/Offer/Review, FAQs, descripciones legibles para LLMs y agentes.",
  },
];

export default function Slide09Cambios() {
  return (
    <div className="container">
      <p className="eyebrow reveal-1">Seis pilares de transformación</p>
      <h2 className="display-m reveal-2" style={{ marginTop: "12px", maxWidth: "20ch" }}>
        No son cambios visuales.
        <br />
        <span className="italic-serif">Son palancas de negocio.</span>
      </h2>

      <div
        className="deck-grid-3 reveal-3"
        style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
      >
        {PILLARS.map((p) => (
          <div key={p.title} className="card">
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid var(--color-accent)",
              color: "var(--color-accent-soft)",
              fontSize: "18px",
              marginBottom: "16px",
              fontWeight: 700,
            }}>{p.icon}</div>
            <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.005em" }}>
              {p.title}
            </h3>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.55 }}>
              {p.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
