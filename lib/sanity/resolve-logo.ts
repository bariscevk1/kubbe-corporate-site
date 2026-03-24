import { DEFAULT_LOGO_SRC } from '@/lib/brand-assets';
import { urlForImage } from '@/lib/sanity/image';
import type { SiteSettingsDoc } from '@/lib/sanity/types';

/** Header / hero / footer için tek kaynak — Sanity logo veya yerel varsayılan */
export function resolveLogoSrc(site: SiteSettingsDoc | null): string {
  const raw = site?.logo;
  if (raw && typeof raw === 'object' && 'asset' in raw && raw.asset) {
    try {
      return urlForImage(raw).width(480).height(240).fit('max').url();
    } catch {
      return DEFAULT_LOGO_SRC;
    }
  }
  return DEFAULT_LOGO_SRC;
}
