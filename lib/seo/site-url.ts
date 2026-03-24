/**
 * metadataBase ve JSON-LD için — .env'deki yazım hatası 500'e düşmesin.
 */
export const FALLBACK_SITE_ORIGIN = 'https://example.com';

export function getMetadataBaseUrl(): URL {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_ORIGIN).trim();
  if (!raw) return new URL(FALLBACK_SITE_ORIGIN);
  try {
    const u = new URL(raw);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') {
      return new URL(FALLBACK_SITE_ORIGIN);
    }
    return u;
  } catch {
    return new URL(FALLBACK_SITE_ORIGIN);
  }
}

/** Schema / iletişim — sondaki slash yok */
export function getPublicSiteOriginString(): string {
  return getMetadataBaseUrl().origin.replace(/\/$/, '');
}
