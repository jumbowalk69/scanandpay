import React from 'react';
import { Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Bill from './screens/Bill';
import Checkout from './screens/Checkout';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import History from './screens/History';
import Profile from './screens/Profile';
import Settings from './screens/Settings';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#fff", // Corrected from 'background' to 'backgroundColor'
  }
}

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}> 
              <FontAwesome name="user-o" size={24} color={focused ? "#0265ff" : "#111" } />
            </View>
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}> 
              <FontAwesome name="history" size={24} color={focused ? "#0265ff" : "#111" } />
            </View>
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View 
              style={{ 
                alignItems: "center", 
                justifyContent: "center", 
                top: Platform.OS == "android" ? -15 : -25,
                width: Platform.OS == "android" ? 60 : 70,
                height: Platform.OS == "android" ? 60 : 70,
                borderRadius: Platform.OS == "android" ? 35 : 40,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "lightgrey"
              }}
            >
              <FontAwesome name="qrcode" size={30} color={focused ? "#0265ff" : "#111"} />
            </View>
          ),
          headerShown: false 
        }}
      />
      <Tab.Screen
        name="Checkout"
        component={Checkout}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome name="shopping-cart" size={24} color={focused ? "#0265ff" : "#111" } />
            </View>
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="settings-outline" size={24} color={focused ? "#0265ff" : "#111" } />
            </View>
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
