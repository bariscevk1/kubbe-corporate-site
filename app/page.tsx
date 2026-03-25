import type { Metadata } from 'next';
import { DEFAULT_LOGO_SRC } from '@/lib/brand-assets';
import { HeroSplitSection } from '@/components/home/HeroSplitSection';
import { ServicesTeaserSection } from '@/components/home/ServicesTeaserSection';
import { AboutTeaserSection } from '@/components/home/AboutTeaserSection';
import { TurkeyReferencesSection } from '@/components/home/TurkeyReferencesSection';
import { StatsSection } from '@/components/home/StatsSection';
import { ValuesSection } from '@/components/home/ValuesSection';
import { HomeKeywordSection } from '@/components/home/HomeKeywordSection';
import { HomeFloatingContact } from '@/components/home/HomeFloatingContact';
import { DEFAULT_SITE_DESCRIPTION_TR } from '@/lib/seo/seo-copy';

export const metadata: Metadata = {
  title: 'Anasayfa',
  description: DEFAULT_SITE_DESCRIPTION_TR,
};

const PHONE = '05323236627';

export default function HomePage() {
  return (
    <main className="min-w-0">
      <HeroSplitSection
        phone={PHONE}
        leftTitle="Türkiye genelinde camii kubbe kaplama ve metal çatı uzmanlığı"
        leftSubtitle="Bakır ve alüminyum kubbe, alem, oluk ve nakkaş süsleme uygulamalarında sahada disiplinli ekip, şeffaf süreç ve uzun ömürlü işçilik sunuyoruz."
        rightTitle="Referanslarımızla sınırlarımızı genişletiyoruz"
        rightSubtitle="Ankara merkezli operasyonumuzla ülke genelinde teslim ettiğimiz projelerde montaj, sevkiyat ve teknik danışmanlıkta aynı kurumsal standardı koruyoruz."
        logoUrl={DEFAULT_LOGO_SRC}
        logoAlt="Turgut Coşkun Kubbe Kaplama"
        brandWordPrimary="Turgut"
        brandWordAccent="Coşkun"
        leftColumnCta={{ href: '/hizmetler', label: 'Hizmetlerimiz' }}
        rightColumnCta={{ href: '/projeler', label: 'Projelerimizi inceleyin' }}
      />
      <ServicesTeaserSection phone={PHONE} />
      <AboutTeaserSection companyName="Turgut Coşkun Kubbe Kaplama" />
      <TurkeyReferencesSection />
      <StatsSection />
      <ValuesSection />
      <HomeKeywordSection />
      <HomeFloatingContact phone={PHONE} />
    </main>
  );
}
