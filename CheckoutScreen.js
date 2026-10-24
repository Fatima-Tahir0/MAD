import React from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../theme/colors';
import { Screen, PrimaryButton, EmptyState, ProductImage, formatPrice } from '../components/UI';
import { useCart } from '../context/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { items, subtotal, clearCart } = useCart();
  const discount = subtotal > 1200 ? subtotal * 0.20 : 0;
  const total = subtotal - discount;

  const placeOrder = () => {
    if (!items.length) {
      Alert.alert('Your cart is empty', 'Add products before placing an order.');
      navigation.navigate('MainTabs', { screen: 'Home' });
      return;
    }
    clearCart();
    navigation.replace('Success', { total });
  };

  if (!items.length) return <Screen><EmptyState title="Nothing to checkout" subtitle="Your cart is empty." /></Screen>;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Order summary</Text>
        <Text style={styles.subheading}>Review your items before placing your order.</Text>
        {items.map(item => (
          <View key={String(item.id)} style={styles.item}>
            <ProductImage product={item} style={styles.image} resizeMode="contain" />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text numberOfLines={2} style={styles.name}>{item.title}</Text>
              <Text style={styles.qty}>Qty: {item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>{formatPrice(Number(item.price) * item.quantity)}</Text>
          </View>
        ))}
        <View style={styles.bill}>
          <View style={styles.row}><Text style={styles.label}>Subtotal</Text><Text style={styles.value}>{formatPrice(subtotal)}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Discount (20%)</Text><Text style={[styles.value, { color: discount > 0 ? COLORS.success : COLORS.muted }]}>− {formatPrice(discount)}</Text></View>
          {subtotal > 1200 ? <Text style={styles.eligible}>Offer applied — you saved {formatPrice(discount)}!</Text> : <Text style={styles.hint}>20% discount applies only when subtotal is above Rs. 1,200.</Text>}
          <View style={styles.divider} />
          <View style={styles.row}><Text style={styles.totalLabel}>Final payable</Text><Text style={styles.total}>{formatPrice(total)}</Text></View>
        </View>
        <PrimaryButton title="Place Order" icon="checkmark-circle-outline" onPress={placeOrder} />
        <Text style={styles.note}>Demo checkout only. No payment gateway is connected.</Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 30 },
  heading: { color: COLORS.text, fontSize: 24, fontWeight: '800' },
  subheading: { color: COLORS.muted, fontSize: 13, marginTop: 6, marginBottom: 18 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, padding: 9, gap: 10, marginBottom: 10 },
  image: { width: 62, height: 65, backgroundColor: '#FBF8F3', borderRadius: 8 },
  name: { color: COLORS.text, fontSize: 12, fontWeight: '700', lineHeight: 17 },
  qty: { color: COLORS.muted, fontSize: 11, marginTop: 4 },
  itemPrice: { color: COLORS.primary, fontSize: 12, fontWeight: '800' },
  bill: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, padding: 16, marginTop: 10, marginBottom: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 7 },
  label: { color: COLORS.muted, fontSize: 13 },
  value: { color: COLORS.text, fontSize: 13, fontWeight: '700' },
  eligible: { color: COLORS.success, fontSize: 12, marginTop: 5 },
  hint: { color: COLORS.muted, fontSize: 11, marginTop: 5, lineHeight: 16 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },
  totalLabel: { color: COLORS.text, fontSize: 15, fontWeight: '800' },
  total: { color: COLORS.primary, fontSize: 19, fontWeight: '900' },
  note: { color: COLORS.muted, fontSize: 10, textAlign: 'center', marginTop: 12 }
});
