import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CollectionSection from "@/components/CollectionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import VideoGallery from "@/components/VideoGallery";
import CategoryGrid from "@/components/CategoryGrid";
import ShopByIntent from "@/components/ShopByIntent";
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

        {/* 1. Categorías — punto de partida claro */}
        <CategoryGrid />

        {/* 2. Compra por momento de uso — reduce fricción de descubrimiento */}
        <ShopByIntent />

        {/* 3. Nueva colección */}
        <CollectionSection
          eyebrow="Nueva colección"
          title="Esencia by Dany Osorno."
          lede="Una cápsula que mezcla feminidad, soporte y silueta para acompañarte de la mañana a la noche."
          products={esenciaProducts}
          viewAllHref="/catalogo?coleccion=esencia"
        />

        {/* 4. Talla Única — confianza */}
        <TallaUnica />

        {/* 5. RPO Club — fidelización */}
        <RpoClub />

        {/* 6. Best sellers / Prisma */}
        <CollectionSection
          eyebrow="Los favoritos de la comunidad"
          title="Colección Prisma."
          lede="Diseños protagonistas para entrenar fuerte, descansar bien y verte increíble en cualquier rutina."
          products={prismaProducts}
          viewAllHref="/catalogo?coleccion=prisma"
          background="soft"
        />

        {/* 7. Marquee — respiro */}
        <MarqueeBanner />

        {/* 8. Últimas unidades — urgencia */}
        <CollectionSection
          eyebrow="Aprovecha mientras alcance"
          title="Últimas unidades."
          lede="Piezas seleccionadas con descuento mientras quede inventario. Sin reposición garantizada."
          products={ultimasProducts}
          viewAllHref="/catalogo?quick=ultimas-unidades"
          viewAllLabel="Ver todas las ofertas"
        />

        {/* 9. Comunidad */}
        <TestimonialsSection />

        {/* 10. Video shoppable */}
        <VideoGallery />

        {/* 11. Confianza — pagos */}
        <PaymentsBanner />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
