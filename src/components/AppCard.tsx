// ============================================================================
// AppCard — Genel kart sarmalayıcı
// Yuvarlatılmış köşeli, hafif gölgeli kart. Dokunulabilir (onPress) olabilir.
// ============================================================================

import React from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  /** İç boşluk uygulansın mı? (varsayılan: true) */
  padded?: boolean;
};

export function AppCard({ children, onPress, style, padded = true }: Props) {
  const theme = useAppTheme();

  const base: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: padded ? theme.spacing.lg : 0,
    ...theme.shadow.card,
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [base, { opacity: pressed ? 0.85 : 1 }, style]}
        accessibilityRole="button"
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[base, style]}>{children}</View>;
}
