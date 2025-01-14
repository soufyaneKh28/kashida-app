import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeIcon, UserIcon, CogIcon } from "react-native-heroicons/outline";

import Spaces from "../screens/Spaces";
import Posting from "../screens/Posting";
import Roadmaps from "../screens/Roadmaps";
import { NavigationContainer } from "@react-navigation/native";
// import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import HomeScreen from "../screens/HomeScreen";
import SpacesStack from "./SpacesStack";
import TopTabs from "./TopTabs";

const Tab = createBottomTabNavigator();

// bottom tabs
const BottomTabs = () => {
  const [ModalVisible, setModalVisible] = useState(true);
  return (
    <Tab.Navigator
      screenOptions={{
        animation: "shift",
        tabBarShowLabel: false, // Hides the tab labels
        headerShown: false,
        tabBarStyle: {
          // animation:"",
          // animationDuration: 300,
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
        component={HomeStack}
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
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default behavior
            e.preventDefault();
            // Navigate to CreatePost screen
            navigation.navigate("CreatePost");
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="SpacesStack"
        component={SpacesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
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
