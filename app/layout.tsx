import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { I18nProvider } from '@/components/i18n/I18nProvider';
import { DEFAULT_SITE_DESCRIPTION_TR } from '@/lib/seo/seo-copy';
import { getMetadataBaseUrl } from '@/lib/seo/site-url';
import { DEFAULT_BRAND_HEX } from '@/lib/brand-css';

/**
 * Hostinger vb. ortamlarda SSG (22 sayfa × Sanity) 300 sn’yi aşıyordu.
 * On-demand render + sanityFetch `next.tags` ile webhook revalidation devam eder.
 */
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
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" data-site-theme="lead" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="font-sans">
        <I18nProvider>
          <SiteHeader
            theme="lead"
            phone="05323236627"
            logoUrl={null}
            logoAlt="Kubbe Kaplama"
            brandWordPrimary="Kubbe"
            brandWordAccent="Kaplama"
          />
          <div className="min-h-[70vh]">{children}</div>
          <SiteFooter
            theme="lead"
            phone="05323236627"
            logoUrl={null}
            logoAlt="Kubbe Kaplama"
            companyLegalName="Turgut Coskun Kubbe Kaplama"
          />
        </I18nProvider>
      </body>
    </html>
  );
}
