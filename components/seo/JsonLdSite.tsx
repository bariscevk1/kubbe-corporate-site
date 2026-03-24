import { digitsOnly } from '@/lib/phone';
import { topKeywordsForSchema } from '@/lib/seo/ads-keywords';
import { DEFAULT_SITE_DESCRIPTION_TR } from '@/lib/seo/seo-copy';

type Props = {
  siteName: string;
  url: string;
  phone: string;
  companyLegalName: string;
};

function telephoneE164(phone: string) {
  const d = digitsOnly(phone).replace(/^0/, '');
  return d ? `+90${d}` : undefined;
}

/**
 * Schema.org — Google’ın işletme / hizmet bilgisini anlaması için.
 * 7/24, Türkiye geneli, uluslararası bölge ve anahtar kelime alanları (knowsAbout).
 */
export function JsonLdSite({ siteName, url, phone, companyLegalName }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteName,
    legalName: companyLegalName,
    description: DEFAULT_SITE_DESCRIPTION_TR,
    url,
    telephone: telephoneE164(phone),
    areaServed: [
      { '@type': 'Country', name: 'TR', description: 'Türkiye — tüm iller' },
      {
        '@type': 'Place',
        name: 'International',
        description: 'Gulf and Arab countries — projects by appointment',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    knowsAbout: topKeywordsForSchema(45),
    availableLanguage: ['Turkish', 'English', 'Arabic'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
