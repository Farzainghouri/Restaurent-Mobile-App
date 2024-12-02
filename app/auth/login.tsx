import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {

    const doo =()=>{
        router.push('/(tabs)/home')
    }
    const noo =()=>{
        router.push('/auth/signUp')
    }

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA8bF6CeyFvtabw0haDcp4K_N0-wNnWN5QBie9ZUQHZFgleHoM_19xpQtwdLokVi_gCrg&usqp=CAU' }} // Set your background image here
      style={styles.bgImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Back!</Text>
          
          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
          />
          
          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#ccc"
          />
          
          {/* Login Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
                {
                    doo()
                } 
                } // Navigate to Home screen
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          {/* Sign Up Link */}
          <TouchableOpacity onPress={() => noo()}>
            <Text style={styles.link}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9, // Slight transparency to let the background image show through
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  container: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background with slight transparency
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#F97316', // Bright Orange color for the button
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
