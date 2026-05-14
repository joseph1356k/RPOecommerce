"use client";
import Image from "next/image";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

function StarRating({ rating = 4, count }: { rating?: number; count?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "6px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i < rating ? "#000" : "none"}
          stroke="#000"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      {count !== undefined && (
        <span style={{ fontSize: "11px", color: "#666", marginLeft: "2px" }}>{count} reseñas</span>
      )}
    </div>
  );
}

export default function ProductCard({ product }: Props) {
  return (
    <a
      href={product.href}
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#f5f5f5" }}
        className="product-card-img"
      >
        {product.badge && (
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              zIndex: 2,
              backgroundColor: "#000",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: "2px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {product.badge}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
          className="product-img"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      <div style={{ padding: "12px 0 0" }}>
        <h3
          style={{
            fontSize: "13px",
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.3,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {product.title}
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#000" }}>{product.price}</span>
          {product.comparePrice && (
            <span style={{ fontSize: "13px", color: "#999", textDecoration: "line-through" }}>
              {product.comparePrice}
            </span>
          )}
        </div>

        {(product.rating !== undefined || product.reviewCount !== undefined) && (
          <StarRating rating={product.rating} count={product.reviewCount} />
        )}
      </div>
    </a>
  );
}
