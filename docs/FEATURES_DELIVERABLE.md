# RPO — Features Deliverable (Fase 1 + bases Fase 2/3)

Entregable estratégico de funcionalidades implementadas y planeadas, con justificación de negocio, archivos modificados, eventos de tracking y métricas de éxito.

Stack actual: **Next.js 16.2.6 (App Router) + React 19 + TypeScript**. No es Shopify aún — toda la lógica de cart/wishlist vive en Context + localStorage, lista para conectarse a Shopify Storefront API en migración futura.

---

## 1. Funcionalidades implementadas (Fase 1)

### 1.1 Carrito global + drawer lateral
**Archivos:** [CartContext.tsx](src/context/CartContext.tsx), [CartDrawer.tsx](src/components/CartDrawer.tsx), [ClientProviders.tsx](src/components/ClientProviders.tsx), [layout.tsx](src/app/layout.tsx), [format.ts](src/lib/format.ts)

**Qué hace:**
- Estado global del carrito con `useReducer` + persistencia en `localStorage`.
- Drawer lateral que se abre automáticamente al añadir productos.
- **Barra de envío gratis** que muestra cuánto falta para los $500.000 ("Te faltan $XX para envío gratis"). Cuando llega: estado "🎉 ¡Listo!" con cambio de color.
- Controles de cantidad +/− y eliminar item con tracking.
- Empty state amable con CTA a catálogo + favoritos.
- ESC y click-fuera para cerrar; body scroll lock mientras está abierto.
- CTA principal `Ir al checkout · $XXX.XXX` (placeholder; conectar a Shopify checkout al migrar).

**Razón de negocio:**
- **AOV (ticket promedio):** la barra de envío gratis es uno de los upsells más rentables. Reduce abandono y empuja a la clienta a sumar 1-2 piezas más.
- **Reducir abandono:** drawer en vez de página completa = menos contexto perdido.

**Problema del journey que soluciona:** la clienta no perdía el contexto del producto al añadir; veía cuánto le faltaba al envío gratis; entendía qué tenía en el carrito sin salir de la página.

**Métricas de éxito:**
- Cart abandonment rate (objetivo: <60%).
- AOV (objetivo: +15-25% al activar barra de envío).
- Add-to-cart rate.
- Tiempo entre `add_to_cart` y `begin_checkout`.

---

### 1.2 Wishlist / Favoritos
**Archivos:** [WishlistContext.tsx](src/context/WishlistContext.tsx), [favoritos/page.tsx](src/app/favoritos/page.tsx), [FavoritesClient.tsx](src/components/FavoritesClient.tsx), [Header.tsx](src/components/Header.tsx), [ProductCard.tsx](src/components/ProductCard.tsx)

**Qué hace:**
- Botón de corazón en cada ProductCard (esquina superior derecha de la imagen).
- Persistencia en `localStorage` — sobrevive recargas y cierre del navegador.
- Página `/favoritos` lista todos los guardados.
- Contador con badge en el header (color del acento de marca).
- CTA cruzado: "Únete a RPO Club y guarda en la nube" — convierte intención en lead.

**Razón de negocio:**
- **Captura de intención:** clientas que no compran hoy guardan para mañana. Sin wishlist, esa intención se pierde.
- **Remarketing:** los favoritos son señales fortísimas para campañas de Meta Ads / Google Ads.
- **Recompra:** la clienta vuelve a su lista cuando tiene presupuesto.

**Problema del journey:** "Me gusta pero no lo compro ahora" → antes se perdía, ahora se guarda.

**Métricas:**
- `add_to_wishlist` per session.
- Tasa de conversión wishlist → carrito (CTR del botón "Añadir" en /favoritos).
- Wishlist-to-purchase rate (clientas con wishlist que vuelven y compran).

---

### 1.3 Quick Add real (carrito desde cualquier tarjeta)
**Archivos:** [ProductCard.tsx](src/components/ProductCard.tsx)

**Qué hace:**
- Botón `+ Añadir al carrito` aparece en hover sobre la imagen (desktop) y siempre visible en mobile (a través del long-press / tap).
- Selecciona automáticamente el primer color disponible y añade qty 1 al carrito → abre el drawer.
- Tracking con `data-event="rpo_quick_add"` y evento de fuente.

**Razón de negocio:**
- **Reducir pasos:** clientas con intención clara (best sellers, ofertas) pueden añadir sin entrar a PDP.
- **Aumentar conversion rate:** menos clics = menos fricción.

**Métricas:**
- `rpo_quick_add` vs `add_to_cart` desde PDP. Si quick_add representa >25%, está funcionando.

