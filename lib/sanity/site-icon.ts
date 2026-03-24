import { DEFAULT_LOGO_SRC } from '@/lib/brand-assets';
import { urlForImage } from '@/lib/sanity/image';
import type { SiteSettingsDoc } from '@/lib/sanity/types';

/** Favicon: önce CMS `favicon`, sonra `logo`, yoksa yerel varsayılan logo dosyası */
export function siteIconUrlFromSettings(site: SiteSettingsDoc | null): string {
  if (!site) return DEFAULT_LOGO_SRC;
  const fav = site.favicon;
  const logo = site.logo;
  const raw =
    fav && typeof fav === 'object' && 'asset' in fav && fav.asset
      ? fav
      : logo && typeof logo === 'object' && 'asset' in logo && logo.asset
        ? logo
        : null;
  if (!raw) return DEFAULT_LOGO_SRC;
  try {
    return urlForImage(raw).width(64).height(64).fit('max').url();
  } catch {
    return DEFAULT_LOGO_SRC;
  }
}
