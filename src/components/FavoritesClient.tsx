"use client";
import { useEffect, useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { ALL_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

export default function FavoritesClient() {
  const { ids, hydrated, clear } = useWishlist();
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    if (!hydrated) return;
    setItems(ids.map((id) => ALL_PRODUCTS.find((p) => p.id === id)).filter((p): p is Product => Boolean(p)));
  }, [ids, hydrated]);

  if (!hydrated) return null;

  return (
    <section
      style={{
        maxWidth: "1500px",
        margin: "0 auto",
        padding: "clamp(32px, 4vw, 56px) clamp(16px, 4vw, 32px)",
      }}
    >
      <header style={{ marginBottom: "clamp(24px, 3vw, 36px)", maxWidth: "780px" }}>
        <p className="eyebrow">Tus favoritos</p>
        <h1 className="section-title">Tu lista de deseos RPO.</h1>
        <p className="section-lede" style={{ marginTop: 12 }}>
          {items.length === 0
            ? "Aún no has guardado prendas. Toca el corazón ❤ en cualquier producto para guardarlo aquí."
            : "Vuelve a este look cuando quieras. Tus favoritos se guardan automáticamente en este dispositivo."}
        </p>
      </header>

      {items.length === 0 ? (
        <div style={{ padding: "40px 0" }}>
          <a href="/catalogo" className="btn btn--primary">Explorar catálogo</a>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "clamp(12px, 1.5vw, 24px)",
              rowGap: "clamp(28px, 3vw, 40px)",
            }}
          >
            {items.map((p) => (
              <ProductCard key={p.id} product={p} source="wishlist" />
            ))}
          </div>
          <div style={{ marginTop: "32px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="/pages/rpo-club" className="btn btn--accent">
              Únete a RPO Club y guarda en la nube
            </a>
            <button type="button" onClick={clear} className="btn btn--ghost">
              Vaciar lista
            </button>
          </div>
        </>
      )}
    </section>
  );
}
