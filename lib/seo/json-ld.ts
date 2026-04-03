import { DEFAULT_LOGO_SRC } from '@/lib/brand-assets';
import { DEFAULT_SITE_DESCRIPTION_TR } from '@/lib/seo/seo-copy';
import { SEM_KNOWS_ABOUT_FOR_SCHEMA } from '@/lib/seo/sem-keywords';
import { getPublicSiteOriginString } from '@/lib/seo/site-url';

const BUSINESS_NAME = 'Turgut Coşkun Kubbe Kaplama';
const PHONE_E164 = '+905323236627';

/** Tek JSON-LD @graph — Organization, WebSite, hizmet özet ItemList */
export function buildSiteJsonLdGraph() {
  const origin = getPublicSiteOriginString();
  const logoUrl = `${origin}${DEFAULT_LOGO_SRC}`;
  const orgId = `${origin}/#organization`;
  const webId = `${origin}/#website`;

  const sameAs = [
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    process.env.NEXT_PUBLIC_FACEBOOK_URL,
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    process.env.NEXT_PUBLIC_YOUTUBE_URL,
  ]
    .map((u) => u?.trim())
    .filter(Boolean) as string[];

  const servicePaths = [
    { name: 'Camii kubbe kaplama', path: '/hizmetler/kubbe-kaplama' },
    { name: 'Alüminyum satışı', path: '/hizmetler/aluminyum-satis' },
    { name: 'Alüminyum kubbe kaplama', path: '/hizmetler/aluminyum-kubbe-kaplama' },
    { name: 'Bakır levha ve kubbe', path: '/hizmetler/bakir-levha-satis' },
    { name: 'Kurşun levha satışı', path: '/hizmetler/kursun-levha-satis' },
    { name: 'Nakkaş süsleme', path: '/hizmetler/nakkas-susleme' },
    { name: 'Camii alemleri', path: '/hizmetler/alemler' },
    { name: 'Oluk satışı ve montajı', path: '/hizmetler/oluk' },
  ];

  const organization: Record<string, unknown> = {
    '@type': 'LocalBusiness',
    '@id': orgId,
    name: BUSINESS_NAME,
    description: DEFAULT_SITE_DESCRIPTION_TR,
    url: origin,
    telephone: PHONE_E164,
    image: logoUrl,
    logo: logoUrl,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ankara',
      addressCountry: 'TR',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Türkiye',
    },
    knowsAbout: SEM_KNOWS_ABOUT_FOR_SCHEMA,
  };
  if (sameAs.length > 0) {
    organization.sameAs = sameAs;
  }

  const website = {
    '@type': 'WebSite',
    '@id': webId,
    url: origin,
    name: 'Kubbe Kaplama',
    description: DEFAULT_SITE_DESCRIPTION_TR,
    inLanguage: ['tr-TR', 'en', 'ar'],
    publisher: { '@id': orgId },
    potentialAction: {
      '@type': 'ContactAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${origin}/iletisim`,
      },
    },
  };

  const itemList = {
    '@type': 'ItemList',
    '@id': `${origin}/#main-services`,
    name: 'Ana hizmet hatları',
    numberOfItems: servicePaths.length,
    itemListElement: servicePaths.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: item.name,
        url: `${origin}${item.path}`,
        provider: { '@id': orgId },
      },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website, itemList],
  };
}
