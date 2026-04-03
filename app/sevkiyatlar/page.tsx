import type { Metadata } from 'next';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';
import { SevkiyatShowcase } from '@/components/sevkiyat/SevkiyatShowcase';
import { getRequestLocale } from '@/lib/i18n/server-locale';
import { pageMetadata } from '@/lib/seo/metadata-helpers';
import { semKeywordsForLocale } from '@/lib/seo/sem-locale-keywords';
import tr from '@/messages/tr.json';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

const seoByLang = { tr, en, ar } as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = getRequestLocale();
  const s = seoByLang[locale].seo.shipments;
  return pageMetadata(
    { title: s.title, description: s.description },
    'Kubbe Kaplama',
    semKeywordsForLocale(locale),
  );
}

export default async function SevkiyatlarPage() {
  return (
    <main className="site-subpage-light shipments-page bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/sevkiyat/sevkiyat-hero.png"
        imageAlt="Sevkiyatlar hero görseli"
        title="Sevkiyatlar"
        kicker="Lojistik ve teslimat"
        subtitle="Turgut Usta ekibi olarak üretim sonrası paketleme, yükleme ve şehir içi / şehirler arası sevkiyat planlamasını proje takviminize uygun şekilde yönetiyoruz."
      />

      <SevkiyatShowcase />
    </main>
  );
}
