import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import type { Product, Category } from './types';

export const products: Product[] = productsData as Product[];
export const categories: Category[] = categoriesData as Category[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categories.some((c) => c.slug === categorySlug));
}

/** Categories that actually contain products, with counts — used for shop filters & nav. */
export function getCategoriesWithCounts(): Array<Category & { count: number }> {
  return categories
    .map((c) => ({ ...c, count: getProductsByCategory(c.slug).length }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);
}

export function getRelatedProducts(product: Product, limit = 8): Product[] {
  const catSlugs = new Set(product.categories.map((c) => c.slug));
  const related = products.filter(
    (p) => p.id !== product.id && p.categories.some((c) => catSlugs.has(c.slug)),
  );
  const pool = related.length >= limit ? related : [...related, ...products.filter((p) => p.id !== product.id)];
  const seen = new Set<number>();
  const out: Product[] = [];
  for (const p of pool) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    out.push(p);
    if (out.length >= limit) break;
  }
  return out;
}

/** Highest-priced, sale items first — a reasonable "featured" proxy. */
export function getFeaturedProducts(limit = 12): Product[] {
  return [...products]
    .sort((a, b) => Number(b.onSale) - Number(a.onSale) || (b.price ?? 0) - (a.price ?? 0))
    .slice(0, limit);
}

export function getLatestProducts(limit = 8): Product[] {
  return [...products].sort((a, b) => b.id - a.id).slice(0, limit);
}

export function getBestSellers(limit = 8): Product[] {
  // Deterministic pseudo-ranking by id hash so the row is stable across renders.
  return [...products].sort((a, b) => ((b.id * 7) % 97) - ((a.id * 7) % 97)).slice(0, limit);
}

export function getOnSaleProducts(): Product[] {
  return products.filter((p) => p.onSale);
}
