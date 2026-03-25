/**
 * Anasayfa — Başarı rakamları (etiketler messages/home.stats.items.*)
 */
export type HomeStatItem = {
  id: string;
  /** Sayaç hedefi (tam sayı) */
  value: number;
};

export const HOME_STATS_ITEMS: readonly HomeStatItem[] = [
  { id: 'calismalar', value: 1513 },
  { id: 'yapim', value: 203 },
  { id: 'musteri', value: 3258 },
  { id: 'toplam', value: 5146 },
] as const;
