"use client";
import { useEffect, useState } from "react";

const MESSAGES = [
  "Envío gratis en compras desde $500.000",
  "Cambios fáciles · Devoluciones en 15 días",
  "Únete a RPO Club y desbloquea beneficios exclusivos",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "12.5px",
        fontWeight: 500,
        height: "34px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 16px",
        letterSpacing: "0.06em",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {MESSAGES.map((msg, i) => (
        <p
          key={i}
          aria-hidden={i !== index}
          style={{
            margin: 0,
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: i === index ? 1 : 0,
            transform: i === index ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 400ms cubic-bezier(0.22,1,0.36,1), transform 400ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {msg}
        </p>
      ))}
    </div>
  );
}
