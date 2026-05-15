# RPO — Mobile-First Deliverable

Refactor profundo de la experiencia mobile asumiendo que **80%+ del tráfico viene de Instagram, TikTok, WhatsApp y pauta**. No es un "encoger desktop": es repensar cada superficie como una app de compra moderna.

---

## 1. Diagnóstico mobile inicial

| Área | Problema detectado |
|---|---|
| **Layout root** | Sin `viewport` meta, sin `theme-color`, sin `viewportFit: cover` para safe-areas (notch). El LCP del hero no se preloadeaba → primer pintado lento. |
| **Header mobile** | Botón menú sin touch target garantizado (≥44px). Drawer móvil mostraba la misma lista de desktop sin agrupar por intención. Sin búsqueda accesible. Badges de cart/wishlist sin `min-height: 44px` en el botón contenedor. |
| **Búsqueda** | **Inexistente**. El icono lupa redirigía a `/catalogo` — la usuaria no podía buscar por palabra ("nude", "leggings negro"). |
| **Hero** | Altura `100vh - 34px - 64px` (no respetaba `100svh`, problemático con browser UI dinámico de iOS/Android). Copy idéntico a desktop (frases largas no caben en pantallas pequeñas). CTA pequeño (no full-width). Dots de slide minúsculos (≈8px, hit area 8px). |
| **Catálogo** | Grid `auto-fill minmax(220px, 1fr)` colapsaba a **1 columna** en mobile (cards enormes, scroll infinito). Toolbar de filtros no era sticky. Filtros mobile en drawer lateral (más invasivo que un bottom sheet). Botón "Filtros" en versión chip pequeña. Sin chips de color con touch-target adecuado. |
| **Product card** | Heart wishlist a 34×34 (debajo del mínimo touch). Quick-add solo aparecía en `:hover` → en mobile no había forma de agregar rápido sin entrar a PDP. |
| **PDP** | Galería desktop-only (thumbs verticales que en mobile colapsaban a una columna sin swipe horizontal). StickyAddToCart con padding mínimo, sin `safe-area-inset-bottom`. |
| **Inputs** | `font-size` <16px → iOS zoom forzado al hacer focus. |
| **Touch feedback** | Sin `-webkit-tap-highlight-color: transparent`, hover-only states sin equivalente táctil. |

---

## 2. Cambios implementados

### 2.1 Base mobile (`layout.tsx`, `globals.css`)
- **`viewport` export** con `width=device-width, initialScale=1, maximumScale=5, viewportFit=cover` y `themeColor` light/dark.
- **`<link rel="preload" as="image" fetchPriority="high">`** del primer slide del hero → mejora LCP medible.
- **OG tags + appleWebApp** para compartibilidad en redes y soporte de "Add to Home Screen".
- **CSS base mobile-first**:
  - `inputs/textarea/select { font-size: 16px }` en `≤768px` → mata el zoom de iOS.
  - `:focus-visible` con outline accesible (solo teclado).
  - `-webkit-tap-highlight-color: transparent` global.
  - `body { padding-bottom: env(safe-area-inset-bottom) }` cuando aplica.

### 2.2 Búsqueda mobile predictiva — `SearchOverlay.tsx` (NUEVO)
Overlay full-screen con:
- Input grande con placeholder *"¿Qué estás buscando hoy?"* y `font-size: 16px` (no zoom iOS).
- Botón X y back con touch target 44×44.
- **Resultados en vivo** (filtrado de `ALL_PRODUCTS` por título, subtitle, type, color, collection) con thumbnail.
- **Estados:**
  - Vacío: muestra **Búsquedas recientes** (localStorage), **Populares ahora** (chips), **Comprar por tipo** (grid 2-col tiles), **Por momento** (chips horizontales scrollables) y **Favoritos de la comunidad** (best-sellers con thumbnail).
  - Sin resultados: "No encontramos prendas con X. Prueba con otro término o busca por categoría."
- **Persistencia local** de las últimas 6 búsquedas (`rpo:recent-searches`).
- Tracking: `rpo_search_open`, `rpo_search_select`, `rpo_search_submit`.

