export const runtime = 'nodejs';

const VIDEO_MAP: Record<string, string> = {
  '01': '/sevkiyat/videos/sevkiyat-video-01.mp4',
  '02': '/sevkiyat/videos/sevkiyat-video-02.mp4',
  '03': '/sevkiyat/videos/sevkiyat-video-03.mp4',
  '04': '/sevkiyat/videos/sevkiyat-video-04.mp4',
  '05': '/sevkiyat/videos/sevkiyat-video-05.mp4',
  '06': '/sevkiyat/videos/sevkiyat-video-06.mp4',
  '07': '/sevkiyat/videos/sevkiyat-video-07.mp4',
  '08': '/sevkiyat/videos/sevkiyat-video-08.mp4',
};

type Ctx = { params: { id: string } };

export async function GET(req: Request, { params }: Ctx) {
  const src = VIDEO_MAP[params.id];
  if (!src) return new Response('Video bulunamadi.', { status: 404 });
  return Response.redirect(new URL(src, req.url), 307);
}

