import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { Screen, PrimaryButton, ProductImage, formatPrice } from '../components/UI';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (!user) {
      navigation.navigate('Auth', { returnTo: 'ProductDetails', product, quantity });
      return;
    }
    addToCart(product, quantity);
    Alert.alert('Added to cart', `${product.title} has been added to your cart.`, [
      { text: 'Continue shopping', style: 'cancel' },
      { text: 'View cart', onPress: () => navigation.navigate('MainTabs', { screen: 'Cart' }) }
    ]);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrap}><ProductImage product={product} resizeMode="contain" style={styles.image} /></View>
        <View style={styles.pills}><Text style={styles.pill}>{product.category || 'Selected for you'}</Text><Text style={styles.rating}>★ {product.rating?.rate ? Number(product.rating.rate).toFixed(1) : '4.8'} rating</Text></View>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.section}>Product description</Text>
        <Text style={styles.description}>{product.description || 'A thoughtfully selected product made to complement your everyday style.'}</Text>
        <View style={styles.quantityRow}>
          <Text style={styles.section}>Quantity</Text>
          <View style={styles.stepper}>
            <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))} style={styles.stepButton}><Ionicons name="remove" size={18} color={COLORS.primary} /></TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(q => q + 1)} style={styles.stepButton}><Ionicons name="add" size={18} color={COLORS.primary} /></TouchableOpacity>
          </View>
        </View>
        <PrimaryButton title={user ? 'Add to Cart' : 'Login to Add to Cart'} icon="bag-add-outline" onPress={handleAdd} />
        <Text style={styles.note}>Secure demo checkout · No real payment required</Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 30 },
  imageWrap: { height: 300, backgroundColor: '#FFFFFF', borderRadius: 18, alignItems: 'center', justifyContent: 'center', padding: 18, borderWidth: 1, borderColor: COLORS.border },
  image: { width: '100%', height: '100%' },
  pills: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 },
  pill: { backgroundColor: COLORS.secondary, color: COLORS.text, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, fontSize: 11, overflow: 'hidden' },
  rating: { color: '#9A7435', fontSize: 12, fontWeight: '700' },
  title: { color: COLORS.text, fontSize: 23, lineHeight: 29, fontWeight: '800', marginTop: 13 },
  price: { color: COLORS.primary, fontSize: 21, fontWeight: '800', marginTop: 8 },
  section: { color: COLORS.text, fontSize: 15, fontWeight: '800', marginTop: 20 },
  description: { color: COLORS.muted, fontSize: 14, lineHeight: 22, marginTop: 8 },
  quantityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: 15, backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: 5 },
  stepButton: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.background, borderRadius: 8 },
  quantity: { color: COLORS.text, fontSize: 15, fontWeight: '800', minWidth: 15, textAlign: 'center' },
  note: { textAlign: 'center', color: COLORS.muted, fontSize: 11, marginTop: 12 }
});
