import type { MetadataRoute } from 'next';
import { getPublicSiteOriginString } from '@/lib/seo/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getPublicSiteOriginString();
  const paths = [
    '',
    '/hakkimizda',
    '/projeler',
    '/hizmetler',
    '/hizmetler/kubbe-kaplama',
    '/hizmetler/aluminyum-satis',
    '/hizmetler/aluminyum-kubbe-kaplama',
    '/hizmetler/bakir-levha-satis',
    '/hizmetler/kursun-levha-satis',
    '/hizmetler/nakkas-susleme',
    '/hizmetler/alemler',
    '/hizmetler/oluk',
    '/sevkiyatlar',
    '/iletisim',
  ];
  const now = new Date();
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
