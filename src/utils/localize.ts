// ============================================================================
// İÇERİK YERELLEŞTİRME YARDIMCILARI
// ----------------------------------------------------------------------------
// Aktif dilde içerik yoksa güvenli biçimde yedek dile düşer; böylece uygulama
// hiçbir zaman boş/çökmüş ekran göstermez.
// ============================================================================

import {
  FALLBACK_ORDER,
  type Category,
  type LanguageCode,
  type Topic,
  type TopicContent,
} from '../types/content';

/** Bir konunun aktif dildeki içeriğini (yoksa yedek dilden) döndürür. */
export function getTopicContent(topic: Topic, lang: LanguageCode): TopicContent {
  if (topic.content[lang]) return topic.content[lang];
  for (const fallback of FALLBACK_ORDER) {
    if (topic.content[fallback]) return topic.content[fallback];
  }
  // Son çare: ilk mevcut içerik.
  const first = Object.values(topic.content)[0];
  return first;
}

/** Bir kategorinin aktif dildeki etiketini (yoksa yedek dilden) döndürür. */
export function getCategoryLabel(
  category: Category,
  lang: LanguageCode,
): { name: string; description: string } {
  if (category.label[lang]) return category.label[lang];
  for (const fallback of FALLBACK_ORDER) {
    if (category.label[fallback]) return category.label[fallback];
  }
  return Object.values(category.label)[0];
}

/** Çok dilli bir metin haritasından aktif dildeki değeri döndürür. */
export function pickText(
  map: Record<LanguageCode, string>,
  lang: LanguageCode,
): string {
  if (map[lang]) return map[lang];
  for (const fallback of FALLBACK_ORDER) {
    if (map[fallback]) return map[fallback];
  }
  return Object.values(map)[0] ?? '';
}