---

### 1.4 Completa tu look (cross-sell inteligente)
**Archivos:** [CompleteYourLook.tsx](src/components/CompleteYourLook.tsx), usado en PDP y CartDrawer.

**Qué hace:**
- Algoritmo de recomendación basado en **tipo complementario** (mapa interno: tops → leggings/shorts, leggings → tops/sets, enterizos → buzos/tops, etc.) priorizando misma colección.
- Aparece en PDP como sección "Completa el look".
- Aparece en CartDrawer como mini-cards con `+ Añadir` directo.
- Botón "+ Añadir" agrega al carrito sin salir.

**Razón de negocio:**
- **AOV directo:** la clienta que ya decidió comprar un top está a un clic de añadir el legging que combina.
- **Asesoría de estilo:** no se siente venta agresiva, se siente recomendación inteligente.

**Problema del journey:** el outfit se compra en partes y la clienta termina con un top suelto. Con este componente se vende el set.

**Métricas:**
- `rpo_complete_look_add` rate (objetivo: 10-15% de las sesiones de PDP).
- Δ AOV entre clientas con vs sin add desde CompleteYourLook.

---

### 1.5 Sticky Add to Cart mobile
**Archivos:** [StickyAddToCart.tsx](src/components/StickyAddToCart.tsx)

**Qué hace:**
- Barra fija inferior solo en mobile que aparece al scrollear >600px de la PDP.
- Muestra thumbnail + nombre + precio + botón "Agregar".
- Respeta `env(safe-area-inset-bottom)` para iPhones con notch.
- Si producto está agotado: botón "Agotado" en gris.

**Razón de negocio:**
- **Conversion mobile:** la mayoría del tráfico es mobile y el botón principal queda fuera de vista cuando lees reseñas, accordion o "Completa el look".

**Métricas:**
- CTR del sticky vs CTA principal.
- Conversion rate mobile pre/post.

---

### 1.6 Back in Stock (Avísame cuando vuelva)
**Archivos:** [BackInStockForm.tsx](src/components/BackInStockForm.tsx), [ProductDetail.tsx](src/components/ProductDetail.tsx)

**Qué hace:**
- Cuando un producto tiene `inStock: false` (ej. Enterizo Ray Esencia para demo), reemplaza el botón "Agregar al carrito" por un formulario.
- Toggle entre canal `Email` y `WhatsApp`.
- Validación básica + estado de éxito.
- Evento `rpo_back_in_stock_submit` con producto y canal.
- **Pendiente backend:** POST a `/api/back-in-stock` cuando RPO conecte Klaviyo / Postscript / propio.

**Razón de negocio:**
- **Recuperar ventas perdidas:** una página agotada normalmente pierde a la clienta para siempre.
- **Capturar leads:** email/WhatsApp es valor accionable para remarketing.

**Métricas:**
- Tasa de submit en páginas agotadas.
- Conversion rate del email/WhatsApp de notificación cuando vuelve el stock.

---

### 1.7 Recently Viewed
**Archivos:** [useRecentlyViewed.ts](src/hooks/useRecentlyViewed.ts), [RecentlyViewed.tsx](src/components/RecentlyViewed.tsx)

**Qué hace:**
- Hook que persiste los últimos 12 IDs vistos en `localStorage`.
- Se ejecuta automáticamente en cada PDP (en `ProductDetail.tsx`).
- Componente lo renderiza al final de la PDP, excluyendo el producto actual.

**Razón de negocio:**
- **Reducir abandono:** la clienta que compara productos no pierde lo que ya vio.
- **Mejorar descubrimiento:** facilita volver a un producto sin re-buscar.

**Métricas:**
- CTR de tarjetas en sección "Vistos recientemente".
- Sesiones con >3 PDPs vistas.

---

### 1.8 Compra por momento de uso (ShopByIntent)
**Archivos:** [ShopByIntent.tsx](src/components/ShopByIntent.tsx), [data/products.ts](src/data/products.ts) (campo `intent` por producto), [CatalogClient.tsx](src/components/CatalogClient.tsx), [Header.tsx](src/components/Header.tsx) (menú "Por momento")

**Qué hace:**
- 6 categorías por intención: Para entrenar, Día a día, Para viajar, Comodidad, Estilizada, Looks completos.
- Visible en home como bloque inmediatamente después de las categorías por tipo.
- Visible en el header como dropdown "Por momento".
- Filtro `?intent=` en `/catalogo` con chips horizontales scrollables.

