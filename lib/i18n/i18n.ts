import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import trCommon from '@/messages/tr.json';
import enCommon from '@/messages/en.json';
import arCommon from '@/messages/ar.json';

import {
  DEFAULT_LANG,
  type SupportedLang,
} from '@/lib/i18n/config';

export {
  SUPPORTED_LANGS,
  type SupportedLang,
  STORAGE_KEY,
  DEFAULT_LANG,
  isSupportedLang,
  langDir,
} from '@/lib/i18n/config';

export const i18n = i18next.createInstance();

const baseInit = {
  lng: DEFAULT_LANG,
  /** EN/AR sparse keys fall back to Turkish so new tr.json keys never show raw key ids */
  fallbackLng: {
    default: [DEFAULT_LANG],
    en: [DEFAULT_LANG],
    ar: [DEFAULT_LANG],
  },
  supportedLngs: ['tr', 'en', 'ar'],
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

i18n.use(initReactI18next).init({ ...baseInit });

export async function ensureI18nInit(lang?: SupportedLang) {
  const lng = lang || DEFAULT_LANG;
  if (i18n.language !== lng) {
    await i18n.changeLanguage(lng);
  }
  return i18n;
}
