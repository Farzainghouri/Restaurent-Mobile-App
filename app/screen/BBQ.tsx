import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Modal, TouchableOpacity, TextInput, Animated, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For star rating icons
import { useCart } from "../context/context"; // Adjust the path as needed

export default function BBQ() {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial fade-in animation
  const [modalVisible, setModalVisible] = useState(false); // To toggle cart modal visibility
  const [inputAnim] = useState(new Animated.Value(-60)); // To animate the input bar sliding from the top
  const { addToCart, cartItems, removeFromCart, clearCart } = useCart();

  const fastFoodProducts = [
    { id: '1', image: require('../assets/welcmPic.jpg'), name: 'Burger', price: '200 PKR', rating: 4 },
    { id: '2', image: require('../assets/welcmPic.jpg'), name: 'Pizza', price: '500 PKR', rating: 5 },
    { id: '3', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },
    { id: '4', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },
  ];

  const handleClose = () => setModalVisible(false);
  const handleViewCart = () => setModalVisible(true);

  useEffect(() => {
    // Trigger the fade-in animation when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Trigger the slide-in animation for the input bar
    Animated.timing(inputAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderStarRating = (rating: any) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i < rating ? 'star' : 'star-o'}
          size={20}
          color="#FFD700" // Gold color for the stars
        />
      );
    }
    return stars;
  };

  const renderProductItem = (item: any) => (
    <Animated.View style={[styles.productItem, { opacity: fadeAnim }]}>
      <Image source={item.image} style={styles.foodImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <View style={styles.productRating}>{renderStarRating(item.rating)}</View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderCartItem = (item:any, index: any) => (
    <View style={styles.cartItem} key={index}>
      <Image source={item.image} style={styles.cartItemImage} />
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartItemPrice}>{item.price}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Animated Input Bar */}
      <Animated.View style={[styles.inputContainers, { transform: [{ translateY: inputAnim }] }]}>
        <TextInput
          style={styles.inputt}
          placeholder="Search for food..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="search" size={20} color="#aaa" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartIcon} onPress={handleViewCart}>
          <FontAwesome name="shopping-cart" size={24} color="#FF6347" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.scrollContainer}>
        <ImageBackground
          source={require('../assets/burger.jpg')}
          style={styles.header}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <Text style={styles.title}>BBQ Items</Text>
        </ImageBackground>

        <View style={styles.categoriesContainer}>
          {/* Fast Food Section */}
          <View style={styles.productGrid}>
            {fastFoodProducts.map((product) => renderProductItem(product))}
          </View>
        </View>

        {/* Cart Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleClose}
        >
          <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeText}>close</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Your Cart</Text>
            {cartItems.length === 0 ? (
              <Text style={styles.emptyText}>Your cart is empty.</Text>
            ) : (
              cartItems.map((item, index) => renderCartItem(item, index))
            )}
            {cartItems.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearCart}
              >
                <Text style={styles.clearText}>Clear Cart</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </Modal>

        {/* Footer Section */}
        <ImageBackground
          source={require('../assets/welcmPic.jpg')} // Background image for the footer
          style={styles.footer}
          resizeMode="cover"
        >
          <View style={styles.footerOverlay} />
          <Text style={styles.footerTitle}>Contact Us</Text>
          <Text style={styles.footerText}>📞 +92-123-4567890</Text>
          <Text style={styles.footerText}>📍 Main Street, Karachi, Pakistan</Text>
          <View style={styles.socialIcons}>
            <Text
              style={styles.socialLink}
              onPress={() => Linking.openURL('https://www.facebook.com/yourPage')}
            >
              Facebook
            </Text>
            <Text
              style={styles.socialLink}
              onPress={() => Linking.openURL('https://www.instagram.com/yourPage')}
            >
              Instagram
            </Text>
          </View>
          <Text style={styles.footerText}>© 2024 Ghouris Restaurant - All Rights Reserved</Text>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    marginTop: -30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  productItem: {
    width: "48%",
    marginBottom: 10,
  },
  foodImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#555',
  },
  productRating: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainers: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    margin: 10,
    alignItems: 'center',
  },
  inputt: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 25,
  },
  cartIcon: {
    marginLeft: 20,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFD700',
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  footerTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  footerText: {
    color: '#fff',
    marginVertical: 5,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialLink: {
    color: '#fff',
    marginHorizontal: 15,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  clearButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  clearText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  cartItemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
},

});
