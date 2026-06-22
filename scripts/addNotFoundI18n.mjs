// 404 (notFound) i18n anahtarlarını 5 dile ekler.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const DIR = join(process.cwd(), 'src', 'i18n');
const ADD = {
  tr: { notFound: { title: 'Sayfa bulunamadı', body: 'Aradığınız sayfa burada değil.', goHome: 'Ana sayfaya dön' } },
  en: { notFound: { title: 'Page not found', body: "The page you're looking for isn't here.", goHome: 'Go to Home' } },
  fr: { notFound: { title: 'Page introuvable', body: "La page que vous cherchez n'est pas ici.", goHome: "Aller à l'accueil" } },
  'pt-BR': { notFound: { title: 'Página não encontrada', body: 'A página que você procura não está aqui.', goHome: 'Ir para o início' } },
  de: { notFound: { title: 'Seite nicht gefunden', body: 'Die gesuchte Seite ist nicht hier.', goHome: 'Zur Startseite' } },
};
for (const lang of Object.keys(ADD)) {
  const file = join(DIR, lang + '.json');
  const obj = JSON.parse(readFileSync(file, 'utf8'));
  obj.notFound = { ...(obj.notFound || {}), ...ADD[lang].notFound };
  writeFileSync(file, JSON.stringify(obj, null, 2) + '\n', 'utf8');
  console.log('guncellendi: ' + lang + '.json');
}
