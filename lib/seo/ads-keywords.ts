/**
 * Google Ads / AdresGezgini panelinde ödeme yapılan anahtar kelimelerin özeti +
 * doğal genişletmeler (eş anlamlı, birleşik aramalar).
 * Site metni ve meta alanlarında “doldurma” değil, okunabilir paragraflar + liste olarak kullanılır.
 */

/** Reklam gruplarından: kubbe, kurşun, kenet, alüminyum, cami ustası vb. */
export const AD_GROUP_FOCUS = [
  'kubbe kaplama',
  'kurşun satışı ve kurşun levha',
  'kenet çatı',
  'alüminyum sac ve levha satışı',
  'cami ustası ve kubbe ustası',
  'cami alemleri ve minare işleri',
] as const;

/**
 * Panellerden çıkarılan ve genişletilmiş anahtar kelimeler (Türkçe).
 * Üst sıradaki terimler meta `keywords` ve Schema `knowsAbout` için de kullanılır.
 */
export const PAID_SEARCH_KEYWORDS: string[] = [
  // Kubbe / cami — yüksek dönüşüm
  'cami kubbe',
  'cami kaplama',
  'cami alemi fiyatları',
  'cami kubbe kaplama',
  'cami kurşun kaplama',
  'alüminyum kubbe kaplama',
  'cami kubbesi yapımı',
  'cami dış cephe kaplama',
  'cami alüminyum kaplama',
  'camii alemleri',
  'cami kubbesi alüminyum kaplama',
  'camii alüminyum kubbe kaplama',
  'cami kubbesi kurşun kaplama',
  'kubbe kurşun kaplama fiyatları',
  'cami kurşun kaplama fiyatları',
  'cami bakır kaplama',
  'bakır kubbe kaplama',
  'cami kubbe sacı fiyatları',
  'cami çatı kaplama',
  'cami kubbe kaplama malzemeleri',
  'cami kubbe kaplama ustası',
  'kubbe kaplama ustası',
  'alüminyum kubbe kaplama ustası',
  'alüminyum kubbe kaplama ustaları',
  'cami kubbe ustası',
  'cami kubbeleri',
  'kubbe kaplama fiyatları',
  'cami kubbesi bakır kaplama',
  'cami kubbesi çinko kaplama',
  'cami çinko kaplama',
  'camii bakır kubbe kaplama',
  'camilik alüminyum kubbe',
  'camilik alüminyum satışı',
  'cami çatı alüminyum kubbe kaplama',
  'camii kubbe kaplama malzemeleri',
  'cami kubbesi için alüminyum',
  'jeodezik kubbe yapımı',
  // Kurşun levha
  'kurşun levha',
  'kurşun levha fiyatları',
  'kurşun kaplama',
  'kurşun levha kaplama',
  'ankara kurşun levha',
  'kurşun levha satış',
  'kurşun levha nerede satılır',
  'kurşun levha fiyat listesi',
  'analizli kurşun levha',
  // Kenet çatı
  'kenet çatı',
  'kenet çatı m2 fiyat',
  'kenet çatı ankara',
  'kenet çatı sistemleri',
  'kenetli sac çatı',
  'alüminyum kenet çatı',
  'kenet çatı kaplama',
  'metal kenet çatı',
  'kenet çatı modelleri',
  'kenet çatı uygulaması',
  'kenet sistem çatı',
  'kenetli sistem çatı kaplaması',
  'trapez kenet çatı',
  'kenet çatı firmaları',
  'metal kenet çatı fiyatları',
  'kenet çatı montajı',
  'kenetli alüminyum çatı kaplaması',
  'çinko kenet çatı',
  'ankara kenet çatı sistemleri',
  'kenetli metal çatı kaplaması',
  'kenetli sac çatı kaplaması',
  'kenet çatılar',
  'kenetli çatı sistemleri fiyatları',
  'alüminyum kenetli çatı kaplama',
  'ankara kenet çatı m2 fiyatları',
  'kenetli metal çatı fiyatları',
  'kenetli metal çatı kaplama sistemleri',
  'kenetli çatı uygulaması',
  // Alüminyum ürün
  'alüminyum sac fiyatları',
  'alüminyum levha',
  'alüminyum levha fiyatları',
  'alüminyum rulo',
  'alüminyum satışı',
  'boyalı alüminyum',
  'alüminyum sac',
  // Usta / cami
  'camii ustası',
  'cami ustaları',
  'cami ustası',
  'cami minare ustası',
  'alüminyum camii kubbe kaplama ustası',
  'alüminyum camii kubbe kaplama ustaları',
  'cami alemi ankara',
  // Genişletme (doğal varyantlar)
  'cami kubbe kaplama fiyatları',
  'cami çatısı kubbe kaplama',
  'metal çatı kaplama',
  'sac çatı kaplama',
  'cami kubbe kaplama malzemeleri',
];

/** Meta etiketi için uzunluk sınırı (okunabilirlik) */
export function metaKeywordsString(maxLength = 900): string {
  const raw = Array.from(new Set(PAID_SEARCH_KEYWORDS)).join(', ');
  if (raw.length <= maxLength) return raw;
  return raw.slice(0, maxLength).replace(/,[^,]*$/, '');
}

/** Schema.org / JSON-LD için kısa liste */
export function topKeywordsForSchema(limit = 30): string[] {
  return Array.from(new Set(PAID_SEARCH_KEYWORDS)).slice(0, limit);
}
