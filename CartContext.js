import React, { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setItems(current => {
      const found = current.find(item => String(item.id) === String(product.id));
      if (found) return current.map(item => String(item.id) === String(product.id) ? { ...item, quantity: item.quantity + quantity } : item);
      return [...current, { ...product, quantity }];
    });
  };

  const changeQuantity = (id, delta) => {
    setItems(current => current
      .map(item => String(item.id) === String(id) ? { ...item, quantity: item.quantity + delta } : item)
      .filter(item => item.quantity > 0));
  };

  const removeItem = id => setItems(current => current.filter(item => String(item.id) !== String(id)));
  const clearCart = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0), [items]);
  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, changeQuantity, removeItem, clearCart, subtotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
