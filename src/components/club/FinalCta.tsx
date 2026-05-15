"use client";

export default function FinalCta() {
  return (
    <section
      style={{
        padding: "clamp(56px, 7vw, 96px) clamp(16px, 4vw, 32px)",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1f1612 100%)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <p className="eyebrow" style={{ color: "var(--color-accent-soft)" }}>
          Última cosa
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            margin: "12px 0 16px",
            color: "#fff",
          }}
        >
          Esto no es un programa de puntos.
          <br />
          <em
            style={{
              fontFamily: "'Trirong', serif",
              fontWeight: 200,
              fontStyle: "italic",
              color: "var(--color-accent-soft)",
            }}
          >
            Es tu lugar en la marca.
          </em>
        </h2>
        <p
          style={{
            fontSize: "clamp(14px, 1.2vw, 16px)",
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.6,
            margin: "0 0 32px",
          }}
        >
          Activa tu carnet en menos de 30 segundos. Sin tarjeta, sin compromiso.
        </p>
        <a
          href="#join"
          className="btn"
          style={{
            background: "#fff",
            color: "#000",
            padding: "18px 36px",
          }}
        >
          Activar mi membresía gratis
        </a>
      </div>
    </section>
  );
}
