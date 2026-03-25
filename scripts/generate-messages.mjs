import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const trPath = path.join(root, 'messages', 'tr.json');

const tr = {
  lang: { tr: 'TR', en: 'EN', ar: 'AR' },
  nav: {
    home: 'Anasayfa',
    about: 'HakkÄ±mÄ±zda',
    services: 'Hizmetler',
    projects: 'Projelerimiz',
    shipments: 'Sevkiyatlar',
    contact: 'Ä°letiÅŸim',
    service_categories: 'Hizmet kalemleri',
  },
  services: {
    all: 'TÃ¼m hizmetler',
    kubbe: 'Camii kubbe kaplama',
    aluminyumSatis: 'AlÃ¼minyum satÄ±ÅŸÄ±',
    aluminyumKubbe: 'AlÃ¼minyum kubbe kaplama',
    bakir: 'BakÄ±r levha & kubbe',
    kursun: 'KurÅŸun levha satÄ±ÅŸÄ±',
    nakkas: 'Camii nakkaÅŸ ve sÃ¼sleme',
    alemler: 'Camii alemleri',
    oluk: 'Oluk satÄ±ÅŸÄ± ve montajÄ±',
  },
  ui: { language: 'Dil', close: 'Kapat', menu: 'MenÃ¼' },
  mobileBar: { call: 'Hemen Ara', whatsapp: 'WhatsApp' },
  footer: {
    link_about: 'HakkÄ±mÄ±zda',
    link_services: 'Hizmetler',
    link_kubbe: 'Kubbe kaplama',
    link_oluk: 'Oluk',
    link_alemler: 'Alemler',
    link_contact: 'Ä°letiÅŸim',
    mapLink: 'Haritada bul',
    blurb:
      'Ankara merkez Â· <strong class="font-medium text-slate-400">TÃ¼rkiye geneli</strong> montaj ve sevkiyat Â· <strong class="font-medium text-slate-400">7/24</strong> telefon & WhatsApp Â· KÃ¶rfez ve Arap Ã¼lkeleri projeleri (EN/AR iletiÅŸim) Â· TÃ¼m yaÅŸ gruplarÄ±na kurumsal hizmet',
    rights: 'TÃ¼m haklarÄ± saklÄ±dÄ±r.',
  },
  seo: {
    home: {
      title: 'Anasayfa',
      description:
        'TÃ¼rkiye genelinde camii kubbe kaplama, alÃ¼minyum ve bakÄ±r kubbe, oluk ve nakkaÅŸ iÅŸleri. Kurumsal ekip, sevkiyat ve montaj.',
    },
    about: {
      title: 'HakkÄ±mÄ±zda',
      description:
        '1987â€™den beri Turgut Ã‡oÅŸkun Kubbe Kaplama: TÃ¼rkiye geneli cami ve kubbe iÅŸleri, uzman ustalar, proje odaklÄ± hizmet.',
    },
    services: {
      title: 'Hizmetler',
      description:
        'Camii kubbe kaplama, alÃ¼minyum satÄ±ÅŸÄ± ve kubbe kaplama, bakÄ±r ve kurÅŸun levha, nakkaÅŸ, camii alemleri ve oluk sistemleri.',
    },
    contact: {
      title: 'Ä°letiÅŸim',
      description: 'Telefon, WhatsApp ve adres. Kubbe kaplama ve metal iÅŸleri iÃ§in teklif ve bilgi talebi.',
    },
    projects: { title: 'Projeler', description: 'Tamamlanan ve sÃ¼ren referans projelerimiz.' },
    shipments: {
      title: 'Sevkiyatlar',
      description: 'Paketleme, yÃ¼kleme ve TÃ¼rkiye geneli sevkiyat sÃ¼reÃ§leri.',
    },
    thanks: { title: 'TeÅŸekkÃ¼rler', description: 'MesajÄ±nÄ±z alÄ±ndÄ±.' },
  },
  home: {
    hero: {
      leftTitle: 'TÃ¼rkiye genelinde camii kubbe kaplama ve metal Ã§atÄ± uzmanlÄ±ÄŸÄ±',
      leftSubtitle:
        'BakÄ±r ve alÃ¼minyum kubbe, alem, oluk ve nakkaÅŸ sÃ¼sleme uygulamalarÄ±nda sahada disiplinli ekip, ÅŸeffaf sÃ¼reÃ§ ve uzun Ã¶mÃ¼rlÃ¼ iÅŸÃ§ilik sunuyoruz.',
      rightTitle: 'ReferanslarÄ±mÄ±zla sÄ±nÄ±rlarÄ±mÄ±zÄ± geniÅŸletiyoruz',
      rightSubtitle:
        'Ankara merkezli operasyonumuzla Ã¼lke genelinde teslim ettiÄŸimiz projelerde montaj, sevkiyat ve teknik danÄ±ÅŸmanlÄ±kta aynÄ± kurumsal standardÄ± koruyoruz.',
      logoAlt: 'Turgut CoÅŸkun Kubbe Kaplama',
      kickerBadge1: 'Kurumsal Proje StandardÄ±',
      kickerBadge2: 'TÃ¼rkiye geneli uygulama',
      ctaQuote: 'Hemen Teklif Al',
      ctaWhatsapp: "WhatsApp'tan Yaz",
      signatureLine1: 'Turgut Usta',
      signatureLine2:
        'Kubbe kaplama, alem ve oluk uygulamalarÄ±nda kurumsal disiplin ve uzun Ã¶mÃ¼rlÃ¼ iÅŸÃ§ilik.',
      callCta: 'Hemen ArayÄ±n',
      colCtaServices: 'Hizmetlerimiz',
      colCtaProjects: 'Projelerimizi inceleyin',
    },
    services: {
      kicker: 'Neler sunuyoruz',
      title: 'Hizmetlerimiz',
      leadBefore: 'AÅŸaÄŸÄ±da Ã¶zetlediÄŸimiz iÅŸ kalemleri Ã¼zerinde uzmanlaÅŸtÄ±k; detaylÄ± anlatÄ±m ve gÃ¶rseller ',
      leadLink: 'hizmetler',
      leadAfter: ' sayfamÄ±zda yer alacaktÄ±r.',
      viewAll: 'TÃ¼mÃ¼nÃ¼ gÃ¶r',
      detailCta: 'Detaylar',
      grid: {
        'camii-kubbe': {
          title: 'Camii kubbe kaplama',
          description: 'BakÄ±r, kurÅŸun ve alÃ¼minyum ile kubbe kaplama ve restorasyonu.',
          imageAlt: 'Kubbe Ã¼zerinde alem ile camii kubbe kaplama â€” mimari fotoÄŸraf',
        },
        'aluminyum-satis': {
          title: 'AlÃ¼minyum satÄ±ÅŸÄ±',
          description: 'YÃ¼ksek kalite levha ve profil; proje Ã¶lÃ§Ã¼lerinize uygun tedarik.',
          imageAlt: 'AlÃ¼minyum renk ve malzeme numuneleri yelpazesi',
        },
        'aluminyum-kubbe': {
          title: 'AlÃ¼minyum kubbe kaplama',
          description: 'Hafif ve dayanÄ±klÄ± alÃ¼minyum ile kubbe ve Ã§atÄ± uygulamalarÄ±.',
          imageAlt: 'AlÃ¼minyum kaplÄ± camii kubbesi ve altÄ±n alem â€” havadan Ã§ekim',
        },
        'bakir-kubbe': {
          title: 'BakÄ±r kubbe kaplama',
          description: 'Geleneksel bakÄ±r iÅŸÃ§iliÄŸi ile uzun Ã¶mÃ¼rlÃ¼ kubbe yÃ¼zeyleri.',
          imageAlt: 'Parlak bakÄ±r kaplÄ± kubbe ve beyaz kaide â€” bakÄ±r kubbe kaplama',
        },
        'kursun-levha': {
          title: 'KurÅŸun levha satÄ±ÅŸÄ±',
          description: 'Su yalÄ±tÄ±mÄ± ve Ã¶rtÃ¼ uygulamalarÄ± iÃ§in kurÅŸun levha temini.',
          imageAlt: 'Metal levha ve Ã¼rÃ¼n satÄ±ÅŸÄ± â€” endÃ¼striyel tedarik',
        },
        nakkas: {
          title: 'Camii nakkaÅŸ ve sÃ¼sleme',
          description: 'Ä°Ã§ ve dÄ±ÅŸ mekÃ¢nda geleneksel sÃ¼sleme ve nakkaÅŸ iÅŸleri.',
          imageAlt: 'Camii iÃ§i nakkaÅŸ sÃ¼sleme â€” geometrik motifler',
        },
        alemler: {
          title: 'Camii alemleri',
          description: 'TasarÄ±m, Ã¼retim ve montaj ile alemi Ã§Ã¶zÃ¼mleri.',
          imageAlt: 'AltÄ±n renkli camii alemleri â€” hilal tepeli sÃ¼slemeler',
        },
        oluk: {
          title: 'Oluk satÄ±ÅŸÄ± ve montajÄ±',
          description: 'YaÄŸmur suyu yÃ¶netimi iÃ§in oluk sistemleri.',
          imageAlt: 'Metal oluk montajÄ± ve cephe detayÄ±',
        },
      },
    },
    aboutTeaser: {
      kicker: 'Biz kimiz?',
      heading: 'HakkÄ±mÄ±zda',
      p1:
        '{{company}} â€” 1987â€™den bu yana otuz yÄ±lÄ± aÅŸkÄ±n sÃ¼redir Turgut Ã‡oÅŸkun Ã¶ncÃ¼lÃ¼ÄŸÃ¼nde, bÃ¼nyemizde yetiÅŸen ustalarla birlikte cami ve kubbe iÅŸlerinde hizmet veriyoruz. TÃ¼rkiyeâ€™nin dÃ¶rt bir yanÄ±nda yÃ¼rÃ¼ttÃ¼ÄŸÃ¼mÃ¼z projelerde; iÅŸimizi sadece bir teslimat deÄŸil, uzun yÄ±llar sÃ¼recek bir gÃ¼ven iliÅŸkisi olarak gÃ¶rÃ¼yoruz.',
      p2: 'Her mÃ¼ÅŸterimizi, yalnÄ±zca bir sipariÅŸ sahibi deÄŸil; yol arkadaÅŸÄ±mÄ±z olarak kabul ediyoruz. Yazâ€“kÄ±ÅŸ, yakÄ±nâ€“uzak demeden; uzman kadromuz ve profesyonel ekipmanlarÄ±mÄ±zla iÅŸlerinizi en kÄ±sa sÃ¼rede, en yÃ¼ksek kaliteyle tamamlÄ±yoruz.',
      badge: 'Kubbe & geleneksel mimari',
      storyCta: 'Kurumsal hikayemiz',
      storyCtaSr: '(HakkÄ±mÄ±zda sayfasÄ±nda tam metin)',
      contactCta: 'Ä°letiÅŸime geÃ§in',
      imageAlt: 'YeÅŸil kubbeli cami â€” geleneksel mimari referans',
    },
    stats: {
      heading: 'BaÅŸarÄ± rakamlarÄ±mÄ±z',
      items: {
        calismalar: { label: 'Ã‡alÄ±ÅŸmalar' },
        yapim: { label: 'YapÄ±m aÅŸamasÄ±ndaki projeler' },
        musteri: { label: 'Memnun mÃ¼ÅŸteriler' },
        toplam: { label: 'Toplam proje' },
      },
    },
    values: {
      heading: 'DeÄŸerlerimiz',
      subtitle: 'MÃ¼kemmelliÄŸin sÃ¼tunlarÄ±',
      items: {
        kalite: {
          title: 'Kalite & uzmanlÄ±k',
          body: 'Ã‡izimden montaja her aÅŸamada yÃ¼ksek standart; malzeme ve iÅŸÃ§ilikte tek kalite anlayÄ±ÅŸÄ±.',
        },
        deneyim: {
          title: 'YÄ±llarÄ±n deneyimi',
          body: "1987'den beri nesillerden gelen zanaatkarlÄ±k ve zamana dayanan projeler.",
        },
        guven: {
          title: 'GÃ¼ven & garanti',
          body: 'YazÄ±lÄ± garanti ve ÅŸeffaf sÃ¼reÃ§; mÃ¼ÅŸteri memnuniyeti imzamÄ±zdÄ±r.',
        },
        teslimat: {
          title: 'ZamanÄ±nda teslimat',
          body: 'TaahhÃ¼t edilen sÃ¼rede eksiksiz teslim; planlÄ± Ã¼retim ve profesyonel lojistik.',
        },
      },
    },
    map: {
      kicker: 'TÃ¼rkiye genelinde referans',
      titleAccent: 'bizden izler',
      listTab: 'Projeler',
      mapTab: 'Harita',
      mapHint:
        'GÃ¶rÃ¼nÃ¼m yalnÄ±zca TÃ¼rkiye ile sÄ±nÄ±rlÄ±; dÃ¼nyayÄ± kaydÄ±ramazsÄ±nÄ±z. Filtreyi deÄŸiÅŸtirince harita yeniden tÃ¼m Ã¼lkeye odaklanÄ±r.',
      loading: 'TÃ¼rkiye referans katmanÄ± hazÄ±rlanÄ±yorâ€¦',
      listHeading: 'TÃ¼rkiye geneli projeler',
      cardAria: 'TÃ¼rkiye referans gÃ¶rÃ¼nÃ¼mÃ¼',
      allProjects: 'TÃ¼m projeler',
      category: {
        kubbe: 'Kubbe kaplama',
        nakkas: 'NakkaÅŸ sÃ¼sleme',
        oluk: 'Oluk satÄ±ÅŸÄ± ve montajÄ±',
        diger: 'DiÄŸer / sevkiyat',
      },
      imageSoon: 'GÃ¶rsel yakÄ±nda',
    },
    keywords: {
      heading: 'Google Ads ile uyumlu hizmet alanlarÄ±mÄ±z',
      closingTitle: 'UluslararasÄ± projeler',
      closingLead:
        'Ä°ngilizce ve ArapÃ§a iletiÅŸim seÃ§enekleriyle KÃ¶rfez ve bÃ¶lge projelerinde koordinasyon.',
      closingCta: 'Ä°letiÅŸim formu ve WhatsApp',
    },
  },
  about: {
    sections: {
      tarihce: {
        title: 'Kurumsal kimlik ve gÃ¼ven',
        paragraphs: [
          '1987 yÄ±lÄ±ndan bu yana otuz yÄ±lÄ± aÅŸkÄ±n sÃ¼redir Turgut Ã‡oÅŸkun Ã¶ncÃ¼lÃ¼ÄŸÃ¼nde, bÃ¼nyemizde yetiÅŸen ustalarla birlikte siz deÄŸerli mÃ¼ÅŸterilerimize hizmet sunuyoruz. Turgut Usta Kubbe Kaplama olarak, geleneksel ustalÄ±ÄŸÄ± Ã§aÄŸdaÅŸ standartlarla birleÅŸtiriyor; her projede ÅŸeffaf iletiÅŸim ve sÃ¼rdÃ¼rÃ¼lebilir kaliteyi Ã¶n planda tutuyoruz.',
          'Uzun yÄ±llardÄ±r TÃ¼rkiyeâ€™nin hemen hemen her ilinde faaliyet gÃ¶sterdik. YaptÄ±ÄŸÄ±mÄ±z iÅŸlerde sektÃ¶rÃ¼n Ã¶nde gelen isimlerinden biri olmamÄ±z, sizi farklÄ± illerde yan yana gÃ¶rmeye ve tÃ¼m ihtiyaÃ§larÄ±nÄ±zÄ± karÅŸÄ±lamaya bugÃ¼n de aynÄ± kararlÄ±lÄ±kla devam etmemizi saÄŸlÄ±yor.',
        ],
      },
      yaklasim: {
        title: 'Ä°ÅŸ anlayÄ±ÅŸÄ±mÄ±z: proje odaklÄ±, insan odaklÄ±',
        paragraphs: [
          'Yaz kÄ±ÅŸÄ±, yakÄ±n veya uzak mesafeyi gÃ¶zetmeyerek; alanÄ±nda uzman kadromuz ve profesyonel ekipmanlarÄ±mÄ±zla iÅŸlerinizi en hÄ±zlÄ± sÃ¼rede, en yÃ¼ksek kalite standartlarÄ±nda tamamlÄ±yoruz.',
          'Sizi yalnÄ±zca â€œmÃ¼ÅŸteriâ€ olarak deÄŸil, bir dost olarak gÃ¶rmekteyiz. TÃ¼m iÅŸlerimize proje odaklÄ± yaklaÅŸÄ±mÄ±mÄ±zla sektÃ¶rÃ¼n ihtiyaÃ§ ve beklentilerini karÅŸÄ±layan dÃ¶rt ayrÄ± uzman ekibimizle, dilediÄŸiniz zaman size ulaÅŸabilecek kapasitedeyiz.',
        ],
      },
      vizyon: {
        title: 'Vizyon ve yenilik',
        paragraphs: [
          'Turgut Usta Kubbe Kaplama olarak Ã§Ã¶zÃ¼m Ã¼reten, hÄ±zlÄ± ve yaratÄ±cÄ± vizyonumuzla; yeni eÄŸilimleri ve modern cami tasarÄ±mlarÄ±nÄ± yakÄ±ndan takip ederek katma deÄŸer yaratacak Ã¼rÃ¼nleri kullanÄ±cÄ±larÄ±mÄ±zla buluÅŸturmayÄ± ve yeni aÃ§Ä±lÄ±mlar yaratmayÄ± sÃ¼rdÃ¼rÃ¼yoruz.',
        ],
      },
    },
    quote: 'Bizim iÃ§in her kubbe, sadece metal ve boya deÄŸil; o bÃ¶lgede yaÅŸayan insanlarÄ±n birlikte yaÅŸadÄ±ÄŸÄ± bir hatÄ±radÄ±r.',
    ctaBand:
      'Edirneâ€™den Karsâ€™a, Ä°skenderunâ€™dan Hopaâ€™ya â€” cami ve kubbe ihtiyaÃ§larÄ±nÄ±z iÃ§in uygun fiyatlÄ± Ã§Ã¶zÃ¼mler iÃ§in bizimle iletiÅŸime geÃ§ebilirsiniz.',
  },
  shipments: {
    title: 'Sevkiyatlar',
    heroAlt: 'Sevkiyatlar hero gÃ¶rseli',
    kicker: 'Lojistik ve teslimat',
    lead: 'Ãœretim sonrasÄ± paketleme, yÃ¼kleme ve ÅŸehir iÃ§i / ÅŸehirler arasÄ± sevkiyat planlamasÄ±nÄ± proje takviminize uygun ÅŸekilde yÃ¶netiyoruz.',
    photoArchiveTitle: 'Sevkiyat fotoÄŸraflarÄ±',
    photoArchiveLead: 'TÃ¼m fotoÄŸraflar web formatÄ±nda sunulur ve telefon numarasÄ± filigranÄ± ile korunur.',
  },
  contact: {
    mapOpen: 'HaritayÄ± aÃ§',
  },
  projects: {
    metaTitle: 'Projeler',
  },
  thanks: {
    title: 'TeÅŸekkÃ¼r ederiz',
    lead: 'MesajÄ±nÄ±z bize ulaÅŸtÄ±.',
  },
};

function deepPlaceholder(obj) {
  if (obj === null || typeof obj === 'number' || typeof obj === 'boolean') return obj;
  if (typeof obj === 'string') return `[TODO: ${obj.slice(0, 24)}â€¦]`;
  if (Array.isArray(obj)) return obj.map(deepPlaceholder);
  const o = {};
  for (const [k, v] of Object.entries(obj)) {
    o[k] = deepPlaceholder(v);
  }
  return o;
}

const en = deepPlaceholder(JSON.parse(JSON.stringify(tr)));
const ar = deepPlaceholder(JSON.parse(JSON.stringify(tr)));
// restore lang codes
en.lang = { tr: 'TR', en: 'EN', ar: 'AR' };
ar.lang = { tr: 'TR', en: 'EN', ar: 'AR' };

fs.mkdirSync(path.join(root, 'messages'), { recursive: true });
fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(path.join(root, 'messages', 'en.json'), JSON.stringify(en, null, 2));
fs.writeFileSync(path.join(root, 'messages', 'ar.json'), JSON.stringify(ar, null, 2));
console.log('messages generated');

