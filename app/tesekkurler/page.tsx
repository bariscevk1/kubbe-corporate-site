import type { Metadata } from 'next';
import { ConversionPageViewTracker } from '@/components/analytics/ConversionPageViewTracker';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';
import { TesekkurlerNavLinks } from '@/components/tesekkurler/TesekkurlerNavLinks';

export const metadata: Metadata = {
  title: 'Teşekkürler',
  description: 'Talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.',
  robots: { index: false, follow: false },
};

export default function TesekkurlerPage() {
  return (
    <main className="site-subpage-light min-h-screen bg-[var(--brand-bg-body)]">
      <ConversionPageViewTracker kind="thankyou" />

      <HizmetPageHero
        imageSrc="/about/hakkimizda-hero.png"
        imageAlt="Teşekkürler"
        title="Teşekkürler"
        kicker="Başarılı"
        subtitle="Bilgileriniz tarafımıza ulaştı. Ekibimiz en kısa sürede dönüş sağlayacaktır."
        priority={false}
      />

      <section className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-12">
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-elevated)] p-6 shadow-[0_18px_40px_-32px_rgba(31,41,55,0.18)] md:p-8">
          <p className="text-sm font-medium text-[var(--text-heading)]">Sonraki adımlar</p>
          <TesekkurlerNavLinks />
        </div>
      </section>
    </main>
  );
}
