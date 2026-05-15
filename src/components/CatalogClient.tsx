"use client";
import { useMemo, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import QuickNavChips from "./QuickNavChips";
import { SkeletonGrid } from "./Skeleton";
import {
  ALL_PRODUCTS,
  PRODUCT_TYPES,
  PRODUCT_COLLECTIONS,
  PRODUCT_COLORS,
  PRODUCT_INTENTS,
  SORT_OPTIONS,
  type SortValue,
} from "@/data/products";
import type { ProductType, ProductCollection, ProductIntent } from "@/types";
import { track } from "@/lib/tracking";

type Toggle<T extends string> = Record<T, boolean>;

const QUICK_CHIPS = [
  { value: "all", label: "Todos" },
  { value: "novedades", label: "Novedades" },
  { value: "best-sellers", label: "Más vendidos" },
  { value: "ofertas", label: "Ofertas" },
  { value: "ultimas-unidades", label: "Últimas unidades" },
];

const PRICE_RANGES = [
  { value: "all", label: "Todos los precios" },
  { value: "0-80000", label: "Menos de $80.000" },
  { value: "80000-150000", label: "$80.000 – $150.000" },
  { value: "150000-200000", label: "$150.000 – $200.000" },
  { value: "200000-999999", label: "Más de $200.000" },
];

export default function CatalogClient() {
  const [quick, setQuick] = useState<string>("all");
  const [types, setTypes] = useState<Toggle<ProductType>>({} as Toggle<ProductType>);
  const [collections, setCollections] = useState<Toggle<ProductCollection>>({} as Toggle<ProductCollection>);
  const [intent, setIntent] = useState<ProductIntent | null>(null);
  const [colors, setColors] = useState<Record<string, boolean>>({});
  const [price, setPrice] = useState<string>("all");
  const [sort, setSort] = useState<SortValue>("recommended");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Read URL params on first render
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");
    if (tipo) setTypes({ [tipo]: true } as Toggle<ProductType>);
    const coleccion = params.get("coleccion");
    if (coleccion) setCollections({ [coleccion]: true } as Toggle<ProductCollection>);
    const intentParam = params.get("intent") as ProductIntent | null;
    if (intentParam) setIntent(intentParam);
    const q = params.get("quick");
    if (q) setQuick(q);
    const sq = params.get("q");
    if (sq) setSearchQuery(sq);
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    // Quick filter
    if (quick === "novedades") list = list.filter((p) => p.tags?.includes("novedad"));
    if (quick === "best-sellers") list = list.filter((p) => p.tags?.includes("best-seller"));
    if (quick === "ofertas") list = list.filter((p) => p.tags?.includes("oferta"));
    if (quick === "ultimas-unidades") list = list.filter((p) => p.tags?.includes("ultimas-unidades"));

    // Types
    const activeTypes = Object.keys(types).filter((k) => types[k as ProductType]) as ProductType[];
    if (activeTypes.length) list = list.filter((p) => p.type && activeTypes.includes(p.type));

    // Collections
    const activeCols = Object.keys(collections).filter((k) => collections[k as ProductCollection]) as ProductCollection[];
    if (activeCols.length) list = list.filter((p) => p.collection && activeCols.includes(p.collection));

    // Intent (momento de uso)
    if (intent) list = list.filter((p) => p.intent?.includes(intent));

    // Free-text search
    if (searchQuery.trim()) {
      const term = searchQuery.toLowerCase();
      list = list.filter((p) => {
        const hay = `${p.title} ${p.subtitle ?? ""} ${p.type ?? ""} ${(p.colors ?? []).join(" ")} ${p.collection ?? ""}`.toLowerCase();
        return hay.includes(term);
      });
    }

    // Colors
    const activeColors = Object.keys(colors).filter((k) => colors[k]);
    if (activeColors.length) list = list.filter((p) => p.colors?.some((c) => activeColors.includes(c)));

    // Price
    if (price !== "all") {
      const [min, max] = price.split("-").map(Number);
      list = list.filter((p) => (p.priceValue ?? 0) >= min && (p.priceValue ?? 0) <= max);
    }

    // Sort
    if (sort === "price-asc") list.sort((a, b) => (a.priceValue ?? 0) - (b.priceValue ?? 0));
    if (sort === "price-desc") list.sort((a, b) => (b.priceValue ?? 0) - (a.priceValue ?? 0));
    if (sort === "best-sellers") list.sort((a, b) => Number(b.tags?.includes("best-seller")) - Number(a.tags?.includes("best-seller")));
    if (sort === "newest") list.sort((a, b) => Number(b.tags?.includes("novedad")) - Number(a.tags?.includes("novedad")));

    return list;
  }, [quick, types, collections, intent, colors, price, sort, searchQuery]);

  const activeCount =
    Object.values(types).filter(Boolean).length +
    Object.values(collections).filter(Boolean).length +
    Object.values(colors).filter(Boolean).length +
    (price !== "all" ? 1 : 0) +
    (quick !== "all" ? 1 : 0) +
    (intent ? 1 : 0);

  function clearAll() {
    setTypes({} as Toggle<ProductType>);
    setCollections({} as Toggle<ProductCollection>);
    setIntent(null);
    setColors({});
    setPrice("all");
    setQuick("all");
    track("rpo_filter_change", { action: "clear_all" });
  }

  return (
    <section
      style={{
        maxWidth: "1500px",
        margin: "0 auto",
        padding: "clamp(24px, 4vw, 48px) clamp(16px, 4vw, 32px) clamp(64px, 8vw, 96px)",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "24px" }}>
        <p className="eyebrow">Catálogo</p>
        <h1 className="section-title">Encuentra tu próximo favorito.</h1>
        <p className="section-lede">
          Filtra por tipo, colección, color o precio. Cambia el orden cuando quieras — todo se actualiza al instante.
        </p>
      </header>

      {/* Quick chips */}
      <div style={{ marginBottom: "12px" }}>
        <QuickNavChips
          chips={QUICK_CHIPS}
          active={quick}
          onSelect={(v) => {
            setQuick(v);
            track("rpo_filter_change", { filter: "quick", value: v });
          }}
        />
      </div>

      {/* Intent chips */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
        {PRODUCT_INTENTS.map((it) => {
          const active = intent === it.value;
          return (
            <button
              key={it.value}
              type="button"
              className={`chip ${active ? "chip--active" : ""}`}
              onClick={() => {
                const next = active ? null : it.value;
                setIntent(next);
                track("rpo_filter_change", { filter: "intent", value: next });
              }}
            >
              <span aria-hidden style={{ marginRight: "4px" }}>{it.icon}</span>
              {it.label}
            </button>
          );
        })}
      </div>

      {/* Toolbar — sticky on mobile so filters/sort always reachable */}
      <div
        className="catalog-toolbar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          padding: "10px 0",
          borderTop: "1px solid var(--color-ink-20)",
          borderBottom: "1px solid var(--color-ink-20)",
          marginBottom: "20px",
          backgroundColor: "#fff",
        }}
      >
        <button
          type="button"
          className="only-mobile"
          onClick={() => setMobileFiltersOpen(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            minHeight: "44px",
            padding: "0 14px",
            border: "1px solid var(--color-fg)",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--color-fg)",
            background: "#fff",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" /><line x1="7" y1="12" x2="20" y2="12" /><line x1="10" y1="18" x2="20" y2="18" />
            <circle cx="6" cy="12" r="2" fill="currentColor" /><circle cx="13" cy="6" r="2" fill="currentColor" /><circle cx="17" cy="18" r="2" fill="currentColor" />
          </svg>
          Filtrar{activeCount > 0 && ` · ${activeCount}`}
        </button>
        <p style={{ fontSize: "13px", color: "var(--color-ink-60)", margin: 0 }}>
          {loading ? "Cargando…" : `${filtered.length} prenda${filtered.length === 1 ? "" : "s"}`}
        </p>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--color-ink-60)" }}>
          <span>Ordenar:</span>
          <select
            value={sort}
            onChange={(e) => {
              const v = e.target.value as SortValue;
              setSort(v);
              track("rpo_sort_change", { value: v });
            }}
            style={{
              border: "1px solid var(--color-ink-20)",
              background: "#fff",
              padding: "8px 12px",
              borderRadius: "2px",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "var(--color-fg)",
              cursor: "pointer",
            }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Layout */}
      <div
        className="filter-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: "clamp(24px, 3vw, 48px)",
        }}
      >
        {/* Sidebar */}
        <aside
          className="filter-sidebar hide-mobile"
          style={{
            position: "sticky",
            top: "120px",
            alignSelf: "start",
            maxHeight: "calc(100vh - 140px)",
            overflowY: "auto",
            paddingRight: "8px",
          }}
        >
          <FilterGroup title="Tipo de prenda">
            {PRODUCT_TYPES.map((t) => (
              <CheckboxRow
                key={t.value}
                label={t.label}
                checked={!!types[t.value as ProductType]}
                onChange={(c) => setTypes({ ...types, [t.value]: c })}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Colección">
            {PRODUCT_COLLECTIONS.map((c) => (
              <CheckboxRow
                key={c.value}
                label={c.label}
                checked={!!collections[c.value as ProductCollection]}
                onChange={(v) => setCollections({ ...collections, [c.value]: v })}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Color">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {PRODUCT_COLORS.map((c) => {
                const active = !!colors[c.value];
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColors({ ...colors, [c.value]: !active })}
                    aria-label={c.label}
                    aria-pressed={active}
                    title={c.label}
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      background: c.value === "estampado" ? "linear-gradient(135deg,#C7B299,#7d7d7d,#0a0a0a)" : c.hex,
                      border: active ? "2px solid var(--color-fg)" : "1px solid rgba(0,0,0,0.2)",
                      cursor: "pointer",
                      padding: 0,
                      outline: active ? "2px solid #fff" : "none",
                      outlineOffset: active ? "-4px" : 0,
                    }}
                  />
                );
              })}
            </div>
          </FilterGroup>

          <FilterGroup title="Precio">
            {PRICE_RANGES.map((r) => (
              <RadioRow
                key={r.value}
                label={r.label}
                checked={price === r.value}
                onChange={() => setPrice(r.value)}
                name="price"
              />
            ))}
          </FilterGroup>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={clearAll}
              style={{
                marginTop: "8px",
                fontSize: "12.5px",
                fontWeight: 700,
                textDecoration: "underline",
                color: "var(--color-fg)",
                padding: 0,
              }}
            >
              Limpiar filtros ({activeCount})
            </button>
          )}
        </aside>

        {/* Grid */}
        <div>
          {loading ? (
            <SkeletonGrid count={8} />
          ) : filtered.length === 0 ? (
            <EmptyState onClear={clearAll} />
          ) : (
            <div
              className="catalog-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "clamp(8px, 1.5vw, 24px)",
                rowGap: "clamp(20px, 3vw, 40px)",
              }}
            >
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} source="catalog" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom sheet for filters */}
      {mobileFiltersOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filtros"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 500,
            backgroundColor: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "flex-end",
            animation: "fadeIn 200ms cubic-bezier(0.22,1,0.36,1)",
          }}
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              width: "100%",
              maxHeight: "85dvh",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              boxShadow: "0 -12px 40px rgba(0,0,0,0.18)",
              animation: "slideUpSheet 320ms cubic-bezier(0.22,1,0.36,1)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Drag handle */}
            <div
              aria-hidden
              onClick={() => setMobileFiltersOpen(false)}
              style={{
                padding: "10px 0 6px",
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: "44px",
                  height: "4px",
                  borderRadius: "999px",
                  backgroundColor: "var(--color-ink-20)",
                }}
              />
            </div>

            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 20px 14px",
                borderBottom: "1px solid var(--color-ink-20)",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>
                Filtrar looks
              </h3>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Cerrar filtros"
                style={{
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            <div style={{ overflowY: "auto", padding: "16px 20px 12px", flex: 1 }}>
              <FilterGroup title="Tipo de prenda">
                {PRODUCT_TYPES.map((t) => (
                  <CheckboxRow
                    key={t.value}
                    label={t.label}
                    checked={!!types[t.value as ProductType]}
                    onChange={(c) => setTypes({ ...types, [t.value]: c })}
                  />
                ))}
              </FilterGroup>
              <FilterGroup title="Colección">
                {PRODUCT_COLLECTIONS.map((c) => (
                  <CheckboxRow
                    key={c.value}
                    label={c.label}
                    checked={!!collections[c.value as ProductCollection]}
                    onChange={(v) => setCollections({ ...collections, [c.value]: v })}
                  />
                ))}
              </FilterGroup>
              <FilterGroup title="Color">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {PRODUCT_COLORS.map((c) => {
                    const active = !!colors[c.value];
                    return (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setColors({ ...colors, [c.value]: !active })}
                        aria-label={c.label}
                        aria-pressed={active}
                        style={{
                          width: "44px",
                          height: "44px",
                          padding: 0,
                          background: "transparent",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: c.value === "estampado" ? "linear-gradient(135deg,#C7B299,#7d7d7d,#0a0a0a)" : c.hex,
                            border: active ? "2px solid var(--color-fg)" : "1px solid rgba(0,0,0,0.2)",
                            outline: active ? "2px solid #fff" : "none",
                            outlineOffset: active ? "-5px" : 0,
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </FilterGroup>
              <FilterGroup title="Precio">
                {PRICE_RANGES.map((r) => (
                  <RadioRow
                    key={r.value}
                    label={r.label}
                    checked={price === r.value}
                    onChange={() => setPrice(r.value)}
                    name="price-mobile"
                  />
                ))}
              </FilterGroup>
            </div>

            <footer
              style={{
                display: "flex",
                gap: "8px",
                padding: "12px 20px calc(12px + env(safe-area-inset-bottom))",
                borderTop: "1px solid var(--color-ink-20)",
                backgroundColor: "#fff",
              }}
            >
              <button
                type="button"
                onClick={clearAll}
                className="btn btn--ghost"
                style={{ flex: 1, minHeight: "52px" }}
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="btn btn--primary"
                style={{ flex: 2, minHeight: "52px" }}
              >
                Ver {filtered.length} prenda{filtered.length === 1 ? "" : "s"}
              </button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <h4
        style={{
          fontSize: "11.5px",
          fontWeight: 800,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--color-fg)",
          margin: "0 0 14px",
        }}
      >
        {title}
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>{children}</div>
    </div>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (c: boolean) => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "13px",
        color: "var(--color-fg)",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ width: "16px", height: "16px", accentColor: "#000", cursor: "pointer" }}
      />
      {label}
    </label>
  );
}

function RadioRow({
  label,
  checked,
  onChange,
  name,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  name: string;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "13px",
        color: "var(--color-fg)",
        cursor: "pointer",
      }}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        style={{ width: "16px", height: "16px", accentColor: "#000", cursor: "pointer" }}
      />
      {label}
    </label>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div
      style={{
        padding: "80px 24px",
        textAlign: "center",
        border: "1px dashed var(--color-ink-20)",
        borderRadius: "6px",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <p className="eyebrow">Sin resultados</p>
      <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "8px 0 12px" }}>
        No encontramos prendas con esos filtros.
      </h3>
      <p style={{ color: "var(--color-ink-60)", fontSize: "14px", maxWidth: "44ch", margin: "0 auto 20px" }}>
        Prueba con menos filtros o explora otra colección. Tus favoritos están a un clic.
      </p>
      <button type="button" onClick={onClear} className="btn btn--primary">
        Limpiar filtros
      </button>
    </div>
  );
}
