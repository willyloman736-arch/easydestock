'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { mainNav, site, mailtoLink } from '@/lib/site';
import { CartIcon, MenuIcon, CloseIcon, SearchIcon, MailIcon } from './icons';
import SearchPanel from './SearchPanel';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, ready } = useCart();
  const pathname = usePathname();

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Utility bar */}
      <div className="hidden border-b border-brand-50 bg-brand-50/60 lg:block">
        <div className="container-x flex h-9 items-center justify-between text-xs text-brand-600">
          <a href={mailtoLink} className="flex items-center gap-1.5 hover:text-accent-600">
            <MailIcon className="h-3.5 w-3.5" /> {site.email}
          </a>
          <p>{site.tagline}</p>
        </div>
      </div>

      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Easy Destocks — accueil">
          <Image
            src="/brand/logo.png"
            alt="Easy Destocks"
            width={150}
            height={56}
            priority
            className="h-10 w-auto lg:h-12"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                isActive(item.href) ? 'text-accent-600' : 'text-brand-700 hover:bg-brand-50 hover:text-accent-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded-lg p-2.5 text-brand-700 hover:bg-brand-50 hover:text-accent-600"
            aria-label="Rechercher un produit"
          >
            <SearchIcon className="h-5 w-5" />
          </button>

          <Link
            href="/cart"
            className="relative rounded-lg p-2.5 text-brand-700 hover:bg-brand-50 hover:text-accent-600"
            aria-label={`Panier${ready && count ? `, ${count} article${count > 1 ? 's' : ''}` : ''}`}
          >
            <CartIcon className="h-5 w-5" />
            {ready && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2.5 text-brand-700 hover:bg-brand-50 lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-brand-950/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-white shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between border-b border-brand-100 p-4">
              <Image src="/brand/logo.png" alt="Easy Destocks" width={120} height={44} className="h-9 w-auto" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-brand-700 hover:bg-brand-50"
                aria-label="Fermer le menu"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col p-2" aria-label="Navigation mobile">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 text-base font-semibold ${
                    isActive(item.href) ? 'bg-brand-50 text-accent-600' : 'text-brand-800 hover:bg-brand-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-brand-100 p-4 text-sm text-brand-600">
              <a href={mailtoLink} className="flex items-center gap-2 hover:text-accent-600">
                <MailIcon className="h-4 w-4" /> {site.email}
              </a>
            </div>
          </div>
        </div>
      )}

      {searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
