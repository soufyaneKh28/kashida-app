import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, Animated } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import FollowingScreen from "../screens/FollowingScreen";
import { colors } from "../styles/colors";

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: colors.background,
          borderBottomWidth: 0,
          paddingTop: 10,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "transparent",
        },
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              color,
              fontSize: 16,
              fontWeight: focused ? "700" : "500",
              textTransform: "none",
            }}
          >
            {route.name}
          </Text>
        ),
        tabBarItemStyle: {
          width: "auto",
          marginHorizontal: 16,
        },
        tabBarActiveTintColor: "#7fb9e6",
        tabBarInactiveTintColor: "#aadaff",
        tabBarPressColor: "transparent",
        tabBarContentContainerStyle: {
          justifyContent: "center",
        },
        tabBarGap: 5,
        swipeEnabled: true,
        animationEnabled: true,
      })}
      style={{
        width: "100%",
      }}
    >
      <Tab.Screen
        name="Feed"
        component={HomeScreen}
        options={{
          tabBarAccessibilityLabel: "Feed Tab",
        }}
      />
      <Tab.Screen
        name="Following"
        component={FollowingScreen}
        options={{
          tabBarAccessibilityLabel: "Following Tab",
        }}
      />
    </Tab.Navigator>
  );
}
