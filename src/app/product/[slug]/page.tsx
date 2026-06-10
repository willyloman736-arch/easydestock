import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/ProductGallery';
import ProductPurchase from '@/components/ProductPurchase';
import ProductSlider from '@/components/ProductSlider';
import SectionHeading from '@/components/SectionHeading';
import { TruckIcon, ShieldIcon, CheckIcon } from '@/components/icons';
import { getAllProducts, getProductBySlug, getRelatedProducts } from '@/lib/products';
import { formatPrice, discountPercent } from '@/lib/format';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Produit introuvable' };
  return {
    title: product.name,
    description: product.shortDescription?.slice(0, 160) || `${product.name} — palette de déstockage Easy Destocks.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription?.slice(0, 160),
      images: [product.images[0]?.src ?? '/banners/hero-pallets.webp'],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const discount = discountPercent(product.regularPrice, product.price);
  const related = getRelatedProducts(product, 8);
  const category = product.categories[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((i) => site.url + i.src),
    description: product.shortDescription,
    sku: product.sku || String(product.id),
    brand: { '@type': 'Brand', name: 'Easy Destocks' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: product.price ?? product.regularPrice ?? 0,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      url: `${site.url}/product/${product.slug}`,
    },
  };

  return (
    <article className="container-x py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Fil d’Ariane" className="mb-6 text-xs text-brand-500">
        <Link href="/" className="hover:text-accent-600">
          Accueil
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="/page-dachat" className="hover:text-accent-600">
          Page d’achat
        </Link>
        {category && (
          <>
            <span className="mx-1.5">/</span>
            <Link href={`/page-dachat?categorie=${encodeURIComponent(category.slug)}`} className="hover:text-accent-600">
              {category.name}
            </Link>
          </>
        )}
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} discount={discount} />

        <div>
          {category && (
            <p className="text-sm font-medium uppercase tracking-wide text-accent-600">{category.name}</p>
          )}
          <h1 className="mt-2 text-3xl font-bold text-brand-900">{product.name}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-accent-600">{formatPrice(product.price)}</span>
            {discount && (
              <>
                <span className="text-xl text-brand-400 line-through">{formatPrice(product.regularPrice)}</span>
                <span className="badge-sale">Économisez {discount}%</span>
              </>
            )}
          </div>

          {product.shortDescription && (
            <p className="mt-5 leading-relaxed text-brand-600">{product.shortDescription}</p>
          )}

          <ProductPurchase product={product} />

          {/* Reassurance */}
          <ul className="mt-8 space-y-3 border-t border-brand-100 pt-6 text-sm text-brand-700">
            <li className="flex items-center gap-3">
              <ShieldIcon className="h-5 w-5 text-accent-600" /> Palette inspectée et traitée en France
            </li>
            <li className="flex items-center gap-3">
              <TruckIcon className="h-5 w-5 text-accent-600" /> Livraison France, Belgique & Suisse — ou enlèvement sur place
            </li>
            <li className="flex items-center gap-3">
              <CheckIcon className="h-5 w-5 text-accent-600" /> Quantités exactes garanties
            </li>
          </ul>

          <dl className="mt-6 grid grid-cols-2 gap-y-2 text-sm">
            {product.sku && (
              <>
                <dt className="text-brand-500">Référence</dt>
                <dd className="font-medium text-brand-800">{product.sku}</dd>
              </>
            )}
            {category && (
              <>
                <dt className="text-brand-500">Catégorie</dt>
                <dd className="font-medium text-brand-800">{category.name}</dd>
              </>
            )}
          </dl>
        </div>
      </div>

      {/* Full description */}
      {product.descriptionHtml && (
        <section className="mt-14 max-w-3xl">
          <h2 className="mb-4 text-xl font-bold text-brand-900">Description</h2>
          <div
            className="prose-product text-[15px] leading-relaxed text-brand-700"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading title="Produits similaires" href="/page-dachat" />
          <ProductSlider products={related} />
        </section>
      )}
    </article>
  );
}
