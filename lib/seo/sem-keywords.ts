/**
 * Reklam panellerindeki (AdresGezgini / Google Ads) kampanya gruplarıyla hizalı anahtar kelimeler.
 * Schema.org knowsAbout, meta keywords ve içerik stratejisi için tek kaynak.
 */
export const SEM_CORE_TOPICS_TR = [
  'kubbe kaplama',
  'cami kubbe kaplama',
  'camii kubbe kaplama',
  'cami kubbesi alüminyum kaplama',
  'cami kubbesi kurşun kaplama',
  'cami kubbesi bakır kaplama',
  'bakır kubbe kaplama',
  'alüminyum kubbe kaplama',
  'kurşun kubbe kaplama',
  'cami kubbe kaplama ustası',
  'kubbe kaplama fiyatları',
  'cami kubbe kaplama fiyatları',
  'kurşun levha',
  'kurşun levha satış',
  'kurşun levha fiyatları',
  'kurşun kaplama',
  'ankara kurşun levha',
  'alüminyum satış',
  'alüminyum sac',
  'alüminyum levha',
  'alüminyum sac fiyatları',
  'ankara alüminyum',
  'kenet çatı',
  'kenetli çatı',
  'metal kenet çatı',
  'alüminyum kenet çatı',
  'kenet çatı montajı',
  'kenet çatı fiyatları',
  'ankara kenet çatı',
  'cami nakkaş',
  'nakkaş süsleme',
  'cami alemi',
  'cami alemi ankara',
  'oluk satışı',
  'cami çatı kaplama',
  'kubbe yapımı',
  'cami kubbesi',
  'cami ustası',
] as const;

/** Yerel işletme şemasında kullanılacak üst sınır (çok uzun grafiklerden kaçın) */
export const SEM_KNOWS_ABOUT_FOR_SCHEMA = [...SEM_CORE_TOPICS_TR].slice(0, 36);
