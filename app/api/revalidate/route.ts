import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Sanity Webhook veya manuel tetikleme:
 * POST /api/revalidate?secret=SANITY_REVALIDATE_SECRET
 * Body (opsiyonel): { "_type": "service" } — ilgili etiketi de yeniler.
 */
export async function POST(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('secret');
  const header = req.headers.get('x-sanity-revalidate-secret');
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret || (q !== secret && header !== secret)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let body: { _type?: string; result?: { _type?: string } } = {};
  try {
    const text = await req.text();
    if (text) body = JSON.parse(text) as typeof body;
  } catch {
    /* boş body */
  }

  const docType = body._type || body.result?._type;
  if (docType) {
    revalidateTag(`sanity:${docType}`);
  }
  revalidateTag('sanity');
  revalidatePath('/', 'layout');

  return NextResponse.json({
    revalidated: true,
    tags: docType ? [`sanity:${docType}`, 'sanity'] : ['sanity'],
    at: new Date().toISOString(),
  });
}
