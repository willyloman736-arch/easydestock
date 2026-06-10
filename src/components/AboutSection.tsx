import Image from 'next/image';
import { CheckIcon } from './icons';

const points = [
  'Inspection et traitement des palettes en France',
  'Transparence totale et quantités exactes',
  'Sans contraintes d’importation depuis les États-Unis',
  'Marques reconnues : Milwaukee, DeWalt, Bosch, Makita, Sony…',
];

export default function AboutSection() {
  return (
    <section className="bg-brand-900 py-16 text-white">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div className="relative order-last aspect-[4/3] overflow-hidden rounded-2xl shadow-card lg:order-first">
          <Image
            src="/banners/pallets-warehouse.webp"
            alt="Palettes de liquidation stockées dans l’entrepôt Easy Destocks en France"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-accent-400">À propos de nous</span>
          <h2 className="mt-2 text-3xl font-bold">Votre partenaire de confiance pour les palettes de liquidation</h2>
          <p className="mt-4 leading-relaxed text-brand-200">
            Nous aidons les entrepreneurs et les détaillants européens à accéder à des palettes de liquidation de
            qualité, sans les contraintes liées à l’importation depuis les États-Unis ni aux fournisseurs peu fiables.
            Basée en France, notre équipe inspecte et traite toutes les palettes localement.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-brand-100">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" /> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
