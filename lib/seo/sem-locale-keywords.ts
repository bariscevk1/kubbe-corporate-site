import type { SupportedLang } from '@/lib/i18n/config';
import { SEM_CORE_TOPICS_EN } from '@/lib/seo/sem-keywords-en';
import { SEM_CORE_TOPICS_TR } from '@/lib/seo/sem-keywords';

export function semKeywordsForLocale(locale: SupportedLang): string[] {
  if (locale === 'tr') return [...SEM_CORE_TOPICS_TR];
  if (locale === 'ar') return [...SEM_CORE_TOPICS_TR];
  return [...SEM_CORE_TOPICS_EN];
}
