# tiendarpo.com — Behaviors

## Scroll behaviors

- Header: likely becomes sticky/shrinks on scroll (z-index 8, JS-driven — verify)
- AnnouncementBar: scrolls with page, not sticky
- MarqueeBanner: CSS animation scrolling text ticker

## Hover states (to verify during component build)

- Nav links: underline or color change on hover
- Product cards: image zoom on hover
- "Ver todo" button: background color invert
- Category grid images: overlay or zoom on hover
- Footer links: underline on hover

## Interactive components

| Component | Interaction model | Mechanism |
|-----------|-------------------|-----------|
| HeroBanner slider | Auto-play + arrows | JS carousel |
| TestimonialsCarousel | Click arrows | JS carousel |
| SubscribeSidebar | Click to open popup | JS toggle |
| VideoGallery | Click to play | Native video |
| CategoryGrid | Click → navigate | Standard links |

## Responsive breakpoints (estimated)

- Desktop: 1440px — 4-column product grids
- Tablet: 768px — 2-column grids, nav collapses
- Mobile: 390px — 1-column, hamburger menu

## Animations

- MarqueeBanner: CSS `animation: marquee` infinite scroll
- Product image hover: `transform: scale(1.03)` with `transition: .25s ease-out`
- Hero slider: fade or slide transition