### 2.3 Header rediseñado — `Header.tsx`
- **Touch targets 44×44** en todos los iconos (menú, search, heart, cuenta, cart).
- **Badges** con conteo en tiempo real (cart + wishlist).
- **Drawer mobile organizado en 4 secciones:**
  1. **Comprar por categoría** — Enterizos, Tops, Leggings, Shorts, Sets, Buzos.
  2. **Comprar por momento** — Para entrenar, Día a día, Para viajar, Comodidad, Looks completos.
  3. **Destacados** — Más vendidos, Novedades, Últimas unidades, Ofertas.
  4. **Marca** — RPO Club (highlighted), Mis favoritos, Tiendas físicas, Guía de ajuste, Comunidad.
- **Pseudo-input de búsqueda** dentro del drawer ("¿Qué estás buscando hoy?") que abre el SearchOverlay.
- **Footer del drawer** con CTA primario "Únete a RPO Club" + WhatsApp ghost.
- Animación `slideInLeft` 320ms ease-out-soft.
- Respeta `safe-area-inset-top/bottom` en drawer.

### 2.4 Hero mobile optimizado — `HeroBanner.tsx`
- **`min(78svh, 640px)`** en mobile, no `100vh` (evita salto cuando la barra del browser aparece/desaparece).
- **Copy mobile separado** (`titleMobile`) — frases más cortas y con verbos directos.
- **Subtitle oculto en mobile** (espacio premium para CTA).
- **CTA full-width 52px** mínimo.
- **Gradient bottom-up** más fuerte en mobile (vs left-to-right en desktop) para legibilidad del CTA.
- **Swipe horizontal nativo** (touchstart/touchend) para cambiar de slide.
- **Dots con hit area 32×32** (visible 6×6 → 28×6 cuando activo).

### 2.5 Catálogo mobile — `CatalogClient.tsx`
- **Grid 2 columnas** en mobile (`.catalog-grid`), no 1 con cards gigantes.
- **Toolbar sticky** debajo del header (sticky `top: 60px`) con botón Filtrar + contador + sort.
- Botón "Filtrar" rediseñado como pill grande (44px+) con icono.
- **Filtros como bottom sheet real:**
  - Drag handle visible (44×4 px) que al tocar cierra el sheet.
  - Animación `slideUpSheet` 320ms.
  - `borderTopLeftRadius/Right: 20px` (visualmente nativo iOS/Android).
  - `maxHeight: 85dvh` con scroll interno.
  - Footer fijo con "Limpiar" + "Ver X prendas" (ambos 52px min-height) y `safe-area-inset-bottom`.
  - Chips de color con touch target 44×44 (visible 32×32).
- Soporte de **`?q=` param** para búsquedas que vienen del SearchOverlay.

### 2.6 Product card — `ProductCard.tsx`
- **Heart wishlist 40×40** visible (era 34×34).
- **Quick-add visible siempre en mobile** (no requiere hover) con backdrop semitransparente — copy "+ Agregar" más conciso.
- **Disabling de hover lift** en `≤768px` para no romper la UX táctil.

### 2.7 PDP mobile — `ProductGallery.tsx`
- **Galería con scroll-snap horizontal nativo** en mobile:
  - Cada slide ocupa 100% del viewport (`scrollSnapType: x mandatory`).
  - Bleed a los bordes (sin padding lateral).
  - **Pill contador** "1 / 5" en la esquina superior derecha.
  - **Dots con touch target 32×32** debajo (no thumbs verticales que requieren tap fino).
  - Listener de scroll que sincroniza el `active` index.
- Desktop conserva la galería con thumbs verticales y crossfade.

### 2.8 Sticky Add to Cart — `StickyAddToCart.tsx`
- Botón con `min-height: 48px` y `min-width: 120px` (anteriormente 12px padding).
- Copy `"Lo quiero"` más conversacional que `"Agregar"`.
- `padding-bottom: env(safe-area-inset-bottom)` ya existente reforzado.

---

## 3. Microcopy mobile-first añadido

| Superficie | Microcopy |
|---|---|
| Search placeholder | "¿Qué estás buscando hoy?" |
| Search vacío | "Sin resultados — Prueba con otro término o busca por categoría" |
| Búsquedas recientes | "Búsquedas recientes" / "Populares ahora" / "Favoritos de la comunidad" |
| Drawer header | "Comprar por categoría / por momento / Destacados / Marca" |
| Drawer footer | "Únete a RPO Club" + "💬 Asesoría por WhatsApp" |
| Hero slide 1 mobile | "Muévete segura. Vístete con intención." |
| Hero slide 2 mobile | "Estilo que entrena y descansa." |
| Hero slide 4 mobile | "Tu lugar en RPO." |
| Catálogo toolbar | "Filtrar · 3" / "12 prendas" |
| Bottom sheet header | "Filtrar looks" |
| Bottom sheet CTA | "Ver 8 prendas" |
| Quick add card | "+ Agregar" |
| Sticky CTA PDP | "Lo quiero" |

