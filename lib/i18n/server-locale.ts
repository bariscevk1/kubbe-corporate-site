import { cookies, headers } from 'next/headers';
import { DEFAULT_LANG, type SupportedLang, isSupportedLang } from '@/lib/i18n/config';

/** Middleware `x-next-locale` veya çerez; yoksa varsayılan */
export function getRequestLocale(): SupportedLang {
  const fromHeader = headers().get('x-next-locale');
  if (isSupportedLang(fromHeader)) return fromHeader;

  const fromCookie = cookies().get('NEXT_LOCALE')?.value;
  if (isSupportedLang(fromCookie)) return fromCookie;

  return DEFAULT_LANG;
}
