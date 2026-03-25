'use client';

import { GtagSlot } from '@/components/ads/GtagSlot';

/** Layout sonunda: gtag yalnızca client’ta, strateji GtagSlot içinde (lazyOnload). */
export function AdsAnalyticsLazy() {
  return <GtagSlot />;
}
