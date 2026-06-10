'use client';

import { useRef } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from './icons';

export default function ProductSlider({ products }: { products: Product[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.9, 720), behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-1 px-1 pb-2"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[23.5%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Précédent"
        className="absolute -left-3 top-[38%] hidden h-10 w-10 items-center justify-center rounded-full border border-brand-100 bg-white text-brand-700 shadow-md hover:bg-brand-50 lg:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Suivant"
        className="absolute -right-3 top-[38%] hidden h-10 w-10 items-center justify-center rounded-full border border-brand-100 bg-white text-brand-700 shadow-md hover:bg-brand-50 lg:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
