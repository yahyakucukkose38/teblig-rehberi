// ============================================================================
// ARAMA EKRANI — Aktif dilde başlık, açıklama, ana ilke ve etiketlerde arama
// ============================================================================

import { EmptyState } from '../src/components/EmptyState';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { TopicCard } from '../src/components/TopicCard';
import { topics } from '../src/data/topics';
import { useAppStore } from '../src/store/useAppStore';
import { useAppTheme } from '../src/theme/useAppTheme';
import { searchTopics } from '../src/utils/searchTopics';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDeferredValue, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const language = useAppStore((s) => s.language);
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);

  const [query, setQuery] = useState('');
  // Hızlı yazarken arama hesaplamasını ertele; giriş alanı akıcı kalsın.
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(
    () => searchTopics(topics, deferredQuery, language),
    [deferredQuery, language],
  );

  const trimmed = query.trim();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t('search.title')} />

      {/* Arama kutusu */}
      <View style={{ paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.sm }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: theme.colors.border,
            paddingHorizontal: theme.spacing.md,
          }}
        >
          <Ionicons name="search" size={18} color={theme.colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t('search.placeholder')}
            placeholderTextColor={theme.colors.textMuted}
            autoFocus
            style={{
              flex: 1,
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.sm,
              fontSize: theme.font('body'),
              color: theme.colors.text,
            }}
          />
          {trimmed.length > 0 ? (
            <Pressable onPress={() => setQuery('')} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color={theme.colors.textMuted} />
            </Pressable>
          ) : null}
        </View>

        {trimmed.length > 0 ? (
          <Text
            style={{
              fontSize: theme.font('caption'),
              color: theme.colors.textMuted,
              marginTop: theme.spacing.sm,
            }}
          >
            {t('search.resultsCount', { count: results.length })}
          </Text>
        ) : null}
      </View>

      {trimmed.length === 0 ? (
        <View style={{ flex: 1 }}>
          <EmptyState icon="search-outline" title={t('search.hint')} />
        </View>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TopicCard
              topic={item}
              lang={language}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
              onPress={() => router.push(`/topic/${item.id}`)}
            />
          )}
          ListEmptyComponent={<EmptyState icon="sad-outline" title={t('search.empty')} />}
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.lg,
            paddingBottom: insets.bottom + theme.spacing.xxl,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
