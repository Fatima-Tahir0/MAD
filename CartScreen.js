import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { Screen, PrimaryButton, EmptyState, ProductImage, formatPrice } from '../components/UI';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartScreen({ navigation }) {
  const { items, changeQuantity, removeItem, subtotal } = useCart();
  const { user } = useAuth();

  return (
    <Screen>
      {items.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <EmptyState title="Your cart is waiting" subtitle="Add something lovely and it will appear here." />
          <View style={{ paddingHorizontal: 24 }}><PrimaryButton title="Continue shopping" onPress={() => navigation.navigate('Home')} /></View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>{items.length} {items.length === 1 ? 'item' : 'items'} in your bag</Text>
          {items.map(item => (
            <View key={String(item.id)} style={styles.item}>
              <ProductImage product={item} style={styles.image} resizeMode="contain" />
              <View style={styles.info}>
                <Text numberOfLines={2} style={styles.name}>{item.title}</Text>
                <Text style={styles.price}>{formatPrice(item.price)}</Text>
                <View style={styles.controls}>
                  <TouchableOpacity style={styles.qtyButton} onPress={() => changeQuantity(item.id, -1)}><Ionicons name="remove" size={16} color={COLORS.primary} /></TouchableOpacity>
                  <Text style={styles.qty}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.qtyButton} onPress={() => changeQuantity(item.id, 1)}><Ionicons name="add" size={16} color={COLORS.primary} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.remove}><Ionicons name="trash-outline" size={18} color={COLORS.danger} /></TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          <View style={styles.summary}>
            <View style={styles.summaryRow}><Text style={styles.label}>Subtotal</Text><Text style={styles.amount}>{formatPrice(subtotal)}</Text></View>
            <Text style={styles.hint}>{subtotal > 1200 ? 'You qualify for 20% off at checkout!' : `Spend ${formatPrice(1201 - subtotal)} more to unlock 20% off.`}</Text>
          </View>
          <PrimaryButton title="Proceed to Checkout" icon="arrow-forward" onPress={() => {
            if (!user) {
              Alert.alert('Login required', 'Please log in before checkout.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Login', onPress: () => navigation.navigate('Auth') }
              ]);
            } else navigation.navigate('Checkout');
          }} />
          <Text style={styles.note}>No real payment is collected in this student project.</Text>
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 32 },
  heading: { color: COLORS.text, fontSize: 21, fontWeight: '800', marginBottom: 17 },
  item: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, padding: 10, marginBottom: 12, gap: 12 },
  image: { width: 95, height: 105, borderRadius: 10, backgroundColor: '#FBF8F3' },
  info: { flex: 1, justifyContent: 'center' },
  name: { color: COLORS.text, fontSize: 13, fontWeight: '700', lineHeight: 18 },
  price: { color: COLORS.primary, fontWeight: '800', marginTop: 5 },
  controls: { flexDirection: 'row', alignItems: 'center', marginTop: 9, gap: 10 },
  qtyButton: { width: 27, height: 27, borderRadius: 8, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center' },
  qty: { color: COLORS.text, fontWeight: '800' },
  remove: { marginLeft: 'auto', padding: 5 },
  summary: { backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, padding: 16, marginTop: 7, marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: COLORS.text, fontSize: 15, fontWeight: '700' },
  amount: { color: COLORS.primary, fontSize: 17, fontWeight: '800' },
  hint: { color: COLORS.success, fontSize: 12, marginTop: 10 },
  note: { textAlign: 'center', color: COLORS.muted, fontSize: 10, marginTop: 12 }
});
