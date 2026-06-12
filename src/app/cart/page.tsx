'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';
import { TrashIcon, WhatsappIcon, ChevronRight } from '@/components/icons';
import { whatsappLink } from '@/lib/site';

export default function CartPage() {
  const { lines, subtotal, count, setQuantity, removeItem, clear, ready } = useCart();

  if (ready && lines.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="text-3xl font-bold text-brand-900">Votre panier</h1>
        <p className="mt-3 text-brand-500">Aucun produit dans le panier pour le moment.</p>
        <Link href="/page-dachat" className="btn-primary mt-8">
          Retour à la boutique <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  const waText = encodeURIComponent(
    'Bonjour, je souhaite commander les palettes suivantes :\n' +
      lines.map((l) => `• ${l.name} × ${l.quantity} — ${formatPrice(l.price * l.quantity)}`).join('\n') +
      `\n\nTotal : ${formatPrice(subtotal)}`,
  );

  return (
    <div className="container-x py-10">
      <h1 className="text-3xl font-bold text-brand-900">
        Votre panier {ready && <span className="text-lg font-normal text-brand-400">({count})</span>}
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Lines */}
        <div>
          <ul className="divide-y divide-brand-100 rounded-2xl border border-brand-100">
            {lines.map((l) => (
              <li key={l.id} className="flex gap-4 p-4">
                <Link href={`/product/${l.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-brand-50">
                  <Image src={l.image} alt={l.name} fill sizes="96px" className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <Link href={`/product/${l.slug}`} className="font-semibold text-brand-900 hover:text-accent-600">
                    {l.name}
                  </Link>
                  <p className="mt-1 text-sm text-brand-500">{formatPrice(l.price)} / unité</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-lg border border-brand-200">
                      <button
                        type="button"
                        onClick={() => setQuantity(l.id, l.quantity - 1)}
                        className="flex h-11 w-11 items-center justify-center text-lg text-brand-600 hover:text-accent-600"
                        aria-label="Diminuer"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{l.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(l.id, l.quantity + 1)}
                        className="flex h-11 w-11 items-center justify-center text-lg text-brand-600 hover:text-accent-600"
                        aria-label="Augmenter"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-brand-900">{formatPrice(l.price * l.quantity)}</span>
                      <button
                        type="button"
                        onClick={() => removeItem(l.id)}
                        className="flex h-11 w-11 items-center justify-center rounded-lg text-brand-400 hover:bg-brand-50 hover:text-sale"
                        aria-label={`Retirer ${l.name}`}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between">
            <Link href="/page-dachat" className="text-sm font-medium text-accent-600 hover:text-accent-700">
              ← Continuer mes achats
            </Link>
            <button type="button" onClick={clear} className="text-sm font-medium text-brand-400 hover:text-sale">
              Vider le panier
            </button>
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-6 shadow-card">
            <h2 className="text-lg font-bold text-brand-900">Récapitulatif</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-brand-600">Sous-total</dt>
                <dd className="font-semibold text-brand-900">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-brand-600">Livraison</dt>
                <dd className="text-brand-500">Calculée sur devis</dd>
              </div>
              <div className="flex justify-between border-t border-brand-200 pt-3 text-base">
                <dt className="font-bold text-brand-900">Total estimé</dt>
                <dd className="font-bold text-accent-600">{formatPrice(subtotal)}</dd>
              </div>
            </dl>

            <a
              href={`${whatsappLink}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-6 w-full bg-[#25D366] text-white hover:bg-[#1ebe5b]"
            >
              <WhatsappIcon className="h-5 w-5" /> Finaliser via WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-brand-500">
              Le paiement et la livraison sont confirmés directement avec notre équipe.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
