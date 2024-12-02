import { Tabs } from 'expo-router';
import React, {useState} from 'react';
import { Platform } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, FlatList, Linking, Animated, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useCart } from "../context/context"; 

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { cartItems } = useCart();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {
            backgroundColor: '#fff', 
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB', 
          },
        }),
      }}
    >
      
            <Tabs.Screen
        name="home"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home-filled" size={26} color={color} />  // Attractive home icon
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={26} color={color} />  // FontAwesome profile icon
          ),
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
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
})
