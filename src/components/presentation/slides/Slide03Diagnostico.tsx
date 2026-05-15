"use client";

const AREAS = [
  { n: "01", title: "Home & jerarquía", desc: "Saturación, hero genérico, CTAs débiles." },
  { n: "02", title: "Mobile UX", desc: "100vh sin safe-area, touch targets <44px, sin búsqueda." },
  { n: "03", title: "Comunicación de marca", desc: "Catálogo, no relato. No vende estilo de vida." },
  { n: "04", title: "Producto", desc: "Descripciones planas. Sin beneficio, sensación ni ocasión." },
  { n: "05", title: "Embudo de conversión", desc: "Fugas en home → producto → carrito → checkout." },
  { n: "06", title: "Confianza & retención", desc: "Sin reseñas estructuradas, sin VIP visible, sin recompra." },
];

export default function Slide03Diagnostico() {
  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "48px" }}>
        <div>
          <p className="eyebrow reveal-1">Qué analizamos</p>
          <h2 className="display-m reveal-2" style={{ marginTop: "12px", maxWidth: "20ch" }}>
            Auditoría completa de la web actual
            <br />
            <span className="italic-serif">como si fuéramos su consultoría.</span>
          </h2>
        </div>
        <p className="lede reveal-3" style={{ maxWidth: "32ch", marginTop: "8px" }}>
          Seis frentes de análisis, evaluados con criterio externo y datos reales del sitio en producción.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "12px",
      }}>
        {AREAS.map((a, i) => (
          <div key={a.n} className={`card reveal-${Math.min(6, i + 2)}`}>
            <p style={{ fontFamily: "'Trirong', serif", fontStyle: "italic", fontWeight: 200, fontSize: "44px", lineHeight: 1, color: "var(--color-accent)", margin: 0 }}>
              {a.n}
            </p>
            <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "16px 0 8px", letterSpacing: "-0.005em" }}>
              {a.title}
            </h3>
            <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.55 }}>
              {a.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
