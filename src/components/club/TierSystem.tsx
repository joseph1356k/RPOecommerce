"use client";
import { useState } from "react";
import MembershipCard, { TIERS, type TierKey } from "./MembershipCard";

const TIER_DATA: Array<{
  key: TierKey;
  threshold: string;
  perks: { label: string; included: boolean | string }[];
}> = [
  {
    key: "sport",
    threshold: "Gratis al unirte",
    perks: [
      { label: "Envío gratis desde $400.000 (vs $500.000)", included: true },
      { label: "Acceso anticipado 24h a nuevas colecciones", included: true },
      { label: "1 punto por cada $1.000", included: true },
      { label: "Regalo de bienvenida", included: true },
      { label: "Promociones privadas mensuales", included: false },
      { label: "Doble puntos en cumpleaños", included: false },
      { label: "Asesoría 1:1 con stylist RPO", included: false },
      { label: "Eventos privados en tienda", included: false },
    ],
  },
  {
    key: "move",
    threshold: "3+ pedidos al año",
    perks: [
      { label: "Envío gratis siempre", included: true },
      { label: "Acceso anticipado 48h a nuevas colecciones", included: true },
      { label: "1.5 puntos por cada $1.000", included: true },
      { label: "Regalo de bienvenida + cumpleaños", included: true },
      { label: "Promociones privadas mensuales", included: true },
      { label: "Doble puntos en cumpleaños", included: true },
      { label: "Asesoría 1:1 con stylist RPO", included: false },
      { label: "Eventos privados en tienda", included: false },
    ],
  },
  {
    key: "icon",
    threshold: "8+ pedidos al año o $2M+",
    perks: [
      { label: "Envío gratis siempre", included: true },
      { label: "Acceso anticipado 7 días a nuevas colecciones", included: true },
      { label: "2 puntos por cada $1.000", included: true },
      { label: "Regalo de bienvenida + cumpleaños premium", included: true },
      { label: "Promociones privadas semanales", included: true },
      { label: "Triple puntos en cumpleaños", included: true },
      { label: "Asesoría 1:1 con stylist RPO", included: true },
      { label: "Invitación a eventos privados", included: true },
    ],
  },
];

export default function TierSystem() {
  const [hover, setHover] = useState<TierKey>("move");

  return (
    <section
      style={{
        backgroundColor: "#0a0a0a",
        color: "#fff",
        padding: "clamp(48px, 6vw, 80px) clamp(16px, 4vw, 32px)",
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "clamp(32px, 4vw, 56px)", maxWidth: "640px", marginInline: "auto" }}>
          <p className="eyebrow" style={{ color: TIERS[hover].accent }}>3 niveles · 1 comunidad</p>
          <h2 className="section-title" style={{ color: "#fff" }}>Tu lugar en RPO Club crece contigo.</h2>
          <p className="section-lede" style={{ color: "rgba(255,255,255,0.7)", margin: "12px auto 0" }}>
            Empiezas en Sport. Subes a medida que entrenas, compras y vives la marca. Sin permanencia, sin letras pequeñas.
          </p>
        </header>

        <div
          className="tier-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "clamp(12px, 1.5vw, 20px)",
          }}
        >
          {TIER_DATA.map((t) => {
            const T = TIERS[t.key];
            const active = hover === t.key;
            return (
              <article
                key={t.key}
                onMouseEnter={() => setHover(t.key)}
                onFocus={() => setHover(t.key)}
                tabIndex={0}
                style={{
                  border: `1px solid ${active ? T.accent : "rgba(255,255,255,0.12)"}`,
                  borderRadius: "10px",
                  padding: "clamp(20px, 2.5vw, 28px)",
                  backgroundColor: active ? "rgba(255,255,255,0.03)" : "transparent",
                  transition: "all 280ms cubic-bezier(0.22,1,0.36,1)",
                  transform: active ? "translateY(-4px)" : "translateY(0)",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <header style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: T.ring,
                      marginBottom: "16px",
                    }}
                  />
                  <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 4px", color: T.accent }}>
                    {T.label}
                  </h3>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", margin: 0, letterSpacing: "0.04em" }}>
                    {t.threshold}
                  </p>
                </header>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {t.perks.map((p) => (
                    <li
                      key={p.label}
                      style={{
                        fontSize: "12.5px",
                        color: p.included ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.32)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        lineHeight: 1.45,
                        textDecoration: p.included ? "none" : "line-through",
                      }}
                    >
                      <span aria-hidden style={{ flexShrink: 0, color: p.included ? T.accent : "rgba(255,255,255,0.25)", marginTop: "1px" }}>
                        {p.included ? "✓" : "—"}
                      </span>
                      {p.label}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Live preview of the membership card for the selected tier */}
        <div style={{ marginTop: "clamp(40px, 5vw, 64px)", display: "flex", justifyContent: "center" }}>
          <MembershipCard tier={hover} name="Vista previa" />
        </div>
      </div>
    </section>
  );
}
