// ============================================================================
// ChatGPT görsellerini app asset'lerine dönüştürür.
// - icon / adaptive-icon / splash-icon / favicon (boyutlandırma)
// - notification-icon: beyaz silüet -> ŞEFFAF (luminans = alfa)
// - store/feature-graphic (1024x500) + store/play-store-icon (512x512)
// Çalıştırma: node scripts/processIdentity.mjs
// ============================================================================
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SRC = join(ROOT, 'Resimler');
const ASSETS = join(ROOT, 'assets');
const STORE = join(ROOT, 'store');
for (const d of [ASSETS, STORE]) if (!existsSync(d)) mkdirSync(d, { recursive: true });

const f = (n) => join(SRC, n);
const IMG = {
  icon: f('ChatGPT Image 3 Haz 2026 19_46_36 (1).png'),
  emblem: f('ChatGPT Image 3 Haz 2026 19_46_36 (2).png'),
  splash: f('ChatGPT Image 3 Haz 2026 19_46_38 (3).png'),
  simple: f('ChatGPT Image 3 Haz 2026 19_46_39 (4).png'),
  notif: f('ChatGPT Image 3 Haz 2026 19_46_41 (5).png'),
  feature: f('ChatGPT Image 3 Haz 2026 19_46_42 (6).png'),
};

function hex(p) { return '#' + [p[0], p[1], p[2]].map((v) => v.toString(16).padStart(2, '0')).join(''); }

async function main() {
  // 1) App icon 1024 (hero)
  await sharp(IMG.icon).resize(1024, 1024, { fit: 'cover' }).png().toFile(join(ASSETS, 'icon.png'));
  // 2) Adaptive icon 1024 (bol kenarlı amblem)
  await sharp(IMG.emblem).resize(1024, 1024, { fit: 'cover' }).png().toFile(join(ASSETS, 'adaptive-icon.png'));
  // 3) Splash logosu = amblem (zemin rengiyle harmanlanır)
  await sharp(IMG.emblem).resize(1024, 1024, { fit: 'cover' }).png().toFile(join(ASSETS, 'splash-icon.png'));
  // 4) Favicon 64 (sade amblem)
  await sharp(IMG.simple).resize(64, 64, { fit: 'cover' }).png().toFile(join(ASSETS, 'favicon.png'));

  // 5) Bildirim ikonu: beyaz silüet -> şeffaf (Android için)
  const N = 256;
  const lum = await sharp(IMG.notif)
    .resize(N, N, { fit: 'contain', background: { r: 0, g: 0, b: 0 } })
    .greyscale()
    .raw()
    .toBuffer();
  await sharp({ create: { width: N, height: N, channels: 3, background: { r: 255, g: 255, b: 255 } } })
    .joinChannel(lum, { raw: { width: N, height: N, channels: 1 } })
    .png()
    .toFile(join(ASSETS, 'notification-icon.png'));

  // 6) Store: feature graphic 1024x500 + play store icon 512x512
  await sharp(IMG.feature).resize(1024, 500, { fit: 'cover' }).png().toFile(join(STORE, 'feature-graphic.png'));
  await sharp(IMG.icon).resize(512, 512, { fit: 'cover' }).png().toFile(join(STORE, 'play-store-icon.png'));

  // Zemin rengini örnekle (amblem görselinin köşesinden — splash/adaptive bg için)
  const corner = await sharp(IMG.emblem).resize(1024, 1024, { fit: 'cover' }).extract({ left: 16, top: 16, width: 6, height: 6 }).resize(1, 1).raw().toBuffer();
  console.log('Asset üretildi: icon, adaptive-icon, splash-icon, favicon, notification-icon, store/*');
  console.log('ÖRNEKLENEN ZEMİN RENGİ (splash/adaptive backgroundColor için): ' + hex(corner));
}

main().catch((e) => { console.error(e); process.exit(1); });
