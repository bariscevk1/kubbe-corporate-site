import type { Metadata } from 'next';
import { DEFAULT_LOGO_SRC } from '@/lib/brand-assets';
import { HeroSplitSection } from '@/components/home/HeroSplitSection';
import { PremiumColorPaletteSection } from '@/components/home/PremiumColorPaletteSection';
import { ServicesTeaserSection } from '@/components/home/ServicesTeaserSection';
import { AboutTeaserSection } from '@/components/home/AboutTeaserSection';
import { HomeKeywordSection } from '@/components/home/HomeKeywordSection';
import { HomeFloatingContact } from '@/components/home/HomeFloatingContact';
import { getRequestLocale } from '@/lib/i18n/server-locale';
import { pageMetadata } from '@/lib/seo/metadata-helpers';
import { semKeywordsForLocale } from '@/lib/seo/sem-locale-keywords';
import tr from '@/messages/tr.json';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

const seoByLang = { tr, en, ar } as const;

const PHONE = '05323236627';

export async function generateMetadata(): Promise<Metadata> {
  const locale = getRequestLocale();
  const s = seoByLang[locale].seo.home;
  return pageMetadata(
    { title: s.title, description: s.description },
    'Kubbe Kaplama',
    semKeywordsForLocale(locale),
  );
}

export default function HomePage() {
  return (
    <main className="home-light-palette min-w-0">
      <HeroSplitSection
        phone={PHONE}
        logoUrl={DEFAULT_LOGO_SRC}
        brandWordPrimary="Turgut"
        brandWordAccent="Coşkun"
      />
      <PremiumColorPaletteSection />
      <ServicesTeaserSection phone={PHONE} />
      <AboutTeaserSection companyName="Turgut Coşkun Kubbe Kaplama" />
      <HomeKeywordSection />
      <HomeFloatingContact phone={PHONE} />
    </main>
  );
}
