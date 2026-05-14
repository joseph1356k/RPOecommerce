"use client";
import { useState } from "react";
import { track } from "@/lib/tracking";

interface Props {
  productId: string;
  productTitle: string;
}

export default function BackInStockForm({ productId, productTitle }: Props) {
  const [channel, setChannel] = useState<"email" | "whatsapp">("email");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (channel === "email" && !value.includes("@")) return setStatus("error");
    if (channel === "whatsapp" && value.replace(/\D/g, "").length < 10) return setStatus("error");
    setStatus("sending");

    // TODO: POST to /api/back-in-stock once backend exists.
    // For now we track the lead and confirm to the user.
    track("rpo_back_in_stock_submit", {
      item_id: productId,
      item_name: productTitle,
      channel,
    });
    setTimeout(() => setStatus("ok"), 350);
  }

  return (
    <div
      style={{
        border: "1px solid var(--color-ink-20)",
        borderRadius: "6px",
        padding: "20px",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <p className="eyebrow" style={{ color: "var(--color-accent)" }}>Agotado por ahora</p>
      <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "6px 0 6px" }}>
        ¿Te enamoraste? Te avisamos cuando vuelva.
      </h3>
      <p style={{ fontSize: "13px", color: "var(--color-ink-60)", margin: "0 0 16px", lineHeight: 1.5 }}>
        Déjanos tu contacto y serás de las primeras en saber cuando regrese a inventario.
      </p>

      {status === "ok" ? (
        <p style={{ fontSize: "13.5px", color: "var(--color-success)", fontWeight: 600, margin: 0 }}>
          ✓ Listo. Te avisamos apenas vuelva.
        </p>
      ) : (
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={() => setChannel("email")}
              className={`chip ${channel === "email" ? "chip--active" : ""}`}
            >
              ✉ Email
            </button>
            <button
              type="button"
              onClick={() => setChannel("whatsapp")}
              className={`chip ${channel === "whatsapp" ? "chip--active" : ""}`}
            >
              💬 WhatsApp
            </button>
          </div>
          <input
            type={channel === "email" ? "email" : "tel"}
            inputMode={channel === "whatsapp" ? "tel" : "email"}
            required
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setStatus("idle");
            }}
            placeholder={channel === "email" ? "tu@correo.com" : "3001234567"}
            style={{
              padding: "12px 14px",
              border: "1px solid var(--color-ink-20)",
              borderRadius: "2px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#fff",
            }}
          />
          {status === "error" && (
            <p style={{ fontSize: "12px", color: "var(--color-error)", margin: 0 }}>
              Verifica el formato e intenta de nuevo.
            </p>
          )}
          <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
            {status === "sending" ? "Guardando…" : "Avísame cuando vuelva"}
          </button>
        </form>
      )}
    </div>
  );
}
