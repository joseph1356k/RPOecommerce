"use client";
import { useEffect, useState } from "react";
import type { Product } from "@/types";
import ProductGallery from "./ProductGallery";
import BackInStockForm from "./BackInStockForm";
import StickyAddToCart from "./StickyAddToCart";
import CompleteYourLook from "./CompleteYourLook";
import RecentlyViewed from "./RecentlyViewed";
import StoreAvailability from "./StoreAvailability";
import UrgencyBanner from "./UrgencyBanner";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { track } from "@/lib/tracking";
import { whatsappUrl } from "@/lib/whatsapp";

interface Props {
  product: Product;
}

const COLOR_MAP: Record<string, string> = {
  negro: "#0a0a0a",
  nude: "#D7BBA6",
  gris: "#7d7d7d",
  beige: "#C7B299",
  estampado: "linear-gradient(135deg,#C7B299,#7d7d7d,#0a0a0a)",
};

export default function ProductDetail({ product }: Props) {
  const cart = useCart();
  const wishlist = useWishlist();
  const { push } = useRecentlyViewed();
  const [color, setColor] = useState<string | undefined>(product.colors?.[0]);
  const [openSection, setOpenSection] = useState<string | null>("ajuste");

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const isOOS = product.inStock === false;
  const isFav = wishlist.has(product.id);

  useEffect(() => {
    push(product.id);
    track("view_item", {
      item_id: product.id,
      item_name: product.title,
      item_category: product.type,
      item_collection: product.collection,
      price: product.priceValue,
      currency: "COP",
    });
  }, [product, push]);

  function discountPct(): number | null {
    if (!product.comparePrice || !product.priceValue) return null;
    const compareVal = Number(product.comparePrice.replace(/\D/g, ""));
    if (!compareVal) return null;
    return Math.round(((compareVal - product.priceValue) / compareVal) * 100);
  }

  return (
    <>
      <article
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "clamp(20px, 3vw, 40px) clamp(16px, 4vw, 32px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "clamp(24px, 4vw, 64px)",
          alignItems: "start",
        }}
        className="pdp-grid"
      >
        {/* Gallery */}
        <div style={{ position: "sticky", top: "120px" }} className="pdp-gallery-wrap">
          <ProductGallery images={images} alt={product.title} />
        </div>

        {/* Info */}
        <div>
          {/* Breadcrumb */}
          <p
            style={{
              fontSize: "11.5px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-ink-60)",
              margin: "0 0 12px",
            }}
          >
            <a href="/catalogo" style={{ textDecoration: "underline" }}>Catálogo</a>
            {product.type && (
              <>
                {" "}/{" "}
                <a href={`/catalogo?tipo=${product.type}`} style={{ textTransform: "capitalize", textDecoration: "underline" }}>
                  {product.type}
                </a>
              </>
            )}
          </p>

          {product.collection && (
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                margin: "0 0 6px",
              }}
            >
              Colección {product.collection}
            </p>
          )}

          <h1 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", fontWeight: 800, margin: "0 0 6px", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
            {product.title}
          </h1>

          {product.subtitle && (
            <p style={{ fontSize: "clamp(14px, 1.3vw, 16px)", color: "var(--color-ink-60)", margin: "0 0 14px", lineHeight: 1.4, fontWeight: 400 }}>
              {product.subtitle}
            </p>
          )}

          {/* Rating */}
          {product.rating && product.reviewCount && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < product.rating! ? "#000" : "none"} stroke="#000" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                  </svg>
                ))}
              </div>
              <a href="#reviews" style={{ fontSize: "12.5px", textDecoration: "underline", color: "var(--color-ink-60)" }}>
                {product.reviewCount} reseña{product.reviewCount === 1 ? "" : "s"} verificada{product.reviewCount === 1 ? "" : "s"}
              </a>
            </div>
          )}

          {/* Price */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 8px" }}>
            <span style={{ fontSize: "24px", fontWeight: 800 }}>{product.price}</span>
            {product.comparePrice && (
              <>
                <span style={{ fontSize: "16px", color: "var(--color-ink-40)", textDecoration: "line-through" }}>
                  {product.comparePrice}
                </span>
                {discountPct() !== null && (
                  <span
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 700,
                      color: "#fff",
                      backgroundColor: "#B95E3C",
                      padding: "3px 8px",
                      borderRadius: "2px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    −{discountPct()}%
                  </span>
                )}
              </>
            )}
          </div>
          <p style={{ fontSize: "12px", color: "var(--color-ink-60)", margin: "0 0 16px" }}>
            o paga en 3 cuotas con <strong>Addi</strong> y <strong>Sistecrédito</strong>.
          </p>

          {/* Urgency banner — ultimate purpose: motivate the purchase */}
          <UrgencyBanner product={product} />

          {/* Story (lifestyle paragraph — Alo/Lululemon voice) */}
          {product.story && (
            <p
              style={{
                fontSize: "14.5px",
                color: "var(--color-fg)",
                lineHeight: 1.65,
                margin: "0 0 24px",
                fontWeight: 400,
              }}
            >
              {product.story}
            </p>
          )}

          {/* Color */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  fontSize: "11.5px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  margin: "0 0 10px",
                }}
              >
                Color: <span style={{ color: "var(--color-ink-60)", textTransform: "capitalize", fontWeight: 600 }}>{color}</span>
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    aria-label={c}
                    aria-pressed={color === c}
                    title={c}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: COLOR_MAP[c] ?? "#ccc",
                      border: color === c ? "2px solid var(--color-fg)" : "1px solid rgba(0,0,0,0.2)",
                      outline: color === c ? "2px solid #fff" : "none",
                      outlineOffset: color === c ? "-5px" : 0,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Talla única note */}
          <div
            style={{
              border: "1px solid var(--color-ink-20)",
              borderRadius: "4px",
              padding: "14px 16px",
              marginBottom: "20px",
              backgroundColor: "var(--color-surface)",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "12.5px", fontWeight: 700, margin: 0 }}>Talla única — fit real</p>
              <p style={{ fontSize: "12px", color: "var(--color-ink-60)", margin: "2px 0 0", lineHeight: 1.5 }}>
                {product.fitNotes ?? "Diseñado para cuerpos 36–42 (S a XL). Elasticidad 4-way que se adapta sin apretar."}
              </p>
              <a href="#ajuste" style={{ fontSize: "12px", fontWeight: 700, textDecoration: "underline", marginTop: "6px", display: "inline-block" }}>
                Ver guía de ajuste
              </a>
            </div>
          </div>

          {/* CTAs */}
          {isOOS ? (
            <BackInStockForm productId={product.id} productTitle={product.title} />
          ) : (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
              <button
                type="button"
                onClick={() => cart.add(product, { color })}
                className="btn btn--primary"
                style={{ flex: "1 1 240px", padding: "18px" }}
                data-event="add_to_cart"
              >
                Agregar al carrito · {product.price}
              </button>
              <button
                type="button"
                onClick={() => wishlist.toggle(product.id, { title: product.title })}
                aria-pressed={isFav}
                aria-label={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
                style={{
                  width: "56px",
                  height: "56px",
                  border: "1px solid var(--color-fg)",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isFav ? "var(--color-fg)" : "transparent",
                  color: isFav ? "#fff" : "var(--color-fg)",
                  transition: "background 180ms, color 180ms",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          )}

          {/* Trust microcopy */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 24px",
              fontSize: "12px",
              color: "var(--color-ink-60)",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <li>🚚 Envío gratis desde $500.000 · Despacho en 24-48h.</li>
            <li>↻ Cambios y devoluciones en 15 días.</li>
            <li>🔒 Pago seguro con cifrado SSL.</li>
          </ul>

          {/* Styled for chips (lifestyle) */}
          {product.styledFor && product.styledFor.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  fontSize: "11.5px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  margin: "0 0 10px",
                  color: "var(--color-fg)",
                }}
              >
                Hecho para
              </p>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {product.styledFor.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "6px 12px",
                      borderRadius: "999px",
                      backgroundColor: "var(--color-surface-2)",
                      color: "var(--color-fg)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp asistente */}
          <a
            href={whatsappUrl({ kind: "product", title: product.title, color })}
            target="_blank"
            rel="noopener noreferrer"
            data-event="rpo_whatsapp_click"
            onClick={() =>
              track("rpo_whatsapp_click", { source: "pdp", item_id: product.id, ctx: "product" })
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 14px",
              border: "1px solid var(--color-ink-20)",
              borderRadius: "4px",
              fontSize: "13px",
              color: "var(--color-fg)",
              marginBottom: "32px",
              transition: "background 180ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-surface)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            </svg>
            <span>
              <strong>¿Dudas con el ajuste o color?</strong> Te asesoramos por WhatsApp.
            </span>
          </a>

          {/* Features grid (Lululemon voice) */}
          {product.features && product.features.length > 0 && (
            <section style={{ marginBottom: "32px" }}>
              <p className="eyebrow">Por qué te va a gustar</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "18px 24px",
                  marginTop: "12px",
                }}
              >
                {product.features.map((f) => (
                  <div key={f.label}>
                    <p
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--color-accent)",
                        margin: 0,
                      }}
                    >
                      {f.label}
                    </p>
                    <p style={{ fontSize: "13.5px", color: "var(--color-fg)", margin: "4px 0 0", lineHeight: 1.5 }}>
                      {f.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Accordion */}
          <div id="ajuste" style={{ borderTop: "1px solid var(--color-ink-20)" }}>
            {[
              {
                id: "ajuste",
                title: "¿Cómo se adapta?",
                content: (
                  <>
                    <p style={{ margin: "0 0 10px" }}>
                      Talla única real: hecha en tejido con <strong>elasticidad 4-way</strong> que cede hasta un 80% en cualquier dirección.
                      Diseñada para cuerpos <strong>36 a 42</strong> (S a XL).
                    </p>
                    {product.fitNotes && <p style={{ margin: "10px 0 0", fontStyle: "italic" }}>{product.fitNotes}</p>}
                  </>
                ),
              },
              {
                id: "materiales",
                title: "Tela y cuidado",
                content: (
                  <>
                    {product.fabric && (
                      <p style={{ margin: "0 0 10px" }}>{product.fabric}</p>
                    )}
                    <ul style={{ paddingLeft: "18px", margin: 0, lineHeight: 1.7 }}>
                      {(product.care ?? [
                        "Lavado a mano o ciclo delicado en frío.",
                        "No usar suavizante (afecta la elasticidad).",
                        "Secar a la sombra. No planchar.",
                      ]).map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </>
                ),
              },
              {
                id: "envios",
                title: "Envíos y devoluciones",
                content: (
                  <ul style={{ paddingLeft: "18px", margin: 0, lineHeight: 1.7 }}>
                    <li>Envío gratis en pedidos desde $500.000.</li>
                    <li>Despacho en 24-48 horas hábiles.</li>
                    <li>Cambios y devoluciones en 15 días.</li>
                    <li>Recogida gratis en tiendas físicas en Medellín, Rionegro y Cali.</li>
                  </ul>
                ),
              },
            ].map((sec) => {
              const open = openSection === sec.id;
              return (
                <div key={sec.id} style={{ borderBottom: "1px solid var(--color-ink-20)" }}>
                  <button
                    type="button"
                    onClick={() => setOpenSection(open ? null : sec.id)}
                    aria-expanded={open}
                    style={{
                      width: "100%",
                      padding: "16px 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "13.5px",
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      color: "var(--color-fg)",
                    }}
                  >
                    {sec.title}
                    <span style={{ fontSize: "20px", fontWeight: 400, lineHeight: 1, transition: "transform 200ms", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                  </button>
                  <div
                    style={{
                      maxHeight: open ? "500px" : "0",
                      overflow: "hidden",
                      transition: "max-height 320ms cubic-bezier(0.22,1,0.36,1), padding 220ms",
                      paddingBottom: open ? "16px" : 0,
                      fontSize: "13.5px",
                      color: "var(--color-ink-60)",
                      lineHeight: 1.6,
                    }}
                  >
                    {sec.content}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Store availability */}
          <div style={{ marginTop: "28px" }}>
            <StoreAvailability productTitle={product.title} />
          </div>
        </div>
      </article>

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <section
          id="reviews"
          style={{
            backgroundColor: "var(--color-surface)",
            padding: "clamp(40px, 5vw, 72px) clamp(16px, 4vw, 32px)",
          }}
        >
          <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
            <header style={{ marginBottom: "clamp(20px, 2.5vw, 32px)", maxWidth: "640px" }}>
              <p className="eyebrow">Reseñas verificadas</p>
              <h2 className="section-title">Lo que dicen quienes ya lo usan.</h2>
              <p className="section-lede" style={{ marginTop: 12 }}>
                Reseñas de clientas reales que ya compraron y recibieron este producto.
              </p>
            </header>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {product.reviews.map((r, i) => (
                <article
                  key={i}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid var(--color-ink-20)",
                    borderRadius: "6px",
                    padding: "20px",
                  }}
                >
                  <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <svg key={idx} width="13" height="13" viewBox="0 0 24 24" fill={idx < r.rating ? "#000" : "none"} stroke="#000" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--color-fg)", margin: "0 0 14px", lineHeight: 1.55, fontWeight: 500 }}>
                    “{r.text}”
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--color-ink-60)", margin: 0, fontWeight: 600 }}>
                    — {r.author}
                    {r.city && `, ${r.city}`}
                    {r.verified && (
                      <span style={{ color: "var(--color-success)", marginLeft: "8px" }}>
                        ✓ Compra verificada
                      </span>
                    )}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-sell */}
      <CompleteYourLook current={product} title="Completa el look" />

      {/* Recently viewed */}
      <RecentlyViewed excludeId={product.id} />

      {/* Sticky bottom on mobile */}
      <StickyAddToCart product={product} selectedColor={color} />
    </>
  );
}
