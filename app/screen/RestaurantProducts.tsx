import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, FlatList, Linking, Animated, TouchableOpacity, Modal, TextInput, Button, YellowBox  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For star rating icons
import { useCart } from "../context/context"; // Adjust the path as needed
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';

export default function BBQ() {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial fade-in animation
  const [modalVisible, setModalVisible] = useState(false); // To toggle cart modal visibility
  const [inputAnim] = useState(new Animated.Value(-60)); // To animate the input bar sliding from the top
  const {ids, addToCart, cartItems, removeFromCart } = useCart();

  const Details = [
    { id: 'ghousia.FoodBridge', image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE6Ns_Rxk1bPKnVG_55UDEEo4_iq5UnAmQyA&s" , name: 'Ghousia', contact: '+92-3162534652', location: 'main street , ghulshan', email:'ghousia@gmail.com', logo: "data:image/png;base64,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" },
    { id: 'mrcone.FoodBridge', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY89aOORkEqgzjqKj_GvqTSIr-Fpb5vEDvIw&s", name: 'MR Cone',contact: '+92-3162534652', location: 'main street , ghulshan', email:'Mr cone@gmail.com' ,logo: "data:image/png;base64,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"},
    { id: 'darbar.FoodBridge', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKK8hgDsx0HwH-7qt3b31eMBG6lDeYpU8BXQ&s", name: 'Darbar', contact: '+92-3162534652', location: 'main street , ghulshan', email:'Darbar@gmail.com' ,logo: "data:image/png;base64,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" },
    { id: 'allahwala.FoodBridge', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFjVYEqQGKV0aeMtPFd5KrnAjaXjyx8GRJ9g&s", name: 'Allah Wala Pakwan',contact: '+92-3162534652', location: 'main street , ghulshan', email:'Allah Wala Pakwan@gmail.com' ,logo: "data:image/png;base64,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"},
    { id: 'javaid.FoodBridge', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFjVYEqQGKV0aeMtPFd5KrnAjaXjyx8GRJ9g&s", name: 'Javaid Nahari',contact: '+92-3162534652', location: 'main street , ghulshan', email:'Javed nahari@gmail.com' },
  ];

  const fastFoodProducts = [
    {cata:"fastfood", id: 'ghousia.FoodBridge', image: require('../assets/welcmPic.jpg'), name: 'Burger', price: '200 PKR', rating: 4 },
    { cata:"bbq",id: 'mrcone.FoodBridge', image: require('../assets/welcmPic.jpg'), name: 'Pizza', price: '500 PKR', rating: 5 },
    {cata:"desert", id: 'darbar.FoodBridge', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },
    {cata:"deals", id: 'allahwala.FoodBridge', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },
  ];
  const fastFood = [
    { cata: 'fastfood', image: require('../assets/welcmPic.jpg'), name: 'Burger', price: '200 PKR', rating: 4 },
    { cata: 'ghousia.FoodBridge', image: require('../assets/welcmPic.jpg'), name: 'Pizza', price: '500 PKR', rating: 5 },
    { cata: 'ghousia.FoodBridge', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },
    { cata: 'ghousia.FoodBridge', image: require('../assets/welcmPic.jpg'), name: 'Fries', price: '150 PKR', rating: 3 },
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

  const checkOut = () =>{
    router.push('./checkout')
    }
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
      <TouchableOpacity
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



  const renderCategory = (categoryTitle: string , products: any[] , cataScree: string) => (
    
    fastFoodProducts.map((items,index) => {
      if (items.id === ids) {
        return(
        <>

    <View style={styles.category} key={index}>
      <Text style={styles.categoryTitle}>{categoryTitle}</Text>
      <FlatList
        data={fastFoodProducts}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderProductItem(item)}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity>
      <Text style={styles.categoryTitlee}>View More</Text>

      </TouchableOpacity>
    </View>
    </>)}})

  );
  const savedId =  AsyncStorage.getItem("savedItemId");

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
    cartItems.map((items)=>{

      if (ids == items.id) {
                return(
  
          <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
      </View>
      )
        
      }

    })
  )}
</TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.scrollContainer}>
      {
              Details.map((items) => {
              if (ids == items.id) {
                return(

        <ImageBackground
          source={{ uri: items.image ? items.image : "data:image/jpeg;base64,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"}}
          style={styles.header}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <Image source={{uri: items.logo}} style={styles.logo} />

        
          <Text style={styles.titlee}>{items.name}</Text>

        </ImageBackground>
                )
              }
            }
          )
        }
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Our Categories</Text>
          {/* {
              fastFoodProducts.map((items,index) => {
              if (items.cata === "fastfood") {
                return(
                <> */}
                  {renderCategory('FastFood', fastFoodProducts , 'FastFood')}
                {/* </>

                )
              }

            }
          ) 
            } */}

          {/* Fast Food Section */}
          </View>

        {/* <View style={styles.categoriesContainer}>
          Fast Food Section
          <View style={styles.productGrid}>
            {
              fastFoodProducts.map((items) => {
              if (ids == items.id) {
                return(
                  renderProductItem(items)

                )
              }

            }
          ) 
            }
          </View>
        </View> */}

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
        cartItems.map((item) => {
          if (ids == item.id) {

            return(<>
                            <Text style={styles.itemText}>{item.name}</Text>


              <View key={item.id} style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.id}</Text>
              <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
              <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item.id)}
              >
              <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={styles.removeButtonn}
              onPress={() => checkOut()}
              >
              <Text style={styles.removeText}>Check out </Text>
              </TouchableOpacity>

              </View>
            </>
            );
            
          }
            
        }
        )
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
          {
              Details.map((detail) => {
              if (ids == detail.id) {
                return(
                  <>
                  <Text style={styles.footerText}>📞 {detail.contact}</Text>
                  <Text style={styles.footerText}>📍  {detail.email}</Text>
                  <Text style={styles.footerText}>📍 {detail.location}</Text>
                  </>
                  

                )
              }
            }
          )
        }
          {/* <View style={styles.socialIcons}>
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
          </View> */}
          {/* <Text style={styles.footerText}>© 2024 Ghouris Restaurant - All Rights Reserved</Text> */}
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
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 0,
  },
  header: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
  },
  titlee: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    fontFamily:"cursive"
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
    width:'100%',
    height: "auto"
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
  removeButtonn: {
    backgroundColor: '#FF3',
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
    zIndex:1
  },
  closeText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
},

});
