"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const PROPS = [
  {
    label: "Elasticidad 4-way",
    value: "Hasta 80% de estiramiento en cualquier dirección.",
  },
  {
    label: "Rango de tallas",
    value: "Diseñado para cuerpos 36–42 (S a XL).",
  },
  {
    label: "Compresión",
    value: "Suave a media. Sostiene sin apretar.",
  },
  {
    label: "Horma",
    value: "Pretina alta que moldea cintura y caderas.",
  },
];

export default function TallaUnica() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "var(--color-surface)",
        padding: "clamp(72px, 10vw, 120px) clamp(16px, 4vw, 32px)",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "center",
        }}
        className="talla-grid"
      >
        {/* Image */}
        <div
          className="reveal"
          style={{
            position: "relative",
            aspectRatio: "4/5",
            borderRadius: "6px",
            overflow: "hidden",
            backgroundColor: "var(--color-surface-2)",
          }}
        >
          <Image
            src="/images/products/esencia-enterizo-largo-h.jpg"
            alt="Ajuste talla única RPO"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Copy */}
        <div>
          <p className="eyebrow reveal">Talla única, fit real</p>
          <h2 className="section-title reveal" style={{ marginTop: 6 }}>
            Pensado para adaptarse a ti, no al revés.
          </h2>
          <p
            className="reveal"
            style={{
              fontSize: "clamp(14px, 1.2vw, 16px)",
              color: "var(--color-ink-60)",
              lineHeight: 1.7,
              margin: "16px 0 28px",
              maxWidth: "52ch",
            }}
          >
            Nuestra talla única no es un atajo: es un sistema. Tejidos de alto rendimiento, compresión calibrada y horma favorecedora que se adapta a distintos cuerpos sin sacrificar comodidad, soporte ni estilo.
          </p>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 32px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px 28px",
            }}
          >
            {PROPS.map((p, i) => (
              <li key={p.label} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <p
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                    margin: 0,
                  }}
                >
                  {p.label}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--color-fg)",
                    margin: "4px 0 0",
                    lineHeight: 1.5,
                  }}
                >
                  {p.value}
                </p>
              </li>
            ))}
          </ul>

          <div className="reveal" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="/pages/guia-de-ajuste" className="btn btn--primary">
              Ver guía de ajuste
            </a>
            <a href="/pages/devoluciones" className="btn btn--ghost">
              Cambios fáciles en 15 días
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