**Razón de negocio:**
- **Mejorar descubrimiento:** la clienta no piensa "quiero un legging", piensa "necesito algo para entrenar / viajar / estar cómoda".
- **Inspiración Alo Yoga / Lululemon:** vender lifestyle, no SKUs.

**Métricas:**
- Tráfico al catálogo desde chips de intent.
- Conversion rate por intent (saber qué momentos venden más).

---

### 1.9 WhatsApp contextual
**Archivos:** [whatsapp.ts](src/lib/whatsapp.ts), [WhatsAppFAB.tsx](src/components/WhatsAppFAB.tsx), [ProductDetail.tsx](src/components/ProductDetail.tsx), [StoreAvailability.tsx](src/components/StoreAvailability.tsx)

**Qué hace:**
- Helper centralizado `whatsappUrl(ctx)` que genera URL con mensaje prellenado según contexto:
  - `general`: "Hola RPO 👋 Quiero ayuda con mi compra."
  - `product`: "Hola RPO 👋 Estoy viendo *Top Bra Prisma* en color nude y quiero ayuda para elegir."
  - `fit`: asesoría de ajuste.
  - `stock`: disponibilidad por ciudad.
  - `look`: armar look.
- FAB con hint suave que aparece 6s después de la carga y desaparece a los 14s (una vez por sesión).
- En PDP: botón "¿Dudas con el ajuste o color? Te asesoramos por WhatsApp." con mensaje específico del producto.

**Razón de negocio:**
- **Convertir dudas en conversaciones:** clientas indecisas que abandonan ahora pueden hablar con alguien.
- **Conectar online + físico:** WhatsApp es el canal donde las tiendas físicas reciben pedidos en LATAM.

**Métricas:**
- `rpo_whatsapp_click` por fuente (`fab` / `pdp` / `stock`).
- Tasa de cierre desde WhatsApp (medido en RPO).

---

### 1.10 Disponibilidad en tienda física
**Archivos:** [StoreAvailability.tsx](src/components/StoreAvailability.tsx), integrado en [ProductDetail.tsx](src/components/ProductDetail.tsx)

**Qué hace:**
- Selector de ciudad (Medellín / Rionegro / Cali).
- Botón "Preguntar por WhatsApp · {ciudad}" con mensaje prellenado del producto + ciudad.

**Razón de negocio:**
- **Conectar canales:** clientas que prefieren probarse antes de comprar van a la tienda.
- **Confianza:** mostrar que la marca es real y tiene puntos físicos.

**Pendiente fase 3:** inventario real por tienda con API (Shopify Locations o ERP).

**Métricas:**
- `rpo_store_locator_click` por ciudad.
- Conversiones offline atribuidas a tráfico web (medir en POS).

---

### 1.11 RPO Club destacado (ya creado fase anterior)
- Sección dedicada en home, link en header y mobile drawer.
- Newsletter en footer.
- Tracking de clic en CTA.

---

### 1.12 Exit Intent Modal (lead capture)
**Archivos:** [ExitIntentModal.tsx](src/components/ExitIntentModal.tsx), montado globalmente en `ClientProviders`.

**Qué hace:**
- Solo desktop: detecta mouse leaving por la parte superior.
- Aparece una vez cada 7 días (persistencia en localStorage).
- Ofrece **10% de bienvenida** a cambio de email.
- Evento `generate_lead` con `source: "exit_intent"`.

**Razón de negocio:**
- **Capturar leads antes del abandono.**
- **No invasivo:** se dispara solo si la clienta está saliendo, no antes.

**Métricas:**
- Conversion rate del modal (objetivo: 3-8%).
- LTV de leads capturados por exit intent vs newsletter normal.

---

### 1.13 Tracking centralizado
**Archivos:** [tracking.ts](src/lib/tracking.ts)

**Qué hace:**
- Función `track(event, payload)` que push a `window.dataLayer` (GTM-friendly).
- Compatible con GA4 (eventos estándar `view_item`, `add_to_cart`, `add_to_wishlist`, `begin_checkout`, `select_item`, `generate_lead`, `remove_from_cart`, `remove_from_wishlist`).
- Eventos custom RPO documentados (`rpo_quick_add`, `rpo_quick_view`, `rpo_filter_change`, `rpo_sort_change`, `rpo_complete_look_add`, `rpo_back_in_stock_submit`, `rpo_whatsapp_click`, `rpo_store_locator_click`, `rpo_exit_intent_shown`).
- `data-event` attributes en CTAs claves por si RPO usa GTM con triggers DOM.
- Log a consola en dev (`console.debug`) para QA.

---

## 2. Estructura preparada para Fase 2/3

