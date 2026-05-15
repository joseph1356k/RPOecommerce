"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface Props {
  product: Product;
  selectedColor?: string;
}

export default function StickyAddToCart({ product, selectedColor }: Props) {
  const cart = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after user scrolls past the hero image area (~600px)
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="only-mobile"
      aria-hidden={!visible}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 90,
        backgroundColor: "#fff",
        borderTop: "1px solid var(--color-ink-20)",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.08)",
        padding: "10px 12px calc(10px + env(safe-area-inset-bottom))",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 280ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "4px",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          backgroundColor: "var(--color-surface-2)",
        }}
      >
        <Image src={product.image} alt={product.title} fill style={{ objectFit: "cover" }} sizes="44px" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: "12px",
            fontWeight: 700,
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.title}
        </p>
        <p style={{ fontSize: "11.5px", margin: "2px 0 0", color: "var(--color-ink-60)" }}>
          {product.price}
        </p>
      </div>
      <button
        type="button"
        disabled={product.inStock === false}
        onClick={() => cart.add(product, { color: selectedColor ?? product.colors?.[0] })}
        className="btn btn--primary"
        style={{
          padding: "0 20px",
          fontSize: "13px",
          flexShrink: 0,
          opacity: product.inStock === false ? 0.4 : 1,
          minHeight: "48px",
          minWidth: "120px",
        }}
        data-event="add_to_cart"
      >
        {product.inStock === false ? "Agotado" : "Lo quiero"}
      </button>
    </div>
  );
}
