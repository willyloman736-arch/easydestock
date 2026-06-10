export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductCategoryRef {
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  regularPrice: number | null;
  price: number | null;
  onSale: boolean;
  shortDescription: string;
  descriptionHtml: string;
  categories: ProductCategoryRef[];
  images: ProductImage[];
  sku: string;
  inStock: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CartLine {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
