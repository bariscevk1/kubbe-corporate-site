/**
 * public/ altındaki tüm PNG ve JPEG dosyalarını WebP'ye çevirir (mobil / LCP için küçük boyut).
 * — Klasöre göre max genişlik ve hedef boyut
 * — Başarılı çıktıdan sonra orijinal raster silinir
 *
 * Kullanım: npm run optimize:images
 */
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

/** @param {string} rel posix path */
function ruleFor(rel) {
  if (rel.startsWith('hizmetler/'))
    return { maxWidth: 960, maxBytes: 170 * 1024, qualityStart: 82 };
  if (rel.startsWith('about/'))
    return { maxWidth: 1400, maxBytes: 220 * 1024, qualityStart: 82 };
  if (rel.startsWith('hero/'))
    return { maxWidth: 1920, maxBytes: 280 * 1024, qualityStart: 80 };
  if (rel.startsWith('brand/'))
    return { maxWidth: 800, maxBytes: 200 * 1024, qualityStart: 85 };
  return { maxWidth: 1200, maxBytes: 200 * 1024, qualityStart: 80 };
}

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full, files);
    else files.push(full);
  }
  return files;
}

async function processRaster(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return null;

  const rel = path.relative(publicDir, absPath).split(path.sep).join('/');
  const outPath = absPath.replace(/\.(png|jpe?g)$/i, '.webp');

  // Hedef zaten var ve daha yeni değilse atla (isteğe bağlı — her zaman yeniden üret)
  const { maxWidth, maxBytes, qualityStart } = ruleFor(rel);

  const buf = await fs.readFile(absPath);
  const meta = await sharp(buf).metadata();
  let work = buf;
  if (meta.width && meta.width > maxWidth) {
    work = await sharp(buf)
      .resize(maxWidth, null, { withoutEnlargement: true, fit: 'inside' })
      .toBuffer();
  } else {
    work = await sharp(buf).toBuffer();
  }

  let quality = qualityStart;
  let out;
  for (let q = qualityStart; q >= 52; q -= 3) {
    out = await sharp(work).webp({ quality: q, effort: 6 }).toBuffer();
    quality = q;
    if (out.length <= maxBytes || q <= 52) break;
  }

  await fs.writeFile(outPath, out);
  await fs.unlink(absPath);

  const beforeKb = (buf.length / 1024).toFixed(1);
  const afterKb = (out.length / 1024).toFixed(1);
  console.log(
    `✓ ${rel}  (${beforeKb} KB → ${path.basename(outPath)} ${afterKb} KB, q≈${quality})`
  );
  return rel;
}

async function main() {
  console.log('public/ görsel optimizasyonu (PNG/JPEG → WebP)…\n');
  const all = await walk(publicDir);
  const rasters = all.filter((p) => /\.(png|jpe?g)$/i.test(p));
  if (!rasters.length) {
    console.log('İşlenecek PNG/JPEG bulunamadı (zaten WebP olabilir).');
    return;
  }
  for (const p of rasters.sort()) {
    try {
      await processRaster(p);
    } catch (e) {
      console.error(`Hata: ${p}`, e);
      process.exit(1);
    }
  }
  console.log('\nTamam. Kodda .png/.jpg yollarını .webp ile güncelleyin.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
