"use client";
import Image from "next/image";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ALL_PRODUCTS } from "@/data/products";
import { track } from "@/lib/tracking";

interface Props {
  current?: Product;
  variant?: "section" | "cart";
  title?: string;
  limit?: number;
}

/**
 * Smart cross-sell:
 * - If current is a top → recommend leggings/shorts of same collection
 * - If current is a legging/short → recommend tops/sets
 * - If current is an enterizo/set → recommend complementary buzos/medias
 * - Fallback: best-sellers from a different type
 */
function suggestFor(current: Product | undefined, limit: number): Product[] {
  if (!current) {
    return ALL_PRODUCTS.filter((p) => p.tags?.includes("best-seller")).slice(0, limit);
  }

  const COMPLEMENTS: Record<string, string[]> = {
    tops: ["leggins", "shorts", "sets"],
    leggins: ["tops", "sets"],
    shorts: ["tops"],
    sets: ["tops"],
    enterizos: ["buzos", "tops"],
    buzos: ["leggins", "shorts"],
  };

  const wanted = current.type ? COMPLEMENTS[current.type] ?? [] : [];

  const sameCollection = ALL_PRODUCTS.filter(
    (p) => p.id !== current.id && p.collection === current.collection && wanted.includes(p.type ?? "")
  );

  const sameType = ALL_PRODUCTS.filter(
    (p) => p.id !== current.id && wanted.includes(p.type ?? "")
  );

  const fallback = ALL_PRODUCTS.filter((p) => p.id !== current.id);

  const seen = new Set<string>();
  const ranked = [...sameCollection, ...sameType, ...fallback].filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });

  return ranked.slice(0, limit);
}

export default function CompleteYourLook({
  current,
  variant = "section",
  title = "Completa tu look",
  limit = 4,
}: Props) {
  const cart = useCart();
  const items = suggestFor(current, limit);

  if (!items.length) return null;

  const isCart = variant === "cart";

  return (
    <section
      style={{
        padding: isCart ? "16px 20px 8px" : "clamp(32px, 4vw, 56px) clamp(16px, 4vw, 32px)",
        backgroundColor: isCart ? "transparent" : "var(--color-surface)",
        borderTop: isCart ? "1px solid var(--color-ink-20)" : undefined,
      }}
    >
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
        {!isCart && (
          <header style={{ marginBottom: "clamp(20px, 2.5vw, 32px)", maxWidth: "640px" }}>
            <p className="eyebrow">Asesoría de estilo</p>
            <h2 className="section-title">{title}</h2>
            <p className="section-lede" style={{ marginTop: 12 }}>
              Piezas que combinan con lo que estás viendo. Misma horma, misma intención.
            </p>
          </header>
        )}
        {isCart && (
          <h3
            style={{
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: "0 0 12px",
              color: "var(--color-fg)",
            }}
          >
            {title}
          </h3>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isCart
              ? "repeat(2, 1fr)"
              : "repeat(auto-fill, minmax(220px, 1fr))",
            gap: isCart ? "10px" : "clamp(12px, 1.5vw, 24px)",
          }}
        >
          {items.map((p) => (
            <article
              key={p.id}
              style={{
                display: "flex",
                flexDirection: isCart ? "column" : "column",
                gap: "10px",
                backgroundColor: "#fff",
                borderRadius: "4px",
                overflow: "hidden",
                border: isCart ? "1px solid var(--color-ink-20)" : "none",
              }}
            >
              <a
                href={p.href}
                style={{
                  position: "relative",
                  display: "block",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  backgroundColor: "var(--color-surface-2)",
                }}
                onClick={() =>
                  track("select_item", {
                    item_id: p.id,
                    item_name: p.title,
                    source: "complete_your_look",
                  })
                }
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes={isCart ? "150px" : "220px"}
                />
              </a>
              <div style={{ padding: isCart ? "0 10px 10px" : "0" }}>
                <p
                  style={{
                    fontSize: isCart ? "11.5px" : "12.5px",
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.title}
                </p>
                <p style={{ fontSize: isCart ? "11px" : "12.5px", margin: "4px 0 8px", fontWeight: 700 }}>
                  {p.price}
                </p>
                <button
                  type="button"
                  data-event="rpo_complete_look_add"
                  onClick={() => {
                    cart.add(p);
                    track("rpo_complete_look_add", {
                      source: isCart ? "cart_drawer" : "pdp",
                      item_id: p.id,
                      from_item: current?.id,
                    });
                  }}
                  style={{
                    width: "100%",
                    fontSize: isCart ? "10.5px" : "11.5px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: isCart ? "8px 10px" : "10px 12px",
                    border: "1px solid var(--color-fg)",
                    color: "var(--color-fg)",
                    backgroundColor: "transparent",
                    borderRadius: "2px",
                    transition: "background 180ms, color 180ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-fg)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--color-fg)";
                  }}
                >
                  + Añadir
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
