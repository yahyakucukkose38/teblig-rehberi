// ============================================================================
// GENİŞLETİLMİŞ KONULARI DERLEME BETİĞİ
// ----------------------------------------------------------------------------
// src/data/generated/*.json içindeki (içerik üretim adımıyla yazılan) özgün
// konuları okur, şekillerini doğrular/temizler, her dile standart KAYNAK NOTUNU
// enjekte eder ve src/data/generatedTopics.ts dosyasını üretir.
//
// Çalıştırma:  node scripts/buildGeneratedTopics.mjs
// ============================================================================

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const GEN_DIR = join(ROOT, 'src', 'data', 'generated');
const OUT_FILE = join(ROOT, 'src', 'data', 'generatedTopics.ts');

const LANGS = ['tr', 'en', 'fr', 'pt-BR', 'de', 'es'];

// Geçerli kategori id'leri (filename doğrulaması için)
const VALID_CATEGORIES = new Set([
  'dawah-principles', 'what-is-islam', 'faith', 'worship', 'ethics', 'family',
  'halal-haram', 'quran', 'prophet', 'youth', 'social-media', 'faq',
  'share-cards', 'daily-life',
]);

// Güvenli (var olduğu bilinen) Ionicons OUTLINE adları. Üretilen ikon bunların
// dışındaysa kategoriye uygun varsayılan ikona düşülür (kırık ikon görünmesin).
const SAFE_ICONS = new Set([
  'book-outline', 'bookmark-outline', 'heart-outline', 'star-outline', 'moon-outline',
  'sunny-outline', 'sparkles-outline', 'leaf-outline', 'rose-outline', 'flower-outline',
  'people-outline', 'person-outline', 'happy-outline', 'hand-left-outline', 'walk-outline',
  'home-outline', 'gift-outline', 'shield-checkmark-outline', 'compass-outline', 'map-outline',
  'megaphone-outline', 'chatbubbles-outline', 'chatbubble-ellipses-outline', 'help-circle-outline',
  'bulb-outline', 'school-outline', 'phone-portrait-outline', 'globe-outline', 'water-outline',
  'time-outline', 'calendar-outline', 'albums-outline', 'ribbon-outline', 'flame-outline',
  'cloud-outline', 'earth-outline', 'language-outline', 'document-text-outline', 'list-outline',
  'eye-outline', 'ear-outline', 'cafe-outline', 'restaurant-outline', 'wallet-outline',
]);

const CATEGORY_DEFAULT_ICON = {
  'dawah-principles': 'megaphone-outline',
  'what-is-islam': 'moon-outline',
  faith: 'sparkles-outline',
  worship: 'rose-outline',
  ethics: 'happy-outline',
  family: 'people-outline',
  'halal-haram': 'shield-checkmark-outline',
  quran: 'book-outline',
  prophet: 'star-outline',
  youth: 'school-outline',
  'social-media': 'phone-portrait-outline',
  faq: 'help-circle-outline',
  'share-cards': 'albums-outline',
  'daily-life': 'sunny-outline',
};

// Her dile enjekte edilecek standart kaynak/telif notu (i18n copyright.shortNote ile uyumlu).
const SOURCE_NOTE = {
  tr: 'Bu içerik, temel İslami kaynaklardan yararlanılarak özgün biçimde hazırlanmıştır.',
  en: 'This content was prepared in an original form, drawing on core Islamic sources.',
  fr: 'Ce contenu a été élaboré de façon originale à partir de sources islamiques fondamentales.',
  'pt-BR': 'Este conteúdo foi preparado de forma original, com base em fontes islâmicas fundamentais.',
  de: 'Dieser Inhalt wurde eigenständig auf Grundlage grundlegender islamischer Quellen erstellt.',
  es: 'Este contenido fue elaborado de forma original, basándose en fuentes islámicas fundamentales.',
};

function asString(v) {
  return typeof v === 'string' ? v.trim() : '';
}

/** Bir dilin içeriğini doğrula/temizle. Geçersizse null döner. */
function sanitizeLang(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const title = asString(raw.title);
  const shortDescription = asString(raw.shortDescription);
  const mainPrinciple = asString(raw.mainPrinciple);
  const dailyReflection = asString(raw.dailyReflection);
  const dawahTip = asString(raw.dawahTip);
  const shareText = asString(raw.shareText);

  let points = Array.isArray(raw.summaryPoints)
    ? raw.summaryPoints.map(asString).filter(Boolean)
    : [];
  const qa = raw.questionAnswer && typeof raw.questionAnswer === 'object' ? raw.questionAnswer : {};
  const question = asString(qa.question);
  const answer = asString(qa.answer);
  const referenceNote = asString(raw.referenceNote);

  // Zorunlu alanlar
  if (!title || !shortDescription || !mainPrinciple || !dailyReflection || !dawahTip || !shareText) return null;
  if (points.length < 3) return null;
  if (!question || !answer) return null;

  return {
    title,
    shortDescription,
    mainPrinciple,
    summaryPoints: points.slice(0, 3),
    dailyReflection,
    dawahTip,
    questionAnswer: { question, answer },
    ...(referenceNote ? { referenceNote } : {}),
    shareText,
    sourceNote: '', // aşağıda dile göre doldurulur
  };
}

