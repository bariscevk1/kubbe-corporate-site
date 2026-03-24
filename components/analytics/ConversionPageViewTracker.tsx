'use client';

import { useEffect } from 'react';
import { trackThankYouPageView } from '@/lib/analytics/gtag-events';

type Props = {
  kind: 'thankyou';
};

/**
 * Dönüşüm sayfalarında mount anında conversion event tetikler.
 */
export function ConversionPageViewTracker({ kind }: Props) {
  useEffect(() => {
    if (kind === 'thankyou') {
      trackThankYouPageView();
    }
  }, [kind]);

  return null;
}