### 2.1 Quiz "Encuentra tu look RPO" — Fase 2
**Estructura preparada:** los productos ya tienen campo `intent` (array de momentos) y `colors`. Solo falta crear una página `/quiz` con 4 preguntas (uso, prenda, sensación, color) que mapeen a query string del catálogo:
```
/quiz → resultados → /catalogo?intent=entrenar&color=negro&tipo=leggins
```
La lógica de filtrado ya funciona. Estimación: 1 día de trabajo.

### 2.2 Reseñas UGC con fotos reales — Fase 2
**Pendiente de data:** TestimonialsSection ya tiene estructura para `image + text + author`. Cuando RPO suba fotos reales (Shopify metafields o CMS headless), reemplazar el array `TESTIMONIALS` con fetch desde la fuente.

### 2.3 Inventario por tienda física — Fase 3
**Requiere:** API o feed por tienda. Hoy el componente `StoreAvailability` abre WhatsApp como fallback. Cuando exista feed → reemplazar el botón por chips "Disponible en CC Santafé, Florida".

### 2.4 Recomendaciones personalizadas (no por reglas) — Fase 3
Hoy `CompleteYourLook` usa reglas (tipo complementario + colección). Para personalización real, integrar Algolia Recommend o Shopify Search & Discovery con ML.

### 2.5 Checkout Shopify real — Fase 3
El botón `Ir al checkout` apunta a `/checkout` (no existe). Al migrar a Shopify Hydrogen o conectar Storefront API, reemplazar `window.location.href = "/checkout"` por la URL del cart de Shopify.

### 2.6 Email automation (RPO Club, back-in-stock, abandoned cart) — Fase 2
Todos los formularios envían eventos pero **no persisten leads aún**. Integrar Klaviyo / Mailchimp / WhatsApp Business API:
- `back-in-stock` → flow de notificación cuando se reponga.
- `exit_intent` → DOI + secuencia de bienvenida.
- `cart_abandoned` → trigger a las 1h, 24h, 72h.

---

## 3. Riesgos de rendimiento y mantenimiento

| Riesgo | Mitigación |
|--------|------------|
| **localStorage**: el carrito + wishlist + recently-viewed dependen del navegador. Si la clienta limpia datos, se pierden. | Migrar a Shopify Customer Account API o cookies httpOnly en fase 2. Mostrar microcopy "Únete a RPO Club para guardar en la nube". |
| **No hay backend de leads aún.** | Conectar a Klaviyo (recomendado para fashion) o Mailchimp. Tomar 2-4h. |
| **Recomendaciones por reglas pueden ser repetitivas.** | OK para Fase 1. Migrar a Algolia Recommend o motor propio cuando haya volumen de datos. |
| **`data-event` attributes** | Mantener sincronizados con GTM. Si añaden tracking nuevos, agregar en `tracking.ts` y documentar. |
| **PDP genera 16 rutas estáticas.** Al pasar de 16 a 200+ productos, el build será más lento. | Activar ISR (`revalidate: 3600`) en `/products/[slug]` cuando haya muchos productos. |
| **Imágenes pesadas.** Algunas fotos de hero son grandes. | Usar Shopify CDN con `loader` de `next/image` cuando se migre. |

---

## 4. Datos que RPO necesita para sacar más jugo

1. **Inventario real por SKU + tienda** (para back-in-stock automático + disponibilidad en tienda).
2. **Reseñas verificadas** (Judge.me / Yotpo / Loox) — hoy son placeholders.
3. **Fotos UGC** de clientas con producto puesto — masivamente más persuasivo que renders.
4. **Lista de variantes reales por producto** (color, talla si hubiera) con stock individual.
5. **CRM / Email service provider** definido (Klaviyo recomendado).
6. **Pixel de Meta + GA4 + GTM** configurados en producción.
7. **WhatsApp Business API** con respuestas automáticas para las primeras 30s.

---

## 5. Eventos de tracking recomendados (GA4-friendly)

