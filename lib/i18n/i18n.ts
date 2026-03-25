import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import trCommon from '@/locales/tr/common.json';
import enCommon from '@/locales/en/common.json';
import arCommon from '@/locales/ar/common.json';

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

export const i18n = i18next.createInstance();

const baseInit = {
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  supportedLngs: [...SUPPORTED_LANGS],
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    tr: { common: trCommon },
    en: { common: enCommon },
    ar: { common: arCommon },
  },
  react: { useSuspense: false },
  initImmediate: false,
  interpolation: { escapeValue: false },
  returnEmptyString: false,
} as const;

/**
 * SSR + üretim: I18nProvider’ın useEffect’i çalışmadan SiteHeader useTranslation kullanıyor.
 * Modül yüklenirken init şart; aksi halde 500 / yanıt takılması görülebiliyor.
 */
i18n.use(initReactI18next).init({ ...baseInit });

export async function ensureI18nInit(lang?: SupportedLang) {
  const lng = lang || DEFAULT_LANG;
  if (i18n.language !== lng) {
    await i18n.changeLanguage(lng);
  }
  return i18n;
}

