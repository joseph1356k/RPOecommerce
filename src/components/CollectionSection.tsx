"use client";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

interface Props {
  title: string;
  products: Product[];
  viewAllHref?: string;
}

export default function CollectionSection({ title, products, viewAllHref }: Props) {
  return (
    <section style={{ padding: "48px 24px", maxWidth: "1500px", margin: "0 auto", width: "100%" }}>
      <h2
        style={{
          fontSize: "clamp(20px, 2.5vw, 28px)",
          fontWeight: 800,
          margin: "0 0 32px",
          color: "#000",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {viewAllHref && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a
            href={viewAllHref}
            style={{
              display: "inline-block",
              backgroundColor: "#000",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "16px 48px",
              textDecoration: "none",
              transition: "background 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#333")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")}
          >
            Ver todo
          </a>
        </div>
      )}
    </section>
  );
}
