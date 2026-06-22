// Denetim sonrası güvenli i18n düzeltmeleri: disclaimer ekle + bildirim metnini yumuşat.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'src', 'i18n');

const DISCLAIMER = {
  tr: { title: 'Bilgilendirme Notu', body: 'Bu içerikler bilgilendirme ve genel rehberlik amaçlıdır; kesin/bağlayıcı hüküm (fetva) niteliği taşımaz. Özel durumlarda ve ihtilaflı meselelerde ehil bir hocaya veya müftülüğe danışınız.' },
  en: { title: 'Disclaimer', body: 'This content is for general information and guidance only; it is not a binding religious ruling (fatwa). For personal situations and disputed matters, please consult a qualified scholar.' },
  fr: { title: 'Avertissement', body: "Ces contenus sont fournis à titre d'information et d'orientation générale ; ils ne constituent pas un avis religieux contraignant (fatwa). Pour les situations personnelles et les questions controversées, veuillez consulter un savant qualifié." },
  'pt-BR': { title: 'Aviso', body: 'Estes conteúdos têm fins informativos e de orientação geral; não constituem um parecer religioso vinculante (fátua). Em situações pessoais e questões controversas, consulte um estudioso qualificado.' },
  de: { title: 'Hinweis', body: 'Diese Inhalte dienen der allgemeinen Information und Orientierung; sie stellen kein verbindliches religiöses Rechtsgutachten (Fatwa) dar. Bei persönlichen Situationen und strittigen Fragen wende dich bitte an eine qualifizierte Gelehrte/einen qualifizierten Gelehrten.' },
};

// Bildirim metnini "önce tefekkür, sonra ihtiyari paylaşım" tonuna çek.
const NOTIF_BODY = {
  tr: 'Bugünün kısa ilkesine göz at, üzerine bir an düşün; dilersen güzelce paylaş.',
  en: "Take a moment with today's short principle; if you wish, share it kindly.",
  fr: 'Prends un instant avec le court principe du jour ; si tu le souhaites, partage-le avec bienveillance.',
  'pt-BR': 'Reserve um momento para o breve princípio de hoje; se quiser, compartilhe com gentileza.',
  de: 'Nimm dir einen Moment für das kurze Prinzip des Tages; wenn du magst, teile es freundlich.',
};

for (const lang of Object.keys(DISCLAIMER)) {
  const file = join(DIR, lang + '.json');
  const obj = JSON.parse(readFileSync(file, 'utf8'));
  obj.disclaimer = DISCLAIMER[lang];
  if (obj.notif) obj.notif.body = NOTIF_BODY[lang];
  writeFileSync(file, JSON.stringify(obj, null, 2) + '\n', 'utf8');
  console.log('guncellendi: ' + lang + '.json (disclaimer + notif.body)');
}