| Evento | Cuándo | Payload clave |
|--------|--------|---------------|
| `view_item` | Carga de PDP | item_id, item_name, item_category, price, currency |
| `select_item` | Clic en ProductCard | item_id, source |
| `add_to_cart` | Add desde PDP/quick-add | item_id, price, quantity |
| `remove_from_cart` | Eliminar del drawer | item_id, quantity |
| `begin_checkout` | Clic en "Ir al checkout" | value, items_count |
| `purchase` | Confirmación de compra (en Shopify post-migración) | transaction_id, value, items |
| `add_to_wishlist` | Toggle ON corazón | item_id |
| `remove_from_wishlist` | Toggle OFF corazón | item_id |
| `generate_lead` | Submit de exit-intent o newsletter | source, email-hash |
| `rpo_quick_add` | Quick-add desde tarjeta | item_id, source |
| `rpo_complete_look_add` | Add desde CompleteYourLook | item_id, from_item, source |
| `rpo_back_in_stock_submit` | Submit del formulario | item_id, channel |
| `rpo_whatsapp_click` | Cualquier botón de WhatsApp | source, ctx |
| `rpo_store_locator_click` | Preguntar por tienda | city, item_name |
| `rpo_filter_change` | Cambio en sidebar/chip | filter, value |
| `rpo_sort_change` | Cambio de orden | value |
| `rpo_exit_intent_shown` | Modal disparado | — |

---

## 6. Resumen por archivo (todo lo nuevo de esta fase)

**Contexts & libs:**
- [src/context/CartContext.tsx](src/context/CartContext.tsx)
- [src/context/WishlistContext.tsx](src/context/WishlistContext.tsx)
- [src/hooks/useRecentlyViewed.ts](src/hooks/useRecentlyViewed.ts)
- [src/lib/tracking.ts](src/lib/tracking.ts)
- [src/lib/whatsapp.ts](src/lib/whatsapp.ts)
- [src/lib/format.ts](src/lib/format.ts)

**Componentes nuevos:**
- [src/components/ClientProviders.tsx](src/components/ClientProviders.tsx)
- [src/components/CartDrawer.tsx](src/components/CartDrawer.tsx)
- [src/components/CompleteYourLook.tsx](src/components/CompleteYourLook.tsx)
- [src/components/StickyAddToCart.tsx](src/components/StickyAddToCart.tsx)
- [src/components/BackInStockForm.tsx](src/components/BackInStockForm.tsx)
- [src/components/RecentlyViewed.tsx](src/components/RecentlyViewed.tsx)
- [src/components/ShopByIntent.tsx](src/components/ShopByIntent.tsx)
- [src/components/ProductDetail.tsx](src/components/ProductDetail.tsx)
- [src/components/ProductGallery.tsx](src/components/ProductGallery.tsx)
- [src/components/StoreAvailability.tsx](src/components/StoreAvailability.tsx)
- [src/components/FavoritesClient.tsx](src/components/FavoritesClient.tsx)
- [src/components/ExitIntentModal.tsx](src/components/ExitIntentModal.tsx)

**Rutas nuevas:**
- [src/app/products/[slug]/page.tsx](src/app/products/[slug]/page.tsx) — PDP con 16 productos pre-renderizados.
- [src/app/favoritos/page.tsx](src/app/favoritos/page.tsx) — wishlist.

**Actualizados:**
- [src/app/layout.tsx](src/app/layout.tsx) — envuelve con ClientProviders.
- [src/app/page.tsx](src/app/page.tsx) — añade ShopByIntent.
- [src/components/Header.tsx](src/components/Header.tsx) — menú "Por momento", badges de cart/wishlist en tiempo real, drawer móvil.
- [src/components/WhatsAppFAB.tsx](src/components/WhatsAppFAB.tsx) — helper + hint + tracking.
- [src/components/ProductCard.tsx](src/components/ProductCard.tsx) — wishlist heart + quick-add real.
- [src/components/CatalogClient.tsx](src/components/CatalogClient.tsx) — filtro por intent + chips + tracking.
- [src/data/products.ts](src/data/products.ts) — slugs, gallery, inStock, intent + `getProductBySlug` / `getProductById`.
- [src/types/index.ts](src/types/index.ts) — Product extendido con slug, gallery, inStock, intent.

---

## 7. Siguiente fase recomendada (orden)

1. **Conectar Klaviyo** (back-in-stock + exit-intent + cart-abandoned). 1 día.
2. **Quiz "Encuentra tu look"** con 4 preguntas → catálogo filtrado. 1 día.
3. **Reseñas verificadas reales** (Judge.me en Shopify). 0.5 día.
4. **Fotos UGC reales** subidas y carruseladas en home + PDP. 1 día.
5. **Migración a Shopify** con Storefront API o Hydrogen (mantener este front, conectar data). 5-7 días.
6. **Inventario por tienda física** (Shopify Locations). 2-3 días.
7. **Loyalty real** con puntos visibles en header/checkout (Smile.io, Yotpo Loyalty). 2 días.
8. **A/B testing**: hero (slide aspiracional vs promo), barra de envío gratis (umbral), CTA quick-add (color/copy). Continuo.
