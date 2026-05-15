"use client";
import { useMemo, useState } from "react";

const SPENDING_PRESETS = [
  { value: 600_000, label: "1 prenda al mes", note: "≈ $600.000 al año" },
  { value: 1_500_000, label: "Compra estacional", note: "≈ $1.500.000 al año" },
  { value: 3_000_000, label: "Wardrobe lover", note: "≈ $3.000.000 al año" },
];

function fmt(n: number) {
  return n.toLocaleString("es-CO");
}

export default function BenefitCalculator() {
  const [annual, setAnnual] = useState(SPENDING_PRESETS[1].value);

  const result = useMemo(() => {
    // Tier rule: <800k Sport, <2M Move, ≥2M Icon
    const tier = annual < 800_000 ? "sport" : annual < 2_000_000 ? "move" : "icon";
    const pointsRate = tier === "sport" ? 1 : tier === "move" ? 1.5 : 2;
    const points = Math.round((annual / 1000) * pointsRate);
    const pointsCOP = points * 50; // 1 punto = $50 COP de descuento canjeable
    const shippingSaved =
      tier === "sport"
        ? Math.max(0, Math.floor(annual / 400_000)) * 12_000
        : Math.max(0, Math.floor(annual / 100_000)) * 12_000;
    const promoSavings = tier === "sport" ? annual * 0.05 : tier === "move" ? annual * 0.10 : annual * 0.14;
    const birthdayGift = tier === "sport" ? 30_000 : tier === "move" ? 60_000 : 120_000;
    const total = pointsCOP + shippingSaved + promoSavings + birthdayGift;
    const tierLabel = tier === "sport" ? "RPO Sport" : tier === "move" ? "RPO Move" : "RPO Icon";
    return { tier, tierLabel, points, pointsCOP, shippingSaved, promoSavings, birthdayGift, total };
  }, [annual]);

  return (
    <section
      style={{
        backgroundColor: "var(--color-surface)",
        padding: "clamp(48px, 6vw, 80px) clamp(16px, 4vw, 32px)",
      }}
    >
      <div
        className="calc-grid"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(28px, 4vw, 56px)",
          alignItems: "center",
        }}
      >
        <div>
          <p className="eyebrow">Calcula tu beneficio</p>
          <h2 className="section-title">Cuánto gana RPO Club por ti.</h2>
          <p className="section-lede" style={{ marginTop: 12, marginBottom: "28px" }}>
            Mueve la barra a tu nivel de compra anual estimado. Te mostramos exactamente cuánto recuperas en puntos, envíos, promociones privadas y regalo de cumpleaños.
          </p>

          {/* Slider */}
          <label style={{ display: "block", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-fg)" }}>
                Compra anual estimada
              </span>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--color-accent)" }}>
                ${fmt(annual)}
              </span>
            </div>
            <input
              type="range"
              min={300_000}
              max={5_000_000}
              step={50_000}
              value={annual}
              onChange={(e) => setAnnual(Number(e.target.value))}
              style={{
                width: "100%",
                appearance: "none",
                WebkitAppearance: "none",
                height: "4px",
                borderRadius: "999px",
                background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${
                  ((annual - 300_000) / (5_000_000 - 300_000)) * 100
                }%, var(--color-ink-20) ${((annual - 300_000) / (5_000_000 - 300_000)) * 100}%)`,
                cursor: "pointer",
                outline: "none",
              }}
            />
            <style>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                background: #0a0a0a;
                border: 3px solid #fff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.25);
                cursor: pointer;
              }
              input[type="range"]::-moz-range-thumb {
                width: 22px;
                height: 22px;
                border-radius: 50%;
                background: #0a0a0a;
                border: 3px solid #fff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.25);
                cursor: pointer;
              }
            `}</style>
          </label>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {SPENDING_PRESETS.map((p) => (
              <button
                key={p.value}
                type="button"
                className={`chip ${annual === p.value ? "chip--active" : ""}`}
                onClick={() => setAnnual(p.value)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result panel */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid var(--color-ink-20)",
            borderRadius: "12px",
            padding: "clamp(24px, 3vw, 36px)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <p style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.18em", color: "var(--color-accent)", margin: "0 0 8px", textTransform: "uppercase" }}>
            Tu nivel estimado
          </p>
          <h3 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.01em" }}>
            {result.tierLabel}
          </h3>
          <p style={{ fontSize: "13px", color: "var(--color-ink-60)", margin: "0 0 24px" }}>
            Recuperas en beneficios reales:
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <Row label={`${fmt(result.points)} puntos canjeables`} value={`$${fmt(result.pointsCOP)}`} />
            <Row label="Ahorro en envíos al año" value={`$${fmt(result.shippingSaved)}`} />
            <Row label="Promociones privadas" value={`$${fmt(Math.round(result.promoSavings))}`} />
            <Row label="Regalo de cumpleaños" value={`$${fmt(result.birthdayGift)}`} />
          </ul>

          <div
            style={{
              borderTop: "1px solid var(--color-ink-20)",
              paddingTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "13px", margin: 0, color: "var(--color-ink-60)", fontWeight: 600 }}>
              Beneficio total al año
            </p>
            <p
              style={{
                fontSize: "30px",
                fontWeight: 800,
                margin: 0,
                color: "var(--color-fg)",
                letterSpacing: "-0.02em",
              }}
            >
              ${fmt(Math.round(result.total))}
            </p>
          </div>

          <a href="#join" className="btn btn--primary" style={{ width: "100%", marginTop: "20px" }}>
            Quiero ese beneficio
          </a>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontSize: "13.5px", color: "var(--color-fg)" }}>{label}</span>
      <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-fg)" }}>{value}</span>
    </li>
  );
}
