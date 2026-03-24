/**
 * Yerel geliştirmede CMS ağı takılınca sayfa sonsuz yüklenmesin diye.
 * `npm run dev` bunu varsayılan açar; tam CMS için: `npm run dev:full`
 */
export function skipSanityInDev(): boolean {
  const v = process.env.SKIP_SANITY_IN_DEV;
  // Varsayilan: CMS agina gitme. Tam CMS test icin SKIP_SANITY_IN_DEV=0 verin.
  if (v === '0' || v === 'false') return false;
  return true;
}
