// ============================================================================
// ÇOK DİL DESTEĞİ (i18next + react-i18next)
// ----------------------------------------------------------------------------
// Tüm UI metinleri buradaki sözlüklerden gelir. İçerik (konular) ise
// src/data içinde çok dilli olarak tutulur. İlk dil cihaz diline göre tahmin
// edilir; kullanıcı onboarding'de veya ayarlardan değiştirebilir ve seçim
// store üzerinden cihazda saklanır.
// ============================================================================

import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { LanguageCode } from '../types/content';

import de from './de.json';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import ptBR from './pt-BR.json';
import tr from './tr.json';

export const resources = {
  tr: { translation: tr },
  en: { translation: en },
  fr: { translation: fr },
  'pt-BR': { translation: ptBR },
  es: { translation: es },
  de: { translation: de },
} as const;

export const SUPPORTED_LANGUAGES: LanguageCode[] = ['tr', 'en', 'fr', 'pt-BR', 'es', 'de'];

/**
 * Cihaz diline göre başlangıç dilini tahmin eder; bulamazsa 'tr'.
 * İspanyolca (es-419) tam dil olarak desteklenir; İspanyolca konuşan cihazlar 'es'e yönlendirilir.
 */
export function detectInitialLanguage(): LanguageCode {
  try {
    const locales = getLocales();
    for (const l of locales) {
      const tag = (l.languageTag ?? '').toLowerCase();
      const code = (l.languageCode ?? '').toLowerCase();
      if (tag.startsWith('pt')) return 'pt-BR';
      if (code === 'es' || tag.startsWith('es')) return 'es';
      if (code === 'tr') return 'tr';
      if (code === 'en') return 'en';
      if (code === 'fr') return 'fr';
      if (code === 'de') return 'de';
    }
  } catch {
    // expo-localization erişilemezse sessizce varsayılana düş.
  }
  return 'tr';
}

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: detectInitialLanguage(),
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: { escapeValue: false },
    returnNull: false,
  });
}

export default i18n;
