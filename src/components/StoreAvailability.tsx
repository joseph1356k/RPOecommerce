"use client";
import { useState } from "react";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/tracking";

const CITIES = ["Medellín", "Rionegro", "Cali"];

interface Props {
  productTitle?: string;
}

export default function StoreAvailability({ productTitle }: Props) {
  const [city, setCity] = useState<string>(CITIES[0]);

  return (
    <div
      style={{
        border: "1px solid var(--color-ink-20)",
        borderRadius: "4px",
        padding: "16px",
        backgroundColor: "#fff",
      }}
    >
      <p
        style={{
          fontSize: "11.5px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          margin: "0 0 10px",
        }}
      >
        Disponibilidad en tienda
      </p>
      <p style={{ fontSize: "13px", color: "var(--color-ink-60)", margin: "0 0 12px", lineHeight: 1.5 }}>
        ¿Prefieres probártelo? Consulta inventario en una de nuestras tiendas.
      </p>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
        {CITIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCity(c)}
            className={`chip ${city === c ? "chip--active" : ""}`}
          >
            {c}
          </button>
        ))}
      </div>
      <a
        href={whatsappUrl({ kind: "stock", title: productTitle ?? "este producto", city })}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--ghost"
        data-event="rpo_store_locator_click"
        onClick={() =>
          track("rpo_store_locator_click", { city, item_name: productTitle, source: "pdp" })
        }
        style={{ width: "100%", padding: "12px" }}
      >
        Preguntar por WhatsApp · {city}
      </a>
    </div>
  );
}
