import type { Metadata } from 'next';
import { DEFAULT_LOGO_SRC } from '@/lib/brand-assets';
import { HeroSplitSection } from '@/components/home/HeroSplitSection';
import { PremiumColorPaletteSection } from '@/components/home/PremiumColorPaletteSection';
import { ServicesTeaserSection } from '@/components/home/ServicesTeaserSection';
import { AboutTeaserSection } from '@/components/home/AboutTeaserSection';
import { TurkeyReferencesSection } from '@/components/home/TurkeyReferencesSection';
import { HomeKeywordSection } from '@/components/home/HomeKeywordSection';
import { HomeFloatingContact } from '@/components/home/HomeFloatingContact';
import { getRequestLocale } from '@/lib/i18n/server-locale';
import tr from '@/messages/tr.json';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

const seoByLang = { tr, en, ar } as const;

const PHONE = '05323236627';

export async function generateMetadata(): Promise<Metadata> {
  const locale = getRequestLocale();
  const s = seoByLang[locale].seo.home;
  return {
    title: s.title,
    description: s.description,
  };
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
      <TurkeyReferencesSection />
      <HomeKeywordSection />
      <HomeFloatingContact phone={PHONE} />
    </main>
  );
}
