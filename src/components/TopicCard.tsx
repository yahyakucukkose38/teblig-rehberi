// ============================================================================
// TopicCard — Konu kartı (başlık, kısa açıklama, okuma süresi, favori kalbi)
// ============================================================================

import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';
import type { LanguageCode, Topic } from '../types/content';
import { getTopicContent } from '../utils/localize';
import { AppCard } from './AppCard';

type Props = {
  topic: Topic;
  lang: LanguageCode;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export function TopicCard({
  topic,
  lang,
  onPress,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const c = getTopicContent(topic, lang);

  return (
    <AppCard onPress={onPress} style={{ marginBottom: theme.spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.overlay,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: theme.spacing.md,
          }}
        >
          <Ionicons
            name={(topic.icon as keyof typeof Ionicons.glyphMap) ?? 'book-outline'}
            size={22}
            color={theme.colors.primary}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: theme.font('body'),
              fontWeight: '700',
              color: theme.colors.text,
            }}
            numberOfLines={2}
          >
            {c.title}
          </Text>
          <Text
            style={{
              fontSize: theme.font('small'),
              color: theme.colors.textMuted,
              marginTop: 4,
              lineHeight: theme.font('small') * 1.45,
            }}
            numberOfLines={2}
          >
            {c.shortDescription}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: theme.spacing.sm,
            }}
          >
            <Ionicons
              name="time-outline"
              size={14}
              color={theme.colors.textMuted}
            />
            <Text
              style={{
                fontSize: theme.font('caption'),
                color: theme.colors.textMuted,
                marginLeft: 4,
              }}
            >
              {t('common.readMinutes', { count: topic.estimatedReadMinutes })}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={onToggleFavorite}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite ? t('topic.removeFavorite') : t('topic.addFavorite')
          }
          style={{ padding: 4 }}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? theme.colors.danger : theme.colors.textMuted}
          />
        </Pressable>
      </View>
    </AppCard>
  );
}
