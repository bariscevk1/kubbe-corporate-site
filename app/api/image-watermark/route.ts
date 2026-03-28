import { readFile } from 'node:fs/promises';
import {
  fetchAllowedRemoteImage,
  renderPermanentWatermark,
  resolvePublicImagePath,
} from '@/lib/server/image-watermark';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get('src');

  if (!src) {
    return new Response('Gorsel kaynagi eksik.', { status: 400 });
  }

  try {
    const sourceBuffer = src.startsWith('http')
      ? await fetchAllowedRemoteImage(src)
      : await readFile(resolvePublicImagePath(src));

    const output = await renderPermanentWatermark(sourceBuffer);

    return new Response(new Uint8Array(output), {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch {
    return new Response('Gorsel islenemedi.', { status: 500 });
  }
}
