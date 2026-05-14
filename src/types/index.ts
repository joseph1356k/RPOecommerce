export interface Product {
  id: string;
  title: string;
  price: string;
  comparePrice?: string;
  image: string;
  href: string;
  reviewCount?: number;
  rating?: number;
  badge?: string;
}

export interface Category {
  name: string;
  image: string;
  href: string;
}

export interface Testimonial {
  image: string;
  text: string;
  author: string;
}
