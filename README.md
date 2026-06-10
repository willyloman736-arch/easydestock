# Easy Destocks — Next.js rebuild

A complete, modern rebuild of [easydestocks.com](https://easydestocks.com) — a French wholesale
liquidation / destocking store (palettes of Amazon returns, electronics, tools, appliances, textiles).

The original was **WordPress + WooCommerce (Flatsome theme)**. This project re-implements the full site
on a clean, fast, accessible stack while preserving the original content, imagery, structure and brand.

## Tech stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | Next.js 15 (App Router, React 19, TypeScript)     |
| Styling        | Tailwind CSS 3 with a brand design-token system   |
| Images         | `next/image` (runtime AVIF/WebP, lazy, responsive)|
| Cart           | Client-side React context + `localStorage`        |
| Data           | Static JSON catalog migrated from the WC Store API |

## What was migrated

- **70 products** with names, prices (regular + sale), descriptions, categories and SKUs.
- **248 media assets** (logo, favicons, hero/banners, 230+ product photos, 1 product video),
  downloaded from `wp-content/uploads` into `/public`, organized per product.
- **Page structure & content**: homepage (hero, categories, product carousels, "how it works",
  the full *Guide complet 2026* SEO article, about section, newsletter), shop, product detail,
  contact, and cart — preserving the original French copy and visual hierarchy.
- **Original URLs preserved** for SEO continuity: `/page-dachat`, `/product/[slug]`, `/contact`, `/cart`.

## Improvements over the original

- **Performance**: no WordPress/jQuery/plugin bloat; static generation; optimized responsive images.
- **Accessibility**: semantic landmarks, skip link, visible focus rings, ARIA labels, keyboard-navigable
  search/menu/gallery, `lang="fr"`.
- **Responsive**: mobile-first layouts, drawer nav, horizontal product sliders, fluid grids.
- **SEO**: per-page metadata, OpenGraph/Twitter, `sitemap.xml`, `robots.txt`, Product JSON-LD.
- **Code quality**: typed components, single source of truth for data, reusable design tokens.

## Project structure

```
src/
  app/                # routes: / , /page-dachat , /product/[slug] , /contact , /cart
  components/         # Header, Footer, Hero, ProductCard, cart UI, etc.
  context/            # CartContext (localStorage-backed)
  data/               # products.json, categories.json (migrated catalog)
  lib/                # data access, formatting, site config
public/
  brand/  banners/  products/<slug>/   # all migrated media
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Notes

This is a **front-end migration with a client-side catalog and cart**. There is no payment backend —
checkout routes users to WhatsApp/e-mail for quotes, mirroring how the business actually operates.
The `_scrape/` folder (git-ignored) holds the original scrape + the asset download script for reference.
