import Link from 'next/link';
import Image from 'next/image';
import { site, mainNav, mailtoLink, whatsappLink } from '@/lib/site';
import { getCategoriesWithCounts } from '@/lib/products';
import { MailIcon, PinIcon, WhatsappIcon } from './icons';
import Newsletter from './Newsletter';

export default function Footer() {
  const topCategories = getCategoriesWithCounts().slice(0, 6);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-brand-900 text-brand-100">
      <Newsletter />

      <div className="container-x grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* About */}
        <div>
          <Image src="/brand/logo.png" alt="Easy Destocks" width={150} height={56} className="mb-4 h-11 w-auto brightness-0 invert" />
          <p className="text-sm leading-relaxed text-brand-200">
            Votre partenaire de confiance pour les palettes de liquidation. Basée en France, notre équipe inspecte et
            traite toutes les palettes localement, garantissant transparence totale et quantités exactes.
          </p>
          <p className="mt-3 text-sm text-brand-300">
            Marques privilégiées : Milwaukee, DeWalt, Bosch, Makita, Sony et bien d&apos;autres.
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Liens de pied de page">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Navigation</h2>
          <ul className="space-y-2.5 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-brand-200 transition-colors hover:text-accent-300">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cart" className="text-brand-200 transition-colors hover:text-accent-300">
                Panier
              </Link>
            </li>
          </ul>
        </nav>

        {/* Categories */}
        <nav aria-label="Catégories">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Catégories populaires</h2>
          <ul className="space-y-2.5 text-sm">
            {topCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/page-dachat?categorie=${encodeURIComponent(c.slug)}`}
                  className="text-brand-200 transition-colors hover:text-accent-300"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contactez-nous</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={mailtoLink} className="flex items-start gap-3 text-brand-200 hover:text-accent-300">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" /> {site.email}
              </a>
            </li>
            <li>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-brand-200 hover:text-accent-300">
                <WhatsappIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" /> {site.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3 text-brand-200">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" /> {site.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-brand-400 sm:flex-row">
          <p>
            Copyright © {site.copyrightYear}–{year} {site.name}. Tous droits réservés.
          </p>
          <p>Site reconstruit avec Next.js — performance, accessibilité & responsive.</p>
        </div>
      </div>
    </footer>
  );
}
