import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HeroSplitSection } from '@/components/home/HeroSplitSection';
import { getSiteSettings } from '@/lib/sanity/site-settings';
import { DEFAULT_SITE_DESCRIPTION_TR } from '@/lib/seo/seo-copy';
import { resolveLogoSrc } from '@/lib/sanity/resolve-logo';

export const metadata: Metadata = {
  title: 'Anasayfa',
  description: DEFAULT_SITE_DESCRIPTION_TR,
};

/** Alt bölümler ayrı chunk — ilk yüklemede daha az JS (Android / düşük RAM) */
const AboutTeaserSection = dynamic(
  () =>
    import('@/components/home/AboutTeaserSection').then((m) => m.AboutTeaserSection),
  {
    ssr: true,
    loading: () => (
      <div
        className="min-h-[320px] border-t border-white/10 bg-[var(--brand-bg-body)]"
        aria-hidden
      />
    ),
  }
);

const StatsSection = dynamic(
  () => import('@/components/home/StatsSection').then((m) => m.StatsSection),
  {
    ssr: true,
    loading: () => (
      <div
        className="min-h-[240px] border-t border-white/[0.06] bg-[#060606]"
        aria-hidden
      />
    ),
  }
);

const ValuesSection = dynamic(
  () => import('@/components/home/ValuesSection').then((m) => m.ValuesSection),
  {
    ssr: true,
    loading: () => (
      <div
        className="min-h-[280px] border-t border-white/[0.07] bg-black"
        aria-hidden
      />
    ),
  }
);

const ServicesTeaserSection = dynamic(
  () =>
    import('@/components/home/ServicesTeaserSection').then((m) => m.ServicesTeaserSection),
  {
    ssr: true,
    loading: () => (
      <div
        className="min-h-[400px] border-t border-white/[0.07] bg-black"
        aria-hidden
      />
    ),
  }
);

const TurkeyReferencesSection = dynamic(
  () =>
    import('@/components/home/TurkeyReferencesSection').then((m) => m.TurkeyReferencesSection),
  {
    ssr: true,
    loading: () => (
      <div
        className="min-h-[480px] border-t border-white/[0.07] bg-[#030303]"
        aria-hidden
      />
    ),
  }
);

const HomeKeywordSection = dynamic(
  () =>
    import('@/components/home/HomeKeywordSection').then((m) => m.HomeKeywordSection),
  {
    ssr: true,
    loading: () => (
      <div className="min-h-[200px] border-t border-white/10 bg-lead-950/30" aria-hidden />
    ),
  }
);

const HERO_DEFAULT = {
  leftTitle: 'Bakır Kubbe Kaplama ve Cami Alemleri',
  leftSubtitle: '25 yıllık tecrübe · Türkiye geneli · 7/24 iletişim hattı',
  rightTitle: 'Alüminyum Kubbe Kaplama ve Büyük Ölçekli Projeler',
  rightSubtitle: 'Kenet çatı ve alüminyum sistemler · Körfez ve yurtdışı projeler',
};

export default async function HomePage() {
  const site = await getSiteSettings();
  const phone = site?.phone?.trim() || '05323236627';
  const brandWordPrimary = site?.brandWordPrimary?.trim() || 'Kubbe';
  const brandWordAccent = site?.brandWordAccent?.trim() || 'Kaplama';
  const rawLogo = site?.logo;
  const logoAlt =
    rawLogo && typeof rawLogo === 'object' && 'alt' in rawLogo
      ? rawLogo.alt ?? `${brandWordPrimary} ${brandWordAccent}`
      : `${brandWordPrimary} ${brandWordAccent}`;
  const logoSrc = resolveLogoSrc(site);
  const companyLegalName =
    site?.companyLegalName?.trim() || 'Turgut Çoşkun Kubbe Kaplama';

  const leftTitle = site?.heroSplitLeftTitle?.trim() || HERO_DEFAULT.leftTitle;
  const leftSubtitle = site?.heroSplitLeftSubtitle?.trim() || HERO_DEFAULT.leftSubtitle;
  const rightTitle = site?.heroSplitRightTitle?.trim() || HERO_DEFAULT.rightTitle;
  const rightSubtitle = site?.heroSplitRightSubtitle?.trim() || HERO_DEFAULT.rightSubtitle;

  return (
    <main className="min-h-0 bg-[var(--brand-bg-body)]">
      <HeroSplitSection
        phone={phone}
        leftTitle={leftTitle}
        leftSubtitle={leftSubtitle}
        rightTitle={rightTitle}
        rightSubtitle={rightSubtitle}
        logoUrl={logoSrc}
        logoAlt={logoAlt}
        brandWordPrimary={brandWordPrimary}
        brandWordAccent={brandWordAccent}
      />
      <AboutTeaserSection companyName={companyLegalName} />
      <StatsSection />
      <ValuesSection />
      <ServicesTeaserSection phone={phone} />
      <TurkeyReferencesSection />
      <HomeKeywordSection />
    </main>
  );
}
