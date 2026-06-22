// docs/ilkeler/*.md dahili taslaklarına "iç taslak / ehil hoca onayı gerekli" başlığı ekler.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'docs', 'ilkeler');
const MARKER = '<!-- IC-TASLAK-UYARISI -->';
const HEADER = `${MARKER}
> **İÇ TASLAK / İNCELEME GEREKLİ.** Bu belge, uygulama içeriğini üretmeye yardımcı olmak için hazırlanmış **dahilî bir çalışma taslağıdır**; uygulamada kullanıcıya **gösterilmez**. Yapay zekâ yardımıyla oluşturulmuştur ve **ehil bir hocanın itikadî/fıkhî onayından geçmemiştir**. İçinde ifade/dizgi pürüzleri ve teyide muhtaç incelikler bulunabilir. İtimat veya yayın için **mutlaka ehil bir ilim ehline danışılmalıdır.**

---

`;

let count = 0;
for (const f of readdirSync(DIR).filter((x) => x.endsWith('.md'))) {
  const p = join(DIR, f);
  const txt = readFileSync(p, 'utf8');
  if (txt.includes(MARKER)) {
    console.log('zaten işaretli: ' + f);
    continue;
  }
  writeFileSync(p, HEADER + txt, 'utf8');
  console.log('başlık eklendi: ' + f);
  count++;
}
console.log('Toplam işaretlenen: ' + count);
