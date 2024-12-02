import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define types for the cart item and context
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  preview: any; // Add preview type (can be customized based on your data)
  setPreview: (item: any) => void; // Function to set preview
}

interface CartProviderProps {
  children: ReactNode;
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provide Context
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [preview, setPreview] = useState<any>(null); // Preview state for product

  // Load cart items from AsyncStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cartItems");
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Error loading cart items", error);
      }
    };

    loadCart();
  }, []);

  // Save cart items to AsyncStorage whenever they change
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart items", error);
      }
    };

    saveCart();
  }, [cartItems]);

  // Add to cart function
  const addToCart = (item: CartItem) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove from cart function
  const removeFromCart = (itemId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  };

  // Clear cart function
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, preview, setPreview }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Use Context Hook
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
