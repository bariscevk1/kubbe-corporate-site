import type { Metadata } from 'next';
import { HakkimizdaMotionContent } from '@/components/about/HakkimizdaMotionContent';
import { getSiteSettings } from '@/lib/sanity/site-settings';
import {
  HAKKIMIZDA_CTA,
  HAKKIMIZDA_META_DESCRIPTION,
  HAKKIMIZDA_QUOTE,
  HAKKIMIZDA_SECTIONS,
} from '@/lib/content/hakkimizda';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: HAKKIMIZDA_META_DESCRIPTION,
};

export default async function HakkimizdaPage() {
  const site = await getSiteSettings();
  const company =
    site?.companyLegalName?.trim() || 'Turgut Çoşkun Kubbe Kaplama';
  const primary = site?.brandWordPrimary?.trim() || 'Kubbe';
  const accent = site?.brandWordAccent?.trim() || 'Kaplama';
  const brandLine = `${primary} ${accent}`.trim();

  return (
    <main className="bg-[var(--brand-bg-body)]">
      <HakkimizdaMotionContent
        company={company}
        brandLine={brandLine}
        sections={HAKKIMIZDA_SECTIONS}
        quote={HAKKIMIZDA_QUOTE}
        cta={HAKKIMIZDA_CTA}
      />
    </main>
  );
}
