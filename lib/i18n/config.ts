export const SUPPORTED_LANGS = ['tr', 'en', 'ar'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const STORAGE_KEY = 'kubbe_lang';
export const DEFAULT_LANG: SupportedLang = 'tr';

export function isSupportedLang(v: string | null | undefined): v is SupportedLang {
  return !!v && (SUPPORTED_LANGS as readonly string[]).includes(v);
}

export function langDir(lang: SupportedLang) {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
