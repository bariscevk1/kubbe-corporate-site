import { sanityFetch } from '@/lib/sanity/client';
import { skipSanityInDev } from '@/lib/sanity/skip-dev';
import { siteSettingsQuery } from '@/lib/sanity/queries';
import type { SiteSettingsDoc } from '@/lib/sanity/types';
import { withTimeout } from '@/lib/utils/with-timeout';

const SITE_SETTINGS_MS = 12_000;

/** Sunucu bileşenlerinde tekrar kullanım — Next önbelleği aynı sorguyu birleştirir. */
export async function getSiteSettings(): Promise<SiteSettingsDoc | null> {
  if (skipSanityInDev()) return null;
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  try {
    return await withTimeout(
      sanityFetch<SiteSettingsDoc | null>(siteSettingsQuery, {}, ['siteSettings']),
      SITE_SETTINGS_MS,
      'getSiteSettings'
    );
  } catch {
    return null;
  }
}
