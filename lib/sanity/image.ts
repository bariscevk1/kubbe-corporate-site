import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

/**
 * Sanity CDN: otomatik format (WebP/AVIF) + boyut sınırı.
 * Arka planda CDN dönüşümü — ek sunucu işlemi gerekmez.
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max').quality(85);
}

export function serviceCoverUrl(
  source: SanityImageSource,
  width = 1200
): string {
  return urlForImage(source).width(width).format('webp').url();
}
