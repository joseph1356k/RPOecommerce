"use client";

const PAYMENTS = ["VISA", "Mastercard", "AmEx", "PSE", "Bancolombia", "Addi", "Sistecrédito"];

const TRUST = [
  {
    title: "Pagos seguros",
    desc: "Procesados con cifrado SSL en pasarela certificada.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Envíos rápidos",
    desc: "Despachos en 24-48h y gratis desde $500.000.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" /><path d="M16 8h4l3 3v5h-7" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Cambios fáciles",
    desc: "Cambios y devoluciones en 15 días, sin preguntas.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    title: "Hecho en Colombia",
    desc: "Diseño y producción local con materiales premium.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21s-7-5.5-7-12a7 7 0 0 1 14 0c0 6.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
];

export default function PaymentsBanner() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-surface)",
        padding: "clamp(56px, 8vw, 88px) clamp(16px, 4vw, 32px)",
        borderTop: "1px solid var(--color-ink-20)",
      }}
    >
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
        {/* Trust badges */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "clamp(16px, 2vw, 32px)",
            marginBottom: "clamp(40px, 5vw, 64px)",
          }}
        >
          {TRUST.map((t) => (
            <div key={t.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  border: "1px solid var(--color-ink-20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "var(--color-fg)",
                }}
              >
                {t.icon}
              </div>
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 800, margin: "2px 0 4px" }}>{t.title}</h4>
                <p style={{ fontSize: "13px", color: "var(--color-ink-60)", margin: 0, lineHeight: 1.5 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="divider" />

        {/* Payment methods */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(20px, 3vw, 40px)",
            flexWrap: "wrap",
            paddingTop: "clamp(28px, 4vw, 40px)",
          }}
        >
          <p
            style={{
              fontSize: "11.5px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-ink-60)",
              margin: 0,
            }}
          >
            Métodos de pago
          </p>
          {PAYMENTS.map((p) => (
            <span
              key={p}
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--color-fg)",
                letterSpacing: "0.04em",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
