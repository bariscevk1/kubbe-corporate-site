export type VideoItem = {
  id: string;
  title: string;
  city?: string;
  year?: string;
};

export type ShipmentImageItem = {
  id: string;
  title: string;
};

export const SEVKIYAT_VIDEOS: readonly VideoItem[] = [
  { id: '03', title: 'Sevkiyat kaydı', city: 'Ankara', year: '2024' },
  { id: '04', title: 'Sevkiyat kaydı', city: 'Bursa', year: '2024' },
  { id: '05', title: 'Sevkiyat kaydı', city: 'Konya', year: '2025' },
  { id: '06', title: 'Sevkiyat kaydı', city: 'Gaziantep', year: '2025' },
  { id: '07', title: 'Sevkiyat kaydı', city: 'Istanbul', year: '2025' },
  { id: '08', title: 'Sevkiyat kaydı', city: 'Edirne', year: '2025' },
  { id: '01', title: 'Sevkiyat kaydı', city: 'Adana', year: '2023' },
  { id: '02', title: 'Sevkiyat kaydı', city: 'Sakarya', year: '2023' },
];

export const SEVKIYAT_IMAGES: readonly ShipmentImageItem[] = [
  { id: '01', title: 'Sevkiyat fotografi 01' },
  { id: '02', title: 'Sevkiyat fotografi 02' },
  { id: '03', title: 'Sevkiyat fotografi 03' },
  { id: '04', title: 'Sevkiyat fotografi 04' },
  { id: '05', title: 'Sevkiyat fotografi 05' },
  { id: '06', title: 'Sevkiyat fotografi 06' },
  { id: '07', title: 'Sevkiyat fotografi 07' },
  { id: '08', title: 'Sevkiyat fotografi 08' },
  { id: '09', title: 'Sevkiyat fotografi 09' },
  { id: '10', title: 'Sevkiyat fotografi 10' },
  { id: '11', title: 'Sevkiyat fotografi 11' },
  { id: '12', title: 'Sevkiyat fotografi 12' },
  { id: '13', title: 'Sevkiyat fotografi 13' },
  { id: '14', title: 'Sevkiyat fotografi 14' },
  { id: '15', title: 'Sevkiyat fotografi 15' },
];

export function sevkiyatVideoSrc(id: string) {
  return `/api/sevkiyat-video/${id}`;
}

export function sevkiyatImageSrc(id: string) {
  return `/api/sevkiyat-image/${id}`;
}
