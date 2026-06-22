// ============================================================================
// EmptyState — Boş durum görünümü (ikon + başlık + ipucu)
// ============================================================================

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  hint?: string;
};

export function EmptyState({ icon = 'leaf-outline', title, hint }: Props) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xxxl,
        paddingHorizontal: theme.spacing.xl,
      }}
    >
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: theme.colors.overlay,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: theme.spacing.lg,
        }}
      >
        <Ionicons name={icon} size={34} color={theme.colors.primary} />
      </View>

      <Text
        style={{
          fontSize: theme.font('subtitle'),
          fontWeight: '700',
          color: theme.colors.text,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>

      {hint ? (
        <Text
          style={{
            marginTop: theme.spacing.sm,
            fontSize: theme.font('small'),
            color: theme.colors.textMuted,
            textAlign: 'center',
            lineHeight: theme.font('small') * 1.5,
          }}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
