import Link from 'next/link';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import CategoryTiles from '@/components/CategoryTiles';
import ProductSlider from '@/components/ProductSlider';
import SectionHeading from '@/components/SectionHeading';
import HowItWorks from '@/components/HowItWorks';
import GuideArticle from '@/components/GuideArticle';
import AboutSection from '@/components/AboutSection';
import { ChevronRight } from '@/components/icons';
import {
  getProductsByCategory,
  getFeaturedProducts,
  getLatestProducts,
  getBestSellers,
  getOnSaleProducts,
} from '@/lib/products';

export default function HomePage() {
  const highTech = getProductsByCategory('%f0%9f%93%b1-palettes-high-tech');
  const latest = getLatestProducts(8);
  const bestSellers = getBestSellers(8);
  const featured = getFeaturedProducts(8);
  const onSale = getOnSaleProducts().slice(0, 8);

  return (
    <>
      <Hero />
      <TrustBadges />

      {/* Categories */}
      <section className="container-x py-16">
        <SectionHeading
          title="Achetez par catégorie"
          subtitle="Explorez nos palettes de déstockage par univers"
          href="/page-dachat"
          linkLabel="Toutes les palettes"
        />
        <CategoryTiles />
      </section>

      {/* High-tech */}
      {highTech.length > 0 && (
        <section className="container-x py-8">
          <SectionHeading title="📱 Palettes High-Tech" href="/page-dachat?categorie=%f0%9f%93%b1-palettes-high-tech" />
          <ProductSlider products={highTech} />
        </section>
      )}

      {/* Promo banner */}
      <section className="container-x py-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent-600 to-accent-500 px-8 py-12 text-white sm:px-12">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl font-bold sm:text-3xl">En promotion cette semaine</h2>
            <p className="mt-2 text-accent-50">
              Profitez de remises immédiates sur une sélection de palettes de liquidation, dans la limite des stocks
              disponibles.
            </p>
            <Link href="/page-dachat" className="btn mt-6 bg-white text-accent-700 hover:bg-brand-50">
              Voir les promotions <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-16 right-16 h-56 w-56 rounded-full bg-white/10" />
        </div>
      </section>

      {/* Best sellers */}
      <section className="container-x py-8">
        <SectionHeading title="Meilleures ventes" subtitle="Les palettes les plus demandées" href="/page-dachat" />
        <ProductSlider products={bestSellers} />
      </section>

      <HowItWorks />

      {/* Latest */}
      <section className="container-x py-16">
        <SectionHeading title="Derniers arrivages" subtitle="Nouvelles palettes ajoutées au catalogue" href="/page-dachat" />
        <ProductSlider products={latest} />
      </section>

      {onSale.length > 0 && (
        <section className="container-x pb-8">
          <SectionHeading title="Bonnes affaires" subtitle="Remises en cours" href="/page-dachat" />
          <ProductSlider products={onSale} />
        </section>
      )}

      <GuideArticle />
      <AboutSection />

      {/* Featured fallback row */}
      <section className="container-x py-16">
        <SectionHeading title="Sélection du moment" href="/page-dachat" />
        <ProductSlider products={featured} />
      </section>
    </>
  );
}
