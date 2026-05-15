"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type Slide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  titleMobile?: string;
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
    titleMobile: "Muévete segura. Vístete con intención.",
    subtitle: "Prendas que moldean, sostienen y te acompañan del entrenamiento al día a día.",
    ctaLabel: "Descubrir Esencia",
    ctaHref: "/catalogo?coleccion=esencia",
  },
  {
    image: "/images/hero/slide-2.jpg",
    alt: "Prisma — diseños protagonistas",
    eyebrow: "Colección Prisma",
    title: "Estilo que entrena, descansa y conquista.",
    titleMobile: "Estilo que entrena y descansa.",
    subtitle: "Diseños protagonistas con elasticidad multidireccional y horma favorecedora.",
    ctaLabel: "Ver Prisma",
    ctaHref: "/catalogo?coleccion=prisma",
  },
  {
    image: "/images/hero/slide-3.jpg",
    alt: "Últimas unidades RPO",
    eyebrow: "Últimas unidades",
    title: "Tus favoritos antes de que se vayan.",
    titleMobile: "Tus favoritos, antes de que se vayan.",
    subtitle: "Piezas seleccionadas con hasta 40% off mientras alcance el inventario.",
    ctaLabel: "Aprovechar ahora",
    ctaHref: "/catalogo?quick=ultimas-unidades",
  },
  {
    image: "/images/hero/slide-4.jpg",
    alt: "RPO Club — beneficios exclusivos",
    eyebrow: "RPO Club",
    title: "Vive RPO más allá de una compra.",
    titleMobile: "Tu lugar en RPO.",
    subtitle: "Acceso anticipado, beneficios privados y experiencias para nuestra comunidad.",
    ctaLabel: "Quiero ser parte",
    ctaHref: "/pages/rpo-club",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = SLIDES[current];

  // Mobile swipe
  function onTouchStart(e: React.TouchEvent) {
    setTouchStart(e.touches[0].clientX);
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStart === null) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 50) {
      setCurrent((c) => (c + (dx < 0 ? 1 : -1) + SLIDES.length) % SLIDES.length);
    }
    setTouchStart(null);
  }

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position: "relative",
        width: "100%",
        // Mobile: 78svh (small viewport unit, accounts for browser UI)
        // Desktop: classic vh-based
        height: isMobile ? "min(78svh, 640px)" : "calc(100vh - 34px - 60px)",
        minHeight: isMobile ? "480px" : "560px",
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
            transition: "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1)",
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
            fetchPriority={i === 0 ? "high" : "auto"}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient — stronger on mobile (bottom-up) for CTA legibility */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: isMobile
            ? "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.10) 35%, rgba(0,0,0,0.85) 100%)"
            : "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* Content */}
      <div
        key={`content-${current}`}
        style={{
          position: "absolute",
          left: isMobile ? "20px" : "clamp(20px, 6vw, 80px)",
          right: isMobile ? "20px" : "auto",
          bottom: isMobile
            ? "calc(80px + env(safe-area-inset-bottom))"
            : "clamp(80px, 14vh, 140px)",
          zIndex: 10,
          color: "#fff",
          maxWidth: isMobile ? "100%" : "640px",
        }}
      >
        <p
          className="fade-up"
          style={{
            fontSize: isMobile ? "11px" : "12px",
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
            fontSize: isMobile ? "clamp(28px, 8vw, 38px)" : "clamp(34px, 5vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            margin: isMobile ? "10px 0 12px" : "14px 0 14px",
            maxWidth: isMobile ? "16ch" : "12ch",
          }}
        >
          {isMobile ? slide.titleMobile ?? slide.title : slide.title}
        </h1>
        {!isMobile && (
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
        )}
        <a
          href={slide.ctaHref}
          className="btn fade-up fade-up-delay-3"
          style={{
            background: "#fff",
            color: "#000",
            padding: isMobile ? "16px 28px" : "16px 36px",
            fontSize: isMobile ? "13px" : "13px",
            minHeight: "52px",
            width: isMobile ? "100%" : "auto",
          }}
        >
          {slide.ctaLabel}
        </a>
      </div>

      {/* Slide dots — bigger touch targets on mobile */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile
            ? "calc(36px + env(safe-area-inset-bottom))"
            : "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: "8px",
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Ir al slide ${i + 1}`}
            style={{
              // Bigger hit area, smaller visible dot
              width: "32px",
              height: "32px",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span
              aria-hidden
              style={{
                display: "block",
                width: i === current ? "28px" : "8px",
                height: "6px",
                borderRadius: "999px",
                backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.45)",
                transition: "all 350ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
