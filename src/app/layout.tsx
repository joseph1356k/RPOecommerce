import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RPO | Do sport in style ✨ | Ropa deportiva para mujer",
  description: "Nuestra ropa deportiva combina tecnología avanzada y diseño ergonómico, realzando tu figura con total comodidad durante tus entrenamientos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
