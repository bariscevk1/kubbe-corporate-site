'use client';

import Image, { type ImageProps } from 'next/image';
import { useCallback, useId, type DragEvent, type MouseEvent } from 'react';
import { WatermarkSvgOverlay } from '@/components/media/WatermarkSvgOverlay';

export type ProtectedImageProps = Omit<ImageProps, 'onContextMenu' | 'draggable'> & {
  /** Sarmalayıcıya ek Tailwind / sınıf */
  wrapClassName?: string;
  /** Geriye dönük uyumluluk — tek SVG pattern kullanılır */
  watermarkPattern?: 'diagonal' | 'grid';
};

/**
 * next/image: sunucu tarafında WebP/AVIF, varsayılan lazy-load.
 * Filigran: tek SVG pattern (düşük DOM / paint maliyeti).
 */
export function ProtectedImage({
  src,
  alt,
  className = '',
  wrapClassName = '',
  watermarkPattern: _watermarkPattern = 'diagonal',
  loading,
  onDragStart,
  ...rest
}: ProtectedImageProps) {
  const patternId = `wm-prot-${useId().replace(/:/g, '')}`;

  const blockContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
  }, []);

  const blockDrag = useCallback(
    (e: DragEvent<HTMLImageElement>) => {
      e.preventDefault();
      onDragStart?.(e);
    },
    [onDragStart],
  );

  const blockContextMenuCapture = useCallback((e: MouseEvent) => {
    e.preventDefault();
  }, []);

  const blockDragCapture = useCallback((e: DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div
      className={`relative inline-block max-w-full select-none ${wrapClassName}`.trim()}
      onContextMenu={blockContextMenu}
      onContextMenuCapture={blockContextMenuCapture}
      onDragStartCapture={blockDragCapture}
    >
      <Image
        {...rest}
        src={src}
        alt={alt}
        className={`select-none ${className}`.trim()}
        draggable={false}
        loading={loading ?? 'lazy'}
        onContextMenu={blockContextMenu}
        onDragStart={blockDrag}
      />

      <WatermarkSvgOverlay patternId={patternId} className="z-[1] overflow-hidden" />

      <div
        className="pointer-events-none absolute inset-0 z-[2] cursor-default bg-transparent"
        aria-hidden
      />
    </div>
  );
}
