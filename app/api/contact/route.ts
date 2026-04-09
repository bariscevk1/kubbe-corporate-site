import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/server/mail';

export const runtime = 'nodejs';

type Body = {
  name?: string;
  phone?: string;
  message?: string;
  page?: string;
};

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null;
}

export async function POST(req: Request) {
  let body: Body = {};
  try {
    const json = await req.json();
    if (isRecord(json)) body = json as Body;
  } catch {
    // ignore
  }

  try {
    await sendContactEmail({
      name: body.name,
      phone: body.phone,
      message: body.message,
      page: body.page,
      userAgent: req.headers.get('user-agent') ?? undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Mail send failed';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

