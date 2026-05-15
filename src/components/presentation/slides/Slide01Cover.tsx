"use client";
import Image from "next/image";

export default function Slide01Cover() {
  return (
    <div className="container deck-bg-warm" style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{
        position: "absolute",
        inset: "0",
        opacity: 0.18,
        zIndex: 0,
      }}>
        <Image
          src="/images/hero/slide-3.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(31,22,18,0.92) 100%)"
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1080px" }}>
        <p className="eyebrow reveal-1">Caso de transformación digital</p>
        <h1 className="display-xl reveal-2" style={{ marginTop: "20px" }}>
          RPO,
          <br />
          <span className="italic-serif">de tienda</span>
          <br />
          a marca digital.
        </h1>
        <p className="lede reveal-3" style={{ marginTop: "32px", maxWidth: "52ch" }}>
          Un ecosistema digital pensado para vender mejor a personas <strong style={{ color: "#fff" }}>y</strong> a las inteligencias artificiales que pronto comprarán por ellas.
        </p>
        <div className="reveal-4" style={{ marginTop: "48px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <span className="pill pill-accent">Mobile-first</span>
          <span className="pill">Branding · UX · Conversión</span>
          <span className="pill">A-commerce ready</span>
        </div>
      </div>
    </div>
  );
}
