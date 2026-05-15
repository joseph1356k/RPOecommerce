"use client";

const FLOW = [
  { step: "Descubrimiento", who: "Hero + Compra por momento", impact: "Reduce fricción inicial" },
  { step: "Exploración", who: "Catálogo 2-col + bottom sheet", impact: "+38% engagement mobile" },
  { step: "Decisión", who: "PDP rica + reseñas + urgencia", impact: "+25% add-to-cart" },
  { step: "Conversión", who: "Cart drawer + free-shipping bar", impact: "+20% ticket promedio" },
  { step: "Retención", who: "RPO Club + back-in-stock", impact: "+30% recompra a 90 días" },
  { step: "Descubrimiento IA", who: "Schema.org + FAQs", impact: "Nueva fuente de tráfico" },
];

export default function Slide11Modelo() {
  return (
    <div className="container">
      <p className="eyebrow reveal-1">El nuevo journey</p>
      <h2 className="display-m reveal-2" style={{ marginTop: "12px", maxWidth: "20ch" }}>
        Cada etapa,
        <br />
        <span className="italic-serif">una palanca medible.</span>
      </h2>

      <div className="reveal-3" style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "0" }}>
        {FLOW.map((f, i) => (
          <div
            key={f.step}
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr 2fr 1.4fr",
              gap: "20px",
              padding: "18px 0",
              borderBottom: i < FLOW.length - 1 ? "1px solid rgba(255,255,255,0.10)" : "none",
              alignItems: "center",
            }}
          >
            <span style={{
              fontFamily: "'Trirong', serif", fontStyle: "italic", fontWeight: 200,
              fontSize: "32px", color: "var(--color-accent)", lineHeight: 1,
            }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-0.005em" }}>
              {f.step}
            </span>
            <span style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.65)" }}>
              {f.who}
            </span>
            <span style={{
              fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em",
              color: "var(--color-accent-soft)", textAlign: "right",
            }}>
              {f.impact}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
