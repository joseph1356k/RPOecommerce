"use client";
import { useEffect, useRef, useState } from "react";

export type TierKey = "sport" | "move" | "icon";

export const TIERS: Record<TierKey, {
  label: string;
  tagline: string;
  accent: string;
  ring: string;
}> = {
  sport: {
    label: "RPO Sport",
    tagline: "Bienvenida al movimiento.",
    accent: "#E8DBCF",
    ring: "linear-gradient(135deg, #f5ede2 0%, #d8c3ad 50%, #f5ede2 100%)",
  },
  move: {
    label: "RPO Move",
    tagline: "Eres parte del ritmo.",
    accent: "#B98A6E",
    ring: "linear-gradient(135deg, #d3a585 0%, #8d5e42 50%, #d3a585 100%)",
  },
  icon: {
    label: "RPO Icon",
    tagline: "Top tier. Top wardrobe.",
    accent: "#D4AF37",
    ring: "linear-gradient(135deg, #f4d97c 0%, #b8902a 50%, #f4d97c 100%)",
  },
};

interface Props {
  name?: string;
  tier?: TierKey;
}

function memberId(name: string) {
  // Deterministic 8-digit ID from name
  let h = 5381;
  for (let i = 0; i < name.length; i++) {
    h = ((h << 5) + h + name.charCodeAt(i)) >>> 0;
  }
  return `RPO-${String(h).padStart(8, "0").slice(0, 8)}`;
}

export default function MembershipCard({ name = "Tu Nombre", tier = "sport" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const T = TIERS[tier];
  const id = memberId(name || "Tu Nombre");
  const today = new Date().toLocaleDateString("es-CO", { month: "long", year: "numeric" });

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({
      rx: (0.5 - y) * 12, // tilt X
      ry: (x - 0.5) * 16, // tilt Y
      mx: x * 100,
      my: y * 100,
    });
  }

  function onLeave() {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
  }

  return (
    <div
      style={{
        perspective: "1200px",
        width: "100%",
        maxWidth: "440px",
        aspectRatio: "1.586 / 1", // standard ID card ratio
      }}
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: "20px",
          padding: "2px",
          background: T.ring,
          boxShadow: "0 30px 80px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.25)",
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 280ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #1a1612 50%, #0a0a0a 100%)",
            color: "#fff",
            padding: "clamp(18px, 4%, 28px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          {/* Holographic shine */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "18px",
              pointerEvents: "none",
              background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%,
                rgba(255,255,255,0.18) 0%,
                rgba(255,255,255,0.06) 18%,
                rgba(255,255,255,0) 40%),
                linear-gradient(${110 + tilt.ry * 3}deg,
                  transparent 35%,
                  rgba(212,175,55,0.10) 45%,
                  rgba(255,255,255,0.18) 50%,
                  rgba(212,175,55,0.10) 55%,
                  transparent 65%)`,
              mixBlendMode: "screen",
              transition: "background 200ms ease",
            }}
          />

          {/* Subtle grain */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "18px",
              pointerEvents: "none",
              opacity: 0.08,
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            }}
          />

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 2 }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.32em", margin: 0, opacity: 0.7 }}>
                R · P · O
              </p>
              <p style={{ fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.22em", margin: "2px 0 0", opacity: 0.55 }}>
                MEMBERSHIP
              </p>
            </div>
            <div
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: T.accent,
                border: `1px solid ${T.accent}`,
                padding: "4px 10px",
                borderRadius: "999px",
              }}
            >
              {T.label.toUpperCase()}
            </div>
          </div>

          {/* Body */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <p
              style={{
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                margin: 0,
                opacity: 0.55,
                textTransform: "uppercase",
              }}
            >
              Member
            </p>
            <p
              style={{
                fontSize: "clamp(20px, 4.2vw, 26px)",
                fontWeight: 800,
                letterSpacing: "-0.005em",
                margin: "4px 0 0",
                lineHeight: 1.1,
                fontStyle: "italic",
                fontFamily: "'Trirong', serif",
              }}
            >
              {name || "Tu Nombre"}
            </p>
            <p
              style={{
                fontSize: "11.5px",
                margin: "8px 0 0",
                opacity: 0.65,
                fontStyle: "italic",
              }}
            >
              {T.tagline}
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              position: "relative",
              zIndex: 2,
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              opacity: 0.7,
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: "8.5px", opacity: 0.6, letterSpacing: "0.22em" }}>MEMBER ID</p>
              <p style={{ margin: "3px 0 0", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", letterSpacing: "0.04em" }}>
                {id}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: "8.5px", opacity: 0.6, letterSpacing: "0.22em" }}>SINCE</p>
              <p style={{ margin: "3px 0 0", textTransform: "capitalize" }}>{today}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
