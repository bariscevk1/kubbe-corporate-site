import type { Metadata } from 'next';
import Link from 'next/link';
import { DEFAULT_SITE_DESCRIPTION_TR } from '@/lib/seo/seo-copy';

export const metadata: Metadata = {
  title: 'Anasayfa',
  description: DEFAULT_SITE_DESCRIPTION_TR,
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--brand-bg-body)] px-4 py-24 md:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-bold text-slate-100 md:text-4xl">
          Kubbe Kurumsal Site
        </h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Anasayfa gecici hizli modda. Hizmetler, Projeler ve diger sayfalar calisiyor.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/hizmetler"
            className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-100 hover:border-white/25"
          >
            Hizmetler
          </Link>
          <Link
            href="/projeler"
            className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-100 hover:border-white/25"
          >
            Projeler
          </Link>
          <Link
            href="/sevkiyatlar"
            className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-100 hover:border-white/25"
          >
            Sevkiyatlar
          </Link>
          <Link
            href="/iletisim"
            className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-100 hover:border-white/25"
          >
            Iletisim
          </Link>
          <Link
            href="/hakkimizda"
            className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-100 hover:border-white/25"
          >
            Hakkimizda
          </Link>
        </div>
      </div>
    </main>
  );
}
