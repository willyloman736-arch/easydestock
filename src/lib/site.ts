/** Central site configuration — contact details & navigation, migrated from easydestocks.com. */
export const site = {
  name: 'Easy Destocks',
  tagline: 'Destockage Grossiste · Liquidation · Lots discount en France',
  description:
    'Achetez des palettes de déstockage et liquidation en gros. Retours Amazon, outils, électronique, textile. Livraison France, Belgique, Suisse. Depuis €350.',
  url: 'https://easydestocks.com',
  email: 'info@easydestocks.com',
  whatsapp: '+33644693835',
  whatsappDisplay: '+33 6 44 69 38 35',
  address: 'ZA du Pré Barreau, 49630 Mazé-Milon, France',
  copyrightYear: 2021,
};

export const mainNav = [
  { label: "Page d'accueil", href: '/' },
  { label: "Page d'achat", href: '/page-dachat' },
  { label: 'Contact', href: '/contact' },
];

export const whatsappLink = `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, '')}`;
export const mailtoLink = `mailto:${site.email}`;
