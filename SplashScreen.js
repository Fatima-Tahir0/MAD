import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200' }} resizeMode="cover" style={styles.bg}>
      <View style={styles.overlay}>
        <View style={styles.logo}><Ionicons name="bag-handle-outline" size={26} color={COLORS.primary} /></View>
        <Text style={styles.brand}>VELORA</Text>
        <Text style={styles.tagline}>EVERYDAY FINDS, BEAUTIFULLY CHOSEN</Text>
        <View style={styles.offer}><Text style={styles.offerText}>20% OFF — Limited Stock!</Text></View>
        <Text style={styles.bottom}>Find something you'll love.</Text>
        <TouchableOpacity onPress={onFinish} style={styles.skip}><Text style={styles.skipText}>Explore now  →</Text></TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: COLORS.background },
  overlay: { flex: 1, backgroundColor: 'rgba(245,239,230,0.50)', alignItems: 'center', justifyContent: 'center', padding: 28 },
  logo: { width: 58, height: 58, borderRadius: 18, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  brand: { fontSize: 34, letterSpacing: 5, color: COLORS.text, fontWeight: '300' },
  tagline: { fontSize: 9, letterSpacing: 2, color: COLORS.text, marginTop: 7, textAlign: 'center' },
  offer: { marginTop: 30, backgroundColor: COLORS.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  offerText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  bottom: { color: COLORS.text, fontSize: 18, fontWeight: '600', marginTop: 28 },
  skip: { position: 'absolute', bottom: 45, backgroundColor: '#FFFFFF', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12 },
  skipText: { color: COLORS.primary, fontWeight: '800' }
});
