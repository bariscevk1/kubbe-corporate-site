import type { Metadata } from 'next';
import Image from 'next/image';
import { SevkiyatShowcase } from '@/components/sevkiyat/SevkiyatShowcase';

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
    <main className="bg-[var(--brand-bg-body)]">
      <section className="relative overflow-hidden border-b border-white/10">
        <Image
          src="/hizmetler/aluminyum-satis.webp"
          alt="Sevkiyatlar hero görseli"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/72 to-[#0b1014]/95" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(0,0,0,0.08),rgba(0,0,0,0.52))]" />

        <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="max-w-3xl rounded-2xl border border-white/12 bg-black/36 p-4 shadow-[0_12px_38px_rgba(0,0,0,0.48)] backdrop-blur-[3px] md:p-7">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c5dfd3] md:text-xs">
              Lojistik ve teslimat
            </p>
            <h1 className="mt-4 font-display text-[1.9rem] font-bold tracking-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.8)] sm:text-3xl md:text-4xl">
              Sevkiyatlar
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-100/95 md:text-base md:text-slate-200">
              Uretim sonrasi paketleme, yukleme ve sehir ici / sehirler arasi sevkiyat planlamasini
              proje takviminize uygun sekilde yonetiyoruz.
            </p>
          </div>
        </div>
      </section>

      <SevkiyatShowcase />
    </main>
  );
}
