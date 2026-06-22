// ============================================================================
// GİRİŞ — Yönlendirme
// ----------------------------------------------------------------------------
// Store hidrasyonu tamamlanana kadar kısa bir yükleniyor görünümü gösterir;
// ardından onboarding tamamlanmışsa ana sayfaya, değilse onboarding'e yönlendirir.
// ============================================================================

import { useAppStore } from '../src/store/useAppStore';
import { useAppTheme } from '../src/theme/useAppTheme';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const hasHydrated = useAppStore((s) => s.hasHydrated);
  const onboardingDone = useAppStore((s) => s.onboardingDone);
  const theme = useAppTheme();

  if (!hasHydrated) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return <Redirect href={onboardingDone ? '/home' : '/onboarding'} />;
}
