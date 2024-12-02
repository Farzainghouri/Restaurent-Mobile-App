import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, FlatList, Linking, Animated, TouchableOpacity, Modal, TextInput, Button  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For star rating icons
import { useRouter } from 'expo-router'; // Import useRouter
import { useCart } from "../context/context"; // Adjust the path as needed
// import {setPreview} from '../screen/Preview'

export default function HomeScreen() {
  // const [cart, setCart] = useState<any[]>([]);
  const { addToCart, cartItems ,removeFromCart ,setPreview  } = useCart();

  const [fadeAnim] = useState(new Animated.Value(0)); // Initial fade-in animation
  const [modalVisible, setModalVisible] = useState(false); // To toggle cart modal visibility
  const [inputAnim] = useState(new Animated.Value(-60)); // To animate the input bar sliding from the top

  // Animation for the cart
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Fade out animation when the cart is cleared
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    // fadeOut();
      setModalVisible(false);
};



  // Sample data for products (you can replace it with dynamic data later)
  const fastFoodProducts = [
    { id: '1', image: require('../assets/welcmPic.jpg'), name: 'Burger', price: '200 PKR', rating: 4 },
    { id: '2', image: require('../assets/welcmPic.jpg'), name: 'Pizza', price: '500 PKR', rating: 5 },
    { id: '3', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },
    { id: '4', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },
  ];

  const bbqProducts = [
    { id: '5', image: require('../assets/welcmPic.jpg'), name: 'BBQ Chicken', price: '600 PKR', rating: 4 },
    { id: '6', image: require('../assets/welcmPic.jpg'), name: 'BBQ Ribs', price: '800 PKR', rating: 5 },
    { id: '7', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },
    { id: '8', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },
  ];

  const dessertsProducts = [
    { id: '9', image: require('../assets/welcmPic.jpg'), name: 'Ice Cream', price: '150 PKR', rating: 3 },
    { id: '10', image: require('../assets/welcmPic.jpg'), name: 'Cake', price: '350 PKR', rating: 4 },
    { id: '11', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },
    { id: '12', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },

  ];

  const beveragesProducts = [
    { id: '13', image: require('../assets/welcmPic.jpg'), name: 'Coke', price: '50 PKR', rating: 5 },
    { id: '14', image: require('../assets/welcmPic.jpg'), name: 'Juice', price: '100 PKR', rating: 4 },
    { id: '15', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },
    { id: '16', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },

  ];


  const handleViewCart = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    fadeIn();
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

  const renderStarRating = (rating: number) => {
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

  const chann = (e:any)=>{
    setPreview(e)
    router.push(`../screen/Preview`)

  }

  const renderProductItem = (item: any) => (
    <Animated.View style={[styles.productItem, { opacity: fadeAnim }]}>
      <TouchableOpacity   onPress={() => chann(item)}
      >
      <Image source={item.image} style={styles.foodImage} />

      </TouchableOpacity>
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
  const router = useRouter(); // Initialize router for navigation

  const handleNavigate = (e:string) => {
          router.push(`../screen/${e}`)
    // console.log(e);
  
  };

  const renderCategory = (categoryTitle: string , products: any[] , cataScree: string) => (

    <TouchableOpacity style={styles.category} >
      <Text style={styles.categoryTitle}>{categoryTitle}</Text>
      <FlatList
        data={products}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderProductItem(item)}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity onPress={(e) => handleNavigate(cataScree)}>
      <Text style={styles.categoryTitlee}>View More</Text>

      </TouchableOpacity>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>

      {/* Animated Input Bar */}
      {/* <Drawer /> */}


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
        {/* Header Section */}
        <ImageBackground
          source={require('../assets/bg.jpg')}
          style={styles.header}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Ghouris Restaurant</Text>
        </ImageBackground>

        {/* Categories Section */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Our Categories</Text>

          {/* Fast Food Section */}
          {renderCategory('FastFood', fastFoodProducts , 'FastFood')}

          {/* BBQ Section */}
          {renderCategory('BBQ Items', bbqProducts , 'BBQ')}

          {/* Desserts Section */}
          {renderCategory('Desserts', beveragesProducts , 'Dessert'/* Add more categories as needed */)}

          {/* Beverages Section */}
          {renderCategory('Beverages', dessertsProducts, 'Beverage'/* Add more categories as needed */)}
        </View>


        {/* Cart Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
           <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeText}>close</Text>
      
      </TouchableOpacity>

      <Text style={styles.title}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        cartItems.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item.id)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
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
    width: '100%',  // Make sure the image spans the full width
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : 50
  },
  inputContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    zIndex: 10,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    width: '90%',
    height: 40,
    borderRadius: 20,
    paddingLeft: 20,
    backgroundColor: '#f1f1f1',
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
  },
 
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    marginTop: -30, // Pull categories up slightly for overlap effect
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  category: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  categoryTitlee:{
    textAlign:'right',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  productItem: {
    width: 150,
    marginRight: 15,
    alignItems: 'center',
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
    borderRadius: 5,
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  viewCartButton: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
  },
  viewCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cartModal: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cartModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartItemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#555',
  },
  closeCartButton: {
    backgroundColor: '#FF6347',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#FF6347',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  footerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
  },
  socialIcons: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  socialLink: {
    color: '#fff',
    marginRight: 20,
    fontSize: 16,
  },
  inputContainers: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    zIndex: 10,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  inputt: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingLeft: 20,
    backgroundColor: '#f1f1f1',
    fontSize: 16,
    marginRight: 10,
  },
  iconButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    position: 'relative',
    padding: 5,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  containeer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titleee: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  quantity: {
    fontSize: 16,
    color: '#777',
    marginVertical: 5,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  clearText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
