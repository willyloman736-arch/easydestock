'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductImage } from '@/lib/types';

export default function ProductGallery({ images, discount }: { images: ProductImage[]; discount: number | null }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-brand-100 bg-brand-50">
        <Image
          src={main.src}
          alt={main.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        {discount && <span className="badge-sale absolute left-4 top-4 text-sm">-{discount}%</span>}
      </div>

      {images.length > 1 && (
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Voir l’image ${i + 1}`}
              aria-current={i === active}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === active ? 'border-accent-500' : 'border-transparent hover:border-brand-200'
              }`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
