import type { Metadata } from 'next';
import { HizmetlerMotionPageContent } from '@/components/hizmetler/HizmetlerMotionPageContent';
import { HOME_SERVICES_TEASER_ITEMS } from '@/lib/content/home-services-teaser';

export const metadata: Metadata = {
  title: 'Hizmetler',
  description:
    'Firmamızın sunduğu hizmetler: camii kubbe kaplama, alüminyum satışı ve kubbe kaplama, bakır ve kurşun levha, nakkaş, camii alemleri ve oluk sistemleri.',
};

export default function HizmetlerPage() {
  return <HizmetlerMotionPageContent items={HOME_SERVICES_TEASER_ITEMS} />;
}
