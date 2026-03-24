/**
 * Anasayfa — Değerlerimiz (sütun metinleri)
 */
export type HomeValueItem = {
  id: string;
  title: string;
  body: string;
};

export const HOME_VALUES_HEADING = 'Değerlerimiz';
export const HOME_VALUES_SUBTITLE = 'Mükemmelliğin sütunları';

export const HOME_VALUES_ITEMS: readonly HomeValueItem[] = [
  {
    id: 'kalite',
    title: 'Kalite & uzmanlık',
    body:
      'Çizimden montaja her aşamada yüksek standart; malzeme ve işçilikte tek kalite anlayışı.',
  },
  {
    id: 'deneyim',
    title: 'Yılların deneyimi',
    body:
      "1987'den beri nesillerden gelen zanaatkarlık ve zamana dayanan projeler.",
  },
  {
    id: 'guven',
    title: 'Güven & garanti',
    body: 'Yazılı garanti ve şeffaf süreç; müşteri memnuniyeti imzamızdır.',
  },
  {
    id: 'teslimat',
    title: 'Zamanında teslimat',
    body:
      'Taahhüt edilen sürede eksiksiz teslim; planlı üretim ve profesyonel lojistik.',
  },
] as const;
