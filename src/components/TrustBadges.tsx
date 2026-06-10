import { TruckIcon, ShieldIcon, TagIcon, GlobeIcon } from './icons';

const badges = [
  { icon: ShieldIcon, title: 'Inspecté en France', text: 'Palettes traitées et vérifiées localement, quantités exactes garanties.' },
  { icon: TruckIcon, title: 'Livraison Europe', text: 'France, Belgique et Suisse — enlèvement sur place possible.' },
  { icon: TagIcon, title: 'Prix grossiste', text: 'Lots de liquidation à partir de €350, marges revendeur optimisées.' },
  { icon: GlobeIcon, title: 'Marques reconnues', text: 'Milwaukee, DeWalt, Bosch, Makita, Sony et bien d’autres.' },
];

export default function TrustBadges() {
  return (
    <section className="border-b border-brand-100 bg-white">
      <div className="container-x grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-accent-600">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-brand-900">{title}</h3>
              <p className="mt-1 text-sm leading-snug text-brand-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
