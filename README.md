# Tebliğ Rehberi

İslam'ı **sade, hikmetli ve zarif** bir dille anlatmaya yardımcı, çok dilli ve
çevrimdışı çalışan bir mobil rehber. React Native + Expo + TypeScript ile
geliştirilmiştir.

> **Telif yaklaşımı:** Uygulamadaki tüm metinler, temel İslami kaynaklardan
> hareketle **özgün** olarak hazırlanmış kısa eğitim içerikleridir. Yüklenen
> kaynak kitaplardan **hiçbir metin aynen alınmamış, tercüme edilmemiş** ve
> kitap dosyaları uygulamaya **gömülmemiştir**. Kitaplar yalnızca "kaynakça"
> bölümünde anılır. Bkz. `src/utils/copyrightSafety.ts`.

---

## Gereksinimler

- **Node.js 20 LTS** önerilir (18+ çalışır).
- Telefonunuzda **Expo Go** uygulaması (App Store / Google Play) veya bir
  iOS Simülatörü / Android Emülatörü.

## Kurulum

> Expo **SDK 54** (React 19, React Native 0.81). Tüm import'lar **göreli**dir
> (alias yok). Proje klasör adı **ASCII** olmalıdır (Türkçe karakter/boşluk
> içermemeli); aksi halde geliştirme sunucusu bazı yollarda hata verebilir.

```bash
# Ortam değişkenleri şablonunu oluşturun
cp .env.example .env

# Bağımlılıkları yükleyin (.npmrc'deki legacy-peer-deps ayarı kullanılır)
npm install

# Geliştirme sunucusunu başlatın
npx expo start
```

`expo start` çalıştıktan sonra:

- Telefonda **Expo Go** ile ekrandaki **QR kodu** okutun, veya
- terminalde **i** (iOS simülatörü) ya da **a** (Android emülatörü) tuşuna basın.

> İlk açılışta dil seçer, kısa telif notunu görür ve "Başla" ile devam edersiniz.

## Komutlar

```bash
npm run start      # expo start
npm run android    # Android'de aç
npm run ios        # iOS'ta aç
npm run lint       # tsc --noEmit (tür kontrolü)
```

## Ortam Değişkenleri

`.env.example` repoda güvenli şablon olarak tutulur. Gerçek `.env` dosyası
yereldedir ve git'e eklenmez. `app.config.js`, uygulama adı, scheme, Android
package, iOS bundle id, EAS project id, destek e-postası ve gizlilik politikası
URL'sini bu dosyadan okuyabilir.

---

## Desteklenen Diller

Türkçe (`tr`), İngilizce (`en`), Fransızca (`fr`),
Brezilya Portekizcesi (`pt-BR`), Almanca (`de`).

Dil ilk açılışta seçilir, **Ayarlar → Dil**'den değiştirilebilir ve cihazda
saklanır.

## Özellikler

- Çevrimdışı çalışan, çok dilli içerik
- Koyu / açık / sistem teması
- Ayarlanabilir yazı boyutu (büyük yaşlı kullanıcılar için de rahat)
- Arama (aktif dilde başlık, açıklama, ilke ve etiketlerde)
- Favorilere ekleme (cihazda saklı)
- Son okunanlar / okuma takibi
- Günün tebliğ notu (her gün değişir, çok dilli)
- Paylaşılabilir kısa mesaj kartları (React Native Share)
- Telif ve kaynakça ekranı

---

## Proje Yapısı

```
app/                     # Expo Router ekranları (route'lar)
  _layout.tsx
  index.tsx              # giriş yönlendirmesi
  onboarding.tsx
  home.tsx
  categories.tsx
  category/[id].tsx
  topic/[id].tsx
  search.tsx
  favorites.tsx
  daily-note.tsx
  settings.tsx
  language.tsx
src/
  components/            # AppCard, CategoryCard, TopicCard, ...
  config/appConfig.ts    # uygulama adı ve alternatifleri
  data/                  # categories, seedTopics, generatedTopics, dailyNotes
  i18n/                  # index.ts + tr/en/fr/pt-BR/de .json
  store/useAppStore.ts   # Zustand + AsyncStorage (kalıcı tercihler)
  theme/                 # colors, spacing, typography, useAppTheme
  types/content.ts       # içerik tip tanımları
  utils/                 # searchTopics, shareContent, localize, copyrightSafety
scripts/buildGeneratedTopics.mjs   # üretilen içerik -> generatedTopics.ts
```

