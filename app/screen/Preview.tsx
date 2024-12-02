import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '../context/context';

const ProductPreviewScreen: React.FC = () => {

    const { preview, addToCart } = useCart(); // Access preview and setPreview

  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0)); // Fade in animation
  
  // Animation to fade in components
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart(product); // Add the product to the cart
    router.push('/cart'); // Navigate to the cart page
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Product Image */}
      <Image source={preview.image} style={styles.productImage} />

      {/* Product Details */}
      <Text style={styles.productName}>{preview.name}</Text>
      <Text style={styles.productDescription}>{preview.description}</Text>
      <Text style={styles.productPrice}>{preview.price}</Text>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(preview)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      {/* Back to Home Button */}
      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  productImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    zIndex: 1,
  },
  productName: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 50,
    backgroundColor: '#3498db',
    borderRadius: 30,
    marginBottom: 10,
    elevation: 5, // Adding shadow for button
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#2ecc71',
  },
});

export default ProductPreviewScreen; // Export the component directly
