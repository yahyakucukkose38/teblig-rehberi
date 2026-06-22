// app/ ve src/ içindeki import yollarını gerçek dosya adlarıyla (harf duyarlı)
// karşılaştırır. Linux/EAS'te patlatan büyük/küçük harf uyuşmazlıklarını bulur.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const ROOT = process.cwd();
const DIRS = ['app', 'src'];
const EXTS = ['', '.ts', '.tsx', '.js', '.jsx', '.json', '/index.ts', '/index.tsx', '/index.js'];

// Tüm gerçek dosya yollarını (tam harf) topla
const realFiles = new Set();
function walk(d) {
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else realFiles.add(resolve(p));
  }
}
for (const d of DIRS) walk(join(ROOT, d));

// Bir yolu, gerçek dosya kümesinde TAM HARF ile var mı diye kontrol et
function existsExact(p) { return realFiles.has(resolve(p)); }
// Aynı yol harf-duyarsız var mı (yani dosya var ama harf farklı)?
function existsCI(p) {
  const target = resolve(p).toLowerCase();
  for (const f of realFiles) if (f.toLowerCase() === target) return f;
  return null;
}

const importRe = /(?:import|export)[\s\S]*?from\s*['"]([^'"]+)['"]|require\(\s*['"]([^'"]+)['"]\s*\)/g;

const problems = [];
function checkFile(file) {
  const src = readFileSync(file, 'utf8');
  let m;
  while ((m = importRe.exec(src))) {
    const spec = m[1] || m[2];
    if (!spec) continue;
    let base;
    if (spec.startsWith('@/')) base = join(ROOT, 'src', spec.slice(2));
    else if (spec.startsWith('./') || spec.startsWith('../')) base = resolve(dirname(file), spec);
    else continue; // paket importu — atla
    // uzantı denemeleri
    let exactHit = false, ciHit = null;
    for (const ext of EXTS) {
      const cand = base + ext;
      if (existsExact(cand)) { exactHit = true; break; }
      const ci = existsCI(cand);
      if (ci && !ciHit) ciHit = { cand, ci };
    }
    if (!exactHit && ciHit) {
      problems.push({
        file: relative(ROOT, file),
        import: spec,
        beklenen: relative(ROOT, ciHit.cand),
        gercek: relative(ROOT, ciHit.ci),
      });
    } else if (!exactHit && !ciHit) {
      // hiç çözülemeyen (paket olmayan) import — bilgi amaçlı
      problems.push({ file: relative(ROOT, file), import: spec, beklenen: '(çözülemedi)', gercek: '?' });
    }
  }
}
for (const f of realFiles) if (/\.(ts|tsx|js|jsx)$/.test(f)) checkFile(f);

if (problems.length === 0) console.log('✓ Harf uyuşmazlığı / çözülemeyen yerel import YOK.');
else { console.log('SORUNLU IMPORTLAR:'); for (const p of problems) console.log(JSON.stringify(p)); }
