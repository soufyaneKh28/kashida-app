import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "../screens/Profile";

import PinScreen from "../screens/PinScreen";
import { useNavigation } from "@react-navigation/native";

import FollowsScreen from "../screens/FollowsScreen";
import ProfileOther from "../screens/ProfileOther";
import OtherProfileFollowsScreen from "../screens/OtherProfileFollowsScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
      <Stack.Screen
        name="Pin"
        component={PinScreen}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
      <Stack.Screen
        name="FollowsScreen"
        component={FollowsScreen}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
      <Stack.Screen
        name="ProfileOther"
        component={ProfileOther}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
      <Stack.Screen
        name="OtherProfileFollowsScreen"
        component={OtherProfileFollowsScreen}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
    </Stack.Navigator>
  );
}
