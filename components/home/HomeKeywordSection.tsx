import { AD_GROUP_FOCUS } from '@/lib/seo/ads-keywords';
import {
  DEFAULT_SITE_DESCRIPTION_TR,
  INTERNATIONAL_COPY,
  SITE_TAGLINE_TR,
} from '@/lib/seo/seo-copy';

const PILL_SAMPLES = [
  'cami kubbe kaplama',
  'kurşun levha',
  'kenet çatı',
  'alüminyum sac fiyatları',
  'cami ustası',
  'bakır kubbe kaplama',
  'cami alemi',
  'metal kenet çatı',
] as const;

/**
 * Ücretli arama kampanyasıyla uyumlu, doğal dilde bilgi bölümü.
 * (Görünür içerik + anahtar kelime köprüsü; doldurma amaçlı değil.)
 */
export function HomeKeywordSection() {
  return (
    <section
      className="border-t border-lead-800/80 bg-lead-900/50"
      aria-labelledby="seo-hizmet-baslik"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <p className="text-center font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">
          {SITE_TAGLINE_TR}
        </p>
        <h2
          id="seo-hizmet-baslik"
          className="mt-4 text-center font-display text-2xl font-bold text-white md:text-3xl"
        >
          Google Ads ile uyumlu hizmet alanlarımız
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-slate-300">
          {DEFAULT_SITE_DESCRIPTION_TR}
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AD_GROUP_FOCUS.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-lead-950/80 px-4 py-4 text-sm text-slate-200 shadow-inner shadow-black/20"
            >
              <span className="font-semibold text-white">✓</span> {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {PILL_SAMPLES.map((k) => (
            <span
              key={k}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-400"
            >
              {k}
            </span>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Reklam panellerinizdeki anahtar kelimeler (kubbe, kurşun, kenet, alüminyum, cami ustası vb.)
          ile aynı hizmet çizgisini web sitemizde de sürdürüyoruz; talep üzerine detaylı teklif ve teknik
          bilgi paylaşılır.
        </p>

        <div className="mt-12 grid gap-6 rounded-2xl border border-white/10 bg-black/25 p-6 md:grid-cols-2">
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
              International · English
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300" lang="en" dir="ltr">
              {INTERNATIONAL_COPY.en}
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
              الدول العربية ودول الخليج
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed text-slate-300"
              lang="ar"
              dir="rtl"
            >
              {INTERNATIONAL_COPY.ar}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
