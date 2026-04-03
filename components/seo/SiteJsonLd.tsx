import { buildSiteJsonLdGraph } from '@/lib/seo/json-ld';

/** Global SEO — Organization / WebSite / hizmet listesi (Google zengin sonuçları + reklam landing uyumu) */
export function SiteJsonLd() {
  const json = buildSiteJsonLdGraph();
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