---

## 4. Funcionalidades nuevas

1. **Búsqueda predictiva mobile** con sugerencias, recientes y populares.
2. **Bottom sheet pattern** real para filtros (drag handle + safe-area).
3. **Galería con scroll-snap nativo** + pill contador en PDP.
4. **Drawer mobile estructurado por intención** (no solo categorías).
5. **Soporte `?q=`** end-to-end (search → catálogo filtrado).
6. **Touch targets 44px+** auditados en todos los iconos críticos.
7. **Preload del LCP** del hero.

## 5. Mejoras de performance

- **Preload `as=image, fetchPriority=high`** del slide-1 → LCP se baja medible.
- **`fetchPriority` por slide del hero**: solo el primero `high`, los demás `auto`.
- **`sizes` correcto** en todas las `<Image>` (gallery: `100vw`, cards: `(max-width:768px) 50vw, 25vw`).
- **`scrollSnapType: x mandatory`** + `WebkitOverflowScrolling: touch` para galería con momentum nativo (sin librería).
- **Disable hover transforms** en `≤768px` (CPU GPU savings).
- **Inputs `font-size: 16px`** en mobile → evita repaint del zoom de iOS.
- **`viewportFit: cover`** + `safe-area-inset-*` → cero salto cuando aparece bottom bar del browser.

## 6. Accesibilidad

- `aria-label` y `aria-pressed` en todos los toggles (heart, color, filtros).
- `:focus-visible` con outline `var(--color-accent)` 2px (solo teclado).
- `aria-modal="true"`, `role="dialog"` en sheet/drawer.
- Tap targets ≥44×44 en interactivos críticos.
- `prefers-reduced-motion` ya respetado en `globals.css`.
- Etiquetas semánticas correctas (`section`, `header`, `aside`, `footer`, `nav`).

---

## 7. Tracking recomendado

Eventos disponibles ya conectados a `lib/tracking.ts` (push a `dataLayer`):

| Evento | Origen |
|---|---|
| `rpo_search_open` | Click en lupa (header) |
| `rpo_search_submit` | Submit del input de búsqueda |
| `rpo_search_select` | Click en resultado/sugerencia |
| `rpo_filter_change` | Cambio en sidebar/chip/intent |
| `rpo_sort_change` | Cambio de orden |
| `rpo_quick_add` | Quick-add desde tarjeta |
| `add_to_cart` | Add desde PDP/quick-add (GA4-friendly) |
| `add_to_wishlist` / `remove_from_wishlist` | Toggle del heart |
| `view_item` | Carga de PDP |
| `select_item` | Click en card del catálogo o sección |
| `begin_checkout` | "Ir al checkout" en cart drawer |
| `rpo_complete_look_add` | Add desde CompleteYourLook |
| `rpo_back_in_stock_submit` | Form de OOS |
| `rpo_whatsapp_click` | FAB / PDP / disponibilidad por tienda |
| `rpo_store_locator_click` | Selector de ciudad |
| `rpo_club_signup` | Form del club hero |
| `rpo_exit_intent_shown` | Modal de salida |

**Recomendado para Fase 2:**
- `add_payment_info` y `purchase` cuando se conecte Shopify checkout.
- `view_item_list` cuando una sección de productos entra en viewport (IntersectionObserver).
- Scroll depth en PDP (25/50/75/100%).

---

## 8. Funcionalidades preparadas para Fase 2

| Listo para conectar | Detalle |
|---|---|
| **Quiz "Encuentra tu look"** | El campo `intent` por producto ya existe, solo falta UI con 3-4 preguntas que arme `?intent=&color=&tipo=`. |
| **Reseñas reales (Judge.me/Yotpo)** | El componente PDP renderiza `product.reviews[]` — cuando llegue el feed real, se reemplaza el array. |
| **Inventario por tienda física** | `StoreAvailability` ya tiene selector de ciudad + WhatsApp. Cuando exista API, reemplazar el botón por chips con stock real. |
| **Email automation (Klaviyo)** | Todos los forms (back-in-stock, exit-intent, club signup, footer newsletter) emiten eventos pero no persisten. Conectar al endpoint cuando exista. |
| **Checkout Shopify** | El drawer ya hace `window.location.href = "/checkout"` con `begin_checkout` event. Cambiar el destino a la URL del Storefront cart al migrar. |

