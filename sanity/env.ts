function assertEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Eksik ortam değişkeni: ${name}`);
  }
  return value;
}

/** Build sırasında yoksa boş string — runtime’da client kullanılmadan önce doldurulmalı */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || '';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

/** Sunucu tarafı yazma / webhook (opsiyonel) */
export function getSanityWriteToken(): string | undefined {
  return process.env.SANITY_API_WRITE_TOKEN;
}

export function requireProjectId(): string {
  return assertEnv('NEXT_PUBLIC_SANITY_PROJECT_ID', projectId);
}
