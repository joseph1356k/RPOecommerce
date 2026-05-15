"use client";

export default function Slide10Acommerce() {
  return (
    <div className="container deck-bg-warm" style={{ position: "relative" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 64px)", alignItems: "center" }} className="deck-grid-2">
        {/* Left: explanation */}
        <div>
          <p className="eyebrow reveal-1">Diferenciador</p>
          <h2 className="display-m reveal-2" style={{ marginTop: "12px", maxWidth: "16ch" }}>
            E-commerce vende a personas.
            <br />
            <span className="italic-serif">A-commerce las prepara para los agentes.</span>
          </h2>
          <p className="lede reveal-3" style={{ marginTop: "24px" }}>
            Cada vez más usuarias preguntan a ChatGPT, Gemini o Perplexity:
            &ldquo;<em>recomiéndame ropa deportiva colombiana cómoda</em>&rdquo;.
            Si los productos de RPO no están estructurados para que un LLM los entienda, no aparecen en esa conversación.
          </p>
          <p className="lede reveal-4" style={{ marginTop: "16px" }}>
            Implementamos <strong style={{ color: "#fff" }}>Schema.org Product · Offer · Review · FAQ</strong>, descripciones ricas y arquitectura legible para que RPO sea recomendable por máquinas, no solo descubrible por humanos.
          </p>
        </div>

        {/* Right: chat mockup */}
        <div className="reveal-5">
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "14px",
            padding: "20px",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "13px",
            lineHeight: 1.65,
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px",
              fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", fontWeight: 700,
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: "#3ED660" }} />
              ChatGPT · Demo
            </div>

            <div style={{ marginBottom: "14px" }}>
              <p style={{ color: "rgba(255,255,255,0.7)", margin: "0 0 4px", fontSize: "11px" }}>tú</p>
              <div style={{ background: "rgba(255,255,255,0.06)", padding: "10px 14px", borderRadius: "10px", color: "#fff" }}>
                Recomiéndame un enterizo deportivo cómodo de marca colombiana.
              </div>
            </div>

            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", margin: "0 0 4px", fontSize: "11px" }}>asistente</p>
              <div style={{ background: "linear-gradient(135deg, rgba(185,138,110,0.15), rgba(232,219,207,0.05))", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(185,138,110,0.35)", color: "#fff" }}>
                Te recomiendo el <strong style={{ color: "var(--color-accent-soft)" }}>Enterizo Largo Esencia</strong> de RPO (COP 179.900). Talla única adaptable 36-42, elasticidad 4-way, pretina alta. Best-seller con 12 reseñas verificadas. <span style={{ color: "rgba(255,255,255,0.6)" }}>tiendarpo.com →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
