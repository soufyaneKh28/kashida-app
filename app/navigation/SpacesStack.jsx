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
import Spaces from "../screens/Spaces";
import SingleSpace from "../screens/SingleSpace";

const Stack = createNativeStackNavigator();

export default function SpacesStack() {
  const navigation = useNavigation();
  return (
    // <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Spaces"
        component={Spaces}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
      <Stack.Screen
        name="SingleSpace"
        component={SingleSpace}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
