import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShopBrowser from '@/components/ShopBrowser';
import { getAllProducts, getCategoriesWithCounts } from '@/lib/products';

export const metadata: Metadata = {
  title: "Page d'achat — Toutes nos palettes de déstockage",
  description:
    'Parcourez notre catalogue complet de palettes de liquidation : high-tech, électroménager, outillage, textile, jouets et plus. Livraison France, Belgique, Suisse.',
  alternates: { canonical: '/page-dachat' },
};

export default function ShopPage() {
  const products = getAllProducts();
  const categories = getCategoriesWithCounts();

  return (
    <>
      <div className="border-b border-brand-100 bg-brand-50/60">
        <div className="container-x py-10">
          <nav aria-label="Fil d’Ariane" className="mb-2 text-xs text-brand-500">
            <Link href="/" className="hover:text-accent-600">
              Accueil
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-brand-700">Page d’achat</span>
          </nav>
          <h1 className="text-3xl font-bold text-brand-900 sm:text-4xl">Page d’achat</h1>
          <p className="mt-2 max-w-2xl text-sm text-brand-600">
            {products.length} palettes de déstockage et liquidation disponibles. Filtrez par catégorie et triez selon
            vos besoins de revente.
          </p>
        </div>
      </div>

      <div className="container-x py-10">
        <Suspense fallback={<p className="text-brand-500">Chargement du catalogue…</p>}>
          <ShopBrowser products={products} categories={categories} />
        </Suspense>
      </div>
    </>
  );
}
