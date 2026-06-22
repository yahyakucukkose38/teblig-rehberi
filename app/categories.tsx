// ============================================================================
// KATEGORİLER EKRANI — Tüm kategori kartları (ikon + konu sayısı)
// ============================================================================

import { CategoryCard } from '../src/components/CategoryCard';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { categories } from '../src/data/categories';
import { getTopicCountByCategory } from '../src/data/topics';
import { useAppStore } from '../src/store/useAppStore';
import { useAppTheme } from '../src/theme/useAppTheme';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CategoriesScreen() {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const language = useAppStore((s) => s.language);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t('categories.title')} subtitle={t('categories.subtitle')} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: insets.bottom + theme.spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            lang={language}
            topicCount={getTopicCountByCategory(category.id)}
            onPress={() => router.push(`/category/${category.id}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
