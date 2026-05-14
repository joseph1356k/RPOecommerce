import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import FavoritesClient from "@/components/FavoritesClient";

export const metadata = {
  title: "Favoritos · RPO",
  description: "Tu lista de deseos RPO. Guarda tus prendas favoritas para comprarlas después.",
};

export default function FavoritesPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <FavoritesClient />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
