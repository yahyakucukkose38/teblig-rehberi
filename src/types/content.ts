// ============================================================================
// İÇERİK TİP TANIMLARI
// ----------------------------------------------------------------------------
// Uygulamadaki tüm içerik (konular, kategoriler, günün notları) bu tiplere
// uyacak şekilde, ÖZGÜN ve KISA biçimde hazırlanır. Hiçbir kitap metni aynen
// kullanılmaz. Bkz. src/utils/copyrightSafety.ts
// ============================================================================

/** Desteklenen diller. Yeni dil eklemek için buraya kod ekleyin. */
export type LanguageCode = 'tr' | 'en' | 'fr' | 'pt-BR' | 'de' | 'es';

/** Uygulamada kullanılan tüm dillerin sıralı listesi. */
export const LANGUAGES: { code: LanguageCode; label: string; nativeLabel: string }[] = [
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe' },
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'pt-BR', label: 'Brazilian Portuguese', nativeLabel: 'Português do Brasil' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
];

/** Yedek (fallback) dil sırası: aktif dilde içerik yoksa bu sırayla denenir. */
export const FALLBACK_ORDER: LanguageCode[] = ['pt-BR', 'es', 'en', 'fr', 'tr', 'de'];

/** İçerik kategorileri. */
export type TopicCategory =
  | 'dawah-principles'
  | 'what-is-islam'
  | 'faith'
  | 'worship'
  | 'ethics'
  | 'family'
  | 'halal-haram'
  | 'quran'
  | 'prophet'
  | 'youth'
  | 'social-media'
  | 'faq'
  | 'share-cards'
  | 'daily-life';

/** Bir konunun tek bir dildeki tüm metin alanları. */
export type TopicContent = {
  /** Başlık */
  title: string;
  /** Kısa açıklama (1-2 cümle) */
  shortDescription: string;
  /** Ana ilke (tek cümlelik özlü ifade) */
  mainPrinciple: string;
  /** 3 maddelik özet */
  summaryPoints: string[];
  /** Günlük hayata yansıması */
  dailyReflection: string;
  /** Tebliğ ederken dikkat edilecek nokta */
  dawahTip: string;
  /** Kısa soru-cevap */
  questionAnswer: {
    question: string;
    answer: string;
  };
  /** İlgili ayet/hadis referansı (yalnızca kaynak gösterimi, uzun alıntı yok) */
  referenceNote?: string;
  /** Paylaşılabilir kısa mesaj */
  shareText: string;
  /** Kaynak / telif notu */
  sourceNote: string;
};

/**
 * İçerik yönetişimi (governance) meta verisi.
 * Dinî içeriğin izlenebilirliği için: onay durumu, gözden geçiren, tarih ve kaynak.
 * Opsiyoneldir; ilerleyen sürümlerde ehil bir kişinin onayı bu alanlarla işaretlenebilir
 * ve yalnızca approved===true olan içerik kullanıcıya gösterilecek şekilde filtrelenebilir.
 */
export type ContentReview = {
  /** Ehil bir kişi tarafından onaylandı mı? */
  approved?: boolean;
  /** Gözden geçiren kişi/kurum (ör. "Müftülük", hoca adı) */
  reviewedBy?: string;
  /** Son gözden geçirme tarihi (ISO 8601, ör. "2026-06-03") */
  lastReviewedAt?: string;
  /** Faydalanılan kaynak referansı (serbest metin) */
  sourceRef?: string;
};

/** Bir konunun tamamı (tüm diller dahil). */
export type Topic = {
  id: string;
  category: TopicCategory;
  /** Ionicons ikon adı (bkz. @expo/vector-icons) */
  icon: string;
  difficulty: 'beginner' | 'intermediate';
  estimatedReadMinutes: number;
  tags: string[];
  /** İçerik yönetişimi/onay meta verisi (opsiyonel) */
  review?: ContentReview;
  /** Her dil için içerik. */
  content: Record<LanguageCode, TopicContent>;
};

/** Kategori meta verisi (çok dilli etiketlerle). */
export type Category = {
  id: TopicCategory;
  /** Ionicons ikon adı */
  icon: string;
  /** Kategori vurgu rengi (tema renk anahtarı yerine doğrudan hex) */
  accent: string;
  /** Her dil için kısa etiket ve açıklama. */
  label: Record<LanguageCode, { name: string; description: string }>;
};

/** Günün tebliğ notu (çok dilli). */
export type DailyNote = {
  id: string;
  text: Record<LanguageCode, string>;
};
