'use client';

import { useId } from 'react';
import { WatermarkSvgOverlay } from '@/components/media/WatermarkSvgOverlay';
import { WATERMARK_PHONE_COMPACT } from '@/lib/watermark-phone';

type Props = {
  children: React.ReactNode;
  /** Taşıyıcı — aspect-ratio / min-h buraya (fill Image ile birlikte kullanın) */
  className?: string;
  /** Filigran; `05323236627` tek blok veya boşluklu gösterim */
  text?: string;
  overlayClassName?: string;
};

/**
 * next/image için `relative` kutu + üstte şeffaf telefon filigranı (görseli değiştirmez).
 */
export function RelativeImageWatermark({
  children,
  className = '',
  text = WATERMARK_PHONE_COMPACT,
  overlayClassName = '',
}: Props) {
  const patternId = `riw-${useId().replace(/:/g, '')}`;

  return (
    <div className={`relative overflow-hidden ${className}`.trim()}>
      {children}
      <WatermarkSvgOverlay patternId={patternId} text={text} className={`z-[1] ${overlayClassName}`.trim()} />
    </div>
  );
}
