/**
 * Anasayfa — Hizmetler özet kartları (detaylar ileride /hizmetler alt sayfalarında)
 */
export type HomeServiceTeaserItem = {
  id: string;
  title: string;
  /** Kısa bilgilendirme (2 satıra yakın) */
  description: string;
  /** Mevcut veya genel hizmetler sayfası bağlantısı */
  href: string;
  /** `public/` altı yolu — örn. `/hizmetler/foo.webp` */
  imageSrc?: string;
  imageAlt?: string;
};

export const HOME_SERVICES_KICKER = 'Neler sunuyoruz';
export const HOME_SERVICES_TITLE = 'Hizmetlerimiz';

export const HOME_SERVICES_TEASER_ITEMS: readonly HomeServiceTeaserItem[] = [
  {
    id: 'camii-kubbe',
    title: 'Camii kubbe kaplama',
    description: 'Bakır, kurşun ve alüminyum ile kubbe kaplama ve restorasyonu.',
    href: '/hizmetler/kubbe-kaplama',
    imageSrc: '/hizmetler/camii-kubbe-kaplama.webp',
    imageAlt: 'Kubbe üzerinde alem ile camii kubbe kaplama — siyah beyaz mimari fotoğraf',
  },
  {
    id: 'aluminyum-satis',
    title: 'Alüminyum satışı',
    description: 'Yüksek kalite levha ve profil; proje ölçülerinize uygun tedarik.',
    href: '/hizmetler/aluminyum-satis',
    imageSrc: '/hizmetler/aluminyum-satis.webp',
    imageAlt: 'Alüminyum renk ve malzeme numuneleri yelpazesi',
  },
  {
    id: 'aluminyum-kubbe',
    title: 'Alüminyum kubbe kaplama',
    description: 'Hafif ve dayanıklı alüminyum ile kubbe ve çatı uygulamaları.',
    href: '/hizmetler/aluminyum-kubbe-kaplama',
    imageSrc: '/hizmetler/aluminyum-kubbe-kaplama.webp',
    imageAlt:
      'Alüminyum kaplı camii kubbesi ve altın alem — havadan çekilmiş kubbe kaplama uygulaması',
  },
  {
    id: 'bakir-kubbe',
    title: 'Bakır kubbe kaplama',
    description: 'Geleneksel bakır işçiliği ile uzun ömürlü kubbe yüzeyleri.',
    href: '/hizmetler/bakir-levha-satis',
    imageSrc: '/hizmetler/bakir-kubbe-kaplama.webp',
    imageAlt:
      'Dikey dikişli parlak bakır kaplı kubbe ve beyaz geçmeli kaide — profesyonel bakır kubbe kaplama',
  },
  {
    id: 'kursun-levha',
    title: 'Kurşun levha satışı',
    description: 'Su yalıtımı ve örtü uygulamaları için kurşun levha temini.',
    href: '/hizmetler/kursun-levha-satis',
    imageSrc: '/hizmetler/kursun-levha-satis.webp',
    imageAlt:
      'Metal levha ve ürün satışı — işyeri cephesi, depo içi rulo malzemeler ve endüstriyel tedarik',
  },
  {
    id: 'nakkas',
    title: 'Camii nakkaş ve süsleme',
    description: 'İç ve dış mekânda geleneksel süsleme ve nakkaş işleri.',
    href: '/hizmetler/nakkas-susleme',
    imageSrc: '/hizmetler/camii-nakkas-susleme.webp',
    imageAlt:
      'Camii içi sütun ve duvarlarda geleneksel nakkaş süsleme — mavi, lacivert ve altın tonlarında rumi ve geometrik motifler',
  },
  {
    id: 'alemler',
    title: 'Camii alemleri',
    description: 'Tasarım, üretim ve montaj ile alemi çözümleri.',
    href: '/hizmetler/alemler',
    imageSrc: '/hizmetler/camii-alemleri.webp',
    imageAlt:
      'Altın renkli camii alemleri — hilal tepeli kubbe ve minare süslemeleri, üretim alanında sergilenen modeller',
  },
  {
    id: 'oluk',
    title: 'Oluk satışı ve montajı',
    description: 'Yağmur suyu yönetimi için oluk sistemleri; satış ve profesyonel montaj.',
    href: '/hizmetler/oluk',
    imageSrc: '/hizmetler/oluk-satis-montaj.webp',
    imageAlt:
      'Çatı oluk ve düşen boru montajı — siyah metal oluk, dirsek bağlantısı ve cephe boyunca yağmur suyu tahliyesi',
  },
] as const;
