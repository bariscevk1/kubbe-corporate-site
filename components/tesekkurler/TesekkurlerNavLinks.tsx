'use client';

import Link from 'next/link';
import { useLocalizedPath } from '@/components/i18n/useLocalizedPath';

export function TesekkurlerNavLinks() {
  const toHref = useLocalizedPath();

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <Link
        href={toHref('/')}
        className="inline-flex min-h-[44px] items-center rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-light"
      >
        Anasayfaya dön
      </Link>
      <Link
        href={toHref('/iletisim')}
        className="inline-flex min-h-[44px] items-center rounded-xl border border-[var(--border-soft)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--text-heading)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-soft)]"
      >
        İletişim sayfası
      </Link>
    </div>
  );
}
