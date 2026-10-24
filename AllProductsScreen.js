import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { COLORS } from '../theme/colors';
import { EmptyState, PrimaryButton, ProductCard, Screen } from '../components/UI';
import { combineProducts, searchProducts } from '../data/catalog';
import { useProductApi } from '../context/ProductApiContext';

export default function AllProductsScreen({ navigation, route }) {
  const { apiProducts, loading, error, retry } = useProductApi();
  const { width } = useWindowDimensions();
  const columns = width >= 700 ? 3 : 2;
  const query = route.params?.query?.trim() || '';
  const allProducts = useMemo(() => combineProducts(apiProducts), [apiProducts]);
  const products = useMemo(
    () => query ? searchProducts(allProducts, query) : allProducts,
    [allProducts, query]
  );

  useEffect(() => {
    navigation.setOptions({ title: query ? 'Search Results' : 'All Products' });
  }, [navigation, query]);

  return (
    <Screen>
      <FlatList
        key={columns}
        data={products}
        numColumns={columns}
        keyExtractor={product => String(product.id)}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={(
          <View style={styles.header}>
            <Text style={styles.heading}>{query ? 'Search Results' : 'All Products'}</Text>
            <Text style={styles.subheading}>{query ? `Showing matches for “${query}”.` : 'Explore the complete Velora collection.'}</Text>
            {loading ? (
              <View style={styles.apiStatus}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                <Text style={styles.statusText}>Loading products from Fake Store API...</Text>
              </View>
            ) : null}
            {error ? (
              <View style={styles.errorState}>
                <Text style={styles.errorText}>
                  {query
                    ? 'Online products could not be loaded. Search results include available local products.'
                    : 'Online products could not be loaded. Showing all available local products.'}
                </Text>
                <PrimaryButton title="Retry API" icon="refresh" onPress={retry} />
              </View>
            ) : null}
          </View>
        )}
        ListEmptyComponent={(
          query && loading ? (
            <View style={styles.emptyLoading}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.statusText}>Checking online products for matches...</Text>
            </View>
          ) : (
            <EmptyState
              title={query ? 'No matching products found' : 'No products available'}
              subtitle={query ? 'Try another product name, category, or keyword.' : 'Please try again in a moment.'}
            />
          )
        )}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            cardStyle={{ width: `${100 / columns - 2}%` }}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 28 },
  header: { marginBottom: 15 },
  heading: { color: COLORS.text, fontSize: 25, fontWeight: '800' },
  subheading: { color: COLORS.muted, fontSize: 13, marginTop: 6 },
  row: { justifyContent: 'space-between' },
  apiStatus: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 14 },
  statusText: { color: COLORS.muted, fontSize: 12 },
  emptyLoading: { alignItems: 'center', gap: 10, paddingVertical: 35 },
  errorState: { gap: 10, marginTop: 14 },
  errorText: { color: COLORS.danger, fontSize: 13, lineHeight: 19 }
});
