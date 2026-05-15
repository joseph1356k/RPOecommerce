"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1500, start = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    let t0: number | null = null;
    function step(ts: number) {
      if (t0 === null) t0 = ts;
      const t = Math.min(1, (ts - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(eased * target);
      if (t < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return v;
}

function fmt(n: number) {
  return n.toLocaleString("es-CO");
}

export default function Slide12Impacto() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  // Trigger countup when this slide becomes visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.4) setActive(true);
      });
    }, { threshold: [0, 0.4, 1] });
    // Also activate when the parent .slide gets is-active class
    const parent = el.closest(".slide");
    if (parent) {
      const mo = new MutationObserver(() => {
        if (parent.classList.contains("is-active")) setActive(true);
      });
      mo.observe(parent, { attributes: true, attributeFilter: ["class"] });
      if (parent.classList.contains("is-active")) setActive(true);
      return () => mo.disconnect();
    }
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const ingresoAntes = useCountUp(15_000_000, 1400, active);
  const ingresoDespues = useCountUp(32_400_000, 1800, active);
  const conversionAntes = useCountUp(1.0, 1200, active);
  const conversionDespues = useCountUp(1.8, 1600, active);
  const ticketAntes = useCountUp(150_000, 1200, active);
  const ticketDespues = useCountUp(180_000, 1600, active);
  const liftIngresos = useCountUp(116, 1800, active);

  return (
    <div className="container" ref={ref}>
      <p className="eyebrow reveal-1">Impacto económico · escenario cerrado</p>
      <h2 className="display-m reveal-2" style={{ marginTop: "12px", maxWidth: "22ch" }}>
        Sin tráfico nuevo,
        <br />
        <span className="italic-serif">duplicamos el potencial mensual.</span>
      </h2>

      <div className="deck-grid-2 reveal-3" style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "32px", alignItems: "stretch" }}>
        {/* Métricas detalladas */}
        <div className="card" style={{ padding: "28px 32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                <th style={{ ...mTh }}>Métrica</th>
                <th style={{ ...mTh, textAlign: "right" }}>Antes</th>
                <th style={{ ...mTh, textAlign: "right", color: "var(--color-accent-soft)" }}>Después</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <td style={mTd}>Visitas mensuales</td>
                <td style={{ ...mTd, textAlign: "right", fontWeight: 700 }}>10.000</td>
                <td style={{ ...mTd, textAlign: "right", fontWeight: 700 }}>10.000</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <td style={mTd}>Conversión</td>
                <td style={{ ...mTd, textAlign: "right", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{conversionAntes.toFixed(1)}%</td>
                <td style={{ ...mTd, textAlign: "right", fontWeight: 700, color: "var(--color-accent-soft)", fontVariantNumeric: "tabular-nums" }}>{conversionDespues.toFixed(1)}%</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <td style={mTd}>Ticket promedio</td>
                <td style={{ ...mTd, textAlign: "right", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>${fmt(Math.round(ticketAntes))}</td>
                <td style={{ ...mTd, textAlign: "right", fontWeight: 700, color: "var(--color-accent-soft)", fontVariantNumeric: "tabular-nums" }}>${fmt(Math.round(ticketDespues))}</td>
              </tr>
              <tr>
                <td style={{ ...mTd, fontWeight: 700 }}>Ingresos mensuales</td>
                <td style={{ ...mTd, textAlign: "right", fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>${fmt(Math.round(ingresoAntes))}</td>
                <td style={{ ...mTd, textAlign: "right", fontWeight: 800, color: "var(--color-accent-soft)", fontVariantNumeric: "tabular-nums" }}>${fmt(Math.round(ingresoDespues))}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Big lift */}
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "32px", background: "linear-gradient(135deg, rgba(185,138,110,0.18), rgba(212,175,55,0.06))", borderColor: "rgba(185,138,110,0.4)" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 800, color: "var(--color-accent-soft)", margin: 0 }}>
            Crecimiento en ingresos
          </p>
          <p style={{ fontSize: "clamp(56px, 9vw, 112px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, margin: "12px 0 8px", color: "#fff", fontVariantNumeric: "tabular-nums" }}>
            +{Math.round(liftIngresos)}<span style={{ color: "var(--color-accent-soft)" }}>%</span>
          </p>
          <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.5 }}>
            +$17.4M COP/mes con el mismo tráfico. Solo mejorando dos palancas: <strong style={{ color: "#fff" }}>conversión</strong> y <strong style={{ color: "#fff" }}>ticket promedio</strong>.
          </p>
        </div>
      </div>

      <p className="reveal-4" style={{ marginTop: "20px", fontSize: "11px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>
        Escenario conservador. Las mejoras integrales (mobile, copy, confianza, bundles) pueden llevarlo a +178%.
      </p>
    </div>
  );
}

const mTh: React.CSSProperties = {
  padding: "10px 8px 16px",
  fontSize: "10.5px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 800,
  color: "rgba(255,255,255,0.5)",
  textAlign: "left",
};
const mTd: React.CSSProperties = {
  padding: "14px 8px",
};
