// ============================================================================
// GÜNÜN NOTU EKRANI — Her gün değişen kısa tebliğ notu + paylaşım
// ============================================================================

import { DailyNoteCard } from '../src/components/DailyNoteCard';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { getDailyNoteText } from '../src/data/dailyNotes';
import { useAppStore } from '../src/store/useAppStore';
import { useAppTheme } from '../src/theme/useAppTheme';
import { shareText } from '../src/utils/shareContent';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DailyNoteScreen() {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const language = useAppStore((s) => s.language);

  const text = getDailyNoteText(new Date(), language);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t('daily.title')} subtitle={t('daily.subtitle')} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: insets.bottom + theme.spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: theme.spacing.md }}>
          <DailyNoteCard text={text} onShare={() => shareText(t('daily.title'), text)} />
        </View>

        {/* Görsel kart oluştur */}
        <Pressable
          onPress={() => router.push('/card/daily')}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: theme.spacing.lg,
            paddingVertical: theme.spacing.lg,
            borderRadius: theme.radius.pill,
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border,
            opacity: pressed ? 0.9 : 1,
          })}
        >
          <Ionicons name="image-outline" size={18} color={theme.colors.primary} />
          <Text
            style={{
              marginLeft: theme.spacing.sm,
              color: theme.colors.text,
              fontSize: theme.font('small'),
              fontWeight: '700',
            }}
          >
            {t('card.open')}
          </Text>
        </Pressable>

        <Text
          style={{
            marginTop: theme.spacing.xl,
            fontSize: theme.font('caption'),
            color: theme.colors.textMuted,
            textAlign: 'center',
            lineHeight: theme.font('caption') * 1.5,
            fontStyle: 'italic',
          }}
        >
          {t('copyright.shortNote')}
        </Text>
      </ScrollView>
    </View>
  );
}
