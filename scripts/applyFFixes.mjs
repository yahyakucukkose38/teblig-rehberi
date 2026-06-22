// F bölümü çok dilli düzeltmeleri: id'ye göre alanları doğrudan günceller.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const GEN = join(process.cwd(), 'src', 'data', 'generated');

// { dosya: { topicId: { lang: { field: yeniDeğer } } } }
const UPDATES = {
  'faq.json': {
    'faq-neden-imtihan': {
      tr: {
        mainPrinciple: 'İmtihan çoğu zaman bir ceza değil; sabrı olgunlaştıran, dereceleri yükselten ve insanın gerçek değerini açığa çıkaran bir vesiledir.',
        shareText: 'İmtihan, kalbin olgunlaşması için açılan sessiz bir okul olabilir.',
      },
      en: {
        mainPrinciple: "A trial is often not a punishment but a means that matures patience, raises one's degree, and reveals a person's true worth.",
        shareText: 'A trial can be a quiet school where the heart learns to grow.',
      },
      fr: {
        mainPrinciple: "L'épreuve n'est souvent pas une punition, mais un moyen qui mûrit la patience, élève les degrés et révèle la vraie valeur de la personne.",
        shareText: "L'épreuve peut être une école silencieuse où le cœur apprend à grandir.",
      },
      'pt-BR': {
        mainPrinciple: 'A provação muitas vezes não é um castigo, mas um meio que amadurece a paciência, eleva os graus e revela o verdadeiro valor da pessoa.',
        shareText: 'A provação pode ser uma escola silenciosa onde o coração aprende a crescer.',
      },
      de: {
        mainPrinciple: 'Eine Prüfung ist oft keine Strafe, sondern ein Mittel, das Geduld reifen lässt, die Stufen erhöht und den wahren Wert eines Menschen offenbart.',
        shareText: 'Eine Prüfung kann eine stille Schule sein, in der das Herz zu wachsen lernt.',
      },
    },
  },
  'youth.json': {
    'youth-identity-and-belonging': {
      tr: { shareText: 'Sen bir tesadüf değilsin; bir amaçla yaratıldın. Anlam arayışın, seni var edene açılan bir kapıdır.' },
      en: { shareText: 'You are not an accident; you were created for a purpose. Your search for meaning is a door to the One who gave you being.' },
      fr: { shareText: "Tu n'es pas un hasard ; tu as été créé dans un but. Ta quête de sens est une porte vers Celui qui t'a donné l'existence." },
      'pt-BR': { shareText: 'Você não é um acaso; foi criado com um propósito. Sua busca por sentido é uma porta para Aquele que lhe deu a existência.' },
      de: { shareText: 'Du bist kein Zufall; du wurdest mit einem Sinn erschaffen. Deine Suche nach Sinn ist eine Tür zu Dem, der dir das Dasein gab.' },
    },
  },
  'dawah-principles.json': {
    'dawah-rahmet-kolaylik-mujde': {
      tr: { referenceNote: "Bkz. Kur'an'da kolaylık ve müjde temalı ayetler ile Hz. Peygamber ﷺ'in kolaylaştırma ve müjdeleme yönündeki rehberliği." },
      en: { referenceNote: "See Quranic themes of ease and glad tidings, and the Prophet's guidance to make things easy and to give glad tidings." },
      fr: { referenceNote: "Voir les thèmes coraniques de facilité et de bonne nouvelle, ainsi que la guidance du Prophète à faciliter et à annoncer la bonne nouvelle." },
      'pt-BR': { referenceNote: 'Veja os temas alcorânicos de facilidade e boas-novas, e a orientação do Profeta de facilitar e dar boas-novas.' },
      de: { referenceNote: 'Siehe die koranischen Themen von Erleichterung und froher Botschaft sowie die Anleitung des Propheten, es leicht zu machen und frohe Botschaft zu verkünden.' },
    },
  },
};

let changed = 0;
for (const [file, topics] of Object.entries(UPDATES)) {
  const path = join(GEN, file);
  const arr = JSON.parse(readFileSync(path, 'utf8'));
  for (const [id, langs] of Object.entries(topics)) {
    const t = arr.find((x) => x.id === id);
    if (!t) { console.log(`  ! bulunamadı: ${file} / ${id}`); continue; }
    for (const [lang, fields] of Object.entries(langs)) {
      for (const [field, val] of Object.entries(fields)) {
        t.content[lang][field] = val;
        changed++;
      }
    }
    console.log(`güncellendi: ${file} / ${id}`);
  }
  writeFileSync(path, JSON.stringify(arr, null, 2) + '\n', 'utf8');
}
console.log(`Toplam güncellenen alan: ${changed}`);
