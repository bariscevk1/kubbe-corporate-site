import type { Metadata } from 'next';
import { ProjectsPageContent } from '@/components/projects/ProjectsPageContent';

export const metadata: Metadata = {
  title: 'Projelerimiz',
  description:
    'Türkiye genelinde kubbe kaplama, nakkaş, oluk ve sevkiyat referansları — anasayfa haritasıyla aynı veri; il plakası, şehir ve kategori bilgisi.',
};

export default function ProjelerPage() {
  return (
    <main className="min-h-[70vh] bg-[var(--brand-bg-body)]">
      <ProjectsPageContent />
    </main>
  );
}
