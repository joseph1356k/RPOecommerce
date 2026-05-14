import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CollectionSection from "@/components/CollectionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import VideoGallery from "@/components/VideoGallery";
import CategoryGrid from "@/components/CategoryGrid";
import MarqueeBanner from "@/components/MarqueeBanner";
import PaymentsBanner from "@/components/PaymentsBanner";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import type { Product } from "@/types";

const ESENCIA_PRODUCTS: Product[] = [
  { id: "e1", title: "Enterizo largo H sin mangas Cute", price: "179.900 COP", image: "/images/products/esencia-enterizo-largo-h.jpg", href: "/products/enterizo-largo-h", rating: 4, reviewCount: 1 },
  { id: "e2", title: "Enterizo Alíe Esencia", price: "179.900 COP", image: "/images/products/esencia-2.jpg", href: "/products/enterizo-alie-esencia" },
  { id: "e3", title: "Set Rossy Esencia", price: "239.800 COP", image: "/images/products/esencia-3.jpg", href: "/products/set-rossy-esencia", rating: 5, reviewCount: 4 },
  { id: "e4", title: "Enterizo Movee", price: "169.900 COP", image: "/images/products/esencia-4.jpg", href: "/products/enterizo-movee" },
  { id: "e5", title: "Enterizo Largo Esencia", price: "179.900 COP", image: "/images/products/esencia-5.jpg", href: "/products/enterizo-largo-esencia", rating: 5, reviewCount: 2 },
  { id: "e6", title: "Enterizo Ray Esencia", price: "159.900 COP", image: "/images/products/esencia-6.jpg", href: "/products/enterizo-ray-esencia" },
  { id: "e7", title: "Short Buccos Esencia", price: "119.900 COP", image: "/images/products/esencia-7.jpg", href: "/products/short-buccos-esencia" },
  { id: "e8", title: "Top Elastic Esencia", price: "109.900 COP", image: "/images/products/esencia-8.jpg", href: "/products/top-elastic-esencia" },
];

const PRISMA_PRODUCTS: Product[] = [
  { id: "p1", title: "Enterizo Corto Bali", price: "169.000 COP", image: "/images/products/prisma-1.jpg", href: "/products/enterizo-corto-bali" },
  { id: "p2", title: "Enterizo Corto Paris", price: "159.000 COP", image: "/images/products/prisma-2.jpg", href: "/products/enterizo-corto-paris" },
  { id: "p3", title: "Leggings Aline Prisma", price: "119.000 COP", image: "/images/products/prisma-3.jpg", href: "/products/leggings-aline-prisma" },
  { id: "p4", title: "Top Bra Prisma", price: "49.900 COP", comparePrice: "89.000 COP", image: "/images/products/prisma-4.jpg", href: "/products/top-bra-prisma" },
  { id: "p5", title: "Buzo Valet", price: "83.300 COP", comparePrice: "129.000 COP", image: "/images/products/prisma-5.jpg", href: "/products/buzo-valet" },
  { id: "p6", title: "Pantaloneta Prisma", price: "59.000 COP", comparePrice: "99.000 COP", image: "/images/products/prisma-6.jpg", href: "/products/pantaloneta-prisma" },
  { id: "p7", title: "Leggings Bailarina", price: "92.650 COP", comparePrice: "129.000 COP", image: "/images/products/prisma-7.jpg", href: "/products/leggings-bailarina" },
  { id: "p8", title: "Top Flux", price: "98.100 COP", image: "/images/products/prisma-8.jpg", href: "/products/top-flux" },
];

const ULTIMAS_PRODUCTS: Product[] = [
  { id: "u1", title: "Top Bra Prisma", price: "49.900 COP", comparePrice: "89.000 COP", image: "/images/products/prisma-4.jpg", href: "/products/top-bra-prisma", badge: "Oferta" },
  { id: "u2", title: "Buzo Valet", price: "83.300 COP", comparePrice: "129.000 COP", image: "/images/products/prisma-5.jpg", href: "/products/buzo-valet", badge: "Oferta" },
  { id: "u3", title: "Pantaloneta Prisma", price: "59.000 COP", comparePrice: "99.000 COP", image: "/images/products/prisma-6.jpg", href: "/products/pantaloneta-prisma", badge: "Oferta" },
  { id: "u4", title: "Leggings Bailarina", price: "92.650 COP", comparePrice: "129.000 COP", image: "/images/products/prisma-7.jpg", href: "/products/leggings-bailarina", badge: "Oferta" },
];

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <HeroBanner />
        <CollectionSection
          title="Esencia By Dany Osorno"
          products={ESENCIA_PRODUCTS}
          viewAllHref="/collections/esencia-by-dany-osorno"
        />
        <TestimonialsSection />
        <VideoGallery />
        <CategoryGrid />
        <MarqueeBanner />
        <CollectionSection
          title="Colección PRISMA"
          products={PRISMA_PRODUCTS}
          viewAllHref="/collections/prisma"
        />
        <PaymentsBanner />
        <CollectionSection
          title="Últimas unidades"
          products={ULTIMAS_PRODUCTS}
          viewAllHref="/collections/ultimas-unidades"
        />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
