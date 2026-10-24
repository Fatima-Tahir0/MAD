import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet, TextInput, Animated, ActivityIndicator, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { Screen, ProductCard, SectionTitle, PrimaryButton, ProductImage, formatPrice } from '../components/UI';
import { useCart } from '../context/CartContext';
import { useProductApi } from '../context/ProductApiContext';
import { catalog, combineProducts, localProducts, searchProducts, searchSections } from '../data/catalog';

const categories = [
  { title: 'Accessories', icon: 'watch-outline', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700' },
  { title: 'Clothes', icon: 'shirt-outline', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700' },
  { title: 'Makeup', icon: 'color-palette-outline', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700' }
];

const suggestionLimit = 5;

export default function HomeScreen({ navigation }) {
  const { cartCount } = useCart();
  const { apiProducts, loading, error, retry } = useProductApi();
  const [search, setSearch] = useState('');
  const [heroImageError, setHeroImageError] = useState(false);
//banner
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(scrollX, { toValue: 1, duration: 6500, useNativeDriver: true }),
      Animated.timing(scrollX, { toValue: 0, duration: 0, useNativeDriver: true })
    ]));
    loop.start();
    return () => loop.stop();
  }, [scrollX]);

  const translateX = scrollX.interpolate({ inputRange: [0, 1], outputRange: [280, -320] });
  const allProducts = useMemo(() => combineProducts(apiProducts), [apiProducts]);
  const query = search.trim();
  const searchResults = useMemo(() => searchProducts(allProducts, query), [allProducts, query]);
  const matchingSections = useMemo(() => searchSections(catalog, query), [query]);
  const showSuggestions = Boolean(query);
  const featuredProducts = [...localProducts.slice(0, 2), ...apiProducts.slice(0, 2)];

  const openProduct = product => {
    setSearch('');
    Keyboard.dismiss();
    navigation.navigate('ProductDetails', { product });
  };

  const openSection = section => {
    setSearch('');
    Keyboard.dismiss();
    if (section.type === 'category') {
      navigation.navigate('Category', { title: section.parent });
      return;
    }
    navigation.navigate('Subcategory', {
      title: section.subcategory,
      parent: section.parent,
      gender: section.gender
    });
  };

  const openAllResults = () => {
    const selectedQuery = query;
    setSearch('');
    Keyboard.dismiss();
    navigation.navigate('AllProducts', { query: selectedQuery });
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View><Text style={styles.brand}>VELORA</Text><Text style={styles.subBrand}>A LITTLE MORE LOVELY</Text></View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.navigate('Auth')} style={styles.iconButton}><Ionicons name="person-outline" size={21} color={COLORS.text} /></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.iconButton}>
              <Ionicons name="bag-handle-outline" size={22} color={COLORS.text} />
              {cartCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchAnchor}>
          <View style={styles.search}>
            <Ionicons name="search-outline" size={19} color={COLORS.muted} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search Products"
              placeholderTextColor={COLORS.muted}
              style={styles.searchInput}
              returnKeyType="search"
              accessibilityLabel="Search all products"
            />
            {search.length > 0 ? (
              <TouchableOpacity
                onPress={() => setSearch('')}
                accessibilityRole="button"
                accessibilityLabel="Clear search"
                hitSlop={8}
                style={styles.clearSearch}
              >
                <Ionicons name="close-circle" size={20} color={COLORS.muted} />
              </TouchableOpacity>
            ) : null}
          </View>
          {showSuggestions ? (
            <View style={styles.suggestions}>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
                showsVerticalScrollIndicator
                style={styles.suggestionScroll}
              >
                {matchingSections.length ? (
                  <View style={styles.suggestionGroup}>
                    <Text style={styles.suggestionHeading}>Categories</Text>
                    {matchingSections.map(section => (
                      <TouchableOpacity
                        key={section.id}
                        activeOpacity={0.8}
                        onPress={() => openSection(section)}
                        style={styles.sectionSuggestion}
                      >
                        <View style={styles.sectionIcon}>
                          <Ionicons name={section.type === 'category' ? 'grid-outline' : 'shirt-outline'} size={17} color={COLORS.primary} />
                        </View>
                        <View style={styles.suggestionCopy}>
                          <Text numberOfLines={1} style={styles.suggestionName}>{section.title}</Text>
                          <Text numberOfLines={1} style={styles.suggestionMeta}>{section.subtitle}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={17} color={COLORS.muted} />
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : null}

                {searchResults.length ? (
                  <View style={styles.suggestionGroup}>
                    <Text style={styles.suggestionHeading}>Products</Text>
                    {searchResults.slice(0, suggestionLimit).map(product => (
                      <TouchableOpacity
                        key={product.id}
                        activeOpacity={0.8}
                        onPress={() => openProduct(product)}
                        style={styles.productSuggestion}
                      >
                        <ProductImage product={product} style={styles.suggestionImage} resizeMode="contain" />
                        <View style={styles.suggestionCopy}>
                          <Text numberOfLines={2} style={styles.suggestionName}>{product.title}</Text>
                          <Text style={styles.suggestionPrice}>{formatPrice(product.price)}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={17} color={COLORS.muted} />
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : null}

                {!searchResults.length && !matchingSections.length ? (
                  loading ? (
                    <View style={styles.searchMessage}>
                      <ActivityIndicator size="small" color={COLORS.primary} />
                      <Text style={styles.suggestionMeta}>Checking online products...</Text>
                    </View>
                  ) : (
                    <Text style={styles.noSuggestions}>No matching products found</Text>
                  )
                ) : null}
                {error && !loading ? <Text style={styles.apiError}>Online products could not be loaded.</Text> : null}
                {searchResults.length > suggestionLimit ? (
                  <TouchableOpacity onPress={openAllResults} style={styles.viewAllResults}>
                    <Text style={styles.viewAllText}>View all {searchResults.length} product results</Text>
                    <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                ) : null}
                {error ? <PrimaryButton title="Retry API" icon="refresh" onPress={retry} style={styles.retryButton} /> : null}
              </ScrollView>
            </View>
          ) : null}
        </View>

        <View style={styles.banner}>
          <Animated.View style={{ transform: [{ translateX }] }}>
            <Text numberOfLines={1} style={styles.bannerText}>20% OFF on Shopping Above Rs. 1,200 — Available Till 20 October</Text>
          </Animated.View>
        </View>

        <View style={styles.hero}>
          <ImageBackground
            source={{ uri: heroImageError
              ? 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200'
              : 'https://images.unsplash.com/photo-1753029226995-74b05a344bb1?w=1200&h=650&q=85&fit=crop&exp=-15' }}
            resizeMode="cover"
            onError={() => setHeroImageError(true)}
            style={styles.heroImage}
          />
          <View style={styles.heroShade} />
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>CURATED FOR YOU</Text>
            <Text style={styles.heroTitle}>Find your{'\n'}everyday style.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Category', { title: 'Clothes' })} style={styles.heroButton}><Text style={styles.heroButtonText}>Explore collection</Text></TouchableOpacity>
          </View>
        </View>

        <SectionTitle title="Shop by Category" />
        <View style={styles.categoryRow}>
          {categories.map(item => (
            <TouchableOpacity key={item.title} onPress={() => navigation.navigate('Category', { title: item.title })} style={styles.categoryCard}>
              <Image source={{ uri: item.image }} style={styles.categoryImage} />
              <Text style={styles.categoryTitle}>{item.title}</Text>
              <Ionicons name="arrow-forward" size={15} color={COLORS.primary} />
            </TouchableOpacity>
          ))}
        </View>

        <SectionTitle title="Popular finds" action="View all" onAction={() => navigation.navigate('AllProducts')} />
        {loading ? <View style={styles.apiStatus}><ActivityIndicator size="small" color={COLORS.primary} /><Text style={styles.apiStatusText}>Loading more products...</Text></View> : null}
        {error ? (
          <View style={styles.errorState}>
            <Text style={styles.error}>Some online products could not be loaded. Local products are still available.</Text>
            <PrimaryButton title="Retry API" icon="refresh" onPress={retry} />
          </View>
        ) : null}
        <View style={styles.productGrid}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} onPress={() => navigation.navigate('ProductDetails', { product })} />
          ))}
        </View>
        <Text style={styles.footer}>Thoughtfully picked. Made for your everyday.</Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  brand: { color: COLORS.primary, fontSize: 24, letterSpacing: 4, fontWeight: '500' },
  subBrand: { color: COLORS.muted, fontSize: 8, letterSpacing: 1.8, marginTop: 3 },
  headerIcons: { flexDirection: 'row', gap: 10 },
  iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border },
  badge: { position: 'absolute', right: -2, top: -3, backgroundColor: COLORS.accent, width: 17, height: 17, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: COLORS.text, fontSize: 10, fontWeight: '800' },
  searchAnchor: { position: 'relative', zIndex: 5, elevation: 5 },
  search: { height: 45, backgroundColor: '#FFFFFF', borderRadius: 12, borderColor: COLORS.border, borderWidth: 1, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 13 },
  searchInput: { flex: 1, color: COLORS.text, fontSize: 13 },
  clearSearch: { padding: 3 },
  suggestions: { position: 'absolute', top: 47, left: 0, right: 0, maxHeight: 320, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: COLORS.border, borderRadius: 13, overflow: 'hidden', elevation: 8, shadowColor: COLORS.text, shadowOpacity: 0.14, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  suggestionScroll: { maxHeight: 318 },
  suggestionGroup: { paddingHorizontal: 10, paddingTop: 9 },
  suggestionHeading: { color: COLORS.muted, fontSize: 10, fontWeight: '800', letterSpacing: 0.8, marginBottom: 5, paddingHorizontal: 3 },
  productSuggestion: { minHeight: 62, flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  sectionSuggestion: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  suggestionImage: { width: 48, height: 48, borderRadius: 8, backgroundColor: '#FBF8F3' },
  sectionIcon: { width: 38, height: 38, borderRadius: 9, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center' },
  suggestionCopy: { flex: 1 },
  suggestionName: { color: COLORS.text, fontSize: 12, lineHeight: 16, fontWeight: '700' },
  suggestionPrice: { color: COLORS.primary, fontSize: 12, fontWeight: '800', marginTop: 3 },
  suggestionMeta: { color: COLORS.muted, fontSize: 10, marginTop: 2 },
  noSuggestions: { color: COLORS.muted, fontSize: 12, padding: 16, textAlign: 'center' },
  searchMessage: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, padding: 16 },
  apiError: { color: COLORS.danger, fontSize: 11, paddingHorizontal: 13, paddingTop: 8 },
  viewAllResults: { minHeight: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 4 },
  viewAllText: { color: COLORS.primary, fontSize: 12, fontWeight: '800' },
  retryButton: { marginHorizontal: 10, marginBottom: 10 },
  banner: { backgroundColor: COLORS.primary, borderRadius: 9, height: 35, justifyContent: 'center', overflow: 'hidden', marginBottom: 17 },
  bannerText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700', width: 500 },
  hero: { height: 205, borderRadius: 16, overflow: 'hidden', marginBottom: 20, backgroundColor: COLORS.secondary },
  heroImage: { width: '100%', height: '100%', position: 'absolute' },
  heroShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(43,33,29,0.28)' },
  heroCopy: { flex: 1, padding: 19, justifyContent: 'center', alignItems: 'flex-start' },
  heroEyebrow: { color: '#FFFFFF', fontSize: 9, letterSpacing: 2, fontWeight: '800' },
  heroTitle: { color: '#FFFFFF', fontSize: 27, lineHeight: 31, fontWeight: '700', marginTop: 8 },
  heroButton: { marginTop: 12, backgroundColor: '#FFFFFF', paddingHorizontal: 13, paddingVertical: 9, borderRadius: 8 },
  heroButtonText: { color: COLORS.primary, fontSize: 11, fontWeight: '800' },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginBottom: 15 },
  categoryCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 7, borderWidth: 1, borderColor: COLORS.border },
  categoryImage: { width: '100%', height: 82, borderRadius: 8, backgroundColor: COLORS.soft },
  categoryTitle: { color: COLORS.text, fontSize: 11, fontWeight: '700', marginTop: 8, marginBottom: 4 },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  errorState: { gap: 10, marginBottom: 12 },
  error: { color: COLORS.danger, padding: 12, fontSize: 13 },
  apiStatus: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  apiStatusText: { color: COLORS.muted, fontSize: 12 },
  footer: { textAlign: 'center', color: COLORS.muted, fontSize: 11, marginTop: 12, marginBottom: 8 }
});
