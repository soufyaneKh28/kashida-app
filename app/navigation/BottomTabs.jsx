import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeIcon, UserIcon, CogIcon } from "react-native-heroicons/solid";

import HomeScreen from "../screens/HomeScreen";
import SignUp from "../screens/SignUp";
import Profile from "../screens/Profile";
import Spaces from "../screens/Spaces";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import PinScreen from "../screens/PinScreen";
// import { BlurView } from "expo-blur";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator for Home Tab
function HomeStackNavigator({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Pin"
        component={PinScreen}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
    </Stack.Navigator>
  );
}

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          marginBottom: 25,
          marginHorizontal: 20,
          display: "flex",
          justifyContent: "center",
          borderRadius: 16,
          // height: 70,
        },

        tabBarActiveTintColor: "white", // Text/icon color for active tab
        tabBarInactiveTintColor: "gray", // Text/icon color for inactive tabs
        tabBarBackground: () => (
          <LinearGradient
            colors={["#0E1B24", "#095E67"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              height: 60,

              borderRadius: 10,
              alignItems: "center",
            }}
          />
        ),
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Spaces"
        component={Spaces}
        options={{
          tabBarIcon: ({ color, size }) => (
            <UserIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <UserIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default BottomTabs;
