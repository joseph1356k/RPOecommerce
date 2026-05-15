"use client";
import { useEffect, useState } from "react";

const STATS = [
  { value: 8420, label: "Miembras activas", suffix: "+" },
  { value: 96, label: "Recompra primer año", suffix: "%" },
  { value: 4.9, label: "Calificación promedio", suffix: "/5", decimals: 1 },
  { value: 24, label: "Eventos privados al año", suffix: "" },
];

const FAQ = [
  {
    q: "¿Cuánto cuesta unirme a RPO Club?",
    a: "Es 100% gratis. Solo necesitas un correo. Sin permanencia, sin letra pequeña, sin cobros recurrentes.",
  },
  {
    q: "¿Cómo subo de nivel?",
    a: "Subes automáticamente según tus pedidos confirmados en los últimos 12 meses. Sport es el inicio. Move es 3+ pedidos. Icon es 8+ pedidos o $2M+ en compras.",
  },
  {
    q: "¿Los puntos vencen?",
    a: "Tus puntos vencen 12 meses después de tu última actividad. Cada compra reinicia el contador.",
  },
  {
    q: "¿Cómo canjeo mis puntos?",
    a: "Cada punto equivale a $50 COP. Aplícalos en el checkout — 100 puntos = $5.000 de descuento, sin mínimo de compra.",
  },
  {
    q: "¿Los beneficios aplican en tienda física?",
    a: "Sí. Solo identifícate con tu correo o ID de miembro al pagar en cualquiera de nuestras tiendas en Medellín, Rionegro y Cali.",
  },
  {
    q: "¿Puedo regalar mi membresía a alguien?",
    a: "Tu membresía es personal, pero puedes referir a una amiga: ambas reciben 200 puntos cuando ella haga su primera compra.",
  },
  {
    q: "¿Cómo me doy de baja?",
    a: "Desde tu cuenta o escribiéndonos por WhatsApp. Sin preguntas, sin proceso largo. Tus puntos quedan disponibles 30 días después.",
  },
];

function useCountUp(target: number, duration = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    function step(ts: number) {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setV(eased * target);
      if (t < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

function StatItem({ stat }: { stat: (typeof STATS)[number] }) {
  const v = useCountUp(stat.value);
  const display = stat.decimals ? v.toFixed(stat.decimals) : Math.round(v).toLocaleString("es-CO");
  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          fontSize: "clamp(34px, 4.5vw, 56px)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          margin: 0,
          lineHeight: 1,
          color: "var(--color-fg)",
        }}
      >
        {display}
        <span style={{ color: "var(--color-accent)" }}>{stat.suffix}</span>
      </p>
      <p style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-60)", margin: "10px 0 0", fontWeight: 600 }}>
        {stat.label}
      </p>
    </div>
  );
}

export default function CommunityFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {/* Stats */}
      <section
        style={{
          padding: "clamp(40px, 5vw, 64px) clamp(16px, 4vw, 32px)",
          backgroundColor: "#fff",
          borderTop: "1px solid var(--color-ink-20)",
          borderBottom: "1px solid var(--color-ink-20)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "clamp(20px, 3vw, 40px)",
          }}
        >
          {STATS.map((s) => (
            <StatItem key={s.label} stat={s} />
          ))}
        </div>
      </section>

      {/* Community editorial */}
      <section
        style={{
          padding: "clamp(48px, 6vw, 80px) clamp(16px, 4vw, 32px)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div
          className="community-grid"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(24px, 4vw, 56px)",
            alignItems: "center",
          }}
        >
          <div>
            <p className="eyebrow">Más que descuentos</p>
            <h2 className="section-title">Comunidad real, no transacción.</h2>
            <p className="section-lede" style={{ marginTop: 14, marginBottom: "20px" }}>
              RPO Club es donde nuestras miembras se conocen, entrenan juntas y descubren primero lo que está por venir. Eventos en tienda, masterclasses con entrenadoras, sesiones de styling y experiencias que no encuentras en ningún otro lado.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "Masterclasses con entrenadoras certificadas",
                "Pop-ups y previews privados antes de cada lanzamiento",
                "Sesiones 1:1 de styling para socias Icon",
                "Acceso al chat privado de la comunidad",
              ].map((c) => (
                <li key={c} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "var(--color-fg)" }}>
                  <span style={{ color: "var(--color-accent)", fontWeight: 700, flexShrink: 0 }}>—</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              aspectRatio: "4/5",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundImage: "url('/images/products/real/set-rossy-esencia.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          padding: "clamp(48px, 6vw, 80px) clamp(16px, 4vw, 32px)",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <header style={{ textAlign: "center", marginBottom: "clamp(24px, 3vw, 40px)" }}>
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 className="section-title">Lo que necesitas saber.</h2>
          </header>

          <div style={{ borderTop: "1px solid var(--color-ink-20)" }}>
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} style={{ borderBottom: "1px solid var(--color-ink-20)" }}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      padding: "20px 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "16px",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "var(--color-fg)",
                      textAlign: "left",
                    }}
                  >
                    {item.q}
                    <span
                      aria-hidden
                      style={{
                        fontSize: "22px",
                        fontWeight: 300,
                        lineHeight: 1,
                        flexShrink: 0,
                        transition: "transform 220ms cubic-bezier(0.22,1,0.36,1)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? "300px" : 0,
                      overflow: "hidden",
                      transition: "max-height 320ms cubic-bezier(0.22,1,0.36,1), padding 220ms",
                      paddingBottom: isOpen ? "20px" : 0,
                      fontSize: "14px",
                      color: "var(--color-ink-60)",
                      lineHeight: 1.65,
                    }}
                  >
                    {item.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
