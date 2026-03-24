import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/sanity/site-settings';
import { ContactPageContent } from '@/components/contact/ContactPageContent';

export const metadata: Metadata = {
  title: 'İletişim',
  description:
    'Telefon, WhatsApp ve adres. Kubbe kaplama ve metal işleri için teklif ve bilgi talebi.',
  openGraph: {
    title: 'İletişim | Kubbe Kaplama',
    description: 'Bize ulaşın.',
  },
};

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
    <ContactPageContent
      phone={phone}
      locationLabel={location}
      mapUrl={mapUrl}
      reviewsUrl={reviewsUrl}
      mapEmbed={mapEmbed}
    />
  );
}
