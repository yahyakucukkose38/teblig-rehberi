// ============================================================================
// FAVORİLER EKRANI — Kullanıcının favori konuları (cihazda saklı)
// ============================================================================

import { EmptyState } from '../src/components/EmptyState';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { TopicCard } from '../src/components/TopicCard';
import { getTopicsByIds } from '../src/data/topics';
import { useAppStore } from '../src/store/useAppStore';
import { useAppTheme } from '../src/theme/useAppTheme';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const language = useAppStore((s) => s.language);
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);

  const favoriteTopics = getTopicsByIds(favorites);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t('favorites.title')} />
      <FlatList
        data={favoriteTopics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TopicCard
            topic={item}
            lang={language}
            isFavorite={true}
            onToggleFavorite={() => toggleFavorite(item.id)}
            onPress={() => router.push(`/topic/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="heart-outline"
            title={t('favorites.empty')}
            hint={t('favorites.emptyHint')}
          />
        }
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: insets.bottom + theme.spacing.xxl,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
