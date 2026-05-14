"use client";
import { useEffect, useState } from "react";
import { track } from "@/lib/tracking";

const STORAGE_KEY = "rpo:exit-intent-shown";

export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip if dismissed previously this week
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && Date.now() - Number(raw) < 7 * 24 * 60 * 60 * 1000) return;
    } catch {
      /* ignore */
    }

    // Desktop: track mouse leaving the viewport upward
    function onLeave(e: MouseEvent) {
      if (e.clientY <= 0 && !open) {
        setOpen(true);
        track("rpo_exit_intent_shown");
        try {
          localStorage.setItem(STORAGE_KEY, String(Date.now()));
        } catch {
          /* ignore */
        }
      }
    }
    // Only enable on desktop
    if (window.matchMedia("(min-width: 769px)").matches) {
      document.addEventListener("mouseleave", onLeave);
    }
    return () => document.removeEventListener("mouseleave", onLeave);
  }, [open]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    track("generate_lead", { source: "exit_intent" });
    setDone(true);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 700,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        animation: "fadeIn 280ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "480px",
          width: "100%",
          backgroundColor: "#fff",
          padding: "32px",
          borderRadius: "8px",
          boxShadow: "var(--shadow-lg)",
          position: "relative",
          animation: "fadeUp 320ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Cerrar"
          style={{ position: "absolute", top: "12px", right: "16px", fontSize: "20px", color: "var(--color-ink-60)" }}
        >
          ✕
        </button>
        {done ? (
          <>
            <p className="eyebrow" style={{ color: "var(--color-success)" }}>Listo</p>
            <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "8px 0 8px" }}>
              Tu beneficio te espera en tu correo.
            </h3>
            <p style={{ fontSize: "14px", color: "var(--color-ink-60)", margin: 0, lineHeight: 1.6 }}>
              Te enviamos un código de bienvenida del 10% y la información de RPO Club.
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow">Antes de irte</p>
            <h3 style={{ fontSize: "22px", fontWeight: 800, margin: "8px 0 8px", lineHeight: 1.2 }}>
              ¿Lo estás pensando?
            </h3>
            <p style={{ fontSize: "14px", color: "var(--color-ink-60)", margin: "0 0 20px", lineHeight: 1.6 }}>
              Guarda tu carrito y recibe <strong>10% de bienvenida</strong> al unirte a RPO Club. Sin compromiso.
            </p>
            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                style={{
                  padding: "14px 16px",
                  border: "1px solid var(--color-ink-20)",
                  borderRadius: "2px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <button type="submit" className="btn btn--primary">
                Recibir mi 10% de bienvenida
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ fontSize: "12px", color: "var(--color-ink-60)", textDecoration: "underline" }}
              >
                No, gracias
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
