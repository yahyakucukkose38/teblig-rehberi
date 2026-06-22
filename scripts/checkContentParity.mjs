// ============================================================================
// ÇOK-DİL PARİTE DENETİMİ
// ----------------------------------------------------------------------------
// Üretilen konularda (generatedTopics.ts) şunları doğrular:
//   1) Her konuda tüm diller (6) mevcut mu?
//   2) Bir uzun-metin alanı iki FARKLI dilde BİREBİR aynı mı? (çevrilmemiş /
//      yanlışlıkla kopyalanmış içerik işareti — ör. es alanı en ile aynıysa.)
//
// checkAllOverlap.mjs yalnız Türkçeyi kaynak kitaplara karşı tarar; bu betik ise
// diller-arası bütünlüğü ve "sahte çeviri" kopyalarını yakalar.
//
// Kullanım:  node scripts/checkContentParity.mjs
// ============================================================================

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const LANGS = ['tr', 'en', 'fr', 'pt-BR', 'de', 'es'];
const TEXT_FIELDS = ['title', 'shortDescription', 'mainPrinciple', 'dailyReflection', 'dawahTip', 'shareText'];
const MIN_LEN = 12; // bu uzunluğun altındaki metinler (özel ad vb.) kopya sayılmaz

const ts = readFileSync(join(ROOT, 'src/data/generatedTopics.ts'), 'utf8');
const body = ts.slice(ts.indexOf('Topic[] = ') + 10).trim().replace(/;$/, '');
const topics = JSON.parse(body);

const norm = (s) => (typeof s === 'string' ? s.trim() : '');
let issues = 0;
const W = (m) => { console.log('  ⚠️  ' + m); issues++; };

// Bir alan grubunda iki farklı dilin aynı metni taşıyıp taşımadığını kontrol eder.
function checkDuplicate(id, fieldLabel, valueByLang) {
  const seen = new Map();
  for (const l of LANGS) {
    const v = norm(valueByLang[l]);
    if (v.length < MIN_LEN) continue;
    if (seen.has(v)) W(`${id} / ${fieldLabel}: "${seen.get(v)}" ve "${l}" aynı metin (çevrilmemiş olabilir)`);
    else seen.set(v, l);
  }
}

console.log(`[parite] ${topics.length} üretilen konu × ${LANGS.length} dil denetleniyor`);

for (const t of topics) {
  for (const l of LANGS) if (!t.content[l]) W(`${t.id}: ${l} dil yok`);

  for (const f of TEXT_FIELDS) {
    const byLang = {};
    for (const l of LANGS) byLang[l] = t.content[l] && t.content[l][f];
    checkDuplicate(t.id, f, byLang);
  }

  for (const sub of ['question', 'answer']) {
    const byLang = {};
    for (const l of LANGS) byLang[l] = t.content[l] && t.content[l].questionAnswer && t.content[l].questionAnswer[sub];
    checkDuplicate(t.id, `questionAnswer.${sub}`, byLang);
  }
}

console.log(`\n=== PARİTE: ${issues === 0 ? '✓ TÜM DİLLER TAM VE AYRI' : issues + ' uyarı'} ===`);
process.exitCode = issues === 0 ? 0 : 1;
