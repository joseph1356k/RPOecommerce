"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { getProductById } from "@/data/products";
import type { Product } from "@/types";

interface Props {
  excludeId?: string;
  title?: string;
  limit?: number;
}

export default function RecentlyViewed({ excludeId, title = "Vistos recientemente", limit = 4 }: Props) {
  const { ids, hydrated } = useRecentlyViewed();
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    if (!hydrated) return;
    const filtered = ids
      .filter((id) => id !== excludeId)
      .map(getProductById)
      .filter((p): p is Product => Boolean(p))
      .slice(0, limit);
    setItems(filtered);
  }, [ids, hydrated, excludeId, limit]);

  if (!hydrated || items.length === 0) return null;

  return (
    <section
      style={{
        padding: "clamp(32px, 4vw, 56px) clamp(16px, 4vw, 32px)",
        maxWidth: "1500px",
        margin: "0 auto",
        borderTop: "1px solid var(--color-ink-20)",
      }}
    >
      <header style={{ marginBottom: "clamp(20px, 2.5vw, 28px)" }}>
        <p className="eyebrow">Tu historial</p>
        <h2 className="section-title">{title}</h2>
      </header>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "clamp(12px, 1.5vw, 24px)",
        }}
      >
        {items.map((p) => (
          <ProductCard key={p.id} product={p} source="recently_viewed" />
        ))}
      </div>
    </section>
  );
}
