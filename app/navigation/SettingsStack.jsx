import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "../screens/Profile";

import PinScreen from "../screens/PinScreen";
import { useNavigation } from "@react-navigation/native";

import FollowsScreen from "../screens/FollowsScreen";
import ProfileOther from "../screens/ProfileOther";
import Security from "../screens/Security";
import Policy from "../screens/Policy";
import Terms from "../screens/Terms";
import Help from "../screens/Help";

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Security"
        component={Security}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
      <Stack.Screen
        name="Policy"
        component={Policy}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
    </Stack.Navigator>
  );
}
