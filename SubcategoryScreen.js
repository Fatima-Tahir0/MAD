import React from 'react';
import { ActivityIndicator, ScrollView, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { Screen, ProductCard, EmptyState, PrimaryButton } from '../components/UI';
import { localProducts } from '../data/catalog';
import { useProductApi } from '../context/ProductApiContext';

export default function SubcategoryScreen({ route, navigation }) {
  const { title, parent, gender } = route.params;
  const { loading, error, retry } = useProductApi();
  const products = localProducts.filter(product =>
    product.parent === parent
    && product.gender === gender
    && product.category === title
  );
  const isMakeup = parent === 'Makeup';

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.subheading}>{isMakeup ? '12 curated makeup products - Fake Store API catalog kept separate' : `A curated ${gender.toLowerCase()} ${title.toLowerCase()} collection`}</Text>
        {isMakeup && loading ? (
          <View style={styles.apiStatus}><ActivityIndicator size="small" color={COLORS.primary} /><Text style={styles.statusText}>Loading required Fake Store API products...</Text></View>
        ) : null}
        {isMakeup && error ? (
            <View style={styles.errorState}>
              <Text style={styles.error}>The separate Fake Store API feed could not load: {error}</Text>
              <PrimaryButton title="Retry API" icon="refresh" onPress={retry} />
            </View>
        ) : null}
        {products.length ? (
          <View style={styles.grid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} onPress={() => navigation.navigate('ProductDetails', { product })} />
            ))}
          </View>
        ) : <EmptyState title="Collection unavailable" subtitle="No products were found for this collection." icon="pricetag-outline" />}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 30 },
  heading: { fontSize: 25, fontWeight: '800', color: COLORS.text },
  subheading: { color: COLORS.muted, fontSize: 13, marginTop: 6, marginBottom: 18 },
  apiStatus: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 14 },
  statusText: { color: COLORS.muted, fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  errorState: { gap: 10, marginBottom: 14 },
  error: { color: COLORS.danger, fontSize: 13 }
});
