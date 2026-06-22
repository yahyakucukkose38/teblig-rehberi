// ============================================================================
// ONBOARDING — İlk açılış: amaç, dil seçimi, telif notu, "Başla"
// ============================================================================

import { AppCard } from '../src/components/AppCard';
import { LanguageSelector } from '../src/components/LanguageSelector';
import { useAppStore } from '../src/store/useAppStore';
import { useAppTheme } from '../src/theme/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Onboarding() {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);

  const points = [
    { title: t('onboarding.point1Title'), text: t('onboarding.point1'), icon: 'walk-outline' as const },
    { title: t('onboarding.point2Title'), text: t('onboarding.point2'), icon: 'heart-outline' as const },
    { title: t('onboarding.point3Title'), text: t('onboarding.point3'), icon: 'shield-checkmark-outline' as const },
  ];

  const onStart = () => {
    completeOnboarding();
    router.replace('/home');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + theme.spacing.xl,
          paddingBottom: theme.spacing.xxl,
          paddingHorizontal: theme.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo / başlık */}
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.xl }}>
          <View
            style={{
              width: 84,
              height: 84,
              borderRadius: 42,
              backgroundColor: theme.colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.lg,
            }}
          >
            <Ionicons name="moon" size={42} color={theme.colors.accent} />
          </View>
          <Text
            style={{
              fontSize: theme.font('largeTitle'),
              fontWeight: '700',
              color: theme.colors.text,
              textAlign: 'center',
            }}
          >
            {t('onboarding.title')}
          </Text>
          <Text
            style={{
              fontSize: theme.font('body'),
              color: theme.colors.textMuted,
              textAlign: 'center',
              marginTop: theme.spacing.sm,
              lineHeight: theme.font('body') * 1.5,
            }}
          >
            {t('onboarding.subtitle')}
          </Text>
        </View>

        {/* Amaç */}
        <AppCard style={{ marginBottom: theme.spacing.lg }}>
          <Text
            style={{
              fontSize: theme.font('caption'),
              fontWeight: '700',
              color: theme.colors.primary,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: theme.spacing.sm,
            }}
          >
            {t('onboarding.purposeTitle')}
          </Text>
          <Text
            style={{
              fontSize: theme.font('body'),
              color: theme.colors.text,
              lineHeight: theme.font('body') * 1.55,
            }}
          >
            {t('onboarding.purpose')}
          </Text>
        </AppCard>

        {/* İlkeler */}
        {points.map((p, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: theme.spacing.lg,
              paddingHorizontal: theme.spacing.xs,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: theme.colors.overlay,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: theme.spacing.md,
              }}
            >
              <Ionicons name={p.icon} size={20} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: theme.font('body'), fontWeight: '700', color: theme.colors.text }}>
                {p.title}
              </Text>
              <Text
                style={{
                  fontSize: theme.font('small'),
                  color: theme.colors.textMuted,
                  marginTop: 2,
                  lineHeight: theme.font('small') * 1.45,
                }}
              >
                {p.text}
              </Text>
            </View>
          </View>
        ))}

        {/* Dil seçimi */}
        <Text
          style={{
            fontSize: theme.font('subtitle'),
            fontWeight: '700',
            color: theme.colors.text,
            marginTop: theme.spacing.md,
            marginBottom: theme.spacing.sm,
          }}
        >
          {t('onboarding.chooseLanguage')}
        </Text>
        <AppCard padded={false} style={{ marginBottom: theme.spacing.lg, paddingHorizontal: theme.spacing.sm }}>
          <LanguageSelector value={language} onChange={setLanguage} />
        </AppCard>

        {/* Telif notu */}
        <AppCard style={{ backgroundColor: theme.colors.surfaceAlt, marginBottom: theme.spacing.xl }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
            <Ionicons name="document-text-outline" size={16} color={theme.colors.primary} />
            <Text
              style={{
                marginLeft: theme.spacing.sm,
                fontSize: theme.font('caption'),
                fontWeight: '700',
                color: theme.colors.text,
              }}
            >
              {t('onboarding.copyrightTitle')}
            </Text>
          </View>
          <Text
            style={{
              fontSize: theme.font('small'),
              color: theme.colors.textMuted,
              lineHeight: theme.font('small') * 1.5,
            }}
          >
            {t('onboarding.copyrightNote')}
          </Text>
        </AppCard>

        {/* Başla */}
        <Pressable
          onPress={onStart}
          style={({ pressed }) => ({
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.pill,
            paddingVertical: theme.spacing.lg,
            alignItems: 'center',
            opacity: pressed ? 0.9 : 1,
            ...theme.shadow.card,
          })}
        >
          <Text style={{ color: theme.colors.onPrimary, fontSize: theme.font('body'), fontWeight: '700' }}>
            {t('onboarding.startButton')}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
