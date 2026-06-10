import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import { site } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Destockage Grossiste | Palettes Liquidation Amazon France — Easy Destocks',
    template: '%s — Easy Destocks',
  },
  description: site.description,
  keywords: [
    'destockage grossiste',
    'palette liquidation',
    'palette amazon',
    'retour amazon',
    'lots déstockage',
    'liquidation France Belgique Suisse',
  ],
  openGraph: {
    title: 'Destockage Grossiste | Palettes Liquidation Amazon France — Easy Destocks',
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'fr_FR',
    type: 'website',
    images: ['/banners/hero-pallets.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/banners/hero-pallets.webp'],
  },
  icons: {
    icon: '/brand/favicon-32.png',
    apple: '/brand/apple-touch-icon.png',
  },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-white"
          >
            Aller au contenu
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
