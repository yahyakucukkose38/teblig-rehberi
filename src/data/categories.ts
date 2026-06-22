// ============================================================================
// KATEGORİLER (çok dilli)
// ----------------------------------------------------------------------------
// 14 ana kategori. Etiketler kısa ve özgündür; hiçbir kitaptan alıntı değildir.
// İkonlar @expo/vector-icons (Ionicons) adlarıdır.
// ============================================================================

import type { Category } from '../types/content';

export const categories: Category[] = [
  {
    id: 'dawah-principles',
    icon: 'megaphone-outline',
    accent: '#0F5132',
    label: {
      tr: {
        name: 'Tebliğ ve Davet İlkeleri',
        description: 'Hikmetle anlatmanın temel ölçüleri ve üslubu.',
      },
      en: {
        name: 'Principles of Dawah',
        description: 'The core measures and manner of inviting with wisdom.',
      },
      fr: {
        name: 'Principes de la daawa',
        description: 'Les repères essentiels pour inviter avec sagesse.',
      },
      'pt-BR': {
        name: 'Princípios da daawa',
        description: 'As medidas e o estilo essenciais de convidar com sabedoria.',
      },
      de: {
        name: 'Prinzipien der Dawa',
        description: 'Die grundlegenden Maßstäbe des Einladens mit Weisheit.',
      },
      es: {
        name: 'Principios de la dawah',
        description: 'Las medidas y el estilo esenciales para invitar con sabiduría.',
      },
    },
  },
  {
    id: 'what-is-islam',
    icon: 'moon-outline',
    accent: '#1B6E4C',
    label: {
      tr: { name: 'İslam Nedir?', description: 'Sade bir dille İslam’ın özü ve anlamı.' },
      en: { name: 'What is Islam?', description: 'The essence and meaning of Islam in plain words.' },
      fr: { name: "Qu'est-ce que l'islam ?", description: "L'essence et le sens de l'islam, simplement." },
      'pt-BR': { name: 'O que é o Islã?', description: 'A essência e o sentido do Islã em palavras simples.' },
      de: { name: 'Was ist der Islam?', description: 'Das Wesen und die Bedeutung des Islam, einfach erklärt.' },
      es: { name: '¿Qué es el islam?', description: 'La esencia y el sentido del islam en palabras sencillas.' },
    },
  },
  {
    id: 'faith',
    icon: 'sparkles-outline',
    accent: '#2A6F97',
    label: {
      tr: { name: 'İman Esasları', description: 'İmanın temel ilkeleri üzerine kısa dersler.' },
      en: { name: 'Articles of Faith', description: 'Short lessons on the foundations of belief.' },
      fr: { name: 'Les piliers de la foi', description: 'De courtes leçons sur les fondements de la croyance.' },
      'pt-BR': { name: 'Pilares da fé', description: 'Lições curtas sobre os fundamentos da crença.' },
      de: { name: 'Glaubensgrundlagen', description: 'Kurze Lektionen über die Grundlagen des Glaubens.' },
      es: { name: 'Pilares de la fe', description: 'Lecciones breves sobre los fundamentos de la creencia.' },
    },
  },
  {
    id: 'worship',
    icon: 'rose-outline',
    accent: '#9C6B1B',
    label: {
      tr: { name: 'İbadet Bilinci', description: 'Namaz, oruç, zekât, hac, dua ve daha fazlası.' },
      en: { name: 'Mindful Worship', description: 'Prayer, fasting, charity, pilgrimage, supplication and more.' },
      fr: { name: "Conscience de l'adoration", description: 'Prière, jeûne, aumône, pèlerinage, invocation et plus.' },
      'pt-BR': { name: 'Consciência na adoração', description: 'Oração, jejum, caridade, peregrinação, súplica e mais.' },
      de: { name: 'Bewusste Anbetung', description: 'Gebet, Fasten, Abgabe, Pilgerfahrt, Bittgebet und mehr.' },
      es: { name: 'Adoración consciente', description: 'Oración, ayuno, caridad, peregrinación, súplica y más.' },
    },
  },
  {
    id: 'ethics',
    icon: 'happy-outline',
    accent: '#5C8A1B',
    label: {
      tr: { name: 'Güzel Ahlak', description: 'İmanın davranışa dönüştüğü güzel huylar.' },
      en: { name: 'Good Character', description: 'The virtues in which faith becomes conduct.' },
      fr: { name: 'Le bon caractère', description: 'Les vertus où la foi devient comportement.' },
      'pt-BR': { name: 'Bom caráter', description: 'As virtudes em que a fé se torna conduta.' },
      de: { name: 'Guter Charakter', description: 'Die Tugenden, in denen Glaube zum Handeln wird.' },
      es: { name: 'Buen carácter', description: 'Las virtudes en las que la fe se vuelve conducta.' },
    },
  },
  {
    id: 'family',
    icon: 'people-outline',
    accent: '#1B6E6E',
    label: {
      tr: { name: 'Aile ve Toplum', description: 'Huzurlu aile ve sağlam toplum bağları.' },
      en: { name: 'Family & Society', description: 'Peaceful families and strong social bonds.' },
      fr: { name: 'Famille et société', description: 'Des familles apaisées et des liens sociaux solides.' },
      'pt-BR': { name: 'Família e sociedade', description: 'Famílias em paz e laços sociais sólidos.' },
      de: { name: 'Familie & Gesellschaft', description: 'Friedliche Familien und starke soziale Bindungen.' },
      es: { name: 'Familia y sociedad', description: 'Familias en paz y lazos sociales sólidos.' },
    },
  },
  {
    id: 'halal-haram',
    icon: 'shield-checkmark-outline',
    accent: '#1B7C4C',
    label: {
      tr: { name: 'Helal ve Haram Bilinci', description: 'Günlük hayatta helal duyarlılığı.' },
      en: { name: 'Lawful & Unlawful', description: 'Awareness of the lawful in everyday life.' },
      fr: { name: 'Licite et illicite', description: 'La conscience du licite dans la vie quotidienne.' },
      'pt-BR': { name: 'Lícito e ilícito', description: 'Consciência do lícito na vida cotidiana.' },
      de: { name: 'Erlaubt & Verboten', description: 'Bewusstsein für das Erlaubte im Alltag.' },
      es: { name: 'Lícito e ilícito', description: 'Conciencia de lo lícito en la vida cotidiana.' },
    },
  },
  {
    id: 'quran',
    icon: 'book-outline',
    accent: '#7A5C1B',
    label: {
      tr: { name: 'Kur’an’ı Anlama', description: 'Kur’an’a yaklaşmanın ve anlamanın yolları.' },
      en: { name: 'Understanding the Quran', description: 'Ways to approach and understand the Quran.' },
      fr: { name: 'Comprendre le Coran', description: 'Des manières d’approcher et de comprendre le Coran.' },
      'pt-BR': { name: 'Compreender o Alcorão', description: 'Caminhos para se aproximar e compreender o Alcorão.' },
      de: { name: 'Den Koran verstehen', description: 'Wege, sich dem Koran zu nähern und ihn zu verstehen.' },
      es: { name: 'Comprender el Corán', description: 'Caminos para acercarse al Corán y comprenderlo.' },
    },
  },
  {
    id: 'prophet',
    icon: 'star-outline',
    accent: '#9C4B1B',
    label: {
      tr: { name: 'Hz. Muhammed’i Tanıma', description: 'Örnek bir hayatın güzelliklerinden ilhamlar.' },
      en: { name: 'Knowing the Prophet', description: 'Inspirations from the beauty of an exemplary life.' },
      fr: { name: 'Connaître le Prophète', description: 'Des inspirations tirées d’une vie exemplaire.' },
      'pt-BR': { name: 'Conhecer o Profeta', description: 'Inspirações da beleza de uma vida exemplar.' },
      de: { name: 'Den Propheten kennen', description: 'Inspirationen aus der Schönheit eines vorbildlichen Lebens.' },
      es: { name: 'Conocer al Profeta', description: 'Inspiraciones de la belleza de una vida ejemplar.' },
    },
  },
  {
    id: 'youth',
    icon: 'school-outline',
    accent: '#2A5C9C',
    label: {
      tr: { name: 'Gençlere Tebliğ', description: 'Gençlerin diliyle, onların dünyasına uygun anlatım.' },
      en: { name: 'Reaching the Youth', description: 'Sharing in the language and world of young people.' },
      fr: { name: 'S’adresser aux jeunes', description: 'Transmettre dans le langage et le monde des jeunes.' },
      'pt-BR': { name: 'Falar com os jovens', description: 'Compartilhar na linguagem e no mundo dos jovens.' },
      de: { name: 'Die Jugend erreichen', description: 'Vermitteln in der Sprache und Welt junger Menschen.' },
      es: { name: 'Llegar a los jóvenes', description: 'Compartir en el lenguaje y el mundo de los jóvenes.' },
    },
  },
  {
    id: 'social-media',
    icon: 'phone-portrait-outline',
    accent: '#5C2A9C',
    label: {
      tr: { name: 'Sosyal Medyada Tebliğ', description: 'Dijital dünyada zarif ve doğru paylaşım.' },
      en: { name: 'Dawah on Social Media', description: 'Elegant and accurate sharing in the digital world.' },
      fr: { name: 'La daawa sur les réseaux', description: 'Un partage élégant et juste dans le monde numérique.' },
      'pt-BR': { name: 'Daawa nas redes sociais', description: 'Compartilhamento elegante e correto no mundo digital.' },
      de: { name: 'Dawa in sozialen Medien', description: 'Würdevolles und korrektes Teilen in der digitalen Welt.' },
      es: { name: 'Dawah en redes sociales', description: 'Compartir con elegancia y exactitud en el mundo digital.' },
    },
  },
  {
    id: 'faq',
    icon: 'help-circle-outline',
    accent: '#9C1B5C',
    label: {
      tr: { name: 'Sık Sorulan Sorular', description: 'Merak edilen sorulara sade ve hikmetli cevaplar.' },
      en: { name: 'Frequently Asked', description: 'Simple, wise answers to common questions.' },
      fr: { name: 'Questions fréquentes', description: 'Des réponses simples et sages aux questions courantes.' },
      'pt-BR': { name: 'Perguntas frequentes', description: 'Respostas simples e sábias às perguntas comuns.' },
      de: { name: 'Häufige Fragen', description: 'Einfache, weise Antworten auf häufige Fragen.' },
      es: { name: 'Preguntas frecuentes', description: 'Respuestas sencillas y sabias a las preguntas comunes.' },
    },
  },
  {
    id: 'share-cards',
    icon: 'albums-outline',
    accent: '#C8962E',
    label: {
      tr: { name: 'Kısa Tebliğ Kartları', description: 'Tek bakışta paylaşılabilir, kısa hikmet mesajları.' },
      en: { name: 'Short Dawah Cards', description: 'Brief wisdom messages, shareable at a glance.' },
      fr: { name: 'Cartes de daawa', description: 'De brefs messages de sagesse, partageables d’un coup d’œil.' },
      'pt-BR': { name: 'Cartões de daawa', description: 'Mensagens breves de sabedoria, compartilháveis num olhar.' },
      de: { name: 'Kurze Dawa-Karten', description: 'Knappe Weisheitsbotschaften, auf einen Blick teilbar.' },
      es: { name: 'Tarjetas de dawah', description: 'Mensajes breves de sabiduría, fáciles de compartir de un vistazo.' },
    },
  },
  {
    id: 'daily-life',
    icon: 'sunny-outline',
    accent: '#B8841B',
    label: {
      tr: { name: 'Günlük Hayata Uygulama', description: 'Bilgiyi yaşayan bir hâle dönüştüren küçük adımlar.' },
      en: { name: 'Living It Daily', description: 'Small steps that turn knowledge into a living practice.' },
      fr: { name: 'Au quotidien', description: 'De petits pas qui transforment le savoir en pratique vivante.' },
      'pt-BR': { name: 'No dia a dia', description: 'Pequenos passos que transformam o saber em prática viva.' },
      de: { name: 'Im täglichen Leben', description: 'Kleine Schritte, die Wissen zu gelebter Praxis machen.' },
      es: { name: 'En el día a día', description: 'Pequeños pasos que convierten el saber en práctica viva.' },
    },
  },
];

/** Bir kategoriyi id ile bulur. */
export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
