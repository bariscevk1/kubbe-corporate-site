/**
 * Generates messages/en.json and messages/ar.json from messages/tr.json + patches below.
 * Fails if EN still equals TR anywhere (except brand/code allowlist) â€” update enPatch when tr.json changes.
 *
 * Run: node scripts/build-en-ar-messages.mjs
 * Check only (no write): node scripts/build-en-ar-messages.mjs --check-only
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkEnNotStillTurkish } from './lib/locale-parity.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkOnly = process.argv.includes('--check-only');
const tr = JSON.parse(fs.readFileSync(path.join(root, 'messages/tr.json'), 'utf8'));

const enPatch = {
  nav: {
    home: 'Home',
    about: 'About us',
    services: 'Services',
    projects: 'Our projects',
    shipments: 'Shipments',
    contact: 'Contact',
    service_categories: 'Service lines',
  },
  services: {
    all: 'All services',
    kubbe: 'Mosque dome cladding',
    aluminyumSatis: 'Aluminium sales',
    aluminyumKubbe: 'Aluminium dome cladding',
    bakir: 'Copper sheet & dome',
    kursun: 'Lead sheet sales',
    nakkas: 'Mosque decorative painting (nakkaÅŸ)',
    alemler: 'Mosque finials (alem)',
    oluk: 'Gutter supply & installation',
  },
  ui: { language: 'Language', close: 'Close', menu: 'Menu' },
  mobileBar: { call: 'Call now', whatsapp: 'WhatsApp', whatsappLine: 'WhatsApp line' },
  footer: {
    link_about: 'About us',
    link_services: 'Services',
    link_kubbe: 'Dome cladding',
    link_oluk: 'Gutters',
    link_alemler: 'Finials',
    link_contact: 'Contact',
    mapLink: 'View on map',
    blurb:
      'Ankara HQ Â· <strong class="font-medium text-slate-400">Nationwide</strong> installation & shipping Â· <strong class="font-medium text-slate-400">24/7</strong> phone & WhatsApp Â· Gulf & Arab region projects (EN/AR support) Â· Corporate service for all ages',
    rights: 'All rights reserved by Turgut Coşkun.',
  },
  seo: {
    home: {
      title: 'Home',
      description:
        'Nationwide mosque dome cladding, aluminium and copper domes, gutters and decorative painting across Turkey. Professional crews, shipping and installation.',
    },
    about: {
      title: 'About us',
      description:
        'Since 1987, Turgut Ã‡oÅŸkun Kubbe Kaplama: nationwide mosque & dome works, master craftspeople, project-focused service.',
    },
    services: {
      title: 'Services',
      description:
        'Mosque dome cladding, aluminium sales & dome cladding, copper and lead sheet, decorative painting, mosque finials and gutter systems.',
    },
    contact: {
      title: 'Contact',
      description: 'Phone, WhatsApp and address. Quotes and enquiries for dome cladding and metal works.',
    },
    projects: { title: 'Projects', description: 'Completed and ongoing reference projects.' },
    shipments: { title: 'Shipments', description: 'Packing, loading and nationwide logistics.' },
    thanks: { title: 'Thank you', description: 'Your message has been received.' },
  },
  home: {
    hero: {
      brandLine: 'Turgut Coskun Mosque Dome Cladding',
      leftTitle: 'Nationwide mosque dome cladding and metal roofing expertise',
      leftSubtitle:
        'For copper and aluminium domes, finials, gutters and traditional decoration we deliver disciplined site teams, transparent processes and durable workmanship.',
      rightTitle: 'Growing with our references',
      rightSubtitle:
        'From Ankara we keep the same corporate standards for installation, shipping and technical support on projects delivered across the country.',
      logoAlt: 'Turgut CoÅŸkun Kubbe Kaplama',
      kickerBadge1: 'Corporate project standard',
      kickerBadge2: 'Nationwide delivery',
      ctaQuote: 'Get a quote',
      ctaWhatsapp: 'Message on WhatsApp',
      signatureLine1: 'Turgut Usta',
      signatureLine2: 'Corporate discipline and long-lasting workmanship in dome, finial and gutter work.',
      callCta: 'Call now',
      colCtaServices: 'Our services',
      colCtaProjects: 'See our projects',
      imageLeftAlt: 'Copper dome and mosque finials â€” reference project',
      imageRightAlt: 'Aluminium dome campus â€” reference project',
      ariaSection: 'Home hero',
    },
    services: {
      kicker: 'What we offer',
      title: 'Our services',
      leadBefore: 'We specialise in the lines below; full copy and images are on our ',
      leadLink: 'services',
      leadAfter: ' page.',
      viewAll: 'View all',
      detailCta: 'Details',
      grid: {
        'camii-kubbe': {
          title: 'Mosque dome cladding',
          description: 'Dome cladding and restoration in copper, lead and aluminium.',
          imageAlt: 'Mosque dome with finial â€” architectural photo',
        },
        'aluminyum-satis': {
          title: 'Aluminium sales',
          description: 'High-quality sheet and profiles; supply tailored to your drawings.',
          imageAlt: 'Aluminium colour and sheet samples',
        },
        'aluminyum-kubbe': {
          title: 'Aluminium dome cladding',
          description: 'Light, durable aluminium for domes and roofing.',
          imageAlt: 'Gold finial on aluminium-clad dome â€” aerial',
        },
        'bakir-kubbe': {
          title: 'Copper dome cladding',
          description: 'Traditional copper workmanship for long-lasting dome surfaces.',
          imageAlt: 'Bright copper dome and white base',
        },
        'kursun-levha': {
          title: 'Lead sheet sales',
          description: 'Lead sheet supply for waterproofing and roofing.',
          imageAlt: 'Metal sheet supply â€” industrial stock',
        },
        nakkas: {
          title: 'Mosque decoration (nakkaÅŸ)',
          description: 'Traditional interior and exterior decorative painting.',
          imageAlt: 'Interior mosque geometric decoration',
        },
        alemler: {
          title: 'Mosque finials (alem)',
          description: 'Design, fabrication and installation of finials.',
          imageAlt: 'Gold mosque finials with crescent',
        },
        oluk: {
          title: 'Gutters â€” supply & fit',
          description: 'Rainwater systems for mosques and buildings.',
          imageAlt: 'Metal gutter installation detail',
        },
      },
    },
    aboutTeaser: {
      kicker: 'Who we are?',
      heading: 'About us',
      p1: '{{company}} â€” For over thirty years since 1987, under Turgut Ã‡oÅŸkun and the craftsmen who grew up in our workshop, we have served mosque and dome projects. Wherever we work in Turkey we see each job as a long-term relationship, not just a handover.',
      p2: 'We treat every client as a partner, not only an order. Summer or winter, near or far, our specialist crews and equipment complete your work on time and to the highest quality.',
      badge: 'Dome & traditional architecture',
      storyCta: 'Our corporate story',
      storyCtaSr: '(Full text on the About page)',
      contactCta: 'Contact us',
      imageAlt:
        'COÅKUN Architecture & Engineering logo; corporate portrait of Civil Engineer Feramuz CoÅŸkun and Architect GÃ¼listan CoÅŸkun TÃ¼re',
    },
    stats: {
      heading: 'Our milestones',
      items: {
        calismalar: { label: 'Projects delivered' },
        yapim: { label: 'Projects in progress' },
        musteri: { label: 'Satisfied clients' },
        toplam: { label: 'Total projects' },
      },
    },
    values: {
      heading: 'Our values',
      subtitle: 'Pillars of quality',
      items: {
        kalite: {
          title: 'Quality & expertise',
          body: 'High standards from drawings to installation; one clear quality policy for materials and workmanship.',
        },
        deneyim: {
          title: 'Decades of experience',
          body: 'Craft heritage since 1987 and projects built to last.',
        },
        guven: {
          title: 'Trust & warranty',
          body: 'Written warranty and transparent process; your satisfaction is our signature.',
        },
        teslimat: {
          title: 'On-time delivery',
          body: 'Full handover within agreed schedules; planned production and logistics.',
        },
      },
    },
    map: {
      kicker: 'References across Turkey',
      titleAccent: 'our footprint',
      headingTitle: 'Work delivered in {{count}} provinces',
      subtitle:
        'Choose a service type first; tap the coloured markers or numbered clusters. A summary appears on the right. Markers are near the city centre, not street addresses.',
      fullListHint: 'full list & photos',
      filterLabel: 'Service type',
      filterAll: 'All',
      panelTitle: 'Map of Turkey',
      panelSubtitle: 'Turkey only â€” use zoom top right',
      locationCount: '{{count}} locations',
      loadingShort: 'Loading mapâ€¦',
      badgeInteractive: 'Interactive',
      benefit1Title: 'Broad reference network',
      benefit1Desc: 'Nationwide installation & shipping experience',
      benefit2Title: 'One-tap summary',
      benefit2Desc: 'Map and side card update together',
      benefit3Title: 'Full project list',
      benefit3Desc: 'See the Projects page for the complete list',
      howToTitle: 'Quick tips',
      howTo1: 'Pick a service with the buttons above.',
      howTo2: 'Tap a point or cluster â€” the map moves to that area.',
      howTo3: 'The card shows the mosque or project name and city.',
      selectedLabel: 'Selected reference',
      emptyFilter: 'No entries for this filter.',
      listTab: 'Projects',
      mapTab: 'Map',
      mapHint:
        'The view is limited to Turkey; you cannot pan the world. Changing the filter recentres the map on the country.',
      loading: 'Loading Turkey reference layerâ€¦',
      listHeading: 'Projects nationwide',
      cardAria: 'Turkey references view',
      allProjects: 'All projects',
      category: {
        kubbe: 'Dome cladding',
        nakkas: 'Decorative painting',
        oluk: 'Gutters',
        diger: 'Other / shipping',
      },
      imageSoon: 'Image coming soon',
    },
    keywords: {
      tagline: 'Nationwide Â· 24/7 contact Â· International projects for the Gulf & Arab world',
      description:
        'We provide project-focused nationwide support for dome cladding, mosque finials, aluminium and copper cladding, lead sheet and standing seam roofing works.',
      heading: 'Dome cladding and metal application services',
      detailCta: 'View details',
      cardBadge: 'Service card',
      cardsTitle: 'Featured service cards',
      cardsNote:
        'Each card leads to a service heading aligned with user search intent. Quotations and technical details are shared according to the project scope.',
      cards: {
        kubbe: {
          title: 'Dome Cladding',
          body: 'Aluminium, copper and lead-based cladding solutions for mosque domes.',
        },
        kursun: {
          title: 'Lead Supply & Lead Sheet',
          body: 'Project-based support for lead sheet supply and lead cladding requirements.',
        },
        kenet: {
          title: 'Standing Seam Roofing',
          body: 'Application planning, material guidance and survey support for standing seam roof systems.',
        },
        aluminyum: {
          title: 'Aluminium Sheet & Plate Supply',
          body: 'Supply and implementation coordination for aluminium sheet, plate and complementary metal products.',
        },
        usta: {
          title: 'Mosque & Dome Craft Teams',
          body: 'Management of mosque dome and metalwork processes with experienced field crews.',
        },
        alemler: {
          title: 'Mosque Finials & Minaret Works',
          body: 'Visual and durable production for mosque finials, minaret-top details and finishing works.',
        },
      },
      sections: {
        kubbe: {
          eyebrow: 'Dome Cladding',
          title: 'Mosque dome cladding and restoration works',
          body:
            'For new builds and renovation projects, we manage mosque dome cladding with material selection, site preparation and disciplined installation planning.',
          highlights: [
            'Aluminium, copper and lead-based cladding options',
            'Project planning suitable for restoration and renewal works',
            'Nationwide installation and shipping coordination',
          ],
        },
        alem: {
          eyebrow: 'Mosque Finials',
          title: 'Mosque finials and minaret-top finishing works',
          body:
            'In mosque finials, minaret details and dome-top finishing works, we combine visual character with long-term durability.',
          highlights: [
            'Solutions for mosque finials and minaret-top details',
            'Measured forms matched to the existing structure',
            'Delivery planning clarified before installation',
          ],
        },
        metal: {
          eyebrow: 'Aluminium & Copper Cladding',
          title: 'Aluminium, copper, lead and standing seam solutions',
          body:
            'Alongside aluminium and copper cladding needs, we also support lead sheet, standing seam roofing and broader metal cladding requirements.',
          highlights: [
            'Supply of aluminium sheet and plate materials',
            'Copper cladding and lead sheet applications',
            'Installation support for standing seam roof systems',
          ],
        },
      },
      closingTitle: 'International projects',
      closingLead: 'Coordination for Gulf and regional work with English and Arabic contact options.',
      closingCta: 'Contact form & WhatsApp',
    },
  },
  about: {
    sections: {
      tarihce: {
        title: 'Corporate identity & trust',
        paragraphs: [
          'Since 1987, for more than three decades, we have served you together with Turgut Ã‡oÅŸkun and the master craftsmen trained in our company. As Turgut Usta Kubbe Kaplama we combine traditional skill with modern standards and prioritise transparent communication and sustainable quality.',
          'We have worked in almost every province of Turkey for many years. Being among the leading names in our field is what drives us to stand beside you in different cities and meet every need with the same determination today.',
        ],
      },
      yaklasim: {
        title: 'Our approach: project-led, people-led',
        paragraphs: [
          'Whatever the season or distance, our expert crews and professional equipment finish your work as quickly as possible to the highest quality standards.',
          'We do not see you only as a â€œcustomerâ€ but as a friend. With four specialist teams that meet sector needs with a project focus, we can reach you whenever you need us.',
        ],
      },
      vizyon: {
        title: 'Vision & innovation',
        paragraphs: [
          'As Turgut Usta Kubbe Kaplama we follow new trends and modern mosque designs with a fast, creative vision and keep bringing added-value products and new opportunities to our clients.',
        ],
      },
    },
    quote:
      'For us every dome is not only metal and paint; it is a shared memory for the people who live there.',
    ctaBand:
      'From Edirne to Kars, Ä°skenderun to Hopa â€” contact us for fair-value solutions to your mosque and dome needs.',
    motion: {
      heroAlt: 'About us hero image',
      heroKicker: 'Corporate',
      heroTitle: 'About us',
      heroLeadMid: 'in {{brandLine}},',
      heroLeadSince: 'Since 1987',
      heroLeadEnd:
        'we have upheld a tradition and a nationwide service network by your side.',
      heroPills: ['Corporate trust', 'Nationwide shipping', 'Expert site crews'],
      mapSectionTitle: 'Across Turkey',
      timelineTitle: 'Key milestones since our founding',
      trustTitle: 'Why clients choose us',
      trustLines: [
        'Highly experienced, solution-focused expert teams',
        'Planned processes for shipping, installation and communication',
        'Sustainable quality in durable materials and workmanship',
      ],
      processTitle: 'How we work',
      processSteps: [
        { n: '01', t: 'Site survey & needs analysis' },
        { n: '02', t: 'Quotation & technical planning' },
        { n: '03', t: 'Shipping & site preparation' },
        { n: '04', t: 'Execution & handover' },
      ],
      testimonialsTitle: 'Client feedback',
      ctaCallQuote: 'Call us â€” get a quote',
      ctaServices: 'Our services',
      ctaShipments: 'Shipments',
      backHome: 'Back to home',
      stickyWhatsapp: 'Get a quote',
      stickyCall: 'Quick call',
      stickyCallWithPhone: 'Quick call ({{phone}})',
      stats: [
        { value: 500, suffix: '+', label: 'Completed projects' },
        { value: 30, suffix: '+ yrs', label: 'Field experience' },
        { value: 81, label: 'Provinces served' },
        { value: 4, label: 'Specialist team units' },
      ],
      timeline: [
        {
          year: '1987',
          title: 'Founding & craft base',
          detail:
            'The company was founded; the first team focused on dome cladding and site craftsmanship.',
        },
        {
          year: '2000+',
          title: 'Nationwide logistics network',
          detail:
            'Material supply and site coordination expanded with regular shipments to many provinces.',
        },
        {
          year: '2010+',
          title: 'Large-scale projects',
          detail:
            'Mosque domes, minarets and restorations delivered with multi-team management.',
        },
        {
          year: 'Today',
          title: 'Sustainable quality & speed',
          detail:
            'Projects, shipping and installation managed from one centre with reliable, fast, transparent service.',
        },
      ],
      testimonials: [
        {
          text: 'They delivered on the dates promised on site. Coordination was truly professional.',
          person: 'Mosque building association',
          city: 'Kahramanmaras',
        },
        {
          text: 'Material quality and site discipline exceeded expectations. The process was transparent from start to finish.',
          person: 'Restoration team',
          city: 'Istanbul',
        },
        {
          text: 'Shipping and installation speed kept our programme on track. Communication was fast and solution-oriented.',
          person: 'Site manager',
          city: 'Bursa',
        },
        {
          text: 'They clarified every detail in survey and technical planning; the process ran very smoothly.',
          person: 'Mosque board',
          city: 'Konya',
        },
        {
          text: 'Lead supply and site coordination exceeded expectations. We received a clean, on-time handover.',
          person: 'Restoration project team',
          city: 'Edirne',
        },
        {
          text: 'Even on a remote project communication never dropped; photos and feedback were shared regularly.',
          person: 'Building inspector',
          city: 'Gaziantep',
        },
        {
          text: 'We were very satisfied with both appearance and workmanship. A team we would recommend.',
          person: 'Association chair',
          city: 'Amasya',
        },
      ],
    },
  },
  shipments: {
    title: 'Shipments',
    heroAlt: 'Shipments hero image',
    kicker: 'Logistics & delivery',
    lead: 'After production we manage packing, loading and urban / inter-city shipping plans to match your project schedule.',
    photoArchiveTitle: 'Shipment photos',
    photoArchiveLead:
      'All photos are delivered in web formats and protected with a phone-number watermark.',
  },
  contact: { mapOpen: 'Open map' },
  projects: { metaTitle: 'Projects' },
  thanks: { title: 'Thank you', lead: 'Your message reached us.' },
  servicesPage: {
    heroAlt: 'Services hero image',
    kicker: 'Services we provide',
    title: 'Our services',
    lead: 'Browse every area of expertise from mosque dome cladding to shipping and installation on one screen. Open each item for project-specific detail.',
    heroSplitKicker: 'SERVICES',
    heroSplitTitle: 'Mosque Dome Cladding',
    heroSplitLead: 'Installation and material supply in line with the Ottoman dome tradition, with the Turgut Usta team.',
    stat1Label: 'Service lines',
    stat2Label: 'Field experience',
    stat2Suffix: '+ yrs',
    stat3Label: 'Provinces covered',
    cardKicker: 'Overview',
    detailCta: 'Open service detail',
  },
};

const arPatch = {
  nav: {
    home: 'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©',
    about: 'Ù…Ù† Ù†Ø­Ù†',
    services: 'Ø§Ù„Ø®Ø¯Ù…Ø§Øª',
    projects: 'Ù…Ø´Ø§Ø±ÙŠØ¹Ù†Ø§',
    shipments: 'Ø§Ù„Ø´Ø­Ù†',
    contact: 'Ø§ØªØµÙ„ Ø¨Ù†Ø§',
    service_categories: 'Ø¨Ù†ÙˆØ¯ Ø§Ù„Ø®Ø¯Ù…Ø§Øª',
  },
  services: {
    all: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø®Ø¯Ù…Ø§Øª',
    kubbe: 'ÙƒØ³ÙˆØ© Ù‚Ø¨Ø§Ø¨ Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯',
    aluminyumSatis: 'Ø¨ÙŠØ¹ Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ…',
    aluminyumKubbe: 'ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø§Ø¨ Ø¨Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ…',
    bakir: 'Ù†Ø­Ø§Ø³ ÙˆØ£Ù„ÙˆØ§Ø­ ÙˆÙ‚Ø¨Ø©',
    kursun: 'Ø¨ÙŠØ¹ Ø£Ù„ÙˆØ§Ø­ Ø§Ù„Ø±ØµØ§Øµ',
    nakkas: 'Ø²Ø®Ø±ÙØ© ÙˆÙ†Ù‚Ø´ Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ (Ù†Ù‚Ø§Ø´)',
    alemler: 'Ø£Ø¹Ù„Ø§Ù… Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯',
    oluk: 'Ø¨ÙŠØ¹ ÙˆØªØ±ÙƒÙŠØ¨ Ø§Ù„Ù…Ø²Ø§Ø±ÙŠØ¨',
  },
  ui: { language: 'Ø§Ù„Ù„ØºØ©', close: 'Ø¥ØºÙ„Ø§Ù‚', menu: 'Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©' },
  mobileBar: { call: 'Ø§ØªØµÙ„ Ø§Ù„Ø¢Ù†', whatsapp: 'ÙˆØ§ØªØ³Ø§Ø¨', whatsappLine: 'Ø®Ø· ÙˆØ§ØªØ³Ø§Ø¨' },
  footer: {
    link_about: 'Ù…Ù† Ù†Ø­Ù†',
    link_services: 'Ø§Ù„Ø®Ø¯Ù…Ø§Øª',
    link_kubbe: 'ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø©',
    link_oluk: 'Ø§Ù„Ù…Ø²Ø§Ø±ÙŠØ¨',
    link_alemler: 'Ø§Ù„Ø£Ø¹Ù„Ø§Ù…',
    link_contact: 'Ø§ØªØµÙ„ Ø¨Ù†Ø§',
    mapLink: 'Ø¹Ø±Ø¶ Ø¹Ù„Ù‰ Ø§Ù„Ø®Ø±ÙŠØ·Ø©',
    blurb:
      'Ù…Ù‚Ø± Ø£Ù†Ù‚Ø±Ø© Â· <strong class="font-medium text-slate-400">ØªØ±ÙƒÙŠØ§ Ø¨Ø§Ù„ÙƒØ§Ù…Ù„</strong> ØªØ±ÙƒÙŠØ¨ ÙˆØ´Ø­Ù† Â· <strong class="font-medium text-slate-400">Ø¹Ù„Ù‰ Ù…Ø¯Ø§Ø± Ø§Ù„Ø³Ø§Ø¹Ø©</strong> Ù‡Ø§ØªÙ ÙˆÙˆØ§ØªØ³Ø§Ø¨ Â· Ù…Ø´Ø§Ø±ÙŠØ¹ Ø§Ù„Ø®Ù„ÙŠØ¬ ÙˆØ§Ù„Ø¹Ø§Ù„Ù… Ø§Ù„Ø¹Ø±Ø¨ÙŠ (Ø¯Ø¹Ù… EN/AR) Â· Ø®Ø¯Ù…Ø© Ù…Ø¤Ø³Ø³ÙŠØ© Ù„Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø£Ø¹Ù…Ø§Ø±',
    rights: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ‚ Ù…Ø­ÙÙˆØ¸Ø©.',
  },
  seo: {
    home: {
      title: 'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©',
      description:
        'ÙƒØ³ÙˆØ© Ù‚Ø¨Ø§Ø¨ Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ Ø¹Ù„Ù‰ Ù…Ø³ØªÙˆÙ‰ ØªØ±ÙƒÙŠØ§ØŒ Ù‚Ø¨Ø§Ø¨ Ø£Ù„Ù…Ù†ÙŠÙˆÙ… ÙˆÙ†Ø­Ø§Ø³ØŒ Ù…Ø²Ø§Ø±ÙŠØ¨ ÙˆØ²Ø®Ø±ÙØ© ØªÙ‚Ù„ÙŠØ¯ÙŠØ©. ÙØ±Ù‚ Ø§Ø­ØªØ±Ø§ÙÙŠØ©ØŒ Ø´Ø­Ù† ÙˆØªØ±ÙƒÙŠØ¨.',
    },
    about: {
      title: 'Ù…Ù† Ù†Ø­Ù†',
      description:
        'Ù…Ù†Ø° 1987ØŒ Ø·ÙˆØ±ØºÙˆØª ØªØ´ÙˆØ´ÙƒÙˆÙ† Ù„ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø§Ø¨: Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ ÙˆØ§Ù„Ù‚Ø¨Ø§Ø¨ ÙÙŠ Ø£Ù†Ø­Ø§Ø¡ ØªØ±ÙƒÙŠØ§ØŒ Ø­Ø±ÙÙŠÙˆÙ† Ø®Ø¨Ø±Ø§Ø¡ØŒ Ø®Ø¯Ù…Ø© Ù…Ø±ØªÙƒØ²Ø© Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹.',
    },
    services: {
      title: 'Ø§Ù„Ø®Ø¯Ù…Ø§Øª',
      description:
        'ÙƒØ³ÙˆØ© Ù‚Ø¨Ø§Ø¨ Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ØŒ Ø¨ÙŠØ¹ Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ… ÙˆÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø§Ø¨ØŒ Ø£Ù„ÙˆØ§Ø­ Ù†Ø­Ø§Ø³ ÙˆØ±ØµØ§ØµØŒ Ø²Ø®Ø±ÙØ© Ù†Ù‚Ø§Ø´ØŒ Ø£Ø¹Ù„Ø§Ù… Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ ÙˆØ£Ù†Ø¸Ù…Ø© Ù…Ø²Ø§Ø±ÙŠØ¨.',
    },
    contact: {
      title: 'Ø§ØªØµÙ„ Ø¨Ù†Ø§',
      description: 'Ø§Ù„Ù‡Ø§ØªÙ ÙˆÙˆØ§ØªØ³Ø§Ø¨ ÙˆØ§Ù„Ø¹Ù†ÙˆØ§Ù†. Ø¹Ø±ÙˆØ¶ Ø£Ø³Ø¹Ø§Ø± ÙˆØ§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ù„ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø§Ø¨ ÙˆØ§Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„Ù…Ø¹Ø¯Ù†ÙŠØ©.',
    },
    projects: { title: 'Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹', description: 'Ù…Ø´Ø§Ø±ÙŠØ¹ Ù…Ø±Ø¬Ø¹ÙŠØ© Ù…ÙƒØªÙ…Ù„Ø© ÙˆØ¬Ø§Ø±ÙŠ ØªÙ†ÙÙŠØ°Ù‡Ø§.' },
    shipments: { title: 'Ø§Ù„Ø´Ø­Ù†', description: 'Ø§Ù„ØªØ¹Ø¨Ø¦Ø© ÙˆØ§Ù„ØªØ­Ù…ÙŠÙ„ ÙˆØ§Ù„Ù„ÙˆØ¬Ø³ØªÙŠØ§Øª Ø¹Ù„Ù‰ Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ø¨Ù„Ø§Ø¯.' },
    thanks: { title: 'Ø´ÙƒØ±Ø§Ù‹ Ù„Ùƒ', description: 'ØªÙ… Ø§Ø³ØªÙ„Ø§Ù… Ø±Ø³Ø§Ù„ØªÙƒ.' },
  },
  home: {
    hero: {
      brandLine: 'تورغوت جوشكون لكسوة قباب المساجد',
      leftTitle: 'Ø®Ø¨Ø±Ø© ÙƒØ³ÙˆØ© Ù‚Ø¨Ø§Ø¨ Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ ÙˆØ§Ù„Ø£Ø³Ù‚Ù Ø§Ù„Ù…Ø¹Ø¯Ù†ÙŠØ© ÙÙŠ Ø£Ù†Ø­Ø§Ø¡ ØªØ±ÙƒÙŠØ§',
      leftSubtitle:
        'ÙÙŠ Ø§Ù„Ù‚Ø¨Ø§Ø¨ Ø§Ù„Ù†Ø­Ø§Ø³ÙŠØ© ÙˆØ§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ… ÙˆØ§Ù„Ø£Ø¹Ù„Ø§Ù… ÙˆØ§Ù„Ù…Ø²Ø§Ø±ÙŠØ¨ ÙˆØ§Ù„Ø²Ø®Ø±ÙØ© Ø§Ù„ØªÙ‚Ù„ÙŠØ¯ÙŠØ© Ù†Ù‚Ø¯Ù… ÙØ±Ù‚Ø§Ù‹ Ù…Ù†Ø¶Ø¨Ø·Ø© Ø¹Ù„Ù‰ Ø£Ø±Ø¶ Ø§Ù„ÙˆØ§Ù‚Ø¹ØŒ Ø¹Ù…Ù„ÙŠØ§Øª Ø´ÙØ§ÙØ© ÙˆØ­Ø±ÙÙŠØ© Ø¯Ø§Ø¦Ù…Ø©.',
      rightTitle: 'Ù†Ù†Ù…Ùˆ Ù…Ø¹ Ù…Ø±Ø§Ø¬Ø¹Ù†Ø§',
      rightSubtitle:
        'Ù…Ù† Ø£Ù†Ù‚Ø±Ø© Ù†Ø­Ø§ÙØ¸ Ø¹Ù„Ù‰ Ù†ÙØ³ Ø§Ù„Ù…Ø¹Ø§ÙŠÙŠØ± Ø§Ù„Ù…Ø¤Ø³Ø³ÙŠØ© Ù„Ù„ØªØ±ÙƒÙŠØ¨ ÙˆØ§Ù„Ø´Ø­Ù† ÙˆØ§Ù„Ø¯Ø¹Ù… Ø§Ù„ÙÙ†ÙŠ ÙÙŠ Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ ÙÙŠ Ø£Ù†Ø­Ø§Ø¡ Ø§Ù„Ø¨Ù„Ø§Ø¯.',
      logoAlt: 'Ø·ÙˆØ±ØºÙˆØª ØªØ´ÙˆØ´ÙƒÙˆÙ† Ù„ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø§Ø¨',
      kickerBadge1: 'Ù…Ø¹ÙŠØ§Ø± Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø§Ù„Ù…Ø¤Ø³Ø³ÙŠ',
      kickerBadge2: 'ØªØ·Ø¨ÙŠÙ‚ Ø¹Ù„Ù‰ Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ø¨Ù„Ø§Ø¯',
      ctaQuote: 'Ø§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¹Ø±Ø¶ Ø³Ø¹Ø±',
      ctaWhatsapp: 'Ø±Ø§Ø³Ù„Ù†Ø§ Ø¹Ù„Ù‰ ÙˆØ§ØªØ³Ø§Ø¨',
      signatureLine1: 'Ø§Ù„Ø£Ø³ØªØ§Ø° Ø·ÙˆØ±ØºÙˆØª',
      signatureLine2: 'Ø§Ù†Ø¶Ø¨Ø§Ø· Ù…Ø¤Ø³Ø³ÙŠ ÙˆØ­Ø±ÙÙŠØ© Ø·ÙˆÙŠÙ„Ø© Ø§Ù„Ø£Ù…Ø¯ ÙÙŠ ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø§Ø¨ ÙˆØ§Ù„Ø£Ø¹Ù„Ø§Ù… ÙˆØ§Ù„Ù…Ø²Ø§Ø±ÙŠØ¨.',
      callCta: 'Ø§ØªØµÙ„ Ø§Ù„Ø¢Ù†',
      colCtaServices: 'Ø®Ø¯Ù…Ø§ØªÙ†Ø§',
      colCtaProjects: 'Ø§Ø·Ù„Ø¹ Ø¹Ù„Ù‰ Ù…Ø´Ø§Ø±ÙŠØ¹Ù†Ø§',
      imageLeftAlt: 'Ù‚Ø¨Ø© Ù†Ø­Ø§Ø³ÙŠØ© ÙˆØ£Ø¹Ù„Ø§Ù… Ù…Ø³Ø¬Ø¯ â€” Ù…Ø´Ø±ÙˆØ¹ Ù…Ø±Ø¬Ø¹ÙŠ',
      imageRightAlt: 'Ù…Ø¬Ù…Ø¹ Ø¨Ù‚Ø¨Ø© Ø£Ù„Ù…Ù†ÙŠÙˆÙ… â€” Ù…Ø´Ø±ÙˆØ¹ Ù…Ø±Ø¬Ø¹ÙŠ',
      ariaSection: 'Ù‚Ø³Ù… Ø§Ù„ØªØ±Ø­ÙŠØ¨ ÙÙŠ Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©',
    },
    services: {
      kicker: 'Ù…Ø§Ø°Ø§ Ù†Ù‚Ø¯Ù…',
      title: 'Ø®Ø¯Ù…Ø§ØªÙ†Ø§',
      leadBefore: 'Ù†ØªØ®ØµØµ ÙÙŠ Ø§Ù„Ø¨Ù†ÙˆØ¯ Ø£Ø¯Ù†Ø§Ù‡Ø› Ø§Ù„Ø´Ø±Ø­ Ø§Ù„ÙƒØ§Ù…Ù„ ÙˆØ§Ù„ØµÙˆØ± ÙÙŠ ØµÙØ­Ø© ',
      leadLink: 'Ø§Ù„Ø®Ø¯Ù…Ø§Øª',
      leadAfter: '.',
      viewAll: 'Ø¹Ø±Ø¶ Ø§Ù„ÙƒÙ„',
      detailCta: 'Ø§Ù„ØªÙØ§ØµÙŠÙ„',
      grid: {
        'camii-kubbe': {
          title: 'ÙƒØ³ÙˆØ© Ù‚Ø¨Ø§Ø¨ Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯',
          description: 'ÙƒØ³ÙˆØ© ÙˆØªØ±Ù…ÙŠÙ… Ø§Ù„Ù‚Ø¨Ø§Ø¨ Ø¨Ø§Ù„Ù†Ø­Ø§Ø³ ÙˆØ§Ù„Ø±ØµØ§Øµ ÙˆØ§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ….',
          imageAlt: 'Ù‚Ø¨Ø© Ù…Ø³Ø¬Ø¯ Ù…Ø¹ Ø¹Ù„Ù… â€” ØµÙˆØ±Ø© Ù…Ø¹Ù…Ø§Ø±ÙŠØ©',
        },
        'aluminyum-satis': {
          title: 'Ø¨ÙŠØ¹ Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ…',
          description: 'Ø£Ù„ÙˆØ§Ø­ ÙˆÙ…ÙˆØ§Ø¯ Ø¹Ø§Ù„ÙŠØ© Ø§Ù„Ø¬ÙˆØ¯Ø©Ø› ØªÙˆØ±ÙŠØ¯ Ø­Ø³Ø¨ Ù…Ø®Ø·Ø·Ø§Øª Ø§Ù„Ù…Ø´Ø±ÙˆØ¹.',
          imageAlt: 'Ø¹ÙŠÙ†Ø§Øª Ø£Ù„ÙˆØ§Ù† ÙˆØ£Ù„ÙˆØ§Ø­ Ø£Ù„Ù…Ù†ÙŠÙˆÙ…',
        },
        'aluminyum-kubbe': {
          title: 'ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø§Ø¨ Ø¨Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ…',
          description: 'Ø£Ù„Ù…Ù†ÙŠÙˆÙ… Ø®ÙÙŠÙ ÙˆÙ…ØªÙŠÙ† Ù„Ù„Ù‚Ø¨Ø§Ø¨ ÙˆØ§Ù„Ø£Ø³Ù‚Ù.',
          imageAlt: 'Ù‚Ø¨Ø© Ù…Ø³Ø¬Ø¯ Ø¨Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ… ÙˆØ¹Ù„Ù… Ø°Ù‡Ø¨ÙŠ â€” Ù„Ù‚Ø·Ø© Ø¬ÙˆÙŠØ©',
        },
        'bakir-kubbe': {
          title: 'ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø§Ø¨ Ø¨Ø§Ù„Ù†Ø­Ø§Ø³',
          description: 'Ø­Ø±ÙÙŠØ© Ù†Ø­Ø§Ø³ÙŠØ© ØªÙ‚Ù„ÙŠØ¯ÙŠØ© Ù„Ø£Ø³Ø·Ø­ Ù‚Ø¨Ø§Ø¨ Ø·ÙˆÙŠÙ„Ø© Ø§Ù„Ø¹Ù…Ø±.',
          imageAlt: 'Ù‚Ø¨Ø© Ù†Ø­Ø§Ø³ÙŠØ© Ù„Ø§Ù…Ø¹Ø© ÙˆÙ‚Ø§Ø¹Ø¯Ø© Ø¨ÙŠØ¶Ø§Ø¡',
        },
        'kursun-levha': {
          title: 'Ø¨ÙŠØ¹ Ø£Ù„ÙˆØ§Ø­ Ø§Ù„Ø±ØµØ§Øµ',
          description: 'ØªÙˆØ±ÙŠØ¯ Ø£Ù„ÙˆØ§Ø­ Ø§Ù„Ø±ØµØ§Øµ Ù„Ù„Ø¹Ø²Ù„ Ø§Ù„Ù…Ø§Ø¦ÙŠ ÙˆØ§Ù„Ø£Ø³Ù‚Ù.',
          imageAlt: 'ØªÙˆØ±ÙŠØ¯ Ø£Ù„ÙˆØ§Ø­ Ù…Ø¹Ø¯Ù†ÙŠØ© â€” Ù…Ø®Ø²ÙˆÙ† ØµÙ†Ø§Ø¹ÙŠ',
        },
        nakkas: {
          title: 'Ø²Ø®Ø±ÙØ© Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ (Ù†Ù‚Ø§Ø´)',
          description: 'Ø£Ø¹Ù…Ø§Ù„ Ø²Ø®Ø±ÙØ© ØªÙ‚Ù„ÙŠØ¯ÙŠØ© Ù„Ù„Ø¯Ø§Ø®Ù„ ÙˆØ§Ù„Ø®Ø§Ø±Ø¬.',
          imageAlt: 'Ø²Ø®Ø±ÙØ© Ù‡Ù†Ø¯Ø³ÙŠØ© Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ø³Ø¬Ø¯',
        },
        alemler: {
          title: 'Ø£Ø¹Ù„Ø§Ù… Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯',
          description: 'ØªØµÙ…ÙŠÙ… ÙˆØªØµÙ†ÙŠØ¹ ÙˆØªØ±ÙƒÙŠØ¨ Ø§Ù„Ø£Ø¹Ù„Ø§Ù….',
          imageAlt: 'Ø£Ø¹Ù„Ø§Ù… Ù…Ø³Ø§Ø¬Ø¯ Ø°Ù‡Ø¨ÙŠØ© Ù…Ø¹ Ù‡Ù„Ø§Ù„',
        },
        oluk: {
          title: 'Ø§Ù„Ù…Ø²Ø§Ø±ÙŠØ¨ â€” Ø¨ÙŠØ¹ ÙˆØªØ±ÙƒÙŠØ¨',
          description: 'Ø£Ù†Ø¸Ù…Ø© ØªØµØ±ÙŠÙ Ù…ÙŠØ§Ù‡ Ø§Ù„Ø£Ù…Ø·Ø§Ø± Ù„Ù„Ù…Ø³Ø§Ø¬Ø¯ ÙˆØ§Ù„Ù…Ø¨Ø§Ù†ÙŠ.',
          imageAlt: 'ØªÙØ§ØµÙŠÙ„ ØªØ±ÙƒÙŠØ¨ Ù…Ø²Ø±ÙŠØ¨Ø© Ù…Ø¹Ø¯Ù†ÙŠØ©',
        },
      },
    },
    aboutTeaser: {
      kicker: 'Ù…Ù† Ù†Ø­Ù†ØŸ',
      heading: 'Ù…Ù† Ù†Ø­Ù†',
      p1: '{{company}} â€” Ù…Ù†Ø° Ø¹Ø§Ù… 1987 ÙˆÙ„Ø£ÙƒØ«Ø± Ù…Ù† Ø«Ù„Ø§Ø«ÙŠÙ† Ø¹Ø§Ù…Ø§Ù‹ØŒ Ù…Ø¹ Ø·ÙˆØ±ØºÙˆØª ØªØ´ÙˆØ´ÙƒÙ† ÙˆØ§Ù„Ø­Ø±ÙÙŠÙŠÙ† Ø§Ù„Ø°ÙŠÙ† Ù†Ø´Ø£ÙˆØ§ ÙÙŠ Ø´Ø±ÙƒØªÙ†Ø§ØŒ Ù†Ø®Ø¯Ù… Ù…Ø´Ø§Ø±ÙŠØ¹ Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ ÙˆØ§Ù„Ù‚Ø¨Ø§Ø¨. ÙÙŠ Ø£Ù†Ø­Ø§Ø¡ ØªØ±ÙƒÙŠØ§ Ù†Ù†Ø¸Ø± Ø¥Ù„Ù‰ ÙƒÙ„ Ø¹Ù…Ù„ ÙƒØ¹Ù„Ø§Ù‚Ø© Ø«Ù‚Ø© Ø·ÙˆÙŠÙ„Ø© Ø§Ù„Ø£Ø¬Ù„ØŒ ÙˆÙ„ÙŠØ³ Ù…Ø¬Ø±Ø¯ ØªØ³Ù„ÙŠÙ….',
      p2: 'Ù†Ø¹Ø§Ù…Ù„ ÙƒÙ„ Ø¹Ù…ÙŠÙ„ ÙƒØ´Ø±ÙŠÙƒØŒ ÙˆÙ„ÙŠØ³ ÙƒØ·Ù„Ø¨ÙŠØ© ÙÙ‚Ø·. ØµÙŠÙØ§Ù‹ Ø£Ùˆ Ø´ØªØ§Ø¡Ù‹ØŒ Ù‚Ø±ÙŠØ¨Ø§Ù‹ Ø£Ùˆ Ø¨Ø¹ÙŠØ¯Ø§Ù‹ØŒ ØªÙƒÙ…Ù„ ÙØ±Ù‚Ù†Ø§ Ø§Ù„Ù…ØªØ®ØµØµØ© Ù…Ø¹Ø¯Ø§ØªÙƒÙ… Ø§Ù„Ø¹Ù…Ù„ ÙÙŠ Ø£Ù‚ØµØ± ÙˆÙ‚Øª ÙˆØ¨Ø£Ø¹Ù„Ù‰ Ø¬ÙˆØ¯Ø©.',
      badge: 'Ø§Ù„Ù‚Ø¨Ø© ÙˆØ§Ù„Ø¹Ù…Ø§Ø±Ø© Ø§Ù„ØªÙ‚Ù„ÙŠØ¯ÙŠØ©',
      storyCta: 'Ù‚ØµØªÙ†Ø§ Ø§Ù„Ù…Ø¤Ø³Ø³ÙŠØ©',
      storyCtaSr: '(Ø§Ù„Ù†Øµ Ø§Ù„ÙƒØ§Ù…Ù„ ÙÙŠ ØµÙØ­Ø© Ù…Ù† Ù†Ø­Ù†)',
      contactCta: 'ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§',
      imageAlt:
        'Ø´Ø¹Ø§Ø± ØªØ´ÙˆØ´ÙƒÙˆÙ† Ù„Ù„Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„Ù…Ø¹Ù…Ø§Ø±ÙŠØ© ÙˆØ§Ù„Ù‡Ù†Ø¯Ø³Ø©Ø› ØµÙˆØ±Ø© ØªØ¹Ø±ÙŠÙÙŠØ© Ù„Ù…Ù‡Ù†Ø¯Ø³ Ø§Ù„Ø¥Ù†Ø´Ø§Ø¡Ø§Øª ÙØ±Ø§Ù…ÙˆØ² ØªØ´ÙˆØ´ÙƒÙˆÙ† ÙˆØ§Ù„Ù…Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„Ù…Ø¹Ù…Ø§Ø±ÙŠØ© Ø¬ÙˆÙ„Ø³ØªØ§Ù† ØªØ´ÙˆØ´ÙƒÙˆÙ† ØªÙˆØ±ÙŠ',
    },
    stats: {
      heading: 'Ø£Ø±Ù‚Ø§Ù…Ù†Ø§',
      items: {
        calismalar: { label: 'Ø£Ø¹Ù…Ø§Ù„ Ù…Ù†Ø¬Ø²Ø©' },
        yapim: { label: 'Ù…Ø´Ø§Ø±ÙŠØ¹ Ù‚ÙŠØ¯ Ø§Ù„ØªÙ†ÙÙŠØ°' },
        musteri: { label: 'Ø¹Ù…Ù„Ø§Ø¡ Ø±Ø§Ø¶ÙˆÙ†' },
        toplam: { label: 'Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹' },
      },
    },
    values: {
      heading: 'Ù‚ÙŠÙ…Ù†Ø§',
      subtitle: 'Ø±ÙƒØ§Ø¦Ø² Ø§Ù„Ø¬ÙˆØ¯Ø©',
      items: {
        kalite: {
          title: 'Ø§Ù„Ø¬ÙˆØ¯Ø© ÙˆØ§Ù„Ø®Ø¨Ø±Ø©',
          body: 'Ù…Ø¹Ø§ÙŠÙŠØ± Ø¹Ø§Ù„ÙŠØ© Ù…Ù† Ø§Ù„Ø±Ø³ÙˆÙ…Ø§Øª Ø¥Ù„Ù‰ Ø§Ù„ØªØ±ÙƒÙŠØ¨Ø› Ø³ÙŠØ§Ø³Ø© Ø¬ÙˆØ¯Ø© ÙˆØ§Ø­Ø¯Ø© Ù„Ù„Ù…ÙˆØ§Ø¯ ÙˆØ§Ù„Ø­Ø±ÙÙŠØ©.',
        },
        deneyim: {
          title: 'Ø®Ø¨Ø±Ø© Ø§Ù„Ø³Ù†ÙˆØ§Øª',
          body: 'Ø¥Ø±Ø« Ø­Ø±ÙÙŠ Ù…Ù†Ø° 1987 ÙˆÙ…Ø´Ø§Ø±ÙŠØ¹ ØªØªØ­Ù…Ù„ Ø§Ù„Ø²Ù…Ù†.',
        },
        guven: {
          title: 'Ø§Ù„Ø«Ù‚Ø© ÙˆØ§Ù„Ø¶Ù…Ø§Ù†',
          body: 'Ø¶Ù…Ø§Ù† ÙƒØªØ§Ø¨ÙŠ ÙˆØ¹Ù…Ù„ÙŠØ© Ø´ÙØ§Ø¡Ø› Ø±Ø¶Ø§ÙƒÙ… Ù‡Ùˆ ØªÙˆÙ‚ÙŠØ¹Ù†Ø§.',
        },
        teslimat: {
          title: 'Ø§Ù„ØªØ³Ù„ÙŠÙ… ÙÙŠ Ø§Ù„ÙˆÙ‚Øª',
          body: 'ØªØ³Ù„ÙŠÙ… ÙƒØ§Ù…Ù„ Ø¶Ù…Ù† Ø§Ù„Ø¬Ø¯Ø§ÙˆÙ„ Ø§Ù„Ù…ØªÙÙ‚ Ø¹Ù„ÙŠÙ‡Ø§Ø› Ø¥Ù†ØªØ§Ø¬ ÙˆÙ„ÙˆØ¬Ø³ØªÙŠØ§Øª Ù…Ø¯Ø±ÙˆØ³Ø©.',
        },
      },
    },
    map: {
      kicker: 'Ù…Ø±Ø§Ø¬Ø¹ ÙÙŠ Ø£Ù†Ø­Ø§Ø¡ ØªØ±ÙƒÙŠØ§',
      titleAccent: 'Ø¨ØµÙ…ØªÙ†Ø§',
      headingTitle: 'Ø£Ø¹Ù…Ø§Ù„ Ù†ÙØ°Ù†Ø§Ù‡Ø§ ÙÙŠ {{count}} ÙˆÙ„Ø§ÙŠØ©',
      subtitle:
        'Ø§Ø®ØªØ± Ù†ÙˆØ¹ Ø§Ù„Ø®Ø¯Ù…Ø© Ø£ÙˆÙ„Ø§Ù‹Ø› Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ø§Ù„Ø¹Ù„Ø§Ù…Ø§Øª Ø§Ù„Ù…Ù„ÙˆÙ‘Ù†Ø© Ø£Ùˆ Ø§Ù„ØªØ¬Ù…Ø¹Ø§Øª Ø§Ù„Ù…Ø±Ù‚Ù…Ø©. ÙŠØ¸Ù‡Ø± Ø§Ù„Ù…Ù„Ø®Øµ Ø¹Ù„Ù‰ Ø§Ù„ÙŠÙ…ÙŠÙ†. Ø§Ù„Ø¹Ù„Ø§Ù…Ø§Øª Ù‚Ø±Ø¨ Ù…Ø±ÙƒØ² Ø§Ù„Ù…Ø¯ÙŠÙ†Ø© ÙˆÙ„ÙŠØ³Øª Ø¹Ù†Ø§ÙˆÙŠÙ† Ø¯Ù‚ÙŠÙ‚Ø©.',
      fullListHint: 'Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ÙƒØ§Ù…Ù„Ø© ÙˆØ§Ù„ØµÙˆØ±',
      filterLabel: 'Ù†ÙˆØ¹ Ø§Ù„Ø®Ø¯Ù…Ø©',
      filterAll: 'Ø§Ù„ÙƒÙ„',
      panelTitle: 'Ø®Ø±ÙŠØ·Ø© ØªØ±ÙƒÙŠØ§',
      panelSubtitle: 'ØªØ±ÙƒÙŠØ§ ÙÙ‚Ø· â€” Ø§Ù„ØªÙƒØ¨ÙŠØ± Ø£Ø¹Ù„Ù‰ Ø§Ù„ÙŠÙ…ÙŠÙ†',
      locationCount: '{{count}} Ù…ÙˆÙ‚Ø¹Ø§Ù‹',
      loadingShort: 'Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø®Ø±ÙŠØ·Ø©â€¦',
      badgeInteractive: 'ØªÙØ§Ø¹Ù„ÙŠ',
      benefit1Title: 'Ø´Ø¨ÙƒØ© Ù…Ø±Ø§Ø¬Ø¹ ÙˆØ§Ø³Ø¹Ø©',
      benefit1Desc: 'ØªØ±ÙƒÙŠØ¨ ÙˆØ´Ø­Ù† Ø¹Ù„Ù‰ Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ø¨Ù„Ø§Ø¯',
      benefit2Title: 'Ù…Ù„Ø®Øµ Ø¨Ù„Ù…Ø³Ø© ÙˆØ§Ø­Ø¯Ø©',
      benefit2Desc: 'Ø§Ù„Ø®Ø±ÙŠØ·Ø© ÙˆØ§Ù„Ø¨Ø·Ø§Ù‚Ø© ØªØªØ­Ø¯Ø«Ø§Ù† Ù…Ø¹Ø§Ù‹',
      benefit3Title: 'Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ ÙƒØ§Ù…Ù„Ø©',
      benefit3Desc: 'Ø±Ø§Ø¬Ø¹ ØµÙØ­Ø© Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ Ù„Ù„Ù…Ø²ÙŠØ¯',
      howToTitle: 'Ù†ØµØ§Ø¦Ø­ Ø³Ø±ÙŠØ¹Ø©',
      howTo1: 'Ø§Ø®ØªØ± Ø§Ù„Ø®Ø¯Ù…Ø© Ù…Ù† Ø§Ù„Ø£Ø²Ø±Ø§Ø± ÙÙŠ Ø§Ù„Ø£Ø¹Ù„Ù‰.',
      howTo2: 'Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ù†Ù‚Ø·Ø© Ø£Ùˆ Ù…Ø¬Ù…ÙˆØ¹Ø© â€” ØªÙ†ØªÙ‚Ù„ Ø§Ù„Ø®Ø±ÙŠØ·Ø© Ø¥Ù„Ù‰ Ø§Ù„Ù…Ù†Ø·Ù‚Ø©.',
      howTo3: 'ØªØ¹Ø±Ø¶ Ø§Ù„Ø¨Ø·Ø§Ù‚Ø© Ø§Ø³Ù… Ø§Ù„Ù…Ø³Ø¬Ø¯ Ø£Ùˆ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ ÙˆØ§Ù„Ù…Ø¯ÙŠÙ†Ø©.',
      selectedLabel: 'Ù…Ø±Ø¬Ø¹ Ù…Ø­Ø¯Ø¯',
      emptyFilter: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª Ù„Ù‡Ø°Ø§ Ø§Ù„Ù…Ø±Ø´Ø­.',
      listTab: 'Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹',
      mapTab: 'Ø§Ù„Ø®Ø±ÙŠØ·Ø©',
      mapHint:
        'Ø§Ù„Ø¹Ø±Ø¶ Ù…Ù‚ØªØµØ± Ø¹Ù„Ù‰ ØªØ±ÙƒÙŠØ§Ø› Ù„Ø§ ÙŠÙ…ÙƒÙ† ØªØ­Ø±ÙŠÙƒ Ø§Ù„Ø®Ø±ÙŠØ·Ø© Ù„Ù„Ø¹Ø§Ù„Ù…. Ø¹Ù†Ø¯ ØªØºÙŠÙŠØ± Ø§Ù„Ù…Ø±Ø´Ø­ ØªÙØ¹Ø§Ø¯ ØªÙˆØ³ÙŠØ· Ø§Ù„Ø®Ø±ÙŠØ·Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø¨Ù„Ø§Ø¯.',
      loading: 'Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø·Ø¨Ù‚Ø© Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹â€¦',
      listHeading: 'Ù…Ø´Ø§Ø±ÙŠØ¹ Ø¹Ù„Ù‰ Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ø¨Ù„Ø§Ø¯',
      cardAria: 'Ø¹Ø±Ø¶ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹ ÙÙŠ ØªØ±ÙƒÙŠØ§',
      allProjects: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹',
      category: {
        kubbe: 'ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø©',
        nakkas: 'Ø²Ø®Ø±ÙØ© Ù†Ù‚Ø§Ø´',
        oluk: 'Ø§Ù„Ù…Ø²Ø§Ø±ÙŠØ¨',
        diger: 'Ø£Ø®Ø±Ù‰ / Ø´Ø­Ù†',
      },
      imageSoon: 'ØµÙˆØ±Ø© Ù‚Ø±ÙŠØ¨Ø§Ù‹',
    },
    keywords: {
      tagline: 'Ø¹Ù„Ù‰ Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ø¨Ù„Ø§Ø¯ Â· ØªÙˆØ§ØµÙ„ 24/7 Â· Ù…Ø´Ø§Ø±ÙŠØ¹ Ø¯ÙˆÙ„ÙŠØ© Ù„Ù„Ø®Ù„ÙŠØ¬ ÙˆØ§Ù„Ø¹Ø§Ù„Ù… Ø§Ù„Ø¹Ø±Ø¨ÙŠ',
      description:
        'Ù†Ù‚Ø¯Ù… Ø¯Ø¹Ù…Ø§Ù‹ ØªÙ†ÙÙŠØ°ÙŠØ§Ù‹ Ø¹Ù„Ù‰ Ù…Ø³ØªÙˆÙ‰ ØªØ±ÙƒÙŠØ§ Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø§Ø¨ØŒ Ø£Ø¹Ù„Ø§Ù… Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ØŒ Ø§Ù„ÙƒØ³ÙˆØ© Ø¨Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ… ÙˆØ§Ù„Ù†Ø­Ø§Ø³ØŒ Ø£Ù„ÙˆØ§Ø­ Ø§Ù„Ø±ØµØ§Øµ ÙˆØ£Ø³Ù‚Ù Ø§Ù„ÙƒÙÙ†ÙØª Ø¶Ù…Ù† Ø¥Ø¯Ø§Ø±Ø© Ù…Ø´Ø±ÙˆØ¹ ÙˆØ§Ø¶Ø­Ø©.',
      heading: 'Ø®Ø¯Ù…Ø§Øª ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø§Ø¨ ÙˆØ§Ù„ØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø§Ù„Ù…Ø¹Ø¯Ù†ÙŠØ©',
      detailCta: 'Ø¹Ø±Ø¶ Ø§Ù„ØªÙØ§ØµÙŠÙ„',
      cardBadge: 'Ø¨Ø·Ø§Ù‚Ø© Ø®Ø¯Ù…Ø©',
      cardsTitle: 'Ø¨Ø·Ø§Ù‚Ø§Øª Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø¨Ø§Ø±Ø²Ø©',
      cardsNote:
        'ÙƒÙ„ Ø¨Ø·Ø§Ù‚Ø© ØªÙ‚ÙˆØ¯ Ø¥Ù„Ù‰ Ø¹Ù†ÙˆØ§Ù† Ø®Ø¯Ù…Ø© Ù…Ø±ØªØ¨Ø· Ø¨Ù†ÙŠÙ‘Ø© Ø§Ù„Ø¨Ø­Ø« Ù„Ø¯Ù‰ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…. ÙŠØªÙ… ØªÙ‚Ø¯ÙŠÙ… Ø§Ù„ØªØ³Ø¹ÙŠØ± ÙˆØ§Ù„ØªÙØ§ØµÙŠÙ„ Ø§Ù„ÙÙ†ÙŠØ© Ø¨Ø­Ø³Ø¨ Ù†Ø·Ø§Ù‚ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹.',
      cards: {
        kubbe: {
          title: 'ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø©',
          body: 'Ø­Ù„ÙˆÙ„ ÙƒØ³ÙˆØ© Ù‚Ø§Ø¦Ù…Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ… ÙˆØ§Ù„Ù†Ø­Ø§Ø³ ÙˆØ§Ù„Ø±ØµØ§Øµ Ù„ÙÙ‚Ø¨Ø§Ø¨ Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯.',
        },
        kursun: {
          title: 'Ø¨ÙŠØ¹ Ø§Ù„Ø±ØµØ§Øµ ÙˆØ£Ù„ÙˆØ§Ø­ Ø§Ù„Ø±ØµØ§Øµ',
          body: 'Ø¯Ø¹Ù… Ù…ÙˆØ¬Ù‘Ù‡ Ù„Ù„Ù…Ø´Ø±ÙˆØ¹ ÙÙŠ ØªÙˆØ±ÙŠØ¯ Ø£Ù„ÙˆØ§Ø­ Ø§Ù„Ø±ØµØ§Øµ ÙˆØ§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø§Ù„ÙƒØ³ÙˆØ© Ø¨Ø§Ù„Ø±ØµØ§Øµ.',
        },
        kenet: {
          title: 'Ø£Ø³Ù‚Ù Ø§Ù„ÙƒÙ†Øª',
          body: 'ØªØ®Ø·ÙŠØ· Ø§Ù„ØªÙ†ÙÙŠØ° ÙˆØªÙˆØ¬ÙŠÙ‡ Ø§Ù„Ù…ÙˆØ§Ø¯ ÙˆØ¯Ø¹Ù… Ø§Ù„Ù…Ø¹Ø§ÙŠÙ†Ø© Ù„Ø£Ù†Ø¸Ù…Ø© Ø£Ø³Ù‚Ù Ø§Ù„ÙƒÙ†Øª.',
        },
        aluminyum: {
          title: 'Ø¨ÙŠØ¹ ØµÙØ§Ø¦Ø­ ÙˆØ£Ù„ÙˆØ§Ø­ Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ…',
          body: 'ØªÙˆØ±ÙŠØ¯ ÙˆØªÙ†Ø³ÙŠÙ‚ ØªÙ†ÙÙŠØ° ØµÙØ§Ø¦Ø­ Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ… ÙˆØ§Ù„Ø£Ù„ÙˆØ§Ø­ ÙˆØ§Ù„Ù…Ù†ØªØ¬Ø§Øª Ø§Ù„Ù…Ø¹Ø¯Ù†ÙŠØ© Ø§Ù„Ù…ÙƒÙ…Ù„Ø©.',
        },
        usta: {
          title: 'ÙÙØ±Ù‚ Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ ÙˆØ§Ù„Ù‚Ø¨Ø§Ø¨',
          body: 'Ø¥Ø¯Ø§Ø±Ø© Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„Ù‚Ø¨Ø§Ø¨ ÙˆØ§Ù„ØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø§Ù„Ù…Ø¹Ø¯Ù†ÙŠØ© Ø¨ÙˆØ§Ø³Ø·Ø© ÙØ±Ù‚ Ù…ÙŠØ¯Ø§Ù†ÙŠØ© Ø°Ø§Øª Ø®Ø¨Ø±Ø©.',
        },
        alemler: {
          title: 'Ø£Ø¹Ù„Ø§Ù… Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ ÙˆØ£Ø¹Ù…Ø§Ù„ Ø§Ù„Ù…Ø¢Ø°Ù†',
          body: 'Ø¥Ù†ØªØ§Ø¬ Ø¬Ù…Ø§Ù„ÙŠ ÙˆÙ…ØªÙŠÙ† Ù„Ø£Ø¹Ù„Ø§Ù… Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ ÙˆØªÙØ§ØµÙŠÙ„ Ù‚Ù…Ù… Ø§Ù„Ù…Ø¢Ø°Ù† ÙˆØ§Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„Ù…ÙƒÙ…Ù„Ø©.',
        },
      },
      sections: {
        kubbe: {
          eyebrow: 'ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø©',
          title: 'ØªÙ†ÙÙŠØ° ÙƒØ³ÙˆØ© Ù‚Ø¨Ø§Ø¨ Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ ÙˆØ£Ø¹Ù…Ø§Ù„ Ø§Ù„ØªØ±Ù…ÙŠÙ…',
          body:
            'ÙÙŠ Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø© ÙˆØ£Ø¹Ù…Ø§Ù„ Ø§Ù„ØªØ¬Ø¯ÙŠØ¯ Ù†Ø¯ÙŠØ± ÙƒØ³ÙˆØ© Ù‚Ø¨Ø§Ø¨ Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ Ù…Ø¹ Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…ÙˆØ§Ø¯ ÙˆØªØ¬Ù‡ÙŠØ² Ø§Ù„Ù…ÙˆÙ‚Ø¹ ÙˆØ®Ø·Ø© ØªÙ†ÙÙŠØ° Ù…Ù†Ø¶Ø¨Ø·Ø©.',
          highlights: [
            'Ø®ÙŠØ§Ø±Ø§Øª ÙƒØ³ÙˆØ© Ø¨Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ… ÙˆØ§Ù„Ù†Ø­Ø§Ø³ ÙˆØ§Ù„Ø±ØµØ§Øµ',
            'Ø®Ø·Ø© Ù…Ø´Ø±ÙˆØ¹ Ù…Ù†Ø§Ø³Ø¨Ø© Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„ØªØ±Ù…ÙŠÙ… ÙˆØ§Ù„ØªØ¬Ø¯ÙŠØ¯',
            'ØªÙ†Ø³ÙŠÙ‚ Ø§Ù„ØªØ±ÙƒÙŠØ¨ ÙˆØ§Ù„Ø´Ø­Ù† Ø¹Ù„Ù‰ Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ø¨Ù„Ø§Ø¯',
          ],
        },
        alem: {
          eyebrow: 'Ø£Ø¹Ù„Ø§Ù… Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯',
          title: 'Ø£Ø¹Ù…Ø§Ù„ Ø£Ø¹Ù„Ø§Ù… Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ ÙˆØªÙØ§ØµÙŠÙ„ Ù‚Ù…Ù… Ø§Ù„Ù…Ø¢Ø°Ù†',
          body:
            'ÙÙŠ Ø£Ø¹Ù„Ø§Ù… Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ ÙˆØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…Ø¢Ø°Ù† ÙˆØ§Ù„Ø£Ø¬Ø²Ø§Ø¡ Ø§Ù„Ù…ÙƒÙ…Ù„Ø© Ø£Ø¹Ù„Ù‰ Ø§Ù„Ù‚Ø¨Ø© Ù†Ø¬Ù…Ø¹ Ø¨ÙŠÙ† Ø§Ù„Ù…Ø¸Ù‡Ø± Ø§Ù„Ø¬Ù…Ø§Ù„ÙŠ ÙˆØ§Ù„Ù…ØªØ§Ù†Ø© Ø§Ù„Ø·ÙˆÙŠÙ„Ø©.',
          highlights: [
            'Ø­Ù„ÙˆÙ„ Ù„Ø£Ø¹Ù„Ø§Ù… Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ ÙˆØªÙØ§ØµÙŠÙ„ Ù‚Ù…Ù… Ø§Ù„Ù…Ø¢Ø°Ù†',
            'Ù‚ÙŠØ§Ø³Ø§Øª ÙˆØ£Ø´ÙƒØ§Ù„ Ù…ØªÙˆØ§ÙÙ‚Ø© Ù…Ø¹ Ø§Ù„Ù…Ø¨Ù†Ù‰ Ø§Ù„Ù‚Ø§Ø¦Ù…',
            'Ø®Ø·Ø© ØªØ³Ù„ÙŠÙ… ÙˆØ§Ø¶Ø­Ø© Ù‚Ø¨Ù„ Ø§Ù„ØªÙ†ÙÙŠØ°',
          ],
        },
        metal: {
          eyebrow: 'ÙƒØ³ÙˆØ© Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ… ÙˆØ§Ù„Ù†Ø­Ø§Ø³',
          title: 'Ø­Ù„ÙˆÙ„ Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ… ÙˆØ§Ù„Ù†Ø­Ø§Ø³ ÙˆØ§Ù„Ø±ØµØ§Øµ ÙˆØ£Ø³Ù‚Ù Ø§Ù„ÙƒÙ†Øª',
          body:
            'Ø¥Ù„Ù‰ Ø¬Ø§Ù†Ø¨ Ø§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø§Ù„ÙƒØ³ÙˆØ© Ø¨Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ… ÙˆØ§Ù„Ù†Ø­Ø§Ø³ Ù†ÙˆÙØ± Ø£ÙŠØ¶Ø§Ù‹ Ø­Ù„ÙˆÙ„Ø§Ù‹ Ù…Ù†Ø§Ø³Ø¨Ø© Ù„Ù„Ù…Ø´Ø±ÙˆØ¹ ÙÙŠ Ø£Ù„ÙˆØ§Ø­ Ø§Ù„Ø±ØµØ§Øµ ÙˆØ£Ø³Ù‚Ù Ø§Ù„ÙƒÙ†Øª ÙˆØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø§Ù„ÙƒØ³ÙˆØ© Ø§Ù„Ù…Ø¹Ø¯Ù†ÙŠØ©.',
          highlights: [
            'ØªÙˆØ±ÙŠØ¯ ØµÙØ§Ø¦Ø­ ÙˆØ£Ù„ÙˆØ§Ø­ Ø§Ù„Ø£Ù„Ù…Ù†ÙŠÙˆÙ…',
            'ØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø§Ù„ÙƒØ³ÙˆØ© Ø¨Ø§Ù„Ù†Ø­Ø§Ø³ ÙˆØ£Ù„ÙˆØ§Ø­ Ø§Ù„Ø±ØµØ§Øµ',
            'Ø¯Ø¹Ù… ØªÙ†ÙÙŠØ° Ø£Ù†Ø¸Ù…Ø© Ø£Ø³Ù‚Ù Ø§Ù„ÙƒÙ†Øª',
          ],
        },
      },
      closingTitle: 'Ù…Ø´Ø§Ø±ÙŠØ¹ Ø¯ÙˆÙ„ÙŠØ©',
      closingLead: 'ØªÙ†Ø³ÙŠÙ‚ Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ Ø§Ù„Ø®Ù„ÙŠØ¬ ÙˆØ§Ù„Ù…Ù†Ø·Ù‚Ø© Ù…Ø¹ Ø®ÙŠØ§Ø±Ø§Øª ØªÙˆØ§ØµÙ„ Ø¨Ø§Ù„Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠØ© ÙˆØ§Ù„Ø¹Ø±Ø¨ÙŠØ©.',
      closingCta: 'Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„Ø§ØªØµØ§Ù„ ÙˆÙˆØ§ØªØ³Ø§Ø¨',
    },
  },
  about: {
    sections: {
      tarihce: {
        title: 'Ø§Ù„Ù‡ÙˆÙŠØ© Ø§Ù„Ù…Ø¤Ø³Ø³ÙŠØ© ÙˆØ§Ù„Ø«Ù‚Ø©',
        paragraphs: [
          'Ù…Ù†Ø° Ø¹Ø§Ù… 1987 ÙˆÙ„Ø£ÙƒØ«Ø± Ù…Ù† Ø«Ù„Ø§Ø«Ø© Ø¹Ù‚ÙˆØ¯ØŒ Ù†Ø®Ø¯Ù…ÙƒÙ… Ù…Ø¹ Ø·ÙˆØ±ØºÙˆØª ØªØ´ÙˆØ´ÙƒÙ† ÙˆØ§Ù„Ø£Ø³Ø§ØªØ°Ø© Ø§Ù„Ø°ÙŠÙ† ØªØ¯Ø±Ø¨ÙˆØ§ ÙÙŠ Ø´Ø±ÙƒØªÙ†Ø§. ÙƒØ·ÙˆØ±ØºÙˆØª Ø£ÙˆØ³ØªØ§ Ù„ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø§Ø¨ Ù†Ø¬Ù…Ø¹ Ø¨ÙŠÙ† Ø§Ù„Ù…Ù‡Ø§Ø±Ø© Ø§Ù„ØªÙ‚Ù„ÙŠØ¯ÙŠØ© ÙˆØ§Ù„Ù…Ø¹Ø§ÙŠÙŠØ± Ø§Ù„Ø­Ø¯ÙŠØ«Ø© ÙˆÙ†Ø¶Ø¹ Ø§Ù„ØªÙˆØ§ØµÙ„ Ø§Ù„Ø´ÙØ§Ù ÙˆØ§Ù„Ø¬ÙˆØ¯Ø© Ø§Ù„Ù…Ø³ØªØ¯Ø§Ù…Ø© ÙÙŠ Ø§Ù„Ù…Ù‚Ø¯Ù…Ø©.',
          'Ø¹Ù…Ù„Ù†Ø§ ÙÙŠ Ù…Ø¹Ø¸Ù… Ù…Ø­Ø§ÙØ¸Ø§Øª ØªØ±ÙƒÙŠØ§ Ù„Ø³Ù†ÙˆØ§Øª Ø·ÙˆÙŠÙ„Ø©. ÙƒÙˆÙ†Ù†Ø§ Ù…Ù† Ø§Ù„Ø£Ø³Ù…Ø§Ø¡ Ø§Ù„Ø±Ø§Ø¦Ø¯Ø© ÙÙŠ Ù…Ø¬Ø§Ù„Ù†Ø§ ÙŠØ¯ÙØ¹Ù†Ø§ Ù„Ù„ÙˆÙ‚ÙˆÙ Ø¥Ù„Ù‰ Ø¬Ø§Ù†Ø¨ÙƒÙ… ÙÙŠ Ù…Ø¯Ù† Ù…Ø®ØªÙ„ÙØ© ÙˆØªÙ„Ø¨ÙŠØ© Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø¨Ù†ÙØ³ Ø§Ù„Ø¹Ø²ÙŠÙ…Ø© Ø§Ù„ÙŠÙˆÙ….',
        ],
      },
      yaklasim: {
        title: 'ÙÙ‡Ù…Ù†Ø§ Ù„Ù„Ø¹Ù…Ù„: Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ ÙˆØ§Ù„Ø¥Ù†Ø³Ø§Ù†',
        paragraphs: [
          'Ù…Ù‡Ù…Ø§ ÙƒØ§Ù† Ø§Ù„Ù…ÙˆØ³Ù… Ø£Ùˆ Ø§Ù„Ù…Ø³Ø§ÙØ©ØŒ ØªÙƒÙ…Ù„ ÙØ±Ù‚Ù†Ø§ Ø§Ù„Ø®Ø¨ÙŠØ±Ø© ÙˆÙ…Ø¹Ø¯Ø§ØªÙ†Ø§ Ø§Ù„Ø§Ø­ØªØ±Ø§ÙÙŠØ© Ø¹Ù…Ù„ÙƒÙ… Ø¨Ø£Ø³Ø±Ø¹ ÙˆÙ‚Øª ÙˆØ¨Ø£Ø¹Ù„Ù‰ Ù…Ø¹Ø§ÙŠÙŠØ± Ø§Ù„Ø¬ÙˆØ¯Ø©.',
          'Ù„Ø§ Ù†Ø±Ø§ÙƒÙ… Â«Ø¹Ù…ÙŠÙ„Ø§Ù‹Â» ÙÙ‚Ø· Ø¨Ù„ ØµØ¯ÙŠÙ‚Ø§Ù‹. Ù…Ø¹ Ø£Ø±Ø¨Ø¹ ÙØ±Ù‚ Ù…ØªØ®ØµØµØ© ØªÙ„Ø¨ÙŠ Ø§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø§Ù„Ù‚Ø·Ø§Ø¹ Ø¨ØªØ±ÙƒÙŠØ² Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ØŒ ÙŠÙ…ÙƒÙ†Ù†Ø§ Ø§Ù„ÙˆØµÙˆÙ„ Ø¥Ù„ÙŠÙƒÙ… ÙˆÙ‚ØªÙ…Ø§ ØªØ­ØªØ§Ø¬ÙˆÙ†.',
        ],
      },
      vizyon: {
        title: 'Ø§Ù„Ø±Ø¤ÙŠØ© ÙˆØ§Ù„Ø§Ø¨ØªÙƒØ§Ø±',
        paragraphs: [
          'ÙƒØ·ÙˆØ±ØºÙˆØª Ø£ÙˆØ³ØªØ§ Ù„ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø§Ø¨ Ù†ØªØ§Ø¨Ø¹ Ø§Ù„Ø§ØªØ¬Ø§Ù‡Ø§Øª Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø© ÙˆØªØµØ§Ù…ÙŠÙ… Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ Ø§Ù„Ø­Ø¯ÙŠØ«Ø© Ø¨Ø±Ø¤ÙŠØ© Ø³Ø±ÙŠØ¹Ø© ÙˆÙ…Ø¨Ø¯Ø¹Ø© ÙˆÙ†ÙˆØ§ØµÙ„ ØªÙ‚Ø¯ÙŠÙ… Ù…Ù†ØªØ¬Ø§Øª Ø°Ø§Øª Ù‚ÙŠÙ…Ø© Ù…Ø¶Ø§ÙØ© ÙˆÙØ±ØµØ§Ù‹ Ø¬Ø¯ÙŠØ¯Ø© Ù„Ø¹Ù…Ù„Ø§Ø¦Ù†Ø§.',
        ],
      },
    },
    quote: 'Ø¨Ø§Ù„Ù†Ø³Ø¨Ø© Ù„Ù†Ø§ ÙƒÙ„ Ù‚Ø¨Ø© Ù„ÙŠØ³Øª Ù…Ø¹Ø¯Ù†Ø§Ù‹ ÙˆØ·Ù„Ø§Ø¡ ÙÙ‚Ø·Ø› Ø°Ø§ÙƒØ±Ø© Ù…Ø´ØªØ±ÙƒØ© Ù„Ø³ÙƒØ§Ù† ØªÙ„Ùƒ Ø§Ù„Ù…Ù†Ø·Ù‚Ø©.',
    ctaBand:
      'Ù…Ù† Ø£Ø¯Ø±Ù†Ø© Ø¥Ù„Ù‰ Ù‚Ø§Ø±Ø³ØŒ Ù…Ù† Ø¥Ø³ÙƒÙ†Ø¯Ø±ÙˆÙ† Ø¥Ù„Ù‰ Ù‡ÙˆØ¨Ø§ â€” ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ù„Ø­Ù„ÙˆÙ„ Ù‚ÙŠÙ…Ø© Ù…Ù†Ø§Ø³Ø¨Ø© Ù„Ø§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ ÙˆØ§Ù„Ù‚Ø¨Ø§Ø¨.',
    motion: {
      heroAlt: 'ØµÙˆØ±Ø© Ø¨Ø·Ù„ ØµÙØ­Ø© Ù…Ù† Ù†Ø­Ù†',
      heroKicker: 'Ù…Ø¤Ø³Ø³ÙŠ',
      heroTitle: 'Ù…Ù† Ù†Ø­Ù†',
      heroLeadMid: 'ÙÙŠ Ù…Ø¬Ø§Ù„ {{brandLine}}ØŒ',
      heroLeadSince: 'Ù…Ù†Ø° Ø¹Ø§Ù… 1987',
      heroLeadEnd: 'Ù†ÙˆØ§ØµÙ„ Ø§Ù„ØªÙ‚Ù„ÙŠØ¯ ÙˆØ´Ø¨ÙƒØ© Ø®Ø¯Ù…Ø§Øª Ø¹Ù„Ù‰ Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ø¨Ù„Ø§Ø¯ Ø¥Ù„Ù‰ Ø¬Ø§Ù†Ø¨ÙƒÙ….',
      heroPills: ['Ø«Ù‚Ø© Ù…Ø¤Ø³Ø³ÙŠØ©', 'Ø´Ø­Ù† Ø¹Ù„Ù‰ Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ø¨Ù„Ø§Ø¯', 'ÙØ±Ù‚ Ù…ÙŠØ¯Ø§Ù†ÙŠØ© Ø®Ø¨ÙŠØ±Ø©'],
      mapSectionTitle: 'ÙÙŠ Ø£Ù†Ø­Ø§Ø¡ ØªØ±ÙƒÙŠØ§',
      timelineTitle: 'Ù…Ø­Ø·Ø§Øª Ù…Ù‡Ù…Ø© Ù…Ù†Ø° Ø§Ù„ØªØ£Ø³ÙŠØ³',
      trustTitle: 'Ù„Ù…Ø§Ø°Ø§ ÙŠØ®ØªØ§Ø±Ù†Ø§ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡',
      trustLines: [
        'ÙØ±Ù‚ Ø®Ø¨ÙŠØ±Ø© Ø°Ø§Øª Ø®Ø¨Ø±Ø© Ù…ÙŠØ¯Ø§Ù†ÙŠØ© Ø¹Ø§Ù„ÙŠØ© ÙˆØªØ±ÙƒÙŠØ² Ø¹Ù„Ù‰ Ø§Ù„Ø­Ù„ÙˆÙ„',
        'Ø¥Ø¯Ø§Ø±Ø© Ø¹Ù…Ù„ÙŠØ§Øª Ù…Ù†Ø¸Ù…Ø© Ù„Ù„Ø´Ø­Ù† ÙˆØ§Ù„ØªØ±ÙƒÙŠØ¨ ÙˆØ§Ù„ØªÙˆØ§ØµÙ„',
        'Ø¬ÙˆØ¯Ø© Ù…Ø³ØªØ¯Ø§Ù…Ø© ÙÙŠ Ø§Ù„Ù…ÙˆØ§Ø¯ ÙˆØ§Ù„Ø­Ø±ÙÙŠØ©',
      ],
      processTitle: 'Ø¢Ù„ÙŠØ© Ø¹Ù…Ù„Ù†Ø§',
      processSteps: [
        { n: '01', t: 'Ø§Ù„Ù…Ø³Ø­ ÙˆØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø§Ø­ØªÙŠØ§Ø¬Ø§Øª' },
        { n: '02', t: 'Ø§Ù„Ø¹Ø±Ø¶ ÙˆØ§Ù„ØªØ®Ø·ÙŠØ· Ø§Ù„ÙÙ†ÙŠ' },
        { n: '03', t: 'Ø§Ù„Ø´Ø­Ù† ÙˆØ§Ù„ØªØ­Ø¶ÙŠØ± Ù„Ù„Ù…ÙˆÙ‚Ø¹' },
        { n: '04', t: 'Ø§Ù„ØªÙ†ÙÙŠØ° ÙˆØ§Ù„ØªØ³Ù„ÙŠÙ…' },
      ],
      testimonialsTitle: 'Ø¢Ø±Ø§Ø¡ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡',
      ctaCallQuote: 'Ø§ØªØµÙ„ Ø¨Ù†Ø§ â€” Ø§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¹Ø±Ø¶ Ø³Ø¹Ø±',
      ctaServices: 'Ø®Ø¯Ù…Ø§ØªÙ†Ø§',
      ctaShipments: 'Ø§Ù„Ø´Ø­Ù†',
      backHome: 'Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„Ø±Ø¦ÙŠØ³ÙŠØ©',
      stickyWhatsapp: 'Ø§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¹Ø±Ø¶ Ø³Ø¹Ø±',
      stickyCall: 'Ø§ØªØµØ§Ù„ Ø³Ø±ÙŠØ¹',
      stickyCallWithPhone: 'Ø§ØªØµØ§Ù„ Ø³Ø±ÙŠØ¹ ({{phone}})',
      stats: [
        { value: 500, suffix: '+', label: 'Ù…Ø´Ø±ÙˆØ¹ Ù…ÙƒØªÙ…Ù„' },
        { value: 30, suffix: '+ Ø³Ù†Ø©', label: 'Ø®Ø¨Ø±Ø© Ù…ÙŠØ¯Ø§Ù†ÙŠØ©' },
        { value: 81, label: 'Ù…Ø­Ø§ÙØ¸Ø© Ù†Ø®Ø¯Ù…Ù‡Ø§' },
        { value: 4, label: 'ÙˆØ­Ø¯Ø§Øª ÙØ±Ù‚ Ù…ØªØ®ØµØµØ©' },
      ],
      timeline: [
        {
          year: '1987',
          title: 'Ø§Ù„ØªØ£Ø³ÙŠØ³ ÙˆÙ‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø­Ø±ÙÙŠØ©',
          detail: 'ØªØ£Ø³Ø³Øª Ø§Ù„Ø´Ø±ÙƒØ©Ø› Ø£ÙˆÙ„ ÙØ±ÙŠÙ‚ Ù…Ø±ÙƒØ² Ø¹Ù„Ù‰ ÙƒØ³ÙˆØ© Ø§Ù„Ù‚Ø¨Ø§Ø¨ ÙˆØ§Ù„Ø­Ø±ÙÙŠØ© ÙÙŠ Ø§Ù„Ù…ÙˆÙ‚Ø¹.',
        },
        {
          year: '2000+',
          title: 'Ø´Ø¨ÙƒØ© Ù„ÙˆØ¬Ø³ØªÙŠØ§Øª Ø¹Ù„Ù‰ Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ø¨Ù„Ø§Ø¯',
          detail: 'ØªÙˆØ³Ø¹ ØªÙˆØ±ÙŠØ¯ Ø§Ù„Ù…ÙˆØ§Ø¯ ÙˆØªÙ†Ø³ÙŠÙ‚ Ø§Ù„Ù…ÙˆØ§Ù‚Ø¹ Ù…Ø¹ Ø´Ø­Ù† Ù…Ù†ØªØ¸Ù… Ù„Ù…Ø­Ø§ÙØ¸ Ø¹Ø¯ÙŠØ¯Ø©.',
        },
        {
          year: '2010+',
          title: 'Ù…Ø´Ø§Ø±ÙŠØ¹ ÙƒØ¨ÙŠØ±Ø© Ø§Ù„Ø­Ø¬Ù…',
          detail: 'Ù‚Ø¨Ø§Ø¨ Ù…Ø³Ø§Ø¬Ø¯ ÙˆÙ…Ø¢Ø°Ù† ÙˆØªØ±Ù…ÙŠÙ…Ø§Øª Ù…ÙÙ†Ø¬Ø²Ø© Ø¨Ø¥Ø¯Ø§Ø±Ø© ÙØ±Ù‚ Ù…ØªØ¹Ø¯Ø¯Ø©.',
        },
        {
          year: 'Ø§Ù„ÙŠÙˆÙ…',
          title: 'Ø¬ÙˆØ¯Ø© Ù…Ø³ØªØ¯Ø§Ù…Ø© ÙˆØ³Ø±Ø¹Ø©',
          detail: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ ÙˆØ§Ù„Ø´Ø­Ù† ÙˆØ§Ù„ØªØ±ÙƒÙŠØ¨ Ù…Ù† Ù…Ø±ÙƒØ² ÙˆØ§Ø­Ø¯ Ø¨Ø®Ø¯Ù…Ø© Ù…ÙˆØ«ÙˆÙ‚Ø© ÙˆØ³Ø±ÙŠØ¹Ø© ÙˆØ´ÙØ§ÙØ©.',
        },
      ],
      testimonials: [
        {
          text: 'Ø³Ù„Ù‘Ù…ÙˆØ§ ÙÙŠ Ø§Ù„Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø§Ù„Ù…ØªÙÙ‚ Ø¹Ù„ÙŠÙ‡Ø§ ÙÙŠ Ø§Ù„Ù…ÙˆÙ‚Ø¹. Ø§Ù„ØªÙ†Ø³ÙŠÙ‚ ÙƒØ§Ù† Ø§Ø­ØªØ±Ø§ÙÙŠØ§Ù‹ Ø­Ù‚Ø§Ù‹.',
          person: 'Ø¬Ù…Ø¹ÙŠØ© Ø¨Ù†Ø§Ø¡ Ù…Ø³Ø¬Ø¯',
          city: 'Ù‚Ù‡Ø±Ù…Ø§Ù†Ù…Ø§Ø±Ø§Ø´',
        },
        {
          text: 'ØªØ¬Ø§ÙˆØ²Øª Ø¬ÙˆØ¯Ø© Ø§Ù„Ù…ÙˆØ§Ø¯ ÙˆØ§Ù†Ø¶Ø¨Ø§Ø· Ø§Ù„Ù…ÙˆÙ‚Ø¹ Ø§Ù„ØªÙˆÙ‚Ø¹Ø§Øª. Ø§Ù„Ø¹Ù…Ù„ÙŠØ© ÙƒØ§Ù†Øª Ø´ÙØ§ÙØ© Ù…Ù† Ø§Ù„Ø¨Ø¯Ø§ÙŠØ© Ù„Ù„Ù†Ù‡Ø§ÙŠØ©.',
          person: 'ÙØ±ÙŠÙ‚ ØªØ±Ù…ÙŠÙ…',
          city: 'Ø¥Ø³Ø·Ù†Ø¨ÙˆÙ„',
        },
        {
          text: 'Ø³Ø±Ø¹Ø© Ø§Ù„Ø´Ø­Ù† ÙˆØ§Ù„ØªØ±ÙƒÙŠØ¨ Ø­Ø§ÙØ¸Øª Ø¹Ù„Ù‰ Ø¨Ø±Ù†Ø§Ù…Ø¬Ù†Ø§. Ø§Ù„ØªÙˆØ§ØµÙ„ ÙƒØ§Ù† Ø³Ø±ÙŠØ¹Ø§Ù‹ ÙˆÙ…ÙˆØ¬Ù‡Ø§Ù‹ Ù„Ù„Ø­Ù„.',
          person: 'Ù…Ø³Ø¤ÙˆÙ„ Ù…ÙˆÙ‚Ø¹',
          city: 'Ø¨ÙˆØ±ØµØ©',
        },
        {
          text: 'ÙˆØ¶Ø­ÙˆØ§ ÙƒÙ„ Ø§Ù„ØªÙØ§ØµÙŠÙ„ ÙÙŠ Ø§Ù„Ù…Ø³Ø­ ÙˆØ§Ù„ØªØ®Ø·ÙŠØ· Ø§Ù„ÙÙ†ÙŠØ› Ø³Ø§Ø± Ø§Ù„Ø¹Ù…Ù„ Ø¨Ø³Ù„Ø§Ø³Ø©.',
          person: 'Ù…Ø¬Ù„Ø³ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…Ø³Ø¬Ø¯',
          city: 'Ù‚ÙˆÙ†ÙŠØ©',
        },
        {
          text: 'ØªØ¬Ø§ÙˆØ² ØªÙˆØ±ÙŠØ¯ Ø§Ù„Ø±ØµØ§Øµ ÙˆØ§Ù„ØªÙ†Ø³ÙŠÙ‚ ÙÙŠ Ø§Ù„Ù…ÙˆÙ‚Ø¹ Ø§Ù„ØªÙˆÙ‚Ø¹Ø§Øª. ØªØ³Ù„ÙŠÙ… Ù†Ø¸ÙŠÙ ÙˆÙÙŠ Ø§Ù„ÙˆÙ‚Øª.',
          person: 'ÙØ±ÙŠÙ‚ Ù…Ø´Ø±ÙˆØ¹ ØªØ±Ù…ÙŠÙ…',
          city: 'Ø£Ø¯Ø±Ù†Ø©',
        },
        {
          text: 'Ø­ØªÙ‰ ÙÙŠ Ù…Ø´Ø±ÙˆØ¹ Ø¨Ø¹ÙŠØ¯ Ù„Ù… ÙŠÙ†Ù‚Ø·Ø¹ Ø§Ù„ØªÙˆØ§ØµÙ„Ø› ØªÙØ´Ø§Ø±Ùƒ Ø§Ù„ØµÙˆØ± ÙˆØ§Ù„Ù…Ù„Ø§Ø­Ø¸Ø§Øª Ø¨Ø§Ù†ØªØ¸Ø§Ù….',
          person: 'Ù…Ù…Ø«Ù„ Ø±Ù‚Ø§Ø¨Ø© Ø¨Ù†Ø§Ø¡',
          city: 'ØºØ§Ø²ÙŠ Ø¹ÙŠÙ†ØªØ§Ø¨',
        },
        {
          text: 'Ø±Ø§Ø¶ÙˆÙ† Ø¬Ø¯Ø§Ù‹ Ø¹Ù† Ø§Ù„Ù…Ø¸Ù‡Ø± ÙˆØ§Ù„Ø­Ø±ÙÙŠØ©. ÙØ±ÙŠÙ‚ Ù†Ù†ØµØ­ Ø¨Ù‡.',
          person: 'Ø±Ø¦ÙŠØ³ Ø§Ù„Ø¬Ù…Ø¹ÙŠØ©',
          city: 'Ø£Ù…Ø§Ø³ÙŠØ§',
        },
      ],
    },
  },
  shipments: {
    title: 'Ø§Ù„Ø´Ø­Ù†',
    heroAlt: 'ØµÙˆØ±Ø© Ø¨Ø·Ù„ Ù‚Ø³Ù… Ø§Ù„Ø´Ø­Ù†',
    kicker: 'Ø§Ù„Ù„ÙˆØ¬Ø³ØªÙŠØ§Øª ÙˆØ§Ù„ØªØ³Ù„ÙŠÙ…',
    lead: 'Ø¨Ø¹Ø¯ Ø§Ù„Ø¥Ù†ØªØ§Ø¬ Ù†Ø¯ÙŠØ± Ø§Ù„ØªØ¹Ø¨Ø¦Ø© ÙˆØ§Ù„ØªØ­Ù…ÙŠÙ„ ÙˆØ®Ø·Ø· Ø§Ù„Ø´Ø­Ù† Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ø¯ÙŠÙ†Ø© ÙˆØ¨ÙŠÙ† Ø§Ù„Ù…Ø¯Ù† ÙˆÙÙ‚ Ø¬Ø¯ÙˆÙ„ Ù…Ø´Ø±ÙˆØ¹Ùƒ.',
    photoArchiveTitle: 'ØµÙˆØ± Ø§Ù„Ø´Ø­Ù†',
    photoArchiveLead: 'ØªÙØ³Ù„Ù‘ÙÙ… Ø¬Ù…ÙŠØ¹ Ø§Ù„ØµÙˆØ± Ø¨ØµÙŠØº Ø§Ù„ÙˆÙŠØ¨ ÙˆÙ…Ø­Ù…ÙŠØ© Ø¨Ø¹Ù„Ø§Ù…Ø© Ù…Ø§Ø¦ÙŠØ© Ù„Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ.',
  },
  contact: { mapOpen: 'ÙØªØ­ Ø§Ù„Ø®Ø±ÙŠØ·Ø©' },
  projects: { metaTitle: 'Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹' },
  thanks: { title: 'Ø´ÙƒØ±Ø§Ù‹ Ù„Ùƒ', lead: 'ÙˆØµÙ„ØªÙ†Ø§ Ø±Ø³Ø§Ù„ØªÙƒ.' },
  servicesPage: {
    heroAlt: 'ØµÙˆØ±Ø© Ø¨Ø·Ù„ Ø§Ù„Ø®Ø¯Ù…Ø§Øª',
    kicker: 'Ø®Ø¯Ù…Ø§Øª Ù†Ù‚Ø¯Ù…Ù‡Ø§',
    title: 'Ø®Ø¯Ù…Ø§ØªÙ†Ø§',
    lead: 'Ø§Ø·Ù‘Ù„Ø¹ Ø¹Ù„Ù‰ ÙƒÙ„ Ù…Ø¬Ø§Ù„Ø§Øª Ø§Ù„Ø®Ø¨Ø±Ø© Ù…Ù† ÙƒØ³ÙˆØ© Ù‚Ø¨Ø§Ø¨ Ø§Ù„Ù…Ø³Ø§Ø¬Ø¯ Ø¥Ù„Ù‰ Ø§Ù„Ø´Ø­Ù† ÙˆØ§Ù„ØªØ±ÙƒÙŠØ¨ ÙÙŠ Ø´Ø§Ø´Ø© ÙˆØ§Ø­Ø¯Ø©. Ø§ÙØªØ­ ÙƒÙ„ Ø¨Ù†Ø¯ Ù„Ù„ØªÙØ§ØµÙŠÙ„ Ø­Ø³Ø¨ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹.',
    heroSplitKicker: 'Ø§Ù„Ø®Ø¯Ù…Ø§Øª',
    heroSplitTitle: 'ÙƒØ³ÙˆØ© Ù‚Ø¨Ø© Ø§Ù„Ù…Ø³Ø¬Ø¯',
    heroSplitLead: 'Ø§Ù„ØªØ±ÙƒÙŠØ¨ ÙˆØªÙˆØ±ÙŠØ¯ Ø§Ù„Ù…ÙˆØ§Ø¯ ÙˆÙÙ‚ ØªÙ‚Ø§Ù„ÙŠØ¯ Ø§Ù„Ù‚Ø¨Ø© Ø§Ù„Ø¹Ø«Ù…Ø§Ù†ÙŠØ© Ù…Ø¹ ÙØ±ÙŠÙ‚ Ø·Ø±ØºÙˆØª Ø£Ø³ØªØ§.',
    stat1Label: 'Ø¨Ù†ÙˆØ¯ Ø§Ù„Ø®Ø¯Ù…Ø§Øª',
    stat2Label: 'Ø®Ø¨Ø±Ø© Ù…ÙŠØ¯Ø§Ù†ÙŠØ©',
    stat2Suffix: '+ Ø³Ù†Ø©',
    stat3Label: 'Ù…Ø­Ø§ÙØ¸Ø§Øª Ù†ØºØ·ÙŠÙ‡Ø§',
    cardKicker: 'Ù†Ø¸Ø±Ø© Ø¹Ø§Ù…Ø©',
    detailCta: 'ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø®Ø¯Ù…Ø©',
  },
};

function deepMerge(base, patch) {
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const k of Object.keys(patch)) {
    const pv = patch[k];
    const bv = base[k];
    if (pv !== null && typeof pv === 'object' && !Array.isArray(pv) && bv !== null && typeof bv === 'object' && !Array.isArray(bv)) {
      out[k] = deepMerge(bv, pv);
    } else {
      out[k] = pv;
    }
  }
  return out;
}

const en = deepMerge(tr, enPatch);
const ar = deepMerge(tr, arPatch);

en.lang = tr.lang;
ar.lang = tr.lang;

if (!checkOnly) {
  fs.writeFileSync(path.join(root, 'messages/en.json'), JSON.stringify(en, null, 2) + '\n');
  fs.writeFileSync(path.join(root, 'messages/ar.json'), JSON.stringify(ar, null, 2) + '\n');
  console.log('messages/en.json and messages/ar.json updated');
} else {
  console.log('messages:check-only (no write)');
}

const { ok, problems } = checkEnNotStillTurkish(tr, checkOnly ? JSON.parse(fs.readFileSync(path.join(root, 'messages/en.json'), 'utf8')) : en);
if (!ok) {
  console.error('\n[locale] English strings still match Turkish (update enPatch in scripts/build-en-ar-messages.mjs):\n');
  for (const pr of problems) console.error(`  ${pr.path}  (${pr.reason})`);
  console.error('');
  process.exit(1);
}
if (checkOnly) console.log('messages: EN parity OK');

