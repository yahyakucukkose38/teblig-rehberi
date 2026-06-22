// ============================================================================
// KONU DETAYI — Başlık, süre, özet, ana ilke, yansıma, ipucu, soru-cevap,
//               referans, paylaşılabilir mesaj ve kaynak notu.
// ============================================================================

import { AppCard } from '../../src/components/AppCard';
import { EmptyState } from '../../src/components/EmptyState';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { ShareCard } from '../../src/components/ShareCard';
import { getTopicById } from '../../src/data/topics';
import { useAppStore } from '../../src/store/useAppStore';
import { useAppTheme } from '../../src/theme/useAppTheme';
import { getTopicContent } from '../../src/utils/localize';
import { shareTopic } from '../../src/utils/shareContent';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TopicDetail() {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const language = useAppStore((s) => s.language);
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const markRead = useAppStore((s) => s.markRead);

  const topic = id ? getTopicById(id) : undefined;
  const isFavorite = topic ? favorites.includes(topic.id) : false;

  // Konu açıldığında "son okunanlar"a ekle.
  useEffect(() => {
    if (topic) markRead(topic.id);
  }, [topic, markRead]);

  if (!topic) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <ScreenHeader title="" />
        <EmptyState icon="alert-circle-outline" title={t('topic.notFound')} />
      </View>
    );
  }

  const c = getTopicContent(topic, language);

  // Bölüm başlığı + gövde için küçük yardımcı.
  const Section = ({
    icon,
    label,
    children,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    children: ReactNode;
  }) => (
    <View style={{ marginTop: theme.spacing.xl }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
        <Ionicons name={icon} size={16} color={theme.colors.primary} />
        <Text
          style={{
            marginLeft: theme.spacing.sm,
            fontSize: theme.font('caption'),
            fontWeight: '700',
            color: theme.colors.primary,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {label}
        </Text>
      </View>
      {children}
    </View>
  );

  const bodyText = (text: string) => (
    <Text
      style={{
        fontSize: theme.font('body'),
        color: theme.colors.text,
        lineHeight: theme.font('body') * 1.55,
      }}
    >
      {text}
    </Text>
  );

  const headerRight = (
    <View style={{ flexDirection: 'row' }}>
      <Pressable
        onPress={() => router.push(`/card/${topic.id}`)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={t('card.open')}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
          marginRight: theme.spacing.sm,
        }}
      >
        <Ionicons name="image-outline" size={20} color={theme.colors.text} />
      </Pressable>
      <Pressable
        onPress={() => toggleFavorite(topic.id)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? t('topic.removeFavorite') : t('topic.addFavorite')}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
          marginRight: theme.spacing.sm,
        }}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavorite ? theme.colors.danger : theme.colors.text}
        />
      </Pressable>
      <Pressable
        onPress={() => shareTopic(topic, language)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={t('common.share')}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <Ionicons name="share-social-outline" size={20} color={theme.colors.text} />
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader right={headerRight} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: insets.bottom + theme.spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Başlık + süre */}
        <Text
          style={{
            fontSize: theme.font('largeTitle'),
            fontWeight: '700',
            color: theme.colors.text,
            lineHeight: theme.font('largeTitle') * 1.2,
          }}
        >
          {c.title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.spacing.sm }}>
          <Ionicons name="time-outline" size={15} color={theme.colors.textMuted} />
          <Text style={{ marginLeft: 4, fontSize: theme.font('small'), color: theme.colors.textMuted }}>
            {t('common.readMinutes', { count: topic.estimatedReadMinutes })}
          </Text>
        </View>

        {/* Kısa açıklama */}
        <Text
          style={{
            fontSize: theme.font('subtitle'),
            color: theme.colors.textMuted,
            marginTop: theme.spacing.lg,
            lineHeight: theme.font('subtitle') * 1.45,
          }}
        >
          {c.shortDescription}
        </Text>

        {/* Ana ilke (vurgulu) */}
        <View
          style={{
            marginTop: theme.spacing.xl,
            backgroundColor: theme.colors.overlay,
            borderLeftWidth: 4,
            borderLeftColor: theme.colors.primary,
            borderRadius: theme.radius.md,
            padding: theme.spacing.lg,
          }}
        >
          <Text
            style={{
              fontSize: theme.font('caption'),
              fontWeight: '700',
              color: theme.colors.primary,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: theme.spacing.xs,
            }}
          >
            {t('topic.mainPrinciple')}
          </Text>
          <Text
            style={{
              fontSize: theme.font('subtitle'),
              fontWeight: '600',
              color: theme.colors.text,
              lineHeight: theme.font('subtitle') * 1.4,
            }}
          >
            {c.mainPrinciple}
          </Text>
        </View>

        {/* Özet (3 madde) */}
        <Section icon="list-outline" label={t('topic.summary')}>
          {c.summaryPoints.map((point, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: theme.spacing.sm }}>
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: theme.colors.accentSoft,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: theme.spacing.md,
                  marginTop: 2,
                }}
              >
                <Text style={{ fontSize: theme.font('caption'), fontWeight: '700', color: theme.colors.accent }}>
                  {i + 1}
                </Text>
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: theme.font('body'),
                  color: theme.colors.text,
                  lineHeight: theme.font('body') * 1.5,
                }}
              >
                {point}
              </Text>
            </View>
          ))}
        </Section>

        {/* Günlük hayata yansıması */}
        <Section icon="sunny-outline" label={t('topic.dailyReflection')}>
          {bodyText(c.dailyReflection)}
        </Section>

        {/* Tebliğ ipucu */}
        <Section icon="bulb-outline" label={t('topic.dawahTip')}>
          {bodyText(c.dawahTip)}
        </Section>

        {/* Soru - Cevap */}
        <Section icon="help-circle-outline" label={t('topic.qa')}>
          <AppCard style={{ backgroundColor: theme.colors.surfaceAlt }}>
            <Text style={{ fontSize: theme.font('body'), fontWeight: '700', color: theme.colors.text }}>
              {c.questionAnswer.question}
            </Text>
            <Text
              style={{
                fontSize: theme.font('body'),
                color: theme.colors.textMuted,
                marginTop: theme.spacing.sm,
                lineHeight: theme.font('body') * 1.5,
              }}
            >
              {c.questionAnswer.answer}
            </Text>
          </AppCard>
        </Section>

        {/* Ayet/Hadis referansı (varsa) */}
        {c.referenceNote ? (
          <Section icon="book-outline" label={t('topic.reference')}>
            {bodyText(c.referenceNote)}
          </Section>
        ) : null}

        {/* Paylaşılabilir mesaj */}
        <View style={{ marginTop: theme.spacing.xl }}>
          <ShareCard message={c.shareText} onShare={() => shareTopic(topic, language)} />
        </View>

        {/* Kaynak notu */}
        <View
          style={{
            marginTop: theme.spacing.xl,
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingTop: theme.spacing.lg,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
          }}
        >
          <Ionicons name="information-circle-outline" size={16} color={theme.colors.textMuted} />
          <Text
            style={{
              flex: 1,
              marginLeft: theme.spacing.sm,
              fontSize: theme.font('caption'),
              color: theme.colors.textMuted,
              lineHeight: theme.font('caption') * 1.5,
              fontStyle: 'italic',
            }}
          >
            {c.sourceNote}
          </Text>
        </View>

        {/* Bilgilendirme / sorumluluk notu — kesin hüküm değildir, ehil hocaya danışın */}
        <View
          style={{
            marginTop: theme.spacing.md,
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <Ionicons name="shield-half-outline" size={16} color={theme.colors.textMuted} />
          <Text
            style={{
              flex: 1,
              marginLeft: theme.spacing.sm,
              fontSize: theme.font('caption'),
              color: theme.colors.textMuted,
              lineHeight: theme.font('caption') * 1.5,
            }}
          >
            {t('disclaimer.body')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
