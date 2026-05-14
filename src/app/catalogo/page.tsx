import { Suspense } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import CatalogClient from "@/components/CatalogClient";
import { SkeletonGrid } from "@/components/Skeleton";

export const metadata = {
  title: "Catálogo · RPO",
  description: "Encuentra leggings, tops, enterizos, sets y más. Filtra por tipo, colección, color y precio.",
};

export default function CatalogPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Suspense
          fallback={
            <section style={{ maxWidth: "1500px", margin: "0 auto", padding: "48px 24px" }}>
              <SkeletonGrid count={8} />
            </section>
          }
        >
          <CatalogClient />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
