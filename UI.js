import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export function Screen({ children, style }) {
  return <View style={[styles.screen, style]}>{children}</View>;
}

export function PrimaryButton({ title, onPress, style, disabled = false, icon }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} disabled={disabled} style={[styles.button, disabled && { opacity: 0.55 }, style]}>
      {icon ? <Ionicons name={icon} size={18} color="#FFFFFF" style={{ marginRight: 8 }} /> : null}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function SectionTitle({ title, action, onAction }) {
  return (
    <View style={styles.sectionRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <TouchableOpacity onPress={onAction}><Text style={styles.action}>{action}</Text></TouchableOpacity> : null}
    </View>
  );
}

export function ProductCard({ product, onPress, cardStyle }) {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={[styles.productCard, cardStyle]}>
      <ProductImage product={product} style={styles.productImage} resizeMode="contain" />
      <Text numberOfLines={2} style={styles.productName}>{product.title}</Text>
      <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
      {product.rating?.rate ? <Text style={styles.rating}>★ {Number(product.rating.rate).toFixed(1)}</Text> : null}
    </TouchableOpacity>
  );
}

export function ProductImage({ product, style, resizeMode = 'contain' }) {
  const [imageState, setImageState] = useState('primary');
  const fallback = product.fallbackImage && product.fallbackImage !== product.image
    ? product.fallbackImage
    : null;

  useEffect(() => {
    setImageState('primary');
  }, [product.image]);

  if (imageState === 'unavailable') {
    const icon = product.parent === 'Makeup'
      ? 'color-palette-outline'
      : product.parent === 'Clothes'
        ? 'shirt-outline'
        : product.parent === 'Accessories'
          ? (product.category === 'Watches' ? 'watch-outline' : 'bag-handle-outline')
          : product.category === 'jewelery'
            ? 'diamond-outline'
            : product.category === "men's clothing" || product.category === "women's clothing"
              ? 'shirt-outline'
              : 'cube-outline';
    return <View style={[styles.imageFallback, style]}><Ionicons name={icon} size={34} color={COLORS.secondary} /></View>;
  }

  return (
    <Image
      source={{ uri: imageState === 'fallback' ? fallback : product.image }}
      style={style}
      resizeMode={resizeMode}
      onError={() => setImageState(current => current === 'primary' && fallback ? 'fallback' : 'unavailable')}
    />
  );
}

export function LoadingState({ label = 'Loading products...' }) {
  return <View style={styles.loading}><ActivityIndicator size="large" color={COLORS.primary} /><Text style={styles.muted}>{label}</Text></View>;
}

export function EmptyState({ title, subtitle, icon = 'bag-outline' }) {
  return (
    <View style={styles.empty}>
      <Ionicons name={icon} size={42} color={COLORS.secondary} />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.muted}>{subtitle}</Text>
    </View>
  );
}

export function formatPrice(value) {
  const number = Number(value) || 0;
  return `Rs. ${Math.round(number).toLocaleString('en-PK')}`;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  button: { minHeight: 48, borderRadius: 12, backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, paddingVertical: 12 },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, marginTop: 8 },
  sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: '800' },
  action: { color: COLORS.primary, fontWeight: '700', fontSize: 13 },
  productCard: { width: '48.3%', backgroundColor: COLORS.card, borderRadius: 15, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  productImage: { width: '100%', height: 125, backgroundColor: '#FBF8F3', borderRadius: 10, marginBottom: 9 },
  imageFallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#FBF8F3' },
  productName: { color: COLORS.text, fontSize: 13, lineHeight: 18, fontWeight: '600', minHeight: 36 },
  productPrice: { color: COLORS.primary, fontSize: 14, fontWeight: '800', marginTop: 5 },
  rating: { color: '#9A7435', fontSize: 11, marginTop: 3 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  muted: { color: COLORS.muted, fontSize: 13, textAlign: 'center', lineHeight: 19 },
  empty: { alignItems: 'center', justifyContent: 'center', padding: 36, gap: 10 },
  emptyTitle: { color: COLORS.text, fontSize: 17, fontWeight: '800' }
});
