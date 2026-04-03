import type { Metadata } from 'next';

export type SeoSlice = { title: string; description: string; keywords?: string[] };

export function pageMetadata(
  seo: SeoSlice,
  siteName = 'Kubbe Kaplama',
  semKeywords?: string[],
): Metadata {
  const fromSeo = seo.keywords?.length ? seo.keywords : [];
  const keywords = [...fromSeo, ...(semKeywords ?? [])];
  const uniq = Array.from(new Set(keywords));

  return {
    title: seo.title,
    description: seo.description,
    ...(uniq.length ? { keywords: uniq } : {}),
    openGraph: {
      title: `${seo.title} | ${siteName}`,
      description: seo.description,
    },
  };
}
