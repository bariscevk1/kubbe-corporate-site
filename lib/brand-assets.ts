/**
 * Yerel varsayılan marka dosyaları (`public/`).
 * Sanity’de logo yokken veya favicon boşken kullanılır.
 */
export const DEFAULT_LOGO_SRC = '/brand/turgut-coskun-logo.webp';

/** Anasayfa iki sütunlu hero arka plan görselleri (`public/hero/`) — WebP optimize */
export const HERO_LEFT_IMAGE = '/hero/slide-01.png';
export const HERO_RIGHT_IMAGE = '/hero/slide-02.png';

/** Anasayfa hero slider görselleri */
export const HERO_SLIDES = [
  { src: '/hero/slide-01.png', alt: 'Cok kubbeli aluminyum kaplama cami catisi' },
  { src: '/hero/slide-02.png', alt: 'Yesil detayli ve parlak kubbeli cami gorunumu' },
  { src: '/hero/slide-03.png', alt: 'Bakir tonlu cok kubbeli cami ustten gorunum' },
  { src: '/hero/slide-04.png', alt: 'Beyaz cepheli cami ve merkezi bakir kubbe' },
  { src: '/hero/slide-05.png', alt: 'Siyah kubbe kaplama detayli cami hava gorunumu' },
  { src: '/hero/slide-06.png', alt: 'Bakir kubbe kaplama yakin plan uygulama gorseli' },
  { src: '/hero/slide-07.png', alt: 'Yesil kubbeli cami ve minare uygulamasi' },
  { src: '/hero/slide-08.png', alt: 'Buyuk gri kubbeli cami kompleksi genel gorunumu' },
] as const;

/** Anasayfa — Hakkımızda tanıtım bölümü (COŞKUN Mimarlık & Mühendislik ekip görseli) */
export const ABOUT_TEASER_IMAGE = '/about/about-teaser-coskun-team.png';
