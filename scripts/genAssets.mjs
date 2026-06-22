// ============================================================================
// UYGULAMA GÖRSELLERİNİ ÜRET (ikon, adaptive-icon, splash, favicon)
// ----------------------------------------------------------------------------
// SVG -> PNG (sharp ile). Hilal + yıldız, koyu yeşil / altın tema.
// Çalıştırma:  npm install sharp --no-save ; node scripts/genAssets.mjs
// ============================================================================

import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const GREEN = '#0F5132';
const GOLD = '#C8962E';
const CREAM = '#FBF7EF';

const ASSETS = join(process.cwd(), 'assets');
if (!existsSync(ASSETS)) mkdirSync(ASSETS, { recursive: true });

/** 5 köşeli yıldız path'i üretir. */
function starPath(cx, cy, outerR, innerR, points = 5, rotDeg = -90) {
  const pts = [];
  const step = Math.PI / points;
  let ang = (rotDeg * Math.PI) / 180;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    pts.push(`${(cx + r * Math.cos(ang)).toFixed(2)},${(cy + r * Math.sin(ang)).toFixed(2)}`);
    ang += step;
  }
  return `M${pts.join(' L')} Z`;
}

/** Hilal + yıldız işaretini (merkez ~512,512) çizen SVG parçası. */
function markSvg(scale) {
  // taban koordinatlar (512 merkez), sonra ölçeklenir
  const inner = `
    <defs>
      <mask id="crescentMask">
        <rect x="0" y="0" width="1024" height="1024" fill="white"/>
        <circle cx="642" cy="432" r="276" fill="black"/>
      </mask>
    </defs>
    <circle cx="512" cy="512" r="300" fill="${GOLD}" mask="url(#crescentMask)"/>
    <path d="${starPath(718, 360, 86, 34)}" fill="${GOLD}"/>
  `;
  return `<g transform="translate(512,512) scale(${scale}) translate(-512,-512)">${inner}</g>`;
}

function buildSvg(size, { withBg, markScale }) {
  const bg = withBg
    ? `<rect x="0" y="0" width="1024" height="1024" rx="${withBg === 'round' ? 512 : 0}" fill="${GREEN}"/>
       <circle cx="512" cy="430" r="520" fill="#16623E" opacity="0.45"/>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024">
    ${bg}
    ${markSvg(markScale)}
  </svg>`;
}

async function render(svg, size, out) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(ASSETS, out));
  console.log('  yazildi: assets/' + out);
}

async function main() {
  // Uygulama ikonu (dolu, yeşil zemin + altın hilal)
  await render(buildSvg(1024, { withBg: true, markScale: 0.82 }), 1024, 'icon.png');
  // Android adaptive foreground (şeffaf zemin, güvenli bölge için küçük)
  await render(buildSvg(1024, { withBg: false, markScale: 0.62 }), 1024, 'adaptive-icon.png');
  // Splash logosu (şeffaf, ortada)
  await render(buildSvg(1024, { withBg: false, markScale: 0.7 }), 1024, 'splash-icon.png');
  // Web favicon (dolu)
  await render(buildSvg(48, { withBg: true, markScale: 0.82 }), 48, 'favicon.png');
  console.log('Tamamlandı. (Cream=' + CREAM + ')');
}

main().catch((e) => { console.error(e); process.exit(1); });
