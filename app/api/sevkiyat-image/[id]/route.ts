import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

export const runtime = 'nodejs';

const ASSET_BASE =
  'C:\\Users\\Baris\\.cursor\\projects\\c-Users-Baris-Desktop-feramuz\\assets';

const IMAGE_MAP: Record<string, string> = {
  '01': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-01-fefc2fa8-7c48-4670-a9d6-a703e8738869.png`,
  '02': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-02-ca419b09-e14e-4a7e-9c9b-c4b4fc5f616e.png`,
  '03': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-03-5cce3d93-0797-4986-9635-b32915b78c8b.png`,
  '04': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-04-993167f9-0a93-4926-b469-c3cbf47b049e.png`,
  '05': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-05-2c2f283b-3e80-4f1e-a32e-e4fd0e42030b.png`,
  '06': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-06-cb33e600-2760-477b-a93d-72010edcdf49.png`,
  '07': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-07-7d846a4f-250e-4330-adbd-466f5750d403.png`,
  '08': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-08-e0c909af-8dc8-46ba-9d6e-cc720ef513e1.png`,
  '09': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-09-4f4a784a-8b5f-4dfd-b911-08774e5ea9e7.png`,
  '10': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-10-6efa1c8e-7b6b-48c6-b447-7f31de443512.png`,
  '11': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-11-aef47267-5d64-41b4-9cce-dfc8bb3b108d.png`,
  '12': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-12-d45b6f8d-a9ff-422f-9bea-262758a10e50.png`,
  '13': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-13-3c30d1d1-c5ba-4530-a553-0fce4b27a6fc.png`,
  '14': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-14-9a295b00-2f41-458d-9516-861d2a4a248b.png`,
  '15': `${ASSET_BASE}\\c__Users_Baris_AppData_Roaming_Cursor_User_workspaceStorage_cf65e08408d636187e57b7dd908866a5_images_sevkiyat-15-bf1a3f23-1c42-41c4-899f-858692eeb561.png`,
};

function watermarkSvg(width: number, height: number) {
  const phone = '0532 323 66 27';
  const rows = 8;
  const cols = 6;
  const items: string[] = [];

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const px = Math.round((x + 0.5) * (width / cols));
      const py = Math.round((y + 0.5) * (height / rows));
      items.push(
        `<text x="${px}" y="${py}" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,0.26)" font-size="${Math.max(
          16,
          Math.round(width / 42),
        )}" font-family="Arial, sans-serif" font-weight="700" letter-spacing="1">${phone}</text>`,
      );
    }
  }

  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><g transform="rotate(-32 ${width / 2} ${height / 2})">${items.join(
      '',
    )}</g></svg>`,
  );
}

type Ctx = { params: { id: string } };

export async function GET(_req: Request, { params }: Ctx) {
  const source = IMAGE_MAP[params.id];
  if (!source) return new Response('Gorsel bulunamadi.', { status: 404 });

  try {
    const original = await readFile(source);
    try {
      const base = sharp(original).rotate();
      const meta = await base.metadata();
      const width = meta.width ?? 1200;
      const height = meta.height ?? 800;

      const out = await base
        .composite([{ input: watermarkSvg(width, height), gravity: 'center' }])
        .webp({ quality: 74, effort: 4 })
        .toBuffer();

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

