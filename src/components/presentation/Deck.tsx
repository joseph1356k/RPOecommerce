"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import "@/app/presentacion/presentation.css";

import Slide01Cover from "./slides/Slide01Cover";
import Slide02Tesis from "./slides/Slide02Tesis";
import Slide03Diagnostico from "./slides/Slide03Diagnostico";
import Slide04ProblemaComunicacion from "./slides/Slide04ProblemaComunicacion";
import Slide05ProblemaMobile from "./slides/Slide05ProblemaMobile";
import Slide06ProblemaProducto from "./slides/Slide06ProblemaProducto";
import Slide07ProblemaEmbudo from "./slides/Slide07ProblemaEmbudo";
import Slide08Propuesta from "./slides/Slide08Propuesta";
import Slide09Cambios from "./slides/Slide09Cambios";
import Slide10Acommerce from "./slides/Slide10Acommerce";
import Slide11Modelo from "./slides/Slide11Modelo";
import Slide12Impacto from "./slides/Slide12Impacto";
import Slide13Roadmap from "./slides/Slide13Roadmap";
import Slide14Metricas from "./slides/Slide14Metricas";
import Slide15Cierre from "./slides/Slide15Cierre";

const SLIDES = [
  { Component: Slide01Cover, title: "Portada" },
  { Component: Slide02Tesis, title: "Tesis" },
  { Component: Slide03Diagnostico, title: "Diagnóstico" },
  { Component: Slide04ProblemaComunicacion, title: "Comunicación" },
  { Component: Slide05ProblemaMobile, title: "Mobile" },
  { Component: Slide06ProblemaProducto, title: "Producto" },
  { Component: Slide07ProblemaEmbudo, title: "Embudo" },
  { Component: Slide08Propuesta, title: "Propuesta" },
  { Component: Slide09Cambios, title: "Cambios" },
  { Component: Slide10Acommerce, title: "A-commerce" },
  { Component: Slide11Modelo, title: "Modelo" },
  { Component: Slide12Impacto, title: "Impacto" },
  { Component: Slide13Roadmap, title: "Roadmap" },
  { Component: Slide14Metricas, title: "Métricas" },
  { Component: Slide15Cierre, title: "Cierre" },
];

export default function Deck() {
  const [index, setIndex] = useState(0);
  const [isFs, setIsFs] = useState(false);
  const touchStart = useRef<number | null>(null);

  const total = SLIDES.length;
  const next = useCallback(() => setIndex((i) => Math.min(i + 1, total - 1)), [total]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  // Keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        setIndex(0);
      } else if (e.key === "End") {
        setIndex(total - 1);
      } else if (e.key === "f" || e.key === "F") {
        toggleFs();
      } else if (e.key === "Escape") {
        if (document.fullscreenElement) document.exitFullscreen();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, total]);

  // Fullscreen
  function toggleFs() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }
  useEffect(() => {
    const onChange = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Touch swipe (vertical or horizontal)
  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 60) {
      dx < 0 ? next() : prev();
    }
    touchStart.current = null;
  }

  return (
    <div className="deck" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* Progress bar */}
      <div className="deck-progress" aria-hidden>
        <span style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      {/* Top bar */}
      <header className="deck-topbar">
        <a href="/" className="brand" style={{ textDecoration: "none" }}>R · P · O</a>
        <span className="counter">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      </header>

      {/* Slides */}
      <div className="deck-stage">
        {SLIDES.map(({ Component }, i) => (
          <section
            key={i}
            className={`slide ${i === index ? "is-active" : i < index ? "is-prev" : ""}`}
            aria-hidden={i !== index}
          >
            <Component />
          </section>
        ))}
      </div>

      {/* Hint */}
      {index === 0 && (
        <p className="deck-hint">← → para navegar · F pantalla completa</p>
      )}

      {/* Bottom controls */}
      <footer className="deck-controls">
        <div className="deck-nav">
          <button type="button" onClick={prev} disabled={index === 0} aria-label="Slide anterior">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button type="button" onClick={next} disabled={index === total - 1} aria-label="Slide siguiente">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="deck-dots" role="tablist">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-label={`${i + 1}. ${s.title}`}
              aria-selected={i === index}
              className={i === index ? "is-active" : ""}
              onClick={() => setIndex(i)}
            >
              <span />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="deck-fullscreen"
          onClick={toggleFs}
          aria-label={isFs ? "Salir de pantalla completa" : "Pantalla completa"}
          title="Pantalla completa (F)"
        >
          {isFs ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" /><path d="M3 16h3a2 2 0 0 1 2 2v3" /><path d="M16 21v-3a2 2 0 0 1 2-2h3" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8V5a2 2 0 0 1 2-2h3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M21 16v3a2 2 0 0 1-2 2h-3" />
            </svg>
          )}
        </button>
      </footer>
    </div>
  );
}
