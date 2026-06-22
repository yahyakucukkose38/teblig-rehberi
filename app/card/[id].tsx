// ============================================================================
// PAYLAŞIM KARTI EKRANI — Bir konuyu veya günün notunu görsel kart olarak gösterir
// id = "daily"  -> günün notu
// id = <topicId> -> ilgili konunun paylaşılabilir mesajı
// ============================================================================

import { ScreenHeader } from '../../src/components/ScreenHeader';
import { ShareableCard } from '../../src/components/ShareableCard';
import { getCategoryById } from '../../src/data/categories';
import { getDailyNoteText } from '../../src/data/dailyNotes';
import { getTopicById } from '../../src/data/topics';
import { useAppStore } from '../../src/store/useAppStore';
import { useAppTheme } from '../../src/theme/useAppTheme';
import { getCategoryLabel, getTopicContent } from '../../src/utils/localize';
import { shareCardImage } from '../../src/utils/shareImage';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Share, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CardScreen() {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const language = useAppStore((s) => s.language);
  const cardRef = useRef<View>(null);

  // Kart içeriğini belirle
  let text = '';
  let label = '';
  if (id === 'daily') {
    text = getDailyNoteText(new Date(), language);
    label = t('daily.title');
  } else if (id) {
    const topic = getTopicById(id);
    if (topic) {
      text = getTopicContent(topic, language).shareText;
      const cat = getCategoryById(topic.category);
      label = cat ? getCategoryLabel(cat, language).name : t('card.title');
    }
  }
  const footer = t('copyright.shortNote');

  const Btn = ({
    icon,
    title,
    primary,
    onPress,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    primary?: boolean;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
        borderRadius: theme.radius.pill,
        backgroundColor: primary ? theme.colors.primary : theme.colors.surface,
        borderWidth: primary ? 0 : 1,
        borderColor: theme.colors.border,
        opacity: pressed ? 0.9 : 1,
        flex: 1,
      })}
    >
      <Ionicons
        name={icon}
        size={18}
        color={primary ? theme.colors.onPrimary : theme.colors.primary}
      />
      <Text
        style={{
          marginLeft: theme.spacing.sm,
          color: primary ? theme.colors.onPrimary : theme.colors.text,
          fontSize: theme.font('small'),
          fontWeight: '700',
        }}
      >
        {title}
      </Text>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t('card.title')} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: insets.bottom + theme.spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Kart önizlemesi */}
        <View style={{ ...theme.shadow.card, marginTop: theme.spacing.sm }}>
          <ShareableCard ref={cardRef} text={text} label={label} footer={footer} />
        </View>

        {/* Eylemler */}
        <View style={{ flexDirection: 'row', gap: theme.spacing.md, marginTop: theme.spacing.xl }}>
          <Btn
            icon="image-outline"
            title={t('card.shareImage')}
            primary
            onPress={() => shareCardImage(cardRef, text, t('card.title'))}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: theme.spacing.md, marginTop: theme.spacing.md }}>
          <Btn
            icon="chatbubble-outline"
            title={t('card.shareText')}
            onPress={() => {
              void Share.share({ message: `${text}\n\n— ${label}` });
            }}
          />
        </View>

        <Text
          style={{
            marginTop: theme.spacing.xl,
            fontSize: theme.font('caption'),
            color: theme.colors.textMuted,
            textAlign: 'center',
            lineHeight: theme.font('caption') * 1.5,
          }}
        >
          {t('card.screenshotHint')}
        </Text>
      </ScrollView>
    </View>
  );
}
