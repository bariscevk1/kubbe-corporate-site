import type { Metadata } from 'next';
import Link from 'next/link';
import { ConversionPageViewTracker } from '@/components/analytics/ConversionPageViewTracker';

export const metadata: Metadata = {
  title: 'Teşekkürler',
  description: 'Talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.',
  robots: { index: false, follow: false },
};

export default function TesekkurlerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <ConversionPageViewTracker kind="thankyou" />

      <section className="rounded-2xl border border-white/10 bg-lead-900/40 p-6 md:p-8">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Başarılı</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">Teşekkürler</h1>
        <p className="mt-4 leading-relaxed text-slate-300">
          Bilgileriniz tarafımıza ulaştı. Ekibimiz en kısa sürede dönüş sağlayacaktır.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-light"
          >
            Anasayfaya dön
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5"
          >
            İletişim sayfası
          </Link>
        </div>
      </section>
    </main>
  );
}
