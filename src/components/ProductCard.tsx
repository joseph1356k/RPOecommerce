"use client";
import Image from "next/image";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { track } from "@/lib/tracking";

interface Props {
  product: Product;
  source?: string;
}

function StarRating({ rating = 5, count }: { rating?: number; count?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "8px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill={i < rating ? "#000" : "none"}
          stroke="#000"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      {count !== undefined && (
        <span style={{ fontSize: "11px", color: "#888", marginLeft: "4px" }}>({count})</span>
      )}
    </div>
  );
}

function badgeFor(product: Product) {
  if (product.badge) return { label: product.badge, color: "#000" };
  if (product.tags?.includes("ultimas-unidades")) return { label: "Últimas unidades", color: "#B95E3C" };
  if (product.tags?.includes("oferta")) return { label: "Oferta", color: "#000" };
  if (product.tags?.includes("novedad")) return { label: "Nuevo", color: "#0a0a0a" };
  if (product.tags?.includes("best-seller")) return { label: "Best seller", color: "#B98A6E" };
  return null;
}

export default function ProductCard({ product, source }: Props) {
  const cart = useCart();
  const wishlist = useWishlist();
  const badge = badgeFor(product);
  const isWishlisted = wishlist.has(product.id);

  return (
    <a
      href={product.href}
      className="product-card"
      style={{ display: "block", textDecoration: "none", color: "inherit", position: "relative" }}
      onClick={() =>
        track("select_item", {
          item_id: product.id,
          item_name: product.title,
          item_category: product.type,
          source: source ?? "product_card",
        })
      }
    >
      <div className="product-img-wrap">
        {badge && (
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              zIndex: 3,
              backgroundColor: badge.color,
              color: "#fff",
              fontSize: "10.5px",
              fontWeight: 700,
              padding: "5px 11px",
              borderRadius: "2px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {badge.label}
          </span>
        )}

        {/* Wishlist heart — 40px visible, 44px hit area */}
        <button
          type="button"
          aria-label={isWishlisted ? "Quitar de favoritos" : "Guardar en favoritos"}
          aria-pressed={isWishlisted}
          data-event="add_to_wishlist"
          onClick={(e) => {
            e.preventDefault();
            wishlist.toggle(product.id, { title: product.title });
          }}
          style={{
            position: "absolute",
            top: "6px",
            right: "6px",
            zIndex: 3,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            transition: "transform 180ms cubic-bezier(0.22,1,0.36,1), background 180ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.backgroundColor = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.92)";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isWishlisted ? "#B95E3C" : "none"}
            stroke={isWishlisted ? "#B95E3C" : "#0a0a0a"}
            strokeWidth="2"
            style={{ transition: "fill 220ms, stroke 220ms" }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <Image
          src={product.image}
          alt={product.title}
          fill
          className="product-img"
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {product.imageHover && (
          <Image
            src={product.imageHover}
            alt=""
            fill
            className="product-img-2"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        )}

        {/* Quick add — desktop hover, mobile always visible compact */}
        <button
          type="button"
          className="quick-add"
          aria-label={`Agregar ${product.title} al carrito`}
          data-event="rpo_quick_add"
          onClick={(e) => {
            e.preventDefault();
            cart.add(product, { color: product.colors?.[0] });
            track("rpo_quick_add", {
              item_id: product.id,
              item_name: product.title,
              source: source ?? "product_card",
            });
          }}
          style={{
            background: "#0a0a0a",
            color: "#fff",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "11px 12px",
            borderRadius: "2px",
            width: "100%",
            minHeight: "40px",
          }}
        >
          + Agregar
        </button>
      </div>

      <div style={{ padding: "14px 0 0" }}>
        <h3
          style={{
            fontSize: "12.5px",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.3,
            letterSpacing: "0.02em",
          }}
        >
          {product.title}
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
          <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#000" }}>{product.price}</span>
          {product.comparePrice && (
            <span style={{ fontSize: "12.5px", color: "#999", textDecoration: "line-through" }}>
              {product.comparePrice}
            </span>
          )}
          {product.comparePrice && product.priceValue && (
            <span style={{ fontSize: "10.5px", color: "#B95E3C", fontWeight: 700, letterSpacing: "0.04em" }}>
              {(() => {
                const compareVal = Number(product.comparePrice.replace(/\D/g, ""));
                if (!compareVal) return null;
                const pct = Math.round(((compareVal - product.priceValue) / compareVal) * 100);
                return `−${pct}%`;
              })()}
            </span>
          )}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
            {product.colors.slice(0, 4).map((c) => {
              const map: Record<string, string> = {
                negro: "#0a0a0a",
                nude: "#D7BBA6",
                gris: "#7d7d7d",
                beige: "#C7B299",
                estampado: "linear-gradient(135deg,#C7B299,#7d7d7d,#0a0a0a)",
              };
              const bg = map[c] ?? "#ccc";
              return (
                <span
                  key={c}
                  title={c}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: bg,
                    border: "1px solid rgba(0,0,0,0.15)",
                    display: "inline-block",
                  }}
                />
              );
            })}
          </div>
        )}

        {product.rating !== undefined && product.reviewCount !== undefined && (
          <StarRating rating={product.rating} count={product.reviewCount} />
        )}
      </div>
    </a>
  );
}
