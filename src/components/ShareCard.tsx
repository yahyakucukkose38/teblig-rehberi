// ============================================================================
// ShareCard — Paylaşılabilir kısa mesaj kartı (konu detayında)
// ============================================================================

import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';

type Props = {
  message: string;
  onShare: () => void;
};

export function ShareCard({ message, onShare }: Props) {
  const theme = useAppTheme();
  const { t } = useTranslation();

  return (
    <View
      style={{
        backgroundColor: theme.colors.accentSoft,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.xl,
        borderWidth: 1,
        borderColor: theme.colors.accent + '55',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: theme.spacing.md,
        }}
      >
        <Ionicons name="chatbubbles-outline" size={18} color={theme.colors.accent} />
        <Text
          style={{
            marginLeft: theme.spacing.sm,
            fontSize: theme.font('caption'),
            fontWeight: '700',
            color: theme.isDark ? theme.colors.accent : '#8A6A1E',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}
        >
          {t('topic.shareMessage')}
        </Text>
      </View>

      <Text
        style={{
          fontSize: theme.font('body'),
          color: theme.colors.text,
          lineHeight: theme.font('body') * 1.5,
          fontStyle: 'italic',
        }}
      >
        {message}
      </Text>

      <Pressable
        onPress={onShare}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-start',
          marginTop: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.xl,
          borderRadius: theme.radius.pill,
          backgroundColor: theme.colors.primary,
          opacity: pressed ? 0.9 : 1,
        })}
      >
        <Ionicons name="share-social" size={18} color={theme.colors.onPrimary} />
        <Text
          style={{
            marginLeft: theme.spacing.sm,
            color: theme.colors.onPrimary,
            fontSize: theme.font('small'),
            fontWeight: '700',
          }}
        >
          {t('common.share')}
        </Text>
      </Pressable>
    </View>
  );
}
