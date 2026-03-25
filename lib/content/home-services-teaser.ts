/**
 * Anasayfa — Hizmetler özet kartları (başlık/açıklama/alt metinler messages/home.services.grid.* içinde)
 */
export type HomeServiceTeaserItem = {
  id: string;
  /** Mevcut veya genel hizmetler sayfası bağlantısı (iç path, örn. /hizmetler/foo) */
  href: string;
  /** `public/` altı yolu — örn. `/hizmetler/foo.webp` */
  imageSrc?: string;
};

export const HOME_SERVICES_TEASER_ITEMS: readonly HomeServiceTeaserItem[] = [
  {
    id: 'camii-kubbe',
    href: '/hizmetler/kubbe-kaplama',
    imageSrc: '/hizmetler/camii-kubbe-kaplama.webp',
  },
  {
    id: 'aluminyum-satis',
    href: '/hizmetler/aluminyum-satis',
    imageSrc: '/hizmetler/aluminyum-satis.webp',
  },
  {
    id: 'aluminyum-kubbe',
    href: '/hizmetler/aluminyum-kubbe-kaplama',
    imageSrc: '/hizmetler/aluminyum-kubbe-kaplama.webp',
  },
  {
    id: 'bakir-kubbe',
    href: '/hizmetler/bakir-levha-satis',
    imageSrc: '/hizmetler/bakir-kubbe-kaplama.webp',
  },
  {
    id: 'kursun-levha',
    href: '/hizmetler/kursun-levha-satis',
    imageSrc: '/hizmetler/kursun-levha-satis.webp',
  },
  {
    id: 'nakkas',
    href: '/hizmetler/nakkas-susleme',
    imageSrc: '/hizmetler/camii-nakkas-susleme.webp',
  },
  {
    id: 'alemler',
    href: '/hizmetler/alemler',
    imageSrc: '/hizmetler/camii-alemleri.webp',
  },
  {
    id: 'oluk',
    href: '/hizmetler/oluk',
    imageSrc: '/hizmetler/oluk-satis-montaj.webp',
  },
] as const;
