export type ProductType =
  | "enterizos"
  | "tops"
  | "leggins"
  | "shorts"
  | "sets"
  | "medias"
  | "accesorios"
  | "buzos";

export type ProductCollection =
  | "esencia"
  | "aura"
  | "calma"
  | "pausa"
  | "esenciales"
  | "prisma";

export type ProductTag = "novedad" | "best-seller" | "oferta" | "ultimas-unidades";

export interface Product {
  id: string;
  title: string;
  price: string;
  priceValue?: number;
  comparePrice?: string;
  image: string;
  imageHover?: string;
  href: string;
  reviewCount?: number;
  rating?: number;
  badge?: string;
  type?: ProductType;
  collection?: ProductCollection;
  colors?: string[];
  tags?: ProductTag[];
  benefitsCopy?: string;
}

export interface Category {
  name: string;
  image: string;
  href: string;
  description?: string;
}

export interface Testimonial {
  image: string;
  text: string;
  author: string;
}
