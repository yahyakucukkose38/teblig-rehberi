// ============================================================================
// TİPOGRAFİ
// ----------------------------------------------------------------------------
// Yaşlı kullanıcıların da rahat okuyabilmesi için taban font boyutları
// cömerttir. Kullanıcı ayarındaki ölçek (fontScale) ile çarpılır.
// Sistem fontu kullanıyoruz; böylece harici font yükleme hatası riski olmaz.
// ============================================================================

export type FontScale = 'small' | 'medium' | 'large';

/** Kullanıcı ayarındaki font ölçeği çarpanları. */
export const fontScaleFactor: Record<FontScale, number> = {
  small: 0.92,
  medium: 1,
  large: 1.18,
};

/** Taban font boyutları (medium=1 iken). */
export const baseFontSizes = {
  caption: 13,
  small: 15,
  body: 17,
  subtitle: 19,
  title: 23,
  largeTitle: 30,
  hero: 36,
} as const;

export type FontSizeKey = keyof typeof baseFontSizes;

/** Seçili ölçeğe göre bir font boyutu döndürür. */
export function scaledFont(key: FontSizeKey, scale: FontScale): number {
  return Math.round(baseFontSizes[key] * fontScaleFactor[scale]);
}

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeights = {
  tight: 1.25,
  normal: 1.45,
  relaxed: 1.6,
} as const;
