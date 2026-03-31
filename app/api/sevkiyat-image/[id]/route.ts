import { readFile } from 'node:fs/promises';
import { renderPermanentWatermark } from '@/lib/server/image-watermark';

export const runtime = 'nodejs';

const IMAGE_MAP: Record<string, string> = {
  '01': 'public/sevkiyat/images/sevkiyat-01.png',
  '02': 'public/sevkiyat/images/sevkiyat-02.png',
  '03': 'public/sevkiyat/images/sevkiyat-03.png',
  '04': 'public/sevkiyat/images/sevkiyat-04.png',
  '05': 'public/sevkiyat/images/sevkiyat-05.png',
  '06': 'public/sevkiyat/images/sevkiyat-06.png',
  '07': 'public/sevkiyat/images/sevkiyat-07.png',
  '08': 'public/sevkiyat/images/sevkiyat-08.png',
  '09': 'public/sevkiyat/images/sevkiyat-09.png',
  '10': 'public/sevkiyat/images/sevkiyat-10.png',
  '11': 'public/sevkiyat/images/sevkiyat-11.png',
  '12': 'public/sevkiyat/images/sevkiyat-12.png',
  '13': 'public/sevkiyat/images/sevkiyat-13.png',
  '14': 'public/sevkiyat/images/sevkiyat-14.png',
  '15': 'public/sevkiyat/images/sevkiyat-15.png',
};

type Ctx = { params: { id: string } };

export async function GET(_req: Request, { params }: Ctx) {
  const source = IMAGE_MAP[params.id];
  if (!source) return new Response('Gorsel bulunamadi.', { status: 404 });

  try {
    const original = await readFile(source);
    try {
      const out = await renderPermanentWatermark(original);

      return new Response(new Uint8Array(out), {
        headers: {
          'Content-Type': 'image/webp',
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        },
      });
    } catch {
      // Sharp isleme basarisiz olursa da gorsel gorunsun.
      return new Response(new Uint8Array(original), {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }
  } catch {
    return new Response('Gorsel islenemedi.', { status: 500 });
  }
}

