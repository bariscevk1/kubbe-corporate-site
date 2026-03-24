import type { MetadataRoute } from 'next';
import { getPublicSiteOriginString } from '@/lib/seo/site-url';

export default function robots(): MetadataRoute.Robots {
  const base = getPublicSiteOriginString();
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/studio', '/api/'] },
    sitemap: `${base}/sitemap.xml`,
  };
}
