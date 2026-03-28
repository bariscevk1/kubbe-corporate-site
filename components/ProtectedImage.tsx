'use client';

import Image, { type ImageProps } from 'next/image';
import { useCallback, type DragEvent, type MouseEvent } from 'react';

export type ProtectedImageProps = Omit<ImageProps, 'onContextMenu' | 'draggable'> & {
  wrapClassName?: string;
};

/**
 * next/image: sunucu tarafında WebP/AVIF, varsayılan lazy-load.
 * Tarayıcı tarafında ek watermark overlay basılmaz; görsel sunucudan geldiği haliyle render edilir.
 */
export function ProtectedImage({
  src,
  alt,
  className = '',
  wrapClassName = '',
  loading,
  onDragStart,
  ...rest
}: ProtectedImageProps) {
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

      <div
        className="pointer-events-none absolute inset-0 z-[2] cursor-default bg-transparent"
        aria-hidden
      />
    </div>
  );
}
