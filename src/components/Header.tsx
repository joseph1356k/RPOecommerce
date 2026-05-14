"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type NavLink = {
  label: string;
  href: string;
  highlight?: boolean;
  children?: { label: string; href: string }[];
};

const NAV_LINKS: NavLink[] = [
  { label: "Nuevo", href: "/collections/aura", highlight: true },
  {
    label: "Colecciones",
    href: "#",
    children: [
      { label: "Esencia by Dany Osorno", href: "/collections/esencia-by-dany-osorno" },
      { label: "Aura", href: "/collections/aura" },
      { label: "Calma", href: "/collections/calma" },
      { label: "Pausa", href: "/collections/pausa" },
      { label: "Esenciales", href: "/collections/esenciales" },
      { label: "Prisma", href: "/collections/prisma" },
    ],
  },
  {
    label: "Comprar",
    href: "/catalogo",
    children: [
      { label: "Todos los productos", href: "/catalogo" },
      { label: "Enterizos", href: "/catalogo?tipo=enterizos" },
      { label: "Tops", href: "/catalogo?tipo=tops" },
      { label: "Leggings", href: "/catalogo?tipo=leggins" },
      { label: "Shorts", href: "/catalogo?tipo=shorts" },
      { label: "Sets", href: "/catalogo?tipo=sets" },
    ],
  },
  { label: "Últimas unidades", href: "/catalogo?quick=ultimas-unidades" },
  { label: "Visítanos", href: "/pages/visitanos" },
  { label: "RPO Club", href: "/pages/rpo-club", highlight: true },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#fff",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)" : "0 1px 0 rgba(0,0,0,0.04)",
        transition: "box-shadow 300ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 32px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
          gap: "16px",
        }}
      >
        {/* Mobile menu button */}
        <button
          type="button"
          className="only-mobile"
          aria-label="Abrir menú"
          onClick={() => setMobileOpen(true)}
          style={{ padding: "4px" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image
            src="/images/logo-black.png"
            alt="RPO"
            width={120}
            height={40}
            style={{ objectFit: "contain", height: "30px", width: "auto" }}
            priority
          />
        </a>

        {/* Nav (desktop) */}
        <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              style={{ position: "relative", padding: "20px 0" }}
              onMouseEnter={() => link.children && setOpenMenu(link.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <a
                href={link.href}
                style={{
                  fontSize: "12.5px",
                  fontWeight: 700,
                  color: link.highlight ? "var(--color-accent)" : "var(--color-fg)",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "color 180ms",
                }}
              >
                {link.label}
                {link.children && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </a>
              {link.children && openMenu === link.label && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    backgroundColor: "#fff",
                    border: "1px solid var(--color-ink-20)",
                    borderRadius: "4px",
                    padding: "8px 0",
                    minWidth: "240px",
                    boxShadow: "var(--shadow-md)",
                    zIndex: 200,
                    animation: "fadeUp 220ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {link.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      style={{
                        display: "block",
                        padding: "10px 20px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--color-fg)",
                        textDecoration: "none",
                        transition: "background 150ms",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-surface)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="/catalogo" aria-label="Buscar" style={{ padding: "4px", display: "inline-flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </a>
          <a href="/pages/cuenta" aria-label="Cuenta" className="hide-mobile" style={{ padding: "4px", display: "inline-flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </a>
          <button aria-label="Carrito" style={{ padding: "4px", position: "relative" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 500,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "min(85vw, 320px)",
              backgroundColor: "#fff",
              padding: "24px",
              overflowY: "auto",
              boxShadow: "var(--shadow-lg)",
              animation: "fadeUp 280ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <Image src="/images/logo-black.png" alt="RPO" width={80} height={24} style={{ objectFit: "contain" }} />
              <button onClick={() => setMobileOpen(false)} aria-label="Cerrar" style={{ padding: "4px 8px", fontSize: "20px" }}>✕</button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    padding: "12px 0",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: link.highlight ? "var(--color-accent)" : "var(--color-fg)",
                    borderBottom: "1px solid var(--color-ink-20)",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href="/pages/rpo-club"
              className="btn btn--primary"
              style={{ marginTop: "24px", width: "100%" }}
            >
              Únete a RPO Club
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
