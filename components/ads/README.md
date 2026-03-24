# Reklam & dönüşüm scriptleri

- **Otomatik gtag:** `GtagSlot` — `.env.local` içinde `NEXT_PUBLIC_GOOGLE_ADS_ID` / `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- **Manuel snippet (AdresGezgini vb.):** `app/layout.tsx` içinde `next/script` import edip `<body>` içine ekleyin:

```tsx
import Script from 'next/script';

<Script id="conversion-xxx" strategy="afterInteractive">
  {`// panelden yapıştırılan kod`}
</Script>
```
