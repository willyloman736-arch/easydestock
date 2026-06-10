'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import { formatPrice } from '@/lib/format';
import { CloseIcon, SearchIcon } from './icons';

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export default function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (q.length < 2) return [];
    return products
      .filter((p) => normalize(p.name + ' ' + p.categories.map((c) => c.name).join(' ')).includes(q))
      .slice(0, 8);
  }, [query]);

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Recherche">
      <div className="absolute inset-0 bg-brand-950/50" onClick={onClose} />
      <div className="absolute left-1/2 top-16 w-[92%] max-w-2xl -translate-x-1/2 rounded-2xl bg-white p-4 shadow-2xl">
        <div className="flex items-center gap-3 rounded-xl border border-brand-200 px-3 focus-within:border-accent-400">
          <SearchIcon className="h-5 w-5 text-brand-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une palette, une marque, une catégorie…"
            className="h-12 flex-1 bg-transparent text-base outline-none placeholder:text-brand-400"
            aria-label="Champ de recherche"
          />
          <button type="button" onClick={onClose} aria-label="Fermer la recherche" className="text-brand-500 hover:text-accent-600">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {query.trim().length >= 2 && (
          <ul className="mt-3 max-h-[60vh] divide-y divide-brand-50 overflow-auto">
            {results.length === 0 && (
              <li className="px-2 py-6 text-center text-sm text-brand-500">Aucun résultat pour « {query} »</li>
            )}
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/product/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-brand-50"
                >
                  <Image
                    src={p.images[0].src}
                    alt={p.images[0].alt}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <span className="flex-1 text-sm font-medium text-brand-800">{p.name}</span>
                  <span className="text-sm font-semibold text-accent-600">{formatPrice(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
