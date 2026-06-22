// ============================================================================
// TELİF ÖRTÜŞME KONTROLÜ (programatik, kesin)
// ----------------------------------------------------------------------------
// Hedef dosyalardaki (üretilen JSON'lar / ilke belgesi) metinlerin N kelimelik
// dizilerini kaynak kitap metninde arar. Birebir (verbatim) örtüşmeleri bulur.
//
// Kullanım:
//   node scripts/checkOverlap.mjs <N> <kitap.md> <hedef1> <hedef2> ...
//   (hedef .json ise tr alanları, .md ise tüm metin taranır)
// ============================================================================

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const N = Number(process.argv[2]) || 6;
const BOOK = process.argv[3];
const TARGETS = process.argv.slice(4);

function norm(text) {
  return text
    .toLocaleLowerCase('tr')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ') // harf/rakam dışını boşluğa çevir
    .replace(/\s+/g, ' ')
    .trim();
}

function words(text) {
  const n = norm(text);
  return n.length ? n.split(' ') : [];
}

function ngrams(wordArr, n) {
  const out = [];
  for (let i = 0; i + n <= wordArr.length; i++) out.push(wordArr.slice(i, i + n).join(' '));
  return out;
}

// tr alanlarını JSON'dan topla
function collectTrStrings(obj, acc) {
  if (obj && typeof obj === 'object') {
    if (obj.content && obj.content.tr) {
      const c = obj.content.tr;
      for (const k of ['title', 'shortDescription', 'mainPrinciple', 'dailyReflection', 'dawahTip', 'referenceNote', 'shareText']) {
        if (typeof c[k] === 'string') acc.push(c[k]);
      }
      if (Array.isArray(c.summaryPoints)) acc.push(...c.summaryPoints.filter((x) => typeof x === 'string'));
      if (c.questionAnswer) { acc.push(c.questionAnswer.question || '', c.questionAnswer.answer || ''); }
    }
    for (const v of Array.isArray(obj) ? obj : Object.values(obj)) {
      if (v && typeof v === 'object') collectTrStrings(v, acc);
    }
  }
  return acc;
}

function expandTargets(targets) {
  const files = [];
  for (const t of targets) {
    const st = statSync(t);
    if (st.isDirectory()) {
      for (const f of readdirSync(t)) if (f.endsWith('.json') || f.endsWith('.md')) files.push(join(t, f));
    } else files.push(t);
  }
  return files;
}

const bookGrams = new Set(ngrams(words(readFileSync(BOOK, 'utf8')), N));
console.log(`[overlap] Kitap ${N}-gram sayısı: ${bookGrams.size}`);

let totalHits = 0;
for (const file of expandTargets(TARGETS)) {
  let strings = [];
  if (file.endsWith('.json')) {
    try { collectTrStrings(JSON.parse(readFileSync(file, 'utf8')), strings); }
    catch (e) { console.log(`  ! ${file} okunamadı: ${e.message}`); continue; }
  } else {
    strings = [readFileSync(file, 'utf8')];
  }
  const hits = new Set();
  for (const s of strings) for (const g of ngrams(words(s), N)) if (bookGrams.has(g)) hits.add(g);
  if (hits.size) {
    totalHits += hits.size;
    console.log(`\nÖRTÜŞME  ${file}  (${hits.size} adet ${N}-gram):`);
    for (const h of hits) console.log(`   • "${h}"`);
  } else {
    console.log(`temiz    ${file}`);
  }
}
console.log(`\n[overlap] TOPLAM örtüşen ${N}-gram: ${totalHits}`);
