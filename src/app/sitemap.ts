import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/page-dachat', '/contact', '/cart'].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const productRoutes = getAllProducts().map((p) => ({
    url: `${site.url}/product/${p.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
