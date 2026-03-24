import type { Metadata, Viewport } from 'next';
import { Cairo, Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { GtagSlot } from '@/components/ads/GtagSlot';
import { sanityFetch } from '@/lib/sanity/client';
import { adScriptsQuery } from '@/lib/sanity/queries';
import type { AdScriptsDoc, SiteSettingsDoc } from '@/lib/sanity/types';
import { CmsScriptManager } from '@/components/cms/CmsScriptManager';
import { getSiteSettings } from '@/lib/sanity/site-settings';
import { siteIconUrlFromSettings } from '@/lib/sanity/site-icon';
import { resolveLogoSrc } from '@/lib/sanity/resolve-logo';
import { brandCssVarsFromAccent, DEFAULT_BRAND_HEX } from '@/lib/brand-css';
import { JsonLdSite } from '@/components/seo/JsonLdSite';
import { metaKeywordsString } from '@/lib/seo/ads-keywords';
import { DEFAULT_SITE_DESCRIPTION_TR } from '@/lib/seo/seo-copy';
import { getMetadataBaseUrl, getPublicSiteOriginString } from '@/lib/seo/site-url';
import { I18nProvider } from '@/components/i18n/I18nProvider';
import { withTimeout } from '@/lib/utils/with-timeout';

/** ISR: CMS webhook ile anlık yenileme; yedek süre */
export const revalidate = 300;

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['500', '600', '700'],
  preload: false,
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  const primary = site?.brandWordPrimary?.trim() || 'Kubbe';
  const accent = site?.brandWordAccent?.trim() || 'Kaplama';
  const siteName = `${primary} ${accent}`.trim();
  const metadataBase = getMetadataBaseUrl();
  const iconUrl = siteIconUrlFromSettings(site);

  const keywordList = metaKeywordsString(950)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    metadataBase,
    title: {
      default: `${siteName} | Türkiye Geneli Kubbe & Kenet`,
      template: `%s | ${siteName}`,
    },
    description: DEFAULT_SITE_DESCRIPTION_TR,
    keywords: keywordList,
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      alternateLocale: ['en_US', 'ar_AE'],
      siteName,
      description: DEFAULT_SITE_DESCRIPTION_TR,
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: iconUrl }],
      apple: [{ url: iconUrl }],
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const site = await getSiteSettings();
  const hex = site?.brandAccentHex?.trim();
  const themeColor =
    hex && /^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : DEFAULT_BRAND_HEX;
  return {
    themeColor,
    width: 'device-width',
    initialScale: 1,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let cmsAds: AdScriptsDoc | null = null;
  let siteSettings: SiteSettingsDoc | null = null;

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      cmsAds = await withTimeout(
        sanityFetch<AdScriptsDoc | null>(adScriptsQuery, {}, ['adScripts']),
        12_000,
        'adScripts'
      );
    } catch {
      cmsAds = null;
    }
    try {
      siteSettings = await getSiteSettings();
    } catch {
      siteSettings = null;
    }
  }

  const theme = siteSettings?.theme ?? 'lead';
  const phone = siteSettings?.phone ?? '05323236627';
  const brandWordPrimary = siteSettings?.brandWordPrimary?.trim() || 'Kubbe';
  const brandWordAccent = siteSettings?.brandWordAccent?.trim() || 'Kaplama';
  const companyLegalName =
    siteSettings?.companyLegalName?.trim() || 'Turgut Çoşkun Kubbe Kaplama';
  const rawLogo = siteSettings?.logo;
  const logoAlt =
    rawLogo && typeof rawLogo === 'object' && 'alt' in rawLogo
      ? rawLogo.alt ?? `${brandWordPrimary} ${brandWordAccent}`
      : `${brandWordPrimary} ${brandWordAccent}`;
  const logoSrc = resolveLogoSrc(siteSettings);

  const brandStyle = brandCssVarsFromAccent(siteSettings?.brandAccentHex);

  return (
    <html
      lang="tr"
      data-site-theme={theme}
      className={`${inter.variable} ${montserrat.variable} ${cairo.variable}`}
      style={brandStyle}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="font-sans">
        <I18nProvider>
          <JsonLdSite
            siteName={`${brandWordPrimary} ${brandWordAccent}`.trim()}
            url={getPublicSiteOriginString()}
            phone={phone}
            companyLegalName={companyLegalName}
          />
          {/* Öncelik: Sanity adScripts; yoksa .env NEXT_PUBLIC_* */}
          <GtagSlot
            googleAdsId={cmsAds?.googleAdsId ?? undefined}
            ga4MeasurementId={cmsAds?.gtagMeasurementId ?? undefined}
          />
          <CmsScriptManager
            headHtml={cmsAds?.scriptManagerHead}
            bodyEndHtml={cmsAds?.scriptManagerBodyEnd}
            adresGezginiHtml={cmsAds?.adresGezginiSnippet}
          />

          <SiteHeader
            theme={theme}
            phone={phone}
            logoUrl={logoSrc}
            logoAlt={logoAlt}
            brandWordPrimary={brandWordPrimary}
            brandWordAccent={brandWordAccent}
          />
          <div className="min-h-[70vh]">{children}</div>
          <SiteFooter
            theme={theme}
            phone={phone}
            logoUrl={logoSrc}
            logoAlt={logoAlt}
            companyLegalName={companyLegalName}
          />
        </I18nProvider>
      </body>
    </html>
  );
}
