import type { Metadata } from 'next';
import Image from 'next/image';
import { SevkiyatShowcase } from '@/components/sevkiyat/SevkiyatShowcase';
import { SubpageHeading } from '@/components/ui/SubpageHeading';
import { watermarkedSrc } from '@/lib/media/watermarked-src';

export const metadata: Metadata = {
  title: 'Sevkiyatlar',
  description:
    'Türkiye geneli güvenli paketleme ve zamanında teslimat. Lojistik süreçlerimiz ve teslimat politikamız.',
  openGraph: {
    title: 'Sevkiyatlar | Kubbe Kaplama',
    description: 'Sevkiyat ve teslimat süreçleri.',
  },
};

export default async function SevkiyatlarPage() {
  return (
    <main className="site-subpage-light shipments-page bg-[var(--brand-bg-body)]">
      <section className="relative overflow-hidden border-b border-[var(--border-soft)]">
        <Image
          src={watermarkedSrc('/sevkiyat/sevkiyat-hero.png')}
          alt="Sevkiyatlar hero görseli"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/35 via-white/68 to-[#f8f9fa]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(255,255,255,0.2),rgba(248,249,250,0.48))]" />

        <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="max-w-3xl rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-hero-card)] p-4 shadow-[0_18px_40px_-32px_rgba(31,41,55,0.2)] backdrop-blur-[3px] md:p-7">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-muted md:text-xs">
              Lojistik ve teslimat
            </p>
            <div className="mt-4">
              <SubpageHeading as="h1" size="hero">
                Sevkiyatlar
              </SubpageHeading>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-body)] md:text-base">
              Turgut Usta ekibi olarak uretim sonrasi paketleme, yukleme ve sehir ici / sehirler arasi sevkiyat
              planlamasini proje takviminize uygun sekilde yonetiyoruz.
            </p>
          </div>
        </div>
      </section>

      <SevkiyatShowcase />
    </main>
  );
}
