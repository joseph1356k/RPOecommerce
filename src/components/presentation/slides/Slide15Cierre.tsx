"use client";

export default function Slide15Cierre() {
  return (
    <div className="container deck-bg-warm" style={{ position: "relative", textAlign: "left" }}>
      <p className="eyebrow reveal-1">Cierre</p>
      <h2 className="display-l reveal-2" style={{ marginTop: "20px", maxWidth: "16ch" }}>
        RPO ya tiene producto.
        <br />
        <span className="italic-serif">Falta convertirlo en marca.</span>
      </h2>
      <p className="lede reveal-3" style={{ marginTop: "32px", maxWidth: "56ch" }}>
        En seis meses pasamos de una tienda funcional a un sistema digital que mide, comunica, convierte y retiene mejor — y queda listo para el comercio asistido por inteligencia artificial.
      </p>

      <div className="reveal-4" style={{ marginTop: "48px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <a
          href="/"
          className="pill pill-accent"
          style={{ padding: "12px 22px", fontSize: "12px", textDecoration: "none" }}
        >
          Ver el rediseño en producción →
        </a>
        <a
          href="/catalogo"
          className="pill"
          style={{ padding: "12px 22px", fontSize: "12px", textDecoration: "none" }}
        >
          Probar el nuevo catálogo
        </a>
        <a
          href="/products/enterizo-largo-h-cute"
          className="pill"
          style={{ padding: "12px 22px", fontSize: "12px", textDecoration: "none" }}
        >
          Probar la nueva PDP
        </a>
      </div>

      <p className="reveal-5" style={{
        marginTop: "64px",
        fontSize: "10.5px",
        letterSpacing: "0.32em",
        color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
        fontWeight: 700,
      }}>
        R · P · O — Movimiento con seguridad
      </p>
    </div>
  );
}
