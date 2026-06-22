// app/ ve src/ içindeki tüm "@/..." import'larını GÖRELİ import'lara çevirir.
// Böylece alias çözümü hiçbir babel/metro/EAS yapılandırmasına bağlı kalmaz.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const DIRS = ['app', 'src'];

const files = [];
function walk(d) {
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx|js|jsx)$/.test(p)) files.push(p);
  }
}
for (const d of DIRS) walk(join(ROOT, d));

let totalReplacements = 0;
let changedFiles = 0;
for (const file of files) {
  const dir = dirname(file);
  let count = 0;
  const content = readFileSync(file, 'utf8').replace(
    /(['"])@\/([^'"]+)\1/g,
    (_m, q, sub) => {
      const target = resolve(SRC, sub);
      let rel = relative(dir, target).split('\\').join('/');
      if (!rel.startsWith('.')) rel = './' + rel;
      count++;
      return q + rel + q;
    },
  );
  if (count > 0) {
    writeFileSync(file, content, 'utf8');
    totalReplacements += count;
    changedFiles++;
  }
}
console.log(`Değiştirilen dosya: ${changedFiles}, toplam @/ import: ${totalReplacements}`);
