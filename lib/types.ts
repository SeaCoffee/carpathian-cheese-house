export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  categoryName: string;
  shortDescription: string;
  description: string;
  ingredients: string[];
  aging: string;
  weight: string;
  price: number;
  unit: string;
  image: string;
  tags: string[];
  isAvailable: boolean;
  isFeatured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}
