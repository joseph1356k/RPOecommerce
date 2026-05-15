"use client";

const COMPARISON = [
  ["Rol de la web", "Catálogo online", "Experiencia de marca"],
  ["Comunicación", "Producto + precio", "Beneficio + emoción + confianza"],
  ["Producto", "Prenda individual", "Solución para una rutina"],
  ["Diseño", "Comercial", "Premium, limpio, mobile-first"],
  ["Conversión", "Depende del usuario", "Guiada por estructura y prueba social"],
  ["Retención", "Compra puntual", "Comunidad · RPO Club · recompra"],
  ["Futuro", "E-commerce", "E-commerce + A-commerce"],
];

export default function Slide08Propuesta() {
  return (
    <div className="container deck-bg-light" style={{ width: "100%", padding: "clamp(24px, 4vw, 48px)", borderRadius: "20px", background: "linear-gradient(160deg, #faf7f3 0%, #efe8de 100%)", color: "#0a0a0a" }}>
      <p className="eyebrow reveal-1" style={{ color: "var(--color-accent)" }}>La propuesta</p>
      <h2 className="display-m reveal-2" style={{ marginTop: "12px", maxWidth: "22ch" }}>
        De tienda funcional
        <br />
        <span className="italic-serif" style={{ color: "var(--color-accent)" }}>a marca digital optimizada.</span>
      </h2>

      <div className="reveal-3" style={{ marginTop: "32px", overflow: "hidden", borderRadius: "12px", border: "1px solid rgba(10,10,10,0.10)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
          <thead>
            <tr style={{ background: "rgba(10,10,10,0.04)" }}>
              <th style={th}> </th>
              <th style={th}>Modelo actual</th>
              <th style={{ ...th, color: "var(--color-accent)" }}>Modelo propuesto</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row, i) => (
              <tr key={i} style={{ borderTop: "1px solid rgba(10,10,10,0.08)" }}>
                <td style={{ ...td, fontWeight: 700 }}>{row[0]}</td>
                <td style={{ ...td, color: "rgba(10,10,10,0.55)" }}>{row[1]}</td>
                <td style={{ ...td, fontWeight: 600 }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: "14px 18px",
  textAlign: "left",
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 800,
  color: "rgba(10,10,10,0.55)",
};
const td: React.CSSProperties = {
  padding: "14px 18px",
  verticalAlign: "middle",
};
