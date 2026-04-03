/**
 * Flatten nested JSON to dot/bracket paths for string leaves only.
 * Example: home.hero.title -> "Hello"
 */
export function flattenStringLeaves(obj, prefix = '') {
  const out = {};
  if (obj === null || typeof obj !== 'object') return out;

  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      const p = `${prefix}[${i}]`;
      if (typeof item === 'string') out[p] = item;
      else if (item && typeof item === 'object') Object.assign(out, flattenStringLeaves(item, p));
    });
    return out;
  }

  for (const k of Object.keys(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    const v = obj[k];
    if (typeof v === 'string') out[p] = v;
    else if (v && typeof v === 'object') Object.assign(out, flattenStringLeaves(v, p));
  }
  return out;
}

/** EN string may legitimately match Turkish source (brand, product name, codes). */
export function enSameAsTrIsOk(path, value) {
  if (path.startsWith('lang.')) return true;

  const exact = new Set([
    'mobileBar.whatsapp',
    'home.hero.logoAlt',
    'home.hero.signatureLine1',
  ]);
  if (exact.has(path)) return true;

  // Step codes 01–04
  if (/^about\.motion\.processSteps\[\d+\]\.n$/.test(path) && /^\d{2}$/.test(value)) return true;

  // Stat suffix "+"
  if (/^about\.motion\.stats\[\d+\]\.suffix$/.test(path) && value === '+') return true;

  // Timeline year labels shared across locales (numeric era)
  if (/^about\.motion\.timeline\[\d+\]\.year$/.test(path) && /^(\d{4}|\d{4}\+)$/.test(value)) return true;

  // City names often identical in EN/TR Latin script (e.g. Bursa, Konya)
  if (/^about\.motion\.testimonials\[\d+\]\.city$/.test(path)) return true;

  // Footer minimal labels (T / W / E) — same letter in all locales
  if (/^footer\.label(Tel|Wa|Mail)$/.test(path)) return true;

  return false;
}

/**
 * @returns {{ ok: boolean, problems: { path: string, tr: string }[] }}
 */
export function checkEnNotStillTurkish(trTree, enTree) {
  const trF = flattenStringLeaves(trTree);
  const enF = flattenStringLeaves(enTree);
  const problems = [];

  for (const p of Object.keys(trF)) {
    if (!Object.prototype.hasOwnProperty.call(enF, p)) {
      problems.push({ path: p, tr: trF[p], reason: 'missing in en' });
      continue;
    }
    if (typeof trF[p] !== 'string') continue;
    if (trF[p] !== enF[p]) continue;
    if (enSameAsTrIsOk(p, trF[p])) continue;
    problems.push({ path: p, tr: trF[p], reason: 'en equals tr (untranslated?)' });
  }

  return { ok: problems.length === 0, problems };
}
