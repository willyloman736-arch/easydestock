import Link from 'next/link';
import { ChevronRight } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-wider text-accent-600">Erreur 404</p>
      <h1 className="mt-3 text-4xl font-bold text-brand-900">Page introuvable</h1>
      <p className="mx-auto mt-4 max-w-md text-brand-600">
        La page que vous recherchez n’existe pas ou a été déplacée. Retrouvez toutes nos palettes de déstockage dans la
        boutique.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-outline">
          Accueil
        </Link>
        <Link href="/page-dachat" className="btn-primary">
          Voir les palettes <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
