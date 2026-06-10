import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { site, whatsappLink, mailtoLink } from '@/lib/site';
import { MailIcon, PinIcon, WhatsappIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez Easy Destocks pour vos palettes de déstockage et liquidation. E-mail, WhatsApp et adresse en France.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <div className="border-b border-brand-100 bg-brand-50/60">
        <div className="container-x py-10">
          <nav aria-label="Fil d’Ariane" className="mb-2 text-xs text-brand-500">
            <Link href="/" className="hover:text-accent-600">
              Accueil
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-brand-700">Contact</span>
          </nav>
          <h1 className="text-3xl font-bold text-brand-900 sm:text-4xl">Contactez-nous</h1>
          <p className="mt-2 max-w-2xl text-sm text-brand-600">
            Une question sur une palette, un devis ou la livraison ? Notre équipe en France vous répond rapidement.
          </p>
        </div>
      </div>

      <div className="container-x grid gap-12 py-12 lg:grid-cols-[1fr_380px]">
        <div>
          <h2 className="mb-6 text-xl font-bold text-brand-900">Envoyez-nous un message</h2>
          <ContactForm />
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-brand-900">Coordonnées</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <a href={mailtoLink} className="flex items-start gap-3 text-brand-700 hover:text-accent-600">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-accent-600">
                    <MailIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-brand-400">E-mail</span>
                    {site.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-brand-700 hover:text-accent-600"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-accent-600">
                    <WhatsappIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-brand-400">WhatsApp</span>
                    {site.whatsappDisplay}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-brand-700">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-accent-600">
                  <PinIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wide text-brand-400">Adresse</span>
                  {site.address}
                </span>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-100 shadow-card">
            <iframe
              title="Carte — Mazé-Milon, France"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.30%2C47.42%2C-0.20%2C47.47&layer=mapnik&marker=47.4458%2C-0.2566"
              className="h-56 w-full border-0"
              loading="lazy"
            />
          </div>
        </aside>
      </div>
    </>
  );
}
