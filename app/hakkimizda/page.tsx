import type { Metadata } from 'next';
import { HakkimizdaMotionContent } from '@/components/about/HakkimizdaMotionContent';
import { getSiteSettings } from '@/lib/sanity/site-settings';
import { getRequestLocale } from '@/lib/i18n/server-locale';
import tr from '@/messages/tr.json';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

const seoByLang = { tr, en, ar } as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = getRequestLocale();
  const s = seoByLang[locale].seo.about;
  return { title: s.title, description: s.description };
}

export default async function HakkimizdaPage() {
  const site = await getSiteSettings();
  const company =
    site?.companyLegalName?.trim() || 'Turgut Çoşkun Kubbe Kaplama';
  const primary = site?.brandWordPrimary?.trim() || 'Kubbe';
  const accent = site?.brandWordAccent?.trim() || 'Kaplama';
  const brandLine = `${primary} ${accent}`.trim();

  return (
    <main className="bg-[var(--brand-bg-body)]">
      <HakkimizdaMotionContent company={company} brandLine={brandLine} />
    </main>
  );
}
