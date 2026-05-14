import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CollectionSection from "@/components/CollectionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import VideoGallery from "@/components/VideoGallery";
import CategoryGrid from "@/components/CategoryGrid";
import MarqueeBanner from "@/components/MarqueeBanner";
import TallaUnica from "@/components/TallaUnica";
import RpoClub from "@/components/RpoClub";
import PaymentsBanner from "@/components/PaymentsBanner";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { ALL_PRODUCTS } from "@/data/products";

export default function HomePage() {
  const esenciaProducts = ALL_PRODUCTS.filter((p) => p.collection === "esencia").slice(0, 4);
  const prismaProducts = ALL_PRODUCTS.filter((p) => p.collection === "prisma").slice(0, 4);
  const ultimasProducts = ALL_PRODUCTS.filter((p) => p.tags?.includes("oferta")).slice(0, 4);

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <HeroBanner />

        {/* 1. Categorías — punto de partida claro para no perderse */}
        <CategoryGrid />

        {/* 2. Nueva colección destacada */}
        <CollectionSection
          eyebrow="Nueva colección"
          title="Esencia by Dany Osorno."
          lede="Una cápsula que mezcla feminidad, soporte y silueta para acompañarte de la mañana a la noche."
          products={esenciaProducts}
          viewAllHref="/collections/esencia-by-dany-osorno"
        />

        {/* 3. Talla Única — comunicación de ajuste (genera confianza) */}
        <TallaUnica />

        {/* 4. RPO Club — VIP impulsa registro y recompra */}
        <RpoClub />

        {/* 5. Best sellers / Prisma */}
        <CollectionSection
          eyebrow="Los favoritos de la comunidad"
          title="Colección Prisma."
          lede="Diseños protagonistas para entrenar fuerte, descansar bien y verte increíble en cualquier rutina."
          products={prismaProducts}
          viewAllHref="/collections/prisma"
          background="soft"
        />

        {/* 6. Marquee — momento de respiro entre grids */}
        <MarqueeBanner />

        {/* 7. Últimas unidades — urgencia */}
        <CollectionSection
          eyebrow="Aprovecha mientras alcance"
          title="Últimas unidades."
          lede="Piezas seleccionadas con descuento mientras quede inventario. Sin reposición garantizada."
          products={ultimasProducts}
          viewAllHref="/catalogo?quick=ultimas-unidades"
          viewAllLabel="Ver todas las ofertas"
        />

        {/* 8. Comunidad — testimonios reales */}
        <TestimonialsSection />

        {/* 9. Video shoppable — al final, decora sin saturar */}
        <VideoGallery />

        {/* 10. Confianza — pagos */}
        <PaymentsBanner />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
