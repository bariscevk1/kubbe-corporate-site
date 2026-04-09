import nodemailer from 'nodemailer';

export type ContactEmailPayload = {
  name?: string;
  phone?: string;
  message?: string;
  page?: string;
  userAgent?: string;
};

function requiredEnv(name: string): string {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function getSmtpConfig() {
  const host = requiredEnv('SMTP_HOST');
  const portRaw = requiredEnv('SMTP_PORT');
  const user = requiredEnv('SMTP_USER');
  const pass = requiredEnv('SMTP_PASS');
  const secure = (process.env.SMTP_SECURE ?? '').trim();
  const port = Number(portRaw);
  if (!Number.isFinite(port)) throw new Error('Invalid SMTP_PORT');

  return {
    host,
    port,
    secure: secure ? secure === 'true' : port === 465,
    auth: { user, pass },
  } as const;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const to = requiredEnv('CONTACT_FORM_TO_EMAIL');
  const from = (process.env.CONTACT_FORM_FROM_EMAIL || process.env.SMTP_USER || '').trim() || to;

  const subjectPrefix = (process.env.CONTACT_FORM_SUBJECT_PREFIX || 'Site Formu').trim();
  const subject = `${subjectPrefix}: Yeni talep`;

  const safe = (s?: string) => (s ?? '').toString().trim();
  const textLines = [
    'Yeni iletişim formu talebi',
    '',
    `Ad Soyad: ${safe(payload.name) || '-'}`,
    `Telefon: ${safe(payload.phone) || '-'}`,
    `Mesaj: ${safe(payload.message) || '-'}`,
    `Sayfa: ${safe(payload.page) || '-'}`,
    `User-Agent: ${safe(payload.userAgent) || '-'}`,
  ];

  const transporter = nodemailer.createTransport(getSmtpConfig());
  await transporter.sendMail({
    to,
    from,
    subject,
    text: textLines.join('\n'),
    replyTo: undefined,
  });
}

