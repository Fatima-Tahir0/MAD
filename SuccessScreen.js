import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { Screen, PrimaryButton, formatPrice } from '../components/UI';

export default function SuccessScreen({ navigation, route }) {
  const total = route.params?.total || 0;
  return (
    <Screen style={styles.screen}>
      <View style={styles.circle}><Ionicons name="checkmark" size={48} color="#FFFFFF" /></View>
      <Text style={styles.title}>Order placed!</Text>
      <Text style={styles.description}>Thank you for shopping with Velora. Your order has been placed successfully.</Text>
      <View style={styles.receipt}><Text style={styles.receiptLabel}>TOTAL PAID </Text><Text style={styles.total}>{formatPrice(total)}</Text><Text style={styles.receiptNote}>No real payment was collected.</Text></View>
      <PrimaryButton title="Continue shopping" onPress={() => navigation.popToTop()} style={{ width: '100%' }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 25, alignItems: 'center', justifyContent: 'center' },
  circle: { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  title: { color: COLORS.text, fontSize: 28, fontWeight: '800', marginTop: 24 },
  description: { color: COLORS.muted, fontSize: 14, lineHeight: 22, textAlign: 'center', marginTop: 10 },
  receipt: { width: '100%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: COLORS.border, borderRadius: 15, padding: 20, alignItems: 'center', marginVertical: 28 },
  receiptLabel: { color: COLORS.muted, fontSize: 10, letterSpacing: 1.5, fontWeight: '800' },
  total: { color: COLORS.primary, fontSize: 27, fontWeight: '900', marginTop: 8 },
  receiptNote: { color: COLORS.muted, fontSize: 11, marginTop: 7 }
});
