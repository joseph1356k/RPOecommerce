"use client";
import { useEffect, useState } from "react";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

/**
 * Persuasive urgency banner shown on every PDP.
 * - Tagged "ultimas-unidades" → strongest message + simulated stock count
 * - Tagged "oferta" → "última oportunidad con descuento"
 * - In stock (default) → soft availability + "stock limitado" rotation
 * - Out of stock → handled separately by BackInStockForm (we render nothing here)
 *
 * Copy: cercano, femenino, no agresivo. "Sutil pero claro".
 */
export default function UrgencyBanner({ product }: Props) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  if (product.inStock === false) return null;

  const isUltimas = product.tags?.includes("ultimas-unidades");
  const isOferta = product.tags?.includes("oferta");
  const isBest = product.tags?.includes("best-seller");

  // Pseudo-random but deterministic stock count from product id
  const seed = product.id.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  const stockLeft = isUltimas ? (seed % 5) + 2 : (seed % 8) + 6;
  const viewersNow = (seed % 9) + 4;

  let primary: string;
  let icon: React.ReactNode;
  let bg: string;
  let fg: string;
  let accent: string;

  if (isUltimas) {
    primary = `🔥 Solo quedan ${stockLeft} unidades · Compra antes de que se agoten`;
    icon = null;
    bg = "linear-gradient(135deg, #B95E3C 0%, #8E3F22 100%)";
    fg = "#fff";
    accent = "rgba(255,255,255,0.85)";
  } else if (isOferta) {
    primary = `Última oportunidad con descuento · Stock limitado`;
    bg = "linear-gradient(135deg, #0a0a0a 0%, #1f1612 100%)";
    fg = "#fff";
    accent = "var(--color-accent-soft)";
    icon = (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.59 13.41 13.41 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor" />
      </svg>
    );
  } else if (isBest) {
    primary = `Favorito de la comunidad · Stock limitado`;
    bg = "var(--color-surface)";
    fg = "var(--color-fg)";
    accent = "var(--color-accent)";
    icon = (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z" />
      </svg>
    );
  } else {
    primary = `Quedan pocas unidades · Asegura la tuya`;
    bg = "var(--color-surface)";
    fg = "var(--color-fg)";
    accent = "var(--color-accent)";
    icon = (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 14px",
        borderRadius: "6px",
        background: bg,
        color: fg,
        marginBottom: "16px",
        boxShadow: isUltimas ? "0 4px 16px rgba(185,94,60,0.18)" : "none",
        animation: "fadeUp 380ms cubic-bezier(0.22,1,0.36,1)",
        border: !isUltimas && !isOferta ? "1px solid var(--color-ink-20)" : "none",
      }}
    >
      {icon && (
        <span style={{ color: accent, flexShrink: 0, display: "inline-flex" }} aria-hidden>
          {icon}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: "12.5px", fontWeight: 700, lineHeight: 1.35, letterSpacing: "0.01em" }}>
          {primary}
        </p>
        {now && (
          <p
            style={{
              margin: "2px 0 0",
              fontSize: "11px",
              color: accent,
              fontWeight: 500,
              opacity: isUltimas || isOferta ? 0.85 : 0.75,
            }}
          >
            {viewersNow} personas viendo este producto · Envío gratis desde $500.000
          </p>
        )}
      </div>
    </div>
  );
}
