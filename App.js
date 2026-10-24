import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { CartProvider, useCart } from './src/context/CartContext';
import { ProductApiProvider } from './src/context/ProductApiContext';
import { AuthProvider } from './src/context/AuthContext';
import { COLORS } from './src/theme/colors';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import SubcategoryScreen from './src/screens/SubcategoryScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import AuthScreen from './src/screens/AuthScreen';
import CartScreen from './src/screens/CartScreen';
import AllProductsScreen from './src/screens/AllProductsScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import SuccessScreen from './src/screens/SuccessScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function RootNavigator() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.text,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AllProducts" component={AllProductsScreen} options={{ title: 'All Products' }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={({ route }) => ({ title: route.params.title })} />
        <Stack.Screen name="Subcategory" component={SubcategoryScreen} options={({ route }) => ({ title: route.params.title })} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product details' }} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Welcome to Velora', presentation: 'modal' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
        <Stack.Screen name="Success" component={SuccessScreen} options={{ title: 'Order placed', headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabs() {
  const { cartCount } = useCart();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.muted,
          tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
          tabBarStyle: { backgroundColor: '#FFFFFF', borderTopColor: COLORS.border, paddingTop: 6 },
          tabBarBadgeStyle: { backgroundColor: COLORS.accent, color: COLORS.text, fontSize: 10 },
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Home: 'home-outline',
              Categories: 'grid-outline',
              Cart: 'bag-handle-outline',
              Account: 'person-outline'
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Categories" component={CategoryScreen} />
        <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarBadge: cartCount > 0 ? cartCount : undefined }} />
        <Tab.Screen name="Account" component={AuthScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <ProductApiProvider>
            <StatusBar style="dark" backgroundColor={COLORS.background} />
            <RootNavigator />
          </ProductApiProvider>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
