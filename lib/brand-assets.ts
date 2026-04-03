/**
 * Yerel varsayılan marka dosyaları (`public/`).
 * Sanity’de logo yokken veya favicon boşken kullanılır.
 */
export const DEFAULT_LOGO_SRC = '/brand/turgut-coskun-logo.webp';

/** Anasayfa iki sütunlu hero arka plan görselleri (`public/hero/`) */
const HERO_IMAGE_VERSION = '20260403-hero-7slides';
const heroSrc = (path: string) => `${path}?v=${HERO_IMAGE_VERSION}`;

export const HERO_LEFT_IMAGE = heroSrc('/hero/slide-01.png');
export const HERO_RIGHT_IMAGE = heroSrc('/hero/slide-02.png');

/** Anasayfa hero slider — 7 görsel (soldaki sütun slide-1/2 ile aynı kaynak; carousel toplam 7 kare) */
export const HERO_SLIDES = [
  { src: heroSrc('/hero/slide-01.png'), alt: 'Yesil kubbeli cami cepheden görünüm' },
  { src: heroSrc('/hero/slide-02.png'), alt: 'Havadan görünüm kurşun gri ana kubbe ve çevre kubbeler' },
  { src: heroSrc('/hero/slide-03.png'), alt: 'Turkuaz kubbeli cami, minare ve gökyüzü' },
  { src: heroSrc('/hero/slide-04.png'), alt: 'Havadan yeşil kubbe düzeni ve alt kubbeler' },
  { src: heroSrc('/hero/slide-05.png'), alt: 'Parlak metal kubbe kaplama havadan görünüm' },
  { src: heroSrc('/hero/slide-06.png'), alt: 'Bakır kubbe kaplama yakın plan' },
  { src: heroSrc('/hero/slide-07.png'), alt: 'Turkuaz kubbeli cami ve şantiye öncesi cephe' },
] as const;

/** Anasayfa — Hakkımızda tanıtım bölümü (COŞKUN Mimarlık & Mühendislik ekip görseli) */
export const ABOUT_TEASER_IMAGE = '/about/about-teaser-coskun-team.png';
