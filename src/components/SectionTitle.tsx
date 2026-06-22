// ============================================================================
// SectionTitle — Bölüm başlığı (isteğe bağlı "Tümünü gör" eylemiyle)
// ============================================================================

import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';

type Props = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionTitle({ title, actionLabel, onAction }: Props) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.md,
        marginTop: theme.spacing.lg,
      }}
    >
      <Text
        style={{
          fontSize: theme.font('subtitle'),
          fontWeight: '700',
          color: theme.colors.text,
        }}
      >
        {title}
      </Text>

      {actionLabel && onAction ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text
            style={{
              fontSize: theme.font('small'),
              fontWeight: '600',
              color: theme.colors.primary,
            }}
          >
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
