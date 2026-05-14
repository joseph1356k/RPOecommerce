"use client";
import Image from "next/image";

const POLITICAS = [
  { label: "Política PQRSF", href: "/pages/politica-pqrsf" },
  { label: "Política de Envíos", href: "/pages/politica-de-envios" },
  { label: "Política de Cambios y Garantías", href: "/pages/politica-de-cambios" },
];

const SERVICIO = [
  { label: "Ubicaciones", href: "/pages/ubicaciones" },
  { label: "Formulario PQRSF", href: "/pages/formulario-pqrsf" },
  { label: "Cuidado de tus prendas", href: "/pages/cuidado-de-prendas" },
  { label: "¿Quieres ser mayoristas?", href: "/pages/mayoristas" },
];

const UBICACIONES_MEDELLIN = [
  "CC Santafé Local 4190",
  "CC Florida Local 2217",
  "CC Fabricato Local 3160",
  "CC Mayorca Etapa 1 Local 438",
  "CC Arkadia 4to Piso Local 411",
  "RIONEGRO CC San Nicolás Etapa 4 Local 2491",
];

const UBICACIONES_CALI = ["CC Chipichape Local 8 247A"];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#000", color: "#fff", marginTop: "auto" }}>
      <div
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
          padding: "56px 24px 40px",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr",
          gap: "40px",
        }}
      >
        {/* Brand */}
        <div>
          <Image
            src="/images/logo-white.png"
            alt="RPO"
            width={120}
            height={38}
            style={{ objectFit: "contain", marginBottom: "20px" }}
          />
          <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: "0 0 24px", maxWidth: "280px" }}>
            Nuestra ropa deportiva combina tecnología avanzada y diseño ergonómico, realzando tu figura con total comodidad durante tus entrenamientos
          </p>
          <a
            href="/pages/trabaja-con-nosotros"
            style={{
              display: "inline-block",
              border: "1px solid #fff",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              padding: "12px 24px",
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "background 0.25s, color 0.25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#fff"; }}
          >
            Trabaja con nosotros
          </a>
        </div>

        {/* Políticas */}
        <div>
          <h3 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "0.1em", margin: "0 0 20px", textTransform: "uppercase" }}>
            POLÍTICAS
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {POLITICAS.map((item) => (
              <li key={item.label}>
                <a href={item.href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Servicio al cliente */}
        <div>
          <h3 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "0.1em", margin: "0 0 20px", textTransform: "uppercase" }}>
            SERVICIO AL CLIENTE
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {SERVICIO.map((item) => (
              <li key={item.label}>
                <a href={item.href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Ubicaciones */}
        <div>
          <h3 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "0.1em", margin: "0 0 20px", textTransform: "uppercase" }}>
            ENCUÉNTRANOS EN:
          </h3>
          <p style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 8px" }}>MEDELLÍN</p>
          <ul style={{ listStyle: "none", margin: "0 0 20px", padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
            {UBICACIONES_MEDELLIN.map((loc) => (
              <li key={loc} style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                – {loc}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 8px" }}>CALI</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
            {UBICACIONES_CALI.map((loc) => (
              <li key={loc} style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                – {loc}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", padding: "20px 24px" }}>
        <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.7)", transition: "color 0.2s" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
