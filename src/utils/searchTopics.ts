// ============================================================================
// ARAMA
// ----------------------------------------------------------------------------
// Yalnızca AKTİF dilde; başlık, kısa açıklama, ana ilke, etiketler, soru-cevap
// ve özet maddelerinde arar. Normalize işlemi dile duyarlıdır (Türkçe'ye özgü
// ı/i birleştirmesi yalnız tr'de uygulanır). Basit skorlama ile en alakalı
// sonuçları öne çıkarır.
// ============================================================================

import type { LanguageCode, Topic } from '../types/content';
import { getTopicContent } from './localize';

/** Aksan (combining) işaretleri — NFD ayrıştırmasından sonra temizlenir. */
const COMBINING_MARKS = /[̀-ͯ]/g;

/** Metni karşılaştırma için sadeleştirir; aksanları atar, dile göre küçültür. */
function normalize(input: string, lang: LanguageCode): string {
  let s = lang === 'tr' ? input.toLocaleLowerCase('tr') : input.toLowerCase();
  // String.normalize bazı çalışma zamanlarında yoksa güvenli biçimde geç.
  try {
    s = s.normalize('NFD').replace(COMBINING_MARKS, '');
  } catch {
    // normalize desteklenmiyorsa olduğu gibi devam et
  }
  // Türkçe'ye özgü ı/i birleştirmesi yalnız Türkçe'de anlamlıdır.
  if (lang === 'tr') s = s.replace(/ı/g, 'i');
  return s.trim();
}

export type SearchResult = {
  topic: Topic;
  score: number;
};

/**
 * Konular arasında aktif dilde arama yapar.
 * @param topics Tüm konular
 * @param query Arama metni
 * @param lang Aktif dil
 */
export function searchTopics(
  topics: Topic[],
  query: string,
  lang: LanguageCode,
): Topic[] {
  const q = normalize(query, lang);
  if (q.length === 0) return [];

  const results: SearchResult[] = [];

  for (const topic of topics) {
    const c = getTopicContent(topic, lang);
    const title = normalize(c.title, lang);
    const desc = normalize(c.shortDescription, lang);
    const principle = normalize(c.mainPrinciple, lang);
    const tags = topic.tags.map((t) => normalize(t, lang));
    const qa = normalize(`${c.questionAnswer.question} ${c.questionAnswer.answer}`, lang);
    const points = normalize(c.summaryPoints.join(' '), lang);

    let score = 0;
    if (title.includes(q)) score += 10;
    if (title.startsWith(q)) score += 5;
    if (desc.includes(q)) score += 4;
    if (tags.some((tg) => tg.includes(q))) score += 4;
    if (principle.includes(q)) score += 3;
    if (qa.includes(q)) score += 2;
    if (points.includes(q)) score += 2;

    if (score > 0) {
      results.push({ topic, score });
    }
  }

  return results.sort((a, b) => b.score - a.score).map((r) => r.topic);
}
