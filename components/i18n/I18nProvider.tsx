'use client';

import { I18nextProvider } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  DEFAULT_LANG,
  STORAGE_KEY,
  ensureI18nInit,
  i18n,
  isSupportedLang,
  langDir,
  type SupportedLang,
} from '@/lib/i18n/i18n';

function applyDocumentLang(lang: SupportedLang) {
  if (typeof document === 'undefined') return;
  const dir = langDir(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
  document.documentElement.dataset.lang = lang;
}

function getLangFromPathname(pathname: string): SupportedLang | null {
  const seg = pathname.split('/')[1];
  return isSupportedLang(seg) ? seg : null;
}

function setLocaleCookie(lang: SupportedLang) {
  if (typeof document === 'undefined') return;
  // Next.js i18n uses NEXT_LOCALE cookie for localeDetection
  document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; samesite=lax`;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  const initialLang = useMemo<SupportedLang>(() => {
    if (typeof window === 'undefined') return DEFAULT_LANG;
    const fromUrl = getLangFromPathname(window.location.pathname);
    if (fromUrl) return fromUrl;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return isSupportedLang(saved) ? saved : DEFAULT_LANG;
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      await ensureI18nInit(initialLang);
      if (!alive) return;
      applyDocumentLang((i18n.language as SupportedLang) || initialLang);
      setLocaleCookie((i18n.language as SupportedLang) || initialLang);
      setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, [initialLang]);

  useEffect(() => {
    if (!ready) return;
    const onLang = (lng: string) => {
      if (!isSupportedLang(lng)) return;
      try {
        window.localStorage.setItem(STORAGE_KEY, lng);
      } catch {
        // ignore
      }
      setLocaleCookie(lng);
      applyDocumentLang(lng);
    };
    i18n.on('languageChanged', onLang);
    return () => {
      i18n.off('languageChanged', onLang);
    };
  }, [ready]);

  useEffect(() => {
    if (!ready || !pathname) return;
    const seg = pathname.split('/').filter(Boolean)[0];
    if (isSupportedLang(seg) && i18n.language !== seg) {
      void ensureI18nInit(seg);
    }
  }, [pathname, ready]);

  // render immediately; header is client so it can hydrate with default
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

