import Image from "next/image";
import type { Category } from "@/types";

const CATEGORIES: Category[] = [
  { name: "Sets", image: "/images/categories/sets.png", href: "/collections/sets" },
  { name: "Enterizos", image: "/images/categories/enterizos.png", href: "/collections/enterizos" },
  { name: "Leggins", image: "/images/categories/leggins.png", href: "/collections/leggins" },
  { name: "Tops", image: "/images/categories/tops.png", href: "/collections/tops" },
];

export default function CategoryGrid() {
  return (
    <section style={{ width: "100%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto" }}>
        {CATEGORIES.map((cat) => (
          <a
            key={cat.name}
            href={cat.href}
            style={{ display: "block", position: "relative", aspectRatio: "1/1", overflow: "hidden" }}
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
              sizes="50vw"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    fontSize: "clamp(48px, 8vw, 96px)",
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "-0.02em",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                  }}
                >
                  {cat.name}
                </span>
                <span
                  style={{
                    position: "relative",
                    fontSize: "clamp(32px, 5vw, 64px)",
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    display: "block",
                  }}
                >
                  {cat.name}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
