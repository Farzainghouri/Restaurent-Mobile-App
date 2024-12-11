import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import { BlurView } from "expo-blur";

const WelcomeScreen: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("./auth/login");
  };

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA8bF6CeyFvtabw0haDcp4K_N0-wNnWN5QBie9ZUQHZFgleHoM_19xpQtwdLokVi_gCrg&usqp=CAU'}} // Replace with your background image URL
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Restaurant Image */}
        <Image
          source={require('./assets/logo.png')} // Replace with your logo image URL
          style={styles.image}
        />

        {/* Welcome Message */}
        <Text style={styles.title}>BEST FOODS</Text>
        <Text style={styles.subtitle}>
          Savor the flavors, experience the excellence.
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Welcome</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center", // Centers the content vertically
    alignItems: "center", // Centers the content horizontally
  },
  container: {
    alignItems: "center", 
    justifyContent: "center",
   
    padding: 20,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#d35400",
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "rgba(255, 222, 200, 0.7)", // Semi-transparent background for readability
    borderRadius : 20,
    padding: 5,
  },
  subtitle: {
    backgroundColor: "rgba(255, 222, 200, 0.7)", // Semi-transparent background for readability

    fontSize: 16,
    borderRadius : 20,
    padding: 5,
    color: "black",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
