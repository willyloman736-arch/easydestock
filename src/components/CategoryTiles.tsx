import Link from 'next/link';
import Image from 'next/image';
import { getCategoriesWithCounts, getProductsByCategory } from '@/lib/products';

export default function CategoryTiles() {
  // Top categories that have products, each with a representative product photo.
  const cats = getCategoriesWithCounts()
    .filter((c) => c.count >= 1)
    .slice(0, 8)
    .map((c) => {
      const rep = getProductsByCategory(c.slug).find((p) => p.images.length > 0);
      return { ...c, image: rep?.images[0] };
    })
    .filter((c) => c.image);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cats.map((c) => (
        <Link
          key={c.slug}
          href={`/page-dachat?categorie=${encodeURIComponent(c.slug)}`}
          className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-900 shadow-card"
        >
          <Image
            src={c.image!.src}
            alt={c.image!.alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="text-sm font-bold leading-tight text-white sm:text-base">{c.name}</h3>
            <p className="mt-0.5 text-xs text-brand-200">{c.count} palette{c.count > 1 ? 's' : ''}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
