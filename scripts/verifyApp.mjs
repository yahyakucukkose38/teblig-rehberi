// Uygulama tamlık denetimi: i18n bütünlüğü, içerik, route hedefleri, asset'ler.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
let warn = 0;
const W = (m) => { console.log('  ⚠️  ' + m); warn++; };
const OK = (m) => console.log('  ✓ ' + m);

// ---------- 1) i18n bütünlüğü ----------
const LANGS = ['tr', 'en', 'fr', 'pt-BR', 'de', 'es'];
console.log(`\n[1] i18n (${LANGS.length} dil) anahtar bütünlüğü`);
function flat(o, p = '') { let r = []; for (const k in o) { const f = p ? p + '.' + k : k; if (o[k] && typeof o[k] === 'object') r = r.concat(flat(o[k], f)); else r.push(f); } return r; }
const base = flat(JSON.parse(readFileSync(join(ROOT, 'src/i18n/tr.json'), 'utf8'))).sort();
OK(`tr: ${base.length} anahtar (referans)`);
for (const l of LANGS.slice(1)) {
  const k = flat(JSON.parse(readFileSync(join(ROOT, `src/i18n/${l}.json`), 'utf8'))).sort();
  const miss = base.filter((x) => !k.includes(x));
  const extra = k.filter((x) => !base.includes(x));
  if (miss.length || extra.length) W(`${l}: eksik=${miss.length} fazla=${extra.length} ${miss.slice(0, 5).join(',')}`);
  else OK(`${l}: tam (${k.length})`);
}

// ---------- 2) İçerik tamlığı (generatedTopics) ----------
console.log('\n[2] İçerik (generatedTopics) tamlığı');
const ts = readFileSync(join(ROOT, 'src/data/generatedTopics.ts'), 'utf8');
const body = ts.slice(ts.indexOf('Topic[] = ') + 10).trim().replace(/;$/, '');
const topics = JSON.parse(body);
const REQ = ['title', 'shortDescription', 'mainPrinciple', 'summaryPoints', 'dailyReflection', 'dawahTip', 'questionAnswer', 'shareText', 'sourceNote'];
let fieldErr = 0; const ids = new Set();
for (const t of topics) {
  if (ids.has(t.id)) W(`tekrar id: ${t.id}`); ids.add(t.id);
  for (const l of LANGS) {
    const c = t.content[l];
    if (!c) { W(`${t.id}: ${l} dil yok`); fieldErr++; continue; }
    for (const f of REQ) if (c[f] === undefined || c[f] === '' || (Array.isArray(c[f]) && c[f].length === 0)) { W(`${t.id}/${l}: ${f} eksik`); fieldErr++; }
    if (Array.isArray(c.summaryPoints) && c.summaryPoints.length !== 3) { W(`${t.id}/${l}: summaryPoints ${c.summaryPoints.length} (3 olmalı)`); fieldErr++; }
  }
}
if (fieldErr === 0) OK(`${topics.length} üretilen konu × ${LANGS.length} dil × tüm alanlar tam`);

// ---------- 3) Route hedefleri ----------
console.log('\n[3] Yönlendirme (route) hedefleri');
const appDir = join(ROOT, 'app');
function listRoutes(d, prefix = '') {
  const set = new Set();
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) for (const r of listRoutes(p, prefix + '/' + name)) set.add(r);
    else if (/\.tsx?$/.test(name) && !name.startsWith('_')) {
      const seg = (prefix + '/' + name.replace(/\.tsx?$/, '')).replace(/\/index$/, '/');
      // ilk segment (route grubu)
      const top = seg.split('/').filter(Boolean)[0];
      if (top) set.add(top);
    }
  }
  return set;
}
const routeTops = listRoutes(appDir); // ör: home, topic, card, category, ...
const navTargets = new Set();
function scanNav(d) {
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) scanNav(p);
    else if (/\.tsx?$/.test(name)) {
      const src = readFileSync(p, 'utf8');
      const re = /(?:push|replace|navigate)\(\s*[`'"]\/([a-z0-9-]+)|href=\{?\s*[`'"]\/([a-z0-9-]+)/g;
      let m; while ((m = re.exec(src))) navTargets.add(m[1] || m[2]);
    }
  }
}
scanNav(appDir);
for (const t of navTargets) {
  if (routeTops.has(t)) OK(`/${t} → route var`);
  else W(`/${t} → KARŞILIK GELEN ROUTE YOK`);
}

// ---------- 4) Asset'ler ----------
console.log('\n[4] Asset & app.json');
const app = JSON.parse(readFileSync(join(ROOT, 'app.json'), 'utf8')).expo;
const assetRefs = [app.icon, app.android?.adaptiveIcon?.foregroundImage, app.web?.favicon];
for (const r of assetRefs.filter(Boolean)) existsSync(join(ROOT, r)) ? OK(`${r} var`) : W(`${r} YOK (app.json'da referanslı)`);
for (const a of ['assets/splash-icon.png', 'assets/notification-icon.png']) existsSync(join(ROOT, a)) ? OK(`${a} var`) : W(`${a} YOK`);
if (app.android?.package) OK(`android.package: ${app.android.package}`); else W('android.package yok (build için gerekli)');

// ---------- 5) İçerik onay durumu (yönetişim) ----------
console.log('\n[5] İçerik onay durumu (yönetişim)');
const approvedCount = topics.filter((t) => t.review && t.review.approved === true).length;
if (approvedCount === topics.length) OK(`tüm ${topics.length} konu ehil onayından geçmiş`);
else console.log(`  ℹ️  onaylı: ${approvedCount}/${topics.length} — onay süreci opsiyonel (REQUIRE_CONTENT_APPROVAL kapalıyken tüm içerik görünür)`);

console.log(`\n=== SONUÇ: ${warn === 0 ? '✓ EKSİK YOK' : warn + ' uyarı'} ===`);

// CI bekçisi: herhangi bir uyarı varsa sıfırdan farklı çıkış kodu ver.
process.exitCode = warn === 0 ? 0 : 1;
