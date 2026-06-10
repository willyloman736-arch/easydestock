import Image from 'next/image';

const steps = [
  {
    n: '01',
    title: 'Explorez l’entrepôt',
    text: 'Examinez les palettes sous tous les angles et utilisez un escabeau pour voir le dessus.',
  },
  {
    n: '02',
    title: 'Choisissez votre palette',
    text: 'Lorsque vous trouvez une palette qui vous intéresse, prenez l’étiquette de vente correspondante.',
  },
  {
    n: '03',
    title: 'Réglez votre achat',
    text: 'Présentez vos billets au guichet et payez. Nous acceptons les espèces et les cartes de crédit.',
  },
  {
    n: '04',
    title: 'Livraison ou enlèvement',
    text: 'Nous proposons la livraison, ou garez votre véhicule à l’arrière et emportez vos palettes dès aujourd’hui !',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-brand-50/70 py-16">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
            <Image
              src="/banners/truck-pallet.webp"
              alt="Camion de palettes de liquidation prêt pour la livraison"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-accent-600">Voici comment ça fonctionne</span>
            <h2 className="mt-2 text-3xl font-bold text-brand-900">Acheter une palette, simplement</h2>
            <ol className="mt-8 space-y-6">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-semibold text-brand-900">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
