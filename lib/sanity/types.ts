import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type SiteTheme = 'lead' | 'green';

export type SiteSettingsDoc = {
  _id: string;
  theme: SiteTheme;
  phone: string;
  brandAccentHex?: string | null;
  brandWordPrimary?: string | null;
  brandWordAccent?: string | null;
  companyLegalName?: string | null;
  homeKicker?: string | null;
  homeTitle?: string | null;
  homeSubtitle?: string | null;
  heroSplitLeftTitle?: string | null;
  heroSplitLeftSubtitle?: string | null;
  heroSplitRightTitle?: string | null;
  heroSplitRightSubtitle?: string | null;
  contactLocation?: string | null;
  logo?: (SanityImageSource & { alt?: string }) | null;
  favicon?: (SanityImageSource & { alt?: string }) | null;
};

export type ServiceDoc = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  coverImage: SanityImageSource & { alt?: string };
};

export type ShipmentVideoDoc = {
  _id: string;
  title: string;
  youtubeId: string;
  shipmentDate: string;
};

export type AdScriptsDoc = {
  _id: string;
  gtagMeasurementId?: string;
  googleAdsId?: string;
  adresGezginiSnippet?: string;
  scriptManagerHead?: string;
  scriptManagerBodyEnd?: string;
};
