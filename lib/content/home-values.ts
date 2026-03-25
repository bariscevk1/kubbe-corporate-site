/**
 * Anasayfa — Değerlerimiz (metinler messages/home.values.*)
 */
export type HomeValueItem = { id: string };

export const HOME_VALUES_ITEMS: readonly HomeValueItem[] = [
  { id: 'kalite' },
  { id: 'deneyim' },
  { id: 'guven' },
  { id: 'teslimat' },
] as const;
