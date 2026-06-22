// ============================================================================
// AYARLAR EKRANI — Tema, font boyutu, dil, bildirim, hakkında, kaynakça, telif
// ============================================================================

import { AppCard } from '../src/components/AppCard';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { SectionTitle } from '../src/components/SectionTitle';
import { APP_NAME, APP_VERSION } from '../src/config/appConfig';
import { useAppStore } from '../src/store/useAppStore';
import type { ThemeMode } from '../src/theme/colors';
import { useAppTheme } from '../src/theme/useAppTheme';
import type { FontScale } from '../src/theme/typography';
import { LANGUAGES } from '../src/types/content';
import { SOURCE_BIBLIOGRAPHY } from '../src/utils/copyrightSafety';
import { ensureNotificationPermission } from '../src/utils/notifications';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const language = useAppStore((s) => s.language);
  const themeMode = useAppStore((s) => s.themeMode);
  const setThemeMode = useAppStore((s) => s.setThemeMode);
  const fontScale = useAppStore((s) => s.fontScale);
  const setFontScale = useAppStore((s) => s.setFontScale);
  const notificationsEnabled = useAppStore((s) => s.notificationsEnabled);
  const setNotificationsEnabled = useAppStore((s) => s.setNotificationsEnabled);
  const notificationHour = useAppStore((s) => s.notificationHour);
  const setNotificationHour = useAppStore((s) => s.setNotificationHour);

  // Bildirimi açarken izin iste; reddedilirse açma. Asıl zamanlama _layout'ta yapılır.
  const onToggleNotifications = async (v: boolean) => {
    if (v) {
      const ok = await ensureNotificationPermission();
      if (!ok) {
        Alert.alert(t('settings.notifications'), t('settings.permissionNeeded'));
        return;
      }
    }
    setNotificationsEnabled(v);
  };

  const REMINDER_HOURS = [7, 9, 12, 18, 21];
  const fmtHour = (h: number) => `${String(h).padStart(2, '0')}:00`;

  const currentLangLabel =
    LANGUAGES.find((l) => l.code === language)?.nativeLabel ?? language;

  // --- Segmentli seçim bileşeni (tema / font için) -------------------------
  function Segmented<T extends string>({
    value,
    options,
    onChange,
  }: {
    value: T;
    options: { value: T; label: string }[];
    onChange: (v: T) => void;
  }) {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.colors.surfaceAlt,
          borderRadius: theme.radius.md,
          padding: 4,
        }}
      >
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              style={{
                flex: 1,
                paddingVertical: theme.spacing.md,
                borderRadius: theme.radius.sm,
                alignItems: 'center',
                backgroundColor: active ? theme.colors.surface : 'transparent',
                ...(active ? theme.shadow.card : {}),
              }}
            >
              <Text
                style={{
                  fontSize: theme.font('small'),
                  fontWeight: active ? '700' : '500',
                  color: active ? theme.colors.primary : theme.colors.textMuted,
                }}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  }

  const Label = ({ children }: { children: string }) => (
    <Text
      style={{
        fontSize: theme.font('small'),
        fontWeight: '600',
        color: theme.colors.textMuted,
        marginBottom: theme.spacing.sm,
      }}
    >
      {children}
    </Text>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t('settings.title')} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: insets.bottom + theme.spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* GÖRÜNÜM */}
        <SectionTitle title={t('settings.appearance')} />
        <AppCard>
          <Label>{t('settings.theme')}</Label>
          <Segmented<ThemeMode>
            value={themeMode}
            onChange={setThemeMode}
            options={[
              { value: 'light', label: t('settings.themeLight') },
              { value: 'dark', label: t('settings.themeDark') },
              { value: 'system', label: t('settings.themeSystem') },
            ]}
          />

          <View style={{ height: theme.spacing.lg }} />

          <Label>{t('settings.fontSize')}</Label>
          <Segmented<FontScale>
            value={fontScale}
            onChange={setFontScale}
            options={[
              { value: 'small', label: t('settings.fontSmall') },
              { value: 'medium', label: t('settings.fontMedium') },
              { value: 'large', label: t('settings.fontLarge') },
            ]}
          />
        </AppCard>

        {/* İÇERİK */}
        <SectionTitle title={t('settings.content')} />
        <AppCard padded={false}>
          {/* Dil satırı */}
          <Pressable
            onPress={() => router.push('/language')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: theme.spacing.lg,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.border,
            }}
          >
            <Ionicons name="language-outline" size={20} color={theme.colors.primary} />
            <Text style={{ flex: 1, marginLeft: theme.spacing.md, fontSize: theme.font('body'), color: theme.colors.text }}>
              {t('settings.language')}
            </Text>
            <Text style={{ fontSize: theme.font('small'), color: theme.colors.textMuted, marginRight: theme.spacing.sm }}>
              {currentLangLabel}
            </Text>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.textMuted} />
          </Pressable>

          {/* Bildirim satırı */}
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: theme.spacing.lg }}>
            <Ionicons name="notifications-outline" size={20} color={theme.colors.primary} />
            <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
              <Text style={{ fontSize: theme.font('body'), color: theme.colors.text }}>
                {t('settings.notifications')}
              </Text>
              <Text style={{ fontSize: theme.font('caption'), color: theme.colors.textMuted, marginTop: 2 }}>
                {t('settings.notificationsDesc')}
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={onToggleNotifications}
              trackColor={{ false: theme.colors.border, true: theme.colors.primaryMuted }}
              thumbColor={notificationsEnabled ? theme.colors.primary : theme.colors.surface}
            />
          </View>

          {/* Hatırlatma saati (yalnızca bildirim açıkken) */}
          {notificationsEnabled ? (
            <View
              style={{
                paddingHorizontal: theme.spacing.lg,
                paddingBottom: theme.spacing.lg,
                borderTopWidth: 1,
                borderTopColor: theme.colors.border,
                paddingTop: theme.spacing.lg,
              }}
            >
              <Label>{t('settings.notificationTime')}</Label>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
                {REMINDER_HOURS.map((h) => {
                  const active = h === notificationHour;
                  return (
                    <Pressable
                      key={h}
                      onPress={() => setNotificationHour(h)}
                      style={{
                        paddingVertical: theme.spacing.sm,
                        paddingHorizontal: theme.spacing.lg,
                        borderRadius: theme.radius.pill,
                        backgroundColor: active ? theme.colors.primary : theme.colors.surfaceAlt,
                      }}
                    >
                      <Text
                        style={{
                          color: active ? theme.colors.onPrimary : theme.colors.textMuted,
                          fontWeight: active ? '700' : '500',
                          fontSize: theme.font('small'),
                        }}
                      >
                        {fmtHour(h)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : null}
        </AppCard>

        {/* HAKKINDA */}
        <SectionTitle title={t('settings.about')} />
        <AppCard>
          <Text style={{ fontSize: theme.font('body'), color: theme.colors.text, lineHeight: theme.font('body') * 1.55 }}>
            {t('settings.aboutBody')}
          </Text>
        </AppCard>

        {/* BİLGİLENDİRME NOTU — kesin hüküm değildir, ehil hocaya danışın */}
        <SectionTitle title={t('disclaimer.title')} />
        <AppCard style={{ backgroundColor: theme.colors.surfaceAlt }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Ionicons
              name="shield-half-outline"
              size={18}
              color={theme.colors.accent}
              style={{ marginTop: 2 }}
            />
            <Text
              style={{
                flex: 1,
                marginLeft: theme.spacing.sm,
                fontSize: theme.font('small'),
                color: theme.colors.textMuted,
                lineHeight: theme.font('small') * 1.55,
              }}
            >
              {t('disclaimer.body')}
            </Text>
          </View>
        </AppCard>

        {/* TELİF VE KAYNAK NOTU */}
        <SectionTitle title={t('settings.copyright')} />
        <AppCard style={{ backgroundColor: theme.colors.surfaceAlt }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
            <Ionicons name="shield-checkmark-outline" size={18} color={theme.colors.primary} />
            <Text style={{ marginLeft: theme.spacing.sm, fontSize: theme.font('small'), fontWeight: '700', color: theme.colors.text }}>
              {t('copyright.title')}
            </Text>
          </View>
          <Text style={{ fontSize: theme.font('small'), color: theme.colors.textMuted, lineHeight: theme.font('small') * 1.55 }}>
            {t('copyright.body')}
          </Text>
        </AppCard>

        {/* KAYNAKÇA */}
        <SectionTitle title={t('settings.sourcesTitle')} />
        <AppCard>
          <Text style={{ fontSize: theme.font('small'), color: theme.colors.textMuted, lineHeight: theme.font('small') * 1.55, marginBottom: theme.spacing.md }}>
            {t('settings.sourcesIntro')}
          </Text>
          {SOURCE_BIBLIOGRAPHY.map((source, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingVertical: theme.spacing.sm,
                borderTopWidth: i === 0 ? 0 : 1,
                borderTopColor: theme.colors.border,
              }}
            >
              <Ionicons
                name="bookmark-outline"
                size={15}
                color={theme.colors.accent}
                style={{ marginTop: 3, marginRight: theme.spacing.sm }}
              />
              <Text style={{ flex: 1, fontSize: theme.font('small'), color: theme.colors.text, lineHeight: theme.font('small') * 1.45 }}>
                {source}
              </Text>
            </View>
          ))}
        </AppCard>

        {/* Sürüm */}
        <Text
          style={{
            textAlign: 'center',
            marginTop: theme.spacing.xl,
            fontSize: theme.font('caption'),
            color: theme.colors.textMuted,
          }}
        >
          {APP_NAME} · {t('settings.version')} {APP_VERSION}
        </Text>
      </ScrollView>
    </View>
  );
}