/** İçerik yönetişimi (review) alanını güvenle taşır; bilinmeyen alanları atar. */
function sanitizeReview(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const r = {};
  if (typeof raw.approved === 'boolean') r.approved = raw.approved;
  const by = asString(raw.reviewedBy);
  if (by) r.reviewedBy = by;
  const at = asString(raw.lastReviewedAt);
  if (at) r.lastReviewedAt = at;
  const ref = asString(raw.sourceRef);
  if (ref) r.sourceRef = ref;
  return Object.keys(r).length ? r : null;
}

function sanitizeTopic(raw, catId, index) {
  if (!raw || typeof raw !== 'object') return null;

  const content = {};
  for (const lang of LANGS) {
    const c = sanitizeLang(raw.content ? raw.content[lang] : null);
    if (!c) return null; // herhangi bir dil eksikse konuyu atla
    c.sourceNote = SOURCE_NOTE[lang];
    content[lang] = c;
  }

  const difficulty = raw.difficulty === 'intermediate' ? 'intermediate' : 'beginner';
  let minutes = Number(raw.estimatedReadMinutes);
  if (!Number.isFinite(minutes) || minutes < 1) minutes = 3;
  minutes = Math.max(2, Math.min(5, Math.round(minutes)));

  const tags = Array.isArray(raw.tags) ? raw.tags.map(asString).filter(Boolean).slice(0, 6) : [];
  const id = asString(raw.id) || `${catId}-${index + 1}`;
  const rawIcon = asString(raw.icon);
  const icon = SAFE_ICONS.has(rawIcon)
    ? rawIcon
    : CATEGORY_DEFAULT_ICON[catId] || 'book-outline';

  const review = sanitizeReview(raw.review);

  return {
    id,
    category: catId,
    icon,
    difficulty,
    estimatedReadMinutes: minutes,
    tags,
    ...(review ? { review } : {}),
    content,
  };
}

function main() {
  if (!existsSync(GEN_DIR)) {
    console.log('[build] src/data/generated bulunamadı; boş generatedTopics yazılıyor.');
    writeOutput([]);
    return;
  }

  const files = readdirSync(GEN_DIR).filter((f) => f.toLowerCase().endsWith('.json'));
  const all = [];
  const seenIds = new Set();
  let skipped = 0;

  for (const file of files) {
    const catId = file.replace(/\.json$/i, '');
    if (!VALID_CATEGORIES.has(catId)) {
      console.log(`[build] atlandı (bilinmeyen kategori): ${file}`);
      continue;
    }
    let parsed;
    try {
      parsed = JSON.parse(readFileSync(join(GEN_DIR, file), 'utf8'));
    } catch (e) {
      console.log(`[build] JSON ayrıştırılamadı: ${file} — ${e.message}`);
      continue;
    }
    const list = Array.isArray(parsed) ? parsed : Array.isArray(parsed.topics) ? parsed.topics : [];
    let kept = 0;
    list.forEach((raw, i) => {
      const t = sanitizeTopic(raw, catId, i);
      if (!t) { skipped++; return; }
      if (seenIds.has(t.id)) { skipped++; return; }
      seenIds.add(t.id);
      all.push(t);
      kept++;
    });
    console.log(`[build] ${catId}: ${kept} konu (kaynak ${list.length})`);
  }

  writeOutput(all);
  console.log(`[build] TOPLAM ${all.length} özgün konu yazıldı, ${skipped} atlandı -> src/data/generatedTopics.ts`);
}

function writeOutput(topics) {
  const header = `// ============================================================================
// GENİŞLETİLMİŞ KONULAR — OTOMATİK ÜRETİLDİ (scripts/buildGeneratedTopics.mjs)
// ----------------------------------------------------------------------------
// Bu dosya elle düzenlenmez. İçerik kitaplardan KOPYALANMAZ; kısa, sade ve
// özgün olarak üretilmiştir. Yeniden üretmek için derleme betiğini çalıştırın.
// ============================================================================

import type { Topic } from '../types/content';

export const generatedTopics: Topic[] = `;

  const body = topics.length === 0 ? '[]' : JSON.stringify(topics, null, 2);
  const out = `${header}${body};\n`;

  if (!existsSync(join(ROOT, 'src', 'data'))) {
    mkdirSync(join(ROOT, 'src', 'data'), { recursive: true });
  }
  writeFileSync(OUT_FILE, out, 'utf8');
}

main();
