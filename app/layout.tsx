import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { I18nProvider } from '@/components/i18n/I18nProvider';
import { AdsAnalyticsLazy } from '@/components/ads/AdsAnalyticsLazy';
import { MobileConversionBar } from '@/components/layout/MobileConversionBar';
import { MediaProtectionLayer } from '@/components/media/MediaProtectionLayer';
import { SiteJsonLd } from '@/components/seo/SiteJsonLd';
import { DEFAULT_SITE_DESCRIPTION_TR } from '@/lib/seo/seo-copy';
import { getMetadataBaseUrl } from '@/lib/seo/site-url';
import { SEM_CORE_TOPICS_TR } from '@/lib/seo/sem-keywords';
import { DEFAULT_BRAND_HEX } from '@/lib/brand-css';
import { DEFAULT_LOGO_SRC } from '@/lib/brand-assets';
import { fontArabic, fontInter, fontMontserrat } from '@/lib/fonts';
import { getRequestLocale } from '@/lib/i18n/server-locale';
import { langDir } from '@/lib/i18n/config';

/** Hostinger: ağır SSG zaman aşımı — dinamik render. Middleware artık locale için rewrite kullanmıyor. */
export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  const siteName = 'Kubbe Kaplama';
  const metadataBase = getMetadataBaseUrl();

  return {
    metadataBase,
    title: {
      default: `${siteName} | Türkiye Geneli Kubbe & Kenet`,
      template: `%s | ${siteName}`,
    },
    description: DEFAULT_SITE_DESCRIPTION_TR,
    keywords: [...SEM_CORE_TOPICS_TR],
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      alternateLocale: ['en_US', 'ar_AE'],
      siteName,
      description: DEFAULT_SITE_DESCRIPTION_TR,
    },
    robots: { index: true, follow: true },
  };
}

export function generateViewport(): Viewport {
  return {
    themeColor: DEFAULT_BRAND_HEX,
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getRequestLocale();
  const dir = langDir(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      data-site-theme="lead"
      data-lang={locale}
      suppressHydrationWarning
      className={`${fontInter.variable} ${fontMontserrat.variable} ${fontArabic.variable}`}
    >
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <Script id="scroll-reset-on-refresh" strategy="beforeInteractive">{`
          try {
            if ('scrollRestoration' in history) {
              history.scrollRestoration = 'manual';
            }
            const resetScroll = () => window.scrollTo(0, 0);
            window.addEventListener('load', resetScroll, { once: true });
            window.addEventListener('pageshow', resetScroll);
          } catch {}
        `}</Script>
      </head>
      <body className="font-sans touch-manipulation pb-[env(safe-area-inset-bottom,0px)] max-md:pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))]">
        <SiteJsonLd />
        <I18nProvider>
          <MediaProtectionLayer />
          <SiteHeader
            theme="lead"
            phone="05323236627"
            logoUrl={DEFAULT_LOGO_SRC}
            logoAlt="Turgut Coşkun Kubbe Kaplama"
            brandWordPrimary="Kubbe"
            brandWordAccent="Kaplama"
          />
          <div className="min-h-[70vh] min-w-0">{children}</div>
          <SiteFooter
            theme="lead"
            phone="05323236627"
            logoUrl={DEFAULT_LOGO_SRC}
            logoAlt="Turgut Coşkun Kubbe Kaplama"
            companyLegalName="Turgut Coşkun Kubbe Kaplama"
          />
          <MobileConversionBar phone="05323236627" />
          <AdsAnalyticsLazy />
        </I18nProvider>
      </body>
    </html>
  );
}
