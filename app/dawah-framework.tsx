// ============================================================================
// TEBLİĞ ÇERÇEVESİ EKRANI — "Tebliğde Ana Çerçeve" + "Kısa Konuşma Metni"
// ----------------------------------------------------------------------------
// Ana sayfadaki "Tebliğ Çerçevesi" butonundan açılır. İçerik
// src/data/dawahFramework.ts içinde esnek "blok" yapısıyla tutulur ve burada
// uygulama temasına uygun biçimde render edilir. Metindeki **kalın** vurgular
// satır-içi olarak işlenir.
// ============================================================================

import { AppCard } from '../src/components/AppCard';
import { ScreenHeader } from '../src/components/ScreenHeader';
import {
  dawahFramework,
  dawahFrameworkIntro,
  dawahSpeech,
  type TfBlock,
} from '../src/data/dawahFramework';
import { useAppTheme } from '../src/theme/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { Fragment, type ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DawahFramework() {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  // "**kalın**" vurguları satır-içi <Text> olarak render eder.
  const rich = (text: string): ReactNode =>
    text.split('**').map((seg, i) =>
      i % 2 === 1 ? (
        <Text key={i} style={{ fontWeight: '700', color: theme.colors.text }}>
          {seg}
        </Text>
      ) : (
        <Fragment key={i}>{seg}</Fragment>
      ),
    );

  const paragraph = (text: string, key?: string | number) => (
    <Text
      key={key}
      style={{
        fontSize: theme.font('body'),
        color: theme.colors.text,
        lineHeight: theme.font('body') * 1.55,
        marginTop: theme.spacing.md,
      }}
    >
      {rich(text)}
    </Text>
  );

  const renderBlock = (block: TfBlock, i: number) => {
    switch (block.type) {
      case 'p':
        return paragraph(block.text, i);
      case 'subhead':
        return (
          <Text
            key={i}
            style={{
              marginTop: theme.spacing.lg,
              fontSize: theme.font('body'),
              fontWeight: '700',
              color: theme.colors.primary,
            }}
          >
            {rich(block.text)}
          </Text>
        );
      case 'quote':
        return (
          <View
            key={i}
            style={{
              marginTop: theme.spacing.md,
              backgroundColor: theme.colors.overlay,
              borderLeftWidth: 3,
              borderLeftColor: theme.colors.accent,
              borderRadius: theme.radius.md,
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: theme.font('body'),
                color: theme.colors.text,
                fontStyle: 'italic',
                lineHeight: theme.font('body') * 1.55,
              }}
            >
              {rich(block.text)}
            </Text>
          </View>
        );
      case 'list':
        return (
          <View key={i} style={{ marginTop: theme.spacing.sm }}>
            {block.items.map((item, j) => (
              <View key={j} style={{ flexDirection: 'row', marginTop: theme.spacing.sm }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: theme.colors.accent,
                    marginTop: theme.font('body') * 0.6,
                    marginRight: theme.spacing.md,
                  }}
                />
                <Text
                  style={{
                    flex: 1,
                    fontSize: theme.font('body'),
                    color: theme.colors.text,
                    lineHeight: theme.font('body') * 1.45,
                  }}
                >
                  {rich(item)}
                </Text>
              </View>
            ))}
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={dawahFrameworkIntro.title} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: insets.bottom + theme.spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Altı bölüm */}
        {dawahFramework.map((section) => (
          <AppCard key={section.no} style={{ marginTop: theme.spacing.xl }}>
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
                  {section.no}
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
                {section.title}
              </Text>
            </View>

            {section.blocks.map(renderBlock)}
          </AppCard>
        ))}

        {/* Kısa Konuşma Metni */}
        <View
          style={{
            marginTop: theme.spacing.xxl,
            paddingTop: theme.spacing.lg,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="mic-outline" size={20} color={theme.colors.primary} />
            <Text
              style={{
                marginLeft: theme.spacing.sm,
                fontSize: theme.font('title'),
                fontWeight: '700',
                color: theme.colors.text,
              }}
            >
              {dawahSpeech.title}
            </Text>
          </View>

          <Text
            style={{
              marginTop: theme.spacing.lg,
              fontSize: theme.font('body'),
              fontWeight: '700',
              color: theme.colors.primary,
            }}
          >
            {dawahSpeech.opening}
          </Text>

          {dawahSpeech.paragraphs.map((p, i) => paragraph(p, i))}

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
            {dawahSpeech.dua}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
