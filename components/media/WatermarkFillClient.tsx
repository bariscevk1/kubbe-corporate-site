'use client';

import { useId } from 'react';
import { WatermarkSvgOverlay } from '@/components/media/WatermarkSvgOverlay';

type Props = {
  className?: string;
};

/** Sunucu layout’taki hero’larda kullanım: ince client adası, benzersiz pattern id */
export function WatermarkFillClient({ className }: Props) {
  const raw = useId().replace(/:/g, '');
  return <WatermarkSvgOverlay patternId={`wm-${raw}`} className={className} />;
}
