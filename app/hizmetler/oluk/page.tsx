import type { Metadata } from 'next';
import { ContactCtaBlock } from '@/components/ContactCtaBlock';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';
import { HIZMET_PAGE_METADATA } from '@/lib/seo/service-metadata';

export const metadata: Metadata = HIZMET_PAGE_METADATA.oluk;

export default function OlukPage() {
  return (
    <main className="service-detail-page site-subpage-light min-h-screen bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/hizmetler/oluk-satis-montaj.webp"
        imageAlt="Çatı oluk ve düşen boru montajı"
        title="Oluk Satışı ve Montajı"
        kicker="Hizmet"
        subtitle="Turgut Usta ekibiyle yagmur suyu tahliyesi icin Turkiye geneli satis ve montaj."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-5 leading-relaxed text-slate-300">
          <p>
            Yağmur suyunu güvenli şekilde tahliye etmek, kubbe ve çatı bütünlüğünü korumak için oluk hattı kritik
            bir detaydır. Eksiz oluk satışımız devam etmekte; her ile gönderim yapıyor, talep ettiğinizde montajını
            da üstleniyoruz.
          </p>

          <p>
            Özellikle <strong>alüminyum kubbe kaplama</strong> projelerinde oluk sistemini aynı ekip mantığıyla
            planlayarak, çatı hattında uyumlu ve sızdırmaz bir çözüm sunmayı hedefliyoruz. Böylece hem görsel
            bütünlük korunur hem de uzun vadede suyun yapıya zarar vermesi engellenir.
          </p>

          <p>
            <strong>Beyaz</strong> ve <strong>kırmızı</strong> renk seçeneklerimiz mevcuttur. Projenin cephe rengine,
            kubbe rengine ve uygulama detaylarına göre doğru profili birlikte seçeriz.
          </p>

          <p>
            Oluk metrajı, düşen boru yönlendirmesi ve bağlantı noktaları için keşif sonrası netleşen bir montaj
            planı paylaşırız. Detaylı bilgi ve fiyat için iletişim kanallarımızdan bize ulaşabilirsiniz.
          </p>
        </div>
        <ContactCtaBlock />
      </div>
    </main>
  );
}
