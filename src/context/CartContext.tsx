'use client';

import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import type { CartLine, Product } from '@/lib/types';

const STORAGE_KEY = 'easydestocks.cart.v1';

type Action =
  | { type: 'add'; product: Product; quantity: number }
  | { type: 'remove'; id: number }
  | { type: 'setQty'; id: number; quantity: number }
  | { type: 'clear' }
  | { type: 'hydrate'; lines: CartLine[] };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'hydrate':
      return action.lines;
    case 'add': {
      const { product, quantity } = action;
      const price = product.price ?? product.regularPrice ?? 0;
      const existing = state.find((l) => l.id === product.id);
      if (existing) {
        return state.map((l) => (l.id === product.id ? { ...l, quantity: l.quantity + quantity } : l));
      }
      return [
        ...state,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price,
          image: product.images[0]?.src ?? '/banners/pallets-warehouse.webp',
          quantity,
        },
      ];
    }
    case 'remove':
      return state.filter((l) => l.id !== action.id);
    case 'setQty':
      return state
        .map((l) => (l.id === action.id ? { ...l, quantity: Math.max(1, action.quantity) } : l))
        .filter((l) => l.quantity > 0);
    case 'clear':
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'hydrate', lines: JSON.parse(raw) });
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  // Persist on change (after hydration).
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage full / unavailable */
    }
  }, [lines, ready]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = lines.reduce((n, l) => n + l.price * l.quantity, 0);
    return {
      lines,
      count,
      subtotal,
      ready,
      addItem: (product, quantity = 1) => dispatch({ type: 'add', product, quantity }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      setQuantity: (id, quantity) => dispatch({ type: 'setQty', id, quantity }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [lines, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
