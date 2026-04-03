import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';
import { watermarkedSrc } from '@/lib/media/watermarked-src';
import { sanityFetch } from '@/lib/sanity/client';
import { serviceCoverUrl } from '@/lib/sanity/image';
import { serviceBySlugQuery } from '@/lib/sanity/queries';
import type { ServiceDoc } from '@/lib/sanity/types';

type Props = { params: { slug: string } };

async function fetchService(slug: string): Promise<ServiceDoc | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  try {
    return await sanityFetch<ServiceDoc | null>(serviceBySlugQuery, { slug }, ['service']);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await fetchService(params.slug);
  if (!service) return { title: 'Hizmet' };
  return {
    title: service.title,
    description: service.description.slice(0, 160),
    openGraph: { title: service.title },
  };
}

export default async function HizmetDetayPage({ params }: Props) {
  const service = await fetchService(params.slug);
  if (!service) notFound();

  const hasCover = Boolean(service.coverImage && 'asset' in service.coverImage && service.coverImage.asset);
  const heroSrc = hasCover
    ? watermarkedSrc(serviceCoverUrl(service.coverImage, 1600))
    : '/hizmetler/camii-kubbe-kaplama-hero.png';

  return (
    <main className="service-detail-page site-subpage-light min-h-screen bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc={heroSrc}
        imageAlt={service.coverImage?.alt || service.title}
        title={service.title}
        kicker="Hizmet"
      />
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <p className="whitespace-pre-line leading-relaxed text-slate-300">{service.description}</p>
      </div>
    </main>
  );
}
