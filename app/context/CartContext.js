// app/context/CartContext.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load cart from localStorage or API
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      loadCartFromLocal();
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data.success) {
        setCart(data.cart.items || []);
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartFromLocal = () => {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      try {
        const parsedCart = JSON.parse(localCart);
        setCart(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        setCart([]);
      }
    } else {
      setCart([]);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const { data } = await axios.post('/api/auth/products/cart/add', {
          productId: product._id,
          quantity
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (data.success) {
          await loadCart(); // Reload cart after adding
          return { success: true };
        }
        return { success: false, message: data.message };
      } catch (error) {
        console.error('Failed to add to cart:', error);
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to add to cart'
        };
      } finally {
        setLoading(false);
      }
    } else {
      // Handle localStorage for non-authenticated users
      const currentCart = Array.isArray(cart) ? cart : [];
      const existingItem = currentCart.find(item => item.id === product.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedCart = [...currentCart, { ...product, quantity }];
      }
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { success: true };
    }
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        // For now, we'll reload the cart. In a full implementation,
        // you'd have a remove endpoint
        const currentCart = Array.isArray(cart) ? cart : [];
        const updatedCart = currentCart.filter(item => item.id !== productId);
        setCart(updatedCart);
        // TODO: Call API to remove from backend
      } catch (error) {
        console.error('Failed to remove from cart:', error);
      } finally {
        setLoading(false);
      }
    } else {
      const currentCart = Array.isArray(cart) ? cart : [];
      const updatedCart = currentCart.filter(item => item.id !== productId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (isAuthenticated) {
      try {
        setLoading(true);
        const currentCart = Array.isArray(cart) ? cart : [];
        const updatedCart = currentCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        );
        setCart(updatedCart);
        // TODO: Call API to update quantity on backend
      } catch (error) {
        console.error('Failed to update quantity:', error);
      } finally {
        setLoading(false);
      }
    } else {
      const currentCart = Array.isArray(cart) ? cart : [];
      const updatedCart = currentCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      setCart([]);
      // TODO: Call API to clear cart on backend
    } catch (error) {
      console.error('Failed to clear cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalItems = () => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      loadCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
