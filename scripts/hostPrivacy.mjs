// Gizlilik politikasını telegra.ph'te (anonim, kalıcı, temiz HTML) yayınlar.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const md = readFileSync(join(process.cwd(), 'store', 'privacy-policy.md'), 'utf8');
const clean = (s) => s.replace(/\*\*/g, '').replace(/\*/g, '').replace(/`/g, '').replace(/^>+\s*/, '').trim();

const content = [];
content.push({ tag: 'p', children: ['Yürürlük tarihi / Effective date: 04.06.2026'] });
let para = [];
const flush = () => { if (para.length) { content.push({ tag: 'p', children: [para.join(' ')] }); para = []; } };

for (const raw of md.split('\n')) {
  const line = raw.trim();
  if (line.includes('[')) continue;            // yer tutucu satırları atla
  if (line === '---') { flush(); continue; }
  if (line.startsWith('### ')) { flush(); content.push({ tag: 'h4', children: [clean(line.slice(4))] }); continue; }
  if (line.startsWith('## ')) { flush(); content.push({ tag: 'h3', children: [clean(line.slice(3))] }); continue; }
  if (line.startsWith('# ')) { flush(); content.push({ tag: 'h3', children: [clean(line.slice(2))] }); continue; }
  if (line.startsWith('> ')) { flush(); content.push({ tag: 'p', children: [clean(line.slice(2))] }); continue; }
  if (line === '') { flush(); continue; }
  para.push(clean(line));
}
flush();
content.push({ tag: 'p', children: ['İletişim / Contact: Google Play uygulama sayfasında belirtilen geliştirici iletişim bilgileri. (Developer contact details shown on the app’s Google Play page.)'] });

const acc = await (await fetch('https://api.telegra.ph/createAccount?short_name=TebligRehberi&author_name=' + encodeURIComponent('Tebliğ Rehberi'))).json();
if (!acc.ok) { console.log('createAccount HATA: ' + JSON.stringify(acc)); process.exit(1); }
const body = new URLSearchParams();
body.set('access_token', acc.result.access_token);
body.set('title', 'Teblig Rehberi Privacy Policy Gizlilik Politikasi');
body.set('author_name', 'Tebliğ Rehberi');
body.set('content', JSON.stringify(content));
body.set('return_content', 'false');
const page = await (await fetch('https://api.telegra.ph/createPage', { method: 'POST', body })).json();
if (page.ok) console.log('PRIVACY_URL: ' + page.result.url);
else console.log('createPage HATA: ' + JSON.stringify(page));
