// ============================================================================
// TEMA HOOK'U
// ----------------------------------------------------------------------------
// Store'daki themeMode + cihazın sistem temasını birleştirip aktif paleti,
// font ölçeğini ve yardımcı fonksiyonları döndürür. Tüm ekranlar bunu kullanır.
// ============================================================================

import { useColorScheme } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { getPalette, type ThemePalette } from './colors';
import { radius, shadow, spacing } from './spacing';
import { scaledFont, type FontSizeKey } from './typography';

export type AppTheme = {
  colors: ThemePalette;
  isDark: boolean;
  spacing: typeof spacing;
  radius: typeof radius;
  shadow: typeof shadow;
  /** Aktif font ölçeğine göre boyut hesaplar. */
  font: (key: FontSizeKey) => number;
};

export function useAppTheme(): AppTheme {
  const systemScheme = useColorScheme();
  const themeMode = useAppStore((s) => s.themeMode);
  const fontScale = useAppStore((s) => s.fontScale);

  const isDark =
    themeMode === 'system' ? systemScheme === 'dark' : themeMode === 'dark';

  return {
    colors: getPalette(isDark),
    isDark,
    spacing,
    radius,
    shadow,
    font: (key) => scaledFont(key, fontScale),
  };
}
