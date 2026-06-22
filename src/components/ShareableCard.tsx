// ============================================================================
// ShareableCard — Paylaşılabilir görsel kart (marka yeşili + altın hilal)
// ----------------------------------------------------------------------------
// Kart, paylaşımda her cihazda AYNI görünsün diye uygulama temasından ve
// kullanıcının font ölçeği tercihinden BAĞIMSIZ olarak sabit marka renkleri ve
// sabit/adaptif punto kullanır. captureRef için dışa ref verir.
// ============================================================================

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { forwardRef } from 'react';
import { Text, View } from 'react-native';
import { APP_NAME } from '../config/appConfig';

// Sabit marka renkleri (paylaşım kartı için)
const GREEN_TOP = '#13643F';
const GREEN_BOTTOM = '#0A3A24';
const GOLD = '#E0B25A';
const CREAM = '#FBF7EF';

type Props = {
  text: string;
  label: string;
  footer?: string;
};

/** Gövde metninin uzunluğuna göre sabit (temadan bağımsız) punto seçer. */
function bodyFontFor(len: number): number {
  if (len > 240) return 20;
  if (len > 160) return 23;
  if (len > 90) return 26;
  return 30;
}

export const ShareableCard = forwardRef<View, Props>(function ShareableCard(
  { text, label, footer },
  ref,
) {
  const bodyFont = bodyFontFor(text.length);

  return (
    <View ref={ref} collapsable={false} style={{ borderRadius: 24, overflow: 'hidden' }}>
      <LinearGradient
        colors={[GREEN_TOP, GREEN_BOTTOM]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 28, minHeight: 420, justifyContent: 'space-between' }}
      >
        {/* Üst: hilal + etiket */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="moon" size={22} color={GOLD} />
          <Text
            style={{
              marginLeft: 10,
              color: GOLD,
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            {label}
          </Text>
        </View>

        {/* Orta: metin (sabit + adaptif punto; tema font ölçeğinden bağımsız) */}
        <View style={{ flex: 1, justifyContent: 'center', paddingVertical: 24 }}>
          <Text style={{ color: GOLD, fontSize: 44, lineHeight: 44, marginBottom: 6 }}>“</Text>
          <Text
            style={{
              color: CREAM,
              fontSize: bodyFont,
              lineHeight: Math.round(bodyFont * 1.45),
              fontWeight: '600',
            }}
          >
            {text}
          </Text>
        </View>

        {/* Alt: ince çizgi + kaynak notu + imza */}
        <View>
          <View style={{ height: 1, backgroundColor: 'rgba(224,178,90,0.4)', marginBottom: 14 }} />
          {footer ? (
            <Text
              style={{
                color: 'rgba(251,247,239,0.7)',
                fontSize: 12,
                lineHeight: 18,
                fontStyle: 'italic',
                marginBottom: 10,
              }}
            >
              {footer}
            </Text>
          ) : null}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="sparkles" size={14} color={GOLD} />
            <Text
              style={{
                marginLeft: 8,
                color: GOLD,
                fontSize: 14,
                fontWeight: '700',
              }}
            >
              {APP_NAME}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
});
