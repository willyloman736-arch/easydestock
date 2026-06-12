import Link from 'next/link';
import { ChevronRight } from './icons';

interface Props {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}

export default function SectionHeading({ title, subtitle, href, linkLabel = 'Voir tout' }: Props) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-bold text-brand-900 sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-brand-500">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex min-h-11 items-center gap-1 rounded-lg px-2 -mx-2 py-2 text-sm font-semibold text-accent-600 hover:bg-accent-50 hover:text-accent-700"
        >
          {linkLabel}
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
