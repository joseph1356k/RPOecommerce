import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "RPO | Ropa deportiva para mujer · Hecha en Colombia",
  description:
    "Ropa deportiva diseñada en Colombia para mujeres que se mueven con intención. Tecnología, comodidad y estilo en cada prenda.",
  applicationName: "RPO",
  themeColor: "#ffffff",
  formatDetection: { telephone: false },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RPO",
  },
  openGraph: {
    title: "RPO | Ropa deportiva para mujer",
    description: "Diseñado para moverte segura, vestirte con intención.",
    type: "website",
    locale: "es_CO",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  viewportFit: "cover", // honor iPhone safe-area-inset
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        {/* Preload LCP hero image to improve mobile FCP/LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/hero/slide-1.jpg"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
