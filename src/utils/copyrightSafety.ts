// ============================================================================
// TELİF GÜVENLİĞİ KURALLARI ve YARDIMCILARI
// ----------------------------------------------------------------------------
// Bu uygulamadaki TÜM içerik aşağıdaki ilkelere göre üretilir. Bu dosya hem
// belge (insanlar için kural metni) hem de hafif bir runtime kontrol sağlar.
//
//  İÇERİK ÜRETİM İLKELERİ (özet):
//   1. Yararlanılan kitaplardan hiçbir paragraf, cümle dizisi veya bölüm
//      düzeni AYNEN alınmaz.
//   2. Kitapların doğrudan tercümesi yapılmaz (tercüme de türev eser olabilir).
//   3. Her içerik özgün, kısa ve sade cümlelerle yeniden yazılır.
//   4. Ayet ve hadis kullanılacaksa yalnızca KAYNAK gösterilir, uzun alıntı
//      yapılmaz.
//   5. Kitap PDF/MD dosyaları uygulamaya gömülmez, hiçbir yerden import edilmez.
//   6. Her içeriğin altında bir "kaynak/telif notu" bulunur.
//   7. Kurumsal kaynak adları yalnızca "kaynakça" bölümünde geçer.
// ============================================================================

/** İçerik üretiminde uyulan ilkelerin makine-okur listesi (Hakkında ekranı vb.) */
export const COPYRIGHT_PRINCIPLES: string[] = [
  'no-verbatim-copy',
  'no-direct-translation',
  'original-short-rewrite',
  'cite-verses-and-hadith-only',
  'no-embedded-book-files',
  'source-note-on-every-item',
  'institutional-names-in-bibliography-only',
];

/**
 * Yararlanılan kaynak havuzu. DİKKAT: Bu yalnızca "kaynakça" amaçlıdır;
 * bu kitapların metinleri uygulamada GÖSTERİLMEZ.
 */
export const SOURCE_BIBLIOGRAPHY: string[] = [
  'İslam’da Tebliğ, Davet ve İrşad',
  'İslam Nedir?',
  'İslam’da Allah’a İman',
  'İslam’da Meleklere İman',
  'İslam’da Kitaplara İman',
  'İslam’da Peygamberlere İman',
  'İslam’da Kader ve Kazâ İnancı',
  'Müminin Miracı Namaz',
  'Ramazanın Bereketi Oruç',
  'Canın ve Malın Sigortası Zekât',
  'Bir Mübarek Sefer Hac',
  'Teslimiyetin Sembolü Kurban',
  'Kulluğun Özü Dua',
  'İslam’da Güzel Ahlak',
  'İslam’da Aile',
  'Müslüman’ın Günlük Hayatında Helaller ve Haramlar',
  'Sözlerin En Güzeli Kur’an',
  'Allah’ın Son Elçisi Hz. Muhammed',
  'Âlemin Göz Bebeği İnsan',
  'Din Nedir Ne Değildir?',
];

/** Çok dilli telif/kaynak notu için anahtar (i18n: copyright.body). */
export const COPYRIGHT_NOTICE_I18N_KEY = 'copyright.body';

/**
 * Geliştirme yardımcısı: bir metnin "çok uzun" olup olmadığını kabaca ölçer.
 * Özgün özetler kısa olmalıdır; bu, gözden kaçan uzun blokları yakalamaya yarar.
 * (Üretimde kullanılmaz, geliştirici içindir.)
 */
export function looksTooLong(text: string, maxWords = 80): boolean {
  return text.trim().split(/\s+/).length > maxWords;
}
