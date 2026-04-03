import type { Metadata } from 'next';

const site = 'Kubbe Kaplama';

/** Hizmet alt sayfaları — kampanya anahtar kelimeleriyle hizalı meta (kalite puanı / organik) */
export const HIZMET_PAGE_METADATA: Record<string, Metadata> = {
  'kubbe-kaplama': {
    title: 'Camii Kubbe Kaplama',
    description:
      'Cami kubbe kaplama, camii kubbe kaplama ustası, cami kubbesi kurşun ve alüminyum kaplama, bakır kubbe kaplama, kubbe kaplama fiyatları ve malzemeleri. Ankara merkez, Türkiye geneli montaj ve sevkiyat.',
    keywords: [
      'cami kubbe kaplama',
      'camii kubbe kaplama',
      'kubbe kaplama',
      'cami kubbesi kurşun kaplama',
      'cami kubbesi alüminyum kaplama',
      'bakır kubbe kaplama',
      'cami bakır kaplama',
      'kubbe kaplama fiyatları',
      'cami kubbe kaplama fiyatları',
      'kubbe kaplama ustası',
      'cami kubbe kaplama ustası',
      'kubbe yapımı',
      'cami kubbesi',
    ],
    openGraph: {
      title: `Camii Kubbe Kaplama | ${site}`,
      description:
        'Osmanlı kubbe geleneğine uygun camii kubbe kaplama; kurşun, alüminyum ve bakır. Usta ekip, Türkiye geneli.',
    },
  },
  'aluminyum-satis': {
    title: 'Alüminyum Sac ve Levha Satışı',
    description:
      'Alüminyum satış, alüminyum sac ve levha, rulo sac; alüminyum sac fiyatları ve levha fiyatları. Ankara ve Türkiye geneli tedarik. Cami kubbesi için alüminyum ve camiilik alüminyum satışı.',
    keywords: [
      'alüminyum satış',
      'alüminyum sac',
      'alüminyum levha',
      'alüminyum sac fiyatları',
      'alüminyum levha fiyatları',
      'alüminyum satış fiyatları',
      'alüminyum rulo',
      'ankara alüminyum',
      'cami kubbesi için alüminyum',
      'camiilik alüminyum satışı',
    ],
    openGraph: {
      title: `Alüminyum Satışı | ${site}`,
      description: 'Alüminyum sac, levha ve rulo satışı; proje ölçülerine uygun tedarik.',
    },
  },
  'aluminyum-kubbe-kaplama': {
    title: 'Alüminyum Kubbe Kaplama',
    description:
      'Alüminyum kubbe kaplama, cami kubbesi alüminyum kaplama, alüminyum cami kubbe kaplama. Alüminyum kubbe kaplama ustası; İstanbul, Ankara ve Türkiye geneli uygulama.',
    keywords: [
      'alüminyum kubbe kaplama',
      'cami kubbesi alüminyum kaplama',
      'alüminyum cami kubbe kaplama',
      'camii alüminyum kubbe kaplama',
      'alüminyum kubbe kaplama ustası',
      'alüminyum kubbe kaplama ustaları',
      'cami çatı alüminyum kubbe kaplama',
    ],
    openGraph: {
      title: `Alüminyum Kubbe Kaplama | ${site}`,
      description: 'Hafif ve dayanıklı alüminyum ile camii kubbe ve çatı hattı kaplaması.',
    },
  },
  'bakir-levha-satis': {
    title: 'Bakır Levha ve Bakır Kubbe Kaplama',
    description:
      'Bakır kubbe kaplama, cami kubbesi bakır kaplama, camii bakır kubbe kaplama. Geleneksel bakır işçiliği ile kubbe ve cephe; Türkiye geneli.',
    keywords: [
      'bakır kubbe kaplama',
      'cami bakır kaplama',
      'cami kubbesi bakır kaplama',
      'camii bakır kubbe kaplama',
      'bakır levha',
    ],
    openGraph: {
      title: `Bakır Kubbe Kaplama | ${site}`,
      description: 'Bakır levha ve bakır kubbe kaplama; uzun ömürlü işçilik.',
    },
  },
  'kursun-levha-satis': {
    title: 'Kurşun Levha Satışı ve Kurşun Kaplama',
    description:
      'Kurşun levha, kurşun levha fiyatları, kurşun levha satış, ankara kurşun levha. Cami kurşun kaplama, cami kubbesi kurşun kaplama ve kubbe kurşun kaplama için malzeme ve uygulama desteği.',
    keywords: [
      'kurşun levha',
      'kurşun levha fiyatları',
      'kurşun levha satış',
      'kurşun kaplama',
      'kurşun levha kaplama',
      'ankara kurşun levha',
      'cami kurşun kaplama',
      'cami kurşun kaplama fiyatları',
      'cami kubbesi kurşun kaplama',
      'kurşun kubbe kaplama',
    ],
    openGraph: {
      title: `Kurşun Levha Satışı | ${site}`,
      description: 'Kurşun levha tedariği ve camii kubbe kurşun kaplama için teknik destek.',
    },
  },
  'nakkas-susleme': {
    title: 'Cami Nakkaş ve Nakkaş Süsleme',
    description:
      'Cami nakkaş, nakkaş süsleme ve cami iç süsleme. Kubbe ve mihrap hatlarında geleneksel süsleme uygulamaları.',
    keywords: ['cami nakkaş', 'nakkaş süsleme', 'cami nakkaş süsleme', 'camii nakkaş'],
    openGraph: {
      title: `Nakkaş Süsleme | ${site}`,
      description: 'Cami içi nakkaş ve süsleme işleri.',
    },
  },
  alemler: {
    title: 'Camii Alemleri',
    description:
      'Camii alemi, cami alemi ankara ve Türkiye geneli alem imalatı. Kubbe üstü alem ve süslemeler.',
    keywords: ['cami alemi', 'camii alemi', 'cami alemi ankara', 'alem imalatı'],
    openGraph: {
      title: `Camii Alemleri | ${site}`,
      description: 'Kubbe alemi tasarım ve uygulama.',
    },
  },
  oluk: {
    title: 'Oluk Satışı, Montajı ve Kenet Çatı',
    description:
      'Oluk satışı ve montajı, yağmur oluk sistemleri. Kenet çatı, kenetli çatı ve metal kenet çatı sistemleri; alüminyum kenet çatı montajı ve kenet çatı fiyatları için keşif ve teklif.',
    keywords: [
      'oluk satışı',
      'oluk montajı',
      'kenet çatı',
      'kenetli çatı',
      'metal kenet çatı',
      'alüminyum kenet çatı',
      'kenet çatı montajı',
      'kenet çatı fiyatları',
      'ankara kenet çatı',
      'kenet çatı sistemleri',
    ],
    openGraph: {
      title: `Oluk ve Kenet Çatı | ${site}`,
      description: 'Oluk sistemleri ve kenet çatı uygulamaları.',
    },
  },
};
