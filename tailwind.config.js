import React from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="bars" size={24} color="black" />
        <FontAwesome name="bell" size={24} color="black" />
      </View>

      {/* Promotion Banner */}
      <View style={styles.promotionBanner}>
        <View style={styles.promotionText}>
          <Text style={styles.promotionTitle}>Get special discount</Text>
          <Text style={styles.promotionDiscount}>up to 85%</Text>
          <TouchableOpacity style={styles.claimButton}>
            <Text style={styles.claimButtonText}>Claim Voucher</Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: 'https://via.placeholder.com/100x100' }} style={styles.promotionImage} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={20} color="gray" />
        <TextInput placeholder="Find your food..." style={styles.searchInput} />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
        {['Burger', 'Taco', 'Chicken', 'Drinks'].map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <FontAwesome name="cutlery" size={24} color="black" />
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Food Products */}
      <ScrollView style={styles.foodList}>
        {[{ name: 'Beef Burger', price: '$5.40', time: '30 Min', sold: '120' }].map((item, index) => (
          <View key={index} style={styles.foodItem}>
            <Image source={{ uri: 'https://via.placeholder.com/80x80' }} style={styles.foodImage} />
            <View style={styles.foodDetails}>
              <Text style={styles.foodTitle}>{item.name}</Text>
              <Text style={styles.foodSubtitle}>{item.time} | {item.sold} Sold</Text>
              <Text style={styles.foodPrice}>{item.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {['home', 'shopping-cart', 'user'].map((icon, index) => (
          <TouchableOpacity key={index} style={styles.navItem}>
            <FontAwesome name={icon} size={24} color="black" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  promotionBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16,
    backgroundColor: '#FFEDD5', // light orange
    borderRadius: 8,
  },
  promotionText: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F97316', // orange
  },
  promotionDiscount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F97316', // orange
  },
  claimButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FB923C', // orange button color
    borderRadius: 50,
  },
  claimButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  promotionImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // light gray
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#4B5563', // dark gray
  },
  categoryList: {
    marginHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 12,
    marginTop: 4,
  },
  foodList: {
    marginHorizontal: 16,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  foodDetails: {
    marginLeft: 16,
    flex: 1,
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodSubtitle: {
    fontSize: 12,
    color: '#6B7280', // gray
  },
  foodPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F97316', // orange
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB', // light gray
  },
  navItem: {
    alignItems: 'center',
  },
});
