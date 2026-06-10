import { TruckIcon, GlobeIcon, TagIcon } from './icons';

const items = [
  { icon: TruckIcon, text: 'Livraison France, Belgique & Suisse' },
  { icon: TagIcon, text: 'Palettes à partir de €350' },
  { icon: GlobeIcon, text: 'Retours Amazon · Outils · High-Tech · Textile' },
];

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-900 text-white">
      <div className="container-x flex items-center justify-center gap-x-8 gap-y-1 overflow-hidden py-2 text-xs sm:text-[13px]">
        {items.map(({ icon: Icon, text }, i) => (
          <span
            key={text}
            className={`flex items-center gap-2 whitespace-nowrap ${i > 0 ? 'hidden sm:flex' : ''}`}
          >
            <Icon className="h-4 w-4 text-accent-300" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