---

## 9. Riesgos / limitaciones

1. **localStorage mobile**: cart/wishlist/búsquedas viven en el navegador. Si la usuaria limpia datos o cambia de dispositivo, se pierden. → mitigación: integrar Customer Account API en Fase 2.
2. **`100svh`** sigue teniendo soporte parcial en Chrome Android viejo (<108). El fallback `min-height: 480px` mantiene la UX usable.
3. **`:has()` selector** (usado en hover swap) requiere Safari 15.4+ y Chrome 105+. ~95% de cobertura global, pero hay un grayscale fallback (la imagen primaria simplemente no se desvanece).
4. **`scroll-snap-type: x mandatory`** en galería: en algunos Chrome Android puede interferir con el scroll vertical de la página si la galería ocupa toda la pantalla. Mitigado con `aspect-ratio: 3/4` (no full height).
5. **`backdrop-filter: blur`** (drawer search/quick-add) no soportado en Firefox <103. Fallback: queda con fondo semi-transparente plano (legible).

---

## 10. Próximos pasos recomendados (orden de impacto)

1. **Conectar Klaviyo** (back-in-stock + exit-intent + cart-abandoned). 1 día.
2. **A/B test del CTA del hero mobile** ("Descubrir Esencia" vs "Ver looks nuevos"). 0.5 día.
3. **Reseñas verificadas** (Judge.me — Shopify). 0.5 día.
4. **Quiz "Encuentra tu look"** con redirección al catálogo filtrado. 1 día.
5. **Bottom navigation bar mobile** (Home / Catálogo / Wishlist / Cart) tipo app — solo en `≤480px`. 0.5 día.
6. **Sticky "Compra por momento" chips** debajo del hero solo en mobile (descubrimiento vertical). 0.5 día.
7. **PWA básico** (manifest.json + icons) para "Add to Home Screen" en iOS/Android. 0.5 día.
8. **Optimización de imágenes** con loader de Shopify CDN (`f_auto,q_auto:eco,w_<width>`) cuando se migre. 0.5 día.
9. **Inventario por tienda física** (Shopify Locations API). 2-3 días.
10. **Loyalty real** (Smile.io / Yotpo Loyalty) con puntos visibles en header + checkout. 2 días.

---

## 11. Archivos modificados / creados

**Nuevos:**
- `src/components/SearchOverlay.tsx` — búsqueda mobile predictiva
- `docs/MOBILE_DELIVERABLE.md` — este documento

**Reescritos:**
- `src/app/layout.tsx` — viewport, themeColor, preload, OG tags
- `src/components/Header.tsx` — drawer estructurado, search integrada, touch targets
- `src/components/HeroBanner.tsx` — mobile-aware (svh, copy corto, swipe, CTA full)
- `src/components/ProductGallery.tsx` — scroll-snap nativo mobile + dots + counter
- `src/components/CatalogClient.tsx` — bottom sheet, sticky toolbar, ?q= support
- `src/components/ProductCard.tsx` — heart 40px, quick-add mobile-friendly
- `src/components/StickyAddToCart.tsx` — 48px height + safe-area
- `src/app/globals.css` — mobile-first base, focus-visible, animations sheet/slide, catalog 2-col, sticky toolbar, quick-add mobile

---

## 12. Resumen ejecutivo

| Antes | Después |
|---|---|
| Sin viewport meta, LCP no preloaded | viewport completo + preload del hero |
| Sin búsqueda | Overlay con resultados en vivo + recientes + populares |
| Drawer mobile = lista plana | 4 secciones: Categoría / Intención / Destacados / Marca |
| Hero `100vh` con texto desktop | `78svh` + copy mobile + CTA full + swipe |
| Catálogo 1 col en mobile (cards gigantes) | 2 col compactas + sticky toolbar |
| Filtros en drawer lateral | Bottom sheet nativo con drag handle |
| Heart 34×34 + quick-add solo en hover | Heart 40×40 + quick-add visible siempre en mobile |
| Galería sin swipe en mobile | Scroll-snap horizontal con dots + pill counter |
| Sticky CTA pequeño sin safe-area | 48px + safe-area-inset + copy "Lo quiero" |
| iOS zoom on input focus | `font-size: 16px` mobile |
| Touch targets variables | 44×44 garantizado en interactivos críticos |
