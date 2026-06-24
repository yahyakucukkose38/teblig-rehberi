// ============================================================================
// AppErrorBoundary — Uygulama çapında çökme koruması (Expo Router ErrorBoundary)
// ----------------------------------------------------------------------------
// Beklenmeyen bir hata olursa zarif, sakin bir ekran gösterir ve "tekrar dene"
// sunar. Tema/i18n/store'a BAĞIMLI DEĞİLDİR (onlar çökmüş olsa bile çalışsın diye
// renkler ve metin sabit; kısa biçimde iki dilli).
// ============================================================================

import { Ionicons } from '@expo/vector-icons';
import type { ErrorBoundaryProps } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const GREEN = '#0E4D34';
const GOLD = '#C8A24E';
const CREAM = '#F6EFDD';

export function AppErrorBoundary({ retry }: ErrorBoundaryProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: GREEN,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
      }}
    >
      <Ionicons name="leaf-outline" size={52} color={GOLD} />
      <Text
        style={{
          color: CREAM,
          fontSize: 21,
          fontWeight: '700',
          marginTop: 18,
          textAlign: 'center',
        }}
      >
        Bir şeyler ters gitti · Something went wrong
      </Text>
      <Text
        style={{
          color: 'rgba(246,239,221,0.7)',
          fontSize: 14,
          marginTop: 8,
          textAlign: 'center',
          lineHeight: 22,
        }}
      >
        Lütfen tekrar deneyin.{'\n'}
        Please try again.
      </Text>
      <Pressable
        onPress={() => retry()}
        style={({ pressed }) => ({
          marginTop: 26,
          backgroundColor: GOLD,
          paddingVertical: 14,
          paddingHorizontal: 34,
          borderRadius: 999,
          opacity: pressed ? 0.9 : 1,
        })}
      >
        <Text style={{ color: GREEN, fontWeight: '700', fontSize: 15 }}>
          Tekrar dene · Try again
        </Text>
      </Pressable>
    </View>
  );
}
