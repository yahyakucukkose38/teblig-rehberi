// ============================================================================
// LanguageSelector — Dil seçim listesi (mevcut dil işaretli)
// ============================================================================

import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';
import { LANGUAGES, type LanguageCode } from '../types/content';

type Props = {
  value: LanguageCode;
  onChange: (lang: LanguageCode) => void;
};

export function LanguageSelector({ value, onChange }: Props) {
  const theme = useAppTheme();

  return (
    <View>
      {LANGUAGES.map((lang, index) => {
        const selected = lang.code === value;
        return (
          <Pressable
            key={lang.code}
            onPress={() => onChange(lang.code)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: theme.spacing.lg,
              paddingHorizontal: theme.spacing.lg,
              backgroundColor: selected
                ? theme.colors.overlay
                : 'transparent',
              borderRadius: theme.radius.md,
              opacity: pressed ? 0.8 : 1,
              borderBottomWidth: index === LANGUAGES.length - 1 ? 0 : 1,
              borderBottomColor: theme.colors.border,
            })}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: theme.font('body'),
                  fontWeight: selected ? '700' : '500',
                  color: theme.colors.text,
                }}
              >
                {lang.nativeLabel}
              </Text>
            </View>

            {selected ? (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={theme.colors.primary}
              />
            ) : (
              <Ionicons
                name="ellipse-outline"
                size={24}
                color={theme.colors.border}
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
