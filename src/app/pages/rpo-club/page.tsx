import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import ClubHero from "@/components/club/ClubHero";
import HowItWorks from "@/components/club/HowItWorks";
import TierSystem from "@/components/club/TierSystem";
import BenefitCalculator from "@/components/club/BenefitCalculator";
import CommunityFaq from "@/components/club/CommunityFaq";
import FinalCta from "@/components/club/FinalCta";

export const metadata = {
  title: "RPO Club · Membresía gratuita",
  description:
    "Tu lugar en RPO. Acceso anticipado, puntos en cada compra, regalos de cumpleaños y eventos privados. 100% gratis, sin permanencia.",
};

export default function RpoClubPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <ClubHero />
        <HowItWorks />
        <TierSystem />
        <BenefitCalculator />
        <CommunityFaq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
