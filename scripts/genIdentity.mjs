// ============================================================================
// PREMIUM İSLAMİ GÖRSEL KİMLİK (SVG -> PNG)
// ----------------------------------------------------------------------------
// Mihrab kemeri + açık kitap + rehberlik ışığı + minimal hilal + şafak parıltısı
// + ince 8 köşeli geometri. Yüz/şahsiyet/kutsal mekân tasviri YOK; metin YOK.
// Çalıştırma: npm install sharp --no-save ; node scripts/genIdentity.mjs
// ============================================================================
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ASSETS = join(process.cwd(), 'assets');
if (!existsSync(ASSETS)) mkdirSync(ASSETS, { recursive: true });

// Palet
const EM1 = '#1A7253', EM2 = '#0F5236', EM3 = '#083420', NAVY = '#13243F';
const IVORY = '#F6EFDD', SOFTW = '#FFFEF8', BEIGE = '#E4D2AC';
const GOLD = '#C8A24E', GOLD2 = '#9C7A33', GOLDLT = '#E2C079';

// 8 köşeli yıldız (iki çapraz kare) — geometrik aksan
function star8(cx, cy, r, attrs) {
  const sq = (rot) => {
    const pts = [];
    for (let i = 0; i < 4; i++) {
      const a = (Math.PI / 2) * i + rot;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
    }
    return `M${pts.join(' L')} Z`;
  };
  return `<path d="${sq(Math.PI / 4)} ${sq(0)}" ${attrs}/>`;
}

// Minimal hilal (altın), açıklığı sağ-üste bakan
function crescent(cx, cy, r, off) {
  return `
    <defs><mask id="cm"><rect x="0" y="0" width="1024" height="1024" fill="white"/>
      <circle cx="${cx + off}" cy="${cy - off * 0.7}" r="${r * 0.9}" fill="black"/></mask></defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${GOLD}" mask="url(#cm)"/>`;
}

// Açık kitap (fildişi sayfalar, altın kenar, sırt)
function book() {
  return `
    <!-- sayfa gölgesi/kalınlık -->
    <path d="M300,724 Q410,712 512,706 Q614,712 724,724 L724,736 Q614,724 512,718 Q410,724 300,736 Z" fill="${GOLD2}" opacity="0.55"/>
    <!-- sol sayfa -->
    <path d="M306,718 L324,662 Q418,650 512,648 L512,704 Q412,710 306,718 Z" fill="${IVORY}" stroke="${GOLD}" stroke-width="2.5"/>
    <!-- sağ sayfa -->
    <path d="M718,718 L700,662 Q606,650 512,648 L512,704 Q612,710 718,718 Z" fill="${IVORY}" stroke="${GOLD}" stroke-width="2.5"/>
    <!-- iç sayfa parıltısı -->
    <path d="M512,648 L512,704 Q452,708 392,713 Q452,668 512,656 Z" fill="${SOFTW}" opacity="0.45"/>
    <path d="M512,648 L512,704 Q572,708 632,713 Q572,668 512,656 Z" fill="${SOFTW}" opacity="0.3"/>
    <!-- sırt -->
    <path d="M512,648 L512,704" stroke="${GOLD2}" stroke-width="3" />
    <circle cx="512" cy="646" r="4" fill="${GOLDLT}"/>`;
}

