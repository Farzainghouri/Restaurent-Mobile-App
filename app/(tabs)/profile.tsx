import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0

  // Simulate user profile data
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    lastBillDate: '2024-12-01',
    lastBillAmount: '$120.00',
    profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkQVNr_U5l2XJKq78oJ-cpY7z66y7V6UJNwQ&s', // Replace with actual image URL
  };

  // Animation to fade in components
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // const handleEditProfile = () => {
  //   // Redirect to Edit Profile screen
  //   router.push('/edit-profile');
  // };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Profile Image */}
      <Image source={{ uri: userProfile.profileImage }} style={styles.profileImage} />
      
      {/* Profile Details */}
      <Text style={styles.name}>{userProfile.name}</Text>
      <Text style={styles.email}>{userProfile.email}</Text>

      {/* Cart-like Bill Info */}
      <View style={styles.billContainer}>
        <Text style={styles.billTitle}>Last Bill</Text>
        <View style={styles.billItem}>
          <Text style={styles.billText}>Date:</Text>
          <Text style={styles.billDetails}>{userProfile.lastBillDate}</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.billText}>Amount:</Text>
          <Text style={styles.billAmount}>{userProfile.lastBillAmount}</Text>
        </View>
      </View>

      {/* Edit Profile Button
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#3498db',
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
    fontFamily: 'sans-serif-medium', // System font with a bit of weight
  },
  email: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
    fontFamily: 'sans-serif', // Use system default sans-serif font
  },

  // Cart-like Bill Info Section
  billContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Adding shadow for a card-like effect
    width: '100%',
    marginBottom: 30,
  },
  billTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 15,
    textAlign: 'center',
  },
  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  billText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  billDetails: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: '500',
  },
  billAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e74c3c',
  },

  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#3498db',
    borderRadius: 30,
    elevation: 5, // Adding elevation for shadow effect on Android
    shadowColor: '#000', // Adding shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif-medium', // System font with a bit of weight
  },
});

export default ProfileScreen;
