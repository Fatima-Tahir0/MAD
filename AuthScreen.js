import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { Screen, PrimaryButton } from '../components/UI';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function AuthScreen({ navigation, route }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login, signup, logout } = useAuth();
  const { addToCart } = useCart();

  const submit = async () => {
    try {
      setError('');
      if (mode === 'login') await login(email, password);
      else await signup(name, email, password);
      const returnTo = route.params?.returnTo;
      if (returnTo === 'ProductDetails' && route.params?.product) {
        addToCart(route.params.product, route.params.quantity || 1);
        navigation.navigate('MainTabs', { screen: 'Cart' });
      } else if (route.name !== 'Account') {
        navigation.goBack();
      }
    } catch (e) {
      setError(e.message || 'Something went wrong.');
    }
  };

  if (user) {
    return (
      <Screen style={styles.center}>
        <View style={styles.avatar}><Ionicons name="person" size={34} color={COLORS.primary} /></View>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>{user.name || user.email}</Text>
        <PrimaryButton title="Continue shopping" onPress={() => route.name === 'Account' ? navigation.navigate('Home') : navigation.goBack()} style={{ width: '100%', marginTop: 20 }} />
        <TouchableOpacity onPress={() => { logout(); if (route.name !== 'Account') navigation.goBack(); }} style={styles.logout}><Text style={styles.link}>Log out</Text></TouchableOpacity>
      </Screen>
    );
  }

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
        <View style={styles.content}>
          <View style={styles.logo}><Ionicons name="bag-handle-outline" size={28} color={COLORS.primary} /></View>
          <Text style={styles.brand}>VELORA</Text>
          <Text style={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create your account'}</Text>
          <Text style={styles.subtitle}>{mode === 'login' ? 'Sign in to continue your shopping journey.' : 'Join us and find your everyday favourites.'}</Text>
          <View style={styles.switchRow}>
            <TouchableOpacity onPress={() => { setMode('login'); setError(''); }} style={[styles.switch, mode === 'login' && styles.switchActive]}><Text style={[styles.switchText, mode === 'login' && styles.switchTextActive]}>Login</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { setMode('signup'); setError(''); }} style={[styles.switch, mode === 'signup' && styles.switchActive]}><Text style={[styles.switchText, mode === 'signup' && styles.switchTextActive]}>Sign up</Text></TouchableOpacity>
          </View>
          {mode === 'signup' && <TextInput value={name} onChangeText={setName} placeholder="Full name" placeholderTextColor={COLORS.muted} style={styles.input} />}
          <TextInput value={email} onChangeText={setEmail} placeholder="Email address" autoCapitalize="none" keyboardType="email-address" placeholderTextColor={COLORS.muted} style={styles.input} />
          <TextInput value={password} onChangeText={setPassword} placeholder="Password (min. 4 characters)" secureTextEntry placeholderTextColor={COLORS.muted} style={styles.input} />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <PrimaryButton title={mode === 'login' ? 'Login' : 'Create account'} onPress={submit} style={{ marginTop: 8 }} />
          <Text style={styles.disclaimer}>Demo authentication only. Your session resets when the app restarts.</Text>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  keyboard: { flex: 1, justifyContent: 'center' },
  content: { padding: 24 },
  center: { justifyContent: 'center', alignItems: 'center', padding: 24 },
  logo: { alignSelf: 'center', width: 58, height: 58, backgroundColor: '#FFFFFF', borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border },
  brand: { textAlign: 'center', color: COLORS.primary, fontSize: 23, letterSpacing: 4, marginTop: 10 },
  title: { color: COLORS.text, fontSize: 25, fontWeight: '800', marginTop: 24, textAlign: 'center' },
  subtitle: { color: COLORS.muted, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 8, marginBottom: 20 },
  switchRow: { flexDirection: 'row', backgroundColor: COLORS.soft, borderRadius: 12, padding: 4, marginBottom: 17 },
  switch: { flex: 1, alignItems: 'center', padding: 11, borderRadius: 9 },
  switchActive: { backgroundColor: '#FFFFFF' },
  switchText: { color: COLORS.muted, fontWeight: '700' },
  switchTextActive: { color: COLORS.primary },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 14, marginBottom: 12, color: COLORS.text, fontSize: 14 },
  error: { color: COLORS.danger, fontSize: 12, marginBottom: 10 },
  disclaimer: { color: COLORS.muted, fontSize: 10, textAlign: 'center', marginTop: 14, lineHeight: 16 },
  logout: { marginTop: 20, padding: 12 },
  link: { color: COLORS.primary, fontWeight: '800' }
});
