'use client';

import { ProtectedImage } from '@/components/ProtectedImage';
import { serviceCoverUrl } from '@/lib/sanity/image';
import type { ServiceDoc } from '@/lib/sanity/types';

type Props = {
  service: ServiceDoc;
  width?: number;
  className?: string;
  wrapClassName?: string;
};

/**
 * Hizmet kapak görseli — CDN WebP + watermark (ProtectedImage).
 */
export function SanityServiceCover({
  service,
  width = 1200,
  className = '',
  wrapClassName = '',
}: Props) {
  const src = serviceCoverUrl(service.coverImage, width);
  const alt = service.coverImage?.alt || service.title;

  return (
    <ProtectedImage
      src={src}
      alt={alt}
      className={className}
      wrapClassName={wrapClassName}
      width={width}
      height={Math.round(width * 0.5625)}
      sizes="(max-width: 768px) 100vw, 33vw"
    />
  );
}
