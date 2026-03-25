'use client';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { localizePath } from '@/lib/i18n/paths';
import { type SupportedLang, isSupportedLang } from '@/lib/i18n/config';

/** İç route → geçerli dilde SEO URL’si */
export function useLocalizedPath() {
  const { i18n } = useTranslation('common');
  const lang = (isSupportedLang(i18n.language) ? i18n.language : 'tr') as SupportedLang;
  return useCallback((internalHref: string) => localizePath(internalHref, lang), [lang]);
}
