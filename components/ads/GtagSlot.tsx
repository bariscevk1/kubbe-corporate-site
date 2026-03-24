'use client';

import Script from 'next/script';

type Props = {
  googleAdsId?: string;
  ga4MeasurementId?: string;
};

/**
 * gtag.js — NEXT_PUBLIC_GOOGLE_ADS_ID (AW-…) ve/veya NEXT_PUBLIC_GA_MEASUREMENT_ID (G-…)
 */
export function GtagSlot({ googleAdsId, ga4MeasurementId }: Props) {
  const aw = googleAdsId ?? process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? '';
  const ga = ga4MeasurementId ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

  if (!aw && !ga) {
    return null;
  }

  const loaderId = aw || ga;

  const initScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    ${aw ? `gtag('config', '${aw}');` : ''}
    ${ga ? `gtag('config', '${ga}');` : ''}
  `.trim();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {initScript}
      </Script>
    </>
  );
}
