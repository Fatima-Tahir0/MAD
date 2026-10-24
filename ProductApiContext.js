import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fallbackImages } from '../data/catalog';

const ProductApiContext = createContext(null);
const USD_TO_PKR = 280;

function fallbackForCategory(category) {
  if (category === 'jewelery') return fallbackImages.jewellery;
  if (category === "men's clothing") return fallbackImages.mensStitched;
  if (category === "women's clothing") return fallbackImages.womensStitched;
  return null;
}

export function ProductApiProvider({ children }) {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error(`Product API request failed (${response.status}).`);
      const products = await response.json();
      if (!Array.isArray(products)) throw new Error('The product API returned an invalid response.');
      setApiProducts(products.map(product => ({
        ...product,
        id: `fakestore-${product.id}`,
        originalPrice: product.price,
        price: Math.round(Number(product.price) * USD_TO_PKR),
        source: 'fakestore-api',
        fallbackImage: fallbackForCategory(product.category)
      })));
    } catch (requestError) {
      setError(requestError.message || 'Unable to load products from Fake Store API.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <ProductApiContext.Provider value={{ apiProducts, loading, error, retry: loadProducts }}>
      {children}
    </ProductApiContext.Provider>
  );
}

export const useProductApi = () => useContext(ProductApiContext);
