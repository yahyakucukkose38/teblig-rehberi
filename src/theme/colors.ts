// ============================================================================
// RENK PALETİ
// ----------------------------------------------------------------------------
// Sade, huzurlu, İslami estetiğe uygun bir palet.
// Ana renk: koyu yeşil / lacivert  •  Vurgu: altın/sıcak sarı
// Açık tema arka planı: krem  •  Koyu tema arka planı: koyu lacivert
// ============================================================================

export type ThemePalette = {
  primary: string;
  primaryMuted: string;
  accent: string;
  accentSoft: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  success: string;
  danger: string;
  overlay: string;
  // Sabit (temadan bağımsız) renkler
  onPrimary: string;
  onAccent: string;
};

/** Açık tema */
export const lightColors: ThemePalette = {
  primary: '#0F5132', // koyu yeşil
  primaryMuted: '#3E7C5A',
  accent: '#C8962E', // altın / sıcak sarı
  accentSoft: '#F3E4C2',
  background: '#FBF7EF', // açık krem
  surface: '#FFFFFF',
  surfaceAlt: '#F4EEE2',
  text: '#1F2421',
  textMuted: '#5C6660',
  border: '#E5DDcd',
  success: '#2E7D52',
  danger: '#B23A2E',
  overlay: 'rgba(15, 81, 50, 0.06)',
  onPrimary: '#FFFFFF',
  onAccent: '#1F2421',
};

/** Koyu tema */
export const darkColors: ThemePalette = {
  primary: '#1B9C6B', // koyu zeminde okunur yeşil ton
  primaryMuted: '#7FB89E',
  accent: '#E0B25A', // altın
  accentSoft: '#3A3320',
  background: '#0E1726', // koyu lacivert
  surface: '#16223A',
  surfaceAlt: '#1E2C49',
  text: '#EAF0F6',
  textMuted: '#9BAAC0',
  border: '#27365A',
  success: '#3FBF86',
  danger: '#E06A5C',
  overlay: 'rgba(255, 255, 255, 0.05)',
  onPrimary: '#06121A',
  onAccent: '#0E1726',
};

export type ThemeMode = 'light' | 'dark' | 'system';

/** Etkin moda göre paleti döndürür. */
export function getPalette(isDark: boolean): ThemePalette {
  return isDark ? darkColors : lightColors;
}
