// ============================================================================
// DİL AYARLARI EKRANI — Uygulama dilini seç (seçim cihazda saklanır)
// ============================================================================

import { AppCard } from '../src/components/AppCard';
import { LanguageSelector } from '../src/components/LanguageSelector';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { useAppStore } from '../src/store/useAppStore';
import { useAppTheme } from '../src/theme/useAppTheme';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LanguageScreen() {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t('language.title')} subtitle={t('language.subtitle')} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: insets.bottom + theme.spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <AppCard padded={false} style={{ paddingHorizontal: theme.spacing.sm }}>
          <LanguageSelector value={language} onChange={setLanguage} />
        </AppCard>
      </ScrollView>
    </View>
  );
}
