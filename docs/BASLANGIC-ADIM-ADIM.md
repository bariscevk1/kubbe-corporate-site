# Sıfırdan: Adım adım ne yapmalıyım?

Bu sayfa **hiç bilmeyen** biri için yazıldı. Sırayı bozmayın.

---

## Önce 3 kelime

| Kelime | Basit anlamı |
|--------|----------------|
| **Sanity** | İçeriği (metin, resim, ayarlar) saklayan **bulut** servisi. Buradan “admin paneli” gibi düzenlersiniz. |
| **Next.js (bu proje)** | Ziyaretçinin gördüğü **web sitesi**. İçeriği Sanity’den okuyup sayfada gösterir. |
| **Studio** | Tarayıcıda açılan **düzenleme ekranı** (`/studio`). Burası Sanity’nin arayüzü. |

**Özet:** İçeriği **Sanity’de** değiştirirsiniz; site **Next.js** ile o içeriği gösterir.

---

## ADIM 1 — Sanity’de hesap ve proje (internet tarayıcısı)

1. Tarayıcıda açın: **https://www.sanity.io**
2. **Sign up** ile ücretsiz hesap açın (Google ile de olur).
3. Giriş yaptıktan sonra **yeni proje oluşturun** (Create project / New project benzeri).
4. Proje oluşunca ekranda şunları görürsünüz veya **Project settings** içinden bulursunuz:
   - **Project ID** → kısa bir kod (örnek: `abc123xy`)
   - **Dataset** → çoğu zaman **`production`** yazılıdır

**Şimdi yapmanız gereken:** Project ID’yi bir yere not edin (Not Defteri yeter).

---

## ADIM 2 — Bilgisayarda proje klasörü

1. Bu sitenin kodları proje klasörünüzde (GitHub depo adı: **`kubbe-kurumsal-site`**).  
   Tam yol örneği: `Masaüstü\feramuz\kubbe-corporate-site` veya klon sonrası `...\kubbe-kurumsal-site` — `cd` yaparken **kendi klasör adınızı** kullanın.

2. Bu klasörün **içinde** `.env.local` adında **yeni bir dosya** oluşturun.  
   - Windows’ta: Not Defteri ile açın, **Farklı Kaydet** → dosya adı: `.env.local` (tırnak olmadan; bazen “tüm dosyalar” seçmeniz gerekir).

3. `.env.example` dosyasını açıp **içeriği kopyalayın** `.env.local` içine.

4. `.env.local` içinde şu satırları **kendi bilginize göre doldurun**:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=BURAYA_ADIM1_NOT_ALDIGINIZ_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_REVALIDATE_SECRET=BURAYA_UZUN_BIR_SIFRE_YAZIN
```

**`SANITY_REVALIDATE_SECRET` nedir?**  
Sizin uydurduğunuz **gizli bir şifre** (örnek: rastgele harf+rakam, en az 32 karakter). Kimseyle paylaşmayın. İleride webhook’ta kullanılacak.

**Kaydedin** dosyayı.

---

## ADIM 3 — Terminalde kurulum ve çalıştırma

1. **Windows’ta PowerShell** veya **Komut İstemi** açın.

2. Proje klasörüne gidin (yol sizinkiyle aynı olmalı):

```text
cd C:\Users\Baris\Desktop\feramuz\kubbe-corporate-site
```

*(Klasör adınız `kubbe-kurumsal-site` ise yolun sonundaki klasör adını ona çevirin.)*

3. Bir kez paketleri kurun:

```text
npm install
```

4. Geliştirme sunucusunu başlatın:

```text
npm run dev
```

5. Ekranda şuna benzer bir yazı görürsünüz: `Local: http://localhost:3000`  
   **Bu pencereyi kapatmayın** — site çalışırken açık kalsın.

---

## ADIM 4 — Studio’ya (admin paneli) girmek

1. Tarayıcıda açın: **http://localhost:3000/studio**

2. İlk seferde Sanity sizden **giriş** isteyebilir — ADIM 1’deki hesapla giriş yapın.

3. Sol menüde şema tipleri görünür (örnek: Genel Ayarlar, Hizmetler, …).  
   Buradan içerik **ekleyip kaydedersiniz**.

**Önemli:** “Genel Ayarlar” ve “Reklam / Script” gibi şeyler için **aynı tipten sadece 1 kayıt** tutmak en temizidir (birden fazla eklerseniz hangisinin kullanılacağı koda bağlıdır).

---

## ADIM 5 — Sitenin kendisini görmek

1. Yeni sekmede açın: **http://localhost:3000**

2. İçerik girdikçe (örneğin sevkiyat videoları) ilgili sayfalar güncellenir.  
   Bazen sayfayı **yenilemeniz (F5)** gerekir.

---

## ADIM 6 — “Yayınladım ama sitede hemen görünmüyor” (internet sitesi canlıdayken)

Bu adım **sadece site internete yüklendikten sonra** gerekir (Vercel, Netlify vb.).

1. Hosting panelinde **Environment Variables** bölümüne gidin.

2. Bilgisayarınızdaki `.env.local` ile **aynı** değişkenleri yazın, özellikle:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_REVALIDATE_SECRET` (**.env.local’deki ile birebir aynı**)

3. Sanity panelinde: **API → Webhooks** → **Create webhook**:
   - **URL:** `https://SIZIN-ALAN-ADINIZ.com/api/revalidate?secret=BURAYA_AYNI_SANITY_REVALIDATE_SECRET`
   - **HTTP method:** POST  
   - Tetikleyiciler: Create, Update, Delete (içerik değişince)

Böylece içerik kaydettiğinizde site **önbelleği temizlenir** ve kısa sürede yeni içerik görünür.

---

## Takıldığınız yerde kontrol listesi

| Sorun | Ne kontrol edilir? |
|--------|----------------------|
| Studio açılmıyor | `npm run dev` çalışıyor mu? `.env.local` doğru klasörde mi? |
| “Project ID” hatası | ID’de yazım hatası var mı? Tırnak kullanmayın. |
| İçerik görünmüyor | Studio’da **Publish** (yayınla) yaptınız mı? Sayfayı yenilediniz mi? |
| Canlı sitede güncellenmiyor | Hosting’e env değişkenleri girdi mi? Webhook URL’si ve `secret` doğru mu? |

---

## Daha teknik özet (isteğe bağlı)

- Ayrıntılı modül tablosu: `docs/CMS-SANITY.md`
- Ortam değişkeni şablonu: `.env.example`

Sorun yaşadığınız **tam adım numarasını** söylerseniz (ör. “Adım 3’te hata”), o adıma odaklanıp net cevap verilebilir.
