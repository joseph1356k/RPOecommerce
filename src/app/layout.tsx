import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "RPO | Do sport in style ✨ | Ropa deportiva para mujer",
  description:
    "Ropa deportiva diseñada en Colombia para mujeres que se mueven con intención. Tecnología, comodidad y estilo en cada prenda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
