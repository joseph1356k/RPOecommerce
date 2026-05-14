"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type Slide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

const SLIDES: Slide[] = [
  {
    image: "/images/hero/slide-1.jpg",
    alt: "Colección Esencia RPO",
    eyebrow: "Nueva colección · Esencia",
    title: "Movimiento que se siente como tuyo.",
    subtitle: "Prendas que moldean, sostienen y te acompañan del entrenamiento al día a día.",
    ctaLabel: "Descubrir Esencia",
    ctaHref: "/collections/esencia-by-dany-osorno",
  },
  {
    image: "/images/hero/slide-2.jpg",
    alt: "Prisma — diseños protagonistas",
    eyebrow: "Colección Prisma",
    title: "Estilo que entrena, descansa y conquista.",
    subtitle: "Diseños protagonistas con elasticidad multidireccional y horma favorecedora.",
    ctaLabel: "Ver Prisma",
    ctaHref: "/collections/prisma",
  },
  {
    image: "/images/hero/slide-3.jpg",
    alt: "Últimas unidades RPO",
    eyebrow: "Últimas unidades",
    title: "Tus favoritos antes de que se vayan.",
    subtitle: "Piezas seleccionadas con hasta 40% off mientras alcance el inventario.",
    ctaLabel: "Aprovechar ahora",
    ctaHref: "/collections/ultimas-unidades",
  },
  {
    image: "/images/hero/slide-4.jpg",
    alt: "RPO Club — beneficios exclusivos",
    eyebrow: "RPO Club",
    title: "Vive RPO más allá de una compra.",
    subtitle: "Acceso anticipado, beneficios privados y experiencias para nuestra comunidad.",
    ctaLabel: "Quiero ser parte",
    ctaHref: "/pages/rpo-club",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = SLIDES[current];

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 34px - 64px)",
        minHeight: "560px",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 900ms cubic-bezier(0.22, 1, 0.36, 1)",
            zIndex: i === current ? 1 : 0,
          }}
        >
          <Image
            src={s.image}
            alt={s.alt}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              transform: i === current ? "scale(1.02)" : "scale(1)",
              transition: "transform 8000ms ease-out",
            }}
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlay for legibility (subtle, premium) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* Content */}
      <div
        key={`content-${current}`}
        style={{
          position: "absolute",
          left: "clamp(20px, 6vw, 80px)",
          bottom: "clamp(80px, 14vh, 140px)",
          zIndex: 10,
          color: "#fff",
          maxWidth: "640px",
        }}
      >
        <p
          className="fade-up"
          style={{
            fontSize: "12px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 700,
            margin: 0,
            opacity: 0.92,
          }}
        >
          {slide.eyebrow}
        </p>
        <h1
          className="fade-up fade-up-delay-1"
          style={{
            fontSize: "clamp(34px, 5vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            margin: "14px 0 14px",
            maxWidth: "12ch",
          }}
        >
          {slide.title}
        </h1>
        <p
          className="fade-up fade-up-delay-2"
          style={{
            fontSize: "clamp(14px, 1.3vw, 17px)",
            lineHeight: 1.55,
            opacity: 0.92,
            margin: "0 0 28px",
            maxWidth: "44ch",
            fontWeight: 400,
          }}
        >
          {slide.subtitle}
        </p>
        <a
          href={slide.ctaHref}
          className="btn btn--primary fade-up fade-up-delay-3"
          style={{
            background: "#fff",
            color: "#000",
            padding: "16px 36px",
          }}
        >
          {slide.ctaLabel}
        </a>
      </div>

      {/* Slide dots */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: "10px",
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir al slide ${i + 1}`}
            style={{
              width: i === current ? "32px" : "8px",
              height: "8px",
              borderRadius: "999px",
              backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 350ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "24px",
          bottom: "32px",
          zIndex: 10,
          color: "rgba(255,255,255,0.75)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          writingMode: "vertical-rl",
          fontWeight: 600,
        }}
      >
        Scroll
      </div>
    </section>
  );
}
