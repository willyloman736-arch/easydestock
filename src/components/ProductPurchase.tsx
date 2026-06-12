'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { CartIcon, CheckIcon, WhatsappIcon } from './icons';
import { whatsappLink } from '@/lib/site';

export default function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const add = () => {
    addItem(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const waText = encodeURIComponent(`Bonjour, je suis intéressé(e) par la palette « ${product.name} ». Est-elle disponible ?`);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-lg border border-brand-200">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-12 w-12 items-center justify-center text-lg font-semibold text-brand-600 hover:text-accent-600"
            aria-label="Diminuer la quantité"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="h-12 w-14 border-x border-brand-200 text-center text-sm font-semibold outline-none"
            aria-label="Quantité"
          />
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-12 w-12 items-center justify-center text-lg font-semibold text-brand-600 hover:text-accent-600"
            aria-label="Augmenter la quantité"
          >
            +
          </button>
        </div>

        <button type="button" onClick={add} className="btn-primary flex-1 text-base">
          {added ? <CheckIcon className="h-5 w-5" /> : <CartIcon className="h-5 w-5" />}
          {added ? 'Ajouté au panier' : 'Ajouter au panier'}
        </button>
      </div>

      <a
        href={`${whatsappLink}?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn w-full bg-[#25D366] text-white hover:bg-[#1ebe5b]"
      >
        <WhatsappIcon className="h-5 w-5" /> Demander un devis sur WhatsApp
      </a>
    </div>
  );
}
