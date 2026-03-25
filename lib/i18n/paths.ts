import { DEFAULT_LANG, type SupportedLang, isSupportedLang } from '@/lib/i18n/config';

/** Dosya sistemi segmenti → locale’e göre genel URL segmenti (SEO) */
export const ROUTE_LOCALE_SEGMENT: Record<string, Record<SupportedLang, string>> = {
  hizmetler: { tr: 'hizmetler', en: 'services', ar: 'services' },
  hakkimizda: { tr: 'hakkimizda', en: 'about', ar: 'about' },
  iletisim: { tr: 'iletisim', en: 'contact', ar: 'contact' },
  projeler: { tr: 'projeler', en: 'projects', ar: 'projects' },
  sevkiyatlar: { tr: 'sevkiyatlar', en: 'shipments', ar: 'shipments' },
  tesekkurler: { tr: 'tesekkurler', en: 'thank-you', ar: 'thank-you' },
};

export function reversePublicSegment(segment: string, locale: SupportedLang): string | null {
  for (const [internal, map] of Object.entries(ROUTE_LOCALE_SEGMENT)) {
    if (map[locale] === segment) return internal;
  }
  return null;
}

/**
 * Tarayıcı pathname → iç route (app/… ile uyumlu).
 */
export function pathnameToInternal(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return '/';

  let locale: SupportedLang | null = null;
  let i = 0;
  if (isSupportedLang(parts[0])) {
    locale = parts[0];
    i = 1;
  }

  if (i >= parts.length) return '/';

  const rawFirst = parts[i];
  const internalFirst =
    locale != null ? (reversePublicSegment(rawFirst, locale) ?? rawFirst) : rawFirst;
  const tail = parts.slice(i + 1);

  if (tail.length === 0) return `/${internalFirst}`;
  return `/${internalFirst}/${tail.join('/')}`;
}

/**
 * İç path → herkese açık locale önekli URL.
 */
export function localizePath(internalPath: string, locale: SupportedLang): string {
  const trimmed = internalPath.trim() || '/';
  if (trimmed === '/') return `/${locale}`;

  const parts = trimmed.split('/').filter(Boolean);
  const first = parts[0];
  const mapped =
    ROUTE_LOCALE_SEGMENT[first]?.[locale] ??
    ROUTE_LOCALE_SEGMENT[first]?.[DEFAULT_LANG] ??
    first;

  if (parts.length === 1) return `/${locale}/${mapped}`;
  return `/${locale}/${mapped}/${parts.slice(1).join('/')}`;
}

export function localeFromPathname(pathname: string): SupportedLang | null {
  const seg = pathname.split('/').filter(Boolean)[0];
  return isSupportedLang(seg) ? seg : null;
}
