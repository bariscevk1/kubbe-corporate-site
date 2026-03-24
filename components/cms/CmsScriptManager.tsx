'use client';

import Script from 'next/script';
import { useMemo } from 'react';

type Props = {
  headHtml?: string | null;
  bodyEndHtml?: string | null;
  adresGezginiHtml?: string | null;
};

/** <script>...</script> içeriğini veya düz JS’i kabul eder */
function scriptInner(html: string): string {
  const trimmed = html.trim();
  if (!trimmed) return '';
  const m = trimmed.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  return (m ? m[1] : trimmed).trim();
}

/**
 * Sanity “Script Manager” alanları — yalnızca güvendiğiniz kodları yapıştırın.
 * Harici script URL’leri için <script src="..."> kullanın (tek satır).
 */
export function CmsScriptManager({ headHtml, bodyEndHtml, adresGezginiHtml }: Props) {
  const head = useMemo(() => scriptInner(headHtml || ''), [headHtml]);
  const bodyEnd = useMemo(() => scriptInner(bodyEndHtml || ''), [bodyEndHtml]);
  const adres = useMemo(() => scriptInner(adresGezginiHtml || ''), [adresGezginiHtml]);

  return (
    <>
      {head ? (
        <Script id="cms-script-head" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: head }} />
      ) : null}
      {adres ? (
        <Script id="cms-adres-gezgini" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: adres }} />
      ) : null}
      {bodyEnd ? (
        <Script id="cms-script-body-end" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: bodyEnd }} />
      ) : null}
    </>
  );
}
