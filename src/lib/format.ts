const eur = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
});

export function formatPrice(value: number | null | undefined): string {
  if (value == null) return '—';
  return eur.format(value);
}

export function discountPercent(regular: number | null, price: number | null): number | null {
  if (!regular || !price || regular <= price) return null;
  return Math.round(((regular - price) / regular) * 100);
}
