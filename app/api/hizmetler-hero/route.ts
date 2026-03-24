import { readFile } from 'node:fs/promises';

const FALLBACK_IMAGE_PATH =
  'C:\\Users\\Baris\\.cursor\\projects\\c-Users-Baris-Desktop-feramuz\\assets\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_32-2e39deb4-6644-4443-8aec-784e4d3dfdf8.png';

/**
 * Local asset proxy for Hizmetler hero.
 * Optional override:
 * HIZMETLER_HERO_IMAGE_PATH="C:\\path\\to\\image.png"
 */
export async function GET() {
  const imagePath = process.env.HIZMETLER_HERO_IMAGE_PATH || FALLBACK_IMAGE_PATH;

  try {
    const bytes = await readFile(imagePath);
    return new Response(bytes, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new Response('Hizmetler hero image not found.', { status: 404 });
  }
}

