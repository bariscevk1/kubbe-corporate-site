/** GROQ — tipler lib/sanity/types.ts ile hizalanır */

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id,
  theme,
  phone,
  brandAccentHex,
  brandWordPrimary,
  brandWordAccent,
  companyLegalName,
  homeKicker,
  homeTitle,
  homeSubtitle,
  heroSplitLeftTitle,
  heroSplitLeftSubtitle,
  heroSplitRightTitle,
  heroSplitRightSubtitle,
  contactLocation,
  logo{
    alt,
    crop,
    hotspot,
    asset
  },
  favicon{
    alt,
    asset
  }
}`;

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  coverImage{
    alt,
    crop,
    hotspot,
    asset
  }
}`;

export const servicesQuery = `*[_type == "service"]|order(title asc){
  _id,
  title,
  slug,
  description,
  coverImage{
    alt,
    crop,
    hotspot,
    asset
  }
}`;

export const shipmentVideosQuery = `*[_type == "shipmentVideo"]|order(shipmentDate desc){
  _id,
  title,
  youtubeId,
  shipmentDate
}`;

export const adScriptsQuery = `*[_type == "adScripts"][0]{
  _id,
  gtagMeasurementId,
  googleAdsId,
  adresGezginiSnippet,
  scriptManagerHead,
  scriptManagerBodyEnd
}`;
