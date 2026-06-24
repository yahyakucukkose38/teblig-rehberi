// ============================================================================
// ANA SAYFA — Günün notu, kategoriler, son okunanlar, favorilerden kısa liste
// ============================================================================

import { CategoryCard } from '../src/components/CategoryCard';
import { DailyNoteCard } from '../src/components/DailyNoteCard';
import { SectionTitle } from '../src/components/SectionTitle';
import { TopicCard } from '../src/components/TopicCard';
import { categories } from '../src/data/categories';
import { getDailyNoteText } from '../src/data/dailyNotes';
import { getTopicCountByCategory, getTopicsByIds } from '../src/data/topics';
import { useAppStore } from '../src/store/useAppStore';
import { useAppTheme } from '../src/theme/useAppTheme';
import { shareText } from '../src/utils/shareContent';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const language = useAppStore((s) => s.language);
  const favorites = useAppStore((s) => s.favorites);
  const recents = useAppStore((s) => s.recents);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);

  const dailyText = getDailyNoteText(new Date(), language);
  const recentTopics = getTopicsByIds(recents.map((r) => r.topicId)).slice(0, 3);
  const favoriteTopics = getTopicsByIds(favorites).slice(0, 3);
  const previewCategories = categories.slice(0, 4);

  const HeaderIcon = ({ name, onPress, label }: { name: keyof typeof Ionicons.glyphMap; onPress: () => void; label: string }) => (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginLeft: theme.spacing.sm,
      }}
    >
      <Ionicons name={name} size={22} color={theme.colors.text} />
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + theme.spacing.md,
          paddingBottom: insets.bottom + theme.spacing.xxl,
          paddingHorizontal: theme.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Başlık satırı */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: theme.spacing.lg }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: theme.font('small'), color: theme.colors.textMuted }}>
              {t('home.greeting')}
            </Text>
            <Text
              style={{
                fontSize: theme.font('title'),
                fontWeight: '700',
                color: theme.colors.text,
                marginTop: 2,
              }}
            >
              {t('home.intro')}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <HeaderIcon name="search" onPress={() => router.push('/search')} label={t('search.title')} />
            <HeaderIcon name="heart-outline" onPress={() => router.push('/favorites')} label={t('favorites.title')} />
            <HeaderIcon name="settings-outline" onPress={() => router.push('/settings')} label={t('settings.title')} />
          </View>
        </View>

        {/* 6 Sıfat — öne çıkan giriş */}
        <Pressable
          onPress={() => router.push('/six-attributes')}
          accessibilityRole="button"
          accessibilityLabel="6 Sıfat"
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.lg,
            paddingVertical: theme.spacing.lg,
            paddingHorizontal: theme.spacing.lg,
            marginBottom: theme.spacing.lg,
            opacity: pressed ? 0.9 : 1,
            ...theme.shadow.card,
          })}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: 'rgba(255,255,255,0.15)',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: theme.spacing.md,
            }}
          >
            <Ionicons name="sparkles" size={22} color={theme.colors.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: theme.font('title'), fontWeight: '700', color: theme.colors.onPrimary }}>
              6 Sıfat
            </Text>
            <Text style={{ fontSize: theme.font('small'), color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>
              Dinimizi yaşatan altı esas
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.85)" />
        </Pressable>

        {/* Tebliğ Çerçevesi — öne çıkan giriş */}
        <Pressable
          onPress={() => router.push('/dawah-framework')}
          accessibilityRole="button"
          accessibilityLabel="Tebliğ Çerçevesi"
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.lg,
            paddingVertical: theme.spacing.lg,
            paddingHorizontal: theme.spacing.lg,
            marginBottom: theme.spacing.lg,
            opacity: pressed ? 0.9 : 1,
            ...theme.shadow.card,
          })}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: theme.colors.accentSoft,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: theme.spacing.md,
            }}
          >
            <Ionicons name="compass-outline" size={22} color={theme.colors.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: theme.font('title'), fontWeight: '700', color: theme.colors.text }}>
              Tebliğ Çerçevesi
            </Text>
            <Text style={{ fontSize: theme.font('small'), color: theme.colors.textMuted, marginTop: 2 }}>
              Tebliğde ana çerçeve ve konuşma metni
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={theme.colors.textMuted} />
        </Pressable>

        {/* Günün notu */}
        <DailyNoteCard
          text={dailyText}
          onPress={() => router.push('/daily-note')}
          onShare={() => shareText(t('daily.title'), dailyText)}
        />

        {/* Son okunanlar */}
        {recentTopics.length > 0 ? (
          <>
            <SectionTitle title={t('home.continueReading')} />
            {recentTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                lang={language}
                isFavorite={favorites.includes(topic.id)}
                onToggleFavorite={() => toggleFavorite(topic.id)}
                onPress={() => router.push(`/topic/${topic.id}`)}
              />
            ))}
          </>
        ) : null}

        {/* Favorilerden kısa liste */}
        {favoriteTopics.length > 0 ? (
          <>
            <SectionTitle
              title={t('home.favoritesShort')}
              actionLabel={t('common.seeAll')}
              onAction={() => router.push('/favorites')}
            />
            {favoriteTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                lang={language}
                isFavorite={favorites.includes(topic.id)}
                onToggleFavorite={() => toggleFavorite(topic.id)}
                onPress={() => router.push(`/topic/${topic.id}`)}
              />
            ))}
          </>
        ) : null}

        {/* Kategoriler */}
        <SectionTitle
          title={t('home.exploreCategories')}
          actionLabel={t('common.seeAll')}
          onAction={() => router.push('/categories')}
        />
        {previewCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            lang={language}
            topicCount={getTopicCountByCategory(category.id)}
            onPress={() => router.push(`/category/${category.id}`)}
          />
        ))}

        {/* Favori yoksa nazik ipucu */}
        {favoriteTopics.length === 0 && recentTopics.length === 0 ? (
          <Text
            style={{
              fontSize: theme.font('small'),
              color: theme.colors.textMuted,
              textAlign: 'center',
              marginTop: theme.spacing.xl,
            }}
          >
            {t('home.emptyRecents')}
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}
