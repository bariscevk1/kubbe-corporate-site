import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity/client';
import { serviceBySlugQuery } from '@/lib/sanity/queries';
import type { ServiceDoc } from '@/lib/sanity/types';
import { SanityServiceCover } from '@/components/cms/SanityServiceCover';
import { SubpageHeading } from '@/components/ui/SubpageHeading';

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

  return (
    <main className="service-detail-page site-subpage-light mx-auto max-w-3xl px-4 py-16 md:px-6">
      <div className="overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-elevated)] shadow-[0_18px_40px_-32px_rgba(31,41,55,0.18)]">
        <SanityServiceCover
          service={service}
          width={1200}
          wrapClassName="block w-full"
          className="w-full object-cover"
        />
      </div>
      <div className="mt-10">
        <SubpageHeading as="h1" size="hero">
          {service.title}
        </SubpageHeading>
      </div>
      <p className="whitespace-pre-line text-slate-400 leading-relaxed">{service.description}</p>
    </main>
  );
}
