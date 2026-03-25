import type { Metadata } from 'next';
import { HizmetlerMotionPageContent } from '@/components/hizmetler/HizmetlerMotionPageContent';
import { HOME_SERVICES_TEASER_ITEMS } from '@/lib/content/home-services-teaser';
import { getRequestLocale } from '@/lib/i18n/server-locale';
import tr from '@/messages/tr.json';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

const seoByLang = { tr, en, ar } as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = getRequestLocale();
  const s = seoByLang[locale].seo.services;
  return { title: s.title, description: s.description };
}

export default function HizmetlerPage() {
  return <HizmetlerMotionPageContent items={HOME_SERVICES_TEASER_ITEMS} />;
}
