import type { Metadata } from 'next';
import { ContactPageContent } from '@/components/contact/ContactPageContent';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';
import { getRequestLocale } from '@/lib/i18n/server-locale';
import { pageMetadata } from '@/lib/seo/metadata-helpers';
import { semKeywordsForLocale } from '@/lib/seo/sem-locale-keywords';
import { getSiteSettings } from '@/lib/sanity/site-settings';
import tr from '@/messages/tr.json';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

const seoByLang = { tr, en, ar } as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = getRequestLocale();
  const s = seoByLang[locale].seo.contact;
  return pageMetadata(
    { title: s.title, description: s.description },
    'Kubbe Kaplama',
    semKeywordsForLocale(locale),
  );
}

const DEFAULT_PHONE = '05323236627';
const DEFAULT_LOCATION = 'Ankara, Türkiye';
const DEFAULT_MAP_QUERY = 'Camii Kubbe Kaplama Yenimahalle Ankara';

function mapsPlaceUrl(query: string) {
  const custom = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACE_URL?.trim();
  if (custom) return custom;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function mapsEmbedUrl(query: string) {
  const custom = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL?.trim();
  if (custom) return custom;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

function mapsReviewsUrl(query: string) {
  const custom = process.env.NEXT_PUBLIC_GOOGLE_MAPS_REVIEWS_URL?.trim();
  if (custom) return custom;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default async function IletisimPage() {
  const site = await getSiteSettings();
  const phone = site?.phone?.trim() || DEFAULT_PHONE;
  const location = site?.contactLocation?.trim() || DEFAULT_LOCATION;
  const mapQuery = site?.contactLocation?.trim() || DEFAULT_MAP_QUERY;
  const mapUrl = mapsPlaceUrl(mapQuery);
  const mapEmbed = mapsEmbedUrl(mapQuery);
  const reviewsUrl = mapsReviewsUrl(mapQuery);

  return (
    <main className="site-subpage-light contact-page bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/iletisim/iletisim-hero.png"
        imageAlt="İletişim sayfası hero görseli"
        title="Turgut Usta ile hızlı iletişim, net teklif."
        kicker="İletişim ve teklif"
        subtitle="Projenizi kısaca yazın; Turgut Usta ekibi olarak aynı gün içinde dönüş sağlayalım. Telefon ve WhatsApp üzerinden 7/24 ulaşabilirsiniz."
      />
      <ContactPageContent
        phone={phone}
        locationLabel={location}
        mapUrl={mapUrl}
        reviewsUrl={reviewsUrl}
        mapEmbed={mapEmbed}
      />
    </main>
  );
}
