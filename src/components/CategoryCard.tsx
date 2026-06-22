// ============================================================================
// CategoryCard — Kategori kartı (ikon, ad, açıklama, konu sayısı)
// ============================================================================

import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';
import type { Category, LanguageCode } from '../types/content';
import { getCategoryLabel } from '../utils/localize';
import { AppCard } from './AppCard';

type Props = {
  category: Category;
  lang: LanguageCode;
  topicCount: number;
  onPress: () => void;
};

export function CategoryCard({ category, lang, topicCount, onPress }: Props) {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const label = getCategoryLabel(category, lang);

  return (
    <AppCard onPress={onPress} style={{ marginBottom: theme.spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: theme.radius.md,
            backgroundColor: category.accent + '22',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: theme.spacing.lg,
          }}
        >
          <Ionicons
            name={(category.icon as keyof typeof Ionicons.glyphMap) ?? 'book-outline'}
            size={26}
            color={category.accent}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: theme.font('body'),
              fontWeight: '700',
              color: theme.colors.text,
            }}
            numberOfLines={1}
          >
            {label.name}
          </Text>
          <Text
            style={{
              fontSize: theme.font('small'),
              color: theme.colors.textMuted,
              marginTop: 2,
            }}
            numberOfLines={2}
          >
            {label.description}
          </Text>
          <Text
            style={{
              fontSize: theme.font('caption'),
              color: theme.colors.primary,
              fontWeight: '600',
              marginTop: theme.spacing.xs,
            }}
          >
            {t('categories.topicsCount', { count: topicCount })}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.textMuted}
        />
      </View>
    </AppCard>
  );
}
