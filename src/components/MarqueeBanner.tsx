export default function MarqueeBanner() {
  const text = "ENVÍO GRATIS POR COMPRAS SUPERIORES A $500.000";
  const repeated = Array.from({ length: 8 }, (_, i) => `${text}   •   `).join("");

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "12px 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <div className="marquee-track" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em" }}>
        <span>{repeated}</span>
        <span aria-hidden="true">{repeated}</span>
      </div>
    </div>
  );
}
