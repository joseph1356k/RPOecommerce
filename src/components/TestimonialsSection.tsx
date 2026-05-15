"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TESTIMONIALS = [
  { image: "/images/products/real/enterizo-largo-h-cute.jpg",  text: "El ajuste es perfecto. Se siente como segunda piel.",     author: "Laura M.",     city: "Medellín" },
  { image: "/images/products/real/enterizo-alie-esencia.jpg",  text: "Calidad real. Nada transparente, no se baja al entrenar.", author: "Catalina R.",  city: "Medellín" },
  { image: "/images/products/real/set-rossy-esencia.jpg",      text: "Lo uso para entrenar y para salir. Es mi nuevo básico.",   author: "Daniela P.",   city: "Cali" },
  { image: "/images/products/real/leggings-aline-prisma.jpg",  text: "Tela suave, costuras planas, sin marcas. Repito sin dudar.", author: "Sara V.",   city: "Rionegro" },
  { image: "/images/products/real/enterizo-largo-esencia.jpg", text: "Me favorece muchísimo la silueta. Súper recomendado.",     author: "Manuela G.",   city: "Cali" },
  { image: "/images/products/real/top-flux.jpg",               text: "La horma es lo mejor. Nunca había tenido un legging así.", author: "Valentina O.", city: "Medellín" },
];

export default function TestimonialsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // Desktop slider variables
  const visibleCount = 4;
  const maxOffset = Math.max(0, TESTIMONIALS.length - visibleCount);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Track active card on mobile while user scrolls
  useEffect(() => {
    if (!isMobile || !scrollerRef.current) return;
    const el = scrollerRef.current;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!el) return;
        // each card is ~85% of viewport; pick the one whose left edge is closest to 0
        const children = Array.from(el.children) as HTMLElement[];
        let best = 0, bestDist = Infinity;
        for (let i = 0; i < children.length; i++) {
          const left = children[i].offsetLeft - el.scrollLeft;
          const d = Math.abs(left - 16); // 16px gutter
          if (d < bestDist) { bestDist = d; best = i; }
        }
        if (best !== active) setActive(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isMobile, active]);

  return (
    <section
      style={{
        padding: "clamp(32px, 4vw, 56px) 0",
        backgroundColor: "var(--color-surface)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 32px) 20px",
        }}
      >
        <p className="eyebrow">Comunidad RPO</p>
        <h2 className="section-title">Lo que dicen las mujeres que ya nos usan.</h2>
        <p className="section-lede" style={{ marginTop: 10 }}>
          Más de 5.000 clientas en Colombia confían en RPO para entrenar, descansar y verse bien.
        </p>
      </div>

      {isMobile ? (
        // ────────── MOBILE: native scroll-snap carousel ──────────
        <>
          <div
            ref={scrollerRef}
            style={{
              display: "flex",
              gap: "12px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollPaddingLeft: "16px",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              padding: "4px 16px 16px",
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <article
                key={i}
                style={{
                  // 85% viewport so the next card peeks → signals swipeability
                  flex: "0 0 85%",
                  scrollSnapAlign: "start",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                  display: "grid",
                  gridTemplateColumns: "110px 1fr",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "110px",
                    aspectRatio: "3/4",
                    backgroundColor: "var(--color-surface-2)",
                  }}
                >
                  <Image
                    src={t.image}
                    alt={`Reseña de ${t.author}`}
                    fill
                    sizes="110px"
                    style={{ objectFit: "cover", objectPosition: "center 30%" }}
                  />
                </div>
                <div
                  style={{
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minWidth: 0,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <svg key={idx} width="11" height="11" viewBox="0 0 24 24" fill="#000">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                        </svg>
                      ))}
                    </div>
                    <p
                      style={{
                        fontSize: "12.5px",
                        color: "var(--color-fg)",
                        margin: 0,
                        lineHeight: 1.45,
                        fontWeight: 500,
                        // clamp to 3 lines so cards keep a consistent height
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      “{t.text}”
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "var(--color-ink-60)",
                      margin: "10px 0 0",
                      letterSpacing: "0.04em",
                      fontWeight: 600,
                    }}
                  >
                    — {t.author}{t.city ? ` · ${t.city}` : ""}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Progress dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "5px",
              marginTop: "4px",
            }}
          >
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir a reseña ${i + 1}`}
                onClick={() => {
                  const el = scrollerRef.current;
                  if (!el) return;
                  const child = el.children[i] as HTMLElement | undefined;
                  if (child) el.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
                }}
                style={{
                  width: "28px",
                  height: "28px",
                  padding: 0,
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    display: "block",
                    width: i === active ? "22px" : "6px",
                    height: "4px",
                    borderRadius: "999px",
                    backgroundColor: i === active ? "var(--color-fg)" : "var(--color-ink-20)",
                    transition: "all 280ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
              </button>
            ))}
          </div>
        </>
      ) : (
        // ────────── DESKTOP: classic 4-up slider with arrows ──────────
        <div style={{ position: "relative", padding: "0 16px" }}>
          <button
            type="button"
            onClick={() => setOffset(Math.max(0, offset - 1))}
            disabled={offset === 0}
            aria-label="Anterior"
            style={arrowStyle("left", offset === 0)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div
            style={{
              display: "flex",
              gap: "16px",
              transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
              transform: `translateX(calc(-${offset * (100 / visibleCount)}% - ${offset * 16}px))`,
              padding: "0 60px",
              maxWidth: "1500px",
              margin: "0 auto",
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <article
                key={i}
                className="lift"
                style={{
                  minWidth: `calc(${100 / visibleCount}% - ${(16 * (visibleCount - 1)) / visibleCount}px)`,
                  flexShrink: 0,
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ aspectRatio: "1", overflow: "hidden", position: "relative" }}>
                  <Image
                    src={t.image}
                    alt={`Reseña de ${t.author}`}
                    width={320}
                    height={320}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
                  />
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <svg key={idx} width="12" height="12" viewBox="0 0 24 24" fill="#000">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize: "13.5px", color: "var(--color-fg)", margin: "0 0 12px", lineHeight: 1.55, fontWeight: 500 }}>
                    “{t.text}”
                  </p>
                  <p style={{ fontSize: "11.5px", color: "var(--color-ink-60)", margin: 0, letterSpacing: "0.04em", fontWeight: 600 }}>
                    — {t.author}{t.city ? ` · ${t.city}` : ""}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOffset(Math.min(maxOffset, offset + 1))}
            disabled={offset === maxOffset}
            aria-label="Siguiente"
            style={arrowStyle("right", offset === maxOffset)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

function arrowStyle(side: "left" | "right", disabled: boolean): React.CSSProperties {
  return {
    position: "absolute",
    [side]: "16px",
    top: "calc(50% - 24px)",
    transform: "translateY(-50%)",
    zIndex: 10,
    backgroundColor: "#fff",
    border: "1px solid var(--color-fg)",
    borderRadius: "50%",
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.3 : 1,
    transition: "opacity 200ms",
  };
}
