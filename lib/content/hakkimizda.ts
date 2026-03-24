/**
 * Hakkımızda metinleri — kurumsal dil + sıcak ton.
 * Kaynak: firma bilgisi (1987’den beri, Turgut Çoşkun ve ekibi, Türkiye geneli).
 */

/** Anasayfa — Hakkımızda özet kutusu (kısaltılmış) */
export const HAKKIMIZDA_TEASER_PARAGRAPHS = [
  '1987’den bu yana otuz yılı aşkın süredir Turgut Çoşkun öncülüğünde, bünyemizde yetişen ustalarla birlikte cami ve kubbe işlerinde hizmet veriyoruz. Türkiye’nin dört bir yanında yürüttüğümüz projelerde; işimizi sadece bir teslimat değil, uzun yıllar sürecek bir güven ilişkisi olarak görüyoruz.',
  'Her müşterimizi, yalnızca bir sipariş sahibi değil; yol arkadaşımız olarak kabul ediyoruz. Yaz–kış, yakın–uzak demeden; uzman kadromuz ve profesyonel ekipmanlarımızla işlerinizi en kısa sürede, en yüksek kaliteyle tamamlıyoruz. Bugüne dek teslim ettiğimiz camiler, ilk günkü sağlamlığını ve estetiğini korumaktadır.',
] as const;

/** Tam sayfa — bölümler (başlık + paragraflar) */
export const HAKKIMIZDA_SECTIONS: {
  id: string;
  title: string;
  paragraphs: string[];
}[] = [
  {
    id: 'tarihce',
    title: 'Kurumsal kimlik ve güven',
    paragraphs: [
      '1987 yılından bu yana otuz yılı aşkın süredir Turgut Çoşkun öncülüğünde, bünyemizde yetişen ustalarla birlikte siz değerli müşterilerimize hizmet sunuyoruz. Turgut Usta Kubbe Kaplama olarak, geleneksel ustalığı çağdaş standartlarla birleştiriyor; her projede şeffaf iletişim ve sürdürülebilir kaliteyi ön planda tutuyoruz.',
      'Uzun yıllardır Türkiye’nin hemen hemen her ilinde faaliyet gösterdik. Yaptığımız işlerde sektörün önde gelen isimlerinden biri olmamız, sizi farklı illerde yan yana görmeye ve tüm ihtiyaçlarınızı karşılamaya bugün de aynı kararlılıkla devam etmemizi sağlıyor. 1987’den bu yana teslim ettiğimiz camiler, ilk günkü gibi pırıl pırıl durmaktadır. Alüminyum kubbe ve cephe sistemlerini Türkiye’nin birçok ilinde önce tanıttık, ardından uyguladık.',
    ],
  },
  {
    id: 'yaklasim',
    title: 'İş anlayışımız: proje odaklı, insan odaklı',
    paragraphs: [
      'Yaz kışı, yakın veya uzak mesafeyi gözet etmeyerek; alanında uzman kadromuz ve profesyonel ekipmanlarımızla işlerinizi en hızlı sürede, en yüksek kalite standartlarında tamamlıyoruz.',
      'Sizi yalnızca “müşteri” olarak değil, bir dost olarak görmekteyiz. Tüm işlerimize proje odaklı yaklaşımımızla sektörün ihtiyaç ve beklentilerini karşılayan dört ayrı uzman ekibimizle, dilediğiniz zaman size ulaşabilecek kapasitedeyiz.',
    ],
  },
  {
    id: 'vizyon',
    title: 'Vizyon ve yenilik',
    paragraphs: [
      'Turgut Usta Kubbe Kaplama olarak çözüm üreten, hızlı ve yaratıcı vizyonumuzla; yeni eğilimleri ve modern cami tasarımlarını yakından takip ederek katma değer yaratacak ürünleri kullanıcılarımızla buluşturmayı ve yeni açılımlar yaratmayı sürdürüyoruz.',
    ],
  },
];

/** Vurgu alıntısı — insanî ton */
export const HAKKIMIZDA_QUOTE =
  'Bizim için her kubbe, sadece metal ve boya değil; o bölgede yaşayan insanların birlikte yaşadığı bir hatıradır. Bu yüzden işlerimizi hem teknik disiplinle hem de gönül borcuyla yürütüyoruz.';

/** Alt CTA bandı */
export const HAKKIMIZDA_CTA =
  'Edirne’den Kars’a, İskenderun’dan Hopa’ya — cami ve kubbe ihtiyaçlarınız için uygun fiyatlı çözümler için bizimle iletişime geçebilirsiniz.';

export const HAKKIMIZDA_META_DESCRIPTION =
  '1987’den beri Turgut Çoşkun Kubbe Kaplama: Türkiye geneli cami ve kubbe işleri, uzman ustalar, proje odaklı hizmet. Hakkımızda.';
