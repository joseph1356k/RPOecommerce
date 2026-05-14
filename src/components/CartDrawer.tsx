"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/context/CartContext";
import { formatCOP } from "@/lib/format";
import CompleteYourLook from "./CompleteYourLook";
import { track } from "@/lib/tracking";

export default function CartDrawer() {
  const cart = useCart();

  // Lock body scroll while open
  useEffect(() => {
    if (cart.isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [cart.isOpen]);

  // ESC to close
  useEffect(() => {
    if (!cart.isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cart.isOpen, cart]);

  const lastItem = cart.items[cart.items.length - 1]?.product;

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden
        onClick={cart.closeDrawer}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 600,
          opacity: cart.isOpen ? 1 : 0,
          pointerEvents: cart.isOpen ? "auto" : "none",
          transition: "opacity 280ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(420px, 92vw)",
          backgroundColor: "#fff",
          zIndex: 601,
          transform: cart.isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 320ms cubic-bezier(0.22,1,0.36,1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            borderBottom: "1px solid var(--color-ink-20)",
          }}
        >
          <h2 style={{ fontSize: "16px", fontWeight: 800, margin: 0, letterSpacing: "0.02em" }}>
            Tu bolsa ({cart.count})
          </h2>
          <button
            type="button"
            onClick={cart.closeDrawer}
            aria-label="Cerrar"
            style={{ padding: "4px 8px", fontSize: "22px", lineHeight: 1 }}
          >
            ✕
          </button>
        </header>

        {/* Free shipping bar */}
        {cart.count > 0 && (
          <div
            style={{
              padding: "14px 20px",
              backgroundColor: cart.freeShippingUnlocked ? "#0a0a0a" : "var(--color-surface)",
              color: cart.freeShippingUnlocked ? "#fff" : "var(--color-fg)",
              transition: "background 280ms, color 280ms",
            }}
          >
            {cart.freeShippingUnlocked ? (
              <p style={{ margin: 0, fontSize: "13px", fontWeight: 600 }}>
                🎉 ¡Listo! Envío gratis desbloqueado.
              </p>
            ) : (
              <p style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 600 }}>
                Te faltan{" "}
                <strong style={{ color: "var(--color-accent)" }}>
                  {formatCOP(cart.freeShippingGap)}
                </strong>{" "}
                para envío gratis.
              </p>
            )}
            <div
              style={{
                height: "4px",
                backgroundColor: "rgba(0,0,0,0.08)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.max(4, cart.freeShippingProgress * 100)}%`,
                  background: cart.freeShippingUnlocked
                    ? "linear-gradient(90deg, #B98A6E, #E8DBCF)"
                    : "var(--color-fg)",
                  transition: "width 400ms cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </div>
          </div>
        )}

        {/* Items / empty */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {cart.count === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center" }}>
              <div
                aria-hidden
                style={{
                  width: "64px",
                  height: "64px",
                  margin: "0 auto 16px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <p className="eyebrow" style={{ margin: 0 }}>Tu bolsa está vacía</p>
              <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "8px 0 8px" }}>
                Empieza a armar tu look.
              </h3>
              <p style={{ fontSize: "13.5px", color: "var(--color-ink-60)", margin: "0 0 24px", lineHeight: 1.5 }}>
                Explora nuestras colecciones y guarda los favoritos antes de comprar.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a href="/catalogo" className="btn btn--primary" onClick={cart.closeDrawer}>
                  Ver catálogo
                </a>
                <a href="/favoritos" className="btn btn--ghost" onClick={cart.closeDrawer}>
                  Mis favoritos
                </a>
              </div>
            </div>
          ) : (
            <>
              <ul style={{ listStyle: "none", margin: 0, padding: "20px" }}>
                {cart.items.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "78px 1fr auto",
                      gap: "12px",
                      paddingBottom: "16px",
                      marginBottom: "16px",
                      borderBottom: "1px solid var(--color-ink-20)",
                    }}
                  >
                    <a
                      href={item.product.href}
                      onClick={cart.closeDrawer}
                      style={{
                        position: "relative",
                        aspectRatio: "3/4",
                        backgroundColor: "var(--color-surface-2)",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <Image src={item.product.image} alt={item.product.title} fill style={{ objectFit: "cover" }} sizes="80px" />
                    </a>
                    <div style={{ minWidth: 0 }}>
                      <a
                        href={item.product.href}
                        onClick={cart.closeDrawer}
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "var(--color-fg)",
                          margin: 0,
                          display: "block",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.product.title}
                      </a>
                      {item.color && (
                        <p style={{ fontSize: "11.5px", color: "var(--color-ink-60)", margin: "2px 0 0", textTransform: "capitalize" }}>
                          Color: {item.color}
                        </p>
                      )}
                      <p style={{ fontSize: "12.5px", fontWeight: 700, margin: "6px 0 8px" }}>{item.product.price}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            border: "1px solid var(--color-ink-20)",
                            borderRadius: "2px",
                          }}
                        >
                          <button
                            type="button"
                            aria-label="Restar"
                            onClick={() => cart.setQty(item.id, item.qty - 1)}
                            style={{ width: "28px", height: "28px", fontSize: "14px" }}
                          >
                            −
                          </button>
                          <span style={{ minWidth: "24px", textAlign: "center", fontSize: "12.5px", fontWeight: 700 }}>{item.qty}</span>
                          <button
                            type="button"
                            aria-label="Sumar"
                            onClick={() => cart.setQty(item.id, item.qty + 1)}
                            style={{ width: "28px", height: "28px", fontSize: "14px" }}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => cart.remove(item.id)}
                          style={{
                            fontSize: "11.5px",
                            color: "var(--color-ink-60)",
                            textDecoration: "underline",
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: "12.5px", fontWeight: 700, whiteSpace: "nowrap" }}>
                      {formatCOP((item.product.priceValue ?? 0) * item.qty)}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Upsell — Completa tu look */}
              <CompleteYourLook current={lastItem} variant="cart" title="Completa tu look" limit={2} />
            </>
          )}
        </div>

        {/* Footer */}
        {cart.count > 0 && (
          <footer
            style={{
              borderTop: "1px solid var(--color-ink-20)",
              padding: "16px 20px 20px",
              backgroundColor: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                fontSize: "13px",
                color: "var(--color-ink-60)",
              }}
            >
              <span>Subtotal</span>
              <span style={{ color: "var(--color-fg)", fontWeight: 700 }}>{formatCOP(cart.subtotal)}</span>
            </div>
            <p style={{ fontSize: "11.5px", color: "var(--color-ink-60)", margin: "0 0 14px" }}>
              Impuestos y envío se calculan en el checkout.
            </p>
            <button
              type="button"
              className="btn btn--primary"
              data-event="begin_checkout"
              onClick={() => {
                track("begin_checkout", {
                  value: cart.subtotal,
                  currency: "COP",
                  items_count: cart.count,
                });
                // Placeholder: integrate with Shopify checkout when migrating
                window.location.href = "/checkout";
              }}
              style={{ width: "100%", padding: "16px" }}
            >
              Ir al checkout · {formatCOP(cart.subtotal)}
            </button>
            <button
              type="button"
              onClick={cart.closeDrawer}
              style={{
                width: "100%",
                marginTop: "10px",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "var(--color-ink-60)",
                textDecoration: "underline",
              }}
            >
              Seguir comprando
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
