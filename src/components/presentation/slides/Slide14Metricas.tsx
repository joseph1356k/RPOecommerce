"use client";

const KPIS = [
  {
    group: "Adquisición",
    items: [
      ["Visitas mensuales", "+0% (mismo tráfico)"],
      ["% mobile", ">80%"],
      ["Fuente de tráfico", "IG · TikTok · WhatsApp"],
    ],
  },
  {
    group: "Comportamiento",
    items: [
      ["Bounce rate mobile", "−20%"],
      ["Scroll depth PDP", "+35%"],
      ["Uso de filtros", ">40% de sesiones"],
    ],
  },
  {
    group: "Conversión",
    items: [
      ["Add-to-cart rate", "+25%"],
      ["Conversión global", "1.0% → 1.8%"],
      ["Cart abandonment", "−15 pp"],
    ],
  },
  {
    group: "Valor",
    items: [
      ["Ticket promedio", "$150K → $180K"],
      ["Unidades por pedido", "1.0 → 1.4"],
      ["Recompra a 90d", "+30%"],
    ],
  },
];

export default function Slide14Metricas() {
  return (
    <div className="container">
      <p className="eyebrow reveal-1">Cómo se mide el éxito</p>
      <h2 className="display-m reveal-2" style={{ marginTop: "12px", maxWidth: "20ch" }}>
        12 KPIs.
        <br />
        <span className="italic-serif">Decisiones por dato, no por intuición.</span>
      </h2>

      <div
        className="deck-grid-2"
        style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        {KPIS.map((g, i) => (
          <div key={g.group} className={`card reveal-${Math.min(6, i + 3)}`}>
            <p style={{
              fontSize: "10.5px",
              fontWeight: 800,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              margin: "0 0 16px",
            }}>
              {g.group}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {g.items.map(([k, v]) => (
                <li key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: "13.5px" }}>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{k}</span>
                  <span style={{ fontWeight: 800, color: "#fff", letterSpacing: "-0.005em" }}>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
