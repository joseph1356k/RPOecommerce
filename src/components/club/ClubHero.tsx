"use client";
import { useState } from "react";
import MembershipCard, { type TierKey } from "./MembershipCard";
import { track } from "@/lib/tracking";

export default function ClubHero() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const tier: TierKey = "sport"; // everyone starts here

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.includes("@")) return;
    track("rpo_club_signup", { source: "club_hero", tier });
    setSubmitted(true);
  }

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "#0a0a0a",
        color: "#fff",
        overflow: "hidden",
        padding: "clamp(56px, 7vw, 96px) clamp(16px, 4vw, 32px)",
      }}
    >
      {/* Soft warm radial backdrop */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(185, 138, 110, 0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(212, 175, 55, 0.10) 0%, transparent 60%)",
        }}
      />

      <div
        className="club-hero-grid"
        style={{
          position: "relative",
          maxWidth: "1240px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
          gap: "clamp(32px, 5vw, 80px)",
          alignItems: "center",
        }}
      >
        {/* Copy + form */}
        <div>
          <p className="eyebrow" style={{ color: "var(--color-accent-soft)" }}>
            RPO Club · Membresía gratuita
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 5.2vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: "10px 0 18px",
              maxWidth: "12ch",
            }}
          >
            La marca,
            <br />
            <em
              style={{
                fontFamily: "'Trirong', serif",
                fontWeight: 200,
                fontStyle: "italic",
                color: "var(--color-accent-soft)",
              }}
            >
              en tu nombre.
            </em>
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 1.3vw, 17px)",
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.65,
              margin: "0 0 32px",
              maxWidth: "44ch",
            }}
          >
            Tu carnet RPO Club existe. Solo le falta tu nombre. Acceso anticipado, puntos en cada compra, regalos de cumpleaños y eventos privados pensados para ti.
          </p>

          {submitted ? (
            <div
              style={{
                padding: "20px 24px",
                border: "1px solid rgba(232, 219, 207, 0.35)",
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.04)",
                maxWidth: "420px",
              }}
            >
              <p style={{ margin: 0, fontSize: "13px", color: "var(--color-accent-soft)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                ✓ Bienvenida, {name.split(" ")[0]}
              </p>
              <p style={{ margin: "8px 0 0", fontSize: "14px", color: "rgba(255,255,255,0.78)", lineHeight: 1.55 }}>
                Te enviamos a <strong>{email}</strong> tu código de bienvenida del 10% y los detalles de tu carnet RPO Sport.
              </p>
            </div>
          ) : (
            <form
              id="join"
              onSubmit={onSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxWidth: "420px",
              }}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                aria-label="Tu nombre"
                style={inputStyle}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                aria-label="Tu correo"
                style={inputStyle}
              />
              <button
                type="submit"
                className="btn"
                style={{
                  background: "#fff",
                  color: "#000",
                  padding: "16px",
                  marginTop: "4px",
                }}
              >
                Activar mi membresía
              </button>
              <p
                style={{
                  fontSize: "11.5px",
                  color: "rgba(255,255,255,0.5)",
                  margin: "4px 0 0",
                  lineHeight: 1.5,
                }}
              >
                Gratis · Sin permanencia · Cancela cuando quieras
              </p>
            </form>
          )}
        </div>

        {/* Live membership card */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MembershipCard name={name.trim() || "Tu Nombre"} tier={tier} />
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "16px 18px",
  backgroundColor: "transparent",
  border: "1px solid rgba(255,255,255,0.25)",
  color: "#fff",
  fontSize: "14px",
  borderRadius: "4px",
  outline: "none",
  fontFamily: "inherit",
};