## Uygulama Adını Değiştirme

`src/config/appConfig.ts` içindeki `APP_NAME` değerini değiştirin. Alternatifler:
*Davet Rehberi*, *Hikmetle Tebliğ*, *İslamı Anlat*, *Guide to Dawah*.
Mağaza adı için ayrıca `app.json` → `expo.name` değerini güncelleyin.

## İçerik Modeli

Her konu `src/types/content.ts` içindeki `Topic` tipine uyar ve şu alanları içerir:
başlık, kısa açıklama, ana ilke, 3 maddelik özet, günlük hayata yansıma,
tebliğ ipucu, soru-cevap, (tematik) ayet/hadis referansı, paylaşılabilir mesaj
ve kaynak notu — **her biri 5 dilde**.

İçerik iki kaynaktan birleşir:
- `src/data/seedTopics.ts` — elle yazılmış örnek konular,
- `src/data/generatedTopics.ts` — `scripts/buildGeneratedTopics.mjs` ile
  `src/data/generated/*.json`'dan derlenen özgün konular.

Yeni içerik eklemek için `seedTopics.ts`'e ekleyebilir ya da
`src/data/generated/<kategori>.json` dosyalarını güncelleyip şunu çalıştırabilirsiniz:

```bash
node scripts/buildGeneratedTopics.mjs
```

> **Not:** `referenceNote` alanları, doğruluk açısından **tematik** tutulmuştur
> (uydurma sure:ayet/hadis numarası içermez). Belirli bir ayet/hadis numarası
> eklemek isterseniz, güvenilir bir kaynaktan teyit ederek ekleyiniz.

---

## Gerçek Cihazda Çalıştırma (EAS Build)

İkon, açılış ekranı ve bildirim ikonu yalnızca **gerçek derlemede** görünür
(Expo Go kendi ikonunu gösterir). Kurulabilir bir Android **APK** için:

```powershell
$env:EAS_NO_VCS = "1"      # git kurulu değilse (PowerShell)
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile preview
```

Build bitince çıkan **QR / indirme bağlantısından** APK'yı telefona kurun.
`eas.json`: `preview` profili **APK**, `production` profili **AAB** (mağaza) üretir.

## Mağaza (Google Play)

`store/` klasöründe yayın varlıkları hazırdır:
- `feature-graphic.png` (1024×500) · `play-store-icon.png` (512×512)
- `privacy-policy.md` — **5 dilde** gizlilik politikası (bir URL'de yayınlayın;
  `[GG.AA.YYYY]` ve `[e-posta adresiniz]` yer tutucularını doldurun)
- `store-listing.md` — **5 dilde** kısa + tam açıklama

> Kalan eksik: **ekran görüntüleri** (en az 2 telefon görseli).

---

## Telif ve Kaynakça

Bu uygulama içerikleri hazırlanırken aşağıdaki eserlerden **yararlanılmıştır**;
bu kitapların metinleri uygulamada **gösterilmez**:

İslam'da Tebliğ, Davet ve İrşad · İslam Nedir? · İslam'da Allah'a İman ·
İslam'da Meleklere İman · İslam'da Kitaplara İman · İslam'da Peygamberlere İman ·
İslam'da Kader ve Kazâ İnancı · Müminin Miracı Namaz · Ramazanın Bereketi Oruç ·
Canın ve Malın Sigortası Zekât · Bir Mübarek Sefer Hac · Teslimiyetin Sembolü
Kurban · Kulluğun Özü Dua · İslam'da Güzel Ahlak · İslam'da Aile · Müslüman'ın
Günlük Hayatında Helaller ve Haramlar · Sözlerin En Güzeli Kur'an · Allah'ın Son
Elçisi Hz. Muhammed · Âlemin Göz Bebeği İnsan · Din Nedir Ne Değildir?
