"use client";

export default function Slide02Tesis() {
  return (
    <div className="container deck-bg-warm" style={{ position: "relative" }}>
      <p className="eyebrow reveal-1">Tesis</p>
      <h2 className="display-l reveal-2" style={{ marginTop: "20px", maxWidth: "20ch" }}>
        El reto de RPO no es una página
        <br />
        <span className="italic-serif">más bonita.</span>
      </h2>
      <h2 className="display-m reveal-3" style={{ marginTop: "28px", maxWidth: "22ch", color: "rgba(255,255,255,0.92)" }}>
        Es construir una <strong style={{ color: "var(--color-accent-soft)", fontWeight: 800 }}>experiencia de marca</strong> que venda confianza, estilo y movimiento <em>antes</em> de vender una prenda.
      </h2>
      <p className="lede reveal-4" style={{ marginTop: "32px" }}>
        Y que esté lista para el siguiente capítulo del comercio digital: cuando los agentes de IA empiecen a recomendar y a comprar por la usuaria.
      </p>
    </div>
  );
}
