import { createClient, type QueryParams } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { skipSanityInDev } from '@/lib/sanity/skip-dev';

/**
 * Okuma istemcisi — ön yüz ve Server Components.
 * `useCdn`: prod’da CDN; revalidation ile güncellenir.
 */
export const sanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
});

export type SanityFetchTags = string[];

/**
 * Next.js cache etiketleri ile ISR / on-demand revalidation.
 */
export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  tags: SanityFetchTags = ['sanity']
): Promise<T> {
  if (skipSanityInDev()) {
    return null as T;
  }
  return sanityClient.fetch<T>(query, params, {
    next: {
      tags: [...tags, 'sanity'],
    },
  });
}
