"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const BENEFITS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z" />
      </svg>
    ),
    title: "Acceso anticipado",
    desc: "Compra las nuevas colecciones antes que nadie y asegura tus favoritos.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.59 13.41 13.41 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" /><circle cx="7" cy="7" r="1.5" />
      </svg>
    ),
    title: "Promociones privadas",
    desc: "Descuentos exclusivos para socias, todo el año.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M2 6v12a2 2 0 0 0 2 2h16v-4" /><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4z" />
      </svg>
    ),
    title: "Beneficios por recompra",
    desc: "Acumula puntos en cada pedido y canjéalos por descuentos.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Regalo de cumpleaños",
    desc: "Una sorpresa especial para celebrar tu mes contigo.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Comunidad RPO",
    desc: "Eventos privados, inspiración y experiencias en tienda física.",
  },
];

export default function RpoClub() {
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
        position: "relative",
        backgroundColor: "#0a0a0a",
        color: "#fff",
        overflow: "hidden",
        padding: "clamp(48px, 6vw, 80px) clamp(16px, 4vw, 32px)",
      }}
    >
      {/* Faint background image */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
        }}
      >
        <Image src="/images/hero/slide-2-alt.jpg" alt="" fill style={{ objectFit: "cover" }} />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.95) 100%)",
        }}
      />

      <div style={{ position: "relative", maxWidth: "1180px", margin: "0 auto", textAlign: "center" }}>
        <p className="eyebrow reveal" style={{ color: "var(--color-accent-soft)" }}>RPO Club · Membresía gratuita</p>
        <h2
          className="section-title reveal"
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            color: "#fff",
            margin: "12px auto 16px",
            maxWidth: "20ch",
            fontWeight: 800,
          }}
        >
          Haz parte de RPO Club.
        </h2>
        <p
          className="reveal"
          style={{
            color: "rgba(255,255,255,0.78)",
            fontSize: "clamp(14px, 1.3vw, 17px)",
            maxWidth: "62ch",
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          Beneficios exclusivos para mujeres que viven la marca más allá de una compra. Acceso anticipado, experiencias y recompensas pensadas para ti.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "clamp(12px, 1.5vw, 20px)",
            marginBottom: "clamp(28px, 4vw, 44px)",
            textAlign: "left",
          }}
        >
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className="reveal"
              style={{
                padding: "28px 24px",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "6px",
                backgroundColor: "rgba(255,255,255,0.025)",
                transitionDelay: `${i * 70}ms`,
                transition:
                  "background 220ms cubic-bezier(0.22,1,0.36,1), border-color 220ms cubic-bezier(0.22,1,0.36,1), opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.025)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            >
              <div style={{ color: "var(--color-accent-soft)", marginBottom: "16px" }}>{b.icon}</div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 6px", letterSpacing: "0.01em" }}>{b.title}</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.55 }}>{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <a
            href="/pages/rpo-club"
            className="btn"
            style={{
              background: "#fff",
              color: "#000",
              padding: "16px 36px",
              fontSize: "13px",
            }}
          >
            Quiero ser parte de RPO Club
          </a>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", margin: 0 }}>
            Registro 100% gratis · Sin permanencia · Cancela cuando quieras
          </p>
        </div>
      </div>
    </section>
  );
}
