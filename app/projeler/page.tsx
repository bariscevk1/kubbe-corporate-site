import type { Metadata } from 'next';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';
import { ProjectsPageContent } from '@/components/projects/ProjectsPageContent';
import { getRequestLocale } from '@/lib/i18n/server-locale';
import { pageMetadata } from '@/lib/seo/metadata-helpers';
import { semKeywordsForLocale } from '@/lib/seo/sem-locale-keywords';
import tr from '@/messages/tr.json';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

const seoByLang = { tr, en, ar } as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = getRequestLocale();
  const s = seoByLang[locale].seo.projects;
  return pageMetadata(
    { title: s.title, description: s.description },
    'Kubbe Kaplama',
    semKeywordsForLocale(locale),
  );
}

export default function ProjelerPage() {
  return (
    <main className="min-h-[70vh] bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/api/hizmetler-hero"
        imageAlt="Projelerimiz hero görseli"
        title="Projelerimiz"
        kicker="Türkiye referans ağı"
        subtitle="Turgut Usta imzalı Türkiye genelindeki uygulama, sevkiyat ve referans kayıtlarımızı tek ekranda inceleyin. Filtreleme ve arama ile şehir, kategori ve dönem bazında hızlıca sonuca ulaşın."
        imageClassName="object-[58%_center] md:object-center"
        quality={86}
      />
      <ProjectsPageContent />
    </main>
  );
}
