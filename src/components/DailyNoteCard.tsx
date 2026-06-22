// ============================================================================
// DailyNoteCard — Günün tebliğ notu kartı (vurgulu, paylaşılabilir)
// ============================================================================

import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';

type Props = {
  text: string;
  onPress?: () => void;
  onShare?: () => void;
};

export function DailyNoteCard({ text, onPress, onShare }: Props) {
  const theme = useAppTheme();
  const { t } = useTranslation();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: theme.colors.primary,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.xl,
        opacity: pressed ? 0.95 : 1,
        ...theme.shadow.card,
      })}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: theme.spacing.md,
        }}
      >
        <Ionicons name="sparkles" size={18} color={theme.colors.accent} />
        <Text
          style={{
            marginLeft: theme.spacing.sm,
            fontSize: theme.font('caption'),
            fontWeight: '700',
            color: theme.colors.accent,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}
        >
          {t('home.todayNote')}
        </Text>
      </View>

      <Text
        style={{
          fontSize: theme.font('subtitle'),
          color: theme.colors.onPrimary,
          lineHeight: theme.font('subtitle') * 1.45,
          fontWeight: '500',
        }}
      >
        “{text}”
      </Text>

      {onShare ? (
        <Pressable
          onPress={onShare}
          hitSlop={8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            marginTop: theme.spacing.lg,
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.lg,
            borderRadius: theme.radius.pill,
            backgroundColor: 'rgba(255,255,255,0.15)',
          }}
        >
          <Ionicons
            name="share-social-outline"
            size={16}
            color={theme.colors.onPrimary}
          />
          <Text
            style={{
              marginLeft: theme.spacing.sm,
              color: theme.colors.onPrimary,
              fontSize: theme.font('small'),
              fontWeight: '600',
            }}
          >
            {t('daily.share')}
          </Text>
        </Pressable>
      ) : null}
    </Pressable>
  );
}
