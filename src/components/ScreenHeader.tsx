// ============================================================================
// ScreenHeader — Tutarlı, temaya duyarlı üst başlık (geri butonu + sağ eylem)
// ============================================================================

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../theme/useAppTheme';

type Props = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  right?: React.ReactNode;
};

export function ScreenHeader({ title, subtitle, showBack = true, right }: Props) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + theme.spacing.sm,
        paddingBottom: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 40,
        }}
      >
        {showBack && router.canGoBack() ? (
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            accessibilityRole="button"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.surface,
              borderWidth: 1,
              borderColor: theme.colors.border,
              marginRight: theme.spacing.md,
            }}
          >
            <Ionicons name="chevron-back" size={22} color={theme.colors.text} />
          </Pressable>
        ) : null}

        <View style={{ flex: 1 }}>
          {title ? (
            <Text
              style={{
                fontSize: theme.font('title'),
                fontWeight: '700',
                color: theme.colors.text,
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text
              style={{
                fontSize: theme.font('small'),
                color: theme.colors.textMuted,
                marginTop: 2,
              }}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {right ? <View style={{ marginLeft: theme.spacing.md }}>{right}</View> : null}
      </View>
    </View>
  );
}
