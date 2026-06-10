import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { formatPrice, discountPercent } from '@/lib/format';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const discount = discountPercent(product.regularPrice, product.price);
  const img = product.images[0];
  const category = product.categories[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-brand-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-square overflow-hidden bg-brand-50">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {discount && <span className="badge-sale absolute left-3 top-3">-{discount}%</span>}
        {!product.inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-900/80 px-2.5 py-1 text-xs font-semibold text-white">
            Sur commande
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {category && (
          <p className="mb-1 truncate text-xs font-medium uppercase tracking-wide text-brand-400">{category.name}</p>
        )}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-brand-900">
          <Link href={`/product/${product.slug}`} className="hover:text-accent-600">
            {product.name}
          </Link>
        </h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-accent-600">{formatPrice(product.price)}</span>
          {discount && <span className="text-sm text-brand-400 line-through">{formatPrice(product.regularPrice)}</span>}
        </div>

        <div className="mt-auto pt-4">
          <AddToCartButton product={product} variant="compact" />
        </div>
      </div>
    </article>
  );
}
