// import "./gesture-handler";
import "../global.css";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const logoImage = require("../assets/images/adaptive-icon.png");

// import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import OnBoarding from "./screens/OnBoarding";
// import SignUp from "./screens/SignUp";
import AuthStack from "./navigation/AuthStack";
import BottomTabs from "./navigation/BottomTabs";
import { ActivityIndicator } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { useState } from "react";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// const logoImage = require("../assets/images/adaptive-icon.png");
import "../global.css";
// import HomeScreen from "./screens/HomeScreen";
// import OnBoarding from "../screens/OnBoarding";
// import Login from "../screens/Login";
// import SignUp from "../screens/SignUp";
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeIcon, UserIcon, CogIcon } from "react-native-heroicons/solid";

import HomeScreen from "./screens/HomeScreen";
import SignUp from "./screens/SignUp";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  // const isLoggedIn = !!SecureStore.getItemAsync("jwtToken");

  useEffect(() => {
    // Check if a token is stored in SecureStore
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("jwtToken");
      if (token) {
        setIsLoggedIn(true); // Token exists, user is logged in
      } else {
        setIsLoggedIn(false); // No token, user is not logged in
      }
    };

    checkToken(); // Check token when app starts
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <ActivityIndicator size="large" />; // Replace with your loading screen component
  }
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name="bottomTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
