// ============================================================================
// KÜLLİYAT GENELİ TELİF ÖRTÜŞME KONTROLÜ
// ----------------------------------------------------------------------------
// Kök dizindeki TÜM kaynak kitap .md dosyalarından (kendi ürettiğimiz
// README/ilke belgeleri hariç) birleşik bir N-gram havuzu kurar ve
// src/data/generated/*.json içindeki tüm Türkçe metinleri bu havuza karşı
// tarar. Birebir (verbatim) örtüşmeleri raporlar.
//
// Kullanım:  node scripts/checkAllOverlap.mjs [N=6]
// ============================================================================

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const N = Number(process.argv[2]) || 6;
const ROOT = process.cwd();
const GEN_DIR = join(ROOT, 'src', 'data', 'generated');

// Kendi ürettiğimiz, kaynak SAYILMAYAN md dosyaları
const EXCLUDE_MD = new Set(['README.md', 'TEBLIG-ILKELERI-VE-KURALLARI.md', 'INSTAGRAM-DAVET-PLANI-GENISLETILMIS.md']);

function norm(text) {
  return text
    .toLocaleLowerCase('tr')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function words(t) { const n = norm(t); return n.length ? n.split(' ') : []; }
function ngrams(w, n) { const o = []; for (let i = 0; i + n <= w.length; i++) o.push(w.slice(i, i + n).join(' ')); return o; }

function collectTr(obj, acc) {
  if (obj && typeof obj === 'object') {
    if (obj.content && obj.content.tr) {
      const c = obj.content.tr;
      for (const k of ['title', 'shortDescription', 'mainPrinciple', 'dailyReflection', 'dawahTip', 'referenceNote', 'shareText']) {
        if (typeof c[k] === 'string') acc.push(c[k]);
      }
      if (Array.isArray(c.summaryPoints)) acc.push(...c.summaryPoints.filter((x) => typeof x === 'string'));
      if (c.questionAnswer) acc.push(c.questionAnswer.question || '', c.questionAnswer.answer || '');
    }
    for (const v of Array.isArray(obj) ? obj : Object.values(obj)) if (v && typeof v === 'object') collectTr(v, acc);
  }
  return acc;
}

// 1) Kaynak külliyatından birleşik N-gram havuzu
const bookFiles = readdirSync(ROOT).filter((f) => f.endsWith('.md') && !EXCLUDE_MD.has(f));
const corpus = new Set();
for (const f of bookFiles) for (const g of ngrams(words(readFileSync(join(ROOT, f), 'utf8')), N)) corpus.add(g);
console.log(`[corpus] ${bookFiles.length} kaynak kitap, ${corpus.size} adet ${N}-gram havuzu.`);

// 2) Üretilen tüm içerik dosyalarını tara
const jsons = readdirSync(GEN_DIR).filter((f) => f.endsWith('.json'));
let totalHits = 0;
for (const file of jsons.sort()) {
  let strings = [];
  try { collectTr(JSON.parse(readFileSync(join(GEN_DIR, file), 'utf8')), strings); }
  catch (e) { console.log(`  ! ${file}: ${e.message}`); continue; }
  const hits = new Set();
  for (const s of strings) for (const g of ngrams(words(s), N)) if (corpus.has(g)) hits.add(g);
  if (hits.size) {
    totalHits += hits.size;
    console.log(`\nÖRTÜŞME  ${file}  (${hits.size}):`);
    for (const h of hits) console.log(`   • "${h}"`);
  } else {
    console.log(`temiz    ${file}`);
  }
}
console.log(`\n[corpus] TOPLAM örtüşen ${N}-gram: ${totalHits}` + (totalHits === 0 ? '  ✓ TÜM İÇERİK TEMİZ' : '  ← İNCELE'));

// CI bekçisi: birebir örtüşme varsa sıfırdan farklı çıkış kodu ver.
process.exitCode = totalHits === 0 ? 0 : 1;
