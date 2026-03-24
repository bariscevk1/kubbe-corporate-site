'use client';

import Image, { type ImageProps } from 'next/image';
import { useCallback, type DragEvent, type MouseEvent } from 'react';

const PHONE = '0532 323 66 27';

export type ProtectedImageProps = Omit<ImageProps, 'onContextMenu' | 'draggable'> & {
  /** Sarmalayıcıya ek Tailwind / sınıf */
  wrapClassName?: string;
  /** Filigran düzeni: çapraz (-45°) tekrar veya ızgara */
  watermarkPattern?: 'diagonal' | 'grid';
};

/**
 * next/image: sunucu tarafında WebP/AVIF (next.config `images.formats`), varsayılan lazy-load.
 * Filigran: tam alan, hafif beyaz telefon metni.
 * Sağ tık / sürükleme: üstte şeffaf katman + draggable=false.
 */
export function ProtectedImage({
  src,
  alt,
  className = '',
  wrapClassName = '',
  watermarkPattern = 'diagonal',
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
    [onDragStart]
  );

  /** Yakalama fazında: alt öğedeki img’e gitmeden sağ tık / sürükleme kesilir */
  const blockContextMenuCapture = useCallback((e: MouseEvent) => {
    e.preventDefault();
  }, []);

  const blockDragCapture = useCallback((e: DragEvent) => {
    e.preventDefault();
  }, []);

  const diagonalCells = 28;
  const gridCols = 3;
  const gridRows = 4;

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

      {/* Filigran: tam alan, çok hafif beyaz metinler */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] select-none overflow-hidden"
        aria-hidden
      >
        {watermarkPattern === 'diagonal' ? (
          <div
            className="absolute inset-0 flex flex-wrap content-center items-center justify-center gap-x-10 gap-y-8 p-4 text-white opacity-20 sm:gap-x-14 sm:gap-y-10"
            style={{ transform: 'rotate(-45deg)', width: '140%', height: '140%', left: '-20%', top: '-20%' }}
          >
            {Array.from({ length: diagonalCells }).map((_, i) => (
              <span
                key={i}
                className="whitespace-nowrap font-semibold tracking-wider"
                style={{ fontSize: 'clamp(0.65rem, 1.8vw, 0.95rem)' }}
              >
                {PHONE}
              </span>
            ))}
          </div>
        ) : (
          <div className="grid h-full w-full grid-cols-3 gap-2 p-2 text-white opacity-20 sm:grid-cols-4 sm:gap-3">
            {Array.from({ length: gridCols * gridRows }).map((_, i) => (
              <span
                key={i}
                className="flex select-none items-center justify-center whitespace-nowrap text-center font-semibold tracking-wide"
                style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.8rem)' }}
              >
                {PHONE}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Şeffaf üst katman (tıklamayı engellemez; olaylar yukarıdaki capture ile kesilir) */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] cursor-default bg-transparent"
        aria-hidden
      />
    </div>
  );
}
