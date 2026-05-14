"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "¡Nueva Colección!", href: "/collections/aura" },
  {
    label: "Colecciones",
    href: "#",
    children: [
      { label: "Esencia By Dany Osorno", href: "/collections/esencia-by-dany-osorno" },
      { label: "Aura", href: "/collections/aura" },
      { label: "Calma", href: "/collections/calma" },
      { label: "Pausa", href: "/collections/pausa" },
      { label: "Esenciales", href: "/collections/esenciales" },
      { label: "Prisma", href: "/collections/prisma" },
    ],
  },
  { label: "Nuestros Productos", href: "/collections/all" },
  { label: "Últimas unidades", href: "/collections/ultimas-unidades" },
  { label: "Visítanos", href: "/pages/visitanos" },
  { label: "Cliente VIP", href: "/pages/cliente-vip" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled ? "#fff" : "rgba(255,255,255,0.95)",
        boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
        transition: "box-shadow 0.3s ease, background-color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image
            src="/images/logo-black.png"
            alt="RPO"
            width={120}
            height={40}
            style={{ objectFit: "contain", height: "36px", width: "auto" }}
            priority
          />
        </a>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              style={{ position: "relative" }}
              onMouseEnter={() => link.children && setOpenMenu(link.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <a
                href={link.href}
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#000",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {link.label}
                {link.children && (
                  <span style={{ fontSize: "10px" }}>▾</span>
                )}
              </a>
              {link.children && openMenu === link.label && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    backgroundColor: "#fff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    padding: "8px 0",
                    minWidth: "220px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    zIndex: 200,
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
                        color: "#000",
                        textDecoration: "none",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
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
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button aria-label="Buscar" style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button aria-label="Cuenta" style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button aria-label="Carrito" style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", position: "relative" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
