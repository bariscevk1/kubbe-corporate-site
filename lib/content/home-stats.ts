/**
 * Anasayfa — Başarı rakamları (gösterim + sayaç hedefi)
 */
export type HomeStatItem = {
  id: string;
  /** Sayaç hedefi (tam sayı) */
  value: number;
  label: string;
};

export const HOME_STATS_HEADING = 'Başarı rakamlarımız';

export const HOME_STATS_ITEMS: readonly HomeStatItem[] = [
  {
    id: 'calismalar',
    value: 1513,
    label: 'Çalışmalar',
  },
  {
    id: 'yapim',
    value: 203,
    label: 'Yapım aşamasındaki projeler',
  },
  {
    id: 'musteri',
    value: 3258,
    label: 'Memnun müşteriler',
  },
  {
    id: 'toplam',
    value: 5146,
    label: 'Toplam proje',
  },
] as const;
