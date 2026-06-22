// ============================================================================
// 404 — Eşleşmeyen route için temalı "sayfa bulunamadı" ekranı
// ============================================================================

import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useAppTheme } from '../src/theme/useAppTheme';

export default function NotFound() {
  const theme = useAppTheme();
  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.xl,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: theme.colors.overlay,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: theme.spacing.lg,
        }}
      >
        <Ionicons name="compass-outline" size={38} color={theme.colors.primary} />
      </View>

      <Text
        style={{
          fontSize: theme.font('title'),
          fontWeight: '700',
          color: theme.colors.text,
          textAlign: 'center',
        }}
      >
        {t('notFound.title')}
      </Text>
      <Text
        style={{
          fontSize: theme.font('small'),
          color: theme.colors.textMuted,
          textAlign: 'center',
          marginTop: theme.spacing.sm,
        }}
      >
        {t('notFound.body')}
      </Text>

      <Link
        href="/home"
        style={{
          marginTop: theme.spacing.xl,
          backgroundColor: theme.colors.primary,
          color: theme.colors.onPrimary,
          fontSize: theme.font('small'),
          fontWeight: '700',
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.xl,
          borderRadius: theme.radius.pill,
          overflow: 'hidden',
        }}
      >
        {t('notFound.goHome')}
      </Link>
    </View>
  );
}
