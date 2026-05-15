"use client";

const STEPS = [
  {
    n: "01",
    title: "Activa tu carnet",
    desc: "Solo tu nombre y correo. En segundos eres parte de RPO Sport con un código de bienvenida del 10%.",
  },
  {
    n: "02",
    title: "Suma con cada movimiento",
    desc: "Cada compra suma puntos canjeables. Cada pedido te acerca al siguiente nivel: Move (3+) o Icon (8+).",
  },
  {
    n: "03",
    title: "Recibe lo que la marca da primero",
    desc: "Acceso anticipado a colecciones, eventos privados, asesoría 1:1 y un regalo en tu cumpleaños.",
  },
];

export default function HowItWorks() {
  return (
    <section
      style={{
        padding: "clamp(48px, 6vw, 80px) clamp(16px, 4vw, 32px)",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <header style={{ marginBottom: "clamp(28px, 3.5vw, 48px)", maxWidth: "640px" }}>
          <p className="eyebrow">Cómo funciona</p>
          <h2 className="section-title">Tres pasos. Cero fricción.</h2>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "clamp(20px, 3vw, 40px)",
          }}
        >
          {STEPS.map((s) => (
            <article key={s.n} style={{ position: "relative", paddingTop: "8px" }}>
              <p
                style={{
                  fontFamily: "'Trirong', serif",
                  fontWeight: 200,
                  fontStyle: "italic",
                  fontSize: "clamp(56px, 7vw, 84px)",
                  margin: 0,
                  lineHeight: 1,
                  color: "var(--color-accent)",
                  letterSpacing: "-0.04em",
                }}
              >
                {s.n}
              </p>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  margin: "16px 0 8px",
                  letterSpacing: "-0.005em",
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-ink-60)", lineHeight: 1.6, margin: 0 }}>
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
