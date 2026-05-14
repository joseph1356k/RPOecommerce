export default function MarqueeBanner() {
  const messages = [
    "Envío gratis desde $500.000",
    "Cambios fáciles en 15 días",
    "Diseñado y producido en Colombia",
    "Comunidad RPO · Mujeres en movimiento",
  ];

  const fragment = messages.map((m) => `${m}   ·   `).join("");
  const repeated = Array.from({ length: 3 }, () => fragment).join("");

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        color: "#fff",
        padding: "14px 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="marquee-track"
        style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}
      >
        <span>{repeated}</span>
        <span aria-hidden="true">{repeated}</span>
      </div>
    </div>
  );
}
