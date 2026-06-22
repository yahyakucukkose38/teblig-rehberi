// ============================================================================
// UYGULAMA STATE YÖNETİMİ (Zustand + AsyncStorage)
// ----------------------------------------------------------------------------
// Kullanıcı tercihleri (dil, tema, font), favoriler, okuma ilerlemesi ve
// onboarding durumu cihazda kalıcı olarak saklanır. İnternet gerekmez.
// ============================================================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import i18n, { detectInitialLanguage } from '../i18n';
import type { ThemeMode } from '../theme/colors';
import type { FontScale } from '../theme/typography';
import type { LanguageCode } from '../types/content';

/** Son okunan bir konunun kaydı. */
export type RecentEntry = {
  topicId: string;
  /** Unix zaman damgası (ms) */
  readAt: number;
};

type AppState = {
  /** Zustand persist hidrasyonu tamamlandı mı? (ilk açılış akışı için) */
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;

  /** İlk açılış/onboarding tamamlandı mı? */
  onboardingDone: boolean;
  completeOnboarding: () => void;

  /** Aktif dil */
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;

  /** Tema modu */
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;

  /** Font ölçeği */
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;

  /** Bildirim tercihi (yerel; "günün notu" hatırlatması) */
  notificationsEnabled: boolean;
  setNotificationsEnabled: (v: boolean) => void;

  /** Günlük hatırlatma saati (0-23) */
  notificationHour: number;
  setNotificationHour: (h: number) => void;

  /** Favori konu id'leri */
  favorites: string[];
  toggleFavorite: (topicId: string) => void;
  isFavorite: (topicId: string) => boolean;

  /** Son okunanlar (en yeni başta, en fazla 20 kayıt) */
  recents: RecentEntry[];
  markRead: (topicId: string) => void;
  clearRecents: () => void;
};

const MAX_RECENTS = 20;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      onboardingDone: false,
      completeOnboarding: () => set({ onboardingDone: true }),

      // Yeni kurulumda (kalıcı kayıt yokken) cihaz diline göre başla.
      // Kayıt varsa onRehydrateStorage saklanan dili uygular.
      language: detectInitialLanguage(),
      setLanguage: (lang) => {
        // i18n'i de senkron tut
        void i18n.changeLanguage(lang);
        set({ language: lang });
      },

      themeMode: 'system',
      setThemeMode: (mode) => set({ themeMode: mode }),

      fontScale: 'medium',
      setFontScale: (scale) => set({ fontScale: scale }),

      notificationsEnabled: false,
      setNotificationsEnabled: (v) => set({ notificationsEnabled: v }),

      notificationHour: 9,
      setNotificationHour: (h) => set({ notificationHour: h }),

      favorites: [],
      toggleFavorite: (topicId) =>
        set((state) => ({
          favorites: state.favorites.includes(topicId)
            ? state.favorites.filter((id) => id !== topicId)
            : [topicId, ...state.favorites],
        })),
      isFavorite: (topicId) => get().favorites.includes(topicId),

      recents: [],
      markRead: (topicId) =>
        set((state) => {
          const filtered = state.recents.filter((r) => r.topicId !== topicId);
          const next: RecentEntry[] = [{ topicId, readAt: nowMs() }, ...filtered];
          return { recents: next.slice(0, MAX_RECENTS) };
        }),
      clearRecents: () => set({ recents: [] }),
    }),
    {
      name: 'teblig-rehberi-store',
      storage: createJSONStorage(() => AsyncStorage),
      // hasHydrated'ı kalıcı verilere yazmıyoruz; runtime bayrağıdır.
      partialize: (state) => ({
        onboardingDone: state.onboardingDone,
        language: state.language,
        themeMode: state.themeMode,
        fontScale: state.fontScale,
        notificationsEnabled: state.notificationsEnabled,
        notificationHour: state.notificationHour,
        favorites: state.favorites,
        recents: state.recents,
      }),
      onRehydrateStorage: () => (state) => {
        // Hidrasyon bittiğinde dili i18n'e uygula ve bayrağı kaldır.
        if (state?.language) {
          void i18n.changeLanguage(state.language);
        }
        state?.setHasHydrated(true);
      },
    },
  ),
);

/**
 * Date.now() doğrudan kullanımı yerine küçük bir sarmalayıcı; test ve
 * okunabilirlik için. Runtime'da gerçek zamanı döndürür.
 */
function nowMs(): number {
  return Date.now();
}
