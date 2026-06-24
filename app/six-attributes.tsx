// ============================================================================
// ALTI SIFAT EKRANI — "Dinimizi Yaşatan Altı Esas"
// ----------------------------------------------------------------------------
// Ana sayfadaki "6 Sıfat" butonundan açılır. İçerik src/data/sixAttributes.ts
// içinde tutulur ve özünde Türkçedir (Türkçe meal + hadis). Uygulama temasıyla
// uyumlu, sade ve okunaklı bir biçimde gösterilir.
// ============================================================================

import { AppCard } from '../src/components/AppCard';
import { ScreenHeader } from '../src/components/ScreenHeader';
import {
  sixAttributes,
  sixAttributesConclusion,
  sixAttributesIntro,
  type SaQuote,
} from '../src/data/sixAttributes';
import { useAppTheme } from '../src/theme/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SixAttributes() {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  // Âyet/hadis alıntı bloğu — sol kenarı vurgulu, kaynak gösterimli.
  const Quote = ({ icon, label, quote }: { icon: keyof typeof Ionicons.glyphMap; label: string; quote: SaQuote }) => (
    <View
      style={{
        marginTop: theme.spacing.md,
        backgroundColor: theme.colors.overlay,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.accent,
        borderRadius: theme.radius.md,
        padding: theme.spacing.lg,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
        <Ionicons name={icon} size={14} color={theme.colors.accent} />
        <Text
          style={{
            marginLeft: theme.spacing.xs,
            fontSize: theme.font('caption'),
            fontWeight: '700',
            color: theme.colors.accent,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {label}
        </Text>
      </View>
      <Text
        style={{
          fontSize: theme.font('body'),
          color: theme.colors.text,
          fontStyle: 'italic',
          lineHeight: theme.font('body') * 1.5,
        }}
      >
        “{quote.text}”
      </Text>
      <Text
        style={{
          marginTop: theme.spacing.sm,
          fontSize: theme.font('caption'),
          fontWeight: '600',
          color: theme.colors.textMuted,
        }}
      >
        {quote.ref}
      </Text>
    </View>
  );

  const body = (text: string) =>
    text.split('\n\n').map((p, i) => (
      <Text
        key={i}
        style={{
          fontSize: theme.font('body'),
          color: theme.colors.text,
          lineHeight: theme.font('body') * 1.55,
          marginTop: i === 0 ? 0 : theme.spacing.md,
        }}
      >
        {p}
      </Text>
    ));

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={sixAttributesIntro.title} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: insets.bottom + theme.spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Giriş */}
        <Text
          style={{
            fontSize: theme.font('subtitle'),
            fontWeight: '700',
            color: theme.colors.primary,
            textAlign: 'center',
            marginTop: theme.spacing.sm,
          }}
        >
          {sixAttributesIntro.lead}
        </Text>
        <Text
          style={{
            fontSize: theme.font('body'),
            color: theme.colors.textMuted,
            lineHeight: theme.font('body') * 1.55,
            marginTop: theme.spacing.lg,
          }}
        >
          {sixAttributesIntro.body}
        </Text>

        {/* Altı esas */}
        {sixAttributes.map((item) => (
          <AppCard key={item.no} style={{ marginTop: theme.spacing.xl }}>
            {/* Numara + başlık */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: theme.colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: theme.spacing.md,
                }}
              >
                <Text style={{ fontSize: theme.font('subtitle'), fontWeight: '700', color: theme.colors.onPrimary }}>
                  {item.no}
                </Text>
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: theme.font('subtitle'),
                  fontWeight: '700',
                  color: theme.colors.text,
                  lineHeight: theme.font('subtitle') * 1.25,
                }}
              >
                {item.title}
              </Text>
            </View>

            {/* Vurgulu kısa cümle (varsa) */}
            {item.lead ? (
              <Text
                style={{
                  marginTop: theme.spacing.md,
                  fontSize: theme.font('body'),
                  fontWeight: '700',
                  color: theme.colors.primary,
                  lineHeight: theme.font('body') * 1.4,
                }}
              >
                {item.lead}
              </Text>
            ) : null}

            {/* Açıklama */}
            <View style={{ marginTop: theme.spacing.md }}>{body(item.body)}</View>

            {/* Âyetler */}
            {item.verses.map((v, i) => (
              <Quote key={`v${i}`} icon="book-outline" label="Âyet" quote={v} />
            ))}

            {/* Hadisler */}
            {item.hadiths.map((h, i) => (
              <Quote key={`h${i}`} icon="chatbubble-ellipses-outline" label="Hadis" quote={h} />
            ))}

            {/* Hayatımıza nasıl taşırız? */}
            <Text
              style={{
                marginTop: theme.spacing.xl,
                fontSize: theme.font('caption'),
                fontWeight: '700',
                color: theme.colors.primary,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Hayatımıza nasıl taşırız?
            </Text>
            {item.applications.map((a, i) => (
              <View key={`a${i}`} style={{ flexDirection: 'row', marginTop: theme.spacing.sm }}>
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={theme.colors.success}
                  style={{ marginRight: theme.spacing.sm, marginTop: 2 }}
                />
                <Text
                  style={{
                    flex: 1,
                    fontSize: theme.font('body'),
                    color: theme.colors.text,
                    lineHeight: theme.font('body') * 1.45,
                  }}
                >
                  {a}
                </Text>
              </View>
            ))}
          </AppCard>
        ))}

        {/* Sonuç */}
        <View
          style={{
            marginTop: theme.spacing.xxl,
            paddingTop: theme.spacing.lg,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
          }}
        >
          <Text style={{ fontSize: theme.font('title'), fontWeight: '700', color: theme.colors.text }}>
            {sixAttributesConclusion.title}
          </Text>
          <Text
            style={{
              marginTop: theme.spacing.md,
              fontSize: theme.font('body'),
              color: theme.colors.text,
              lineHeight: theme.font('body') * 1.55,
            }}
          >
            {sixAttributesConclusion.body}
          </Text>
          <Quote icon="book-outline" label="Âyet" quote={sixAttributesConclusion.verse} />
          <Text
            style={{
              marginTop: theme.spacing.lg,
              fontSize: theme.font('body'),
              fontWeight: '600',
              fontStyle: 'italic',
              color: theme.colors.primary,
              lineHeight: theme.font('body') * 1.5,
            }}
          >
            {sixAttributesConclusion.dua}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
