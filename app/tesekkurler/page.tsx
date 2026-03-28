import type { Metadata } from 'next';
import Link from 'next/link';
import { ConversionPageViewTracker } from '@/components/analytics/ConversionPageViewTracker';
import { SubpageHeading } from '@/components/ui/SubpageHeading';

export const metadata: Metadata = {
  title: 'Teşekkürler',
  description: 'Talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.',
  robots: { index: false, follow: false },
};

export default function TesekkurlerPage() {
  return (
    <main className="site-subpage-light min-h-screen bg-[var(--brand-bg-body)]">
      <ConversionPageViewTracker kind="thankyou" />

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-elevated)] p-6 shadow-[0_18px_40px_-32px_rgba(31,41,55,0.18)] md:p-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Başarılı</p>
          <div className="mt-3">
            <SubpageHeading as="h1" size="hero">
              Teşekkürler
            </SubpageHeading>
          </div>
          <p className="leading-relaxed text-[var(--text-body)]">
            Bilgileriniz tarafımıza ulaştı. Ekibimiz en kısa sürede dönüş sağlayacaktır.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-light"
            >
              Anasayfaya dön
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex min-h-[44px] items-center rounded-xl border border-[var(--border-soft)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--text-heading)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-soft)]"
            >
              İletişim sayfası
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
