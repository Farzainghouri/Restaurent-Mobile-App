import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const CheckoutForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Get user location permission and set the location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        ...region,
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
      await getAddressFromCoordinates(userLocation.coords.latitude, userLocation.coords.longitude);
    })();
  }, []);

  // Function to get address from latitude and longitude
  const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geocode && geocode[0]) {
        const fullAddress = `${geocode[0].street}, ${geocode[0].city}, ${geocode[0].region}, ${geocode[0].country}`;
        setAddress(fullAddress);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  // Handle location selection on the map
  const handleMapPress = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setRegion({
      ...region,
      latitude,
      longitude,
    });
    await getAddressFromCoordinates(latitude, longitude);
  };

  const handleCheckout = () => {
    Alert.alert('Order Confirmed', `Thank you, ${name}! Your order has been placed.`);
    console.log({
      name,
      email,
      phone,
      address,
      location: region,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Checkout Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Select Delivery Location</Text>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress} // Handle map press to select location
      >
        <Marker coordinate={region} draggable />
      </MapView>

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <Button title="Place Order" onPress={handleCheckout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default CheckoutForm;
