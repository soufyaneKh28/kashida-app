import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeIcon, UserIcon, CogIcon } from "react-native-heroicons/outline";

import HomeScreen from "../screens/HomeScreen";
import SignUp from "../screens/SignUp";
import Profile from "../screens/Profile";
import Spaces from "../screens/Spaces";
import Posting from "../screens/Posting";
import Roadmaps from "../screens/Roadmaps";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet } from "react-native";
import PinScreen from "../screens/PinScreen";
import { useNavigation } from "@react-navigation/native";
import { UsersIcon } from "react-native-heroicons/outline";
// import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator for Home Tab
function HomeStackNavigator() {
  const navigation = useNavigation();
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

// profile Stack

function ProfileStackNavigator() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
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

// bottom tabs
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false, // Hides the tab labels
        headerShown: false,
        tabBarStyle: {
          // position: "absolute",
          // marginBottom: 15,
          // marginHorizontal: 20,
          display: "flex",
          justifyContent: "center",
          // borderRadius: 16,
          height: 70,
          // backgroundColor: "#0E1922",
        },

        tabBarActiveTintColor: "#00C8D1", // Text/icon color for active tab
        tabBarInactiveTintColor: "black", // Text/icon color for inactive tabs
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
        name="Roadmaps"
        component={Roadmaps}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Posting"
        component={Posting}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Spaces"
        component={Spaces}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
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
