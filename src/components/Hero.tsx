import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, TruckIcon } from './icons';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-900">
      <Image
        src="/banners/hero-pallets.webp"
        alt="Entrepôt de palettes de déstockage et liquidation Easy Destocks"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900/85 to-brand-900/40" />

      <div className="container-x relative py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-300 ring-1 ring-accent-400/30">
            <TruckIcon className="h-4 w-4" /> Liquidation d&apos;entrepôt en gros
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Destockage Grossiste{' '}
            <span className="text-accent-400">Lots discount</span> en France
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100">
            Achetez des palettes de déstockage et liquidation en gros. Retours Amazon, outils, électronique, textile.
            Livraison France, Belgique, Suisse. <span className="font-semibold text-white">À partir de €350.</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/page-dachat" className="btn-primary text-base">
              Commander maintenant
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link href="/contact" className="btn border border-white/30 bg-white/5 text-base text-white hover:bg-white/10">
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
