"use client";
import { useState } from "react";
import Image from "next/image";

const POLITICAS = [
  { label: "Política PQRSF", href: "/pages/politica-pqrsf" },
  { label: "Política de envíos", href: "/pages/politica-de-envios" },
  { label: "Cambios y garantías", href: "/pages/politica-de-cambios" },
  { label: "Guía de ajuste", href: "/pages/guia-de-ajuste" },
];

const SERVICIO = [
  { label: "Ubicaciones", href: "/pages/ubicaciones" },
  { label: "Formulario PQRSF", href: "/pages/formulario-pqrsf" },
  { label: "Cuidado de tus prendas", href: "/pages/cuidado-de-prendas" },
  { label: "¿Quieres ser mayorista?", href: "/pages/mayoristas" },
];

const UBICACIONES_MEDELLIN = [
  "CC Santafé · Local 4190",
  "CC Florida · Local 2217",
  "CC Fabricato · Local 3160",
  "CC Mayorca Etapa 1 · Local 438",
  "CC Arkadia 4to piso · Local 411",
];

const UBICACIONES_RIONEGRO = ["CC San Nicolás Etapa 4 · Local 2491"];
const UBICACIONES_CALI = ["CC Chipichape · Local 8 247A"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  }

  return (
    <footer style={{ backgroundColor: "#0a0a0a", color: "#fff", marginTop: "auto" }}>
      {/* Newsletter / RPO Club mini band */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "clamp(32px, 4vw, 48px) clamp(16px, 4vw, 32px)",
        }}
      >
        <div
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(24px, 4vw, 56px)",
            alignItems: "center",
          }}
          className="footer-newsletter"
        >
          <div>
            <p className="eyebrow" style={{ color: "var(--color-accent-soft)" }}>RPO Club</p>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 32px)", fontWeight: 800, margin: "10px 0 12px", letterSpacing: "-0.01em" }}>
              Recibe primero lo nuevo. Y los beneficios.
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "52ch" }}>
              Únete a la comunidad RPO y desbloquea acceso anticipado, promociones privadas y un regalo especial en tu cumpleaños.
            </p>
          </div>
          <form
            onSubmit={onSubmit}
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {submitted ? (
              <p
                role="status"
                style={{
                  fontSize: "14px",
                  color: "var(--color-accent-soft)",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                ✓ Listo. Te llegará un correo con tus beneficios de bienvenida.
              </p>
            ) : (
              <>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo"
                  style={{
                    flex: "1 1 240px",
                    padding: "14px 18px",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "#fff",
                    fontSize: "14px",
                    borderRadius: "2px",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  className="btn"
                  style={{ background: "#fff", color: "#000" }}
                >
                  Únete gratis
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
          padding: "clamp(36px, 5vw, 56px) clamp(16px, 4vw, 32px) 24px",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr",
          gap: "clamp(24px, 3vw, 48px)",
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <Image
            src="/images/logo-white.png"
            alt="RPO"
            width={120}
            height={38}
            style={{ objectFit: "contain", marginBottom: "20px", height: "32px", width: "auto" }}
          />
          <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", margin: "0 0 24px", maxWidth: "320px" }}>
            Ropa deportiva diseñada en Colombia para mujeres que se mueven con intención. Tecnología, comodidad y estilo en cada prenda.
          </p>
          <a
            href="/pages/trabaja-con-nosotros"
            className="btn btn--ghost"
            style={{ borderColor: "#fff", color: "#fff", padding: "12px 24px" }}
          >
            Trabaja con nosotros
          </a>
        </div>

        {/* Políticas */}
        <div>
          <h3 style={{ fontSize: "11.5px", fontWeight: 800, letterSpacing: "0.16em", margin: "0 0 20px", textTransform: "uppercase" }}>
            Políticas
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {POLITICAS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 180ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Servicio */}
        <div>
          <h3 style={{ fontSize: "11.5px", fontWeight: 800, letterSpacing: "0.16em", margin: "0 0 20px", textTransform: "uppercase" }}>
            Servicio al cliente
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {SERVICIO.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 180ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Ubicaciones */}
        <div>
          <h3 style={{ fontSize: "11.5px", fontWeight: 800, letterSpacing: "0.16em", margin: "0 0 20px", textTransform: "uppercase" }}>
            Encuéntranos en
          </h3>
          <p style={{ fontSize: "12.5px", fontWeight: 700, margin: "0 0 8px", letterSpacing: "0.08em" }}>MEDELLÍN</p>
          <ul style={{ listStyle: "none", margin: "0 0 16px", padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
            {UBICACIONES_MEDELLIN.map((loc) => (
              <li key={loc} style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>{loc}</li>
            ))}
          </ul>
          <p style={{ fontSize: "12.5px", fontWeight: 700, margin: "0 0 8px", letterSpacing: "0.08em" }}>RIONEGRO</p>
          <ul style={{ listStyle: "none", margin: "0 0 16px", padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
            {UBICACIONES_RIONEGRO.map((loc) => (
              <li key={loc} style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>{loc}</li>
            ))}
          </ul>
          <p style={{ fontSize: "12.5px", fontWeight: 700, margin: "0 0 8px", letterSpacing: "0.08em" }}>CALI</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
            {UBICACIONES_CALI.map((loc) => (
              <li key={loc} style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>{loc}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "20px clamp(16px, 4vw, 32px)" }}>
        <div
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
            © {new Date().getFullYear()} RPO · Hecho en Colombia
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.7)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ color: "rgba(255,255,255,0.7)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.5a8.16 8.16 0 0 0 4.77 1.52V6.55a4.85 4.85 0 0 1-1.84-.06" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
