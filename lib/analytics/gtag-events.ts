/**
 * Google Ads / GA4 — güvenli gtag çağrıları (script yoksa sessizce çık).
 * AdresGezgini dönüşümleri için event adlarını env ile özelleştirebilirsiniz.
 */

export type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function safeGtag(...args: unknown[]) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

/** Genel özel olay (GA4 önerilen event isimleri: snake_case) */
export function trackGtagEvent(eventName: string, params?: GtagEventParams) {
  safeGtag('event', eventName, params ?? {});
}

/** Hero — “Hemen Teklif Al” */
export function trackHeroTeklifClick() {
  trackGtagEvent('hero_teklif_click', {
    event_category: 'engagement',
    event_label: 'hero_cta_teklif',
  });
  // Google Ads dönüşüm etiketi (AW-xxx/yyy) — .env’de tanımlıysa
  const sendTo = process.env.NEXT_PUBLIC_GADS_CONVERSION_TEKLIF;
  if (sendTo) {
    safeGtag('event', 'conversion', { send_to: sendTo });
  }
}

/** Hero — WhatsApp */
export function trackHeroWhatsAppClick() {
  trackGtagEvent('hero_whatsapp_click', {
    event_category: 'engagement',
    event_label: 'hero_cta_whatsapp',
  });
  const sendTo = process.env.NEXT_PUBLIC_GADS_CONVERSION_WHATSAPP;
  if (sendTo) {
    safeGtag('event', 'conversion', { send_to: sendTo });
  }
}

function trackAdsConversion(sendTo?: string, extra?: GtagEventParams) {
  if (!sendTo) return;
  safeGtag('event', 'conversion', { send_to: sendTo, ...(extra ?? {}) });
}

/** WhatsApp CTA tıklaması (genel) */
export function trackWhatsAppClick(source = 'unknown') {
  trackGtagEvent('whatsapp_click', {
    event_category: 'lead',
    event_label: source,
  });

  trackAdsConversion(process.env.NEXT_PUBLIC_GADS_CONVERSION_WHATSAPP);
  // Opsiyonel: AdresGezgini için ayrı send_to
  trackAdsConversion(process.env.NEXT_PUBLIC_ADRESGEZGINI_CONVERSION_WHATSAPP);
}

/** Hızlı arama / telefon tıklaması (genel) */
export function trackPhoneClick(source = 'unknown') {
  trackGtagEvent('phone_click', {
    event_category: 'lead',
    event_label: source,
  });

  trackAdsConversion(process.env.NEXT_PUBLIC_GADS_CONVERSION_PHONE);
  trackAdsConversion(process.env.NEXT_PUBLIC_ADRESGEZGINI_CONVERSION_PHONE);
}

/** Teşekkürler sayfası görüntülenmesi (form/lead sonrası) */
export function trackThankYouPageView() {
  trackGtagEvent('thank_you_page_view', {
    event_category: 'lead',
    event_label: 'tesekkurler_page',
  });

  trackAdsConversion(process.env.NEXT_PUBLIC_GADS_CONVERSION_THANKYOU);
  trackAdsConversion(process.env.NEXT_PUBLIC_ADRESGEZGINI_CONVERSION_THANKYOU);
}
