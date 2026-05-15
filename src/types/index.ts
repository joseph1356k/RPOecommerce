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

export interface ProductFeature {
  label: string;
  value: string;
}

export interface ProductReview {
  rating: number;
  text: string;
  author: string;
  city?: string;
  verified?: boolean;
}

export interface Product {
  id: string;
  slug?: string;
  title: string;
  subtitle?: string;
  price: string;
  priceValue?: number;
  comparePrice?: string;
  image: string;
  imageHover?: string;
  gallery?: string[];
  href: string;
  reviewCount?: number;
  rating?: number;
  badge?: string;
  type?: ProductType;
  collection?: ProductCollection;
  colors?: string[];
  tags?: ProductTag[];
  benefitsCopy?: string;
  inStock?: boolean;
  intent?: ProductIntent[];
  // Rich PDP content
  story?: string;
  features?: ProductFeature[];
  fabric?: string;
  care?: string[];
  fitNotes?: string;
  styledFor?: string[];
  reviews?: ProductReview[];
}

export type ProductIntent = "entrenar" | "diario" | "viajar" | "comodidad" | "estilizada" | "look-completo";

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
