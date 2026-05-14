"use client";
import Image from "next/image";

const PAYMENTS = [
  { name: "VISA", logo: "/images/banners/pagos-seguros.png" },
];

export default function PaymentsBanner() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "420px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background photo */}
      <Image
        src="/images/hero/slide-1-alt.jpg"
        alt="Pagos seguros RPO"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "#fff",
          padding: "40px 24px",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 48px)",
            fontWeight: 800,
            margin: "0 0 32px",
            letterSpacing: "0.05em",
          }}
        >
          PAGOS SEGUROS CON
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px 32px",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {[
            { name: "VISA", style: { fontFamily: "serif", fontSize: "32px", fontWeight: 900, fontStyle: "italic", letterSpacing: "-1px" } },
            { name: "AMERICAN EXPRESS", style: { fontSize: "13px", fontWeight: 800, letterSpacing: "0.05em" } },
            { name: "PSE", style: { fontSize: "22px", fontWeight: 800 } },
            { name: "Addi", style: { fontSize: "26px", fontWeight: 800, fontStyle: "italic" } },
            { name: "mastercard.", style: { fontSize: "20px", fontWeight: 400 } },
            { name: "Bancolombia", style: { fontSize: "16px", fontWeight: 700 } },
            { name: "sistecrédito", style: { fontSize: "16px", fontWeight: 700 } },
          ].map((p) => (
            <span key={p.name} style={{ color: "#fff", ...p.style }}>{p.name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
