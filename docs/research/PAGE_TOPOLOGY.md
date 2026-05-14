# tiendarpo.com — Page Topology

## Sections (top to bottom)

| # | Name | Type | Notes |
|---|------|------|-------|
| 1 | AnnouncementBar | Static | Black bg, white text, single line |
| 2 | Header / Navbar | Sticky overlay | Logo RPO, nav links, search/user/cart icons |
| 3 | HeroBanner | Slider | Full-viewport, 2 slides visible, promo text overlay |
| 4 | SubscribeSidebar | Fixed left tab | "Suscríbete" rotated text, slide-in popup on click |
| 5 | CollectionEsencia | Product grid | "Esencia By Dany Osorno" — 4-col, 8 products |
| 6 | VerTodoBtn | CTA | Black button centered |
| 7 | TestimonialsCarousel | Carousel | "Lo que dicen nuestras clientes..." photo + text cards |
| 8 | VideoGallery | Video grid | 4 shoppable videos with product info below |
| 9 | CategoryGrid | 2×2 image grid | Sets / Enterizos / Leggins / Tops — full-width |
| 10 | MarqueeBanner | Scroll ticker | Repeating "ENVÍO GRATIS..." text on black bg |
| 11 | CollectionPrisma | Product grid | "Colección PRISMA" — horizontal scroll, 4+ products |
| 12 | PaymentsBanner | Full-bleed section | "PAGOS SEGUROS CON" + 6 payment logos on photo bg |
| 13 | CollectionUltimas | Product grid | "Últimas unidades" — 4-col, sale badges |
| 14 | Footer | Static | Black bg, 4 columns: brand / Políticas / Servicio / Ubicaciones |
| 15 | FooterBottom | Static | Instagram icon only |
| 16 | WhatsAppFAB | Fixed | Bottom-right green WhatsApp floating button |

## Layout structure

- Max-width: ~1400–1500px (full-bleed sections break out)
- Page scroll: standard (no Lenis or custom scroll detected)
- Header: position relative at top, z-index 8

## Fixed / Overlay elements

- Header (z-index 8) — sticky on scroll (JS-driven)
- SubscribeSidebar — fixed left edge
- WhatsAppFAB — fixed bottom-right

## Key URLs
- Homepage: https://tiendarpo.com
- Fonts CDN: https://tiendarpo.com/cdn/fonts/
