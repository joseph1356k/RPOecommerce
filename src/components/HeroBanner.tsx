"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const SLIDES = [
  { image: "/images/hero/slide-1.jpg", alt: "RPO Colección" },
  { image: "/images/hero/slide-2.jpg", alt: "RPO Colección 2" },
  { image: "/images/hero/slide-3.jpg", alt: "RPO Colección 3" },
  { image: "/images/hero/slide-4.jpg", alt: "RPO Colección 4" },
];

const PROMO_TEXT = {
  top: "¡Solo por",
  highlight: "24 HORAS!",
  main: "TE OBSEQUIAMOS",
  sub: "ENVÍO GRATIS",
  note: "*Oferta válida del 14 al 15 de mayo\nAplica en canales digitales.",
};

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ position: "relative", width: "100%", height: "calc(100vh - 34px - 64px)", minHeight: "500px", overflow: "hidden" }}>
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.8s ease",
            zIndex: i === current ? 1 : 0,
          }}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority={i === 0}
          />
        </div>
      ))}

      {/* Promo overlay text */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          color: "#fff",
          textAlign: "right",
          maxWidth: "500px",
        }}
      >
        <p style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 400, margin: 0, lineHeight: 1.2 }}>
          {PROMO_TEXT.top}
        </p>
        <p style={{ fontSize: "clamp(48px, 6vw, 88px)", fontWeight: 800, margin: 0, lineHeight: 1 }}>
          {PROMO_TEXT.highlight}
        </p>
        <p style={{ fontSize: "clamp(20px, 2.5vw, 36px)", fontWeight: 400, margin: "16px 0 0", lineHeight: 1.1 }}>
          {PROMO_TEXT.main}
        </p>
        <p style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 800, margin: 0, lineHeight: 1 }}>
          {PROMO_TEXT.sub}
        </p>
        <p style={{ fontSize: "clamp(11px, 1.2vw, 16px)", fontWeight: 400, margin: "16px 0 0", lineHeight: 1.5, whiteSpace: "pre-line" }}>
          {PROMO_TEXT.note}
        </p>
      </div>

      {/* RPO logo overlay */}
      <div style={{ position: "absolute", bottom: "24px", left: "24px", zIndex: 10 }}>
        <Image src="/images/logo-white.png" alt="RPO" width={100} height={32} style={{ objectFit: "contain" }} />
      </div>

      {/* Slide dots */}
      <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", gap: "8px" }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.5)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}
