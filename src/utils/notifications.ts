// ============================================================================
// YEREL BİLDİRİMLER (expo-notifications)
// ----------------------------------------------------------------------------
// "Günün notu" için her gün belirli saatte yerel (offline) hatırlatma kurar.
// NOT: Expo Go'da yerel bildirimler çalışır; uzak (push) bildirim için gerçek
// derleme (dev/prod build) gerekir.
// ============================================================================

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const DAILY_ID = 'daily-note-reminder';
const ANDROID_CHANNEL = 'daily-note';

/** Bildirim davranışını ayarlar (uygulama açıkken de görünsün). _layout'tan çağrılır. */
export function configureNotifications(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

/** İzin ister; verildiyse true döner. */
export async function ensureNotificationPermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.granted;
}

/** Mevcut günlük hatırlatmayı iptal eder. */
export async function cancelDailyNote(): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(DAILY_ID);
  } catch {
    // zaten yoksa sorun değil
  }
}

/** Her gün verilen saatte tekrarlayan bir hatırlatma kurar. */
export async function scheduleDailyNote(
  hour: number,
  minute: number,
  title: string,
  body: string,
): Promise<void> {
  await cancelDailyNote();

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL, {
      name: 'Günün Notu',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  await Notifications.scheduleNotificationAsync({
    identifier: DAILY_ID,
    content: { title, body },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      channelId: Platform.OS === 'android' ? ANDROID_CHANNEL : undefined,
    },
  });
}
