// ============================================================================
// KÖK LAYOUT — Expo Router Stack
// ----------------------------------------------------------------------------
// i18n burada (yan etki olarak) başlatılır. Bildirim davranışı kurulur ve
// kullanıcı "bildirim"i açıksa günlük hatırlatma (seçili saat + aktif dil ile)
// yeniden zamanlanır. Tüm ekranlar tema renkleriyle uyumlu başlık kullanır.
// ============================================================================

import '../src/i18n'; // i18n başlatma (yan etki)

import { useAppStore } from '../src/store/useAppStore';
import { useAppTheme } from '../src/theme/useAppTheme';
import {
  cancelDailyNote,
  configureNotifications,
  ensureNotificationPermission,
  scheduleDailyNote,
} from '../src/utils/notifications';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Expo Go'da beklenen, ZARARSIZ bilgilendirme uyarısını gizle:
// expo-notifications'ın uzak (push) bildirimleri Expo Go'da desteklenmez; bizim
// kullandığımız YEREL günlük hatırlatma çalışır. Uyarı yalnızca bilgilendirmedir.
// (Tam push desteği için ileride bir "development build" alınabilir.)
LogBox.ignoreLogs(['expo-notifications', 'Android Push notifications']);

// Uygulama çapında çökme koruması — Expo Router bu adlı export'u otomatik kullanır.
export { AppErrorBoundary as ErrorBoundary } from '../src/components/AppErrorBoundary';

export default function RootLayout() {
  const theme = useAppTheme();
  const { t } = useTranslation();

  const hasHydrated = useAppStore((s) => s.hasHydrated);
  const notificationsEnabled = useAppStore((s) => s.notificationsEnabled);
  const notificationHour = useAppStore((s) => s.notificationHour);

  // Bildirim davranışını bir kez ayarla.
  useEffect(() => {
    configureNotifications();
  }, []);

  // Tercih/dile/saate göre günlük hatırlatmayı zamanla veya iptal et.
  useEffect(() => {
    if (!hasHydrated) return;
    if (notificationsEnabled) {
      void (async () => {
        const ok = await ensureNotificationPermission();
        if (ok) {
          await scheduleDailyNote(notificationHour, 0, t('notif.title'), t('notif.body'));
        }
      })();
    } else {
      void cancelDailyNote();
    }
  }, [hasHydrated, notificationsEnabled, notificationHour, t]);

  return (
    <SafeAreaProvider>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.text,
          headerTitleStyle: { fontWeight: '700', color: theme.colors.text },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="six-attributes" options={{ headerShown: false }} />
        <Stack.Screen name="dawah-framework" options={{ headerShown: false }} />
        <Stack.Screen name="categories" options={{ headerShown: false }} />
        <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="topic/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="card/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="favorites" options={{ headerShown: false }} />
        <Stack.Screen name="daily-note" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="language" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
