import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { Readable } from 'node:stream';

export const runtime = 'nodejs';

const BASE_DIR = 'C:\\Users\\Baris\\Desktop\\feramuz2\\assets\\videos\\sevkiyat';

const VIDEO_MAP: Record<string, string> = {
  '01': `${BASE_DIR}\\sevkiyat-video-01.mp4`,
  '02': `${BASE_DIR}\\sevkiyat-video-02.mp4`,
  '03': `${BASE_DIR}\\sevkiyat-video-03.mp4`,
  '04': `${BASE_DIR}\\sevkiyat-video-04.mp4`,
  '05': `${BASE_DIR}\\sevkiyat-video-05.mp4`,
  '06': `${BASE_DIR}\\sevkiyat-video-06.mp4`,
  '07': `${BASE_DIR}\\sevkiyat-video-07.mp4`,
  '08': `${BASE_DIR}\\sevkiyat-video-08.mp4`,
};

type Ctx = { params: { id: string } };

function parseRangeHeader(range: string, size: number) {
  const match = /bytes=(\d*)-(\d*)/.exec(range);
  if (!match) return null;
  const rawStart = match[1];
  const rawEnd = match[2];

  const start = rawStart ? Number.parseInt(rawStart, 10) : 0;
  const end = rawEnd ? Number.parseInt(rawEnd, 10) : size - 1;
  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  if (start < 0 || end >= size || start > end) return null;
  return { start, end };
}

export async function GET(req: Request, { params }: Ctx) {
  const path = VIDEO_MAP[params.id];
  if (!path) return new Response('Video bulunamadi.', { status: 404 });

  try {
    const info = await stat(path);
    const size = info.size;
    const rangeHeader = req.headers.get('range');

    const baseHeaders = {
      'Content-Type': 'video/mp4',
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    } as const;

    if (!rangeHeader) {
      const stream = createReadStream(path);
      return new Response(Readable.toWeb(stream) as ReadableStream, {
        status: 200,
        headers: {
          ...baseHeaders,
          'Content-Length': String(size),
        },
      });
    }

    const parsed = parseRangeHeader(rangeHeader, size);
    if (!parsed) {
      return new Response('Range gecersiz.', {
        status: 416,
        headers: {
          ...baseHeaders,
          'Content-Range': `bytes */${size}`,
        },
      });
    }

    const { start, end } = parsed;
    const chunkSize = end - start + 1;
    const stream = createReadStream(path, { start, end });

    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 206,
      headers: {
        ...baseHeaders,
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': String(chunkSize),
      },
    });
  } catch {
    return new Response('Video okunamadi.', { status: 500 });
  }
}