// Emblem (1024 koordinatında): geometri + ışık + kemer + kitap + hilal
function emblem() {
  return `
    <!-- şafak parıltısı (kitabın ardında / soft guiding light) -->
    <circle cx="512" cy="700" r="400" fill="url(#sunrise)"/>
    <!-- geometrik 8 köşeli yıldız (hale) -->
    ${star8(512, 300, 150, `fill="none" stroke="${GOLD}" stroke-width="2.2" opacity="0.22"`)}
    ${star8(512, 300, 104, `fill="none" stroke="${GOLDLT}" stroke-width="1.6" opacity="0.16"`)}
    <!-- hilalin ardında yumuşak altın parıltı -->
    <circle cx="512" cy="296" r="120" fill="url(#halo)"/>
    <!-- mihrab kemeri: iç niş dolgusu -->
    <path d="M250,812 L250,470 C250,330 360,212 512,170 C664,212 774,330 774,470 L774,812 Z" fill="url(#niche)"/>
    <!-- nazik ışık ışınları -->
    <g opacity="0.5">
      <path d="M512,650 L452,320" stroke="url(#beam)" stroke-width="7" stroke-linecap="round"/>
      <path d="M512,650 L512,300" stroke="url(#beam)" stroke-width="9" stroke-linecap="round"/>
      <path d="M512,650 L572,320" stroke="url(#beam)" stroke-width="7" stroke-linecap="round"/>
      <path d="M512,650 L402,360" stroke="url(#beam)" stroke-width="5" stroke-linecap="round"/>
      <path d="M512,650 L622,360" stroke="url(#beam)" stroke-width="5" stroke-linecap="round"/>
    </g>
    <!-- rehberlik ışığı (kitaptan yükselen yumuşak huzme) -->
    <path d="M454,664 L570,664 L600,320 L424,320 Z" fill="url(#beam)" opacity="0.85"/>
    <circle cx="512" cy="656" r="120" fill="url(#spark)"/>
    <!-- mihrab kemeri konturu -->
    <path d="M250,812 L250,470 C250,330 360,212 512,170 C664,212 774,330 774,470 L774,812" fill="none" stroke="${GOLD}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M250,812 L250,470 C250,330 360,212 512,170 C664,212 774,330 774,470 L774,812" fill="none" stroke="${GOLDLT}" stroke-width="2" opacity="0.5"/>
    <!-- taban çizgisi (eşik) -->
    <path d="M214,812 L810,812" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/>
    <path d="M300,812 L724,812" stroke="${GOLDLT}" stroke-width="2" opacity="0.6"/>
    <!-- minimal hilal -->
    ${crescent(512, 296, 50, 30)}
    <!-- açık kitap (hafif büyütülmüş) -->
    <g transform="translate(512 688) scale(1.1) translate(-512 -688)">${book()}</g>`;
}

function defs(withBg) {
  return `<defs>
    <radialGradient id="bg" cx="50%" cy="56%" r="72%">
      <stop offset="0%" stop-color="${EM1}"/>
      <stop offset="55%" stop-color="${EM2}"/>
      <stop offset="100%" stop-color="${EM3}"/>
    </radialGradient>
    <radialGradient id="vign" cx="50%" cy="50%" r="75%">
      <stop offset="60%" stop-color="${NAVY}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${NAVY}" stop-opacity="0.55"/>
    </radialGradient>
    <radialGradient id="sunrise" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${BEIGE}" stop-opacity="0.6"/>
      <stop offset="42%" stop-color="${GOLD}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${GOLDLT}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="${GOLDLT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="spark" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${SOFTW}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${SOFTW}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="niche" x1="0" y1="170" x2="0" y2="812" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${IVORY}" stop-opacity="0.13"/>
      <stop offset="45%" stop-color="${IVORY}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${IVORY}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="beam" x1="0" y1="668" x2="0" y2="316" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${IVORY}" stop-opacity="0.55"/>
      <stop offset="60%" stop-color="${IVORY}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${IVORY}" stop-opacity="0"/>
    </linearGradient>
  </defs>`;
}

function buildSvg(size, { withBg, scale = 1, ty = 0 }) {
  const bg = withBg
    ? `<rect width="1024" height="1024" fill="url(#bg)"/>
       <rect width="1024" height="1024" fill="url(#vign)"/>
       <rect x="46" y="46" width="932" height="932" rx="150" fill="none" stroke="${GOLD}" stroke-width="3" opacity="0.4"/>
       <rect x="62" y="62" width="900" height="900" rx="134" fill="none" stroke="${GOLDLT}" stroke-width="1.5" opacity="0.25"/>`
    : '';
  const group = `<g transform="translate(512 ${512 + ty}) scale(${scale}) translate(-512 -512)">${emblem()}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024">
    ${defs(withBg)}${bg}${group}</svg>`;
}

async function render(svg, size, out) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(ASSETS, out));
  console.log('  yazildi: assets/' + out);
}

async function main() {
  const preview = process.argv.includes('--preview');
  if (preview) {
    await render(buildSvg(1024, { withBg: true, scale: 1 }), 1024, '_identity_preview.png');
    console.log('Önizleme hazır.');
    return;
  }
  // FİNAL asset'ler
  await render(buildSvg(1024, { withBg: true, scale: 1 }), 1024, 'icon.png');
  // Android adaptive foreground: güvenli bölge için daha küçük, şeffaf
  await render(buildSvg(1024, { withBg: false, scale: 0.64, ty: 8 }), 1024, 'adaptive-icon.png');
  // Splash logosu (şeffaf, emerald zemin üzerinde ortalanır)
  await render(buildSvg(1024, { withBg: false, scale: 0.82, ty: 6 }), 1024, 'splash-icon.png');
  // Web favicon (dolu)
  await render(buildSvg(64, { withBg: true, scale: 1 }), 64, 'favicon.png');
  console.log('Final görseller yazıldı (icon, adaptive-icon, splash-icon, favicon).');
}

main().catch((e) => { console.error(e); process.exit(1); });
