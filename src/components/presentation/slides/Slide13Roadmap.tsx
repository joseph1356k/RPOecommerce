"use client";

const PHASES = [
  {
    month: "M1",
    title: "Estructura & medición",
    actions: "Tracking GA4 + propuesta de valor + arquitectura.",
    metric: "Mapa de embudo + métricas base",
  },
  {
    month: "M2",
    title: "Mobile-first",
    actions: "Búsqueda overlay, bottom sheet, PDP nueva, CTAs sticky.",
    metric: "Mobile bounce −20%",
  },
  {
    month: "M3",
    title: "Confianza",
    actions: "Reseñas verificadas, UGC, FAQs, WhatsApp contextual.",
    metric: "Add-to-cart +25%",
  },
  {
    month: "M4",
    title: "Ticket promedio",
    actions: "Bundles, Completa-tu-look, landing pages campaña.",
    metric: "AOV +20%",
  },
  {
    month: "M5",
    title: "Retención",
    actions: "RPO Club v1, back-in-stock, recuperación de carrito.",
    metric: "Recompra 90d +30%",
  },
  {
    month: "M6",
    title: "A-commerce + SEO",
    actions: "Schema.org, FAQs estructuradas, feed limpio, evergreen.",
    metric: "Tráfico orgánico +40%",
  },
];

export default function Slide13Roadmap() {
  return (
    <div className="container">
      <p className="eyebrow reveal-1">Roadmap · 6 meses</p>
      <h2 className="display-m reveal-2" style={{ marginTop: "12px", maxWidth: "22ch" }}>
        De diagnóstico a A-commerce
        <br />
        <span className="italic-serif">en seis fases medibles.</span>
      </h2>

      <div
        className="deck-roadmap reveal-3"
        style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "8px",
          position: "relative",
        }}
      >
        {/* Connector line */}
        <div aria-hidden style={{
          position: "absolute",
          top: "32px",
          left: "0",
          right: "0",
          height: "2px",
          background: "linear-gradient(90deg, var(--color-accent-soft), var(--color-accent), var(--color-accent-soft))",
          opacity: 0.4,
        }} />

        {PHASES.map((p) => (
          <div key={p.month} style={{ position: "relative", zIndex: 1, paddingTop: "12px" }}>
            {/* Node */}
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#0a0a0a",
              border: "2px solid var(--color-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "var(--color-accent-soft)",
              margin: "0 auto 16px",
              fontFamily: "ui-monospace, monospace",
            }}>
              {p.month}
            </div>
            <div className="card" style={{ padding: "16px 14px" }}>
              <h3 style={{ fontSize: "13.5px", fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.005em" }}>
                {p.title}
              </h3>
              <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.6)", margin: "0 0 10px", lineHeight: 1.5 }}>
                {p.actions}
              </p>
              <p style={{
                fontSize: "10.5px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "var(--color-accent-soft)",
                margin: 0,
                paddingTop: "10px",
                borderTop: "1px solid rgba(255,255,255,0.10)",
              }}>
                {p.metric}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
