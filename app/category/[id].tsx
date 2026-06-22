// ============================================================================
// KATEGORİ DETAYI — Seçilen kategorinin konuları (kategori içi arama ile)
// ============================================================================

import { EmptyState } from '../../src/components/EmptyState';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { TopicCard } from '../../src/components/TopicCard';
import { getCategoryById } from '../../src/data/categories';
import { getTopicsByCategory } from '../../src/data/topics';
import { useAppStore } from '../../src/store/useAppStore';
import { useAppTheme } from '../../src/theme/useAppTheme';
import { getCategoryLabel } from '../../src/utils/localize';
import { searchTopics } from '../../src/utils/searchTopics';
import type { TopicCategory } from '../../src/types/content';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CategoryDetail() {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const language = useAppStore((s) => s.language);
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);

  const [query, setQuery] = useState('');

  const category = id ? getCategoryById(id) : undefined;
  const allTopics = useMemo(
    () => (id ? getTopicsByCategory(id as TopicCategory) : []),
    [id],
  );

  const visibleTopics = useMemo(() => {
    if (query.trim().length === 0) return allTopics;
    return searchTopics(allTopics, query, language);
  }, [allTopics, query, language]);

  const title = category ? getCategoryLabel(category, language).name : '';

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={title} />

      {/* Kategori içi arama */}
      {allTopics.length > 0 ? (
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
              style={{
                flex: 1,
                paddingVertical: theme.spacing.md,
                paddingHorizontal: theme.spacing.sm,
                fontSize: theme.font('body'),
                color: theme.colors.text,
              }}
            />
          </View>
        </View>
      ) : null}

      <FlatList
        style={{ flex: 1 }}
        data={visibleTopics}
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
        ListEmptyComponent={
          <EmptyState
            icon="leaf-outline"
            title={t('search.empty')}
            hint={category ? getCategoryLabel(category, language).description : undefined}
          />
        }
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: insets.bottom + theme.spacing.xxl,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
