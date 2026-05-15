import { notFound } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import ProductDetail from "@/components/ProductDetail";
import { ALL_PRODUCTS, getProductBySlug } from "@/data/products";

export function generateStaticParams() {
  return ALL_PRODUCTS.filter((p) => p.slug).map((p) => ({ slug: p.slug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto · RPO" };
  return {
    title: `${product.title} · RPO`,
    description:
      product.story ??
      product.benefitsCopy ??
      `${product.title} — ${product.price}. Ropa deportiva RPO.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <ProductDetail product={product} />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
