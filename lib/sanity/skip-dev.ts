/**
 * Yerel geliştirmede CMS ağı takılınca sayfa sonsuz yüklenmesin diye.
 * `npm run dev` bunu varsayılan açar; tam CMS için: `npm run dev:full`
 */
export function skipSanityInDev(): boolean {
  if (process.env.NODE_ENV !== 'development') return false;
  const v = process.env.SKIP_SANITY_IN_DEV;
  return v === '1' || v === 'true';
}
