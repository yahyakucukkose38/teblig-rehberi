// ============================================================================
// GÜNÜN TEBLİĞ NOTLARI (çok dilli, özgün kısa ilkeler)
// ----------------------------------------------------------------------------
// Her gün, tarihe göre belirlenen kısa bir tebliğ ilkesi gösterilir.
// Metinler özgündür; hiçbir kitaptan alıntı değildir.
// ============================================================================

import type { DailyNote, LanguageCode } from '../types/content';
import { pickText } from '../utils/localize';

export const dailyNotes: DailyNote[] = [
  {
    id: 'note-listen-first',
    text: {
      tr: 'Önce dinle; çoğu kalp önce anlaşılmak ister.',
      en: 'Listen first; most hearts long to be understood.',
      fr: 'Écoute d’abord ; la plupart des cœurs veulent être compris.',
      'pt-BR': 'Ouça primeiro; a maioria dos corações deseja ser compreendida.',
      de: 'Höre zuerst zu; die meisten Herzen wollen verstanden werden.',
      es: 'Escucha primero; la mayoría de los corazones anhela ser comprendida.',
    },
  },
  {
    id: 'note-character-invites',
    text: {
      tr: 'Güzel ahlak, en sessiz ama en etkili davettir.',
      en: 'Good character is the quietest yet most effective invitation.',
      fr: 'Le bon caractère est l’invitation la plus discrète mais la plus efficace.',
      'pt-BR': 'O bom caráter é o convite mais silencioso, porém mais eficaz.',
      de: 'Guter Charakter ist die leiseste und doch wirksamste Einladung.',
      es: 'El buen carácter es la invitación más silenciosa, pero la más eficaz.',
    },
  },
  {
    id: 'note-i-dont-know',
    text: {
      tr: '“Bilmiyorum” diyebilmek de bir edeptir.',
      en: 'To be able to say “I don’t know” is itself a courtesy.',
      fr: 'Savoir dire « je ne sais pas » est aussi une politesse.',
      'pt-BR': 'Saber dizer “não sei” também é uma cortesia.',
      de: 'Sagen zu können „Ich weiß es nicht“ ist selbst eine Höflichkeit.',
      es: 'Saber decir “no sé” también es una cortesía.',
    },
  },
  {
    id: 'note-patience-arrives',
    text: {
      tr: 'Acele eden değil, sabırla devam eden varır.',
      en: 'It is not the hasty but the patient who arrive.',
      fr: 'Ce ne sont pas les pressés mais les patients qui arrivent.',
      'pt-BR': 'Não são os apressados, mas os pacientes que chegam.',
      de: 'Nicht die Eiligen, sondern die Geduldigen kommen an.',
      es: 'No son los apresurados, sino los pacientes quienes llegan.',
    },
  },
  {
    id: 'note-smile',
    text: {
      tr: 'Bir tebessüm, uzun bir konuşmadan çok şey anlatır.',
      en: 'A smile can say more than a long speech.',
      fr: 'Un sourire peut dire plus qu’un long discours.',
      'pt-BR': 'Um sorriso pode dizer mais que um longo discurso.',
      de: 'Ein Lächeln kann mehr sagen als eine lange Rede.',
      es: 'Una sonrisa puede decir más que un largo discurso.',
    },
  },
  {
    id: 'note-right-time',
    text: {
      tr: 'Doğru söz, doğru zamanda söylenince güzeldir.',
      en: 'A true word is beautiful when said at the right time.',
      fr: 'Une parole vraie est belle quand elle est dite au bon moment.',
      'pt-BR': 'Uma palavra verdadeira é bela quando dita na hora certa.',
      de: 'Ein wahres Wort ist schön, wenn es zur rechten Zeit gesagt wird.',
      es: 'Una palabra verdadera es hermosa cuando se dice en el momento justo.',
    },
  },
  {
    id: 'note-look-down-on-none',
    text: {
      tr: 'Kimseyi küçük görmemek, büyük bir olgunluktur.',
      en: 'To look down on no one is a great maturity.',
      fr: 'Ne mépriser personne est une grande maturité.',
      'pt-BR': 'Não menosprezar ninguém é uma grande maturidade.',
      de: 'Niemanden geringzuschätzen ist eine große Reife.',
      es: 'No menospreciar a nadie es una gran madurez.',
    },
  },
  {
    id: 'note-hidden-kindness',
    text: {
      tr: 'Gizlenen iyilik, daha da güzelleşir.',
      en: 'A kindness kept hidden grows more beautiful.',
      fr: 'Une bonté gardée discrète devient plus belle.',
      'pt-BR': 'Uma bondade mantida discreta torna-se mais bela.',
      de: 'Eine im Verborgenen gehaltene Güte wird noch schöner.',
      es: 'Una bondad guardada en secreto se vuelve aún más hermosa.',
    },
  },
  {
    id: 'note-forgiveness',
    text: {
      tr: 'Affetmek, gücün en zarif hâlidir.',
      en: 'Forgiveness is the most graceful form of strength.',
      fr: 'Le pardon est la forme la plus élégante de la force.',
      'pt-BR': 'O perdão é a forma mais graciosa da força.',
      de: 'Vergebung ist die anmutigste Form der Stärke.',
      es: 'El perdón es la forma más elegante de la fuerza.',
    },
  },
  {
    id: 'note-verify-before-share',
    text: {
      tr: 'Paylaşmadan önce doğrula; söz bir emanettir.',
      en: 'Verify before you share; a word is a trust.',
      fr: 'Vérifie avant de partager ; une parole est un dépôt de confiance.',
      'pt-BR': 'Verifique antes de compartilhar; a palavra é um depósito de confiança.',
      de: 'Prüfe, bevor du teilst; ein Wort ist ein anvertrautes Gut.',
      es: 'Verifica antes de compartir; la palabra es algo que se te confía.',
    },
  },
  {
    id: 'note-guidance-from-god',
    text: {
      tr: 'Hidayet Allah’tandır; bize düşen güzelce ulaştırmaktır.',
      en: 'Guidance is from God; our part is to convey it beautifully.',
      fr: 'La guidance vient de Dieu ; à nous de la transmettre avec beauté.',
      'pt-BR': 'A orientação vem de Deus; cabe a nós transmiti-la com beleza.',
      de: 'Rechtleitung kommt von Gott; an uns ist es, sie schön zu vermitteln.',
      es: 'La guía viene de Dios; a nosotros nos toca transmitirla con belleza.',
    },
  },
  {
    id: 'note-patience-strength',
    text: {
      tr: 'Sabır, zoru kolaylaştıran sessiz bir güçtür.',
      en: 'Patience is a quiet strength that eases what is hard.',
      fr: 'La patience est une force tranquille qui adoucit le difficile.',
      'pt-BR': 'A paciência é uma força tranquila que suaviza o difícil.',
      de: 'Geduld ist eine stille Kraft, die das Schwere erleichtert.',
      es: 'La paciencia es una fuerza serena que suaviza lo difícil.',
    },
  },
];

/** Bir tarihin yılın kaçıncı günü olduğunu döndürür (1-366). */
function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/** Verilen tarihe karşılık gelen günün notunu (deterministik) döndürür. */
export function getDailyNoteForDate(date: Date): DailyNote {
  const index = dayOfYear(date) % dailyNotes.length;
  return dailyNotes[index];
}

/** Günün notunun aktif dildeki metnini döndürür. */
export function getDailyNoteText(date: Date, lang: LanguageCode): string {
  return pickText(getDailyNoteForDate(date).text, lang);
}
