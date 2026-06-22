// ============================================================================
// KONULAR — tüm içeriğin tek giriş noktası
// ----------------------------------------------------------------------------
// Tohum (seed) konular + genişletilmiş özgün konular burada birleştirilir.
// Tüm içerik çevrimdışıdır; internet gerekmez.
// ============================================================================

import { REQUIRE_CONTENT_APPROVAL } from '../config/appConfig';
import type { Topic, TopicCategory } from '../types/content';
import { generatedTopics } from './generatedTopics';
import { seedTopics } from './seedTopics';

/** Aynı id'ye sahip tekrarları (ilk gelen kazanır) ayıklar. */
function dedupeById(list: Topic[]): Topic[] {
  const seen = new Set<string>();
  const out: Topic[] = [];
  for (const topic of list) {
    if (seen.has(topic.id)) continue;
    seen.add(topic.id);
    out.push(topic);
  }
  return out;
}

/** Bir konunun ehil bir kişi tarafından onaylanıp onaylanmadığını söyler. */
export function isApproved(topic: Topic): boolean {
  return topic.review?.approved === true;
}

/** Tohum + üretilen tüm konular (onay durumundan bağımsız ham liste). */
export const allTopics: Topic[] = dedupeById([...seedTopics, ...generatedTopics]);

/**
 * Uygulamada GÖRÜNEN konular.
 * REQUIRE_CONTENT_APPROVAL açıkken yalnızca onaylanmış konular gösterilir;
 * kapalıyken (varsayılan) tüm konular görünür.
 */
export const topics: Topic[] = REQUIRE_CONTENT_APPROVAL
  ? allTopics.filter(isApproved)
  : allTopics;

/** Bir konuyu id ile bulur. */
export function getTopicById(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}

/** Bir kategoriye ait konuları döndürür. */
export function getTopicsByCategory(category: TopicCategory): Topic[] {
  return topics.filter((t) => t.category === category);
}

/** Bir kategorideki konu sayısını döndürür. */
export function getTopicCountByCategory(category: TopicCategory): number {
  return topics.reduce((n, t) => (t.category === category ? n + 1 : n), 0);
}

/** Birden fazla konudan (ör. favoriler) id listesine göre seçim yapar. */
export function getTopicsByIds(ids: string[]): Topic[] {
  return ids
    .map((id) => getTopicById(id))
    .filter((t): t is Topic => Boolean(t));
}
