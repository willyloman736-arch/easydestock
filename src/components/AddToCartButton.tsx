'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';
import { CartIcon, CheckIcon } from './icons';

interface Props {
  product: Product;
  quantity?: number;
  variant?: 'primary' | 'compact';
  className?: string;
}

export default function AddToCartButton({ product, quantity = 1, variant = 'primary', className = '' }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handle = () => {
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handle}
        aria-label={`Ajouter ${product.name} au panier`}
        className={`btn w-full bg-brand-500 text-white hover:bg-accent-500 ${className}`}
      >
        {added ? <CheckIcon className="h-4 w-4" /> : <CartIcon className="h-4 w-4" />}
        {added ? 'Ajouté' : 'Ajouter'}
      </button>
    );
  }

  return (
    <button type="button" onClick={handle} className={`btn-primary ${className}`}>
      {added ? <CheckIcon className="h-5 w-5" /> : <CartIcon className="h-5 w-5" />}
      {added ? 'Ajouté au panier' : 'Ajouter au panier'}
    </button>
  );
}
