'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product, Category } from '@/lib/types';
import ProductGrid from './ProductGrid';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Mis en avant' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name', label: 'Nom (A → Z)' },
];

interface Props {
  products: Product[];
  categories: Array<Category & { count: number }>;
}

export default function ShopBrowser({ products, categories }: Props) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('categorie') ?? 'all';
  const [activeCat, setActiveCat] = useState<string>(initialCat);
  const [sort, setSort] = useState<SortKey>('featured');

  const filtered = useMemo(() => {
    let list = activeCat === 'all' ? products : products.filter((p) => p.categories.some((c) => c.slug === activeCat));
    list = [...list];
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case 'price-desc':
        list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
        break;
      default:
        list.sort((a, b) => Number(b.onSale) - Number(a.onSale) || (b.price ?? 0) - (a.price ?? 0));
    }
    return list;
  }, [products, activeCat, sort]);

  const activeName = activeCat === 'all' ? 'Toutes les palettes' : categories.find((c) => c.slug === activeCat)?.name;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Sidebar filters */}
      <aside className="lg:sticky lg:top-28 lg:h-fit">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-900">Catégories</h2>
        <ul className="flex flex-col gap-1">
          <li>
            <button
              type="button"
              onClick={() => setActiveCat('all')}
              className={`flex w-full min-h-11 items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                activeCat === 'all' ? 'bg-brand-500 font-semibold text-white' : 'text-brand-700 hover:bg-brand-50'
              }`}
            >
              <span className="truncate">Toutes les palettes</span>
              <span className="shrink-0 text-xs opacity-70">{products.length}</span>
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.slug} className="min-w-0">
              <button
                type="button"
                onClick={() => setActiveCat(c.slug)}
                className={`flex w-full min-h-11 items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  activeCat === c.slug ? 'bg-brand-500 font-semibold text-white' : 'text-brand-700 hover:bg-brand-50'
                }`}
              >
                <span className="truncate">{c.name}</span>
                <span className="shrink-0 text-xs opacity-70">{c.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Results */}
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-brand-600">
            <span className="font-semibold text-brand-900">{filtered.length}</span> résultat
            {filtered.length > 1 ? 's' : ''} · {activeName}
          </p>
          <label className="flex items-center gap-2 text-sm text-brand-600">
            Trier&nbsp;:
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-11 rounded-lg border border-brand-200 bg-white px-3 text-sm font-medium text-brand-800 outline-none focus:border-accent-400"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} priorityCount={4} />
        ) : (
          <p className="rounded-xl border border-dashed border-brand-200 py-16 text-center text-brand-500">
            Aucune palette dans cette catégorie pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
