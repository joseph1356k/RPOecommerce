"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ALL_PRODUCTS, PRODUCT_TYPES, PRODUCT_INTENTS } from "@/data/products";
import { track } from "@/lib/tracking";

const RECENT_KEY = "rpo:recent-searches";
const POPULAR = ["leggings", "enterizos", "set", "top", "shorts", "negro", "nude"];

interface Props {
  open: boolean;
  onClose: () => void;
}

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.slice(0, 6) : [];
  } catch {
    return [];
  }
}

function pushRecent(q: string) {
  try {
    const arr = readRecent().filter((x) => x.toLowerCase() !== q.toLowerCase());
    arr.unshift(q);
    localStorage.setItem(RECENT_KEY, JSON.stringify(arr.slice(0, 6)));
  } catch {
    /* ignore */
  }
}

export default function SearchOverlay({ open, onClose }: Props) {
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Lock body, focus input, hydrate recent
  useEffect(() => {
    if (!open) return;
    setRecent(readRecent());
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return ALL_PRODUCTS.filter((p) => {
      const hay = `${p.title} ${p.subtitle ?? ""} ${p.type ?? ""} ${(p.colors ?? []).join(" ")} ${p.collection ?? ""}`.toLowerCase();
      return hay.includes(term);
    }).slice(0, 6);
  }, [q]);

  function go(href: string, label?: string) {
    if (label) pushRecent(label);
    track("rpo_search_select", { q, href, label });
    onClose();
    window.location.href = href;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    pushRecent(q.trim());
    track("rpo_search_submit", { q });
    onClose();
    window.location.href = `/catalogo?q=${encodeURIComponent(q.trim())}`;
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Buscar"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 700,
        backgroundColor: "rgba(0,0,0,0.45)",
        animation: "fadeIn 220ms cubic-bezier(0.22,1,0.36,1)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          maxWidth: "100%",
          maxHeight: "100dvh",
          height: "100dvh",
          overflowY: "auto",
          paddingBottom: "32px",
          animation: "fadeUp 280ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Search bar */}
        <form
          onSubmit={submit}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px clamp(16px, 4vw, 24px) calc(14px + env(safe-area-inset-top))",
            borderBottom: "1px solid var(--color-ink-20)",
            backgroundColor: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 2,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar búsqueda"
            style={{
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid var(--color-ink-20)",
              borderRadius: "999px",
              padding: "0 14px",
              height: "44px",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="¿Qué estás buscando hoy?"
              autoComplete="off"
              enterKeyHint="search"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "15px",
                color: "var(--color-fg)",
                fontFamily: "inherit",
              }}
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="Limpiar"
                style={{ padding: "4px", color: "var(--color-ink-60)" }}
              >
                ✕
              </button>
            )}
          </div>
        </form>

        <div style={{ padding: "18px clamp(16px, 4vw, 24px)" }}>
          {q && results.length > 0 && (
            <Section title="Resultados">
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => go(p.href, p.title)}
                      style={resultRowStyle}
                    >
                      <div style={{ position: "relative", width: 56, height: 72, borderRadius: 4, overflow: "hidden", flexShrink: 0, backgroundColor: "var(--color-surface-2)" }}>
                        <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} sizes="56px" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                        <p style={{ margin: 0, fontSize: "13.5px", fontWeight: 700, lineHeight: 1.3 }}>{p.title}</p>
                        <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--color-ink-60)" }}>{p.price}</p>
                      </div>
                      <span style={{ color: "var(--color-ink-40)", fontSize: "18px" }}>→</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {q && results.length === 0 && (
            <Section title="Sin resultados">
              <p style={{ fontSize: "14px", color: "var(--color-ink-60)", margin: "0 0 16px" }}>
                No encontramos prendas con &ldquo;{q}&rdquo;. Prueba con otro término o busca por categoría.
              </p>
            </Section>
          )}

          {!q && recent.length > 0 && (
            <Section title="Búsquedas recientes">
              <ChipRow items={recent} onPick={(s) => { setQ(s); inputRef.current?.focus(); }} />
            </Section>
          )}

          {!q && (
            <>
              <Section title="Populares ahora">
                <ChipRow items={POPULAR} onPick={(s) => { setQ(s); inputRef.current?.focus(); }} />
              </Section>

              <Section title="Comprar por tipo">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {PRODUCT_TYPES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => go(`/catalogo?tipo=${t.value}`, t.label)}
                      style={tileStyle}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </Section>

              <Section title="Por momento">
                <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: 4 }}>
                  {PRODUCT_INTENTS.map((it) => (
                    <button
                      key={it.value}
                      type="button"
                      onClick={() => go(`/catalogo?intent=${it.value}`, it.label)}
                      className="chip"
                      style={{ minHeight: "44px" }}
                    >
                      <span aria-hidden style={{ marginRight: 4 }}>{it.icon}</span>
                      {it.label}
                    </button>
                  ))}
                </div>
              </Section>

              <Section title="Favoritos de la comunidad">
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {ALL_PRODUCTS.filter((p) => p.tags?.includes("best-seller")).slice(0, 3).map((p) => (
                    <li key={p.id}>
                      <button type="button" onClick={() => go(p.href, p.title)} style={resultRowStyle}>
                        <div style={{ position: "relative", width: 56, height: 72, borderRadius: 4, overflow: "hidden", flexShrink: 0, backgroundColor: "var(--color-surface-2)" }}>
                          <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} sizes="56px" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                          <p style={{ margin: 0, fontSize: "13.5px", fontWeight: 700, lineHeight: 1.3 }}>{p.title}</p>
                          <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--color-ink-60)" }}>{p.price}</p>
                        </div>
                        <span style={{ color: "var(--color-ink-40)", fontSize: "18px" }}>→</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.18em", color: "var(--color-ink-60)", textTransform: "uppercase", margin: "0 0 12px" }}>
        {title}
      </h3>
      {children}
    </section>
  );
}

function ChipRow({ items, onPick }: { items: string[]; onPick: (s: string) => void }) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {items.map((s) => (
        <button key={s} type="button" onClick={() => onPick(s)} className="chip" style={{ minHeight: "40px" }}>
          {s}
        </button>
      ))}
    </div>
  );
}

const resultRowStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "10px 4px",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--color-ink-20)",
  cursor: "pointer",
};

const tileStyle: React.CSSProperties = {
  width: "100%",
  textAlign: "left",
  padding: "16px",
  background: "var(--color-surface)",
  border: "1px solid var(--color-ink-20)",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 700,
  color: "var(--color-fg)",
  minHeight: "56px",
};
